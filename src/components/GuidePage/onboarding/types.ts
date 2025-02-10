export interface StepNumberProps {
  number: string;
  className?: string;
}

export interface StepProps {
  stepNumber: string;
  description: string;
}

export interface OnboardingStepProps {
  steps: StepProps[];
}
