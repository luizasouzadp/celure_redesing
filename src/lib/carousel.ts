export type CardPose = { translateX: number; scale: number; opacity: number; zIndex: number; pointerEvents: 'auto' | 'none' };

export function wrapIndex(i: number, len: number): number {
  return ((i % len) + len) % len;
}

// Posição de um card do coverflow em relação ao card ativo (mesmos valores do app.js original)
export function coverflowPose(index: number, active: number, count: number): CardPose {
  let diff = index - active;
  if (diff > count / 2) diff -= count;
  if (diff < -count / 2) diff += count;
  if (diff === 0) return { translateX: 0, scale: 1, opacity: 1, zIndex: 30, pointerEvents: 'auto' };
  if (diff === -1 || diff === 1) return { translateX: 170 * diff, scale: 0.78, opacity: 0.45, zIndex: 20, pointerEvents: 'auto' };
  return { translateX: diff < 0 ? -250 : 250, scale: 0.6, opacity: 0, zIndex: 10, pointerEvents: 'none' };
}
