const { Button, SectionHead, HairlineGrid, StatCard, TripCard, JourneyStep, StepItem, PersonCard, Icon } = window.CelureDesignSystem_c0924c;
const IMG = '../../assets/';

function Hero({ go }) {
  return (
    <section style={{ position: 'relative', aspectRatio: '1440 / 922', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
      <img src={IMG + 'img/intro-bg-part-1.webp'} alt="" style={{ position: 'absolute', top: 0, left: 0, right: 0, width: '100%' }} />
      <div className="container" style={{ position: 'relative' }}>
        <div className="h1" style={{ position: 'relative', zIndex: 2, marginBottom: 0 }}>Viaje</div>
        <div style={{ position: 'relative', zIndex: 4, marginBottom: '2rem' }}>
          <div className="body-xxl">Com mais conforto e use as milhas a seu favor.<br />Roteiros sob medida e passagens inteligentes.</div>
        </div>
        <div style={{ position: 'relative', zIndex: 4 }}><Button onClick={() => go('contato')}>Planejar Minha Viagem</Button></div>
      </div>
      <img src={IMG + 'img/intro-bg-part-2.webp'} alt="" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', zIndex: 3 }} />
    </section>
  );
}

function Stats() {
  return (
    <section className="padding-global">
      <div className="container"><SectionHead eyebrow="Experiências" title={<>Já exploramos mais de 30 países.<br />Veja por si mesmo</>} /></div>
      <HairlineGrid columns={3}>
        <StatCard title="Classe Executiva" subtitle="/ até 65% off" image={IMG + 'celure/flight-cover.jpg'} />
        <StatCard title="Salas VIP & Lounges" subtitle="/ com seus cartões" image={IMG + 'celure/lounge-cover.jpg'} />
        <StatCard title="Roteiros Sob Medida" subtitle="/ 100% humanos" image={IMG + 'celure/dest-cover.jpg'} />
      </HairlineGrid>
    </section>
  );
}

function About() {
  const items = [['+30', 'Países explorados pelo fundador, que testa cada lugar antes de indicar.'], ['Até 60%', 'De economia em passagens e upgrades com estratégia de milhas.']];
  return (
    <section className="padding-global" id="sobre">
      <div className="container">
        <SectionHead eyebrow="Sobre Nós" title={<>Muito mais do que uma agência.<br /><span className="color-white-40">Um estilo de viagem moderno e humano.</span></>} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div style={{ overflow: 'hidden' }}><img src={IMG + 'celure/hero-photo.jpg'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div className="body-xl" style={{ textIndent: '6rem' }}>A Celure nasceu da vivência prática de Lucas (@mullermilhas). Viajar bem não precisa ser um mistério inacessível nem uma rotina burocrática de pacotes engessados.</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', flex: 1 }}>
              {items.map(([n, d]) => (
                <div key={n} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '2rem', paddingBottom: '1.875rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}><div className="h3">{n}</div><div className="body-l color-white-60" style={{ fontSize: '1.125rem', fontWeight: 500, letterSpacing: '-.5px', lineHeight: '130%' }}>{d}</div></div>
                  <div className="body-sm color-white-40">Livelo · Smiles · LATAM Pass · Azul</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { id: 'passagens', title: 'Emissão Inteligente de Passagens', priceLabel: 'economia de', price: 'até 60%', image: 'celure/servicos-passagens.jpg', cta: 'Cotar Passagens', props: [['earth', 'Destinos', 'Nacional & Internacional'], ['calendar', 'Suporte', 'Pré e pós-voo'], ['users', 'Para', 'Solo, casal, família']] },
  { id: 'milhas', title: 'Consultoria de Milhas & Cartões', priceLabel: 'plano', price: 'sob medida', image: 'celure/servicos-milhas.jpg', cta: 'Agendar Consultoria', props: [['location', 'Formato', 'Remoto, todo o Brasil'], ['calendar', 'Duração', '1 encontro + plano'], ['users', 'Para', 'Quem tem cartão']] },
  { id: 'roteiros', title: 'Roteiros Sob Medida', priceLabel: 'curadoria', price: 'real', image: 'celure/servicos-roteiros.jpg', cta: 'Montar Meu Roteiro', props: [['pin', 'Lugares', 'Testados pelo fundador'], ['calendar', 'Entrega', 'Dia a dia planejado'], ['users', 'Para', 'Qualquer estilo']] },
  { id: 'premium', title: 'Experiências Premium', priceLabel: 'cortesias', price: 'VIP', image: 'celure/servicos-premium.jpg', cta: 'Planejar Viagem Premium', props: [['pin', 'Hotéis', 'Boutique'], ['earth', 'Passeios', 'Privativos'], ['users', 'Para', 'Grupos e casais']] },
];
window.CELURE_SERVICES = SERVICES;

function Services({ go }) {
  return (
    <section className="padding-global" id="servicos">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '6.25rem', marginBottom: '4rem' }}>
          <div style={{ flex: 1 }}><SectionHead marginBottom="0" eyebrow="Serviços" title="Soluções completas e sob medida para sua viagem" /></div>
          <Button variant="secondary" onClick={() => go('contato')}>Ver todos</Button>
        </div>
        <HairlineGrid columns={2} bleed>
          {SERVICES.map((s) => (
            <TripCard key={s.id} title={s.title} priceLabel={s.priceLabel} price={s.price} image={IMG + s.image}
              properties={[...s.props.map(([icon, label, value]) => ({ icon, label, value })), { label: 'Avaliação', value: 'stars' }]}
              ctaLabel={s.cta} onCta={() => go('servico', s.id)} />
          ))}
        </HairlineGrid>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="vip" style={{ position: 'relative', aspectRatio: '1440 / 863', background: 'url(' + IMG + 'img/combine.webp) 0 0 / cover', paddingTop: '5rem' }}>
      <div className="container"><SectionHead eyebrow="Experiência VIP" title={<>A sensação de estar pelo mundo.<br /><span className="color-white-40">Do lounge ao céu, até o destino.</span></>} /></div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
        <HairlineGrid columns={3}>
          <JourneyStep count="ETAPA 01" subtitle="Conforto antes do embarque" title="Lounge VIP & Espera com Estilo" />
          <JourneyStep count="ETAPA 02" subtitle="Cadeira cama 180°" title="Noite Tranquila nas Nuvens" />
          <JourneyStep count="ETAPA 03" subtitle="Desde o primeiro minuto" title="Vivendo o Destino dos Sonhos" />
        </HairlineGrid>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="padding-global">
      <div className="container">
        <SectionHead eyebrow="Como funciona" title={<>Sua viagem dos sonhos <span className="color-white-40">em 3 passos</span></>} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '4rem 1.5rem' }}>
          <StepItem icon="step-1" count="01" title="Briefing Rápido no WhatsApp" text="Você nos conta para onde quer ir, suas datas, estilo de viagem e quantidade de viajantes." />
          <StepItem icon="step-2" count="02" title="Estratégia & Roteiro Sob Medida" text="Apresentamos a melhor rota, a cotação inteligente de voos e a sugestão de hospedagens." />
          <StepItem icon="step-3" count="03" title="Embarque com Suporte Total" text="Emitimos suas passagens, confirmamos reservas e cuidamos da sua retaguarda 24h." />
        </div>
      </div>
    </section>
  );
}

function Stories() {
  const people = [['depoimentos-rio.jpg', 'Rio de Janeiro', 'Zé Luís & Família'], ['depoimentos-ushuaia.jpg', 'Ushuaia, Argentina', 'Aventura na Patagônia'], ['depoimentos-bonito.jpg', 'Bonito, MS', 'Viagem entre Amigas'], ['depoimentos-chile.jpg', 'Neve no Chile', 'Férias em Família']];
  return (
    <section className="padding-global" id="historias">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid var(--white-10)', borderBottom: '1px solid var(--white-10)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2.5rem', borderRight: '1px solid var(--white-10)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}><Icon name="celure-mark" size="1.125rem" /><span className="body-md">Clientes & Histórias</span></div>
            <div className="h2">Histórias de quem viajou de verdade</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '26rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}><span className="h4">5.0</span><Icon name="stars" width="3.3125rem" height=".5625rem" /></div>
            <div className="body-md color-white-60">"Quando o destino encontra o planejamento ideal, o resultado é inesquecível."</div>
          </div>
        </div>
        <HairlineGrid columns={2} edges="none">{people.map(([img, n, c]) => <PersonCard key={n} image={IMG + 'celure/' + img} name={n} caption={c} />)}</HairlineGrid>
      </div>
    </section>
  );
}

function Home({ go }) {
  return <><Hero go={go} /><Stats /><About /><Services go={go} /><Journey /><HowItWorks /><Stories /></>;
}
window.Home = Home;
