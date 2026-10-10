// Fotos do Lucas no mapa-múndi (seção Sobre), na ordem de navegação do lightbox
export type Destino = { key: string; title: string; caption: string; src: string };

export const destinos: Destino[] = [
  { key: 'eua', title: '🇺🇸 Estados Unidos', caption: 'Antelope Canyon', src: '/assets/images/destinos/eua.jpg' },
  { key: 'canada', title: '🇨🇦 Canadá', caption: 'Toronto', src: '/assets/images/destinos/canada.jpg' },
  { key: 'alemanha', title: '🇩🇪 Alemanha', caption: 'Allianz Arena, Munique', src: '/assets/images/destinos/alemanha.jpg' },
  { key: 'grecia', title: '🇬🇷 Grécia', caption: 'Santorini', src: '/assets/images/destinos/grecia.jpg' },
  { key: 'turquia', title: '🇹🇷 Turquia', caption: 'Hagia Sophia, Istambul', src: '/assets/images/destinos/turquia.jpg' },
  { key: 'catar', title: '🇶🇦 Catar', caption: 'Passeio de camelo no deserto', src: '/assets/images/destinos/catar.jpg' },
  { key: 'china', title: '🇨🇳 China', caption: 'Muralha da China', src: '/assets/images/destinos/china.jpg' },
];
