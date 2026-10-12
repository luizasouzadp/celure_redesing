const DS = window.CelureDesignSystem_c0924c;
const PIMG = '../../assets/';

function ServicePage({ id, go }) {
  const s = (window.CELURE_SERVICES || []).find((x) => x.id === id) || window.CELURE_SERVICES[0];
  return (
    <div style={{ paddingTop: '4.5rem' }}>
      <section className="padding-global" style={{ paddingBottom: '3rem' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <DS.Breadcrumbs items={[{ label: 'Início', href: 'home' }, { label: 'Serviços', href: 'home' }, { label: s.title }]} onNavigate={() => go('home')} />
            <div className="h2" style={{ maxWidth: '60rem' }}>{s.title}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', height: '28rem' }}>
            <img src={PIMG + s.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <img src={PIMG + 'celure/flight-cover.jpg'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>
      <section style={{ paddingBottom: '5rem' }}>
        <div className="container" style={{ display: 'flex', gap: '5.75rem' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="h4">Como funciona</div>
              <div className="body-lg color-white-60">Não trabalhamos com pacotes prontos de gaveta. Cada solicitação é analisada individualmente para entregar a melhor estratégia de rotas, milhas e vivências — e tudo chega pronto no seu WhatsApp.</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="h4">O que está incluso</div>
              <DS.IncludedList items={[{ icon: 'included-accommodation', label: 'Hotéis boutique selecionados' }, { icon: 'included-meals', label: 'Acesso a salas VIP' }, { icon: 'included-integration', label: 'Suporte humano 24h' }, { label: 'Bilhetes oficiais & e-tickets' }]} />
            </div>
          </div>
          <aside style={{ width: '24rem', borderLeft: '1px solid var(--white-10)', paddingLeft: '2rem', paddingTop: '.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '.25rem' }} className="body-md"><span className="color-white-50">{s.priceLabel}</span><span>{s.price}</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
              {s.props.map(([icon, label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}><DS.Icon name={icon} size=".875rem" /><span className="title-xs color-white-60">{label}</span></div>
                  <span className="title-xs">{value}</span>
                </div>
              ))}
            </div>
            <DS.Button variant="secondary" fullWidth onClick={() => go('contato')}>{s.cta}</DS.Button>
          </aside>
        </div>
      </section>
    </div>
  );
}

function ContactPage() {
  const [sent, setSent] = React.useState(false);
  return (
    <div style={{ paddingTop: '4.5rem' }}>
      <section style={{ display: 'flex', borderBottom: '1px solid var(--white-20)' }}>
        <div style={{ width: '50%', padding: '2.5rem', borderRight: '1px solid var(--white-20)' }}>
          <img src={PIMG + 'celure/depoimentos-ushuaia.jpg'} alt="" style={{ width: '100%', aspectRatio: '640 / 600', objectFit: 'cover' }} />
        </div>
        <div style={{ width: '50%', padding: '2.5rem' }}>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem', paddingTop: '.5625rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}><DS.Icon name="celure-mark" size="1.125rem" /><span className="body-md">Primeiro Passo Sem Compromisso</span></div>
              <div className="h3">Vamos planejar sua próxima grande experiência?</div>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem' }}><DS.InputGroup label="Seu Nome Completo:" required /><DS.InputGroup label="Destino Desejado:" /></div>
              <DS.InputGroup as="select" label="Serviço de Maior Interesse:" options={['Emissão Inteligente de Passagens', 'Planejamento & Roteiro Sob Medida', 'Consultoria de Milhas & Cartões', 'Viagens Exclusivas & Experiências Premium', 'Viagem Completa (Voo + Hotel + Roteiro)']} />
              <div style={{ display: 'flex', gap: '1.5rem' }}><DS.InputGroup label="Época / Mês Previsto:" /><DS.InputGroup as="select" label="Viajantes:" options={['1 pessoa (Solo)', '2 pessoas (Casal/Amigos)', '3 a 4 pessoas (Família)', '5+ pessoas (Grupo)']} /></div>
              <DS.InputGroup as="textarea" label="Detalhes Adicionais (Opcional):" />
              <div style={{ marginTop: '.5rem' }}><DS.Button type="submit">Enviar Solicitação para o WhatsApp</DS.Button></div>
              <div className="body-sm color-white-50">Seus dados são confidenciais e utilizados estritamente para montar sua proposta de viagem.</div>
            </form>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--ink-900)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2.5rem', opacity: sent ? 1 : 0, pointerEvents: sent ? 'auto' : 'none', transition: '.2s' }}>
              <div className="h3">Recebemos seu pedido.</div>
              <div className="body-lg color-white-60">Nossa equipe vai continuar o atendimento direto no seu WhatsApp.</div>
              <div><DS.Button variant="secondary" onClick={() => setSent(false)}>Enviar outra solicitação</DS.Button></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PrivacyPage() {
  const secs = [['Coleta de dados', 'Coletamos apenas as informações que você nos envia pelo formulário ou WhatsApp: nome, destino, datas e número de viajantes.'], ['Uso das informações', 'Os dados são utilizados estritamente para montar sua proposta de viagem e emitir suas passagens.'], ['Seus direitos', 'Você pode solicitar a exclusão dos seus dados a qualquer momento pelo nosso WhatsApp.']];
  const [i, setI] = React.useState(0);
  return (
    <div style={{ paddingTop: '4.5rem' }}>
      <section className="padding-global"><div className="container"><div className="h2">Política de Privacidade</div><div className="body-md color-white-50" style={{ marginTop: '1rem' }}>Atualizada em outubro de 2026</div></div></section>
      <section style={{ borderTop: '1px solid var(--white-10)' }}>
        <div className="container" style={{ display: 'flex' }}>
          <div style={{ flex: 1, padding: '3rem 3rem 5rem 0', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {secs.map(([h, p]) => <div key={h} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}><div className="h4">{h}</div><div className="body-lg color-white-60">{p}</div></div>)}
          </div>
          <div style={{ width: '39.6%', borderLeft: '1px solid var(--white-10)', padding: '1.5rem 2rem 0' }}><DS.LegalNav items={secs.map((s) => s[0])} activeIndex={i} onSelect={setI} /></div>
        </div>
      </section>
    </div>
  );
}
Object.assign(window, { ServicePage, ContactPage, PrivacyPage });
