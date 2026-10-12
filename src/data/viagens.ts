// Países por onde o Lucas já viajou (mapa da seção #destinos), os mesmos das bandeirinhas do site antigo.
// lat/lon = onde fica o pontinho; iso = código numérico do país (pinta o país no mapa).
// foto = chave em src/data/destinos.ts: o país ganha miniatura e abre a foto grande.
// thumb = para onde a miniatura sai do pontinho (cima/baixo), o deslocamento lateral (dx) e o
// comprimento da haste (len), em rem, ajustados à mão para as fotos não se sobreporem.
export type Viagem = {
  nome: string;
  lat: number;
  lon: number;
  iso: string;
  foto?: string;
  thumb?: { dir: 'up' | 'down'; dx: number; len?: number };
};

export const origem: Viagem = { nome: 'Brasil', lat: -15.8, lon: -47.9, iso: '076' };

export const viagens: Viagem[] = [
  // Américas
  { nome: 'Estados Unidos', lat: 36.86, lon: -111.37, iso: '840', foto: 'eua', thumb: { dir: 'up', dx: -1 } },
  { nome: 'Canadá', lat: 43.65, lon: -79.38, iso: '124', foto: 'canada', thumb: { dir: 'up', dx: 1.5 } },
  { nome: 'México', lat: 19.43, lon: -99.13, iso: '484' },
  { nome: 'Panamá', lat: 8.98, lon: -79.52, iso: '591' },
  { nome: 'República Dominicana', lat: 18.49, lon: -69.93, iso: '214' },
  { nome: 'Colômbia', lat: 10.39, lon: -75.48, iso: '170' },
  { nome: 'Aruba', lat: 12.52, lon: -70.03, iso: '533' },
  { nome: 'Bonaire', lat: 12.15, lon: -68.27, iso: '535' },
  { nome: 'Chile', lat: -33.45, lon: -70.67, iso: '152' },
  { nome: 'Argentina', lat: -34.6, lon: -58.38, iso: '032' },
  { nome: 'Uruguai', lat: -34.9, lon: -56.16, iso: '858' },
  // Europa
  { nome: 'Portugal', lat: 38.72, lon: -9.14, iso: '620' },
  { nome: 'Espanha', lat: 40.42, lon: -3.7, iso: '724' },
  { nome: 'França', lat: 48.86, lon: 2.35, iso: '250' },
  { nome: 'Holanda', lat: 52.37, lon: 4.9, iso: '528' },
  { nome: 'Itália', lat: 41.9, lon: 12.5, iso: '380' },
  { nome: 'Alemanha', lat: 48.14, lon: 11.58, iso: '276', foto: 'alemanha', thumb: { dir: 'up', dx: -3, len: 3.5 } },
  { nome: 'República Tcheca', lat: 50.08, lon: 14.43, iso: '203' },
  { nome: 'Áustria', lat: 48.21, lon: 16.37, iso: '040' },
  { nome: 'Eslováquia', lat: 48.15, lon: 17.11, iso: '703' },
  { nome: 'Hungria', lat: 47.5, lon: 19.04, iso: '348' },
  { nome: 'Croácia', lat: 42.65, lon: 18.09, iso: '191' },
  { nome: 'Montenegro', lat: 42.42, lon: 18.77, iso: '499' },
  { nome: 'Albânia', lat: 41.33, lon: 19.82, iso: '008' },
  { nome: 'Grécia', lat: 36.39, lon: 25.46, iso: '300', foto: 'grecia', thumb: { dir: 'down', dx: -1.5 } },
  { nome: 'Turquia', lat: 41.01, lon: 28.98, iso: '792', foto: 'turquia', thumb: { dir: 'up', dx: 2.5 } },
  // Oriente Médio e Ásia
  { nome: 'Catar', lat: 25.29, lon: 51.53, iso: '634', foto: 'catar', thumb: { dir: 'down', dx: 1 } },
  { nome: 'China', lat: 40.43, lon: 116.57, iso: '156', foto: 'china', thumb: { dir: 'up', dx: -1.5 } },
  { nome: 'Coreia do Sul', lat: 37.57, lon: 126.98, iso: '410' },
  { nome: 'Japão', lat: 35.68, lon: 139.69, iso: '392' },
];
