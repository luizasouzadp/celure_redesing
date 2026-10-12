import React from 'react';
import { Icon } from '../icons/Icon.jsx';
export function IncludedList({ items = [], columns = 2 }) {
  return (
    <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(' + columns + ', minmax(0,1fr))', gap: '1rem 0', borderTop: '1px solid var(--white-10)', margin: 0, padding: '2rem 0 0', listStyle: 'none' }}>
      {items.map((it, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', minHeight: '1.5rem', fontSize: '1rem', fontWeight: 500, letterSpacing: '-.5px', lineHeight: '130%' }}>
          <Icon name={it.icon || 'plus'} size="1.5rem" />{it.label}
        </li>
      ))}
    </ul>
  );
}
