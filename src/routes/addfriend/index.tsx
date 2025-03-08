import { component$, useSignal, $ } from '@builder.io/qwik';
import { Sidebar } from '~/components/sidebar/Sidebar';
import { useUserStore } from '~/store/store';

export default component$(() => { 
  const searchQuery = useSignal('');
  const isSearching = useSignal(false);
  const searchResults = useSignal([]);
  const hasSearched = useSignal(false);
  const { userId } = useUserStore();

  const handleSearch = $(async () => {
    if (!searchQuery.value.trim()) return;

    isSearching.value = true;
    hasSearched.value = true;
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
                requestSent
              }
            }
          `,
          variables: { query: searchQuery.value.trim(), userId: userId.value },
        }),
      });

      const result = await response.json();
      if (result.data?.searchUsers) {
        searchResults.value = result.data.searchUsers;
      }
    } catch (error) {
      console.error("❌ Failed to search users:", error);
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
              }
            }
          `,
          variables: { userId: userId.value, friendId },
        }),
      });

      const result = await response.json();
      if (result.data?.sendFriendRequest?.success) {
        console.log(`✅ Friend request sent to user ${friendId}`);
        searchResults.value = searchResults.value.map(user =>
          user.id === friendId ? { ...user, requestSent: true } : user
        ); // ✅ อัปเดต requestSent เป็น true
      } else {
        console.error("❌ Failed to send friend request");
      }
    } catch (error) {
      console.error("❌ Error sending friend request:", error);
    }
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
          
          <div class="mt-16 w-full flex flex-col items-center">
            <div class="relative w-3/4">
              <input 
                type="text" 
                class="w-full p-3 pl-6 pr-12 text-black rounded-xl" 
                placeholder="Search User"
                bind:value={searchQuery}
              />
              <img src="/image/search-icon.svg" width="30" height="30" 
                class="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" 
                onClick$={handleSearch}
              />
            </div>

            {/* ✅ แสดงข้อความเมื่อกด Search แล้วไม่พบผู้ใช้ */}
            {hasSearched.value && searchResults.value.length === 0 && !isSearching.value && (
              <div class="mt-2 text-red-500 text-sm">⚠️ No users found</div>
            )}
          </div>

          {/* แสดงผลลัพธ์การค้นหา */}
          {searchResults.value.length > 0 && (
            <div class="w-3/4 mx-auto mt-6 grid grid-cols-1 gap-4">
              {searchResults.value.map(user => (
                <div key={user.id} class="p-4 bg-gray-800 rounded-xl min-h-[60px] flex items-center justify-between text-gray-500">
                  <div class="flex items-center space-x-4">
                    <img src={user.profilePictureUrl || "/image/defaultProfile.svg"} width="40" height="40" class="rounded-full" />
                    <div class="flex flex-col">
                      <span class="font-semibold">{user.displayName}</span>
                      <span class="text-sm text-gray-400">{user.email}</span>
                    </div>
                  </div>
                  {user.requestSent ? (
                    <button class="px-4 py-2 bg-gray-500 text-white rounded-lg cursor-not-allowed" disabled>
                      Request Sent
                    </button>
                  ) : (
                    <button class="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick$={() => sendFriendRequest(user.id)}>
                      Send Request
                    </button>
                  )}

                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
});
