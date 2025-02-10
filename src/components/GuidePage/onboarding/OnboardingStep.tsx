import { component$ } from "@builder.io/qwik";
import type { OnboardingStepProps } from "./types";
import { StepNumber } from "./StepNumber";

export const OnboardingStep = component$((props: OnboardingStepProps) => {
  return (
    <div class="flex overflow-hidden flex-col items-start px-4 pt-24 pb-64 mx-auto w-full bg-gray-900 max-md:pr-5 max-md:pb-24 max-md:max-w-full">
      <h1 class="text-5xl font-semibold tracking-tighter leading-none text-white max-md:text-4xl">
        Getting Started
      </h1>
      <div class="px-2 pt-20 pb-44 mt-20 max-w-full w-[800px] max-md:pr-5 max-md:pb-24 max-md:mt-10">
        <div class="flex gap-5 max-md:flex-col">
          <div class="flex flex-col w-[44%] max-md:ml-0 max-md:w-full">
            <div class="flex flex-col grow justify-center items-end px-8 py-1 mt-1.5 text-xl font-semibold tracking-tight leading-none text-gray-900 whitespace-nowrap border-2 border-red-600 border-solid max-md:mt-10">
              <StepNumber number="1" class="max-md:-mr-2.5" />
            </div>
          </div>
          <div class="flex flex-col ml-5 w-[56%] max-md:ml-0 max-md:w-full">
            <div class="flex text-xl font-semibold tracking-tight leading-none text-gray-900 whitespace-nowrap max-md:mt-10">
              <div class="flex shrink-0 border-2 border-red-600 border-solid h-[29px] w-[193px]"></div>
              <StepNumber number="2" />
            </div>
          </div>
        </div>
      </div>
      {props.steps.map((step, index) => (
        <div
          key={index}
          class="mt-16 text-2xl font-medium tracking-tight leading-none text-white max-md:mt-10"
        >
          Step {step.stepNumber}: {step.description}
        </div>
      ))}
      <div class="flex flex-wrap items-start mt-16 max-w-full w-[559px] max-md:mt-10">
        <div class="flex relative flex-col self-stretch pt-14 pb-32 aspect-[0.584] max-md:pb-24">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa1b6e5bec3e36412c2fef4ede5bc072ba2253573d889b0f7f88fc89d6f505f5?placeholderIfAbsent=true&apiKey=d4e73be049bd493481adccdb779ad4dd"
            alt="Project interface screenshot"
            class="object-cover absolute inset-0 size-full"
          />
          <div class="flex relative shrink-0 border-red-600 border-solid border-[3px] h-[51px]"></div>
          <div class="flex relative shrink-0 mt-14 border-red-600 border-solid border-[3px] h-[355px] max-md:mt-10"></div>
        </div>
        <div class="flex z-10 flex-col mt-20 max-md:mt-10">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b3957cbafd0d65f1392d1e520086747d1317a396eddc4d99fea9f4e7e3971e1d?placeholderIfAbsent=true&apiKey=d4e73be049bd493481adccdb779ad4dd"
            alt="Create project option"
            class="object-contain aspect-[1.3] w-[152px]"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/65437719f8eebc6ae8f7849d00607affc5f428e2e53fb861ea9c2ccccb445ff8?placeholderIfAbsent=true&apiKey=d4e73be049bd493481adccdb779ad4dd"
            alt="Import project option"
            class="object-contain mt-5 aspect-[1.15] w-[152px]"
          />
        </div>
        <StepNumber
          number="3"
          class="mt-48 text-xl font-semibold tracking-tight leading-none text-gray-900 whitespace-nowrap h-[34px] w-[34px] max-md:mt-10"
        />
      </div>
    </div>
  );
});
