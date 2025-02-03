import { component$ } from "@builder.io/qwik";
import { DextoHistory } from "./DextoHistory";
import { DextoLogo } from "./DextoLogo";

export const DextoContainer = component$(() => {
  const historyData = {
    title: "Dexto History",
    description: "We have come a long way since we first started back in 2024. Each year sees us continue to grow and help more developers."
  };

  return (
    <div class="flex overflow-hidden flex-col justify-center items-center px-16 py-36 w-full bg-gray-900 max-md:px-5 max-md:py-24 max-md:max-w-full">
      <div class="flex gap-10 items-center -mb-7 w-full max-w-[1053px] max-md:mb-2.5 max-md:max-w-full">
        <DextoLogo />
        <DextoHistory title={historyData.title} description={historyData.description} />
      </div>
    </div>
  );
});