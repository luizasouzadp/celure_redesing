import React from 'react';
import { Icon } from '../icons/Icon.jsx';
export function CloseButton({ onClick, label = 'Fechar', style }) {
  const [s, setS] = React.useState('rest');
  const name = s === 'press' ? 'close-clicked' : s === 'hover' ? 'close-hover' : 'close';
  return (
    <button type="button" aria-label={label} onClick={onClick}
      onMouseEnter={() => setS('hover')} onMouseLeave={() => setS('rest')} onMouseDown={() => setS('press')} onMouseUp={() => setS('hover')}
      style={{ width: '1.5rem', height: '1.5rem', padding: 0, border: 0, background: 'transparent', cursor: 'pointer', ...style }}>
      <Icon name={name} size="1.5rem" />
    </button>
  );
}
