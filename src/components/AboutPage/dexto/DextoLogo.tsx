import { component$ } from "@builder.io/qwik";

export const DextoLogo = component$(() => {
  return (
    <div class="self-stretch px-14 py-3.5 my-auto text-8xl font-extrabold leading-none text-center text-black min-w-[240px] tracking-[4.9px] w-[552px] max-md:px-4 max-md:max-w-full max-md:text-4xl bg-green-300">
      <img alt="My DEXTO Icon" src= "/image/DextoLogo.svg" width="367" height="232" class="translate-y-12 translate-x-10"/>
              <span class="ml-2 text-lg font-bold">
              </span>
    </div>
  );
});