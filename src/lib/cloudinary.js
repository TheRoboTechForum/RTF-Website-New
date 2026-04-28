/**
 * Transform a Cloudinary URL to get optimized version
 * Inserts transformation params into the URL
 */
export function getOptimizedImage(url, { width = 640, height = 400, quality = 'auto' } = {}) {
  if (!url || !url.includes('cloudinary.com')) return url;
  
  // Insert transformations: f_auto (format), q_auto (quality), w_, h_, c_fill
  const transformation = `f_auto,q_${quality},w_${width},h_${height},c_fill`;
  
  return url.replace('/upload/', `/upload/${transformation}/`);
}

export function getCardImage(url) {
  return getOptimizedImage(url, { width: 640, height: 400, quality: 'auto' });
}

export function getDetailImage(url) {
  return getOptimizedImage(url, { width: 1200, height: 800, quality: 'auto' });
}

export function getThumbnail(url) {
  return getOptimizedImage(url, { width: 120, height: 80, quality: 60 });
}
