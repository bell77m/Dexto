import { component$, useSignal } from '@builder.io/qwik';
import { Sidebar } from '~/components/sidebar/Sidebar';

export default component$(() => { 
  const searchQuery = useSignal('');

  return (
    <>
      <div class="flex h-screen">
        <Sidebar/>
        <section class="flex flex-col flex-grow items-start text-white bg-gray-900">
          <div class="flex items-center space-x-4">
            <img src="/image/add-friend.svg" width="30" height="30" class="mt-6 mx-9 ml-16" />
            <h1 class="text-3xl mt-4 text-center text-gray-400">
              Add Friend
            </h1>
          </div>
          <div class="w-full h-px mt-4 bg-gray-400"></div>
          
          <div class="mt-16 w-full flex justify-center"></div>
          <div class="relative w-3/4 mx-auto">
            <input 
              type="text" 
              class="w-full p-3 pl-6 pr-12 text-black rounded-xl" 
              placeholder="Search User"
              bind:value={searchQuery}
              />
              <img src="/image/search-icon.svg" width="30" height="30" 
              class="absolute right-2 top-1/2 transform -translate-y-1/2" 
              />
          </div>
        </section>
      </div>
    </>
  );
});