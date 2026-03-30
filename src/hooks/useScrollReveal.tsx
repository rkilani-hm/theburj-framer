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
};
