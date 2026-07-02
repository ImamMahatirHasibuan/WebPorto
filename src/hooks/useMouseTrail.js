import { useEffect } from 'react';

// Optimised mouse trail using a single off-screen canvas overlay instead of
// dozens of throwaway DOM nodes. A fixed-size particle pool is recycled so
// we never allocate during the hot path and the single rAF loop batches all
// draw calls.

const MAX_PARTICLES = 40;
const FADE_SPEED = 0.015;

export function useMouseTrail() {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.cssText =
      'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9998';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Pre-allocated particle pool
    const pool = Array.from({ length: MAX_PARTICLES }, () => ({
      x: 0,
      y: 0,
      opacity: 0,
      size: 0,
    }));
    let poolIndex = 0;

    // Throttle: only spawn a particle every ~30 ms
    let lastSpawn = 0;
    const handleMouseMove = (e) => {
      const now = performance.now();
      if (now - lastSpawn < 30) return;
      lastSpawn = now;

      const p = pool[poolIndex];
      p.x = e.clientX;
      p.y = e.clientY;
      p.opacity = 0.6;
      p.size = Math.random() * 2 + 2;
      poolIndex = (poolIndex + 1) % MAX_PARTICLES;
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < MAX_PARTICLES; i++) {
        const p = pool[i];
        if (p.opacity <= 0) continue;

        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = 'rgb(168, 85, 247)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.opacity -= FADE_SPEED;
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', handleMouseMove);
      if (document.body.contains(canvas)) document.body.removeChild(canvas);
    };
  }, []);
}
