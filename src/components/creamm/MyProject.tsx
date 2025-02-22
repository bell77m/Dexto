import { component$ } from "@builder.io/qwik";

export const MyProject = component$((props: { class?: string }) => {
  return (
    <section class={`flex flex-col flex-grow items-start text-white bg-gray-900 ${props.class || ""}`}>
      <h1 class="mt-12 ml-20 text-2xl font-semibold tracking-tight leading-none">
        My Project
      </h1>
      
      <h2 class="flex gap-10 mt-10 ml-20 text-xs font-semibold tracking-tight leading-none">
        <button class="px-20 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
          Create your Project
        </button>
        <button class="px-20 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
          Import your Project
        </button>
      </h2>

      <div class="relative flex flex-col items-start self-stretch 
        px-6 py-4 mt-8 w-full max-w-3xl ml-20 
        text-base font-light tracking-tight leading-5 text-white 
        bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300 group">
        
        <div class="flex gap-6 items-center">
          <img alt="Python Logo" src="https://cdn.freebiesupply.com/logos/large/2x/python-5-logo-png-transparent.png" width="50" height="50" />
          
          <div>
            <h3 class="text-xl font-medium">Project A</h3>
            <h4 class="flex gap-2 text-xs text-neutral-400">
              <p class="text-white">Python</p>
              <p>Just now</p>
            </h4>
          </div>
        </div>

        <div class="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
          <button class="bg-600 hover:bg-gray-600 text-white px-1 py-1 rounded-md">
          <img alt="Edit Icon" src="https://img.icons8.com/?size=100&id=8Y4tD58oU8lB&format=png&color=FFFFFF" width="25" height="25" />
          </button>
          <button class="bg-600 hover:bg-gray-600 text-white px-1 py-1 rounded-md">
          <img alt="Download Icon" src="https://img.icons8.com/?size=100&id=xfmO9wVKAyAR&format=png&color=FFFFFF"width="25" height="25" />
          </button>
          <button class="bg-600 hover:bg-gray-600 text-white px-1 py-1 rounded-md">
          <img alt="Delete Icon" src="https://img.icons8.com/?size=100&id=43949&format=png&color=FFFFFF" width="25" height="25" />
          </button>
        </div>

      </div>
    </section>
  );
});
