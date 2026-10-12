import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';

const novos = ['lounge-drinks', 'lounge-shower', 'lounge-rest', 'lounge-wifi', 'lounge-quiet'];

describe('ícones das salas VIP', () => {
  it.each(novos)('%s existe no traço do design system (24px, linha branca)', (nome) => {
    const path = `src/assets/icons/${nome}.svg`;
    expect(existsSync(path)).toBe(true);
    const svg = readFileSync(path, 'utf8');
    // o Icon.astro remove width/height com esta ordem exata
    expect(svg.startsWith('<svg width="24" height="24" viewBox="0 0 24 24"')).toBe(true);
    expect(svg).toContain('stroke="white"');
    expect(svg).toContain('stroke-width="1.5"');
  });
});
