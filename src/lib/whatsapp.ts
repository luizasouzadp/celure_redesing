import { celure } from '../config/celure';

export type QuoteInput = { name: string; service: string; destination: string; dates: string; travelers: string; details: string };
export type CtaService = 'passagens' | 'consultoria-milhas' | 'roteiro' | 'experiencias' | 'salas-vip' | 'geral';

export function getWhatsAppUrl(text: string, phone: string = celure.phone): string {
  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}

export function buildQuoteMessage(input: QuoteInput): string {
  const name = input.name.trim() || 'Viajante';
  const service = input.service || 'Roteiro & Passagens';
  const destination = input.destination.trim() || 'Ainda decidindo';
  const dates = input.dates.trim() || 'A definir';
  const travelers = input.travelers || '2 pessoas';
  const details = input.details.trim();

  let message = `Olá, Lucas e equipe Celure!\n\nMe chamo *${name}* e gostaria de solicitar uma cotação/atendimento personalizado:\n\n`;
  message += `✨ *Serviço:* ${service}\n`;
  message += `📍 *Destino:* ${destination}\n`;
  message += `📅 *Período/Época:* ${dates}\n`;
  message += `👥 *Viajantes:* ${travelers}\n`;
  if (details) message += `📝 *Observações / Preferências:* ${details}\n`;
  message += `\nAguardo as orientações para planejarmos essa experiência!`;
  return message;
}

const CTA_TAILS: Record<CtaService, string> = {
  passagens: 'emissão inteligente de passagens aéreas (milhas e dinheiro) para o meu próximo destino.',
  'consultoria-milhas': 'a Consultoria de Milhas e Cartões de Crédito para otimizar meus gastos e acelerar minhas viagens.',
  roteiro: 'um Roteiro Personalizado e planejamento completo sob medida para a minha viagem.',
  experiencias: 'o planejamento de uma Viagem Exclusiva e personalizada sob medida.',
  'salas-vip': 'como ter acesso às salas VIP dos aeroportos nas minhas próximas viagens.',
  geral: 'o planejamento de uma viagem personalizada e exclusiva.',
};

export function ctaMessage(service: string | null): string {
  const tail = CTA_TAILS[(service ?? 'geral') as CtaService] ?? CTA_TAILS.geral;
  return 'Olá, equipe Celure! Gostaria de conversar sobre ' + tail;
}
