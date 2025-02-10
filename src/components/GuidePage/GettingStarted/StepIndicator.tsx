import { component$ } from "@builder.io/qwik";

export interface StepIndicatorProps {
  step: number;
  customClass?: string;
}

export const StepIndicator = component$((props: StepIndicatorProps) => {
  return (
    <div
      class={`flex flex-col grow justify-center px-8 py-1 mt-1.5 text-[10px] pl-36 font-semibold tracking-tight leading-none text-gray-900 whitespace-nowrap border-2 border-red-600 border-solid max-md:mt-10 ${props.customClass}`}
    >
      <div class="flex items-center justify-center w-6 h-6 bg-red-600 text-white font-bold rounded-full">
        {props.step}
      </div>
    </div>
  );
});
