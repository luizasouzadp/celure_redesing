/**
 * Featured offer cell: title + price on the left, icon/label/value property rows and a full-width
 * secondary pill CTA; 300×322 photograph on the right. Lives inside a 2-column HairlineGrid.
 * @startingPoint section="Content" subtitle="Featured trip / service cell" viewport="700x420"
 */
export interface TripCardProps {
  title: string;
  /** Muted prefix, e.g. "a partir de". */
  priceLabel?: string;
  price?: string;
  image?: string;
  /** value: 'stars' renders the 5-star strip. */
  properties?: { icon?: 'pin' | 'calendar' | 'users' | 'location' | 'earth' | 'yoga'; label: string; value: string }[];
  ctaLabel?: string;
  onCta?: () => void;
  href?: string;
}
export declare function TripCard(props: TripCardProps): JSX.Element;
