import { describe, it, expect } from 'vitest';
import { wrapIndex, coverflowPose } from '../../src/lib/carousel';

describe('wrapIndex', () => {
  it('dá a volta nos dois sentidos', () => {
    expect(wrapIndex(-1, 4)).toBe(3);
    expect(wrapIndex(4, 4)).toBe(0);
    expect(wrapIndex(-1, 7)).toBe(6);
    expect(wrapIndex(2, 7)).toBe(2);
  });
});

describe('coverflowPose (4 cards)', () => {
  it('card ativo', () => expect(coverflowPose(0, 0, 4)).toEqual({ translateX: 0, scale: 1, opacity: 1, zIndex: 30, pointerEvents: 'auto' }));
  it('vizinho direito', () => expect(coverflowPose(1, 0, 4)).toEqual({ translateX: 170, scale: 0.78, opacity: 0.45, zIndex: 20, pointerEvents: 'auto' }));
  it('vizinho esquerdo com volta (ativo 0, card 3)', () => expect(coverflowPose(3, 0, 4)).toEqual({ translateX: -170, scale: 0.78, opacity: 0.45, zIndex: 20, pointerEvents: 'auto' }));
  it('card oposto (diff 2) fica escondido à direita', () => expect(coverflowPose(2, 0, 4)).toEqual({ translateX: 250, scale: 0.6, opacity: 0, zIndex: 10, pointerEvents: 'none' }));
  it('vizinho esquerdo com volta (ativo 3, card 2) e direito (card 0)', () => {
    expect(coverflowPose(2, 3, 4).translateX).toBe(-170);
    expect(coverflowPose(0, 3, 4).translateX).toBe(170);
  });
});
