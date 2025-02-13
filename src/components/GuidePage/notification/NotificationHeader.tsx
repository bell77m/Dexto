import { component$ } from "@builder.io/qwik";

export interface NotificationHeaderProps {
  title: string;
}

export const NotificationHeader = component$(
  (props: NotificationHeaderProps) => {
    return (
      <header class="overflow-hidden text-center px-16 pt-32 pb-24 w-full text-6xl font-semibold tracking-tighter leading-none text-white whitespace-nowrap bg-gray-900 max-md:px-5 max-md:pt-24 max-md:pb-28 max-md:max-w-full max-md:text-4xl">
        {props.title}
      </header>
    );
  }
);
