/**
 * Image Loading Utility — Preload and track critical images
 * 
 * Usage:
 *   preloadImages([url1, url2], onLoad);
 *   checkImageLoaded(url);
 */

const imageCache = new Set();

export function preloadImages(urls, onComplete) {
  if (!urls || urls.length === 0) {
    onComplete?.();
    return;
  }

  let loaded = 0;
  const total = urls.length;

  urls.forEach(url => {
    if (imageCache.has(url)) {
      loaded++;
      if (loaded === total) {
        onComplete?.();
      }
      return;
    }

    const img = new Image();
    img.onload = () => {
      imageCache.add(url);
      loaded++;
      if (loaded === total) {
        onComplete?.();
      }
    };
    img.onerror = () => {
      // Still count as complete even if image fails
      // This prevents infinite loading on broken images
      loaded++;
      if (loaded === total) {
        onComplete?.();
      }
    };
    img.src = url;
  });
}

export function isImageLoaded(url) {
  return imageCache.has(url);
}

export function clearImageCache() {
  imageCache.clear();
}

/**
 * Preload image with promise -- easier for async/await
 */
export function loadImage(url) {
  return new Promise((resolve) => {
    if (imageCache.has(url)) {
      resolve();
      return;
    }

    const img = new Image();
    img.onload = () => {
      imageCache.add(url);
      resolve();
    };
    img.onerror = () => {
      // Always resolve, even on error
      resolve();
    };
    img.src = url;
  });
}
