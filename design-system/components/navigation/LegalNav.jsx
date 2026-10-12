import React from 'react';
export function LegalNav({ items = [], activeIndex = 0, onSelect }) {
  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'sticky', top: '2rem' }}>
      {items.map((label, i) => {
        const on = i === activeIndex;
        return (
          <a key={i} href="#" onClick={(e) => { e.preventDefault(); onSelect && onSelect(i); }}
            style={{ display: 'block', padding: '.75rem', borderLeft: '2px solid ' + (on ? 'var(--brand-accent)' : 'transparent'), color: on ? 'var(--white-100)' : 'var(--white-40)', fontSize: '1.125rem', fontWeight: 500, letterSpacing: '-.5px', lineHeight: '130%', textDecoration: 'none' }}>{label}</a>
        );
      })}
    </nav>
  );
}
