import { component$ } from "@builder.io/qwik";
import { Card } from "./Card";

const cardData = [
  {
    title: "create\n                  your Project",
    subtitle: "How to create your Project",
    description: "Learn more about Dexto and set up your project",
    buttonText: "See more",
  },
  {
    title: "How to use IDE",
    subtitle: "How to use IDE",
    description: "Learn more about Dexto and use your IDE",
    buttonText: "See more",
  },
  {
    title: "How to use chat",
    subtitle: "How to use chat",
    description: "Learn more about Dexto and chat with your team",
    buttonText: "See more",
  },
  {
    title: "How to ADD FRIEND",
    subtitle: "How to add friend",
    description: "Learn more about Dexto and how to add your friend",
    buttonText: "See more",
  },
  {
    title: "How to USE Forum",
    subtitle: "How to use forum",
    description: "Learn more about Dexto and how to use forum",
    buttonText: "See more",
  },
  {
    title: "ABOUT NOTIFICATION",
    subtitle: "Notification",
    description:
      "Learn more about Dexto and know about\n                Notification",
    buttonText: "See more",
  },
];

export const QuickStartGuides = component$(() => {
  return (
    
    <div class="flex overflow-hidden flex-col px-12 pt-16 pb-28 w-full text-white bg-gray-900 max-md:px-5 max-md:pb-24 max-md:max-w-full">
      <div class="self-start ml-28 text-2xl font-semibold max-md:ml-2.5">
        Quickstart guides
      </div>
      <div class="flex flex-col mt-7 mb-0 w-full max-md:mb-2.5 max-md:max-w-full">
        <div class="flex flex-wrap gap-8 items-center w-full max-md:max-w-full">
          {cardData.slice(0, 3).map((data, index) => (
            <Card key={index} {...data} />
          ))}
        </div>
        <div class="flex flex-wrap gap-8 items-center mt-11 w-full max-md:mt-10 max-md:max-w-full">
          {cardData.slice(3).map((data, index) => (
            <Card key={index} {...data} />
          ))}
        </div>
      </div>
    </div>
  );
});
