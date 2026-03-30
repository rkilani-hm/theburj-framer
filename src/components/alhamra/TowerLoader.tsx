import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import animatedLogo from "@/assets/animated-logo.gif";

interface TowerLoaderProps {
  durationMs?: number;
  onComplete?: () => void;
  theme?: "light" | "dark";
}

const TowerLoader = ({
  durationMs = 7000,
  onComplete,
}: TowerLoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 800);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [durationMs, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <motion.img
            src={animatedLogo}
            alt="Al Hamra Tower"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-48 h-auto sm:w-56"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TowerLoader;
