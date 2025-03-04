import { component$ } from "@builder.io/qwik";
import type { NavigationItemProps } from "./types";

export const NavigationItem = component$<NavigationItemProps>(
  ({ icon, label, isActive = false }) => {
    return (
      <button
        class={`flex gap-3 items-center px-3 py-2.5 mt-2 max-w-full whitespace-nowrap rounded-lg w-[236px] ${
          isActive ? "bg-gray-800" : "bg-gray-900"
        }`}
      >
        <img
          src={icon}
          alt=""
          class="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
        />
        <span class="flex-1 shrink self-stretch my-auto basis-0">{label}</span>
      </button>
    );
  }
);
