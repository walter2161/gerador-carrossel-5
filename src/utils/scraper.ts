import { Property } from '../types/property';

interface ScrapedData {
  type: Property['type'];
  reference: string;
  neighborhood: string;
  area: number;
  bedrooms: number;
  parkingSpots: number;
  suites: number;
  bathrooms: number;
  price: string;
}

function extractNumber(text: string): number {
  const match = text.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

function extractPrice(text: string): string {
  const match = text.match(/R\$\s*([\d.,]+)/);
  return match ? match[1].trim() : '';
}

function extractReference(text: string): string {
  const match = text.match(/REF\.:\s*([A-Z0-9]+)/);
  return match ? match[1].trim() : '';
}

function mapPropertyType(text: string): Property['type'] {
  const typeMap: Record<string, Property['type']> = {
    'APARTAMENTO': 'Apartamento',
    'CASA': 'Casa',
    'KITNET': 'Kitnet',
    'COMERCIAL': 'Comercial',
    'TERRENO': 'Terreno'
  };

  for (const [key, value] of Object.entries(typeMap)) {
    if (text.toUpperCase().includes(key)) {
      return value;
    }
  }

  return 'Casa';
}

function extractNeighborhood(text: string): string {
  const neighborhoods = [
    'Canto do Forte',
    'Boqueirão',
    'Guilhermina',
    'Aviação',
    'Tupi',
    'Ocean',
    'Mirim',
    'Caiçara',
    'Real',
    'T. Bastos'
  ];

  for (const neighborhood of neighborhoods) {
    if (text.toUpperCase().includes(neighborhood.toUpperCase())) {
      return neighborhood;
    }
  }

  return neighborhoods[0];
}

export function parsePropertyText(text: string): ScrapedData {
  // Split text into lines for easier parsing
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);

  // Initialize data object
  const data: ScrapedData = {
    type: 'Casa',
    reference: '',
    neighborhood: '',
    area: 0,
    bedrooms: 0,
    parkingSpots: 0,
    suites: 0,
    bathrooms: 0,
    price: ''
  };

  // Parse each line
  lines.forEach(line => {
    // Extract property type and reference from title
    if (line.includes('REF.:')) {
      data.type = mapPropertyType(line);
      data.reference = extractReference(line);
      data.neighborhood = extractNeighborhood(line);
      data.price = extractPrice(line);
    }

    // Extract details
    if (line.includes('Quartos')) {
      data.bedrooms = extractNumber(line);
    }
    if (line.includes('Vagas')) {
      data.parkingSpots = extractNumber(line);
    }
    if (line.includes('Suítes')) {
      data.suites = extractNumber(line);
    }
    if (line.includes('Banheiro')) {
      data.bathrooms = extractNumber(line);
    }
    if (line.includes('Área Útil')) {
      data.area = extractNumber(line);
    }
  });

  return data;
}