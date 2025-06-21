'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    x: 100,
    rotateY: -15,
    transformOrigin: 'left center',
  },
  in: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  out: {
    opacity: 0,
    x: -100,
    rotateY: 15,
    transformOrigin: 'right center',
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.6,
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full h-full"
        style={{
          perspective: '1000px',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 