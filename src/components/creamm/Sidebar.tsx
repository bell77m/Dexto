import { component$ } from "@builder.io/qwik";
import { SidebarHeader } from "./SidebarHeader";
import { Navigation } from "./Navigation";
import { Settings } from "./Settings";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export const Sidebar = component$(() => {
  return (
    <aside class="flex flex-col mx-auto w-full font-medium text-white bg-gray-900 border border-solid border-zinc-600 max-md:mt-10">
      <SidebarHeader />
      <Navigation />
      <Settings />
      <Logo />
      <ThemeToggle />
    </aside>
  );
});
