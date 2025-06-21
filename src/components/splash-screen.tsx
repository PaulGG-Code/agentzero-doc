'use client';

import { motion } from 'framer-motion';

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.5, ease: 'easeInOut' }}
      onAnimationComplete={onAnimationComplete}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950"
    >
      <motion.div
        className="flex items-center text-white text-5xl md:text-7xl font-bold tracking-wider"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>A</motion.span>
        <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>G</motion.span>
        <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>E</motion.span>
        <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>N</motion.span>
        <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>T</motion.span>
        <motion.span
          className="text-6xl md:text-8xl mx-2 text-primary"
          variants={{
            hidden: { opacity: 0, scale: 0.5 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                type: 'spring',
                damping: 15,
                stiffness: 400,
                delay: 0.8,
              },
            },
          }}
        >
          Z
        </motion.span>
        <motion.span variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}>E</motion.span>
        <motion.span variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}>R</motion.span>
        <motion.span variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}>O</motion.span>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen; 