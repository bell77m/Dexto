import { component$ } from "@builder.io/qwik";
import { Forum } from "~/components/forum/Forum";


export const forum = component$(() => {
  return (
    <div class="flex flex-col w-full">
      <Forum/>
    </div>
  );
});

export default forum;
