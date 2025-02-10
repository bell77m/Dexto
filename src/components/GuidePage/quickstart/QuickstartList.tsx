import { component$ } from "@builder.io/qwik";
import { QuickstartItem } from "./QuickstartItem";
import type { QuickstartListProps } from "./types";

export const QuickstartList = component$((props: QuickstartListProps) => {
  return (
    <div class="flex flex-col justify-center px-3 py-11 mt-14 text-2xl tracking-tight leading-none text-center rounded-2xl border-2 border-solid border-white border-opacity-30 max-md:mt-10">
      <div class="flex flex-col min-h-[435px]">
        {props.items.map((item, index) => (
          <QuickstartItem
            key={index}
            title={item.title}
            isActive={index === 0}
          />
        ))}
      </div>
    </div>
  );
});
