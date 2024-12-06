import { Property } from '../types/property';

const neighborhoodDescriptions: Record<string, string> = {
  'Canto do Forte': 'Canto do Forte é um bairro nobre de Praia Grande - SP, conhecido por sua alta qualidade de vida e sua proximidade com a praia. Com uma excelente infraestrutura de comércios, escolas e serviços, oferece tudo o que você precisa para viver bem.',
  'Boqueirão': 'Boqueirão é um bairro tradicional de Praia Grande - SP, conhecido por sua agitada vida noturna e sua grande variedade de comércios e serviços. Com uma localização privilegiada e uma infraestrutura completa, é o lugar ideal para quem busca praticidade e diversão.',
  'Guilhermina': 'Guilhermina é um bairro residencial e tranquilo de Praia Grande - SP, conhecido por sua bela praia e sua proximidade com o centro da cidade. Com uma excelente infraestrutura de comércios e serviços, oferece tudo o que você precisa para viver bem.',
  'Aviação': 'Aviação é um bairro residencial e familiar de Praia Grande - SP, conhecido por sua bela orla marítima e sua excelente infraestrutura de comércios e serviços. Com uma grande variedade de opções de lazer e entretenimento, é o lugar ideal para quem busca qualidade de vida.',
  'Tupi': 'Tupi é um bairro residencial e tranquilo de Praia Grande - SP, conhecido por suas belas praias e sua proximidade com o comércio local. Com uma excelente infraestrutura de serviços e uma comunidade acolhedora, é o lugar perfeito para viver com tranquilidade.',
  'Ocean': 'Ocean é um bairro em crescimento em Praia Grande - SP, conhecido por sua moderna infraestrutura e sua proximidade com o mar. Com uma grande variedade de comércios e serviços, oferece tudo o que você precisa para viver bem.',
  'Mirim': 'Mirim é um bairro residencial e tranquilo de Praia Grande - SP, conhecido por sua proximidade com a natureza e suas belas paisagens. Com uma excelente infraestrutura de comércios e serviços, é o lugar ideal para quem busca paz e sossego.',
  'Caiçara': 'Caiçara é um bairro residencial e familiar de Praia Grande - SP, conhecido por sua tranquilidade e suas belas praias. Com uma excelente infraestrutura de comércios, escolas e serviços, oferece tudo o que você precisa para viver bem.',
  'Real': 'Real é um bairro em crescimento em Praia Grande - SP, conhecido por sua moderna infraestrutura e sua proximidade com o mar. Com uma grande variedade de comércios e serviços, oferece tudo o que você precisa para viver bem.',
  'T. Bastos': 'Tupi Bastos é um bairro residencial e tranquilo de Praia Grande - SP, conhecido por sua proximidade com a natureza e sua qualidade de vida. Com ruas arborizadas e uma excelente infraestrutura, é o lugar ideal para quem busca paz e sossego.'
};

const propertyDescriptions: Record<string, string[]> = {
  'Casa': [
    'Esta encantadora casa oferece o lar dos seus sonhos, com {bedrooms} dormitórios e {parkingSpots} vaga(s) de garagem. Com uma área de {area}m², é o lugar ideal para viver momentos inesquecíveis em família.',
    'Descubra o conforto e a praticidade desta casa espaçosa, com {bedrooms} dormitórios e {parkingSpots} vaga(s) de garagem. Com uma área de {area}m² e uma localização privilegiada, próxima a comércios e serviços, é o lugar perfeito para chamar de lar.',
    'Seja bem-vindo ao seu novo lar! Esta bela casa conta com {bedrooms} dormitórios e {parkingSpots} vaga(s) de garagem. Com uma área de {area}m², é o local ideal para criar memórias inesquecíveis.'
  ],
  'Kitnet': [
    'Esta kitnet é a solução perfeita para quem busca praticidade e conforto. Com uma ótima localização e um espaço de {area}m² bem distribuído, é ideal para quem procura um lar aconchegante.',
    'Aconchegante e funcional, esta kitnet oferece tudo o que você precisa para viver bem. Com uma área de {area}m² e uma área de lazer completa e comércios próximos, é o local ideal para começar uma nova etapa da sua vida.',
    'Experimente o charme e a comodidade desta kitnet bem projetada. Com uma ótima localização e uma área de {area}m², é o espaço perfeito para quem busca praticidade sem abrir mão do conforto.'
  ],
  'Apartamento': [
    'Este apartamento encantador é tudo o que você sempre sonhou. Com {bedrooms} dormitórios e {parkingSpots} vaga(s) de garagem, oferece o espaço perfeito para a sua família. Com uma área de {area}m², é o lugar ideal para começar uma nova história.',
    'Seja bem-vindo ao seu novo lar! Este apartamento espaçoso oferece todo o conforto e comodidade que você precisa. Com uma área de {area}m², é o local ideal para viver momentos inesquecíveis.',
    'Desfrute do conforto e da elegância deste apartamento moderno, com {bedrooms} dormitórios e {parkingSpots} vaga(s) de garagem. Com uma área de {area}m² e uma localização privilegiada, é o lugar perfeito para chamar de lar.'
  ],
  'Comercial': [
    'Esta excelente oportunidade comercial oferece um espaço amplo e bem localizado, perfeito para o seu negócio prosperar. Com uma área de {area}m² e uma localização estratégica e uma infraestrutura completa, é o local ideal para empreender.',
    'Descubra o potencial deste espaço comercial bem projetado, com uma área de {area}m² e uma localização privilegiada e uma estrutura completa. Com uma grande visibilidade e acesso fácil às principais vias, é o lugar perfeito para o seu negócio.',
    'Aproveite esta oportunidade única para expandir o seu negócio. Com uma área de {area}m² e uma localização estratégica e uma infraestrutura completa, este espaço comercial oferece tudo o que você precisa para alcançar o sucesso.'
  ],
  'Terreno': [
    'Este terreno oferece uma excelente oportunidade para investimento. Com uma área de {area}m² e uma localização privilegiada e uma área ampla, é o local perfeito para construir o seu projeto dos sonhos.',
    'Descubra todo o potencial deste terreno bem localizado, ideal para quem busca investir em um futuro promissor. Com uma área de {area}m² e acesso fácil às principais vias, é o lugar ideal para realizar seus planos.',
    'Aproveite esta oportunidade única para adquirir este terreno espaçoso e bem localizado. Com uma área de {area}m² e uma infraestrutura completa e uma área ideal para construir, é o local perfeito para transformar seus sonhos em realidade.'
  ]
};

const callToActions = [
  'Entre em contato conosco agora mesmo e agende uma visita!',
  'Não perca essa oportunidade! Entre em contato para mais informações.',
  'Estamos à disposição para tirar todas as suas dúvidas. Entre em contato!'
];

export function generateDescription(property: Property): string {
  const descriptions = propertyDescriptions[property.type];
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];
  
  let text = description.replace(/{(\w+)}/g, (match, key) => {
    return String(property[key as keyof Property]);
  });

  // Add condition and state if available
  if (property.condition && property.state) {
    text += ` Este imóvel está disponível para ${property.condition.toLowerCase()} em ${property.state.toLowerCase()}. `;
  }

  // Add beach distance if available
  if (property.beachDistance) {
    text += `A apenas ${property.beachDistance} metros da bela orla marítima, ideal para momentos de lazer e relaxamento. `;
  }

  // Add nearby commerce and services if available
  if (property.nearbyCommerce) {
    text += `Próximo a uma variedade de estabelecimentos comerciais, como: ${property.nearbyCommerce}. `;
  }
  if (property.nearbyServices) {
    text += `Além disso, você encontrará uma ampla gama de serviços próximos, como: ${property.nearbyServices}. `;
  }

  // Add neighborhood description
  text += `\n\n${neighborhoodDescriptions[property.neighborhood]}\n\n`;

  // Add random call to action
  text += callToActions[Math.floor(Math.random() * callToActions.length)];

  return text;
}