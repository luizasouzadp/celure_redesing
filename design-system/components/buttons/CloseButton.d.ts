import * as React from 'react';
/** 24px close glyph with distinct rest / hover / pressed artwork (source SVGs). */
export interface CloseButtonProps {
  onClick?: (e: React.MouseEvent) => void;
  /** aria-label. @default 'Fechar' */
  label?: string;
  style?: React.CSSProperties;
}
export declare function CloseButton(props: CloseButtonProps): JSX.Element;
