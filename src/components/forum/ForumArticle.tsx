import { component$ } from "@builder.io/qwik";

export const ForumArticle = component$(() => {
  return (
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
            the top GPU configuration with 92 billion transistors, though the
            RTX 5090 is noted with 3,400 AI TOPS—so a little below the maximum,
            suggesting it's not quite using the full chip.
          </p>

          <p style="font-size: 18px;" class="mt-4">
            For comparison, the RTX 4090 has just over 82 FP32 shader TFLOPS
            from just over 76 billion transistors.
          </p>

          <p style="font-size: 18px;" class="mt-4">
            The RTX 50-series cards also feature GDDR7 memory, with a maximum of
            1.8 TB/s of memory bandwidth.
          </p>

          <h2 style="font-weight: 600; font-size: 36px;" class="mt-8">
            RTX 50-series Performance
          </h2>
          <p style="font-size: 18px;" class="mt-4">
            As for performance comparisons, Nvidia didn't give us much to go on
            during the stream, except the promise that the RTX 5090 will offer
            'twice the performance of the 4090' and the RTX 5070, a $549 card,
            will compete with the RTX 4090. Though DLSS 4 and new AI features
            are playing a huge role here, which also means the improvement might
            be more limited in games that don't support these features.
          </p>

          <p style="font-size: 18px;" class="mt-4">
            Nvidia shows how DLSS 4 (a feature called Multi Frame Generation, in
            fact) helps the RTX 5090 deliver double the frames as the RTX 4090
          </p>

          <p style="font-size: 18px;" class="mt-4">
            Here are some benchmark graphs, which Nvidia published alongside the
            announcement. What's important to note is this is not strictly
            comparing silicon here, but also the new DLSS Multi Frame Generation
            feature, which is enabled on the RTX 50-series.
          </p>
        </section>

        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/54f8281ece1161b7d3e494564d71a9f2492e6907580b4c88f816d6628b445bc4?placeholderIfAbsent=true&apiKey=eb3002760c2a4e17b211fd544868da2b"
          class="object-contain mt-16 w-full aspect-[1.52] max-md:mt-10 max-md:max-w-full"
          alt="Performance comparison"
        />

        <section class="mt-10 text-lg max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
          <p class="mb-4">
            The RTX 50-series features an AI Management Processor, new Blackwell
            Tensor Cores with FP4 support, DLSS 4, and Huang alluded to
            in-shader AI acceleration to help spread the workload of the new AI
            systems.
          </p>

          <p class="mb-4">
            There are RTX Neural Shaders, which allow the GPU's programmable
            shaders to run neural networks. Essentially, in-shader AI
            acceleration, alongside the Tensor Cores. These can be used to
            compress textures by up to seven times. As shown in the screenshots
            below.
          </p>

          <p class="mb-8">
            There is also the new DLSS Transformer model, which will power Ray
            Reconstruction, Super Resolution, and DLAA, and uses the same
            fundamental architecture design as AI models such as ChatGPT or
            Google Gemini. Nvidia claims these can improve temporal stability,
            reduce ghosting, and have higher detail in motion.
          </p>

          <h2 style="font-weight: 600; font-size: 36px;">
            RTX 50-series Price
          </h2>
          <ul class="mt-4 space-y-2">
            <li>
              <span style="font-weight: 600;">RTX 5090</span> — $1,999
              (Available January 30)
            </li>
            <li>
              <span style="font-weight: 600;">RTX5080</span> — $999 (Available
              January 30)
            </li>
            <li>
              <span style="font-weight: 600;">RTX 5070 Ti</span> — $749
              (Availability Starting in February)
            </li>
            <li>
              <span style="font-weight: 600;">RTX 5070</span> — $549
              (Availability Starting in February)
            </li>
          </ul>
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
  );
});
