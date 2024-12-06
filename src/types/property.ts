export interface Property {
  type: 'Casa' | 'Kitnet' | 'Apartamento' | 'Comercial' | 'Terreno';
  reference: string;
  neighborhood: string;
  area: number;
  bedrooms: number;
  parkingSpots: number;
  suites: number;
  bathrooms: number;
  price: string;
  images: string[];
  condition?: 'Venda' | 'Aluguel';
  state?: 'Lançamento' | 'Novo' | 'Usado';
  nearbyCommerce?: string;
  nearbyServices?: string;
  beachDistance?: number;
}

export const neighborhoods = [
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
] as const;

export const propertyTypes = [
  'Casa',
  'Kitnet',
  'Apartamento',
  'Comercial',
  'Terreno'
] as const;

export const propertyConditions = ['Venda', 'Aluguel'] as const;
export const propertyStates = ['Lançamento', 'Novo', 'Usado'] as const;