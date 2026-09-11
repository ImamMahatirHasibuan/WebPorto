/**
 * useGalaxyBackground.js
 * ======================
 * Custom React hook untuk membuat background galaxy (langit malam bertabur bintang).
 * 
 * KENAPA pakai custom hook?
 * - Memisahkan logika DOM manipulation dari komponen React (separation of concerns)
 * - Bisa di-reuse di komponen mana saja
 * - Cleanup otomatis saat komponen unmount (mencegah memory leak)
 * 
 * KENAPA pakai DOM manipulation langsung (createElement) bukan JSX?
 * - Karena membuat 100+ elemen bintang secara dinamis lebih efisien via DOM API
 * - Menghindari re-render React yang tidak perlu untuk elemen dekoratif
 * - Elemen ini murni visual, tidak perlu state management React
 */

import { useEffect, useRef } from 'react';
// useEffect: menjalankan side-effect (manipulasi DOM) setelah render
// useRef: menyimpan referensi yang persist antar render tanpa trigger re-render

/**
 * Hook utama untuk membuat galaxy background
 * @param {React.RefObject} starsRef - ref ke container div untuk bintang statis & bergerak
 * @param {React.RefObject} shootingRef - ref ke container div untuk bintang jatuh
 * 
 * KENAPA pakai 2 ref terpisah?
 * - Bintang statis dan shooting star punya z-index berbeda
 * - Memudahkan cleanup (innerHTML = '') tanpa saling mengganggu
 */
export function useGalaxyBackground(starsRef, shootingRef) {
  // useRef untuk menyimpan array bintang bergerak & jatuh
  // KENAPA useRef bukan useState?
  // - Karena perubahan array ini TIDAK perlu trigger re-render
  // - useRef lebih ringan untuk data yang hanya dipakai internal
  const movingStarsRef = useRef([]);
  const shootingStarsRef = useRef([]);

  useEffect(() => {
    // Ambil elemen DOM dari ref yang dikirim komponen parent
    const starsContainer = starsRef.current;
    const shootingContainer = shootingRef.current;
    // Guard clause: jika container belum siap, jangan jalankan
    if (!starsContainer || !shootingContainer) return;

    // ========================================
    // 1. BINTANG STATIS (Static Twinkling Stars)
    // ========================================
    // Membuat 100 bintang statis yang berkedip (twinkle)
    // KENAPA 100 bukan 200?
    // - 200 terlalu berat untuk performa, 100 sudah cukup terlihat bagus
    // - Setiap elemen DOM = memory + CSS animation thread
    const numberOfStars = 100;
    const staticStars = [];
    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';

      // Randomisasi ukuran bintang: 20% large, 30% medium, 50% small
      // KENAPA distribusi ini?
      // - Lebih banyak bintang kecil = lebih realistis seperti langit malam asli
      // - Bintang besar sedikit = jadi focal point yang menonjol
      const size = Math.random();
      if (size > 0.8) star.classList.add('large');       // 20% bintang besar
      else if (size > 0.5) star.classList.add('medium');  // 30% bintang sedang
      else star.classList.add('small');                    // 50% bintang kecil

      // Posisi random di seluruh layar (persentase agar responsif)
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';

      // Delay & durasi animasi random agar bintang tidak berkedip serempak
      // KENAPA random delay?
      // - Kalau semua bintang berkedip bareng, terlihat aneh dan tidak natural
      // - Random delay = efek twinkle yang organik
      star.style.animationDelay = Math.random() * 3 + 's';
      star.style.animationDuration = (Math.random() * 2 + 1) + 's'; // 1-3 detik

      starsContainer.appendChild(star);
      staticStars.push(star);
    }

    // ========================================
    // 2. BINTANG BERGERAK (Moving Stars)
    // ========================================
    // 10 bintang yang bergerak horizontal (efek paralax)
    // KENAPA 10?
    // - Cukup untuk memberi kesan "hidup" tanpa membebani performa
    // - Lebih sedikit dari bintang statis karena animasi bergerak lebih berat
    const movingStars = [];
    for (let i = 0; i < 10; i++) {
      const star = document.createElement('div');
      star.className = 'moving-star';
      // Ukuran random 1-4px
      star.style.width = (Math.random() * 3 + 1) + 'px';
      star.style.height = star.style.width; // selalu bulat (lebar = tinggi)
      star.style.top = Math.random() * 100 + '%';
      // Delay besar (0-15s) agar tidak semua bergerak bareng
      star.style.animationDelay = Math.random() * 15 + 's';
      // Durasi lama (10-20s) agar pergerakan lambat dan elegan
      star.style.animationDuration = (Math.random() * 10 + 10) + 's';
      starsContainer.appendChild(star);
      movingStars.push(star);
    }
    movingStarsRef.current = movingStars;

    // ========================================
    // 3. BINTANG JATUH (Shooting Stars)
    // ========================================
    // 5 bintang jatuh yang sesekali muncul
    // KENAPA cuma 5?
    // - Shooting star itu langka di dunia nyata, jadi sedikit = lebih realistis
    // - Terlalu banyak shooting star malah mengganggu fokus user
    const shootingStars = [];
    for (let i = 0; i < 5; i++) {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      // Hanya di 50% atas layar (bintang jatuh dari atas)
      shootingStar.style.top = Math.random() * 50 + '%';
      shootingStar.style.animationDelay = Math.random() * 8 + 's';
      shootingStar.style.animationDuration = (Math.random() * 2 + 2) + 's'; // 2-4 detik
      shootingContainer.appendChild(shootingStar);
      shootingStars.push(shootingStar);
    }
    shootingStarsRef.current = shootingStars;

    // ========================================
    // 4. KONSTELASI (Constellation Lines)
    // ========================================
    // Canvas untuk menggambar garis antar bintang besar (efek rasi bintang)
    // KENAPA pakai Canvas bukan SVG/div?
    // - Canvas lebih efisien untuk menggambar banyak garis
    // - Satu canvas = satu layer compositing, vs banyak div = banyak layer
    // - Mudah di-clear dan redraw saat resize
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none'; // agar tidak memblokir klik di bawahnya
    canvas.style.opacity = '0.3'; // semi-transparan agar tidak terlalu mencolok
    starsContainer.appendChild(canvas);

    // Resize canvas agar sesuai ukuran layar
    // KENAPA perlu resize manual?
    // - CSS width/height hanya mengubah tampilan, bukan resolusi canvas
    // - canvas.width/height = resolusi pixel sebenarnya untuk menggambar
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Fungsi menggambar garis konstelasi antar bintang besar
    const drawConstellations = () => {
      // Filter hanya bintang besar (class 'large')
      const largeStars = staticStars.filter((s) => s.classList.contains('large'));
      // Konversi posisi persentase ke pixel berdasarkan ukuran canvas
      const starsArray = largeStars.map((star) => ({
        x: (parseFloat(star.style.left) / 100) * canvas.width,
        y: (parseFloat(star.style.top) / 100) * canvas.height
      }));

      ctx.clearRect(0, 0, canvas.width, canvas.height); // bersihkan canvas
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)'; // warna ungu transparan
      ctx.lineWidth = 0.5; // garis sangat tipis

      // Algoritma: hubungkan setiap pasangan bintang yang jaraknya < 150px
      // KENAPA 150px?
      // - Terlalu kecil = garis terlalu sedikit, tidak terlihat
      // - Terlalu besar = terlalu banyak garis, jadi berantakan
      // - 150px = sweet spot untuk tampilan konstelasi natural
      starsArray.forEach((star1, i) => {
        starsArray.slice(i + 1).forEach((star2) => {
          const distance = Math.sqrt((star2.x - star1.x) ** 2 + (star2.y - star1.y) ** 2);
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(star1.x, star1.y);
            ctx.lineTo(star2.x, star2.y);
            ctx.stroke();
          }
        });
      });
    };

    // Event listener resize agar canvas dan konstelasi responsif
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    // Delay 1 detik sebelum gambar konstelasi
    // KENAPA delay?
    // - Agar semua bintang sudah ter-render dulu sebelum menghitung posisi
    const constellationTimer = setTimeout(drawConstellations, 1000);

    // ========================================
    // 5. INTERVAL REFRESH (Periodic Updates)
    // ========================================
    // Setiap 3 detik, ada 5% kemungkinan bintang bergerak pindah posisi
    // KENAPA interval 3 detik bukan 1 detik?
    // - 1 detik terlalu sering = terlalu banyak style update = berat
    // - 3 detik = cukup halus tanpa membebani CPU
    const movingInterval = setInterval(() => {
      movingStars.forEach((star) => {
        if (Math.random() > 0.95) { // 5% kemungkinan
          star.style.top = Math.random() * 100 + '%';
          star.style.animationDelay = '0s'; // mulai ulang animasi segera
        }
      });
    }, 3000);

    // Setiap 3 detik, ada 30% kemungkinan shooting star muncul di posisi baru
    const shootingInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% kemungkinan
        const randomStar = shootingStars[Math.floor(Math.random() * shootingStars.length)];
        randomStar.style.top = Math.random() * 50 + '%';
        randomStar.style.animationDelay = '0s';
      }
    }, 3000);

    // ========================================
    // 6. VISIBILITY HANDLER (Hemat Resource)
    // ========================================
    // Pause semua animasi saat tab tidak aktif
    // KENAPA perlu ini?
    // - Menghemat CPU & baterai saat user beralih tab
    // - Browser modern sudah throttle rAF, tapi CSS animation tetap jalan
    // - Ini memastikan SEMUA animasi benar-benar berhenti
    const handleVisibility = () => {
      const isVisible = !document.hidden;
      [...movingStars, ...shootingStars].forEach((el) => {
        el.style.animationPlayState = isVisible ? 'running' : 'paused';
      });
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // ========================================
    // 7. CLEANUP FUNCTION
    // ========================================
    // Dipanggil saat komponen unmount
    // KENAPA penting?
    // - Mencegah memory leak dari interval/timeout yang masih jalan
    // - Menghapus event listener yang sudah tidak diperlukan
    // - Membersihkan DOM nodes yang dibuat manual
    return () => {
      clearInterval(movingInterval);
      clearInterval(shootingInterval);
      clearTimeout(constellationTimer);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibility);
      starsContainer.innerHTML = ''; // hapus semua child nodes sekaligus
      shootingContainer.innerHTML = '';
    };
  }, [starsRef, shootingRef]);
  // Dependency array: [starsRef, shootingRef]
  // KENAPA ref ada di dependency?
  // - Secara teknis ref.current berubah setelah mount, tapi ref object-nya stable
  // - Ini lebih untuk kejelasan: effect bergantung pada kedua ref ini
}