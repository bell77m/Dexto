import { component$ } from '@builder.io/qwik';
import { Sidebarmini } from '~/components/sidebarmini/Sidebarmini';

export default component$(() => {
  return (
    <>
      <div class="flex w-full h-screen bg-gray-900">
        <Sidebarmini/>
        <div class="w-[300px] flex flex-col font-medium bg-gray-900 border border-solid border-zinc-600">
          <div class="min-h-[255px] mt-2 rounded-xl flex justify-center px-6 py-4 text-xl font-bold text-zinc-400 bg-gray-800">
            Project
          </div>
          <div class="min-h-[655px] mt-1 rounded-xl flex justify-center px-6 py-4 text-xl font-bold text-zinc-400 bg-gray-800">
            Voice Chat
          </div>
        </div>
        {/* <div class="w-[1310px] flex flex-col font-medium bg-gray-900 border border-solid border-zinc-600"></div> */}
      </div>
    </>
  );
});
