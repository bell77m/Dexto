import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useUserStore } from "~/store/store";

export const ChatMain = component$(() => {
  const { userId } = useUserStore();
  const friends = useSignal([]);
  const selectedFriend = useSignal(null);
  const messages = useSignal([]);
  const messageText = useSignal("");
  const fileInputRef = useSignal<HTMLInputElement | null>(null);
  const scrollContainerRef = useSignal<HTMLDivElement | null>(null); // ✅ ใช้เพื่อให้ Scroll Auto

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

  // ✅ ฟังก์ชันสำหรับจัดรูปแบบเวลา
  const formatMessageTime = $((timestamp: string) => {
    if (!timestamp) return "";
    
    const date = new Date(timestamp);
    
    // จัดรูปแบบเวลา (HH:MM)
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  });

  // ✅ ใช้ MutationObserver เพื่อตรวจจับข้อความใหม่และ Scroll ลงสุด
  useVisibleTask$(() => {
    if (scrollContainerRef.value) {
      const observer = new MutationObserver(() => {
        scrollContainerRef.value!.scrollTop = scrollContainerRef.value!.scrollHeight;
      });

      observer.observe(scrollContainerRef.value, { childList: true, subtree: true });

      return () => observer.disconnect();
    }
  });

  // ✅ ส่งข้อความ และอัปเดต Database + UI ทันที
  const sendMessage = $(() => {
    if (!messageText.value.trim() || !selectedFriend.value) return;

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
        loadMessages();
      })
      .catch((error) => console.error("❌ ERROR: Sending message failed!", error));
  });

  // ✅ โหลดข้อความใหม่ทุก 2 วินาที (Real-time)
  useVisibleTask$(() => {
    const interval = setInterval(() => {
      if (selectedFriend.value) {
        loadMessages();
      }
    }, 2000);
    
    return () => clearInterval(interval);
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
              <li key={friend.id} class={`p-4 cursor-pointer rounded-md flex items-center gap-4 ${selectedFriend.value?.id === friend.id ? "bg-gray-700" : "hover:bg-gray-700"}`} onClick$={() => { selectedFriend.value = friend; loadMessages(); }}>
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
      <section class="w-2/3 flex flex-col p-4 bg-gray-900">
        <h2 class="text-lg font-semibold border-b border-gray-700 pb-2">{selectedFriend.value?.displayName || "Select a friend to start chat"}</h2>

        {/* Messages */}
        <div ref={scrollContainerRef} class="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.value.map((msg, index) => {
            const isUserMessage = msg.senderId === userId.value;
            return (
              <div key={index} class={`flex ${isUserMessage ? "justify-end" : "justify-start"} mb-3`}>
                <div class="max-w-[70%] relative">
                  {/* ข้อความ */}
                  <div class={`relative p-3 rounded-xl ${isUserMessage ? "bg-blue-600 text-white" : "bg-gray-700 text-white"}`}>
                    {msg.message}
                  </div>
                  
                  {/* เวลา */}
                  <div class={`absolute bottom-1 ${isUserMessage ? "left-[-45px]" : "right-[-45px]"}`}>
                    <span class="text-xs text-gray-400">
                      {formatMessageTime(msg.sentAt)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div class="flex gap-2 border-t border-gray-700 p-2 mt-3">
          <input
            bind:value={messageText}
            class="flex-1 p-2 bg-gray-800 rounded-lg focus:outline-none focus:border-blue-500 border border-gray-700"
            placeholder="Type a message..."
            onKeyDown$={(e) => { 
              if (e.key === 'Enter' && !e.shiftKey) { 
                e.preventDefault(); // ป้องกันขึ้นบรรทัดใหม่
                sendMessage(); 
              } 
            }}
          />
          <button class="px-4 py-2 bg-blue-600 text-white rounded-lg" onClick$={() => sendMessage()}>Send</button>
        </div>
      </section>
    </div>
  );
});