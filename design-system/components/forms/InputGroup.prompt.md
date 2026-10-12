Form field for the contact/briefing form — no boxes, just a label and a hairline; pair two per row with gap 1.5rem.
```jsx
<div style={{display:'flex',gap:'1.5rem'}}><InputGroup label="Seu nome completo" /><InputGroup label="Destino desejado" /></div>
<InputGroup as="select" label="Viajantes" options={['1 pessoa (Solo)','2 pessoas (Casal/Amigos)']} />
<InputGroup as="textarea" label="Detalhes adicionais (opcional)" />
```
