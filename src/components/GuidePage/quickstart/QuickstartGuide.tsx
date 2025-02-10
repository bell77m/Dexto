import { component$ } from "@builder.io/qwik";
import { QuickstartList } from "./QuickstartList";

export const QuickstartGuide = component$(() => {
  const quickstartItems = [
    { title: "How to use IDE" },
    { title: "How to use chat" },
    { title: "How to add friend" },
    { title: "How to use forum" },
    { title: "Notification" },
  ];

  return (
    <div class="flex overflow-hidden flex-col grow px-20 w-full text-white bg-gray-900 pb-[926px] max-md:px-5 max-md:pb-24 max-md:max-w-full">
      <div class="flex flex-col max-md:mr-2.5">
        <div class="flex overflow-hidden flex-col px-3.5 pt-3 pb-5 w-full">
          <div class="overflow-hidden px-6 pt-6 pb-16 text-5xl tracking-tighter leading-10 rounded-xl w-[336px] max-md:px-5 max-md:text-4xl max-md:leading-9">
            create
            <br />
            your Project
          </div>
          <div class="self-start mt-6 text-2xl tracking-tight leading-none">
            How to create your Project
          </div>
        </div>
      </div>
      <div class="flex flex-col self-start mt-12 max-w-full w-[381px] max-md:mt-10">
        <div class="flex flex-col w-full">
          <div class="self-start text-2xl">Quickstart guides</div>
          <QuickstartList items={quickstartItems} />
        </div>
      </div>
    </div>
  );
});
