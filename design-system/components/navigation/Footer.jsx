import React from 'react';
import { Icon } from '../icons/Icon.jsx';
const line = 'var(--white-20)';
const btnSm = { fontSize: '.875rem', fontWeight: 600, letterSpacing: '-.5px', lineHeight: '125%' };
export function Footer({ brand = 'Celure', tagline, visualSrc, columns = [], contacts = [], copy, legalLinks = [], credit }) {
  return (
    <footer style={{ paddingTop: '5rem' }}>
      {visualSrc && <div style={{ padding: '0 2.5rem' }}><div style={{ width: '100%', height: '21rem', marginBottom: '5rem' }}><img src={visualSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div></div>}
      <div style={{ padding: '0 2.5rem 5rem', display: 'flex', gap: '2rem' }}>
        <div style={{ width: '22.5%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <Icon name="celure-mark" size="1.25rem" />
            <span style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-2px', lineHeight: '130%' }}>{brand}</span>
          </div>
          {tagline && <div style={{ fontSize: '.875rem', letterSpacing: '-.6px', lineHeight: '130%', color: 'var(--white-60)' }}>{tagline}</div>}
        </div>
        {columns.map((col, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            {col.title && <div style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '-.5px', color: 'var(--white-40)', marginBottom: '.5rem' }}>{col.title}</div>}
            {col.links.map((l) => <a key={l.label} href={l.href} style={{ color: 'var(--white-100)', fontSize: '1rem', fontWeight: 500, letterSpacing: '-.5px', lineHeight: '130%', textDecoration: 'none' }}>{l.label}</a>)}
          </div>
        ))}
        {contacts.length > 0 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {contacts.map((c, i) => <div key={i} style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '-.5px', lineHeight: '130%', color: i === 0 ? 'var(--white-100)' : 'var(--white-60)' }}>{c}</div>)}
          </div>
        )}
      </div>
      <div style={{ borderTop: '1px solid ' + line, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          {copy && <div style={{ ...btnSm, padding: '1.875rem 3.59375rem', borderRight: '1px solid ' + line }}>{copy}</div>}
          <div style={{ display: 'flex', gap: '1.5rem' }}>{legalLinks.map((l) => <a key={l.label} href={l.href} style={{ ...btnSm, color: 'var(--white-100)', textDecoration: 'none' }}>{l.label}</a>)}</div>
        </div>
        {credit && <div style={{ ...btnSm, padding: '0 2.5rem', color: 'var(--white-40)' }}>{credit}</div>}
      </div>
    </footer>
  );
}
