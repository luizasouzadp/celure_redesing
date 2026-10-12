/**
 * Underline-only form field: small muted label, 22px medium input text, 1px white-10 bottom rule.
 * @startingPoint section="Forms" subtitle="Underline input / select / textarea" viewport="700x340"
 */
export interface InputGroupProps {
  label: string;
  /** @default 'input' */
  as?: 'input' | 'textarea' | 'select';
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: any) => void;
  /** For as="select". */
  options?: string[];
  required?: boolean;
}
export declare function InputGroup(props: InputGroupProps): JSX.Element;
