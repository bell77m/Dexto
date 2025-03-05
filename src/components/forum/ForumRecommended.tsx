import { component$ } from "@builder.io/qwik";

interface Props {
  posts: { 
    title: string;
    text: string;
    tags: string[];
    image?: string;
    user: string;
    timestamp: string;
  }[];
  currentTags: string[];
}

export const ForumRecommended = component$<Props>(({ posts = [], currentTags = [] }) => {
  // Filter posts that have at least one matching tag
  const filteredPosts = posts.filter(post => 
    post.tags.some(tag => currentTags.includes(tag))
  );

  return (
    <section class="flex overflow-hidden flex-col items-center px-20 pt-28 pb-48 w-full bg-white">
      <div class="flex flex-col max-w-full w-[812px]">
        <h2 class="self-start ml-3.5 text-4xl font-semibold text-black">
          Recommended from Dexto
        </h2>

        <div class="mt-10">
          {filteredPosts.length > 0 ? (
            <div class="flex gap-5 flex-wrap">
              {filteredPosts.map((article, index) => (
                <article key={index} class="w-6/12">
                  <div class="flex flex-col py-2 w-full">
                    <h3 class="text-2xl font-bold text-black">{article.title}</h3>
                    <p class="mt-2 text-sm font-light text-black">{article.text}</p>
                    <p class="mt-1 text-xs font-medium text-gray-500">Posted by {article.user} on {article.timestamp}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p class="text-gray-500 mt-5">No similar posts found.</p>
          )}
        </div>
      </div>
    </section>
  );
});
