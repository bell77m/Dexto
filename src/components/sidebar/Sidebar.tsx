import { component$ } from "@builder.io/qwik";
import { SidebarItem } from "./SidebarItem";
import { SidebarSection } from "./SidebarSection";
import { ThemeToggle } from "./ThemeToggle";

export const Sidebar = component$(() => {
  const mainItems = [
    { icon: "/image/home.svg", label: "Home" },
    { icon: "/image/project.svg", label: "Project" },
    { icon: "/image/chat.svg", label: "Chat" },
    { icon: "/image/add-friend.svg", label: "Add friends"},
    { icon: "/image/forum.svg", label: "Forum" },
    { icon: "/image/git.svg",label: "Git" },
  ];

  const settingsItems = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6ad5a228929148b6c6e7c1331fed7655c32f1acd9ecd976b83bd1819019d6f0c?placeholderIfAbsent=true&apiKey=f2d1fedaa40e42dbb83a63d94e052278", label: "Notification" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c7dfe5d5649f23efe2451b99d2999a6433d0c89a0c826fb3c2de209d7b4f8c85?placeholderIfAbsent=true&apiKey=f2d1fedaa40e42dbb83a63d94e052278", label: "Settings" },
  ];

  return (
    <div class="flex flex-col font-medium bg-gray-900 border border-solid border-zinc-600 max-w-[286px] overflow-auto">
      <div class="flex gap-6 justify-between items-center px-6 py-4 text-xl font-bold bg-gray-800 min-h-[72px] text-zinc-500">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0510abcdc39434e57aaa04c65ac9590a8487a1aaefb8dde89a72f7a0f6081905?placeholderIfAbsent=true&apiKey=f2d1fedaa40e42dbb83a63d94e052278"
          class="object-contain shrink-0 self-stretch my-auto rounded-full aspect-square w-[42px]"
          alt="User avatar"
        />
        <div class="self-stretch my-auto w-[170px]">Mickie Mouse</div>
      </div>
        <SidebarSection>
          {mainItems.map((item) => (
            <SidebarItem key={item.label} icon={item.icon} label={item.label} />
          ))}
        </SidebarSection>
      <SidebarSection title="Settings">
        {settingsItems.map((item) => (
          <SidebarItem key={item.label} icon={item.icon} label={item.label} />
        ))}
      </SidebarSection>
      <div class="self-center mt-44 ml-4 text-3xl font-extrabold tracking-widest leading-none text-center text-black">
          <img alt="My DEXTO Icon" src="/image/DextoLogo.svg" width="167" height="32" />
      </div>
      <ThemeToggle />
    </div>
  );
});