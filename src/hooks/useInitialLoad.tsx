import { useState, useEffect, useCallback } from "react";

interface UseInitialLoadOptions {
  minDuration?: number;
  sessionKey?: string;
}

export const useInitialLoad = (options: UseInitialLoadOptions = {}) => {
  const { 
    minDuration = 2200, 
    sessionKey = "alhamra_initial_load_shown" 
  } = options;

  // Check if this is the first visit in this session
  const [hasShownLoader, setHasShownLoader] = useState(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem(sessionKey) === "true";
  });

  const [isLoading, setIsLoading] = useState(!hasShownLoader);
  const [assetsReady, setAssetsReady] = useState(false);

  // Track critical assets loading
  useEffect(() => {
    if (hasShownLoader) {
      setAssetsReady(true);
      return;
    }

    const checkAssets = async () => {
      try {
        // Wait for fonts
        if (document.fonts) {
          await document.fonts.ready;
        }
        
        // Wait for document ready state
        if (document.readyState !== "complete") {
          await new Promise<void>((resolve) => {
            window.addEventListener("load", () => resolve(), { once: true });
          });
        }

        setAssetsReady(true);
      } catch {
        // Fallback - mark as ready after a delay
        setTimeout(() => setAssetsReady(true), 1000);
      }
    };

    checkAssets();
  }, [hasShownLoader]);

  const handleComplete = useCallback(() => {
    setIsLoading(false);
    setHasShownLoader(true);
    sessionStorage.setItem(sessionKey, "true");
  }, [sessionKey]);

  return {
    isLoading,
    assetsReady,
    hasShownLoader,
    handleComplete,
    minDuration,
  };
};
