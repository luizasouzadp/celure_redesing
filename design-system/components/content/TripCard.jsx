import React from 'react';
import { Icon } from '../icons/Icon.jsx';
import { Button } from '../buttons/Button.jsx';
const xs = { fontSize: '.75rem', letterSpacing: '-.5px', lineHeight: '.9375rem' };
export function TripCard({ title, priceLabel, price, image, properties = [], ctaLabel, onCta, href }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '2.5rem', padding: '2.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
          <div style={{ fontSize: '1.75rem', fontWeight: 600, letterSpacing: '-2px', lineHeight: '100%' }}>{title}</div>
          {(priceLabel || price) && <div style={{ display: 'flex', gap: '.25rem', fontSize: '1rem', fontWeight: 500, letterSpacing: '-.5px', lineHeight: '130%' }}>{priceLabel && <span style={{ color: 'var(--white-50)' }}>{priceLabel}</span>}{price && <span>{price}</span>}</div>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {properties.map((p, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>{p.icon && <Icon name={p.icon} size=".875rem" />}<span style={{ ...xs, color: 'var(--white-60)' }}>{p.label}</span></div>
                {p.value === 'stars' ? <Icon name="stars" width="3.3125rem" height=".5625rem" /> : <span style={xs}>{p.value}</span>}
              </div>
            ))}
          </div>
          {ctaLabel && <Button variant="secondary" fullWidth href={href} onClick={onCta}>{ctaLabel}</Button>}
        </div>
      </div>
      {image && <div style={{ width: '18.75rem', height: '20.125rem', overflow: 'hidden' }}><img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>}
    </div>
  );
}
