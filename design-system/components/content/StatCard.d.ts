/** Grid cell: semibold title + "/ 30+ países" muted counter, then a tall photograph. */
export interface StatCardProps {
  title: string;
  /** Muted right-aligned counter, conventionally prefixed with "/ ". */
  subtitle?: string;
  image?: string;
  /** CSS aspect-ratio. @default '400 / 437' */
  aspect?: string;
}
export declare function StatCard(props: StatCardProps): JSX.Element;
