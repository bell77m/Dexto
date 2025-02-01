import { component$ } from "@builder.io/qwik";
import { FeatureCard } from "./FeatureCard";
import type { CollaborationProps } from "./types";

export const Collaboration = component$(() => {
  const features: CollaborationProps["features"] = [
    {
      title: "Voice chat with your team",
      paddingTop: "2rem",
      paddingBottom: "8rem"
    },
    {
      title: "Code together",
      paddingTop: "2rem", 
      paddingBottom: "10rem"
    },
    {
      title: "Make new team from our platform",
      paddingTop: "1.25rem",
      paddingBottom: "9rem"
    },
    {
      title: "Multiple language support",
      paddingTop: "1.25rem",
      paddingBottom: "9rem"
    }
  ];

  return (
    <div class="overflow-hidden px-16 py-14 w-full bg-gray-900 max-md:px-5 max-md:max-w-full">
      <div class="flex gap-5 max-md:flex-col">
        <div class="flex flex-col w-[37%] max-md:ml-0 max-md:w-full">
          <div class="flex flex-col items-start self-stretch my-auto text-2xl text-white max-md:mt-10">
            <div class="font-light">collaboration</div>
            <div class="self-stretch text-6xl font-bold max-md:text-4xl">
              Function of DEXTO
            </div>
            <button 
              class="px-16 py-5 mt-12 font-medium text-center bg-orange-600 rounded-3xl border-orange-600 border-solid border-[3px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:mt-10"
              tabIndex={0}
            >
              More detail
            </button>
          </div>
        </div>
        <div class="flex flex-col ml-5 w-[63%] max-md:ml-0 max-md:w-full">
          <div class="flex flex-col w-full max-md:mt-10 max-md:max-w-full">
            <div class="max-md:max-w-full">
              <div class="flex gap-5 max-md:flex-col">
                {features.slice(0,2).map((feature, index) => (
                  <FeatureCard key={index} {...feature} />
                ))}
              </div>
            </div>
            <div class="mt-8 max-md:max-w-full">
              <div class="flex gap-5 max-md:flex-col">
                {features.slice(2,4).map((feature, index) => (
                  <FeatureCard key={index} {...feature} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});