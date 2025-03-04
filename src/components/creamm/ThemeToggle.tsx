import { component$ } from "@builder.io/qwik";
import type { ThemeOption } from "./types";

export const ThemeToggle = component$(() => {
  const options: ThemeOption[] = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c608de3c557f048b20ba30eb25bda88b27eccc5bbe739443db5cd51cda70f94?placeholderIfAbsent=true",
      label: "Light",
      isActive: false,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1ff3057bc21c93c1c0cbe551a7c16979916a48a199835b7c0b50ba3928dd30d3?placeholderIfAbsent=true",
      label: "Dark",
      isActive: true,
    },
  ];

  return (
    <div class="flex gap-1 items-start p-1 w-full bg-gray-900 rounded-lg max-w-[233px]">
      <div class="flex gap-1 w-56 rounded-md">
        {options.map((option) => (
          <button
            key={option.label}
            class={`flex flex-1 gap-2 justify-center items-center px-3 py-2 rounded-md ${
              option.isActive
                ? "bg-gray-800 border border-solid border-zinc-600 text-stone-300"
                : "text-neutral-400"
            }`}
          >
            <img
              src={option.icon}
              alt=""
              class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
            />
            <span class="self-stretch my-auto">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
});
