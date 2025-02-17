import { component$ } from "@builder.io/qwik";
import { ForumHeader } from "./ForumHeader";
import { ForumContent } from "./ForumContent";
import { ForumArticle } from "./ForumArticle";
import { ForumComments } from "./ForumComments";
import { ForumRecommended } from "./ForumRecommended";
import { ForumFooter } from "./ForumFooter";

export const Forum = component$(() => {
  return (
    <div class="flex flex-col w-full">
      <ForumHeader />
      <ForumContent />
      <ForumArticle />
      <ForumComments />
      <ForumRecommended />
      <ForumFooter />
    </div>
  );
});

export default Forum;
