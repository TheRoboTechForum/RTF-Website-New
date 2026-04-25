import { useState, useEffect, useCallback } from 'react';

/**
 * usePageReady — Combines data loading and image loading states
 * 
 * Usage:
 *   const { isDataLoaded, areImagesLoaded, isReady } = usePageReady();
 *   const { startDataLoad, completeDataLoad } = usePageReady();
 * 
 * The hook tracks when both data AND images are fully loaded.
 * Only when isReady=true should actual content render.
 */
export function usePageReady(initialCheck = false) {
  const [isDataLoaded, setIsDataLoaded] = useState(initialCheck);
  const [areImagesLoaded, setAreImagesLoaded] = useState(initialCheck);
  const [isReady, setIsReady] = useState(initialCheck);

  // When both data and images load, mark page as ready
  useEffect(() => {
    if (isDataLoaded && areImagesLoaded) {
      setIsReady(true);
    }
  }, [isDataLoaded, areImagesLoaded]);

  const completeDataLoad = useCallback(() => {
    setIsDataLoaded(true);
  }, []);

  const completeImageLoad = useCallback(() => {
    setAreImagesLoaded(true);
  }, []);

  const reset = useCallback(() => {
    setIsDataLoaded(false);
    setAreImagesLoaded(false);
    setIsReady(false);
  }, []);

  return {
    // States
    isDataLoaded,
    areImagesLoaded,
    isReady,
    // Actions
    completeDataLoad,
    completeImageLoad,
    reset,
  };
}

/**
 * useImageLoading — Tracks loading state for a set of images
 * 
 * Usage:
 *   const { onImageLoad, allImagesLoaded } = useImageLoading([img1, img2, img3]);
 *   <img onLoad={onImageLoad} />
 * 
 * Priority images load first, then lazy images.
 * Call completeImagesReady() when critical images are loaded.
 */
export function useImageLoading(imageCount = 0, criticalCount = 0) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [criticalLoaded, setCriticalLoaded] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(imageCount === 0);

  const onImageLoad = useCallback(() => {
    setLoadedCount(prev => {
      const next = prev + 1;
      return next;
    });
  }, []);

  const onCriticalImageLoad = useCallback(() => {
    setCriticalLoaded(prev => prev + 1);
    onImageLoad();
  }, [onImageLoad]);

  // Check if all images are loaded
  useEffect(() => {
    if (imageCount > 0 && loadedCount === imageCount) {
      setAllImagesLoaded(true);
    }
  }, [loadedCount, imageCount]);

  // Critical images threshold (e.g., hero, above-fold)
  const criticalImagesReady = criticalCount === 0 || criticalLoaded >= criticalCount;

  return {
    onImageLoad,
    onCriticalImageLoad,
    allImagesLoaded,
    criticalImagesReady,
    loadedCount,
    progress: imageCount > 0 ? (loadedCount / imageCount) * 100 : 100,
  };
}
