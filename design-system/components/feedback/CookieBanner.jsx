import React from 'react';
import { Button } from '../buttons/Button.jsx';
import { CloseButton } from '../buttons/CloseButton.jsx';
export function CookieBanner({ open = true, text, acceptLabel = 'Aceitar', declineLabel = 'Recusar', onAccept, onDecline, onClose, position = 'fixed' }) {
  return (
    <div style={{ position, left: 0, right: 0, bottom: 0, zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', padding: '2.5rem', border: '1px solid var(--white-10)', background: 'var(--ink-900)', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transform: open ? 'translate(0,0)' : 'translate(0,1rem)', transition: '.4s' }}>
      <div style={{ fontSize: '1rem', fontWeight: 400, letterSpacing: '-.5px', lineHeight: '130%', color: 'var(--white-60)', maxWidth: '49rem' }}>{text}</div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'stretch' }}>
        <Button variant="secondary" icon={false} onClick={onDecline}>{declineLabel}</Button>
        <Button onClick={onAccept}>{acceptLabel}</Button>
        {onClose && <div style={{ display: 'flex', alignItems: 'center' }}><CloseButton onClick={onClose} /></div>}
      </div>
    </div>
  );
}
