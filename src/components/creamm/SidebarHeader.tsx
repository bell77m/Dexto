import { component$ } from "@builder.io/qwik";

export const SidebarHeader = component$(() => {
  return (
    <header class="flex gap-6 justify-start items-center px-6 py-4 text-xl font-bold bg-gray-800 min-h-[72px] max-md:px-5 max-md:py-4">
      <i class="ti ti-radioactive text-5xl text-orange-600"></i>
      <h1 class="my-auto text-white w-[170px]">Mickie Mouse</h1>
    </header>
  );
});
