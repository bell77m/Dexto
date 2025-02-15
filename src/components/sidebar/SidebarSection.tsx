import { component$, Slot } from "@builder.io/qwik";

type SidebarSectionProps = {
  title?: string;
};

export const SidebarSection = component$((props: SidebarSectionProps) => {
  return (
    <div class="flex flex-col px-6 pt-4 pb-4 w-full text-sm tracking-tight leading-none whitespace-nowrap min-h-[147px] text-neutral-400">
      {props.title && (
        <div class="gap-2 px-3 mb-3 w-full text-xs tracking-wide leading-tight uppercase">
          {props.title}
        </div>
      )}
      <Slot />
    </div>
  );
});