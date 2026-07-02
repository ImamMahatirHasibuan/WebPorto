import React, { useState } from 'react';

export default function PhotoGallery({ images }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="photo-gallery">
      <div className="gallery-container">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            className={`activity-photo${i === current ? ' active' : ''}`}
            alt=""
          />
        ))}
      </div>
      <div className="gallery-controls">
        <button className="prev-btn" onClick={prev}>&#10094;</button>
        <div className="gallery-dots">
          {images.map((_, i) => (
            <span
              key={i}
              className={`dot${i === current ? ' active' : ''}`}
              onClick={() => setCurrent(i)}
            ></span>
          ))}
        </div>
        <button className="next-btn" onClick={next}>&#10095;</button>
      </div>
    </div>
  );
}
