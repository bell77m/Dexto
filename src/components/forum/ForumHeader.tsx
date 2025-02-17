import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const ForumHeader = component$(() => {
  return (
    <header class="flex overflow-hidden flex-col justify-center px-11 py-4 w-full bg-stone-50 max-md:px-5 max-md:max-w-full">
      <nav class="flex flex-wrap gap-10 items-center max-md:max-w-full">
        <Link href="/" class="flex shrink-0 items-center cursor-pointer">
          <img alt="My DEXTO Icon" src="/image/DextoLogoDark.svg" width="167" height="32" /> 
        </Link>

        <div class="flex flex-col grow shrink justify-center items-start self-stretch px-4 py-2 my-auto text-base text-center text-black whitespace-nowrap rounded-xl bg-slate-100 min-h-8 min-w-60 w-[582px] max-md:max-w-full">
          <div class="flex justify-between items-center w-[92px]">
            <div class="flex gap-4 justify-between items-center self-stretch my-auto w-[92px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4845346f380a756c24e9423a6761e275126ff31841f2114d9117540cdb1ddfe?placeholderIfAbsent=true&apiKey=eb3002760c2a4e17b211fd544868da2b"
                class="object-contain shrink-0 self-stretch my-auto w-3 aspect-square"
                alt="Search icon"
              />
              <span class="self-stretch my-auto w-16">Search</span>
            </div>
          </div>
        </div>

        <div class="grow shrink self-stretch my-auto w-48">
          <div class="flex gap-8 items-center w-full">
            <div class="flex overflow-hidden flex-col justify-center items-end self-stretch px-4 py-1 my-auto w-20 bg-orange-600 rounded-[100px]">
              <div class="flex shrink-0 bg-white rounded-full h-[26px] w-[26px]"></div>
            </div>
            <div class="flex gap-8 self-stretch my-auto w-36 text-base font-medium text-black rounded-[170px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/39a8f244998f57adda168bb506962cdc51a4265a2566ebd51be7be71503ad577?placeholderIfAbsent=true&apiKey=eb3002760c2a4e17b211fd544868da2b"
                class="object-contain shrink-0 w-8 aspect-square rounded-[170px]"
                alt="User avatar"
              />
              <span class="self-start">Jane Doe</span>
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/58cc2ce32467543551bc1dd0ba60399b01a2aed2b8ce343fe03712da5d15ecd4?placeholderIfAbsent=true&apiKey=eb3002760c2a4e17b211fd544868da2b"
              class="object-contain shrink-0 self-stretch my-auto aspect-[1.02] w-[51px]"
              alt="Menu icon"
            />
          </div>
        </div>
      </nav>
    </header>
  );
});
