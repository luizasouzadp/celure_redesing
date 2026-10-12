import React from 'react';
export function PersonCard({ image, name, caption, aspect = '260 / 325' }) {
  return (
    <div style={{ padding: '2.5rem' }}>
      <div style={{ position: 'relative' }}>
        <img src={image} alt="" style={{ width: '100%', aspectRatio: aspect, objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', left: '1rem', right: '1rem', bottom: '1rem', display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
          <div style={{ fontSize: '1.125rem', fontWeight: 600, letterSpacing: '-.5px', lineHeight: '100%' }}>{name}</div>
          {caption && <div style={{ fontSize: '.875rem', letterSpacing: '-.6px', lineHeight: '130%', color: 'var(--white-60)' }}>{caption}</div>}
        </div>
      </div>
    </div>
  );
}
