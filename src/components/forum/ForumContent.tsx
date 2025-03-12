import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useUserStore } from "~/store/store";

export default component$(() => {
  const { userId } = useUserStore();
  const posts = useSignal([]);
  const isLoading = useSignal(true);
  const comments = useSignal<{ [key: number]: any[] }>({});
  const newComment = useSignal<{ [key: number]: string }>({});

  const loadPosts = $(async () => {
    isLoading.value = true;
    try {
      const res = await fetch("http://dexto.com:3000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query {
            searchPosts(query: "") {
              id 
              userId
              userName 
              userProfile 
              title 
              content 
              imageUrl 
              tags 
              likes 
              createdAt
              comments {
                id 
                userId 
                userName 
                userProfile 
                content 
                createdAt
              }
            }
          }`
        }),
      });
      const result = await res.json();
      posts.value = result.data?.searchPosts || [];
      isLoading.value = false;
    } catch (err) {
      console.error("Error loading posts", err);
      isLoading.value = false;
    }
  });

  const addComment = $(async (postId: number) => {
    const commentText = newComment.value[postId]?.trim();
    if (!commentText || commentText.length === 0) return alert("⚠️ Comment cannot be empty!");

    await fetch("http://dexto.com:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation {
          addComment(userId: ${userId.value}, postId: ${postId}, content: """${commentText}""") {
            id
            userId
            userName
            userProfile
            content
            createdAt
          }
        }`
      }),
    });

    newComment.value[postId] = "";
    await loadPosts();
  });

  useVisibleTask$(() => {
    loadPosts();
  });

  return (
    <div class="p-6 bg-gray-900 text-white">
      {isLoading.value ? (
        <p class="text-center text-gray-400">📢 Loading forum posts...</p>
      ) : posts.value.length === 0 ? (
        <p class="text-center text-gray-400">🚫 No posts found</p>
      ) : (
        posts.value.map((post: any) => (
          <div key={post.id} class="bg-gray-800 p-4 rounded-lg mt-4">
            <h2 class="text-xl font-bold">{post.title}</h2>
            <p>{post.content}</p>

            <div class="mt-2">
              {post.tags?.split(',').map((tag: string) => (
                <span key={tag} class="px-2 py-1 bg-blue-600 text-white rounded mr-1">{tag}</span>
              ))}
            </div>

            <div class="mt-4 border-t pt-2">
              <h3 class="text-lg font-semibold">Comments:</h3>
              {post.comments?.length > 0 ? (
                post.comments.map((comment: any) => (
                  <div key={comment.id} class="ml-4 mt-2 flex items-start gap-2 border-b pb-2">
                    <img src={comment.userProfile || "/image/defaultProfile.svg"} class="w-8 h-8 rounded-full" />
                    <div>
                      <span class="font-semibold">{comment.userName}</span>
                      <p>{comment.content}</p>
                      <small class="text-gray-400">{new Date(comment.createdAt).toLocaleString()}</small>
                    </div>
                  </div>
                ))
              ) : (
                <p class="text-gray-400">No comments yet.</p>
              )}
            </div>

            <div class="mt-2">
              <input
                class="w-full p-2 border rounded-md text-gray-700 mt-2"
                placeholder="Write a comment..."
                value={newComment.value[post.id] || ""}
                onInput$={(e) => (newComment.value[post.id] = (e.target as HTMLInputElement).value)}
              />
              <button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded" onClick$={() => addComment(post.id)}>
                💬 Comment
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );  
});