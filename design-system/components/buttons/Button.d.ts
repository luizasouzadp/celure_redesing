import * as React from 'react';
/**
 * Pill CTA. Primary = white pill with brand-green label; Secondary = brand-green pill with white label.
 * Both turn brand-accent orange on hover and #fa8805 while pressed. Trailing 8px sparkle glyph.
 * @startingPoint section="Buttons" subtitle="Pill CTA, primary / secondary" viewport="700x260"
 */
export interface ButtonProps {
  /** @default 'primary' */
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  /** Show the trailing sparkle glyph. @default true */
  icon?: boolean;
  /** Stretch to 100% and push the glyph to the far edge (mobile hero / card CTA). @default false */
  fullWidth?: boolean;
  type?: 'button' | 'submit';
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
