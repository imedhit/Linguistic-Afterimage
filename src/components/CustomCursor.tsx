import React, { useEffect, useState, useRef } from 'react';

/**
 * CustomCursor
 * Replicates the precision white crosshair reticle cursor from the reference video.
 * - Circular reticle with extending crosshairs and center dot
 * - Crisp pure white with dark contrast halo/drop-shadow for 100% legibility on all backgrounds (light & dark)
 * - Smooth hardware-accelerated tracking
 * - Subtle scale expansion on hover over interactive elements (buttons, links, toggles)
 * - Responsive to mouse clicks (tactile compression)
 * - Automatically hidden on touch-only devices
 */
export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(true);

  const requestRef = useRef<number | null>(null);
  const mousePosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if device uses a fine pointer (mouse/trackpad)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    const onMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button, a, input, select, textarea, [role="button"], [role="slider"], label, .cursor-pointer, .leaflet-control, .leaflet-interactive') ||
          window.getComputedStyle(target).cursor === 'pointer'
        );
        setIsHovered(isInteractive);
      }
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // RAF loop for smooth 60/120fps positioning
    const updateCursor = () => {
      setPosition(prev => {
        // Direct tracking without lag
        if (prev.x === mousePosRef.current.x && prev.y === mousePosRef.current.y) {
          return prev;
        }
        return { x: mousePosRef.current.x, y: mousePosRef.current.y };
      });
      requestRef.current = requestAnimationFrame(updateCursor);
    };
    requestRef.current = requestAnimationFrame(updateCursor);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  if (!isFinePointer) return null;

  const size = 28;
  const half = size / 2;

  // Scale calculations:
  // Base: 1.0, Hover: 1.25, Clicking: 0.9
  let scale = 1.0;
  if (isClicking) {
    scale = 0.9;
  } else if (isHovered) {
    scale = 1.24;
  }

  return (
    <div
      className="fixed pointer-events-none z-[99999] transition-opacity duration-150 ease-out"
      style={{
        left: 0,
        top: 0,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        opacity: isVisible && position.x >= 0 ? 1 : 0,
        willChange: 'transform, opacity',
      }}
      aria-hidden="true"
    >
      <div
        className="transition-transform duration-150 ease-out flex items-center justify-center"
        style={{
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        {/*
          Precision White Crosshair Reticle Cursor from Reference Video
          - Viewport size: 28x28 (center at 14, 14)
          - Circle: r = 9 (diameter 18)
          - Crosshairs: extend across the circle and 3px beyond the circle edge (x: 2 to 26, y: 2 to 26)
          - High-contrast dual stroke: dark backdrop shadow & outline so pure white remains 100% legible on both dark and light backgrounds
        */}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: 'drop-shadow(0px 0px 1.5px rgba(0, 0, 0, 0.95)) drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.8))',
          }}
        >
          {/* Dark under-stroke for absolute contrast on white/light areas */}
          <g stroke="#05070a" strokeWidth="2.8" strokeLinecap="square" opacity="0.85">
            {/* Outer Square Reticle */}
            <rect x="5.5" y="5.5" width="17" height="17" rx="0.5" />
            {/* Horizontal Crosshair Line */}
            <line x1="2" y1={half} x2="26" y2={half} />
            {/* Vertical Crosshair Line */}
            <line x1={half} y1="2" x2={half} y2="26" />
          </g>

          {/* Crisp Pure White Foreground Square Reticle */}
          <g stroke="#ffffff" strokeWidth="1.5" strokeLinecap="square">
            {/* Outer Square Reticle */}
            <rect x="5.5" y="5.5" width="17" height="17" rx="0.5" />
            {/* Horizontal Crosshair Line */}
            <line x1="2" y1={half} x2="26" y2={half} />
            {/* Vertical Crosshair Line */}
            <line x1={half} y1="2" x2={half} y2="26" />
          </g>

          {/* Center Precision Dot */}
          <circle cx={half} cy={half} r="1.2" fill="#ffffff" />
          <circle cx={half} cy={half} r="0.6" fill="#000000" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
};
