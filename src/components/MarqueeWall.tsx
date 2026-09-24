import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ─── Portfolio Showcase Images ─────────────────────────────────────────────
// Real portfolio images (img1–img11) with dynamic aspect-ratio awareness.
//
// Each card dynamically detects and adapts to the image's actual natural dimensions
// in the browser, eliminating any black/empty gaps and ensuring that whenever an image
// is replaced in the future, the gallery layout automatically conforms to the new format.

export interface ShowcaseImage {
  id: string;
  src: string;
  alt: string;
  fallbackSrc?: string;
  width?: number;
  height?: number;
}

const SHOWCASE_ITEMS: ShowcaseImage[] = [
  {
    id: 'img1',
    src: '/images/img1.png',
    alt: 'AI fashion editorial — tailored luxury shirt collar and stripe detailing',
    width: 1086,
    height: 1448, // 3:4 (0.7500)
  },
  {
    id: 'img2',
    src: '/images/img2.png',
    alt: 'AI fashion collection — menswear styling, apparel, trousers and leather accessories',
    width: 940,
    height: 1672, // ~9:16 (0.5622)
  },
  {
    id: 'img3',
    src: '/images/img3.png',
    alt: 'AI high-fashion editorial — contemporary models in luxury apparel campaign',
    width: 2160,
    height: 3840, // 9:16 (0.5625)
  },
  {
    id: 'img4',
    src: '/images/img4.png',
    alt: 'Editorial fashion campaign — modern graphic apparel composition',
    width: 1086,
    height: 1448, // 3:4 (0.7500)
  },
  {
    id: 'img5',
    src: '/images/img5.png',
    alt: 'Full-length AI fashion model showcase — street couture styling',
    width: 941,
    height: 1672, // ~9:16 (0.5628)
  },
  {
    id: 'img6',
    src: '/images/img6.png',
    alt: 'AI editorial portrait — refined garment textures and lighting',
    width: 1023,
    height: 1537, // ~2:3 (0.6656)
  },
  {
    id: 'img7',
    src: '/images/img7.webp',
    fallbackSrc: '/images/img7.png',
    alt: 'High-fashion editorial campaign — luxury eyewear and tailored polo styling',
    width: 2160,
    height: 3840, // 9:16 (0.5625)
  },
  {
    id: 'img8',
    src: '/images/img8.png',
    alt: 'Fashion editorial showcase — contemporary aesthetic and garment details',
    width: 1023,
    height: 1537, // ~2:3 (0.6656)
  },
  {
    id: 'img9',
    src: '/images/img9.png',
    alt: 'AI runway look — detailed silhouette and material render',
    width: 1086,
    height: 1448, // 3:4 (0.7500)
  },
  {
    id: 'img10',
    src: '/images/img10.png',
    fallbackSrc: '/images/img10.webp',
    alt: 'High-resolution AI fashion campaign — luxury tailored cuff and accessory composition',
    width: 941,
    height: 1672, // ~9:16 (0.5628)
  },
  {
    id: 'img11',
    src: '/images/img11.jpeg',
    alt: 'Editorial portrait — textured styling and intimate studio composition',
    width: 405,
    height: 591, // ~2:3 (0.6853)
  },
];

// Distributed across two rows for the scroll-driven parallax marquee.
// Sequence balances varying aspect ratios across both rows.
const row1Images: ShowcaseImage[] = [
  SHOWCASE_ITEMS[0], // img1 (3:4)
  SHOWCASE_ITEMS[1], // img2 (9:16)
  SHOWCASE_ITEMS[2], // img3 (9:16)
  SHOWCASE_ITEMS[3], // img4 (3:4)
  SHOWCASE_ITEMS[4], // img5 (9:16)
  SHOWCASE_ITEMS[5], // img6 (2:3)
  SHOWCASE_ITEMS[6], // img7 (9:16)
  SHOWCASE_ITEMS[7], // img8 (2:3)
  SHOWCASE_ITEMS[8], // img9 (3:4)
  SHOWCASE_ITEMS[9], // img10 (9:16)
];

const row2Images: ShowcaseImage[] = [
  SHOWCASE_ITEMS[5],  // img6 (2:3)
  SHOWCASE_ITEMS[6],  // img7 (9:16)
  SHOWCASE_ITEMS[7],  // img8 (2:3)
  SHOWCASE_ITEMS[8],  // img9 (3:4)
  SHOWCASE_ITEMS[9],  // img10 (9:16)
  SHOWCASE_ITEMS[10], // img11 (2:3)
  SHOWCASE_ITEMS[0],  // img1 (3:4)
  SHOWCASE_ITEMS[1],  // img2 (9:16)
  SHOWCASE_ITEMS[2],  // img3 (9:16)
  SHOWCASE_ITEMS[3],  // img4 (3:4)
];

// ─── Dynamic Aspect-Ratio Aware Showcase Card ──────────────────────────────

interface ShowcaseCardProps {
  image: ShowcaseImage;
  priority?: boolean;
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ image, priority }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgSrc, setImgSrc] = useState<string>(image.src);

  // Dynamic aspect ratio calculation:
  // Starts with initial ratio if available (zero layout shift on first frame),
  // then auto-updates whenever the image loads in the browser.
  const [aspectRatio, setAspectRatio] = useState<number>(() => {
    return image.width && image.height ? image.width / image.height : 0.67;
  });

  // Handle image load to dynamically detect real natural dimensions
  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalWidth && naturalHeight > 0) {
      setAspectRatio(naturalWidth / naturalHeight);
    }
  };

  // Fallback to alternate format if an asset has both webp/png variants
  const handleError = () => {
    if (image.fallbackSrc && imgSrc !== image.fallbackSrc) {
      setImgSrc(image.fallbackSrc);
    }
  };

  // Also check if already cached and loaded immediately on mount
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      const { naturalWidth, naturalHeight } = imgRef.current;
      if (naturalWidth && naturalHeight > 0) {
        setAspectRatio(naturalWidth / naturalHeight);
      }
    }
  }, [imgSrc]);

  return (
    <div
      className="relative flex-shrink-0 h-[220px] sm:h-[280px] md:h-[340px] lg:h-[380px] rounded-lg overflow-hidden border border-[#8F887E]/20 bg-[#141413] group shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-2xl hover:border-[#A58B68]/40"
      style={{
        aspectRatio: `${aspectRatio}`,
      }}
    >
      <img
        ref={imgRef}
        src={imgSrc}
        alt={image.alt}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        className="w-full h-full object-contain block transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {/* Subtle protective ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/35 via-transparent to-transparent opacity-25 group-hover:opacity-0 transition-opacity pointer-events-none" />
    </div>
  );
};

// ─── MarqueeWall Component ─────────────────────────────────────────────────

export const MarqueeWall: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Row 1 moves to the right based on scroll position
  const xRow1 = useTransform(scrollYProgress, [0, 1], ['-28%', '0%']);
  
  // Row 2 moves to the left based on scroll position
  const xRow2 = useTransform(scrollYProgress, [0, 1], ['0%', '-28%']);

  return (
    <section 
      ref={containerRef} 
      className="relative py-16 sm:py-24 md:py-28 overflow-hidden bg-[#1C1C1A] select-none"
    >
      <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 w-full">
        
        {/* Row 1 — Moves Right */}
        <motion.div 
          style={{ x: xRow1 }} 
          className="flex gap-3 sm:gap-4 md:gap-5 w-max will-change-transform items-center"
        >
          {row1Images.map((image, idx) => (
            <ShowcaseCard
              key={`row1-${image.id}-${idx}`}
              image={image}
              priority={idx < 4}
            />
          ))}
        </motion.div>

        {/* Row 2 — Moves Left */}
        <motion.div 
          style={{ x: xRow2 }} 
          className="flex gap-3 sm:gap-4 md:gap-5 w-max will-change-transform items-center"
        >
          {row2Images.map((image, idx) => (
            <ShowcaseCard
              key={`row2-${image.id}-${idx}`}
              image={image}
              priority={idx < 4}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
};
