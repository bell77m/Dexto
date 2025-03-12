import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useUserStore } from "~/store/store";

export default component$(() => {
  const { userId } = useUserStore(); // ✅ ดึง userId จาก Store
  const posts = useSignal([]); // ✅ เก็บโพสต์ทั้งหมด
  const isLoading = useSignal(true); // ✅ ใช้สำหรับแสดง Loading
  const comments = useSignal<{ [key: number]: any[] }>({}); // ✅ เก็บคอมเมนต์แยกตามโพสต์
  const newComment = useSignal<{ [key: number]: string }>({}); // ✅ กล่องพิมพ์คอมเมนต์แยกตามโพสต์
  const likedPosts = useSignal<{ [key: number]: boolean }>({}); // ✅ เช็คว่าโพสต์ไหนถูกไลค์แล้ว
  const deletedPosts = useSignal(new Set()); // ✅ เช็คโพสต์ที่ถูกลบ

  // ✅ โหลดโพสต์จาก Database
  const loadPosts = $(() => {
    fetch("http://dexto.com:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query { searchPosts(query: "") { 
          id userId userName userProfile title content imageUrl tags likes createdAt 
        }}`
      }),
    })
    .then((res) => res.json())
    .then((result) => {
      if (result.data?.searchPosts) {
        posts.value = result.data.searchPosts;
      }
    })
    .finally(() => (isLoading.value = false));
  });

  // ✅ โหลดคอมเมนต์ของโพสต์
  const loadComments = $((postId: number) => {
    fetch("http://dexto.com:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query { getComments(postId: ${postId}) { id userId userName userProfile content createdAt } }`
      }),
    })
    .then((res) => res.json())
    .then((result) => {
      if (result.data?.getComments) {
        comments.value = { ...comments.value, [postId]: result.data.getComments };
      }
    });
  });

  // ✅ กดไลค์โพสต์ (ต้องไม่ใช่เจ้าของโพสต์)
  const likePost = $((postId: number, postUserId: number) => {
    if (postUserId === userId.value) return alert("❌ You cannot like your own post.");
    
    fetch("http://dexto.com:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation { likePost(userId: ${userId.value}, postId: ${postId}) }`
      }),
    })
    .then(() => {
      likedPosts.value[postId] = true; // ✅ เปลี่ยนสีปุ่ม
      loadPosts();
    });
  });

  // ✅ เพิ่มคอมเมนต์ใหม่
  const addComment = $((postId: number) => {
    if (!newComment.value[postId]?.trim()) return;
    
    fetch("http://dexto.com:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation { addComment(userId: ${userId.value}, postId: ${postId}, content: "${newComment.value[postId]}") }`
      }),
    })
    .then(() => {
      newComment.value[postId] = ""; // ✅ เคลียร์ช่องพิมพ์
      loadComments(postId);
    });
  });

  // ✅ ลบโพสต์ (เฉพาะเจ้าของโพสต์)
  const deletePost = $((postId: number, postUserId: number) => {
    if (postUserId !== userId.value) return alert("❌ You can only delete your own posts.");
    
    fetch("http://dexto.com:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation { deletePost(userId: ${userId.value}, postId: ${postId}) }`
      }),
    })
    .then(() => {
      deletedPosts.value.add(postId); // ✅ ลบออกจาก UI
      loadPosts(); // ✅ โหลดโพสต์ใหม่
    });
  });

  useVisibleTask$(() => loadPosts()); // ✅ โหลดโพสต์เมื่อ Component ปรากฏบนหน้าเว็บ

  return (
    <div class="p-6 bg-gray-900 text-white">
      {isLoading.value ? (
        <p class="text-center text-gray-400">📢 Loading forum posts...</p>
      ) : posts.value.length === 0 ? (
        <p class="text-center text-gray-400">🚫 No posts found</p>
      ) : (
        posts.value.map((post) => (
          !deletedPosts.value.has(post.id) && ( // ✅ ถ้าโพสต์ถูกลบ ให้ซ่อนไปเลย
          <div key={post.id} class="bg-gray-800 p-4 rounded-lg mt-4">
            {/* ✅ Header ของโพสต์ */}
            <div class="flex items-center space-x-4">
              <img src={post.userProfile || "/image/defaultProfile.svg"} class="w-10 h-10 rounded-full" />
              <div>
                <p class="font-semibold">{post.userName}</p>
                <p class="text-sm text-gray-400">{new Date(post.createdAt).toLocaleString()}</p>
              </div>
            </div>
            
            {/* ✅ เนื้อหาของโพสต์ */}
            <h2 class="text-2xl font-bold mt-2">{post.title}</h2>
            <p class="text-gray-300">{post.content}</p>
            {post.imageUrl && <img src={post.imageUrl} class="w-full mt-4 rounded-lg" />}
            <p class="text-sm text-gray-400 flex gap-2">
              {post.tags.split(',').map(tag => <span class="px-2 py-1 bg-blue-600 text-white rounded">{tag}</span>)}
            </p>

            {/* ✅ ปุ่มไลค์ + ลบโพสต์ */}
            <div class="flex justify-between mt-2">
              <button 
                onClick$={() => likePost(post.id, post.userId)} 
                class={`px-4 py-2 rounded ${likedPosts.value[post.id] ? "bg-green-600" : "bg-gray-600"}`}>
                👍 {post.likes}
              </button>
              {post.userId === userId.value && (
                <button 
                  onClick$={() => deletePost(post.id, post.userId)} 
                  class="px-4 py-2 bg-red-600 rounded">
                  🗑️ Delete
                </button>
              )}
            </div>

            {/* ✅ กล่องพิมพ์คอมเมนต์ */}
            <div class="mt-4">
              <input class="w-full p-2 border rounded-md text-gray-700" placeholder="Write a comment..." bind:value={newComment[post.id]} />
              <button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded" onClick$={() => addComment(post.id)}>
                💬 Comment
              </button>
            </div>
          </div>
        )))
      )}
    </div>
  );
});
