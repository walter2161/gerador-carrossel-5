export async function loadMask(slideIndex: number): Promise<HTMLImageElement | null> {
  try {
    const maskImage = await loadImage(`/mascaras/0${slideIndex + 1}.png`);
    return maskImage;
  } catch (error) {
    console.warn(`Failed to load mask for slide ${slideIndex + 1}`, error);
    return null;
  }
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}