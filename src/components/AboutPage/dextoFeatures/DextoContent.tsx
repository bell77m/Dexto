import { component$ } from "@builder.io/qwik";
import { DextoContentProps } from "./types";

export const DextoContent = component$((props: DextoContentProps) => {
  return (
    <div class="flex gap-5 max-md:flex-col bg-black">
      <div class="flex flex-col w-[36%] max-md:ml-0 max-md:w-full ">
        <img
          loading="lazy"
          src={props.imageSrc}
          alt={props.imageAlt}
          class="object-contain grow w-full aspect-[1.77] max-md:mt-10 max-md:max-w-full"
        />
      </div>
      <div class="flex flex-col ml-5 w-[64%] max-md:ml-0 max-md:w-full">
        <div class="flex flex-col text-white max-md:mt-10 max-md:max-w-full">
          <div class="mr-14 text-5xl font-bold max-md:mr-2.5 max-md:max-w-full max-md:text-4xl ">
            {props.title}
          </div>
          <div class="self-start text-3xl font-medium">
            {props.subtitle}
          </div>
          <div class="mt-8 text-xl font-light max-md:max-w-full">
            {props.description}
          </div>
        </div>
      </div>
    </div>
  );
});