import { component$ } from "@builder.io/qwik";

export interface QuickstartGuideProps {
  guides: string[];
}

export const QuickstartGuide = component$((props: QuickstartGuideProps) => {
  return (
    <div class="flex flex-col w-[370px] justify-center px-3 py-11 mt-14 text-2xl tracking-tight leading-none text-center text-white rounded-2xl border-2 border-solid border-white border-opacity-30 max-md:mt-10">
      <div class="flex flex-col min-h-[435px]">
        {props.guides.map((item, index) => (
          <div
            key={index}
            class={`px-16 py-3.5 mt-12 max-w-full w-[358px] max-md:px-5 max-md:mt-10 ${
              item === "How to add friend"
                ? "text-gray-900 bg-white rounded-xl"
                : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
});
