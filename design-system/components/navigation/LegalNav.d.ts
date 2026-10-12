/** Sticky sidebar table-of-contents; active item gets a 2px brand-accent left rule. */
export interface LegalNavProps {
  items: string[];
  /** @default 0 */
  activeIndex?: number;
  onSelect?: (index: number) => void;
}
export declare function LegalNav(props: LegalNavProps): JSX.Element;
