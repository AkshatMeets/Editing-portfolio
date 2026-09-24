import React, { useState, useRef, useEffect } from 'react';
import { Sliders } from 'lucide-react';

interface BeforeAfterProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export const BeforeAfter: React.FC<BeforeAfterProps> = ({
  beforeImage = '/images/before-1.svg',
  afterImage = '/images/after-1.svg',
  beforeLabel = 'RAW AI OUTPUT',
  afterLabel = 'FINAL REFINED EDIT',
  className = '',
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pos);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div className={`w-full ${className}`}>
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-lg border border-[#8F887E]/20 select-none cursor-ew-resize bg-[#1C1C1A] shadow-2xl"
      >
        {/* After Image (Background) */}
        <img
          src={afterImage}
          alt={afterLabel}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-[#1C1C1A]/70 backdrop-blur-md rounded-sm border border-[#8F887E]/20 text-[9px] sm:text-[10px] font-inter uppercase tracking-[0.2em] text-[#F5F1EA]">
          {afterLabel}
        </div>

        {/* Before Image (Foreground overlay with dynamic width) */}
        <div
          className="absolute inset-0 overflow-hidden border-r-2 border-[#F5F1EA] pointer-events-none"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            loading="lazy"
            className="absolute inset-0 h-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          />
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#1C1C1A]/70 backdrop-blur-md rounded-sm border border-[#8F887E]/20 text-[9px] sm:text-[10px] font-inter uppercase tracking-[0.2em] text-[#8F887E]">
            {beforeLabel}
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 z-20 pointer-events-none -translate-x-1/2 flex items-center justify-center"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#F5F1EA] text-[#1C1C1A] flex items-center justify-center shadow-2xl border border-[#8F887E]/20">
            <Sliders className="w-4 h-4 rotate-90" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 text-[10px] sm:text-[11px] font-inter uppercase tracking-widest text-[#8F887E]">
        <span>&larr; SLIDE TO COMPARE</span>
        <span>DRAG TO REVEAL &rarr;</span>
      </div>
    </div>
  );
};
