import { component$, useStore, $, useOnWindow } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Toggle } from "../navigation/Toggle";
import { useNavigate } from "@builder.io/qwik-city";

export const ForumHeadernotlog = component$(() => {
  const state = useStore({ menuOpen: false });

    const nav = useNavigate();

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
        
          
            

           <div class="flex grow shrink gap-4 items-center self-stretch my-auto min-w-[240px] w-[303px]">
                <Link href="/login" class="px-8 py-2.5 text-black">
                    Login
                </Link>
                <div class="flex flex-col self-stretch my-auto w-28 text-base text-center text-black">
                <button onClick$={() => nav("/signup")} class="px-3 py-2.5 rounded-xl border border-black border-solid max-md:px-5">
                    Sign Up
                </button>
                </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
});
