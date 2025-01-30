import { component$ } from "@builder.io/qwik";
import type { SocialLinkProps } from "./types";

export const SocialLink = component$((props: SocialLinkProps) => {
  return (
    <a href="#" tabIndex={0}>
      <img
        loading="lazy"
        src={props.src}
        alt={props.alt}
        class="object-contain shrink-0 aspect-square w-[26px]"
      />
    </a>
  );
});