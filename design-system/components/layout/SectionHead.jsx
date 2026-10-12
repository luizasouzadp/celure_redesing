import React from 'react';
import { Icon } from '../icons/Icon.jsx';
export function SectionHead({ eyebrow, title, children, marginBottom = '4rem', titleSize = 'h2' }) {
  const t = titleSize === 'h3'
    ? { fontSize: '2.8125rem', letterSpacing: '-3px', lineHeight: '100%' }
    : { fontSize: '3.75rem', letterSpacing: '-3.6px', lineHeight: '110%' };
  return (
    <div style={{ display: 'flex', margin: '0 -1rem ' + marginBottom }}>
      <div style={{ width: '22.5%', padding: '0 1rem' }}>
        {eyebrow && <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}><Icon name="celure-mark" size="1.125rem" /><span style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '-.5px', lineHeight: '130%' }}>{eyebrow}</span></div>}
      </div>
      <div style={{ width: '75%', padding: '0 1rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        <div style={{ ...t, fontWeight: 600, margin: 0, textWrap: 'balance' }}>{title}</div>
        {children}
      </div>
    </div>
  );
}
