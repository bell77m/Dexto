import { component$ } from "@builder.io/qwik";

export const Logo = component$(() => {
  return (
    <h1 class="self-center mt-44 ml-4 text-3xl font-extrabold tracking-widest leading-none text-center max-md:mt-10">
      <span class="text-orange-600">DEX</span>
      <span class="text-white">TO</span>
    </h1>
  );
});
