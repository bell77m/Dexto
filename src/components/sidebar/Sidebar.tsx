import { component$, $ } from "@builder.io/qwik";
import { SidebarItem } from "./SidebarItem";
import { SidebarSection } from "./SidebarSection";
import { ThemeToggle } from "./ThemeToggle";
import { useUserStore } from "~/store/store"; // ✅ นำเข้า useUserStore
import { useNavigate } from "@builder.io/qwik-city"; // ✅ ใช้สำหรับ Redirect

export const Sidebar = component$(() => {
  const { displayName, profilePictureUrl, logoutUser } = useUserStore(); // ✅ ใช้ logoutUser จาก store
  const navigate = useNavigate(); // ✅ ใช้สำหรับเปลี่ยนหน้า

  const handleLogout = $(async () => {
    console.log(`🔴 Logging out: ${displayName.value}`); // ✅ แสดงข้อความ Logout
    await logoutUser();
    navigate("/login"); // ✅ Redirect ไปหน้า Login
  });

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
          src={profilePictureUrl.value || "/image/defaultProfile.svg"}
          class="object-contain shrink-0 self-stretch my-auto rounded-full aspect-square w-[42px]"
          alt="User avatar"
        />
        {/* ใช้ displayName จาก store */}
        <div class="self-stretch my-auto w-[170px]">
          <span>{displayName.value || "Loading"}</span>
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
      <div class="self-center items-center mt-4 ml-4 text-3xl font-extrabold tracking-widest leading-none text-center text-black opacity-25">
        <img alt="My DEXTO Icon" src="/image/DextoLogo.svg" width="167" height="32" />
      </div>

      <ThemeToggle /> {/* ✅ ปุ่ม Theme Toggle อยู่ใต้ Logout */}

      {/* ปุ่ม Logout */}
      <div class="mt-auto p-4">
        <button
          class="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-800"
          onClick$={handleLogout} // ✅ เรียกฟังก์ชัน Logout
        >
          Logout
        </button>
      </div>
      
    </div>
  );
});
