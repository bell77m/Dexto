import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';
import { Sidebar } from '~/components/sidebar/Sidebar';

export default component$(() => {
  const searchQuery = useSignal('');
  const searchResults = useSignal([]);
  const isSearching = useSignal(false);

  const handleSearch = $(async () => {
    isSearching.value = true;
    try {
      const response = await fetch('http://dexto.com:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query SearchUsers($query: String!, $userId: Int!) {
              searchUsers(query: $query, userId: $userId) {
                id
                displayName
                email
                profilePictureUrl
                requestSent  # ✅ เพิ่ม requestSent
              }
            }
          `,
          variables: { query: searchQuery.value, userId: 1 },  // ✅ userId ที่ล็อกอิน
        }),
      });
  
      const result = await response.json();
      searchResults.value = result.data?.searchUsers || [];
    } catch (error) {
      console.error("Failed to fetch search results", error);
    } finally {
      isSearching.value = false;
    }
  });

  const sendFriendRequest = $(async (friendId: number) => {
    try {
      const response = await fetch('http://dexto.com:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation SendFriendRequest($userId: Int!, $friendId: Int!) {
              sendFriendRequest(userId: $userId, friendId: $friendId) {
                success
                message
              }
            }
          `,
          variables: { userId: 1, friendId }, // ✅ userId ที่ล็อกอิน
        }),
      });

      const result = await response.json();
      if (result.data?.sendFriendRequest.success) {
        searchResults.value = searchResults.value.map(user =>
          user.id === friendId ? { ...user, requestSent: true } : user
        );
      } else {
        alert(result.data?.sendFriendRequest.message || "Failed to send friend request.");
      }
    } catch (error) {
      console.error("Failed to send friend request", error);
    }
  });

  return (
    <div class="flex h-screen">
      <Sidebar />
      <section class="flex flex-col flex-grow items-start text-white bg-gray-900">
        <div class="flex items-center space-x-4">
          <img src="/image/add-friend.svg" width="30" height="30" class="mt-6 mx-9 ml-16" />
          <h1 class="text-3xl mt-4 text-center text-gray-400">Add Friend</h1>
        </div>
        <div class="w-full h-px mt-4 bg-gray-400"></div>

        {/* ค้นหาผู้ใช้ */}
        <div class="relative w-3/4 mx-auto mt-6">
          <input
            type="text"
            class="w-full p-3 pl-6 pr-12 text-black rounded-xl"
            placeholder="Search by name or email"
            bind:value={searchQuery}
          />
          <img
            src="/image/search-icon.svg"
            width="30"
            height="30"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick$={handleSearch}
          />
        </div>

        {/* แสดงผลการค้นหา */}
        {isSearching.value && <p class="text-center text-gray-400 mt-4">Searching...</p>}
        {searchResults.value.length > 0 && (
          <div class="w-3/4 mx-auto mt-6 grid grid-cols-1 gap-4">
            {searchResults.value.map((user) => (
              <div key={user.id} class="p-4 bg-gray-800 rounded-xl min-h-[60px] flex items-center justify-between text-gray-500">
                <div class="flex items-center space-x-4">
                  <img src={user.profilePictureUrl} width="40" height="40" class="rounded-full" />
                  <div>
                    <span class="font-bold">{user.displayName}</span>
                    <p class="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
                {user.requestSent ? (
                  <span class="text-green-400 font-bold">Request Sent!</span>
                ) : (
                  <button
                    class="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick$={() => sendFriendRequest(user.id)}
                  >
                    Send Request
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* {!isSearching.value && searchResults.value.length === 0 && searchQuery.value && (
          <p class="text-center text-gray-400 mt-4">No users found.</p>
        )} */}
      </section>
    </div>
  );
});
