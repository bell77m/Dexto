import { component$ } from "@builder.io/qwik";

interface QuickstartGuideProps {
  items: string[];
}

export const QuickstartGuide = component$<QuickstartGuideProps>(({ items }) => {
  return (
    <div class="flex flex-col justify-center px-3 py-11 mt-14 text-2xl tracking-tight leading-none text-center rounded-2xl border-2 border-solid border-white border-opacity-30 max-md:mt-10">
      <div class="flex flex-col min-h-[435px]">
        {items.map((item, index) => (
          <div
            key={index}
            class={`px-16 py-3.5 max-w-full w-[358px] max-md:px-5 ${
              index > 0 ? "mt-12 max-md:mt-10" : ""
            } ${
              index === items.length - 1
                ? "flex flex-col text-gray-900 whitespace-nowrap"
                : ""
            }`}
          >
            {index === items.length - 1 ? (
              <div class="px-9 py-3.5 bg-white rounded-xl max-md:px-5">
                {item}
              </div>
            ) : (
              item
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
