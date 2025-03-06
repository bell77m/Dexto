import { component$ } from "@builder.io/qwik";
import { SidebarItem } from "./SidebarItem";
import { SidebarSection } from "./SidebarSection";
import { ThemeToggle } from "./ThemeToggle";
import { useUserStore } from "~/store/store"; // นำเข้า useUserStore

export const Sidebar = component$(() => {
  const { userId, displayName, profilePictureUrl} = useUserStore(); // ใช้งาน user store

  const mainItems = [
    { icon: "/image/home.svg", label: "Home", href: "/home" },
    { icon: "/image/project.svg", label: "Project", href: "/project" },
    { icon: "/image/chat.svg", label: "Chat", href: "/chat" },
    { icon: "/image/add-friend.svg", label: "Add friends", href: "/addfriend" },
    { icon: "/image/forum.svg", label: "Forum", href: "/forum" },
    { icon: "/image/git.svg", label: "Git", href: "/git" },
  ];

  const settingsItems = [
    { icon: "/image/notification.svg", label: "Notification", href: "/notification" },
    { icon: "/image/settings.svg", label: "Settings", href: "/settings" },
  ];

  return (
    <div class="flex flex-col font-medium bg-gray-900 border border-solid border-zinc-600 left-0 top-0 h-screen w-[286px] overflow-auto">
      {/* Header */}
      <div class="flex gap-6 justify-between items-center px-6 py-4 text-xl font-bold bg-gray-800 min-h-[72px] text-zinc-500">
        <img
          loading="lazy"
          src={profilePictureUrl.value || "https://camo.githubusercontent.com/bfb2b63eeb7b21626c1a896e6e58a55838135977ce8b5d7ee13a60080b56a1e7/68747470733a2f2f6173736574732d76322e6c6f7474696566696c65732e636f6d2f612f30336364633665302d313138622d313165652d626630382d3037643838613934316362642f696969774730764a514e2e676966"} 
          class="object-contain shrink-0 self-stretch my-auto rounded-full aspect-square w-[42px]"
          alt="User avatar"
        />
        {/* ใช้ displayName จาก store */}
        <div class="self-stretch my-auto w-[170px]">
          <span>
            {displayName.value || "Loading"} 
            {/* {userId.value || "Unknown"} */}
          </span>
        </div>
      </div>

      {/* Main Menu */}
      <SidebarSection>
        {mainItems.map((item) => (
          <SidebarItem key={item.label} icon={item.icon} label={item.label} href={item.href} />
        ))}
      </SidebarSection>

      {/* Settings Section */}
      <SidebarSection title="Settings">
        {settingsItems.map((item) => (
          <SidebarItem key={item.label} icon={item.icon} label={item.label} href={item.href} />
        ))}
      </SidebarSection>

      {/* Logo & Theme Toggle */}
      <div class="self-center items-center mt-28 ml-4 text-3xl font-extrabold tracking-widest leading-none text-center text-black opacity-25">
        <img alt="My DEXTO Icon" src="/image/DextoLogo.svg" width="167" height="32" />
      </div>
      <ThemeToggle />
    </div>
  );
});
