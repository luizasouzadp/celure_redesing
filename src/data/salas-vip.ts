// Conteúdo da janela "Salas VIP: o que inclui" — geral, vale para a maioria das salas.
// O que a Celure oferece especificamente (e os cartões) entra depois, combinado com o Lucas.
export type ItemSala = { icon: string; titulo: string; texto: string };

export const salasVip = {
  eyebrow: 'Experiência VIP',
  titulo: 'O que te espera numa sala VIP.',
  dim: 'Muito além de uma cadeira confortável.',
  intro: 'Antes do embarque, você troca o barulho do saguão por um espaço tranquilo, com comida, bebida e conforto à vontade. Veja o que a maioria das salas oferece.',
  itens: [
    { icon: 'included-meals', titulo: 'Buffet à vontade', texto: 'Pratos quentes e frios, saladas, frutas e sobremesas, repostos ao longo do dia. Em algumas salas, há pratos feitos na hora.' },
    { icon: 'lounge-drinks', titulo: 'Open bar', texto: 'Vinhos, espumantes, cervejas, drinques, café, chás e sucos. Tudo incluso, sem conta no final.' },
    { icon: 'lounge-shower', titulo: 'Banho antes do voo', texto: 'Chuveiros privativos com toalha e produtos de higiene, perfeitos antes de um voo longo. Nem toda sala tem.' },
    { icon: 'lounge-rest', titulo: 'Descanso', texto: 'Poltronas amplas e cantos tranquilos para relaxar. Algumas salas têm espaços reservados para cochilar.' },
    { icon: 'lounge-wifi', titulo: 'Wi-Fi & tomadas', texto: 'Internet rápida e tomadas por toda parte para trabalhar, falar com a família ou carregar o celular com calma.' },
    { icon: 'lounge-quiet', titulo: 'Silêncio & privacidade', texto: 'Longe das filas e do barulho do saguão, com telas mostrando os voos para você não perder o embarque.' },
  ] satisfies ItemSala[],
  bomSaber: [
    'As salas ficam depois do raio-X, na área de embarque.',
    'Normalmente você pode entrar até 3 horas antes do seu voo.',
    'O acesso costuma vir pelo cartão de crédito ou pela classe da passagem.',
    'Acompanhantes podem ter regras diferentes, dependendo do cartão.',
    'Os serviços variam de uma sala para outra.',
  ],
  fechamento: { titulo: 'Quer saber se você já tem acesso?', dim: 'A gente te ajuda.', cta: 'Descobrir Meu Acesso' },
};
