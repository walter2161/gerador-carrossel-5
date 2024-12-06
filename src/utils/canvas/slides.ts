import { drawRoundedRect } from './shapes';
import { Property } from '../../types/property';

const fontFamily = 'Montserrat';

export function drawFirstSlide(
  ctx: CanvasRenderingContext2D,
  property: Property,
  width: number,
  height: number
) {
  // Title box with 40px margins and rounded corners
  const titleBox = {
    x: 40,
    y: 40,
    width: width - 80, // 800 - (40px * 2) = 720px
    height: 60,
    radius: 10
  };

  // Draw white background with rounded corners
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  drawRoundedRect(ctx, titleBox.x, titleBox.y, titleBox.width, titleBox.height, titleBox.radius);

  // Property type and reference
  ctx.fillStyle = '#1e3a8a';
  ctx.font = `bold 28px ${fontFamily}`;
  ctx.textAlign = 'center';
  const title = `${property.type} - ${property.reference}`;
  ctx.fillText(title, width / 2, titleBox.y + 40);

  // Neighborhood box
  ctx.fillStyle = '#1e40af';
  const neighborhoodBox = {
    width: 300,
    height: 40,
    x: (width - 300) / 2,
    y: 120
  };
  drawRoundedRect(ctx, neighborhoodBox.x, neighborhoodBox.y, neighborhoodBox.width, neighborhoodBox.height, 5);

  ctx.fillStyle = 'white';
  ctx.font = `bold 20px ${fontFamily}`;
  ctx.fillText(property.neighborhood, width / 2, neighborhoodBox.y + 28);

  // Stats box
  const statsBox = {
    x: 80,
    y: height - 160,
    width: width - 160,
    height: 80,
    radius: 7
  };

  ctx.fillStyle = '#fbbf24';
  drawRoundedRect(ctx, statsBox.x, statsBox.y, statsBox.width, statsBox.height, statsBox.radius);

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
    
    ctx.font = `bold 16px ${fontFamily}`;
    ctx.fillText(stat.label, x, statsBox.y + 30);
    
    ctx.font = `bold 20px ${fontFamily}`;
    ctx.fillText(stat.value, x, statsBox.y + 60);
  });
}

export function drawLastSlide(
  ctx: CanvasRenderingContext2D,
  property: Property,
  width: number,
  height: number
) {
  const boxWidth = 400;
  const boxHeight = 160;
  const boxX = (width - boxWidth) / 2;
  const boxY = height - boxHeight - 80;
  const radius = 10;

  ctx.fillStyle = '#1e40af';
  drawRoundedRect(ctx, boxX, boxY, boxWidth, boxHeight, radius);

  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.font = `bold 28px ${fontFamily}`;
  const title = `${property.type} - ${property.reference}`;
  ctx.fillText(title, width / 2, boxY + 50);

  ctx.font = `bold 36px ${fontFamily}`;
  ctx.fillText(property.price, width / 2, boxY + 110);
}