import { component$ } from "@builder.io/qwik";
import { ActionButton } from "./ActionButton";
import type { StartSectionProps } from "./types";

export const StartSection = component$((props: StartSectionProps) => {
  return (
    <div class="flex overflow-hidden flex-col pt-20 text-2xl text-center text-white bg-gray-800 max-md:max-w-full">
      <div class="flex flex-col self-center w-full max-w-[1058px] max-md:max-w-full">
        <div class="flex flex-col items-center px-3 w-full rounded-3xl">
          <h1 class="text-6xl font-bold max-md:max-w-full max-md:text-4xl">
            {props.title}
          </h1>
          <p class="self-stretch mt-20 max-md:mt-10 max-md:max-w-full">
            {props.description}
          </p>
          <ActionButton text={props.buttonText} href="/signup" />
        </div>
      </div>
      <div class="flex shrink-0 mt-20 h-0 bg-stone-900 max-md:mt-10 max-md:max-w-full" />
    </div>
  );
});
