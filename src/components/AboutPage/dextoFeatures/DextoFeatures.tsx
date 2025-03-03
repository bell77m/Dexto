import { component$ } from "@builder.io/qwik";
import { DextoContent } from "./DextoContent";

export const DextoFeatures = component$(() => {
  const dextoContent = {
    title: "The Dexto way of doing things",
    subtitle: "Innovation at the Core",
    description: "At Dexto, innovation isn't just a buzzword—it's embedded in everything we do. We don't just build tools; we use them to build even better tools. By actively engaging with the products we create, we gain invaluable insights that drive constant improvement. If something doesn't meet our high standards, we take action—whether it's refining what we have or creating something new.",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/cbf407975ee70280237a78e7a4c65f6ccfe1f653b49c15096b7db29825eb715e?placeholderIfAbsent=true&apiKey=83086b8ef5ae4f9392edc247fd20d152",
    imageAlt: "Dexto Innovation Illustration"
  };

  return (
    <div class="flex overflow-hidden flex-col justify-center items-start px-16 py-36 w-full bg-gray-800 max-md:px-5 max-md:py-24 max-md:max-w-full">
      <div class="mb-0 w-full max-w-[1267px] max-md:mb-2.5 max-md:max-w-full">
        <DextoContent {...dextoContent} />
      </div>
    </div>
  );
});