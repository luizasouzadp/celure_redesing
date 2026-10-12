import * as React from 'react';
/** Section opener: small mark + eyebrow in the left 22.5% column, big tight headline in the right 75%. */
export interface SectionHeadProps {
  eyebrow?: string;
  title: React.ReactNode;
  /** Extra content under the title (lede, button). */
  children?: React.ReactNode;
  /** @default '4rem' */
  marginBottom?: string;
  /** @default 'h2' */
  titleSize?: 'h2' | 'h3';
}
export declare function SectionHead(props: SectionHeadProps): JSX.Element;
