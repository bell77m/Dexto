import { component$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  const showModal = useSignal(false);
  const postTitle = useSignal("");
  const newComment = useSignal("");
  const newTag = useSignal("");
  const tags = useSignal<string[]>([]);
  const comments = useSignal<{ title: string; text: string; tags: string[]; image?: string }[]>([]);
  const imageFile = useSignal<File | null>(null);
  const likes = useSignal(0); // Signal to track likes count
  const hasLiked = useSignal(false); // Track whether the user has liked
  const latestCount = useSignal(comments.value.length);

  return (
    <div>
      <button
        class="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-5 rounded-full shadow-lg transition-transform transform hover:scale-110"
        onClick$={() => (showModal.value = true)}
      >
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke-width="1.5" 
        stroke="currentColor" 
        class="size-6">
            <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>

      </button>

      {showModal.value && (
        <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div class="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <h3 class="text-lg font-bold mb-3">Create new post</h3>

            <input
              class="w-full p-2 border rounded-md text-lg font-bold"
              placeholder="Post title..."
              bind:value={postTitle}
            />

            <textarea
              class="w-full p-3 border rounded-md h-40 resize-none mt-2"
              placeholder="Write your post..."
              bind:value={newComment}
            ></textarea>

            <div class="mt-3">
              <input
                class="w-full p-2 border rounded-md"
                placeholder="Add a tag..."
                bind:value={newTag}
                onKeyPress$={(e) => {
                  if (e.key === "Enter" && newTag.value.trim()) {
                    tags.value = [...tags.value, newTag.value.trim()];
                    newTag.value = "";
                  }
                }}
              />
              <div class="flex flex-wrap mt-2">
                {tags.value.map((tag, index) => (
                  <span
                    key={index}
                    class="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm mr-2 mt-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div class="mt-3">
              <label class="cursor-pointer">
              <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    class="size-5">
                <path 
                    fill-rule="evenodd" 
                    d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clip-rule="evenodd" />
              </svg>

                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  onChange$={(e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      imageFile.value = file;
                    }
                  }}
                />
              </label>
            </div>

            {imageFile.value && (
              <div class="mt-3">
                <p class="text-sm text-gray-500">Image Preview:</p>
                <img
                  src={URL.createObjectURL(imageFile.value)}
                  alt="Preview"
                  class="mt-1 max-w-full h-40 object-cover rounded border"
                />
              </div>
            )}

            <div class="flex justify-end gap-2 mt-4">
              <button
                class="px-4 py-2 bg-blue-500 text-white rounded"
                onClick$={() => {
                  if (postTitle.value.trim() || newComment.value.trim() || imageFile.value || tags.value.length) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      comments.value = [
                        ...comments.value,
                        {
                          title: postTitle.value,
                          text: newComment.value,
                          tags: [...tags.value],
                          image: reader.result as string,
                        },
                      ];
                      postTitle.value = "";
                      newComment.value = "";
                      imageFile.value = null;
                      tags.value = [];
                      showModal.value = false;
                    };
                    if (imageFile.value) {
                      reader.readAsDataURL(imageFile.value);
                    } else {
                      comments.value = [
                        ...comments.value,
                        { title: postTitle.value, text: newComment.value, tags: [...tags.value] },
                      ];
                      postTitle.value = "";
                      newComment.value = "";
                      tags.value = [];
                      showModal.value = false;
                    }
                  }
                }}
              >
                Submit
              </button>

              <button
                class="px-4 py-2 bg-gray-300 rounded"
                onClick$={() => {
                  showModal.value = false;
                  postTitle.value = "";
                  newComment.value = "";
                  imageFile.value = null;
                  tags.value = [];
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <article class="flex flex-col max-w-full w-[808px] p-10 bg-white shadow-md rounded-lg">
  {comments.value.map((comment, index) => (
    <div key={index} class="p-6 border-b last:border-b-0">
      <h4 class="text-3xl font-bold text-black">{comment.title}</h4>
      <p class="mt-4 text-lg font-light text-black">{comment.text}</p>
      <div class="flex flex-wrap gap-2 mt-4">
        {comment.tags.map((tag, idx) => (
          <span
            key={idx}
            class="px-4 py-2 rounded-2xl bg-gray-200 text-gray-700 text-sm font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>
      {comment.image && (
        <img
          src={comment.image}
          alt="Uploaded"
          class="mt-6 w-full max-h-80 object-cover rounded-lg"
        />
      )}
      <div class="flex items-center gap-4 mt-6 text-xl text-black">
        <button class="flex items-center gap-2 active:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class={`size-6 transition-all ${hasLiked.value ? "text-red-500 fill-red-500" : "hover:text-red-500"}`}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          <span>{likes.value}</span>
        </button>
        <div class="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          <span>{latestCount}</span>
        </div>
      </div>
    </div>
  ))}
</article>
    </div>
  );
});
