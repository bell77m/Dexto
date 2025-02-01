import { component$ } from "@builder.io/qwik";
import { PrimaryButton } from "./PrimaryButton";
import type { HeroSectionProps } from "./types";

export const HeroSection = component$((props: HeroSectionProps) => {
  return (
    <div class="flex overflow-hidden flex-col pt-72 w-full bg-gray-800 max-md:pt-24 max-md:max-w-full">
      <div class="self-center w-full max-w-[1208px] max-md:max-w-full">
        <div class="flex gap-5 max-md:flex-col">
          <div class="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src={props.imageSrc}
              alt={props.imageAlt}
              class="object-contain grow w-full aspect-[1.39] max-md:mt-10 max-md:max-w-full"
            />
          </div>
          <div class="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div class="flex flex-col grow text-2xl font-medium text-white max-md:mt-10 max-md:max-w-full">
              <div class="text-6xl font-bold max-md:mr-2.5 max-md:max-w-full max-md:text-4xl">
                {props.title.map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </div>
              <div class="mt-5 max-md:max-w-full">
                {props.description}
              </div>
              <PrimaryButton text={props.buttonText} />
            </div>
          </div>
        </div>
      </div>
      <div class="flex shrink-0 mt-72 h-0 bg-stone-900 max-md:mt-10 max-md:max-w-full" />
    </div>
  );
});