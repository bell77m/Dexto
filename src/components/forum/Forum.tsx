
import { component$, useSignal, $, useStore, useOnWindow, useTask$} from "@builder.io/qwik";
import { ForumHeader } from "./ForumHeader";
import { ForumHeadernotlog } from "./ForumHeadernotlog";
import { ForumContent } from "./ForumContent";
import { ForumArticle } from "./ForumArticle";
import { ForumComments } from "./ForumComments";
import { ForumRecommended } from "./ForumRecommended";
import { ForumFooter } from "./ForumFooter";




export const Forum = component$(() => {
  const statuslogin = useSignal(true); // Change this to true for testing logged-in state

  const posts = useSignal<{ 
    title: string;
    text: string;
    tags: string[];
    image?: string;
    user: string;
    timestamp: string;
  }[]>([]); // ✅ Ensures `posts` is always an array

  const currentTags = useSignal<string[]>([]);

  return (
    <div class="flex flex-col w-full">
      {statuslogin.value ? (
        <>
          <ForumHeader />
          <ForumContent />
          {/*<ForumComments/>*/}
          <ForumRecommended 
           posts={posts.value} 
           currentTags={currentTags.value}/>
          <ForumFooter />
        </>
      ) : (
        <>
          <ForumHeadernotlog />
          <div class="bg-white flex-grow min-h-[700px] flex items-center justify-center text-[50px] text-light-gray-700 font-bold italic rotate-[-1deg]">
              Please login to use this function
          </div>
          <div class="bg-white flex-grow min-h-[100px] "></div>
          {/*<ForumComments/>*/}
          <ForumFooter />
        </>
      )}
    </div>
  );
});


export default Forum;
