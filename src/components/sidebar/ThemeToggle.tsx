import { component$ } from "@builder.io/qwik";

export const ThemeToggle = component$(() => {
  return (
    <div class="flex flex-col items-start px-6 pt-6 mt-56 w-full text-xs tracking-tight leading-none whitespace-nowrap bg-gray-800 min-h-[88px]">
      <div class="flex gap-1 items-start p-1 w-full bg-gray-900 rounded-lg max-w-[233px]">
        <div class="flex gap-1 w-56 rounded-md">
          <div class="flex flex-1 gap-2 justify-center items-center px-3 py-2 rounded-md text-neutral-400">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad8992a11f8e63662186e529be10b0008c58c273a158213fec148874a041139c?placeholderIfAbsent=true&apiKey=f2d1fedaa40e42dbb83a63d94e052278"
              class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              alt=""
            />
            <div class="self-stretch my-auto">Light</div>
          </div>
          <div class="flex flex-1 gap-2 justify-center items-center px-3 py-2 bg-gray-800 rounded-md border border-solid border-zinc-600 text-stone-300">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6683e8a380dcdbf592d351fe44c56947459577a0eab4a1ccef103cca266fdba0?placeholderIfAbsent=true&apiKey=f2d1fedaa40e42dbb83a63d94e052278"
              class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              alt=""
            />
            <div class="self-stretch my-auto">Dark</div>
          </div>
        </div>
      </div>
    </div>
  );
});