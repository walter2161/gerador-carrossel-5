export function drawImageCovered(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const imageRatio = image.width / image.height;
  const coverRatio = w / h;
  let renderWidth = w;
  let renderHeight = h;

  if (imageRatio < coverRatio) {
    renderHeight = w / imageRatio;
  } else {
    renderWidth = h * imageRatio;
  }

  const renderX = x + (w - renderWidth) / 2;
  const renderY = y + (h - renderHeight) / 2;

  ctx.drawImage(image, renderX, renderY, renderWidth, renderHeight);
}

export async function loadBackgroundImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}