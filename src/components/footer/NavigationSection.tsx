import { component$ } from "@builder.io/qwik";
import type { NavigationSectionProps } from "./types";

export const NavigationSection = component$((props: NavigationSectionProps) => {
  return (
    <div class="flex flex-col text-xl font-semibold">
      <div class="text-2xl font-light">{props.title}</div>
      {props.links.map((link) => (
        <a
          key={link.text}
          href={link.href}
          class="mt-14 max-md:mt-10"
          tabIndex={0}
        >
          {link.text}
        </a>
      ))}
    </div>
  );
});