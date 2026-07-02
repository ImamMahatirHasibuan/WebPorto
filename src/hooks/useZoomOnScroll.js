import { useEffect, useRef } from 'react';

// Attach to any element; toggles the 'in-view' class (paired with the
// .zoom-observe base class in index.css) just like the original
// setupZoomOnScroll IntersectionObserver did.
export function useZoomOnScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view');
        } else {
          el.classList.remove('in-view');
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
