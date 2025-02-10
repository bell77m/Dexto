import { component$ } from "@builder.io/qwik";

interface HowToUseIDEHeaderProps {
  title: string;
}

export const HowToUseIDEHeader = component$((props: HowToUseIDEHeaderProps) => {
  return (
    <header class="overflow-hidden px-16 pt-32 pb-24 mt-0 w-full text-center text-6xl font-semibold tracking-tighter leading-none text-white bg-gray-900 max-md:px-5 max-md:pt-24 max-md:pb-28 max-md:max-w-full max-md:text-4xl">
      {props.title}
    </header>
  );
});
