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
      <FAB />
      <article class="flex flex-col max-w-full w-[808px]">
        <div class="flex flex-wrap gap-5 justify-between px-12 py-6 mt-20 w-full bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.05)] max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div class="flex gap-10 justify-between items-center self-start">
            <div class="relative menu-container">
            </div>

            </div>
            </div> 
            </article>
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
    </main>
    
  );
});
