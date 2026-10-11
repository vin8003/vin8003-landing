import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

/**
 * Reading progress hairline under the nav. It answers "how far through the page am I",
 * so it earns its motion as feedback. Driven by motion values, never React state, and
 * it collapses to an instant bar under prefers-reduced-motion.
 */
export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-ember"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
    />
  );
}
