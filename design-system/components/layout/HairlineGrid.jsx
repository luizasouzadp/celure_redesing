import React from 'react';
export function HairlineGrid({ columns = 3, children, edges = 'y', bleed = false, style }) {
  const items = React.Children.toArray(children);
  const line = '1px solid var(--white-10)';
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + columns + ', minmax(0,1fr))', borderTop: edges !== 'none' ? line : undefined, borderBottom: edges !== 'none' ? line : undefined, borderLeft: edges === 'all' ? line : undefined, borderRight: edges === 'all' ? line : undefined, margin: bleed ? '0 -2.5rem' : undefined, ...style }}>
      {items.map((c, i) => (
        <div key={i} style={{ borderLeft: i % columns !== 0 ? line : undefined, borderTop: i >= columns ? line : undefined, minWidth: 0 }}>{c}</div>
      ))}
    </div>
  );
}
