import React from 'react';
const SPARKLE = 'M8 0C8 0 7.32057 2.41553 7.32057 4C7.32057 5.58447 8 8 8 8C8 8 5.58447 7.32057 4 7.32057C2.41553 7.32057 0 8 0 8C0 8 0.679427 5.58447 0.679427 4C0.679427 2.41553 0 0 0 0C0 0 2.41553 0.679426 4 0.679426C5.58447 0.679426 8 0 8 0Z';
export function Button({ variant = 'primary', children, href, onClick, icon = true, fullWidth = false, type, style }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const primary = variant === 'primary';
  const bg = press ? 'var(--button-clicked)' : hover ? 'var(--brand-accent)' : primary ? 'var(--white-100)' : 'var(--brand-green)';
  const fg = primary ? 'var(--brand-green)' : 'var(--white-100)';
  const Tag = href ? 'a' : 'button';
  return (
    <Tag href={href} type={href ? undefined : (type || 'button')} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={{
        display: fullWidth ? 'flex' : 'inline-flex', width: fullWidth ? '100%' : undefined,
        gap: '1rem', alignItems: 'center',
        justifyContent: fullWidth ? 'space-between' : primary ? 'flex-start' : 'center',
        padding: primary ? '1.25rem 2rem' : '.875rem 1.5rem', minWidth: primary ? undefined : '8.5rem',
        borderRadius: '5rem', border: 0, background: bg, color: fg, cursor: 'pointer',
        textDecoration: 'none', transition: '.2s', fontFamily: 'var(--font-sans)', boxSizing: 'border-box', ...style,
      }}>
      <span style={{ fontSize: '.875rem', fontWeight: 600, lineHeight: '90%', letterSpacing: '-.5px', whiteSpace: 'nowrap' }}>{children}</span>
      {icon && <svg width="8" height="8" viewBox="0 0 8 8" style={{ flexShrink: 0 }}><path d={SPARKLE} fill="currentColor" /></svg>}
    </Tag>
  );
}
