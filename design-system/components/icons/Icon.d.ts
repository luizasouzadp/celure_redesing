import * as React from 'react';
/** Renders one of the bundled source icons (inlined as data URIs, original colours). */
export interface IconProps {
  name: 'pin' | 'calendar' | 'users' | 'stars' | 'step-1' | 'step-2' | 'step-3' | 'step-4' | 'location' | 'earth' | 'yoga' | 'plus' | 'close' | 'close-hover' | 'close-clicked' | 'included-accommodation' | 'included-integration' | 'included-meals' | 'sparkle' | 'celure-mark';
  /** CSS length for width & height. @default '1rem' */
  size?: string;
  width?: string;
  height?: string;
  alt?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element | null;
export declare const ICON_NAMES: string[];
