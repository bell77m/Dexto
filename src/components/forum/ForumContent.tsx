import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useUserStore } from "~/store/store";

export default component$(() => {
  const { userId } = useUserStore();
  const posts = useSignal([]);
  const isLoading = useSignal(true);
  const comments = useSignal<{ [key: number]: any[] }>({});
  const newComment = useSignal<{ [key: number]: string }>({});
  const likedPosts = useSignal<{ [key: number]: boolean }>({});
  const deletedPosts = useSignal(new Set());

  const loadPosts = $(async () => {
    const res = await fetch("http://dexto.com:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query { searchPosts(query: "") { id userId userName userProfile title content imageUrl tags likes createdAt }}`,
      }),
    });
    const result = await res.json();
    posts.value = result.data?.searchPosts || [];
    isLoading.value = false;
  });

  const loadComments = $(async (postId: number) => {
    const res = await fetch("http://dexto.com:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query { getComments(postId: ${postId}) { id userId userName userProfile content createdAt } }`,
      }),
    });
    const result = await res.json();
    comments.value[postId] = result.data?.getComments || [];
  });

  const addComment = $(async (postId: number) => {
    const commentText = newComment.value[postId]?.trim();
    if (!commentText || commentText.length === 0) return alert("⚠️ Comment cannot be empty!");

    await fetch("http://dexto.com:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation { addComment(userId: ${userId.value}, postId: ${postId}, content: """${commentText}""") }`,
      }),
    });

    newComment.value[postId] = "";
    await loadComments(postId);
  });

  const likePost = $(async (postId: number, postUserId: number) => {
    if (postUserId === userId.value) return alert("❌ You cannot like your own post.");

    await fetch("http://dexto.com:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation { likePost(userId: ${userId.value}, postId: ${postId}) }`,
      }),
    });

    likedPosts.value[postId] = true;
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
        posts.value.map((post) => (
          !deletedPosts.value.has(post.id) && (
            <div key={post.id} class="bg-gray-800 p-4 rounded-lg mt-4">
              <h2 class="text-xl font-bold">{post.title}</h2>
              <p>{post.content}</p>

              <div class="mt-2">
                {post.tags?.split(',').map((tag) => (
                  <span class="px-2 py-1 bg-blue-600 text-white rounded mr-1">{tag}</span>
                ))}
              </div>

              <button class="mt-2 text-blue-400" onClick$={() => loadComments(post.id)}>
                💬 View Comments
              </button>

              {comments.value[post.id]?.map((comment) => (
                <div key={comment.id} class="ml-4 mt-2">
                  <span class="font-semibold">{comment.userName}</span>: {comment.content}
                </div>
              ))}

              <input
                class="w-full p-2 border rounded-md text-gray-700 mt-2"
                placeholder="Write a comment..."
                value={newComment.value[post.id] || ""}
                onInput$={(e) => (newComment.value[post.id] = (e.target as HTMLInputElement).value)}
              />
              <button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded" onClick$={() => addComment(post.id)}>
                💬 Comment
              </button>

              <button
                class={`mt-2 px-4 py-2 rounded ${likedPosts.value[post.id] ? "bg-green-600" : "bg-gray-600"}`}
                onClick$={() => likePost(post.id, post.userId)}
              >
                👍 {post.likes}
              </button>
            </div>
          )
        ))
      )}
    </div>
  );
});