import { component$ } from "@builder.io/qwik";
import type { QuickstartItemProps } from "./types";

export const QuickstartItem = component$((props: QuickstartItemProps) => {
  return (
    <div
      class={`px-10 py-3.5 mt-12 max-w-full w-[358px] max-md:px-5 max-md:mt-10 ${
        props.isActive ? "bg-white text-black rounded-xl" : ""
      }`}
      tabIndex={0}
      role="button"
    >
      {props.title}
    </div>
  );
});
