import { useRef, useState, useCallback, useEffect } from 'react';

/**
 * Drag an element with resistance (the further you pull, the harder it gets,
 * like a real lanyard), and on release it springs back to (0,0) with a
 * couple of elastic bounces before settling - instead of a single easing.
 */
export function useElasticDrag({ maxPull = 130, stiffness = 0.18, damping = 0.8 } = {}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const startRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const draggingRef = useRef(false);

  const getPoint = (e) => {
    if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  };

  const stopSpring = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  const runSpring = useCallback(() => {
    const step = () => {
      const p = posRef.current;
      const v = velRef.current;

      const ax = -stiffness * p.x;
      const ay = -stiffness * p.y;
      v.x = (v.x + ax) * damping;
      v.y = (v.y + ay) * damping;
      p.x += v.x;
      p.y += v.y;

      if (Math.abs(p.x) < 0.5 && Math.abs(p.y) < 0.5 && Math.abs(v.x) < 0.5 && Math.abs(v.y) < 0.5) {
        posRef.current = { x: 0, y: 0 };
        setPos({ x: 0, y: 0 });
        rafRef.current = null;
        return;
      }

      setPos({ x: p.x, y: p.y });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }, [stiffness, damping]);

  const handleMove = useCallback((e) => {
    if (!draggingRef.current) return;
    if (e.touches) e.preventDefault();

    const p = getPoint(e);
    let dx = p.x - startRef.current.x;
    let dy = p.y - startRef.current.y;

    // Resistance curve: approaches maxPull asymptotically instead of hard-clamping
    dx = Math.sign(dx) * maxPull * (1 - Math.exp(-Math.abs(dx) / maxPull));
    dy = Math.sign(dy) * maxPull * (1 - Math.exp(-Math.abs(dy) / maxPull));

    posRef.current = { x: dx, y: dy };
    setPos({ x: dx, y: dy });
  }, [maxPull]);

  const handleEnd = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setDragging(false);
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleEnd);
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('touchend', handleEnd);
    runSpring();
  }, [handleMove, runSpring]);

  const handleStart = useCallback((e) => {
    stopSpring();
    draggingRef.current = true;
    setDragging(true);
    velRef.current = { x: 0, y: 0 };
    const p = getPoint(e);
    startRef.current = { x: p.x - posRef.current.x, y: p.y - posRef.current.y };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd);
  }, [handleMove, handleEnd]);

  useEffect(() => {
    return () => {
      stopSpring();
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [handleMove, handleEnd]);

  const bind = {
    onMouseDown: handleStart,
    onTouchStart: handleStart
  };

  return { pos, bind, dragging };
}
