import { component$ } from "@builder.io/qwik";

interface HowToUseForumSectionProps {
  title: string;
}

export const HowToUseForumSection = component$<HowToUseForumSectionProps>(
  ({ title }) => {
    return (
      <section class="overflow-hidden text-center px-16 py-32 text-6xl font-semibold tracking-tighter leading-none text-white bg-gray-900 max-md:px-5 max-md:py-24 max-md:max-w-full max-md:text-4xl">
        <h1>{title}</h1>
      </section>
    );
  }
);
