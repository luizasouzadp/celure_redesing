import React from 'react';
import { Icon } from '../icons/Icon.jsx';
export function StepItem({ icon, count, title, text, compact = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: compact ? 'flex-start' : 'space-between', gap: compact ? '3.5rem' : '8.375rem', minHeight: compact ? '12.8125rem' : undefined }}>
      <div style={{ display: 'flex', gap: '.75rem' }}>
        {icon && <Icon name={icon} size="3.0625rem" />}
        {count && <div style={{ color: 'var(--white-50)', fontSize: '.625rem', fontWeight: 600, lineHeight: '.6875rem' }}>{count}</div>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ fontSize: '1.75rem', fontWeight: 600, letterSpacing: '-2px', lineHeight: '120%' }}>{title}</div>
        {text && <div style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '-.5px', lineHeight: '130%', color: 'var(--white-60)' }}>{text}</div>}
      </div>
    </div>
  );
}
