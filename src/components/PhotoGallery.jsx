import React, { useState, useRef } from 'react';

export default function PhotoGallery({ images = [] }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);

  if (!images || images.length === 0) return null;

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        next(); // swipe left -> next
      } else {
        prev(); // swipe right -> prev
      }
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="photo-gallery"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="gallery-container">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            className={`activity-photo${i === current ? ' active' : ''}`}
            alt={`Activity documentation ${i + 1}`}
            loading="lazy"
          />
        ))}

        {/* Counter badge */}
        <span className="gallery-counter">
          {current + 1} / {images.length}
        </span>
      </div>

      <div className="gallery-controls">
        <button
          type="button"
          className="prev-btn"
          onClick={prev}
          aria-label="Previous photo"
        >
          <i className="fas fa-chevron-left" aria-hidden="true"></i>
        </button>

        <div className="gallery-dots" role="tablist" aria-label="Photo dots">
          {images.map((_, i) => (
            <button
              type="button"
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to photo ${i + 1}`}
              className={`dot${i === current ? ' active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>

        <button
          type="button"
          className="next-btn"
          onClick={next}
          aria-label="Next photo"
        >
          <i className="fas fa-chevron-right" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
