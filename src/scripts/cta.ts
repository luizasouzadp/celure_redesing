// Botões com data-cta-service: no clique, o link passa a apontar para o WhatsApp
// com a mensagem específica daquele serviço
import { ctaMessage, getWhatsAppUrl } from '../lib/whatsapp';

document.querySelectorAll<HTMLAnchorElement>('[data-cta-service]').forEach((btn) =>
  btn.addEventListener('click', () => {
    btn.href = getWhatsAppUrl(ctaMessage(btn.getAttribute('data-cta-service')));
  }));
