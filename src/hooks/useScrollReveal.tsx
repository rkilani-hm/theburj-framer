import { useRef } from "react";
import { useInView } from "framer-motion";

interface ScrollRevealOptions {
  once?: boolean;
  margin?: `${number}px` | `${number}px ${number}px` | `${number}px ${number}px ${number}px` | `${number}px ${number}px ${number}px ${number}px`;
  amount?: "some" | "all" | number;
}

export const useScrollReveal = (options: ScrollRevealOptions = {}) => {
  const ref = useRef(null);
  const { once = true, margin = "-100px", amount = 0.2 } = options;
  
  const isInView = useInView(ref, {
    once,
    margin,
    amount,
  });

  return { ref, isInView };
};

// Animation variants for different reveal styles
export const revealVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  // New: Clip-path inspired reveal (for use with motion style prop)
  clipUp: {
    hidden: { clipPath: "inset(100% 0 0 0)" },
    visible: { clipPath: "inset(0% 0 0 0)" },
  },
  clipLeft: {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    visible: { clipPath: "inset(0 0% 0 0)" },
  },
  // New: Stagger container
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  },
  staggerItem: {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0 },
  },
};

// Smooth easing curves
export const easings = {
  expoOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
  circOut: [0, 0.55, 0.45, 1] as [number, number, number, number],
  power4Out: [0.76, 0, 0.24, 1] as [number, number, number, number],
};
