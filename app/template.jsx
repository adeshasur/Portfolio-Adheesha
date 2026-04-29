"use client";

import { motion } from "framer-motion";

const transitionVariants = {
  initial: {
    y: 0,
  },
  animate: {
    y: "-100%",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const stripeVariants = {
  initial: {
    scaleY: 1,
  },
  animate: (i) => ({
    scaleY: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.05 * i,
    },
  }),
};

export default function Template({ children }) {
  return (
    <div>
      {/* Cinematic Transition Overlay */}
      <div className="pointer-events-none fixed inset-0 z-[200] flex flex-col">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={stripeVariants}
            initial="initial"
            animate="animate"
            className="relative w-full flex-1 bg-zinc-950 origin-top"
          >
            {/* Subtle accent line on the first stripe */}
            {i === 0 && (
               <div className="absolute bottom-0 h-px w-full bg-gold/20" />
            )}
          </motion.div>
        ))}
        
        {/* Center Logo / Signature Fade Out */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex flex-col items-center">
            <span className="font-display text-4xl font-bold tracking-tighter text-white">ADHEESHA</span>
            <div className="mt-2 h-0.5 w-12 bg-gold" />
          </div>
        </motion.div>
      </div>

      {/* Main Page Content Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
