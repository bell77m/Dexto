import { component$ } from "@builder.io/qwik";
import { OnboardingStep } from "./OnboardingStep";

export const Onboarding = component$(() => {
  const steps = [
    {
      stepNumber: "1",
      description: "Click on the Project bar.",
    },
    {
      stepNumber: "2",
      description:
        'Click on "Create your Project" to start creating your project or click on "Import your Project" to import your project.',
    },
    {
      stepNumber: "3",
      description: "Name your project and select the programming language.",
    },
  ];

  return <OnboardingStep steps={steps} />;
});
