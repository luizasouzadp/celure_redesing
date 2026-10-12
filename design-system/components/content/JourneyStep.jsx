import React from 'react';
export function JourneyStep({ count, subtitle, title }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5.5rem', padding: '2.5rem', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', gap: '.5rem', alignItems: 'flex-start' }}>
        <div style={{ color: 'var(--white-50)', fontSize: '.625rem', fontWeight: 600, lineHeight: '.6875rem', paddingTop: '.5rem', whiteSpace: 'nowrap' }}>{count}</div>
        {subtitle && <div style={{ fontSize: '.875rem', letterSpacing: '-.6px', lineHeight: '130%', color: 'var(--white-60)', padding: '.5rem 0' }}>{subtitle}</div>}
      </div>
      <div style={{ fontSize: '1.125rem', fontWeight: 500, letterSpacing: '-.5px', lineHeight: '130%' }}>{title}</div>
    </div>
  );
}
