import { component$ } from "@builder.io/qwik";

export interface QuickstartGuideProps {
  guides: string[];
}

export const QuickstartGuide = component$((props: QuickstartGuideProps) => {
  return (
    <div class="flex flex-col mt-12 ml-3.5 max-md:mt-10 max-md:ml-2.5">
      <div class="flex flex-col max-w-full w-[381px]">
        <div class="self-start text-2xl">Quickstart guides</div>
        <div class="flex flex-col justify-center px-3 py-11 mt-14 text-2xl tracking-tight leading-none text-center rounded-2xl border-2 border-solid border-white border-opacity-30 max-md:mt-10">
          <div class="flex flex-col min-h-[435px]">
            {props.guides.map((guide, index) => (
              <div
                key={index}
                class={`px-10 py-3.5 mt-12 max-w-full w-[358px] max-md:px-5 max-md:mt-10 ${
                  index === 0 ? "bg-white text-black rounded-xl" : ""
                }`}
              >
                {guide}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
