import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  return (
    <>
      {/* Curtain Wipe Overlay — slides up then disappears */}
      <motion.div
        key={`curtain-${location.pathname}`}
        className="fixed inset-0 z-[60] bg-foreground origin-bottom pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.1,
        }}
        style={{ transformOrigin: "top" }}
      />
      {/* Second curtain layer — brand red accent */}
      <motion.div
        key={`curtain2-${location.pathname}`}
        className="fixed inset-0 z-[59] bg-primary pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.2,
        }}
        style={{ transformOrigin: "top" }}
      />

      {/* Page content fades in after curtain */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
