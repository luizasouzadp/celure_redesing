// Índice em ciclo: passar do último volta ao primeiro e vice-versa (usado no lightbox de destinos)
export function wrapIndex(i: number, len: number): number {
  return ((i % len) + len) % len;
}
