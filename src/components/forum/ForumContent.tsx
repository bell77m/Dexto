import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useUserStore } from "~/store/store";

export default component$(() => {
  const { userId } = useUserStore(); // ✅ ดึง userId จาก Store
  const posts = useSignal([]); // ✅ เก็บโพสต์ทั้งหมด
  const isLoading = useSignal(true); // ✅ ใช้สำหรับแสดง Loading

  // ✅ โหลดโพสต์จาก Database
  const loadPosts = $(() => {
    console.log("📢 Fetching forum posts..."); // ✅ Debug API Call
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
      console.log("✅ API Response:", result); // ✅ Debug Response
      if (result.data?.searchPosts) {
        posts.value = result.data.searchPosts;
      } else {
        console.error("❌ API returned empty data:", result);
      }
    })
    .catch((error) => console.error("❌ API Error:", error))
    .finally(() => (isLoading.value = false)); // ✅ ปิด Loading หลังจากโหลดเสร็จ
  });

  // ✅ โหลดโพสต์เมื่อ Component ปรากฏบนหน้าเว็บ
  useVisibleTask$(() => loadPosts());

  return (
    <div class="p-6 bg-gray-900 text-white">
      {isLoading.value ? (
        <p class="text-center text-gray-400">📢 Loading forum posts...</p>
      ) : posts.value.length === 0 ? (
        <p class="text-center text-gray-400">🚫 No posts found</p>
      ) : (
        posts.value.map((post) => (
          <div key={post.id} class="bg-gray-800 p-4 rounded-lg mt-4">
            <div class="flex items-center space-x-4">
              <img src={post.userProfile || "/image/defaultProfile.svg"} class="w-10 h-10 rounded-full" />
              <div>
                <p class="font-semibold">{post.userName}</p>
                <p class="text-sm text-gray-400">{new Date(post.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <h2 class="text-xl font-bold mt-2">{post.title}</h2>
            <p class="text-gray-300">{post.content}</p>
            {post.imageUrl && <img src={post.imageUrl} class="w-full mt-4 rounded-lg" />}
            <p class="text-sm text-gray-400">Tags: {post.tags}</p>
          </div>
        ))
      )}
    </div>
  );
});
