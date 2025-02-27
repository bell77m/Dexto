import { component$, useSignal, $, useStore, useOnWindow, useTask$} from "@builder.io/qwik";

export default component$(() => {
  const showModal = useSignal(false);
  const postTitle = useSignal("");
  const newComment = useSignal("");
  const newTag = useSignal("");
  const tags = useSignal<string[]>([]);
  const comments = useSignal<{ title: string; text: string; tags: string[]; image?: string; user: string; timestamp: string; }[]>([]);
  const imageFile = useSignal<File | null>(null);
  const likes = useSignal(0); // Signal to track likes count
  const hasLiked = useSignal(false); // Track whether the user has liked
  const latestCount = useSignal(comments.value.length);
  const state2 = useStore({ selected: [] as string[] });
  const state = useStore({ menuOpen: false, reportOpen: false, selectedReason: "" });
  const userName = useSignal("");

  useTask$(({ track }) => {
      track(() => comments.value.length);
      latestCount.value = comments.value.length; // ✅ Forces UI update
    });


  const addLike = $(() => {
      if (!hasLiked.value) {
        likes.value++;
        hasLiked.value = true;
      }else if(hasLiked.value == true){
        likes.value--;
        hasLiked.value = false;
      }
    });

    const toggleSelection = (value: string) => {
      if (state2.selected.includes(value)) {
        state2.selected = state2.selected.filter((item) => item !== value);
      } else {
        state2.selected = [...state2.selected, value];
      }
    };

     const toggleMenu = $(() => {
        state.menuOpen = !state.menuOpen;
      });
    
      const openReport = $(() => {
        state.reportOpen = true;
        state.menuOpen = false;
      });
    
      const closeReport = $(() => {
        state.reportOpen = false;
        state.selectedReason = "";
      });
    
      const submitReport = $(() => {
        console.log("Reported:", state2.selected);
        state2.selected = [];
        closeReport();
      });
    
      useOnWindow(
        "click",
        $((event) => {
          const target = event.target as HTMLElement;
          if (!target.closest(".menu-container")) {
            state.menuOpen = false;
          }
        })
      );

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
            <input
              class="w-full p-2 border rounded-md text-lg font-bold"
              placeholder="Your name..."
              bind:value={userName}
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
                    const timestamp = new Date().toLocaleString();
                    reader.onload = () => {
                      comments.value = [
                        ...comments.value,
                        {
                          title: postTitle.value,
                          text: newComment.value,
                          tags: [...tags.value],
                          image: reader.result as string,
                          user: userName.value || "Anonymous", // If user doesn't enter a name, use "Anonymous"
                          timestamp,
                        },
                      ];
                      postTitle.value = "";
                      newComment.value = "";
                      imageFile.value = null;
                      tags.value = [];
                      userName.value = "";
                      showModal.value = false;
                    };
                    if (imageFile.value) {
                      reader.readAsDataURL(imageFile.value);
                    } else {
                      comments.value = [
                        ...comments.value,
                        { title: postTitle.value, text: newComment.value, tags: [...tags.value],user: userName.value || "Anonymous",
                          timestamp },
                      ];
                      postTitle.value = "";
                      newComment.value = "";
                      tags.value = [];
                      userName.value = "";
                      showModal.value = false;
                    }
                  }
                }}
              >
                Post
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
            <div class="flex justify-between items-center">
              <h4 class="text-3xl font-bold text-black">{comment.title}</h4>
              <p class="text-sm text-gray-500">{comment.timestamp}</p>
            </div>
            <p class="text-md text-gray-600 mt-1">Posted by: <strong>{comment.user}</strong></p>
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
            <div class="flex flex-wrap gap-5 justify-between py-6 mt-20 w-full bg-white-[0px_4px_4px_rgba(0,0,0,0.05)] max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <div class="flex gap-10 text-center">
              <button onClick$={addLike} class="flex items-center gap-2 active:scale-110">
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
            <div  class="flex gap-10 justify-between items-center self-start">
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
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
              </svg>
              <div class="relative menu-container">
                <button onClick$={toggleMenu} class="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
                </button>
                {state.menuOpen && (
                  <div
                    class="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50"
                    onClick$={(e) => e.stopPropagation()}
                  >
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                      Not interested
                    </a>
                    <a href="#" onClick$={openReport} class="block px-4 py-2 hover:bg-gray-100">
                      Report
                    </a>
                  </div>
                )}
              </div>
            </div>
            {state.reportOpen && (
            <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-lg w-96">
              <h2 class="text-xl font-semibold mb-4">Why do you want to report this post?</h2>
              <div class="space-y-2">
                {["I don't like this post", "Spam", "Hate speech"].map((reason) => (
                  <label key={reason} class="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="reportReason"
                      value={reason}
                      checked={state2.selected.includes(reason)}
                      onChange$={() => toggleSelection(reason)}
                    />
                    {reason}
                  </label>
                ))}
                <p class="mt-4">Selected: {state2.selected.join(", ") || "None"}</p>
              </div>
              <div class="flex justify-end gap-2 mt-4">
                <button onClick$={closeReport} class="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                <button onClick$={submitReport} class="px-4 py-2 bg-red-500 text-white rounded">Send</button>
              </div>
            </div>
            </div>
            )}
          </div>
          </div>
            ))}
            </article>
            
        </div>
        
      );
    });
