import { component$ } from "@builder.io/qwik";
import { InspirationSectionProps } from "./types";

export const InspirationSection = component$((props: InspirationSectionProps) => {
  return (
    <div class="flex overflow-hidden flex-col justify-center px-16 py-60 w-full bg-gray-900 max-md:px-5 max-md:py-24 max-md:max-w-full">
      <div class="mb-0 max-md:mb-2.5 max-md:max-w-full">
        <div class="flex gap-5 max-md:flex-col">
          <div class="flex flex-col w-3/5 max-md:ml-0 max-md:w-full">
            <div class="flex flex-col items-start mt-5 text-white max-md:mt-10 max-md:max-w-full">
              <h1 class="text-5xl font-bold max-md:text-4xl">{props.title}</h1>
              <h2 class="text-3xl font-medium max-md:max-w-full">
                {props.subtitle}
              </h2>
              <p class="self-stretch mt-7 text-xl font-light max-md:max-w-full">
                {props.description}
              </p>
            </div>
          </div>
          <div class="flex flex-col ml-5 w-2/5 max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src={props.imageSrc}
              alt={props.imageAlt}
              class="object-contain grow w-full aspect-[1.78] max-md:mt-7 max-md:max-w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
});