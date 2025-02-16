import { component$ } from "@builder.io/qwik";
import { SidebarItem } from "./SidebarItem";
import { SidebarSection } from "./SidebarSection";
import { ThemeToggle } from "./ThemeToggle";

export const Sidebar = component$(() => {
  const mainItems = [
    { icon: "/image/home.svg", label: "Home" },
    { icon: "/image/project.svg", label: "Project" },
    { icon: "/image/chat.svg", label: "Chat" },
    { icon: "/image/add-friend.svg", label: "Add friends" },
    { icon: "/image/forum.svg", label: "Forum" },
    { icon: "/image/git.svg", label: "Git" },
  ];

  const settingsItems = [
    { icon: "/image/notification.svg", label: "Notification" },
    { icon: "/image/settings.svg", label: "Settings" },
  ];

  return (
    <div class="flex flex-col font-medium bg-gray-900 border border-solid border-zinc-600 left-0 top-0 h-screen w-[286px] overflow-auto">
      {/* Header */}
      <div class="flex gap-6 justify-between items-center px-6 py-4 text-xl font-bold bg-gray-800 min-h-[72px] text-zinc-500">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0510abcdc39434e57aaa04c65ac9590a8487a1aaefb8dde89a72f7a0f6081905"
          class="object-contain shrink-0 self-stretch my-auto rounded-full aspect-square w-[42px]"
          alt="User avatar"
        />
        <div class="self-stretch my-auto w-[170px]">Mickie Mouse</div>
      </div>

      {/* Main Menu */}
      <SidebarSection>
        {mainItems.map((item) => (
          <SidebarItem key={item.label} icon={item.icon} label={item.label} />
        ))}
      </SidebarSection>

      {/* Settings Section */}
      <SidebarSection title="Settings">
        {settingsItems.map((item) => (
          <SidebarItem key={item.label} icon={item.icon} label={item.label} />
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
