/** "How it works" column: 49px line illustration + tiny counter, large gap, then title and muted body. */
export interface StepItemProps {
  icon?: 'step-1' | 'step-2' | 'step-3' | 'step-4';
  /** Tiny 10px counter next to the icon, e.g. "01". */
  count?: string;
  title: string;
  text?: string;
  /** Shorter 3.5rem gap variant (source "size-s"). @default false */
  compact?: boolean;
}
export declare function StepItem(props: StepItemProps): JSX.Element;
