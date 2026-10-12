import { describe, it, expect } from 'vitest';
import { getWhatsAppUrl, buildQuoteMessage, ctaMessage } from '../../src/lib/whatsapp';

describe('getWhatsAppUrl', () => {
  it('usa o número da Celure e codifica o texto', () => {
    expect(getWhatsAppUrl('Olá & tchau\n✨')).toBe(
      'https://wa.me/5553999491336?text=' + encodeURIComponent('Olá & tchau\n✨'));
  });
  it('remove caracteres não numéricos do telefone', () => {
    expect(getWhatsAppUrl('x', '+55 (53) 99949-1336')).toBe('https://wa.me/5553999491336?text=x');
  });
});

describe('buildQuoteMessage', () => {
  it('monta a mensagem completa igual ao original', () => {
    const msg = buildQuoteMessage({ name: 'Ana', service: 'Planejamento de Roteiro Sob Medida',
      destination: 'Paris', dates: 'Julho', travelers: '2 pessoas (Casal/Amigos)', details: 'Executiva' });
    expect(msg).toBe(
      'Olá, Lucas e equipe Celure!\n\nMe chamo *Ana* e gostaria de solicitar uma cotação/atendimento personalizado:\n\n' +
      '✨ *Serviço:* Planejamento de Roteiro Sob Medida\n' +
      '📍 *Destino:* Paris\n' +
      '📅 *Período/Época:* Julho\n' +
      '👥 *Viajantes:* 2 pessoas (Casal/Amigos)\n' +
      '📝 *Observações / Preferências:* Executiva\n' +
      '\nAguardo as orientações para planejarmos essa experiência!');
  });
  it('aplica padrões e omite observações vazias (apara espaços)', () => {
    const msg = buildQuoteMessage({ name: '  ', service: '', destination: ' ', dates: '', travelers: '', details: '   ' });
    expect(msg).toContain('Me chamo *Viajante*');
    expect(msg).toContain('✨ *Serviço:* Roteiro & Passagens\n');
    expect(msg).toContain('📍 *Destino:* Ainda decidindo\n');
    expect(msg).toContain('📅 *Período/Época:* A definir\n');
    expect(msg).toContain('👥 *Viajantes:* 2 pessoas\n');
    expect(msg).not.toContain('Observações');
  });
});

describe('ctaMessage', () => {
  const base = 'Olá, equipe Celure! Gostaria de conversar sobre ';
  it.each([
    ['passagens', 'emissão inteligente de passagens aéreas (milhas e dinheiro) para o meu próximo destino.'],
    ['consultoria-milhas', 'a Consultoria de Milhas e Cartões de Crédito para otimizar meus gastos e acelerar minhas viagens.'],
    ['roteiro', 'um Roteiro Personalizado e planejamento completo sob medida para a minha viagem.'],
    ['experiencias', 'o planejamento de uma Viagem Exclusiva e personalizada sob medida.'],
    ['salas-vip', 'como ter acesso às salas VIP dos aeroportos nas minhas próximas viagens.'],
    ['geral', 'o planejamento de uma viagem personalizada e exclusiva.'],
    ['desconhecido', 'o planejamento de uma viagem personalizada e exclusiva.'],
    [null, 'o planejamento de uma viagem personalizada e exclusiva.'],
  ])('%s', (svc, tail) => expect(ctaMessage(svc as string | null)).toBe(base + tail));
});
