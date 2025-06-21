'use client';

import { motion } from 'framer-motion';

export function PageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <div className="relative">
        {/* Book spine effect */}
        <motion.div
          className="w-16 h-24 bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-l-lg shadow-lg"
          animate={{
            rotateY: [0, 15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Page turning effect */}
        <motion.div
          className="absolute top-0 left-0 w-16 h-24 bg-white dark:bg-gray-900 rounded-l-lg shadow-lg origin-left"
          animate={{
            rotateY: [0, -180, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        
        {/* Loading text */}
        <motion.div
          className="mt-4 text-center"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <p className="text-sm text-muted-foreground">Loading page...</p>
        </motion.div>
      </div>
    </div>
  );
} 