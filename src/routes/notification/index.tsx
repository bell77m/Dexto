import { component$, useSignal, $ } from "@builder.io/qwik";
import { Sidebar } from "~/components/sidebar/Sidebar";
import { useUserStore } from "~/store/store";

export default component$(() => {
  const { userId } = useUserStore();
  const friendRequests = useSignal([]); // ✅ เก็บรายการคำขอที่ได้รับ

  const fetchFriendRequests = $(async () => {
    try {
      const response = await fetch('http://dexto.com:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query GetFriendRequests($userId: Int!) {
              getFriendRequests(userId: $userId) {
                id
                sender {
                  id
                  displayName
                  email
                  profilePictureUrl
                }
              }
            }
          `,
          variables: { userId: userId.value },
        }),
      });

      const result = await response.json();
      if (result.data?.getFriendRequests) {
        friendRequests.value = result.data.getFriendRequests;
      }
    } catch (error) {
      console.error("❌ Failed to fetch friend requests:", error);
    }
  });

  // ✅ โหลดรายการคำขอเมื่อ Component ถูกโหลด
  useSignal(() => fetchFriendRequests());

  const handleAccept = $(async (requestId: number) => {
    try {
      const response = await fetch('http://dexto.com:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation AcceptFriendRequest($requestId: Int!) {
              acceptFriendRequest(requestId: $requestId)
            }
          `,
          variables: { requestId },
        }),
      });

      const result = await response.json();
      if (result.data?.acceptFriendRequest) {
        friendRequests.value = friendRequests.value.filter(req => req.id !== requestId);
      }
    } catch (error) {
      console.error("❌ Failed to accept request:", error);
    }
  });

  const handleReject = $(async (requestId: number) => {
    try {
      const response = await fetch('http://dexto.com:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation RejectFriendRequest($requestId: Int!) {
              rejectFriendRequest(requestId: $requestId)
            }
          `,
          variables: { requestId },
        }),
      });

      const result = await response.json();
      if (result.data?.rejectFriendRequest) {
        friendRequests.value = friendRequests.value.filter(req => req.id !== requestId);
      }
    } catch (error) {
      console.error("❌ Failed to reject request:", error);
    }
  });

  return (
    <>
      <div class="flex h-screen">
        <Sidebar />
        <section class="flex flex-col flex-grow items-start text-white bg-gray-900">
          <div class="flex items-center space-x-4">
            <img src="/image/notification.svg" width="30" height="30" class="mt-6 mx-9 ml-16" />
            <h1 class="text-3xl mt-4 text-center text-gray-400">Friend Requests</h1>
          </div>
          <div class="w-full h-px mt-4 bg-gray-400"></div>

          {/* ✅ แสดงรายการคำขอที่ได้รับ */}
          <div class="w-3/4 mx-auto mt-6 grid grid-cols-1 gap-4">
            {friendRequests.value.length > 0 ? (
              friendRequests.value.map(request => (
                <div key={request.id} class="p-4 bg-gray-800 rounded-xl flex items-center justify-between text-gray-500">
                  <div class="flex items-center space-x-4">
                    <img src={request.sender.profilePictureUrl || "/image/defaultProfile.svg"} width="40" height="40" class="rounded-full" />
                    <div class="flex flex-col">
                      <span class="font-semibold">{request.sender.displayName}</span>
                      <span class="text-sm text-gray-400">{request.sender.email}</span>
                    </div>
                  </div>
                  <div class="flex space-x-2">
                    <button class="px-4 py-2 bg-green-500 text-white rounded-lg" onClick$={() => handleAccept(request.id)}>
                      Accept
                    </button>
                    <button class="px-4 py-2 bg-red-500 text-white rounded-lg" onClick$={() => handleReject(request.id)}>
                      Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div class="text-gray-400 text-center w-full mt-6">No friend requests</div>
            )}
          </div>
        </section>
      </div>
    </>
  );
});
