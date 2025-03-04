import { component$ } from "@builder.io/qwik";
import { MessageCard } from "./MessageCard";

export const MessagesPanel = component$(() => {
  return (
    <section class="flex overflow-hidden flex-col grow items-center w-full font-semibold bg-gray-800 min-h-[1024px] shadow-[1px_0px_0px_rgba(0,0,0,0.08)] max-md:max-w-full">
      <header class="max-w-full text-xl whitespace-nowrap text-zinc-500 w-[349px]">
        <div class="flex justify-between items-center p-6 w-full max-w-[349px] max-md:px-5">
          <h2 class="flex gap-2.5 items-center self-stretch my-auto">Chat</h2>
        </div>
        <div class="flex w-full bg-black min-h-px"></div>
      </header>

      <div class="mt-4 max-w-full w-[484px]">
        <div class="relative">
          <input
            type="search"
            placeholder="Search messages"
            class="flex overflow-hidden gap-2.5 items-center px-5 py-3.5 w-full text-sm text-black rounded-xl bg-zinc-100 min-h-12 max-md:mr-2.5 placeholder:opacity-40"
          />
        </div>

        <MessageCard
          avatar="https://cdn.builder.io/api/v1/image/assets/TEMP/8f168065141a5b23ed18120973b858138aa201ac4a757580d64f806519ff8ab4?placeholderIfAbsent=true"
          username="Minnie1234"
          time="24m"
          message="woohoooo"
          labels={["New Message"]}
        />

        <MessageCard
          avatar="https://cdn.builder.io/api/v1/image/assets/TEMP/8a14c3f9b38e1a8feb12cfc3903e913bed16237ae900fe7fc118d46ca6577cae?placeholderIfAbsent=true"
          username="Daisy Duck"
          time="1week"
          message="Why you not answer me?"
          labels={["New Message"]}
        />
      </div>
    </section>
  );
});
