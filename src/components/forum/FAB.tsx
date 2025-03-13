import { component$, useSignal, $ } from "@builder.io/qwik";
import { useUserStore } from "~/store/store";
import API_URL from "~/configURL/config";

export default component$(() => {
  const { userId } = useUserStore();
  const showModal = useSignal(false);
  const newPostTitle = useSignal("");
  const newPostContent = useSignal("");
  const newPostTags = useSignal("");

  // ✅ ฟังก์ชันเพิ่มโพสต์ รองรับ `Enter`
  const addPost = $(async () => {
    if (!newPostTitle.value.trim() || !newPostContent.value.trim()) {
      return alert("⚠️ Title and Content cannot be empty!");
    }

    const formattedTags = newPostTags.value
      .split(" ")
      .filter(tag => tag.startsWith("#"))
      .map(tag => tag.substring(1))
      .join(",");

    // ✅ ไม่ต้องแปลง `\n` ให้ GraphQL บันทึกข้อความตามปกติ
    const formattedContent = newPostContent.value;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation {
          createPost(userId: ${userId.value}, title: """${newPostTitle.value}""", content: """${formattedContent}""", tags: """${formattedTags}""") {
            id
          }
        }`,
      }),
    });

    const result = await response.json();
    if (result.data?.createPost) {
      newPostTitle.value = "";
      newPostContent.value = "";
      newPostTags.value = "";
      showModal.value = false;
      location.reload();
    } else {
      alert("❌ Failed to create post");
    }
  });

  return (
    <div>
      <button
        class="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-5 rounded-full"
        onClick$={() => (showModal.value = true)}
      >
        ➕ New Post
      </button>

      {showModal.value && (
        <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div class="bg-white p-6 rounded-lg w-[500px]">
            <h3 class="text-lg font-bold">Create New Post</h3>
            <input
              class="w-full p-2 border rounded-md"
              placeholder="Post Title..."
              bind:value={newPostTitle}
            />
            <textarea
              class="w-full p-3 border rounded-md h-40 mt-2"
              placeholder="Write your post..."
              bind:value={newPostContent}
            ></textarea>
            <input
              class="w-full p-2 border rounded-md mt-2"
              placeholder="Tags ( #your_tag )"
              bind:value={newPostTags}
            />
            <div class="flex justify-end gap-2 mt-4">
              <button class="px-4 py-2 bg-blue-500 text-white rounded" onClick$={addPost}>
                📝 Post
              </button>
              <button
                class="px-4 py-2 bg-gray-300 rounded"
                onClick$={() => (showModal.value = false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
