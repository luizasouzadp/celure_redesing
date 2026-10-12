/** "O que está incluso" list: 24px icon + label rows in a 2-col grid under a hairline. */
export interface IncludedListProps {
  items: { icon?: 'included-accommodation' | 'included-integration' | 'included-meals' | 'plus'; label: string }[];
  /** @default 2 */
  columns?: number;
}
export declare function IncludedList(props: IncludedListProps): JSX.Element;
