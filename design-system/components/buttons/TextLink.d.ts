import * as React from 'react';
/** Inline underlined link (1px white bottom border) for body copy and legal text. */
export interface TextLinkProps {
  href?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function TextLink(props: TextLinkProps): JSX.Element;
