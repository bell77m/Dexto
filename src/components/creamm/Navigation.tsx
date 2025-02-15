import { component$ } from "@builder.io/qwik";
import { NavigationItem } from "./NavigationItem";

export const Navigation = component$(() => {
  return (
    <nav class="flex z-10 flex-col p-6 w-full text-sm tracking-tight leading-none min-h-[314px] max-md:px-5 max-md:py-6">
      <NavigationItem icon="home" label="Home" isActive={true} />
      <NavigationItem icon="folder" label="Project" />
      <NavigationItem icon="messages" label="Chat" />
      <NavigationItem icon="users" label="Add friends" />
      <NavigationItem icon="messages-off" label="Forum" />
      <NavigationItem icon="brand-github" label="Git" />
    </nav>
  );
});
