import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useUserStore } from "~/store/store";

export const ChatMain = component$(() => {
  const { userId } = useUserStore();
  const friends = useSignal([]);
  const selectedFriend = useSignal(null);
  const messages = useSignal([]);
  const messageText = useSignal("");
  const fileInputRef = useSignal<HTMLInputElement | null>(null);

  // ✅ โหลดเพื่อนที่เป็นเพื่อนกัน
  const loadFriends = $(() => {
    fetch("http://dexto.com:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query { getFriends(userId: ${userId.value}) { id displayName profilePictureUrl isFriend } }`
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data?.getFriends) {
          friends.value = [...result.data.getFriends];
        }
      })
      .catch((error) => console.error("❌ ERROR: Loading friends failed!", error));
  });

  // ✅ โหลดข้อความแชทของเพื่อนที่เลือก
  const loadMessages = $(() => {
    if (!selectedFriend.value) return;
    fetch("http://dexto.com:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query { getChatMessages(userId: ${userId.value}, friendId: ${selectedFriend.value.id}) { id senderId message imageUrl isRead sentAt } }`
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        messages.value = result.data?.getChatMessages || [];
      })
      .catch((error) => console.error("❌ ERROR: Loading messages failed!", error));
  });

  // ✅ ส่งข้อความ และอัปเดต Database + UI ทันที
  const sendMessage = $(() => {
    if (!messageText.value.trim() ) return;

    fetch("http://dexto.com:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation {
          sendMessage(userId: ${userId.value}, 
          friendId: ${selectedFriend.value.id}, 
          message: "${messageText.value}")
        }`
      }),
    })
      .then(() => {
        messageText.value = "";
        loadMessages(); // ✅ UI อัปเดตทันที
      })
      .catch((error) => console.error("❌ ERROR: Sending message failed!", error));
  });

  // ✅ โหลดข้อความใหม่ทุก 2 วินาที (Real-time)
  useVisibleTask$(() => {
    setInterval(() => {
      if (selectedFriend.value) {
        loadMessages();
      }
    }, 2000);
  });

  // ✅ โหลดเพื่อนเมื่อเปิดหน้า Chat
  useVisibleTask$(() => loadFriends());

  return (
    <div class="flex h-screen w-full bg-gray-900 text-white">
      {/* Sidebar รายชื่อเพื่อน */}
      <aside class="w-1/3 bg-gray-800 p-4 flex flex-col">
        <h2 class="text-center font-semibold mb-4">Chat</h2>
        <ul class="flex-1 overflow-y-auto">
          {friends.value.length === 0 ? (
            <p class="text-center text-gray-400">No friends found</p>
          ) : (
            friends.value.map((friend) => (
              <li key={friend.id} class={`p-4 cursor-pointer rounded-md flex items-center gap-4 ${selectedFriend.value?.id === friend.id ? "bg-gray-700" : ""}`} onClick$={() => { selectedFriend.value = friend; loadMessages(); }}>
                <img src={friend.profilePictureUrl || "/image/defaultProfile.svg"} class="w-10 h-10 rounded-full" />
                <div class="flex-1">
                  <span class="font-semibold">{friend.displayName}</span>
                </div>
              </li>
            ))
          )}
        </ul>
      </aside>

      {/* Chat Panel */}
      <section class="w-2/3 flex flex-col p-4">
        <h2 class="text-lg font-semibold border-b pb-2">{selectedFriend.value?.displayName || "Select a friend to start chat"}</h2>

        {/* Messages */}
        <div class="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.value.map((msg, index) => (
            <div key={index} class={`flex ${msg.senderId === userId.value ? "justify-end" : "justify-start"}`}>
              <span class={`p-2 rounded-lg ${msg.senderId === userId.value ? "bg-blue-600" : "bg-gray-700"}`}>
                {msg.message}
              </span>
            </div>
          ))}
        </div>

        {/* Input */}
        <div class="flex gap-2 border-t p-2">
          <input bind:value={messageText} class="flex-1 p-2 bg-gray-800 rounded-md" placeholder="Type a message..." />
          <button class="px-4 py-2 bg-blue-600 rounded-md" onClick$={sendMessage}>Send</button>
        </div>
      </section>
    </div>
  );
});
