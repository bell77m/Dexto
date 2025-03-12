import { component$ } from "@builder.io/qwik";
import { ForumHeader } from "./ForumHeader";
import ForumContent from "~/components/forum/ForumContent";
import FAB from "~/components/forum/FAB";
import { ForumFooter } from "./ForumFooter";

export const Forum = component$(() => {
  return (
    <div class="flex flex-col w-full">
      <ForumHeader />
      <ForumContent />
      <FAB />
      <ForumFooter />
    </div>
  );
});

export default Forum;
