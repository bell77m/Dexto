import { component$ } from "@builder.io/qwik";

export const ForumComments = component$(() => {
  return (
    <section class="flex overflow-hidden flex-col justify-center items-center px-20 py-28 w-full text-base text-black bg-stone-50 max-md:px-5 max-md:pb-24 max-md:max-w-full">
      <div class="mb-0 max-w-full w-[833px] max-md:mb-2.5">
        <div class="flex flex-col pl-2.5 w-full max-md:max-w-full">
          <h2 class="self-start ml-4 text-4xl font-semibold max-md:ml-2.5">
            Responses (3)
          </h2>

          <div class="flex flex-wrap gap-5 justify-between py-5 pr-4 pl-16 mt-16 ml-4 max-w-full text-xl font-medium text-black bg-white rounded shadow-[0px_4px_4px_rgba(0,0,0,0.15)] w-[808px] max-md:pl-5 max-md:mt-10">
            <p class="my-auto">What are your thoughts?</p>
            <button class="px-10 py-4 whitespace-nowrap bg-green-500 rounded-2xl max-md:px-5">
              Respond
            </button>
          </div>

          {[1, 2, 3].map((index) => (
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
                      <span class="font-medium">SusanNalak</span>
                      <time class="mt-3 text-xs">Sep 26, 2024</time>
                      <p class="self-stretch mt-6 font-light">
                        Very exciting &gt;&lt;
                      </p>
                    </div>
                  </div>
                  <button>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/2cb10ae06c733de3fd2619f2b17d8789b05ad600b9c4d713b5deedbddae3d675?placeholderIfAbsent=true&apiKey=eb3002760c2a4e17b211fd544868da2b"
                      class="object-contain shrink-0 self-start w-5 aspect-square"
                      alt="More options"
                    />
                  </button>
                </div>
                <div class="flex flex-wrap items-center mt-20 font-light text-center whitespace-nowrap max-md:mt-10 max-md:max-w-full">
                  <button class="flex gap-3 items-center self-stretch my-auto">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed02e56435d8c270712bf1c346160be81c98f3d72501e51a57ff6be35aa9456f?placeholderIfAbsent=true&apiKey=eb3002760c2a4e17b211fd544868da2b"
                      class="object-contain shrink-0 self-stretch my-auto aspect-[1.07] w-[15px]"
                      alt="Like"
                    />
                    <span class="self-stretch my-auto w-6">0</span>
                  </button>
                  <button class="flex gap-2.5 items-center self-stretch my-auto ml-4">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/8df020e4413c69e54d5736d88d081ca81823b90c2c9dd1ad60953818f49b14af?placeholderIfAbsent=true&apiKey=eb3002760c2a4e17b211fd544868da2b"
                      class="object-contain shrink-0 self-stretch my-auto aspect-[1.07] w-[15px]"
                      alt="Dislike"
                    />
                    <span class="self-stretch my-auto w-6">0</span>
                  </button>
                  <button class="self-stretch my-auto ml-4">Reply</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});
