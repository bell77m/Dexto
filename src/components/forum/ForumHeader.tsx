import { component$, useStore, $, useOnWindow } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const ForumHeader = component$(() => {
  const state = useStore({ menuOpen: false });

  const toggleMenu = $(() => {
    state.menuOpen = !state.menuOpen;
  });

  useOnWindow(
    "click",
    $((event) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".menu-container")) {
        state.menuOpen = false;
      }
    })
  );

  return (
    <header class="flex overflow-visible flex-col justify-center px-11 py-4 w-full bg-stone-50 max-md:px-5 max-md:max-w-full">
      <nav class="flex flex-wrap gap-10 items-center max-md:max-w-full">
        <Link href="/" class="flex shrink-0 items-center cursor-pointer">
          <img
            alt="My DEXTO Icon"
            src="/image/DextoLogoDark.svg"
            width="167"
            height="32"
            class="w-[167px] h-[32px]" // Ensures consistency
          />
        </Link>

        {/* Search Bar */}
        <div class="flex flex-col grow shrink justify-center items-start self-stretch px-4 py-2 my-auto text-base text-center text-black whitespace-nowrap rounded-xl bg-slate-100 min-h-8 min-w-60 w-[582px] max-md:max-w-full">
          <div class="flex justify-between items-center w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4845346f380a756c24e9423a6761e275126ff31841f2114d9117540cdb1ddfe"
              alt="Search icon"
              width="20"
              height="20"
              class="w-5 h-5 mr-3"
            />
            <input
              type="text"
              placeholder="Search..."
              class="w-full bg-transparent border-none focus:outline-none"
            />
          </div>
        </div>

        <div class="grow shrink self-stretch my-auto w-48">
        <div class="flex gap-8 items-center justify-between w-full">
          {/* Profile Section */}
          <div class="flex gap-4 text-base font-medium text-black rounded-full items-center">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/39a8f244998f57adda168bb506962cdc51a4265a2566ebd51be7be71503ad577"
              alt="User avatar"
              width="32"
              height="32"
              class="w-8 h-8 rounded-full"
            />
            <span>Jane Doe</span>
          </div>

          {/* Dropdown Menu */}
          <div class="relative menu-container">
            <button onClick$={toggleMenu} class="focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            {state.menuOpen && (
              <div
                class="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50"
                onClick$={(e) => e.stopPropagation()}
              >
                <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                  Settings
                </a>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      </nav>
    </header>
  );
});
