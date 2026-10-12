/** Portrait cell with name + caption overlaid bottom-left on the photo (no gradient, no box). */
export interface PersonCardProps {
  image: string;
  name: string;
  caption?: string;
  /** @default '260 / 325' */
  aspect?: string;
}
export declare function PersonCard(props: PersonCardProps): JSX.Element;
