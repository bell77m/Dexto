import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { ButtonProps } from "./types";

export const PrimaryButton = component$((props: ButtonProps) => {
  return (
    <Link
      href="/guide"
      class="self-start px-16 py-5 text-center text-2xl font-medium text-white bg-orange-600 rounded-3xl border-orange-600 border-solid border-[3px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5 mt-10"
    >
      {props.text}
    </Link>
  );
});
