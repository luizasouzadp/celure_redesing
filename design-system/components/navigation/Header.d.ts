/**
 * Transparent fixed top bar, 72px tall, divided into cells by 1px white-20 hairlines:
 * logo cell | nav links | accent cell.
 * @startingPoint section="Navigation" subtitle="Hairline-divided transparent header" viewport="1280x120"
 */
export interface HeaderProps {
  /** Wordmark text next to the Celure "e" mark. @default 'Celure' */
  brand?: string;
  links?: { label: string; href: string; active?: boolean }[];
  /** Right-most standalone cell (e.g. "Falar no WhatsApp"). */
  accentLabel?: { label: string; href: string };
  /** If provided, links call this instead of navigating. */
  onNavigate?: (href: string) => void;
  /** @default 'fixed' */
  position?: 'fixed' | 'absolute' | 'relative' | 'static';
  homeHref?: string;
}
export declare function Header(props: HeaderProps): JSX.Element;
