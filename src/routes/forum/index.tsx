import { component$ } from "@builder.io/qwik";
import { ForumHeader } from "~/components/forum/ForumHeader";
import { ForumContent } from "~/components/forum/ForumContent";
import { ForumArticle } from "~/components/forum/ForumArticle";
import { ForumComments } from "~/components/forum/ForumComments";
import { ForumRecommended } from "~/components/forum/ForumRecommended";
import { ForumFooter } from "~/components/forum/ForumFooter";

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
