import React from 'react';
export function Breadcrumbs({ items = [], onNavigate }) {
  return (
    <ol style={{ display: 'flex', flexWrap: 'wrap', gap: '1.75rem', margin: 0, padding: 0, listStyle: 'none' }}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <li key={i} style={{ position: 'relative', fontSize: '.875rem', letterSpacing: '-.6px', lineHeight: '130%', color: last ? 'var(--white-100)' : 'var(--white-40)' }}>
            {last || !it.href ? it.label : <a href={it.href} onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate(it.href); } }} style={{ color: 'inherit', textDecoration: 'none' }}>{it.label}</a>}
            {!last && <span aria-hidden="true" style={{ position: 'absolute', right: '-1.125rem', color: 'var(--white-40)' }}>/</span>}
          </li>
        );
      })}
    </ol>
  );
}
