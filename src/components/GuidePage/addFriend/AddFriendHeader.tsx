import { component$ } from "@builder.io/qwik";

interface AddFriendHeaderProps {
  title: string;
}

export const AddFriendHeader = component$<AddFriendHeaderProps>(({ title }) => {
  return (
    <div class="overflow-hidden px-16 pt-32 pb-24 w-full text-6xl text-center font-semibold tracking-tighter leading-none text-white bg-gray-900 max-md:px-5 max-md:pt-24 max-md:pb-28 max-md:max-w-full max-md:text-4xl">
      {title}
    </div>
  );
});
