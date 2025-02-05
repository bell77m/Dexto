import { component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { NavItem } from "./NavItem";
import { Toggle } from "./Toggle";

export const Navigation = component$(() => {
  const nav = useNavigate(); // ใช้สำหรับเปลี่ยน route

  const navItems = [
    { label: "Home", padding: "px-8 py-3", href: "/" },
    { label: "About", padding: "px-8 py-2.5", href: "/about" },
    { label: "Guides", padding: "px-7 py-2.5", href: "/guides" },
    { label: "Forum", padding: "px-8 py-3", href: "/forum" },
  ];

  return (
    <div class="flex overflow-hidden flex-col justify-center px-10 py-6 w-full bg-gray-900 max-md:px-5 max-md:max-w-full">
      <div class="flex flex-wrap gap-10 items-center w-full max-md:max-w-full">
        <div class="grow shrink self-stretch px-10 py-1.5 my-auto text-3xl font-extrabold tracking-widest leading-none text-center text-black w-[134px] max-md:pl-5">
          <Link href="/" class="flex shrink-0 items-center cursor-pointer">
            <img alt="My DEXTO Icon" src="/image/DextoLogo.svg" width="167" height="32" />
          </Link>
        </div>

        <div class="flex flex-wrap grow shrink gap-5 justify-center items-start self-stretch my-auto text-base text-center text-white whitespace-nowrap min-w-[240px] w-[511px] max-md:max-w-full">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} class={`nav-item ${item.padding}`}>
                  {item.label}
                </Link>
             ))}
        </div>

        <div class="flex grow shrink gap-4 items-center self-stretch my-auto min-w-[240px] w-[303px]">
          <Toggle isActive={false} />
            <Link href="/login" class="px-8 py-2.5 text-white">
              Login
            </Link>
          <div class="flex flex-col self-stretch my-auto w-28 text-base text-center text-white">
            <button onClick$={() => nav("/signup")} class="px-3 py-2.5 rounded-xl border border-white border-solid max-md:px-5">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});