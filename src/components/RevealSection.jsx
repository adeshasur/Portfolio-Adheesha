import { motion, useReducedMotion } from "framer-motion";

export default function RevealSection({
  as = "section",
  className = "",
  children,
  delay = 0,
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] ?? motion.section;

  return (
    <MotionTag
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
