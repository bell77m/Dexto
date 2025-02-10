import { component$ } from "@builder.io/qwik";
import type { StepNumberProps } from "./types";

export const StepNumber = component$((props: StepNumberProps) => {
  return (
    <div
      class={`px-2.5 w-6 h-6 bg-red-600 rounded-full ${props.className || ""}`}
    >
      {props.number}
    </div>
  );
});
