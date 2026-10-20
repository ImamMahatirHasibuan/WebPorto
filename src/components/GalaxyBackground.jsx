import React, { useRef } from 'react';
import { useGalaxyBackground } from '../hooks/useGalaxyBackground';

export default function GalaxyBackground() {
  const starsRef = useRef(null);
  const shootingRef = useRef(null);
  useGalaxyBackground(starsRef, shootingRef);

  return (
    <div id="galaxy-background">
      <div className="galaxy-planets" aria-hidden="true" />
      <div id="stars" ref={starsRef}></div>
      <div id="nebula"></div>
      <div id="shooting-stars" ref={shootingRef}></div>
    </div>
  );
}
