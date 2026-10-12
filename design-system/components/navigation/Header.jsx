import React from 'react';
import { Icon } from '../icons/Icon.jsx';
const line = 'var(--white-20)';
const btnSm = { fontSize: '.875rem', fontWeight: 600, lineHeight: '90%', letterSpacing: '-.5px' };
export function Header({ brand = 'Celure', links = [], accentLabel, onNavigate, position = 'fixed', homeHref = '#' }) {
  const go = (href) => (e) => { if (onNavigate) { e.preventDefault(); onNavigate(href); } };
  return (
    <header style={{ position, top: 0, left: 0, right: 0, width: '100%', zIndex: 100, background: 'transparent', borderBottom: '1px solid ' + line }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', height: '4.5rem' }}>
        <a href={homeHref} onClick={go(homeHref)} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', padding: '0 2.5rem', borderRight: '1px solid ' + line, textDecoration: 'none' }}>
          <Icon name="celure-mark" size="1.25rem" />
          <span style={{ color: 'var(--white-100)', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-2px', lineHeight: '130%' }}>{brand}</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <nav style={{ display: 'flex', gap: '1.5rem' }}>
            {links.map((l) => (
              <a key={l.label} href={l.href} onClick={go(l.href)} style={{ ...btnSm, color: l.active ? 'var(--button-clicked)' : 'var(--white-100)', textDecoration: 'none' }}>{l.label}</a>
            ))}
          </nav>
          {accentLabel && (
            <a href={accentLabel.href} onClick={go(accentLabel.href)} style={{ ...btnSm, display: 'flex', alignItems: 'center', height: '100%', marginLeft: '1.5rem', padding: '0 2.5rem', borderLeft: '1px solid ' + line, color: 'var(--white-100)', textDecoration: 'none' }}>{accentLabel.label}</a>
          )}
        </div>
      </div>
    </header>
  );
}
