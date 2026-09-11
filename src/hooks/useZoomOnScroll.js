/**
 * useZoomOnScroll.js
 * ==================
 * Custom React hook untuk efek "zoom in" saat elemen masuk viewport (terlihat di layar).
 * 
 * KENAPA pakai IntersectionObserver bukan scroll event?
 * - scroll event fire SETIAP pixel scroll → sangat berat (bisa 100x/detik)
 * - IntersectionObserver: browser sendiri yang menghitung, sangat efisien
 * - Hanya dipanggil saat elemen MASUK atau KELUAR viewport
 * - Ini adalah API modern yang direkomendasikan untuk scroll-based animation
 * 
 * CARA KERJA:
 * 1. Hook memberikan ref → ditempelkan ke elemen via ref={zoomRef}
 * 2. Elemen wajib punya class 'zoom-observe' (CSS: opacity 0, scale 0.8)
 * 3. Saat elemen masuk viewport → ditambah class 'in-view' (CSS: opacity 1, scale 1)
 * 4. Saat keluar viewport → class 'in-view' dihapus (kembali ke state awal)
 */

import { useEffect, useRef } from 'react';

export function useZoomOnScroll() {
  // Ref yang akan dikembalikan dan ditempelkan ke elemen target
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return; // guard: jika elemen belum ter-mount

    // Buat IntersectionObserver
    // KENAPA threshold 0.1?
    // - 0.1 = animasi dimulai saat 10% elemen terlihat
    // - 0 = terlalu sensitif (trigger saat baru 1px masuk)
    // - 0.5 = terlalu lambat (user harus scroll jauh baru trigger)
    // - 0.1 = sweet spot, terasa responsif tapi natural
    //
    // KENAPA rootMargin '0px 0px -100px 0px'?
    // - -100px di bawah = elemen harus 100px masuk viewport baru trigger
    // - Ini mencegah elemen di tepi bawah layar langsung muncul
    // - Efeknya: elemen baru "zoom in" saat sudah cukup terlihat
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view');     // masuk viewport → tampilkan
        } else {
          el.classList.remove('in-view'); // keluar viewport → sembunyikan
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    observer.observe(el); // mulai observasi
    // Cleanup: disconnect observer saat unmount → mencegah memory leak
    return () => observer.disconnect();
  }, []); // [] = setup sekali saat mount

  // Kembalikan ref untuk dipakai oleh komponen
  // Usage: const zoomRef = useZoomOnScroll(); <div ref={zoomRef}>
  return ref;
}
