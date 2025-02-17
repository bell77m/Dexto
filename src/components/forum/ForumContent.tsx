import { component$ } from "@builder.io/qwik";

export const ForumContent = component$(() => {
  return (
    <main class="flex overflow-hidden flex-col justify-center items-center px-20 py-24 w-full bg-white max-md:px-5 max-md:pt-24 max-md:max-w-full">
      <article class="flex flex-col max-w-full w-[808px]">
        <h1 class="self-start text-5xl font-bold text-black max-md:max-w-full max-md:text-4xl">
          Nvidia announces the RTX 50 series
        </h1>

        <p class="mt-12 mr-20 text-2xl font-light text-black max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
          Nvidia has announced the RTX 50-series, codename Blackwell, at CES
          2025.
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
          <div class="flex gap-10 items-start text-xl text-black whitespace-nowrap">
            <div class="flex gap-10 text-center">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/23a5d5cc4b071d2551bf7bc1f863b5f8c46bcc14eb8be14af0ac67a916ce5ead?placeholderIfAbsent=true&apiKey=eb3002760c2a4e17b211fd544868da2b"
                class="object-contain shrink-0 self-start aspect-[1.05] w-[22px]"
                alt="Like icon"
              />
              <span>0</span>
            </div>
            <div class="flex gap-6">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ec05003894a11b007c4984e9ab9f45205fb2bbd37fb9321d704bfd3cc5fd31a5?placeholderIfAbsent=true&apiKey=eb3002760c2a4e17b211fd544868da2b"
                class="object-contain shrink-0 aspect-square w-[22px]"
                alt="Comment icon"
              />
              <span>
                30
                <br />
              </span>
            </div>
          </div>
          <div class="flex gap-10 justify-between items-center self-start">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ee4f71b98a44e40ef7695bb29475b92b2bac48b0b1a7467a50a784b4a1c8e0f?placeholderIfAbsent=true&apiKey=eb3002760c2a4e17b211fd544868da2b"
              class="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
              alt="Share icon"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c6850bd091c506131b6983a50e78dc7c75ba278969bb0be0a571b33973923b0c?placeholderIfAbsent=true&apiKey=eb3002760c2a4e17b211fd544868da2b"
              class="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
              alt="More options"
            />
          </div>
        </div>
      </article>
    </main>
  );
});
