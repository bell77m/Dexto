import { component$ } from "@builder.io/qwik";

export interface StepInstructionProps {
  step: number;
  instruction: string;
}

export const StepInstruction = component$((props: StepInstructionProps) => {
  return (
    <div class="mt-20 max-md:mt-10 max-md:max-w-full">
      Step {props.step}: {props.instruction}
    </div>
  );
});
