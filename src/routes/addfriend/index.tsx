import { component$, useSignal , $ } from '@builder.io/qwik';
import { Sidebar } from '~/components/sidebar/Sidebar';

export default component$(() => { 
  const searchQuery = useSignal('');
  const isSearching = useSignal(false);

  const handleSearch = $(() => {
    console.log('Search triggered', searchQuery.value);
    isSearching.value = true;
  });

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
              onClick$={handleSearch}
              />
          </div>

          {searchQuery.value && (
            <div class="w-3/4 mx-auto mt-6 grid grid-cols-1 gap-4">
              {[...Array(6)].map((_, index) => (
                <div key={index} class="p-4 bg-gray-800 rounded-xl min-h-[60px] flex items-center justify-center text-gray-500">
                {/* แสดงผลการค้นหาผู้ใช้ */}
                </div>
              ))}
            </div>
          )}

          {isSearching.value && !searchQuery.value && (
            <div class="w-3/4 mx-auto mt-6 text-center text-gray-500">
              No user found 
            </div>
          )}
        </section>
      </div>
    </>
  );
});