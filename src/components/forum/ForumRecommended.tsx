import { component$ } from "@builder.io/qwik";

export const ForumRecommended = component$(() => {
  return (
    <section class="flex overflow-hidden flex-col items-center px-20 pt-28 pb-48 w-full bg-white max-md:px-5 max-md:py-24 max-md:max-w-full">
      <div class="flex flex-col -mb-10 max-w-full w-[812px] max-md:mb-2.5">
        <h2 class="self-start ml-3.5 text-4xl font-semibold text-black max-md:max-w-full">
          Recommended from Medium
        </h2>

        <div class="mt-24 max-md:mt-10 max-md:mr-2 max-md:max-w-full">
          <div class="flex gap-5 max-md:flex-col">
            {[
              {
                image:
                  "f14a98772b34e17af36efe6d7ef21e2a7134c664979b99cf8f2b768e897774ac",
                title: "Laziness Does Not Exist",
                description:
                  "HOW DOES THE MACHINE READ IMAGES AND USE THEM IN COMPUTER VISION?",
              },
              {
                image:
                  "cd804dba5b6a4097f418178467373e0e3d566b3af25ec97e3a02f23a36ad69f4",
                title: "The End of Instagram ...",
                description:
                  "THOUSANDS OF ARTISTS QUIT AND LEAVE INSTAGRAM IN SEARCH OF G..",
              },
            ].map((article, index) => (
              <article key={index} class="w-6/12 max-md:ml-0 max-md:w-full">
                <div class="flex flex-col py-px mt-1.5 w-full max-md:mt-10">
                  <div class="overflow-hidden bg-white">
                    <img
                      loading="lazy"
                      src={`https://cdn.builder.io/api/v1/image/assets/TEMP/${article.image}?placeholderIfAbsent=true&apiKey=eb3002760c2a4e17b211fd544868da2b`}
                      class="object-contain w-full aspect-[2]"
                      alt={article.title}
                    />
                  </div>
                  <div class="flex gap-5 self-start mt-4 text-xs font-medium text-black whitespace-nowrap">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a7d39d8f9c50a968497b46dd8de2b29b766b46f3e04b5ee5246f161582b4010?placeholderIfAbsent=true&apiKey=eb3002760c2a4e17b211fd544868da2b"
                      class="object-contain shrink-0 aspect-square w-[35px]"
                      alt="Author avatar"
                    />
                    <span class="my-auto">Anonymous</span>
                  </div>
                  <h3 class="mt-2.5 mr-6 text-2xl font-bold text-black max-md:mr-2.5">
                    {article.title}
                  </h3>
                  <p class="mt-5 mr-7 text-sm font-light text-black max-md:mr-2.5">
                    {article.description}
                  </p>
                  <div class="flex gap-5 justify-between mt-7 w-full">
                    <div class="flex gap-7 text-xs text-black">
                      <time>Jan 2, 2025</time>
                      <div class="flex gap-2 whitespace-nowrap">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7fe7e2dbd5606b5d7be54e876401bacdf4a7cbbfd7584334121fb76c6ac919d4?placeholderIfAbsent=true&apiKey=eb3002760c2a4e17b211fd544868da2b"
                          class="object-contain shrink-0 self-start w-3 aspect-[1.09]"
                          alt="Views"
                        />
                        <span>130K</span>
                      </div>
                      <div class="flex gap-2 whitespace-nowrap">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b191f08be735ef1129aa03780d8c36c5e36763bb72b54cd5a643d9751d3d818c?placeholderIfAbsent=true&apiKey=eb3002760c2a4e17b211fd544868da2b"
                          class="object-contain shrink-0 self-start aspect-square w-[11px]"
                          alt="Comments"
                        />
                        <span>21</span>
                      </div>
                    </div>
                    <div class="flex gap-6 self-start">
                      <button>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c90ead00510e36aed68cece87c9379ead0c9ff345d244b3271fae8097a68053?placeholderIfAbsent=true&apiKey=eb3002760c2a4e17b211fd544868da2b"
                          class="object-contain shrink-0 aspect-square w-[9px]"
                          alt="Share"
                        />
                      </button>
                      <button>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3215062328a54b7ee8f2ab338169f66e531cd1b1dc0807b7af0cbf488ea7aefb?placeholderIfAbsent=true&apiKey=eb3002760c2a4e17b211fd544868da2b"
                          class="object-contain shrink-0 aspect-square w-[9px]"
                          alt="More options"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <hr class="shrink-0 mt-16 w-full h-px border border-solid border-neutral-200 max-md:mt-10" />

        <button class="self-start px-6 py-4 mt-10 text-sm text-black bg-white rounded-2xl border border-black border-solid max-md:px-5 max-md:ml-1">
          See more recommendations
        </button>
      </div>
    </section>
  );
});
