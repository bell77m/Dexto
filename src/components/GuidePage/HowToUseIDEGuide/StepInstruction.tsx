import { component$ } from "@builder.io/qwik";

interface StepInstructionProps {
  step: number;
  content: string;
}

export const StepInstruction = component$<StepInstructionProps>(
  ({ step, content }) => {
    return (
      <>
        {step === 3 && (
          <div class="self-center mt-0 ml-32 text-xl font-semibold tracking-tight leading-none text-gray-900 max-md:mt-10">
            3
          </div>
        )}
        <div
          class={`${
            step === 1
              ? "mt-6 mr-16"
              : step === 2
              ? "mt-0"
              : step === 3
              ? "mt-0"
              : "mt-1 leading-loose"
          } max-md:mt-10 max-md:mr-2.5 max-md:max-w-full`}
        >
          Step {step}: {content}
        </div>
      </>
    );
  }
);
