/** Site footer: optional full-width photo band, logo + link columns, hairline bottom bar with copyright cell. */
export interface FooterProps {
  brand?: string;
  tagline?: string;
  /** Full-width 21rem-tall photograph above the links. */
  visualSrc?: string;
  columns?: { title?: string; links: { label: string; href: string }[] }[];
  /** First line renders white, the rest white-60. */
  contacts?: string[];
  copy?: string;
  legalLinks?: { label: string; href: string }[];
  credit?: string;
}
export declare function Footer(props: FooterProps): JSX.Element;
