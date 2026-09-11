/**
 * useElasticDrag.js
 * =================
 * Custom React hook untuk membuat efek drag elastis (seperti tali lanyard asli).
 * 
 * KENAPA pakai simulasi spring physics?
 * - CSS transition hanya bisa "balik langsung" (easing satu arah)
 * - Spring physics memberikan efek MEMANTUL (overshoot → balik → overshoot → settle)
 * - Hasilnya terasa seperti benda fisik nyata, bukan animasi digital biasa
 * 
 * KENAPA buat sendiri bukan pakai library (react-spring, framer-motion)?
 * - Lebih ringan (0 dependency tambahan vs ~30KB+ library)
 * - Kontrol penuh atas behavior (resistance curve, bouncing intensity)
 * - Portfolio ini sederhana, tidak perlu full animation library
 * 
 * KONSEP FISIKA:
 * - Hooke's Law: F = -k * x (gaya pegas = -kekakuan × perpindahan)
 * - Damping: mengurangi kecepatan setiap frame (seperti gesekan udara)
 * - Resistance: makin jauh ditarik, makin berat (exponential decay curve)
 */

import { useRef, useState, useCallback, useEffect } from 'react';
// useRef: menyimpan nilai mutable yang tidak trigger re-render (posisi, velocity, dll)
// useState: menyimpan posisi yang PERLU trigger re-render (agar UI update)
// useCallback: memoize fungsi agar referensinya stable antar render
// useEffect: cleanup saat unmount

/**
 * @param {number} maxPull   - Batas maksimal jarak tarik (pixel)
 * @param {number} stiffness - Kekakuan pegas (0-1). Makin besar = makin cepat kembali
 * @param {number} damping   - Redaman (0-1). Makin besar = makin cepat berhenti memantul
 * @returns {{ pos, bind, dragging }}
 */
export function useElasticDrag({ maxPull = 130, stiffness = 0.18, damping = 0.8 } = {}) {
  // STATE: posisi (x, y) yang di-render ke UI
  const [pos, setPos] = useState({ x: 0, y: 0 });
  // STATE: apakah sedang di-drag? (untuk ganti cursor)
  const [dragging, setDragging] = useState(false);

  // REF: versi "non-reactive" dari pos/velocity (untuk perhitungan di rAF)
  // KENAPA useRef bukan useState?
  // - setPos setiap rAF frame = terlalu banyak re-render
  // - Ref diupdate langsung tanpa re-render, lalu setPos hanya di akhir step
  const posRef = useRef({ x: 0, y: 0 });   // posisi saat ini
  const velRef = useRef({ x: 0, y: 0 });   // velocity (kecepatan)
  const startRef = useRef({ x: 0, y: 0 }); // posisi mouse saat mulai drag
  const rafRef = useRef(null);               // ID requestAnimationFrame (untuk cancel)
  const draggingRef = useRef(false);         // flag drag (ref version, untuk event handler)

  /**
   * Helper: ambil koordinat dari mouse event ATAU touch event
   * KENAPA perlu ini?
   * - Mouse event: pakai e.clientX / e.clientY
   * - Touch event: pakai e.touches[0].clientX / clientY
   * - Satu fungsi untuk handle kedua tipe = DRY (Don't Repeat Yourself)
   */
  const getPoint = (e) => {
    if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  };

  /**
   * Hentikan animasi spring yang sedang berjalan
   */
  const stopSpring = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  /**
   * Jalankan simulasi spring physics
   * Dipanggil saat user melepas drag (mouseup/touchend)
   * 
   * ALGORITMA (setiap frame):
   * 1. Hitung gaya pegas: F = -stiffness × position (Hooke's Law)
   * 2. Update velocity: velocity = (velocity + acceleration) × damping
   * 3. Update position: position += velocity
   * 4. Jika posisi & velocity < 0.5px → anggap sudah diam, snap ke (0,0)
   * 
   * KENAPA useCallback?
   * - Fungsi ini dipakai sebagai dependency di handleEnd (useCallback juga)
   * - Tanpa useCallback, setiap render membuat fungsi baru → dependency chain berubah
   */
  const runSpring = useCallback(() => {
    const step = () => {
      const p = posRef.current;
      const v = velRef.current;

      // Hooke's Law: gaya pegas = -kekakuan × perpindahan
      // Tanda negatif = gaya selalu mengarah ke posisi awal (0,0)
      const ax = -stiffness * p.x;
      const ay = -stiffness * p.y;
      // Update velocity: tambah akselerasi, lalu kalikan damping (redaman)
      // Damping 0.8 = setiap frame velocity berkurang 20%
      v.x = (v.x + ax) * damping;
      v.y = (v.y + ay) * damping;
      // Update posisi berdasarkan velocity
      p.x += v.x;
      p.y += v.y;

      // Kondisi berhenti: jika posisi dan velocity sudah sangat kecil
      // KENAPA 0.5 bukan 0?
      // - Floating point tidak pernah tepat 0
      // - 0.5px tidak terlihat oleh mata manusia
      if (Math.abs(p.x) < 0.5 && Math.abs(p.y) < 0.5 && Math.abs(v.x) < 0.5 && Math.abs(v.y) < 0.5) {
        posRef.current = { x: 0, y: 0 };
        setPos({ x: 0, y: 0 }); // snap ke posisi awal
        rafRef.current = null;
        return; // hentikan loop
      }

      setPos({ x: p.x, y: p.y }); // update UI
      rafRef.current = requestAnimationFrame(step); // frame berikutnya
    };
    rafRef.current = requestAnimationFrame(step); // mulai loop
  }, [stiffness, damping]);

  /**
   * Handler saat mouse/touch bergerak selama drag
   * 
   * RESISTANCE CURVE:
   * - Menggunakan rumus: output = maxPull × (1 - e^(-input/maxPull))
   * - Ini adalah kurva eksponensial yang MENDEKATI maxPull tapi TIDAK PERNAH mencapainya
   * - Efeknya: awal-awal mudah ditarik, makin jauh makin berat (seperti karet)
   * 
   * KENAPA bukan linear clamp (Math.min/max)?
   * - Linear clamp: terasa "mentok" tiba-tiba saat mencapai batas
   * - Exponential: transisi halus, makin berat secara gradual → lebih natural
   */
  const handleMove = useCallback((e) => {
    if (!draggingRef.current) return;
    if (e.touches) e.preventDefault(); // cegah scroll saat drag di mobile

    const p = getPoint(e);
    let dx = p.x - startRef.current.x; // jarak horizontal dari titik awal
    let dy = p.y - startRef.current.y; // jarak vertikal dari titik awal

    // Resistance curve: approaches maxPull asymptotically
    // Math.sign = pertahankan arah (kiri/kanan, atas/bawah)
    // Math.exp(-|dx|/maxPull) = decay factor (mendekati 0 saat dx besar)
    // 1 - decay = mendekati 1 saat dx besar (tapi tidak pernah = 1)
    dx = Math.sign(dx) * maxPull * (1 - Math.exp(-Math.abs(dx) / maxPull));
    dy = Math.sign(dy) * maxPull * (1 - Math.exp(-Math.abs(dy) / maxPull));

    posRef.current = { x: dx, y: dy };
    setPos({ x: dx, y: dy }); // update UI real-time saat drag
  }, [maxPull]);

  /**
   * Handler saat drag selesai (mouseup/touchend)
   * - Hapus event listener (penting! kalau tidak = memory leak)
   * - Mulai animasi spring (memantul kembali ke posisi awal)
   */
  const handleEnd = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setDragging(false);
    // Hapus listener dari document (ditambahkan saat handleStart)
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleEnd);
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('touchend', handleEnd);
    runSpring(); // mulai efek memantul!
  }, [handleMove, runSpring]);

  /**
   * Handler saat drag dimulai (mousedown/touchstart)
   * 
   * KENAPA addEventListener ke document bukan ke elemen?
   * - Jika listener di elemen, mouse bisa keluar dari elemen saat drag cepat
   * - Document-level listener menangkap mouse di MANA SAJA di halaman
   * - Ini standar pola drag-and-drop di web
   */
  const handleStart = useCallback((e) => {
    stopSpring(); // hentikan animasi spring jika masih jalan
    draggingRef.current = true;
    setDragging(true);
    velRef.current = { x: 0, y: 0 }; // reset velocity
    const p = getPoint(e);
    // Simpan offset: posisi mouse dikurangi posisi kartu saat ini
    // Ini memungkinkan "mengambil" kartu dari posisi tengah bounce
    startRef.current = { x: p.x - posRef.current.x, y: p.y - posRef.current.y };

    // Tambah listener ke document (bukan elemen) untuk handle drag liar
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove, { passive: false }); // passive:false = agar preventDefault() bisa dipanggil
    document.addEventListener('touchend', handleEnd);
  }, [handleMove, handleEnd]);

  /**
   * Cleanup saat komponen unmount
   * KENAPA perlu?
   * - Jika user navigate saat sedang drag, listener masih nempel di document
   * - Tanpa cleanup = memory leak + error "setState on unmounted component"
   */
  useEffect(() => {
    return () => {
      stopSpring();
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [handleMove, handleEnd]);

  // Object yang di-spread ke elemen target: {...bind}
  // KENAPA pakai object bukan langsung onMouseDown?
  // - Lebih bersih: <div {...bind}> vs <div onMouseDown={...} onTouchStart={...}>
  // - Mudah ditambah event lain tanpa mengubah komponen yang pakai
  const bind = {
    onMouseDown: handleStart,
    onTouchStart: handleStart
  };

  // Return:
  // - pos: posisi {x, y} untuk diterapkan sebagai transform
  // - bind: props untuk di-spread ke elemen draggable
  // - dragging: boolean, untuk ganti cursor (grab ↔ grabbing)
  return { pos, bind, dragging };
}
