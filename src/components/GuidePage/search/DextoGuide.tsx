import { component$ } from "@builder.io/qwik";
import { SearchBar } from "./SearchBar";

export const DextoGuide = component$(() => {
  return (
    <div class="flex overflow-hidden flex-col justify-center items-center px-20 py-24 w-full bg-gray-900 max-md:px-5 max-md:max-w-full">
      <div class="flex flex-col max-w-full w-[576px]">
        <div class="flex flex-wrap gap-6 self-end text-6xl max-md:text-4xl">
          <div class="my-auto font-extrabold leading-none text-center text-black tracking-[3.2px] max-md:text-4xl">
              <img alt="My DEXTO Icon" src= "/image/DextoLogo.svg" width="280" height="145" class="relative top-2 -translate-x-10"/>
                <span class="ml-2 text-lg font-bold">
                </span>
          </div>
          <div class="font-extrabold text-white basis-auto max-md:text-4xl -translate-x-10">
            GUIDE
          </div>
        </div>
        <div class="mt-10">
          <SearchBar />
        </div>
      </div>
    </div>
  );
});
