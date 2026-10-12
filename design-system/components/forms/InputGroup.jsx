import React from 'react';
export function InputGroup({ label, as = 'input', type = 'text', name, placeholder, value, defaultValue, onChange, options = [], required }) {
  const [focus, setFocus] = React.useState(false);
  const base = { width: '100%', border: 0, borderBottom: '1px solid ' + (focus ? 'var(--white-40)' : 'var(--white-10)'), background: 'transparent', color: 'var(--white-100)', fontFamily: 'var(--font-sans)', fontSize: '1.375rem', fontWeight: 500, letterSpacing: '-1px', lineHeight: '100%', padding: '0 0 .9rem', margin: 0, outline: 'none', borderRadius: 0, transition: '.2s' };
  const ev = { name, placeholder, value, defaultValue, onChange, required, onFocus: () => setFocus(true), onBlur: () => setFocus(false) };
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '.25rem', width: '100%', paddingTop: '.9rem', margin: 0 }}>
      <span style={{ fontSize: '.875rem', letterSpacing: '-.6px', lineHeight: '130%', fontWeight: 400, color: 'var(--white-60)' }}>{label}</span>
      {as === 'textarea' ? <textarea {...ev} style={{ ...base, height: '9.625rem', resize: 'none', padding: 0 }} />
        : as === 'select' ? <select {...ev} style={{ ...base, appearance: 'none', cursor: 'pointer' }}>{options.map((o) => <option key={o} value={o} style={{ background: '#091b20' }}>{o}</option>)}</select>
        : <input type={type} {...ev} style={base} />}
    </label>
  );
}
