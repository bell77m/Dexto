import { component$ } from "@builder.io/qwik";
import type { NavItemProps } from "./types";

export const NavItem = component$((props: NavItemProps) => {
  const { label, width = "w-28", padding = "px-8 py-3" } = props;

  return (
    <div
      class={`${padding} ${width} text-base text-center text-white max-md:px-5`}
      tabIndex={0}
      role="button"
    >
      {label}
    </div>
  );
});
