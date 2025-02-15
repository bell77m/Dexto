import { component$ } from "@builder.io/qwik";

export const MessageSection = component$(() => {
  return (
    <section class="flex flex-col items-start mt-10 text-white">
      <h1 class="ml-9 text-3xl font-extrabold tracking-widest leading-none text-center max-md:ml-2.5">
        <span class="text-orange-600">DE</span>
        <span class="text-white">XTO</span>
      </h1>
      <h2 class="mt-11 text-2xl font-semibold tracking-tight leading-none text-white">
        Message from developer
      </h2>
      <article class="flex flex-col items-start self-stretch px-5 pt-5 pb-28 mt-5 text-base font-medium tracking-tight leading-5 text-white bg-gray-800 rounded-lg max-md:px-5 max-md:pt-5 max-md:pb-28 max-md:max-w-full">
        <span>Version 0.0.1, release 01/01/2025</span>
        <br />
        <p class="mt-3 text-zinc-600">
          Add many function for new users, Hope you guys enjoy.
        </p>
      </article>
    </section>
  );
});
