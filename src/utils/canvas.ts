export async function createSlideImage(
  imageUrl: string,
  slideIndex: number,
  property: {
    type: string;
    reference: string;
    neighborhood: string;
    area: number;
    bedrooms: number;
    parkingSpots: number;
    suites: number;
    bathrooms: number;
    price: string;
  },
  width = 800,
  height = 800
): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Load background image
  const image = await loadImage(imageUrl);
  drawImageCovered(ctx, image, 0, 0, width, height);

  // Load and draw the mask
  const maskUrl = `/mascaras/0${slideIndex + 1}.png`;
  try {
    const maskImage = await loadImage(maskUrl);
    ctx.drawImage(maskImage, 0, 0, width, height);
  } catch (error) {
    console.warn(`Failed to load mask for slide ${slideIndex + 1}`, error);
  }

  // Set Montserrat as the default font family
  const fontFamily = 'Montserrat';

  if (slideIndex === 0) {
    // First slide layout
    // Title box at the top with margins and rounded corners
    const titleBox = {
      x: 40,
      y: 40,
      width: width - 80,
      height: 60,
      radius: 10
    };

    // Draw rounded rectangle for title background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.moveTo(titleBox.x + titleBox.radius, titleBox.y);
    ctx.lineTo(titleBox.x + titleBox.width - titleBox.radius, titleBox.y);
    ctx.quadraticCurveTo(titleBox.x + titleBox.width, titleBox.y, titleBox.x + titleBox.width, titleBox.y + titleBox.radius);
    ctx.lineTo(titleBox.x + titleBox.width, titleBox.y + titleBox.height - titleBox.radius);
    ctx.quadraticCurveTo(titleBox.x + titleBox.width, titleBox.y + titleBox.height, titleBox.x + titleBox.width - titleBox.radius, titleBox.y + titleBox.height);
    ctx.lineTo(titleBox.x + titleBox.radius, titleBox.y + titleBox.height);
    ctx.quadraticCurveTo(titleBox.x, titleBox.y + titleBox.height, titleBox.x, titleBox.y + titleBox.height - titleBox.radius);
    ctx.lineTo(titleBox.x, titleBox.y + titleBox.radius);
    ctx.quadraticCurveTo(titleBox.x, titleBox.y, titleBox.x + titleBox.radius, titleBox.y);
    ctx.closePath();
    ctx.fill();
    
    // Property type and reference
    ctx.fillStyle = '#1e3a8a';
    ctx.font = `bold 28px ${fontFamily}`;
    const title = `${property.type} - ${property.reference}`;
    const titleWidth = ctx.measureText(title).width;
    ctx.fillText(title, (width - titleWidth) / 2, titleBox.y + 40);

    // Neighborhood box
    ctx.fillStyle = '#1e40af';
    const neighborhoodBox = {
      width: 300,
      height: 40,
      x: (width - 300) / 2,
      y: 120
    };
    ctx.fillRect(neighborhoodBox.x, neighborhoodBox.y, neighborhoodBox.width, neighborhoodBox.height);
    
    ctx.fillStyle = 'white';
    ctx.font = `bold 20px ${fontFamily}`;
    const neighborhoodText = property.neighborhood;
    const neighborhoodWidth = ctx.measureText(neighborhoodText).width;
    ctx.fillText(
      neighborhoodText,
      neighborhoodBox.x + (neighborhoodBox.width - neighborhoodWidth) / 2,
      neighborhoodBox.y + 28
    );

    // Stats box at the bottom with margins and rounded corners
    const statsBox = {
      x: 80,
      y: height - 160,
      width: width - 160,
      height: 80,
      radius: 7
    };

    // Draw rounded rectangle
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.moveTo(statsBox.x + statsBox.radius, statsBox.y);
    ctx.lineTo(statsBox.x + statsBox.width - statsBox.radius, statsBox.y);
    ctx.quadraticCurveTo(statsBox.x + statsBox.width, statsBox.y, statsBox.x + statsBox.width, statsBox.y + statsBox.radius);
    ctx.lineTo(statsBox.x + statsBox.width, statsBox.y + statsBox.height - statsBox.radius);
    ctx.quadraticCurveTo(statsBox.x + statsBox.width, statsBox.y + statsBox.height, statsBox.x + statsBox.width - statsBox.radius, statsBox.y + statsBox.height);
    ctx.lineTo(statsBox.x + statsBox.radius, statsBox.y + statsBox.height);
    ctx.quadraticCurveTo(statsBox.x, statsBox.y + statsBox.height, statsBox.x, statsBox.y + statsBox.height - statsBox.radius);
    ctx.lineTo(statsBox.x, statsBox.y + statsBox.radius);
    ctx.quadraticCurveTo(statsBox.x, statsBox.y, statsBox.x + statsBox.radius, statsBox.y);
    ctx.closePath();
    ctx.fill();

    // Stats content
    const stats = [
      { label: 'Área', value: `${property.area}m²` },
      { label: 'Quartos', value: property.bedrooms.toString() },
      { label: 'Vagas', value: property.parkingSpots.toString() },
      { label: 'Suítes', value: property.suites.toString() },
      { label: 'Banheiros', value: property.bathrooms.toString() }
    ];

    const columnWidth = (statsBox.width - 40) / 5;
    ctx.fillStyle = '#1e3a8a';
    ctx.textAlign = 'center';

    stats.forEach((stat, index) => {
      const x = statsBox.x + 20 + columnWidth * index + columnWidth / 2;
      
      // Label
      ctx.font = `bold 16px ${fontFamily}`;
      ctx.fillText(stat.label, x, statsBox.y + 30);
      
      // Value
      ctx.font = `bold 20px ${fontFamily}`;
      ctx.fillText(stat.value, x, statsBox.y + 60);
    });

  } else if (slideIndex === 3) {
    // Last slide layout
    const boxWidth = 400;
    const boxHeight = 160;
    const boxX = (width - boxWidth) / 2;
    const boxY = height - boxHeight - 80;
    const radius = 10;

    // Draw blue box with rounded corners
    ctx.fillStyle = '#1e40af';
    ctx.beginPath();
    ctx.moveTo(boxX + radius, boxY);
    ctx.lineTo(boxX + boxWidth - radius, boxY);
    ctx.quadraticCurveTo(boxX + boxWidth, boxY, boxX + boxWidth, boxY + radius);
    ctx.lineTo(boxX + boxWidth, boxY + boxHeight - radius);
    ctx.quadraticCurveTo(boxX + boxWidth, boxY + boxHeight, boxX + boxWidth - radius, boxY + boxHeight);
    ctx.lineTo(boxX + radius, boxY + boxHeight);
    ctx.quadraticCurveTo(boxX, boxY + boxHeight, boxX, boxY + boxHeight - radius);
    ctx.lineTo(boxX, boxY + radius);
    ctx.quadraticCurveTo(boxX, boxY, boxX + radius, boxY);
    ctx.closePath();
    ctx.fill();

    // Property type and reference
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = `bold 28px ${fontFamily}`;
    const title = `${property.type} - ${property.reference}`;
    ctx.fillText(title, width / 2, boxY + 50);

    // Price
    ctx.font = `bold 36px ${fontFamily}`;
    ctx.fillText(property.price, width / 2, boxY + 110);
  }

  return canvas.toDataURL('image/png');
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

function drawImageCovered(
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