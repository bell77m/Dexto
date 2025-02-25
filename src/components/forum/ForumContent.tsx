import { component$, useSignal, $ ,useOnWindow,useStore,useTask$} from "@builder.io/qwik";
import FAB from "~/components/forum/FAB";
{/*หัวโพสต์*/}
export const ForumContent = component$(() => {
  const likes = useSignal(0); // Signal to track likes count
  const hasLiked = useSignal(false); // Track whether the user has liked
  const state = useStore({ menuOpen: false, reportOpen: false, selectedReason: "" });
  const state2 = useStore({ selected: [] as string[] });
  const comments = useSignal<string[]>([]);
  const newComment = useSignal("");
  const showModal = useSignal(false);
  const latestCount = useSignal(comments.value.length); // Store latest count separately

  // Track `comments.value.length` and update `latestCount`
  useTask$(({ track }) => {
    track(() => comments.value.length);
    latestCount.value = comments.value.length; // ✅ Forces UI update
  });

  const toggleSelection = (value: string) => {
    if (state2.selected.includes(value)) {
      state2.selected = state2.selected.filter((item) => item !== value);
    } else {
      state2.selected = [...state2.selected, value];
    }
  };
  

  const addLike = $(() => {
    if (!hasLiked.value) {
      likes.value++;
      hasLiked.value = true;
    }else if(hasLiked.value == true){
      likes.value--;
      hasLiked.value = false;
    }
  });

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
    
    <main class="flex overflow-hidden flex-col justify-center items-center px-20 py-24 w-full bg-white max-md:px-5 max-md:pt-24 max-md:max-w-full">
      <article class="flex flex-col max-w-full w-[808px]">
        <h1 class="self-start text-5xl font-bold text-black max-md:max-w-full max-md:text-4xl">
          Nvidia announces the RTX 50 series
        </h1>

        <p class="mt-12 mr-20 text-2xl font-light text-black max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
          Nvidia has announced the RTX 50-series, codename Blackwell, at CES 2025.
        </p>

        <div class="flex gap-6 self-start mt-16 text-xl text-black max-md:mt-10">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1bbf3624eedd1b7efbbc2a8c72e5af8fb7a1509a280920751734192b2c84f6b4?placeholderIfAbsent=true&apiKey=eb3002760c2a4e17b211fd544868da2b"
            class="object-contain shrink-0 aspect-square rounded-[170px] w-[95px]"
            alt="Author avatar"
          />
          <div class="flex flex-col my-auto">
            <span class="self-start font-medium">Jane Doe</span>
            <time class="mt-4">Jan 7, 2025</time>
          </div>
        </div>

        <div class="flex flex-wrap gap-5 justify-between px-12 py-6 mt-20 w-full bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.05)] max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div class="flex gap-10 text-center">
            <button onClick$={addLike} class="flex items-center gap-2 cursor-pointer active:scale-110">
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
            <div class="flex gap-6">
              <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24" 
                  stroke-width="1.5" 
                  stroke="currentColor" 
                  class="size-6">
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
              <span>{latestCount}</span>
            </div>
          </div>

          <div class="flex gap-10 justify-between items-center self-start">
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
        </div> 
      <article class="flex overflow-hidden flex-col justify-center items-center px-20 py-24 w-full text-black bg-white max-md:px-5 max-md:max-w-full">
        <div class="max-w-full w-[808px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7629a3fe155757b2601012c8b60e75907fba3f0968b3bcf0d95b762e90c68fb6?placeholderIfAbsent=true&apiKey=eb3002760c2a4e17b211fd544868da2b"
            class="object-contain w-full aspect-[1.37] max-md:max-w-full"
            alt="RTX 50 series"
          />

          <section class="mt-24 text-xl max-md:mt-10 max-md:mr-1 max-md:max-w-full">
            <h2 style="font-weight: 600; font-size: 36px;">
              RTX 50-series Specs
            </h2>
            <p style="font-size: 18px;" class="mt-4">
              The Blackwell family will be led by the RTX 5090, which is a mighty
              beast. No surprises there. Nvidia cites up to 125 shader TFLOPS, 380
              RT TFLOPS, and 4,000 AI TOPS for the Blackwell family, presumably
              the top GPU configuration with 92 billion transistors.
            </p>

            <h2 style="font-weight: 600; font-size: 36px;">
              RTX 50-series Price
            </h2>
          </section>
          <div class="flex flex-wrap gap-5 justify-between mt-11 max-w-full text-xs font-light text-center whitespace-nowrap w-[550px] max-md:mt-10">
            <button class="px-6 py-3.5 rounded-2xl bg-stone-200 bg-opacity-70 max-md:px-5">
              Technology
            </button>
            <button class="px-9 py-3.5 rounded-2xl bg-stone-200 bg-opacity-70 max-md:px-5">
              Gaming
            </button>
            <button class="px-12 py-3.5 rounded-2xl bg-stone-200 bg-opacity-70 max-md:px-5">
              AI
            </button>
            <button class="px-7 py-3.5 rounded-2xl bg-stone-200 bg-opacity-70 max-md:px-5">
              Hardware
            </button>
          </div>
        </div>
      </article>
      </article>
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
        <section class="flex overflow-hidden flex-col justify-center items-center px-20 py-28 w-full text-base text-black bg-stone-50 max-md:px-5 max-md:pb-24 max-md:max-w-full">
      <div class="mb-0 max-w-full w-[833px] max-md:mb-2.5">
        <h2 class="self-start ml-4 text-4xl font-semibold max-md:ml-2.5">
          Responses ({latestCount})
        </h2>

        {/* Respond Button */}
        <div class="flex flex-wrap gap-5 justify-between py-5 pr-4 pl-16 mt-16 ml-4 max-w-full text-xl font-medium text-black bg-white rounded shadow-[0px_4px_4px_rgba(0,0,0,0.15)] w-[808px] max-md:pl-5 max-md:mt-10">
          <p class="my-auto">What are your thoughts?</p>
          <button
            class="px-10 py-4 whitespace-nowrap bg-green-500 rounded-2xl max-md:px-5"
            onClick$={() => {
              showModal.value = true; // Open the modal
            }}
          >
            Respond
          </button>
        </div>

        {/* Response Box */}
        {showModal.value && (
          <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 class="text-lg font-bold mb-3">Write a Response</h3>
              <textarea
                class="w-full p-2 border rounded-md"
                placeholder="Write your response..."
                bind:value={newComment}
              ></textarea>
              <div class="flex justify-end gap-2 mt-3">
                <button
                  class="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick$={() => {
                    if (newComment.value.trim()) {
                      comments.value = [...comments.value,newComment.value]; // Trigger reactivity
                      newComment.value = "";
                      showModal.value = false;
                    }
                  }}                  
                >
                  Submit
                </button>
                <button
                  class="px-4 py-2 bg-gray-300 rounded"
                  onClick$={() => {
                    showModal.value = false; // Close modal on cancel
                    newComment.value = "";
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Comments List */}
        {comments.value.map((comment, index) => (
          <article
            key={index}
            class="flex flex-col justify-center items-center px-7 py-6 mt-16 bg-white rounded-2xl min-h-[223px] shadow-[0px_4px_4px_rgba(0,0,0,0.15)] max-md:px-5 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full"
          >
            <div class="w-full rounded-none max-w-[751px] max-md:max-w-full">
              <div class="flex flex-wrap gap-5 justify-between w-full max-md:max-w-full">
                <div class="flex gap-10 items-start">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d3b302d5c7f11b118e7eb826591fa710b577e2c9ae5e30e5cac2adb5282933b1?placeholderIfAbsent=true&apiKey=eb3002760c2a4e17b211fd544868da2b"
                    class="object-contain shrink-0 aspect-square rounded-[170px] w-[50px]"
                    alt="User avatar"
                  />
                  <div class="flex flex-col items-start mt-1">
                    <span class="font-medium">User</span>
                    <p class="self-stretch mt-6 font-light">{comment}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
    <FAB />
    </main>
    
  );
});
