import { component$, useSignal, $ } from "@builder.io/qwik";
import { useUserStore } from "~/store/store";

export const ChatMain = component$(() => {
  const { userId } = useUserStore();
  const friends = useSignal([]);
  const selectedFriend = useSignal(null);
  const messages = useSignal([]);
  const searchTerm = useSignal("");
  const messageText = useSignal("");
  const fileInputRef = useSignal<HTMLInputElement | null>(null);

  // ✅ โหลดเฉพาะเพื่อนที่เป็นเพื่อนกัน (เหมือน Add Friend)
  const loadFriends = $(() => {
    console.log("📢 DEBUG: Loading friends...");

    fetch("http://dexto.com:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query { getFriends(userId: ${userId.value}) { id displayName profilePictureUrl requestSent requestReceived isFriend } }`
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("🔍 DEBUG: Friends Data ->", result.data?.getFriends);
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
        console.log("🔍 DEBUG: Messages Data ->", result.data?.getChatMessages);
        messages.value = result.data?.getChatMessages || [];
      })
      .catch((error) => console.error("❌ ERROR: Loading messages failed!", error));
  });

  // ✅ ส่งข้อความ
  const sendMessage = $(() => {
    if (!messageText.value.trim() || !selectedFriend.value) return;

    fetch("http://dexto.com:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation { sendMessage(user_id: ${userId.value}, friend_id: ${selectedFriend.value.id}, message: "${messageText.value}") }`
      }),
    })
      .then(() => {
        messageText.value = "";
        loadMessages();
      })
      .catch((error) => console.error("❌ ERROR: Sending message failed!", error));
  });

  // ✅ ส่งรูปภาพ
  const sendImage = $((imageUrl: string) => {
    if (!selectedFriend.value) return;

    fetch("http://dexto.com:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation { sendMessage(user_id: ${userId.value}, friend_id: ${selectedFriend.value.id}, image_url: "${imageUrl}") }`
      }),
    })
      .then(() => loadMessages())
      .catch((error) => console.error("❌ ERROR: Sending image failed!", error));
  });

  // ✅ อัปโหลดไฟล์
  const handleFileUpload = $((e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        sendImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  });

  // ✅ โหลดรายชื่อเพื่อนทันทีที่เปิดหน้า
  loadFriends();

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
                  <p class="text-gray-300 text-sm">
                    {friend.isFriend ? "✔️ Friend" : friend.requestReceived ? "📩 Request Received" : friend.requestSent ? "⏳ Pending" : ""}
                  </p>
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
              {msg.imageUrl ? (
                <img src={msg.imageUrl} class="w-40 rounded-lg" />
              ) : (
                <span class={`p-2 rounded-lg ${msg.senderId === userId.value ? "bg-blue-600" : "bg-gray-700"}`}>
                  {msg.message}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Input + Attach File */}
        <div class="flex gap-2 border-t p-2">
          <button class="px-4 py-2 bg-gray-700 rounded-md" onClick$={() => fileInputRef.value?.click()}>
            📂
          </button>
          <input type="file" ref={(el) => (fileInputRef.value = el)} class="hidden" onChange$={handleFileUpload} />
          <input class="flex-1 p-2 bg-gray-800 rounded-md" value={messageText.value} onInput$={(e) => (messageText.value = (e.target as HTMLInputElement).value)} placeholder="Type a message..." />
          <button class="px-4 py-2 bg-blue-600 rounded-md" onClick$={sendMessage}>Send</button>
        </div>
      </section>
    </div>
  );
});
