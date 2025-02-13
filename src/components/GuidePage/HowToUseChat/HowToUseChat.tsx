import { component$ } from "@builder.io/qwik";
import { QuickstartGuide } from "./QuickstartGuide";

export interface HowToUseChatProps {
  quickstartGuides: string[];
  images: string[];
}

export const HowToUseChat = component$((props: HowToUseChatProps) => {
  return (
    <div class="w-full overflow-hidden bg-gray-900 pb-[500px] pl-20 pr-9 max-md:max-w-full max-md:px-5 max-md:pb-24">
      <div class="flex gap-5 max-md:flex-col">
        <div class="flex gap-5 max-md:flex-col">
          <div class="flex flex-col text-white max-md:mt-10">
              <div class="flex flex-col max-md:mr-2.5">
                <div class="flex w-full flex-col overflow-hidden px-3.5 pb-5 pt-3"> 
                  <img src="/image/howToUseChat.png" width="453" height="265" />
                </div>
              <div class="mt-6 px-6 text-2xl tracking-tight leading-none">
                How to use chat
              </div>
              <div class="mt-16 px-6 text-2xl text-white max-md:mt-10">
                Quickstart guides
              </div>
              <QuickstartGuide guides={props.quickstartGuides} />
            </div>
          </div>
          <div class="ml-5 flex w-[68%] flex-col max-md:ml-0 max-md:w-full">
            <div class="mt-28 flex w-full flex-col items-start max-md:mt-10 max-md:max-w-full">
              <h1 class="text-5xl font-semibold leading-none tracking-tighter text-white max-md:text-4xl">
                Getting Started
              </h1>
              <div class="relative mt-1 w-[800px] h-[400px] max-w-full px-2 pb-44 pt-20 max-md:mt-10 max-md:pb-24 max-md:pr-5">
                <img src="/image/howToUseChatI.png" width="853" height="665" />
                <p class="mt-4 text-xl text-white text-center max-md:text-lg">
                  <strong>Step 1:</strong> You can see a list of your friends in Dexto. Click the icon to start chatting.
                </p>
                <img src="/image/howToUseChatII.png" width="853" height="665" />
                <p class="mt-1 text-xl text-white text-center max-md:text-lg">
                  <strong>Step 2:</strong> This section displays your chat history. You can type a message at the bottom to chat with your friend.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
