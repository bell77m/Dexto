import { component$ } from "@builder.io/qwik";
import { QuickstartGuide } from "./QuickstartGuide";
import { StepInstruction } from "./StepInstruction";
import { NumberedCircle } from "./NumberedCircle";

export interface HowToAddFriendProps {
  // Add any props if needed
}

export const HowToAddFriend = component$((props: HowToAddFriendProps) => {
  const quickstartItems = [
    "How to use IDE",
    "How to use chat",
    "How to add friend",
    "How to use forum",
    "Notification",
  ];

  const steps = [
    "Click at the icon to find new friend.",
    "list of your friend that you have.",
    "You can use this bar to search new friend.",
    "You can add friend by click that icon .",
  ];

  return (
    <div class="overflow-hidden px-16 pt-3 pb-80 bg-gray-900 max-md:px-5 max-md:pb-24">
      <div class="flex gap-5 max-md:flex-col">
        <div class="flex flex-col w-[32%] max-md:ml-0 max-md:w-full">
          <div class="flex flex-col items-start text-2xl text-white max-md:mt-10">
          <div class="overflow-hidden px-6 pt-4 pb-20 text-5xl tracking-tighter rounded-xl leading-[55px] max-md:px-5 max-md:pb-28 max-md:text-4xl max-md:leading-[51px]">
              <img src="/image/howToAddFriend.png" width="492" height="291" />
            </div>
            <div class="mt-6 px-12 tracking-tight leading-none">
              How to add friend
            </div>
            <div class="mt-16 px-12 text-white text-opacity-100 max-md:mt-10">
              Quickstart guides
            </div>
            <QuickstartGuide items={quickstartItems} />
          </div>
        </div>
        <div class="flex flex-col ml-5 w-[68%] max-md:ml-0 max-md:w-full">
          <div class="flex flex-col grow items-start mt-24 text-2xl font-medium tracking-tight leading-none text-white max-md:mt-10 max-md:max-w-full">
            <div class="text-5xl font-semibold tracking-tighter leading-none max-md:text-4xl">
              Getting Started
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/171263ab45d4c011cc9a3a19814e84e9e3cab875b52d02959e321464c9f71550?placeholderIfAbsent=true&apiKey=d4e73be049bd493481adccdb779ad4dd"
              class="object-contain self-stretch mt-24 w-full aspect-[1.39] max-md:mt-10 max-md:max-w-full"
              alt="Getting started illustration"
            />
            <StepInstruction step={1} instruction="Click at the icon to find new friend." />
            <StepInstruction step={2} instruction="list of your friend that you have." />
            <div class="flex relative flex-col items-end self-stretch py-20 pr-3 pl-20 mt-16 w-full text-3xl font-semibold tracking-tighter leading-none text-black whitespace-nowrap min-h-[329px] max-md:pl-5 max-md:mt-10 max-md:max-w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fbc34e9f8e1e193a8a9e3ea79ca69c0c05105cf8237744805dbed0feddb01b8e?placeholderIfAbsent=true&apiKey=d4e73be049bd493481adccdb779ad4dd"
                class="object-cover absolute inset-0 size-full"
                alt="Friend list illustration"
              />
              <NumberedCircle number={3} class="mr-44 max-md:mr-2.5" />
              <NumberedCircle number={4} class="mt-20 max-md:mt-10" />
            </div>
            <div class="mt-20 font-bold max-md:mt-10">From (number 1)</div>
            <StepInstruction step={3} instruction="You can use this bar to search new friend." />
            <StepInstruction step={4} instruction="You can add friend by click that icon ." />
            <div class="self-center mt-1 ml-32 text-xl font-semibold tracking-tight leading-none text-gray-900">
              3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
