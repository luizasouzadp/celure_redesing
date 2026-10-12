import React from 'react';
export function TextLink({ href, children, onClick, style }) {
  return <a href={href} onClick={onClick} style={{ color: 'var(--white-100)', borderBottom: '1px solid var(--white-100)', fontSize: '1rem', textDecoration: 'none', ...style }}>{children}</a>;
}
