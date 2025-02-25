import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface ActionButtonProps {
  text: string;
  href: string;
}

export const ActionButton = component$((props: ActionButtonProps) => {
  return (
    <Link 
      href={props.href}
      class="px-16 py-5 mt-24 max-w-full font-medium bg-orange-600 rounded-3xl border-orange-600 border-solid border-[3px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[567px] max-md:px-5 max-md:mt-10 text-center text-white"
      tabIndex={0}
      aria-label={props.text}
    >
      {props.text}
    </Link>
  );
});
