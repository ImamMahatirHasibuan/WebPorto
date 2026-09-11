/**
 * useMouseTrail.js
 * ================
 * Custom React hook untuk membuat efek partikel ungu yang mengikuti cursor mouse.
 * 
 * KENAPA pakai Canvas bukan DOM elements?
 * - Versi sebelumnya membuat div baru setiap mouse move → menyebabkan "layout thrashing"
 *   (browser harus menghitung ulang layout setiap createElement + appendChild)
 * - Canvas = satu elemen HTML, semua partikel digambar di satu surface
 * - Satu requestAnimationFrame loop = batch semua draw calls dalam satu frame
 * - Hasilnya: dari 60+ DOM operations/detik → 1 canvas redraw/frame = JAUH lebih smooth
 * 
 * KENAPA pakai object pool pattern?
 * - Alokasi memori (new object) di dalam event handler yang sering dipanggil = GC pressure
 * - Object pool: buat semua objek di awal, recycle/reuse saat dibutuhkan
 * - Tidak ada garbage collection pause = animasi lebih halus
 */

import { useEffect } from 'react';

// Konstanta untuk konfigurasi partikel
const MAX_PARTICLES = 40;   // Maksimal 40 partikel aktif sekaligus
                             // KENAPA 40? Cukup terlihat tanpa membebani render
const FADE_SPEED = 0.015;   // Kecepatan fade out per frame
                             // KENAPA 0.015? Opacity 0.6 / 0.015 ≈ 40 frame = ~0.67 detik

export function useMouseTrail() {
  useEffect(() => {
    // ========================================
    // 1. SETUP CANVAS
    // ========================================
    // Buat canvas full-screen yang mengambang di atas semua konten
    const canvas = document.createElement('canvas');
    canvas.style.cssText =
      'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9998';
    // pointer-events:none → agar canvas tidak memblokir klik user
    // z-index:9998 → di atas semua konten tapi di bawah modal (z-index 2000)
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d'); // 2D rendering context untuk menggambar

    // Resize handler agar canvas sesuai ukuran window
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize(); // set ukuran awal
    window.addEventListener('resize', resize);

    // ========================================
    // 2. PARTICLE POOL (Object Pool Pattern)
    // ========================================
    // Pre-alokasi 40 objek partikel → tidak ada "new" di runtime
    // KENAPA Array.from bukan loop biasa?
    // - Lebih ringkas dan fungsional
    // - Langsung menghasilkan array dengan objek default
    const pool = Array.from({ length: MAX_PARTICLES }, () => ({
      x: 0,        // posisi X partikel
      y: 0,        // posisi Y partikel
      opacity: 0,  // 0 = tidak terlihat, >0 = aktif
      size: 0,     // radius partikel dalam pixel
    }));
    let poolIndex = 0; // pointer ke slot berikutnya (circular buffer)

    // ========================================
    // 3. MOUSE MOVE HANDLER (Throttled)
    // ========================================
    // KENAPA throttle 30ms?
    // - Event mousemove bisa fire 60-100x/detik
    // - Membuat partikel setiap event = terlalu banyak & padat
    // - 30ms = ~33 partikel/detik = terlihat smooth tanpa terlalu ramai
    let lastSpawn = 0;
    const handleMouseMove = (e) => {
      const now = performance.now(); // timestamp presisi tinggi
      if (now - lastSpawn < 30) return; // skip jika belum 30ms
      lastSpawn = now;

      // Recycle slot dari pool (circular buffer)
      // Saat poolIndex mencapai MAX_PARTICLES, kembali ke 0
      // Partikel lama yang sudah fade out akan ditimpa
      const p = pool[poolIndex];
      p.x = e.clientX;      // posisi mouse saat ini
      p.y = e.clientY;
      p.opacity = 0.6;      // opacity awal (semi-transparan)
      p.size = Math.random() * 2 + 2; // ukuran random 2-4px
      poolIndex = (poolIndex + 1) % MAX_PARTICLES; // geser pointer circular
    };

    // { passive: true } = memberi tahu browser bahwa handler ini
    // tidak akan memanggil preventDefault(), sehingga scrolling tidak terblokir
    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ========================================
    // 4. ANIMATION LOOP (Single rAF)
    // ========================================
    // KENAPA satu loop untuk semua partikel?
    // - Versi lama: setiap partikel punya rAF sendiri = 40 callback/frame
    // - Versi baru: 1 callback/frame menggambar semua 40 partikel
    // - Lebih efisien karena browser hanya perlu 1 compositing pass
    let animId;
    const animate = () => {
      // Bersihkan seluruh canvas setiap frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Loop semua partikel di pool
      for (let i = 0; i < MAX_PARTICLES; i++) {
        const p = pool[i];
        if (p.opacity <= 0) continue; // skip partikel yang sudah mati

        // Gambar lingkaran (partikel) dengan opacity tertentu
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = 'rgb(168, 85, 247)'; // warna ungu (tema portfolio)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); // lingkaran penuh
        ctx.fill();

        // Kurangi opacity setiap frame → efek fade out
        p.opacity -= FADE_SPEED;
      }

      // Reset globalAlpha agar tidak mempengaruhi drawing lain
      ctx.globalAlpha = 1;
      // Minta frame berikutnya → loop terus berjalan
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate); // mulai loop

    // ========================================
    // 5. CLEANUP
    // ========================================
    // Dipanggil saat komponen unmount
    return () => {
      cancelAnimationFrame(animId);  // hentikan animation loop
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', handleMouseMove);
      // Hapus canvas dari DOM jika masih ada
      if (document.body.contains(canvas)) document.body.removeChild(canvas);
    };
  }, []); // [] = hanya jalan sekali saat mount (tidak ada dependency)
}
