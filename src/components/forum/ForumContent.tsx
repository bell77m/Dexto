import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useUserStore } from "~/store/store";
import API_URL from "~/configURL/config";


export default component$(() => {
  const { userId } = useUserStore();
  const posts = useSignal([]);
  const isLoading = useSignal(true);
  const newComment = useSignal<{ [key: number]: string }>({});

  const loadPosts = $(async () => {
    isLoading.value = true;
    try {
      const res = await fetch(API_URL, {
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
  
      // ✅ เรียงโพสต์ใหม่ล่าสุดให้อยู่บนสุด
      posts.value = (result.data?.searchPosts || []).sort(
        (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  
      isLoading.value = false;
    } catch (err) {
      console.error("Error loading posts", err);
      isLoading.value = false;
    }
  });
  

  const addComment = $(async (postId: number) => {
    const commentText = newComment.value[postId]?.trim();
    if (!commentText || commentText.length === 0) return alert("⚠️ Comment cannot be empty!");
  
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation {
          addComment(userId: ${userId.value}, postId: ${postId}, content: """${commentText.replace(/\n/g, "\\n")}""") {
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
  

  const deletePost = $(async (postId: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation { deletePost(userId: ${userId.value}, postId: ${postId}) }`,
      }),
    });
    const result = await response.json();
    if (result.data?.deletePost) {
      posts.value = posts.value.filter(post => post.id !== postId);
    } else {
      alert("❌ Failed to delete post");
    }
  });

  useVisibleTask$(() => {
    loadPosts();
  });

  return (
    <div class="p-6 bg-gray-900 text-white flex flex-col items-center">
      {isLoading.value ? (
        <p class="text-left text-gray-400 w-full max-w-2xl">📢 Loading forum posts...</p>
      ) : posts.value.length === 0 ? (
        <p class="text-left text-gray-400 w-full max-w-2xl">🚫 No posts found</p>
      ) : (
        posts.value.map((post: any) => {
          const isExpandedContent = useSignal(false);
          const contentMaxLength = 300;

          return (
            <div key={post.id} class="relative bg-gray-800 p-4 rounded-lg mt-4 max-w-2xl w-full">
              {/* หัวข้อโพสต์ + ปุ่ม Delete */}
              <div class="flex justify-between items-start w-full">
                <div class="max-w-[85%] break-words">
                  <h2 class="text-3xl font-bold text-left">
                    {post.title}
                  </h2>
                  <span class="text-sm text-gray-400">
                    ({new Date(post.createdAt).toLocaleString()})
                  </span>
                </div>

                {post.userId === userId.value && (
                  <button
                    class="px-3 py-1 bg-red-500 text-white rounded text-sm"
                    onClick$={() => deletePost(post.id)}
                  >
                    Delete
                  </button>
                )}
              </div>

              {/* ✅ ตัดเนื้อหาโพสต์ ถ้ายาวเกิน 300 ตัวอักษร */}
              <div class="max-w break-words whitespace-pre-line overflow-wrap break-word mt-2">
                <p class="text-left">
                  {isExpandedContent.value || post.content.length <= contentMaxLength
                    ? post.content
                    : post.content.slice(0, contentMaxLength) + "..."}
                </p>

                {post.content.length > contentMaxLength && (
                  <button
                    class="text-blue-400 text-sm underline"
                    onClick$={() => (isExpandedContent.value = !isExpandedContent.value)}
                  >
                    {isExpandedContent.value ? "Read less" : "Read more"}
                  </button>
                )}
              </div>

              <div class="mt-2 flex flex-wrap gap-2 max-w-[85%]">
                {post.tags?.split(',').map((tag: string) => (
                <span key={tag} class="px-2 py-1 bg-blue-600 text-white rounded break-words overflow-hidden">
                #{tag}
                </span>
                 ))}
            </div>


              {/* คอมเมนต์ */}
              <div class="mt-4 border-t pt-2">
                <h3 class="text-lg font-semibold text-left">Comments:</h3>
                {post.comments?.length > 0 ? (
                  post.comments.map((comment: any) => {
                    const isExpandedComment = useSignal(false);
                    const commentMaxLength = 100;

                    return (
                      <div key={comment.id} class="ml-4 mt-2 flex items-start gap-2">
                        <img src={comment.userProfile || "/image/defaultProfile.svg"} class="w-8 h-8 rounded-full" />
                        <div class="max-w-[85%] break-words whitespace-pre-line overflow-wrap break-word">
                          <span class="font-semibold">{comment.userName}</span>

                          <p class="text-left">
                            {isExpandedComment.value || comment.content.length <= commentMaxLength
                              ? comment.content
                              : comment.content.slice(0, commentMaxLength) + "..."}
                          </p>

                          {comment.content.length > commentMaxLength && (
                            <button
                              class="text-blue-400 text-sm underline"
                              onClick$={() => (isExpandedComment.value = !isExpandedComment.value)}
                            >
                              {isExpandedComment.value ? "Read less" : "Read more"}
                            </button>
                          )}

                          <small class="text-gray-400">
                            {new Date(comment.createdAt).toLocaleString()}
                          </small>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p class="text-left text-gray-400">No comments yet.</p>
                )}
              </div>

              {/* ✅ ช่องพิมพ์คอมเมนต์กลับมาแล้ว! */}
              <div class="mt-2 flex items-center w-full max-w space-x-2">
                <input
                  class="flex-1 p-2 border rounded-md text-gray-700"
                  placeholder="Write a comment..."
                  value={newComment.value[post.id] || ""}
                  onInput$={(e) => (newComment.value[post.id] = (e.target as HTMLInputElement).value)}
                  onKeyDown$={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addComment(post.id);
                    }
                  }}
                />
                <button class="px-4 py-2 bg-blue-500 text-white rounded whitespace-nowrap" onClick$={() => addComment(post.id)}>
                  ➤
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
});
