import React from 'react';
export function StatCard({ title, subtitle, image, aspect = '400 / 437' }) {
  return (
    <div style={{ padding: '2.5rem', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
        <div style={{ fontSize: '1.125rem', fontWeight: 600, letterSpacing: '-.5px', lineHeight: '100%' }}>{title}</div>
        {subtitle && <div style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '-.5px', lineHeight: '130%', color: 'var(--white-50)', whiteSpace: 'nowrap' }}>{subtitle}</div>}
      </div>
      {image && <div style={{ aspectRatio: aspect, width: '100%', overflow: 'hidden' }}><img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>}
    </div>
  );
}
