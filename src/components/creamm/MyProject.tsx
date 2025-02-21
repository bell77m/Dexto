import { component$ } from "@builder.io/qwik";

export const MyProject = component$((props: { class?: string }) => {
  return (
    <section class={`flex flex-col flex-grow items-start text-white bg-gray-900 ${props.class}`}>
      <h1 class="mt-12 ml-20 text-2xl font-semibold tracking-tight leading-none">
        My Project
      </h1>
      
      <h2 class="flex gap-10 mt-10 ml-20 text-2xs font-semibold tracking-tight leading-none">
        <button class="px-20 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
          Create your Project
        </button>
        <button class="px-20 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
          Import your Project
        </button>
      </h2>

      <article class="flex flex-col items-start self-stretch 
        px-6 pt-6 pb-20 mt-8 w-[1400px] h-[100px] ml-20
        text-base font-Light tracking-tight leading-5 text-white 
        bg-gray-800 rounded-lg">
        <div class="flex gap-6">
          <img alt="Python Logo" src="https://cdn.freebiesupply.com/logos/large/2x/python-5-logo-png-transparent.png" width="50" height="50" />
          <div>
            <h3 class="text-xl">Project A</h3>
            <h4 class="flex gap-2 text-2xs">
              <p>Python</p>
              <p class="text-neutral-400">Just now</p>
            </h4>
          </div>
        </div>
      </article>
    </section>
  );
});
