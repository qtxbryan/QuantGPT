export interface Step {
  title: string;
  description: string;
}

export interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
}
