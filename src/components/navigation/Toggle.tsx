import { component$ } from "@builder.io/qwik";
import type { ToggleProps } from "./types";

export const Toggle = component$((props: ToggleProps) => {
  return (
    <div class="flex overflow-hidden flex-col justify-center items-start self-stretch px-1 py-1 my-auto w-20 bg-amber-900 rounded-[100px]">
      <div class="flex shrink-0 bg-white rounded-full h-[26px] w-[26px]"></div>
    </div>
  );
});
