/** One cell of the frosted step strip that sits along the bottom edge of a full-bleed photo section. */
export interface JourneyStepProps {
  /** e.g. "ETAPA 01" */
  count: string;
  subtitle?: string;
  title: string;
}
export declare function JourneyStep(props: JourneyStepProps): JSX.Element;
