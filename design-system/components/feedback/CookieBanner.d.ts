import * as React from 'react';
/** Full-width bottom consent bar; slides up 1rem + fades in over .4s. */
export interface CookieBannerProps {
  /** @default true */
  open?: boolean;
  text: React.ReactNode;
  acceptLabel?: string;
  declineLabel?: string;
  onAccept?: () => void;
  onDecline?: () => void;
  onClose?: () => void;
  /** @default 'fixed' */
  position?: 'fixed' | 'absolute' | 'relative';
}
export declare function CookieBanner(props: CookieBannerProps): JSX.Element;
