import { component$ } from "@builder.io/qwik";

export const NotificationInfo = component$(() => {
  return (
    <div class="flex flex-wrap gap-10 mt-20 text-2xl font-medium tracking-tight leading-8 max-md:mt-10 max-md:mr-2.5">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/bcef20ea4afe331e735bc9299604629664fdea2098093303fae52165c2183081?placeholderIfAbsent=true&apiKey=d4e73be049bd493481adccdb779ad4dd"
        class="object-contain shrink-0 self-start mt-2 w-20 rounded-full aspect-square"
        alt="Notification icon"
      />
      <div class="flex-auto w-[641px] max-md:max-w-full">
        This tab will show notification when someone invite you to join new team
        and when someone send friend request.
      </div>
    </div>
  );
});
