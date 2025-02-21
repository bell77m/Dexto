import { component$ } from "@builder.io/qwik";

export const MessageSection = component$((props: { class?: string }) => {
  return (
    <section class={`flex flex-col flex-grow items-start text-white bg-gray-900 ${props.class ?? ''}`}>
      <div class=" mt-10 ml-8 text-3xl font-extrabold tracking-widest leading-none text-center text-black">
        <img alt="My DEXTO Icon" src="/image/DextoLogo.svg" width="155" height="20" />
      </div>

      <h2 class="mt-6 ml-8 text-2xl font-semibold tracking-tight leading-none text-neutral-400">
        Message from developer
      </h2>

      <article class="flex flex-col items-start self-stretch 
        px-6 pt-6 pb-20 mt-5 w-[1400px] h-[250px] ml-8
        text-base font-medium tracking-tight leading-5 text-white 
        bg-gray-800 rounded-lg">
        <span>Version 0.0.1, release 01/01/2025</span>
        <br />
        <p class="text-zinc-600">
          - Add many function for new users, Hope you guys enjoy.
        </p>
      </article>
    </section>
  );
});
