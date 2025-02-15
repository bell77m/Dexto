import { component$ } from "@builder.io/qwik";

export const ThemeToggle = component$(() => {
  return (
    <footer class="flex flex-col px-6 pt-6 pb-0 mt-56 w-full text-xs tracking-tight leading-none whitespace-nowrap bg-gray-800 min-h-[88px] max-md:px-5 max-md:pt-6 max-md:pb-0 max-md:mt-10">
      <div class="flex gap-1 items-start p-1 w-full bg-gray-900 rounded-lg max-w-[233px]">
        <div class="flex gap-1 w-56 rounded-md">
          <button class="flex flex-1 gap-2 justify-center items-center px-3 py-2 text-white rounded-md">
            <i class="ti ti-sun text-base text-white"></i>
            <span>Light</span>
          </button>
          <button class="flex flex-1 gap-2 justify-center items-center px-3 py-2 text-white bg-gray-800 rounded-md border border-solid border-zinc-600">
            <i class="ti ti-moon text-base text-white"></i>
            <span>Dark</span>
          </button>
        </div>
      </div>
    </footer>
  );
});
