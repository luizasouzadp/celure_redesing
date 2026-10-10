// Cards do coverflow de serviços (seção #servicos), na ordem original.
// As classes de cor ficam escritas por inteiro para o Tailwind encontrá-las.
export type Servico = { img: string; alt: string; icon: string; iconClass: string; titulo: string; descricao: string; tagClass: string; tags: string[]; cta: string; ctaLabel: string };

export const servicos: Servico[] = [
  { img: "/assets/images/servicos/passagens.jpg", alt: "Passaporte e cartão de embarque", icon: "plane", iconClass: "text-teal-800", titulo: "Emissão Inteligente de Passagens", descricao: "Buscamos a melhor tarifa em dinheiro ou milhas — sem abrir mão do conforto.", tagClass: "bg-teal-50 text-teal-700 border-teal-200", tags: ["Até 60% de economia", "Suporte pré e pós-voo"], cta: "passagens", ctaLabel: "Cotar Passagens" },
  { img: "/assets/images/servicos/milhas.jpg", alt: "Avião e cartões de crédito", icon: "credit-card", iconClass: "text-amber-800", titulo: "Consultoria de Milhas & Cartões", descricao: "Transformamos seus gastos do dia a dia em passagens e upgrades reais.", tagClass: "bg-amber-50 text-amber-700 border-amber-200", tags: ["Benefícios ocultos", "Plano sob medida"], cta: "consultoria-milhas", ctaLabel: "Agendar Consultoria" },
  { img: "/assets/images/servicos/roteiros.jpg", alt: "Pelourinho, Salvador", icon: "map", iconClass: "text-sky-800", titulo: "Roteiros Sob Medida", descricao: "Seu dia a dia planejado com lugares já testados pelo fundador.", tagClass: "bg-sky-50 text-sky-700 border-sky-200", tags: ["Zero tempo perdido", "Curadoria real"], cta: "roteiro", ctaLabel: "Montar Meu Roteiro" },
  { img: "/assets/images/servicos/premium.jpg", alt: "Bangalô sobre a água", icon: "sparkles", iconClass: "text-rose-800", titulo: "Experiências Premium", descricao: "Hotéis boutique, passeios privativos e reservas exclusivas.", tagClass: "bg-rose-50 text-rose-700 border-rose-200", tags: ["Cortesias VIP", "Grupos e casais"], cta: "experiencias", ctaLabel: "Planejar Viagem Premium" },
];
