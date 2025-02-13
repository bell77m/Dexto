import { component$ } from "@builder.io/qwik";
import { QuickstartGuide } from "./QuickstartGuide";
import { NotificationInfo } from "./NotificationInfo";

export const AboutNotification = component$(() => {
  const quickstartItems = [
    "How to use IDE",
    "How to use chat",
    "How to add friend",
    "How to use forum",
    "Notification",
  ];

  return (
    <div class="overflow-hidden px-16 w-full bg-gray-900 pb-[1150px] max-md:px-5 max-md:pb-24 max-md:max-w-full">
      <div class="flex gap-5 max-md:flex-col">
        <div class="flex flex-col w-[32%] max-md:ml-0 max-md:w-full">
          <div class="flex flex-col items-start text-2xl text-white max-md:mt-10">
          <div class="flex w-full flex-col overflow-hidden px-3.5 pb-5 pt-3">
            <img src="/image/notification.png" width="453" height="265" />
            </div>
            <div class="mt-4 px-10 tracking-tight leading-none">Notification</div>
            <div class="mt-16 px-10 text-white max-md:mt-10">
              Quickstart guides
            </div>
            <QuickstartGuide items={quickstartItems} />
          </div>
        </div>
        <div class="flex flex-col ml-5 w-[68%] max-md:ml-0 max-md:w-full">
          <div class="flex flex-col mt-28 w-full text-white max-md:mt-10 max-md:max-w-full">
            <div class="self-start text-5xl font-semibold tracking-tighter leading-none max-md:text-4xl">
              Getting Started
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/dce7d9258cf183e4399bd0c757a998070d90b6076a11329f970c566ae9dc5276?placeholderIfAbsent=true&apiKey=d4e73be049bd493481adccdb779ad4dd"
              class="object-contain mt-20 w-full aspect-[1.4] max-md:mt-10 max-md:max-w-full"
              alt="Getting Started illustration"
            />
            <NotificationInfo />
          </div>
        </div>
      </div>
    </div>
  );
});
