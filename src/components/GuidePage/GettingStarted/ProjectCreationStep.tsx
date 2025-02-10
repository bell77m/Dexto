import { component$ } from "@builder.io/qwik";

export interface ProjectCreationStepProps {
  stepNumber: number;
  instruction: string;
}

export const ProjectCreationStep = component$(
  (props: ProjectCreationStepProps) => {
    return (
      <div class="self-stretch mt-16 text-2xl font-medium tracking-tight text-white leading-[50px] max-md:mt-10 max-md:mr-2 max-md:max-w-full">
        Step {props.stepNumber}: {props.instruction}
      </div>
    );
  }
);
