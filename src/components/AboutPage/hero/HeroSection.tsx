import { component$ } from "@builder.io/qwik";

interface HeroSectionProps {
  title: string;
  description: string;
}

export const HeroSection = component$((props: HeroSectionProps) => {
  return (
    <div class="flex overflow-hidden flex-col justify-center items-center px-20 py-28 w-full text-center text-white bg-gray-900 max-md:px-5 max-md:py-24 max-md:max-w-full">
      <div class="flex flex-col justify-center px-4 py-11 mb-0 w-full max-w-[1083px] max-md:mb-2.5 max-md:max-w-full">
        <div class="flex flex-col px-2 w-full rounded-none">
          <h1 class="text-6xl font-bold max-md:max-w-full max-md:text-4xl">
            {props.title}
          </h1>
          <p class="mt-14 mr-6 ml-5 text-3xl font-extralight max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
});