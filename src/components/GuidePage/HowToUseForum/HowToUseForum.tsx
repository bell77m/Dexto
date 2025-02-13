import { component$ } from "@builder.io/qwik";
import { MenuSection } from "./MenuSection";
import { ContentSection } from "./ContentSection";

export const HowToUseForum = component$(() => {
  return (
    <div class="overflow-hidden px-20 pb-96 bg-gray-900 max-md:px-5 max-md:pb-24">
      <div class="flex gap-5 max-md:flex-col">
        <div class="flex flex-col w-[32%] max-md:ml-0 max-md:w-full">
          <div class="flex relative flex-col mt-1.5 text-white max-md:mt-10">
            <div class="flex overflow-hidden z-0 flex-col px-3.5 pt-3 pb-5 w-full">
            <div class="flex w-full flex-col overflow-hidden px-3.5 pb-5 pt-3">
                <img src="/image/HowToUseForum.png" width="850" height="300" />
              </div>
              <div class="self-start mt-6 text-2xl px-4 tracking-tight leading-none">
                How to use forum
              </div>
            </div>
            <div class="mt-12 w-full text-2xl text-white px-8 max-md:pr-5 max-md:mt-10">
              Quickstart guides
            </div>
            <MenuSection />
          </div>
        </div>
        <ContentSection />
      </div>
    </div>
  );
});
