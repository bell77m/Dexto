import { component$ } from "@builder.io/qwik";
import { NavigationItem } from "./NavigationItem";

export const Settings = component$(() => {
  return (
    <section class="flex flex-col px-6 pt-6 pb-4 w-full text-sm tracking-tight leading-none whitespace-nowrap min-h-[147px] max-md:px-5 max-md:pt-6 max-md:pb-4">
      <h2 class="gap-2 px-3 py-0 w-full text-xs tracking-wide leading-tight uppercase text-zinc-600">
        SETTINGS
      </h2>
      <NavigationItem icon="bell" label="Notification" />
      <NavigationItem icon="settings" label="Settings" />
    </section>
  );
});
