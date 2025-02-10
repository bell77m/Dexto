import { component$ } from "@builder.io/qwik";

interface ProjectHeaderProps {
  title: string;
}

export const ProjectHeader = component$((props: ProjectHeaderProps) => {
  return (
    <div class="overflow-hidden px-16 pt-40 pb-32 w-full text-6xl font-semibold tracking-tighter leading-none text-center text-white bg-gray-900 max-md:px-5 max-md:pt-24 max-md:pb-28 max-md:max-w-full max-md:text-4xl">
      {props.title}
    </div>
  );
});
