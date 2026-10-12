// Serviços (seção #servicos), cada um vira um TripCard do design system.
// cta = chave da mensagem de WhatsApp em src/lib/whatsapp.ts
import type { TripProperty } from '../components/ds/TripCard.astro';

export type Servico = {
  img: string;
  alt: string;
  titulo: string;
  descricao: string;
  priceLabel: string;
  price: string;
  props: TripProperty[];
  cta: string;
  ctaLabel: string;
};

export const servicos: Servico[] = [
  {
    img: '/assets/images/servicos/passagens.jpg', alt: 'Passaporte e cartão de embarque',
    titulo: 'Emissão Inteligente de Passagens',
    descricao: 'Buscamos a melhor tarifa em dinheiro ou milhas — sem abrir mão do conforto.',
    priceLabel: 'economia de', price: 'até 60%',
    props: [
      { icon: 'earth', label: 'Destinos', value: 'Nacional & Internacional' },
      { icon: 'calendar', label: 'Suporte', value: 'Pré e pós-voo' },
    ],
    cta: 'passagens', ctaLabel: 'Cotar Passagens',
  },
  {
    img: '/assets/images/servicos/milhas.jpg', alt: 'Avião e cartões de crédito',
    titulo: 'Consultoria de Milhas & Cartões',
    descricao: 'Transformamos seus gastos do dia a dia em passagens e upgrades reais.',
    priceLabel: 'plano', price: 'sob medida',
    props: [
      { icon: 'location', label: 'Formato', value: 'Remoto, todo o Brasil' },
      { icon: 'users', label: 'Revela', value: 'Benefícios ocultos' },
    ],
    cta: 'consultoria-milhas', ctaLabel: 'Agendar Consultoria',
  },
  {
    img: '/assets/images/servicos/roteiros.jpg', alt: 'Pelourinho, Salvador',
    titulo: 'Roteiros Sob Medida',
    descricao: 'Seu dia a dia planejado com lugares já testados pelo fundador.',
    priceLabel: 'curadoria', price: 'real',
    props: [
      { icon: 'pin', label: 'Lugares', value: 'Testados pelo fundador' },
      { icon: 'calendar', label: 'Planejamento', value: 'Zero tempo perdido' },
    ],
    cta: 'roteiro', ctaLabel: 'Montar Meu Roteiro',
  },
  {
    img: '/assets/images/servicos/premium.jpg', alt: 'Bangalô sobre a água',
    titulo: 'Experiências Premium',
    descricao: 'Hotéis boutique, passeios privativos e reservas exclusivas.',
    priceLabel: 'cortesias', price: 'VIP',
    props: [
      { icon: 'earth', label: 'Passeios', value: 'Privativos' },
      { icon: 'users', label: 'Para', value: 'Grupos e casais' },
    ],
    cta: 'experiencias', ctaLabel: 'Planejar Viagem Premium',
  },
];
