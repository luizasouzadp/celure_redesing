// Seções da página, na mesma hierarquia do index.html original
export const SECTIONS: Record<string, string> = {
  anuncio: 'body > div:first-of-type',
  navbar: '#navbar',
  hero: 'body > section:nth-of-type(1)',
  sobre: '#sobre',
  luxo: '#luxo',
  depoimentos: '#depoimentos',
  servicos: '#servicos',
  passos: 'body > section:nth-of-type(6)', // hero, sobre, luxo, depoimentos, servicos, PASSOS, cotacao
  cotacao: '#cotacao',
  rodape: 'body > footer',
};
