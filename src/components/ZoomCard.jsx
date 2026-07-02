import React from 'react';
import { useZoomOnScroll } from '../hooks/useZoomOnScroll';

// Wraps children with the zoom-on-scroll observer + required CSS classes,
// merging in any extra className passed by the caller.
export default function ZoomCard({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useZoomOnScroll();
  return (
    <Tag ref={ref} className={`zoom-observe ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
