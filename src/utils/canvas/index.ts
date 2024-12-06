import { loadBackgroundImage, drawImageCovered } from './image';
import { loadMask } from './masks';
import { drawFirstSlide, drawLastSlide } from './slides';
import { Property } from '../../types/property';

export async function createSlideImage(
  imageUrl: string,
  slideIndex: number,
  property: Property,
  width = 800,
  height = 800
): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Load and draw background image
  const image = await loadBackgroundImage(imageUrl);
  drawImageCovered(ctx, image, 0, 0, width, height);

  // Load and draw mask
  const maskImage = await loadMask(slideIndex);
  if (maskImage) {
    ctx.drawImage(maskImage, 0, 0, width, height);
  }

  // Draw slide content
  if (slideIndex === 0) {
    drawFirstSlide(ctx, property, width, height);
  } else if (slideIndex === 3) {
    drawLastSlide(ctx, property, width, height);
  }

  return canvas.toDataURL('image/png');
}