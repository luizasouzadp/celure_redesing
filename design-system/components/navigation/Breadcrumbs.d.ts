/** Breadcrumb trail for detail pages; muted ancestors, white current page, 28px gaps. */
export interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
  onNavigate?: (href: string) => void;
}
export declare function Breadcrumbs(props: BreadcrumbsProps): JSX.Element;
