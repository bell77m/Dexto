import { component$ } from "@builder.io/qwik";

interface QuickstartGuideProps {
  guides: string[];
}

export const QuickstartGuide = component$<QuickstartGuideProps>(
  ({ guides }) => {
    return (
      <div class="flex flex-col w-[370px] justify-center px-3 py-11 mt-14 text-2xl tracking-tight leading-none text-center text-white rounded-2xl border-2 border-solid border-white border-opacity-30 max-md:mt-10">
        <div class="flex flex-col min-h-[435px]">
          {guides.map((guide, index) => (
            <div
              key={index}
              class={`flex flex-col max-w-full ${
                index === 0 ? "text-gray-900" : "text-white"
              } w-[358px] ${index !== 0 ? "mt-12 max-md:mt-10" : ""}`}
            >
              <div
                class={`px-9 py-3.5 ${
                  index === 0 ? "bg-white" : ""
                } rounded-xl max-md:px-5`}
              >
                {guide}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
