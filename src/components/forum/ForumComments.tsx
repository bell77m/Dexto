import { component$, useSignal } from "@builder.io/qwik";

export const ForumComments = component$(() => {
  const comments = useSignal<string[]>([]); // Comment list
  const newComment = useSignal(""); // Input field
  const showModal = useSignal(false); // Modal visibility

  return (
    <section class="flex overflow-hidden flex-col justify-center items-center px-20 py-28 w-full text-base text-black bg-stone-50 max-md:px-5 max-md:pb-24 max-md:max-w-full">
      <div class="mb-0 max-w-full w-[833px] max-md:mb-2.5">
        <div class="flex flex-col pl-2.5 w-full max-md:max-w-full">
          <h2 class="self-start ml-4 text-4xl font-semibold max-md:ml-2.5">
            Responses ({comments.value.length})
          </h2>

          <div class="flex flex-wrap gap-5 justify-between py-5 pr-4 pl-16 mt-16 ml-4 max-w-full text-xl font-medium text-black bg-white rounded shadow-[0px_4px_4px_rgba(0,0,0,0.15)] w-[808px] max-md:pl-5 max-md:mt-10">
            <p class="my-auto">What are your thoughts?</p>
            <button
              class="px-10 py-4 whitespace-nowrap bg-green-500 text-white rounded-2xl max-md:px-5"
              onClick$={() => {
                showModal.value = true;
              }}
            >
              Respond
            </button>
          </div>

          {/* Modal */}
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
                    class="px-4 py-2 bg-gray-300 rounded"
                    onClick$={() => {
                      showModal.value = false;
                      newComment.value = "";
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    class="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick$={() => {
                      if (newComment.value.trim()) {
                        comments.value = [...comments.value, newComment.value];
                        newComment.value = "";
                        showModal.value = false;
                      }
                    }}
                  >
                    Submit
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
      </div>
    </section>
  );
});
