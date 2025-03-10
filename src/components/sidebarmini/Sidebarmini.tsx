import { component$ } from '@builder.io/qwik';
import { SidebarItem } from "./SidebarItem";
import { SidebarSection } from "./SidebarSection";

export const Sidebarmini = component$(() => {
  const mainItems = [
    { icon: "/image/home.svg", label: "Home", href: "/home" },
    { icon: "/image/project.svg", label: "Project", href: "/project" },
    { icon: "/image/chat.svg", label: "Chat", href: "/chat" },
    { icon: "/image/add-friend.svg", label: "Add friends", href: "/add-friend" },
    { icon: "/image/forum.svg", label: "Forum", href: "/forum" },
  ];

  const settingsItems = [
    { icon: "/image/notification.svg", label: "Notification", href: "/notification" },
    { icon: "/image/settings.svg", label: "Settings", href: "/settings" },
  ];

  return (
    <div class="flex flex-col font-medium bg-gray-900 border border-solid border-zinc-600 left-0 top-0 h-screen w-[100px] overflow-auto">
      {/* Header */}
      <div class="flex gap-6 justify-center items-center px-6 py-4 text-xl font-bold bg-gray-800 min-h-[75px] text-zinc-500">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0510abcdc39434e57aaa04c65ac9590a8487a1aaefb8dde89a72f7a0f6081905"
          class="object-contain shrink-0 self-stretch my-auto rounded-full aspect-square w-[42px]"
          alt="User Avatar"
          aria-label="User Avatar"
        />
      </div>
      
      {/* Main Menu */}
      <SidebarSection>
        {mainItems.map((item) => (
          <SidebarItem key={item.label} icon={item.icon} href={item.href} />
        ))}
      </SidebarSection>
      
      {/* Settings Section */}
      <SidebarSection>
        {settingsItems.map((item) => (
          <SidebarItem key={item.label} icon={item.icon} href={item.href} />
        ))}
      </SidebarSection>

      {/* Logo */}
      <div class="flex justify-center items-center mt-28 tracking-widest leading-none text-black opacity-25">
        <img alt="My DEXTO Icon" src="/image/DextoMiniLogo.svg" width="60" height="12" />
      </div>
    </div>
  );
});
