import { component$ } from "@builder.io/qwik";
import { Sidebar } from "./Sidebar";
import { MessagesPanel } from "./MessagesPanel";

export const ChatDark = component$(() => {
  return (
    <div class="overflow-hidden bg-gray-900">
      <div class="flex gap-5 max-md:flex-col">
        <div class="w-1/5 max-md:ml-0 max-md:w-full">
          <Sidebar />
        </div>

        <div class="ml-5 w-[36%] max-md:ml-0 max-md:w-full">
          <MessagesPanel />
        </div>

        <div class="ml-5 w-[44%] max-md:ml-0 max-md:w-full">
          <main class="flex flex-col grow justify-center items-center px-20 py-96 w-full bg-gray-900 max-md:px-5 max-md:py-24 max-md:max-w-full">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/337ff4613b397bdcabaa9c8363796e7ea660ff3b8b46914fa22fda6fdd63f391?placeholderIfAbsent=true"
              alt="Chat illustration"
              class="object-contain max-w-full aspect-square w-[292px]"
            />
          </main>
        </div>
      </div>
    </div>
  );
});

export default ChatDark;
