import { component$ } from "@builder.io/qwik";

interface SearchBarProps {
  placeholder?: string;
}

export const SearchBar = component$((props: SearchBarProps) => {
  return (
    <form class="flex flex-col justify-center items-start px-4 py-2 w-full text-base text-center whitespace-nowrap bg-gray-100 rounded-xl min-h-[32px] text-zinc-500 max-md:max-w-full">
      <div class="flex justify-between items-center w-[530px]">
        <div class="flex gap-4 justify-between items-center self-stretch my-auto w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4845346f380a756c24e9423a6761e275126ff31841f2114d9117540cdb1ddfe?placeholderIfAbsent=true&apiKey=d4e73be049bd493481adccdb779ad4dd"
            alt=""
            class="object-contain shrink-0 self-stretch my-auto w-150 aspect-square"
          />
          <label for="searchInput" class="sr-only">
            Search
          </label>
          <input
            type="search"
            id="searchInput"
            placeholder={props.placeholder || "Search"}
            class="self-stretch my-auto w-full bg-transparent border-none focus:outline-none"
          />
        </div>
      </div>
    </form>
  );
});
