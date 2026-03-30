import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          {/* Architectural grid background */}
          <div className="absolute inset-0 architectural-grid opacity-30" />
          
          {/* Logo and loading indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center gap-8"
          >
            {/* Al Hamra Logo */}
            <div className="flex flex-col items-center gap-4">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Tower Icon */}
                <svg 
                  width="48" 
                  height="80" 
                  viewBox="0 0 48 80" 
                  fill="none" 
                  className="text-foreground"
                >
                  <path 
                    d="M24 0L48 20V80H0V20L24 0Z" 
                    fill="currentColor" 
                    fillOpacity="0.1"
                  />
                  <path 
                    d="M24 4L44 22V76H4V22L24 4Z" 
                    stroke="currentColor" 
                    strokeWidth="1"
                    fill="none"
                  />
                  <line x1="24" y1="22" x2="24" y2="76" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
                  <line x1="14" y1="30" x2="14" y2="76" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
                  <line x1="34" y1="30" x2="34" y2="76" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
                </svg>
              </motion.div>
              
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl tracking-[0.3em] font-light text-foreground uppercase">
                  Al Hamra
                </span>
                <span className="text-xs tracking-[0.5em] text-muted-foreground uppercase">
                  Tower
                </span>
              </div>
            </div>
            
            {/* Animated loading line */}
            <div className="w-32 h-px bg-border overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className="w-full h-full bg-foreground"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
