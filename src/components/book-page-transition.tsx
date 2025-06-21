'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface BookPageTransitionProps {
  children: ReactNode;
}

const bookPageVariants = {
  initial: {
    opacity: 0,
    x: 60,
    rotateY: -25,
    scale: 0.92,
    transformOrigin: 'left center',
    filter: 'brightness(0.7) contrast(1.1)',
  },
  in: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1,
    filter: 'brightness(1) contrast(1)',
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.15,
    },
  },
  out: {
    opacity: 0,
    x: -60,
    rotateY: 25,
    scale: 0.92,
    transformOrigin: 'right center',
    filter: 'brightness(0.7) contrast(1.1)',
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const contentVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.2,
    },
  },
  out: {
    opacity: 0,
    y: -30,
    scale: 0.98,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const pageShadowVariants = {
  initial: {
    opacity: 0,
    x: 0,
    rotateY: 0,
    scale: 1,
  },
  in: {
    opacity: 0.4,
    x: -15,
    rotateY: 20,
    scale: 1.02,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.3,
    },
  },
  out: {
    opacity: 0,
    x: 0,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const pageCurlVariants = {
  initial: {
    opacity: 0,
    rotateY: 0,
    scale: 1,
  },
  in: {
    opacity: 0.1,
    rotateY: -45,
    scale: 1.05,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.4,
    },
  },
  out: {
    opacity: 0,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function BookPageTransition({ children }: BookPageTransitionProps) {
  const pathname = usePathname();

  return (
    <div className="relative w-full h-full book-page-transition" style={{ perspective: '1500px' }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={bookPageVariants}
          className="relative w-full h-full book-page-transition"
        >
          {/* Page curl effect */}
          <motion.div
            variants={pageCurlVariants}
            className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black/10 to-transparent pointer-events-none"
            style={{
              transformOrigin: 'right center',
              clipPath: 'polygon(100% 0%, 0% 0%, 100% 100%)',
            }}
          />
          
          {/* Page shadow effect */}
          <motion.div
            variants={pageShadowVariants}
            className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none"
            style={{
              transformOrigin: 'left center',
            }}
          />
          
          {/* Main content */}
          <motion.div
            variants={contentVariants}
            className="relative z-10 w-full h-full"
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 