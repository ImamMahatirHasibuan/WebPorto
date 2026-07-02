import { useEffect, useRef } from 'react';

// Ports the original createStars / createMovingStars / createShootingStars /
// animateMovingStars / animateShootingStars / createConstellations logic
// into a single effect hook that mounts DOM nodes into the given refs.
export function useGalaxyBackground(starsRef, shootingRef) {
  const movingStarsRef = useRef([]);
  const shootingStarsRef = useRef([]);

  useEffect(() => {
    const starsContainer = starsRef.current;
    const shootingContainer = shootingRef.current;
    if (!starsContainer || !shootingContainer) return;

    // Static twinkling stars
    const numberOfStars = 100;
    const staticStars = [];
    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random();
      if (size > 0.8) star.classList.add('large');
      else if (size > 0.5) star.classList.add('medium');
      else star.classList.add('small');
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 3 + 's';
      star.style.animationDuration = (Math.random() * 2 + 1) + 's';
      starsContainer.appendChild(star);
      staticStars.push(star);
    }

    // Moving stars
    const movingStars = [];
    for (let i = 0; i < 10; i++) {
      const star = document.createElement('div');
      star.className = 'moving-star';
      star.style.width = (Math.random() * 3 + 1) + 'px';
      star.style.height = star.style.width;
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 15 + 's';
      star.style.animationDuration = (Math.random() * 10 + 10) + 's';
      starsContainer.appendChild(star);
      movingStars.push(star);
    }
    movingStarsRef.current = movingStars;

    // Shooting stars
    const shootingStars = [];
    for (let i = 0; i < 5; i++) {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      shootingStar.style.top = Math.random() * 50 + '%';
      shootingStar.style.animationDelay = Math.random() * 8 + 's';
      shootingStar.style.animationDuration = (Math.random() * 2 + 2) + 's';
      shootingContainer.appendChild(shootingStar);
      shootingStars.push(shootingStar);
    }
    shootingStarsRef.current = shootingStars;

    // Constellation canvas connecting the large stars
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.3';
    starsContainer.appendChild(canvas);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawConstellations = () => {
      const largeStars = staticStars.filter((s) => s.classList.contains('large'));
      const starsArray = largeStars.map((star) => ({
        x: (parseFloat(star.style.left) / 100) * canvas.width,
        y: (parseFloat(star.style.top) / 100) * canvas.height
      }));

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
      ctx.lineWidth = 0.5;

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

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    const constellationTimer = setTimeout(drawConstellations, 1000);

    // Periodic movement/appearance refresh, same cadence as the original
    const movingInterval = setInterval(() => {
      movingStars.forEach((star) => {
        if (Math.random() > 0.95) {
          star.style.top = Math.random() * 100 + '%';
          star.style.animationDelay = '0s';
        }
      });
    }, 3000);

    const shootingInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomStar = shootingStars[Math.floor(Math.random() * shootingStars.length)];
        randomStar.style.top = Math.random() * 50 + '%';
        randomStar.style.animationDelay = '0s';
      }
    }, 3000);

    // Pause animations when tab isn't visible (matches original visibilitychange handler)
    const handleVisibility = () => {
      const isVisible = !document.hidden;
      [...movingStars, ...shootingStars].forEach((el) => {
        el.style.animationPlayState = isVisible ? 'running' : 'paused';
      });
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(movingInterval);
      clearInterval(shootingInterval);
      clearTimeout(constellationTimer);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibility);
      starsContainer.innerHTML = '';
      shootingContainer.innerHTML = '';
    };
  }, [starsRef, shootingRef]);
}
