import * as React from 'react';
/** The signature layout device: content cells separated by 1px white-10 rules, no gutters, no cards. */
export interface HairlineGridProps {
  /** @default 3 */
  columns?: number;
  children: React.ReactNode;
  /** 'y' = top+bottom rules, 'all' = boxed, 'none'. @default 'y' */
  edges?: 'y' | 'all' | 'none';
  /** Negative 2.5rem side margins so the grid spans edge-to-edge inside a .container. @default false */
  bleed?: boolean;
  style?: React.CSSProperties;
}
export declare function HairlineGrid(props: HairlineGridProps): JSX.Element;
