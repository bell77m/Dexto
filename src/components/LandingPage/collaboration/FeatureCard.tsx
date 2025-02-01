import { component$ } from "@builder.io/qwik";
import type { FeatureCardProps } from "./types";

export const FeatureCard = component$((props: FeatureCardProps) => {
  return (
    <div class="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
      <div 
        class="grow px-5 w-full text-2xl font-medium text-white rounded-xl bg-gray-800 bg-opacity-80 max-md:pb-24 max-md:mt-5"
        style={{
          paddingTop: props.paddingTop,
          paddingBottom: props.paddingBottom
        }}
      >
        {props.title}
      </div>
    </div>
  );
});