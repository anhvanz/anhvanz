'use client';
import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

const avatars = [
  'https://i.pinimg.com/736x/de/31/7e/de317e4adde5e9fda7bc6db91254ac68.jpg',
  'https://avatars.githubusercontent.com/u/89678032?v=4',
  'https://i.pinimg.com/736x/3f/e3/77/3fe377b1cf5e3a9db83b3f99962f6fe0.jpg',
  'https://i.pinimg.com/736x/85/f8/bf/85f8bf2c85883f7fc80e2b87ea3528d9.jpg',
  'https://i.pinimg.com/736x/e0/5f/ad/e05fadbfd0aaf82028da114502eda023.jpg',
  'https://i.pinimg.com/736x/7e/d7/64/7ed764e320a33ca302aad89e9107ba6c.jpg',
  'https://i.pinimg.com/736x/5b/1e/8a/5b1e8a5e05329969527ad760227eb3cd.jpg',
];

export default function AvatarStack() {
  const [images, setImages] = useState(avatars);

  const handleDragEnd = () => {
    const updated = [...images.slice(1), images[0]];
    setImages(updated);
  };

  return (
    <div className="relative w-[120px] h-[120px]">
      {images.map((src, idx) => {
        const isTop = idx === 0;
        const z = images.length - idx;

        if (isTop) {
          return (
            <DraggableImage
              key={src}
              src={src}
              onDragEnd={handleDragEnd}
              zIndex={z}
            />
          );
        }

        // Càng về sau thì xòe ra xa hơn + xoay nhẹ
        const offsetX = idx * 8;
        const offsetY = idx * 4;
        const rotate = idx * 3;

        return (
          <motion.img
            key={src}
            src={src}
            initial={{ scale: 0.95 }}
            animate={{
              x: offsetX,
              y: offsetY,
              rotate,
              scale: 0.95,
            }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-0 w-full h-full rounded-lg object-cover pointer-events-none shadow-md"
            style={{ zIndex: z }}
          />
        );
      })}
    </div>
  );
}

function DraggableImage({
  src,
  onDragEnd,
  zIndex,
}: {
  src: string;
  onDragEnd: () => void;
  zIndex: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Góc lật mạnh hơn khi kéo
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);


  return (
    <motion.img
      src={src}
      drag
      dragElastic={0.5}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 30 || Math.abs(info.offset.y) > 30) {
          onDragEnd();
        }
      }}
      className="absolute top-0 left-0 w-full h-full rounded-lg object-cover cursor-grab shadow-lg"
      style={{
        x,
        y,
        rotateX,
        rotateY,
        zIndex,
        transformPerspective: 1500,
      }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
    />
  );
}
