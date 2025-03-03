import { component$ } from "@builder.io/qwik";
import { DextoHistoryProps } from ".";

export const DextoHistory = component$((props: DextoHistoryProps) => {
  return (
    <div class="flex flex-col self-stretch pr-6 pb-1.5 my-auto text-white rounded-none min-w-[240px] w-[556px] max-md:max-w-full">
      <div class="self-start text-4xl font-bold">{props.title}</div>
      <div class="mt-9 text-2xl font-light max-md:max-w-full">
        {props.description}
      </div>
    </div>
  );
});