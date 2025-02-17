import { component$ } from "@builder.io/qwik";

export const ForumFooter = component$(() => {
  return (
    <footer class="flex overflow-hidden flex-col justify-center items-center px-16 py-5 w-full text-xl font-semibold text-black bg-stone-50 max-md:px-5 max-md:max-w-full">
      <nav class="flex flex-wrap gap-10 justify-between items-center py-3 max-w-full min-h-[50px] w-[696px]">
        <a href="/about" class="self-stretch my-auto">
          About
        </a>
        <a href="/guides" class="self-stretch my-auto">
          Guides
        </a>
        <a href="/forum" class="self-stretch my-auto">
          Forum
        </a>
        <a href="/terms" class="self-stretch my-auto">
          Terms of Services
        </a>
        <a href="/privacy" class="self-stretch my-auto w-[79px]">
          Privacy
        </a>
      </nav>
    </footer>
  );
});
