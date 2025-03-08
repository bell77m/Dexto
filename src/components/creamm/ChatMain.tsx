import { $, component$, useSignal } from "@builder.io/qwik";

export const ChatMain = component$(() => {
  const users = useSignal([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "David" },
    { id: 5, name: "Eve" },
    { id: 6, name: "Frank" },
    { id: 7, name: "Grace" },
    { id: 8, name: "Hannah" },
    { id: 9, name: "Isaac" },
    { id: 10, name: "Jack" },
    { id: 11, name: "Cream" },
    { id: 12, name: "Anna" },
  ]);

  const selectedUser = useSignal(users.value[0]);
  const messages = useSignal<{ userId: number; text: string; self: boolean; timestamp: number }[]>([]);
  const searchTerm = useSignal(""); // ใช้สำหรับค้นหารายชื่อผู้ใช้
  const messageText = useSignal(""); // ใช้สำหรับส่งข้อความ
  const fileInputRef = useSignal<HTMLInputElement | null>(null);

  const openFileDialog = $(() => {
    fileInputRef.value?.click();
  });

  const handleFileUpload = $((e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      messages.value = [
        ...messages.value,
        { userId: selectedUser.value.id, text: `📄 ${file.name}`, self: true, timestamp: Date.now() },
      ];
    }
  });

  const sendMessage = $(() => {
    if (messageText.value.trim()) {
      messages.value = [
        ...messages.value,
        { userId: selectedUser.value.id, text: messageText.value, self: true, timestamp: Date.now() },
      ];
      messageText.value = "";
    }
  });

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  return (
    <div class="flex h-screen w-full bg-gray-900 text-white">
      {/* Sidebar */}
      <aside class="w-1/3 bg-gray-800 p-4 flex flex-col">
        <h2 class="text-center font-semibold mb-4">Chat</h2>

        {/* Search Bar */}
        <div class="mb-2">
          <input
            class="w-full p-2 bg-gray-600 rounded-md"
            value={searchTerm.value}
            onInput$={(e) => (searchTerm.value = (e.target as HTMLInputElement).value)}
            placeholder="Search by name"
          />
        </div>

        {/* User List with Hidden Scroll */}
        <ul class="flex-1 overflow-y-auto scrollbar-hide">
          {users.value
            .filter((user) => user.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
            .map((user) => {
              const userMessages = messages.value.filter((msg) => msg.userId === user.id);
              const lastMessage = userMessages.length ? userMessages[userMessages.length - 1] : null;

              return (
                <li
                  key={user.id}
                  class={`flex items-center p-4 cursor-pointer rounded-md gap-4 ${
                    selectedUser.value.id === user.id ? "bg-gray-700" : ""
                  }`}
                  onClick$={() => (selectedUser.value = user)}
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff&size=40`}
                    alt={user.name}
                    class="w-10 h-10 rounded-full"
                  />

                  <div class="flex-1">
                    <div class="flex justify-between">
                      <span class="font-semibold">{user.name}</span>
                      {lastMessage && <span class="text-gray-400 text-sm">{formatTime(lastMessage.timestamp)}</span>}
                    </div>
                    <p class="text-gray-300 text-sm truncate">
                      {lastMessage ? lastMessage.text : "No messages yet"}
                    </p>
                  </div>
                </li>
              );
            })}
        </ul>
      </aside>

      {/* Chat Panel */}
      <section class="w-2/3 flex flex-col p-4">
        <h2 class="text-lg font-semibold border-b pb-2">{selectedUser.value.name}</h2>

        {/* Messages */}
        <div class="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.value
            .filter((msg) => msg.userId === selectedUser.value.id)
            .map((msg, index) => (
              <div key={index} class={`flex ${msg.self ? "justify-end" : "justify-start"}`}>
                <span class={`p-2 rounded-lg ${msg.self ? "bg-blue-600" : "bg-gray-700"}`}>
                  {msg.text}
                </span>
              </div>
            ))}
        </div>

        {/* Input + Attach File */}
        <div class="flex gap-2 border-t p-2">
          <button class="px-4 py-2 bg-gray-700 rounded-md" onClick$={openFileDialog}>
            📂
          </button>
          <input type="file" ref={(el) => (fileInputRef.value = el)} class="hidden" onChange$={handleFileUpload} />
          <input
            class="flex-1 p-2 bg-gray-800 rounded-md"
            value={messageText.value}
            onInput$={(e) => (messageText.value = (e.target as HTMLInputElement).value)}
            placeholder="Type a message..."
          />
          <button class="px-4 py-2 bg-blue-600 rounded-md" onClick$={sendMessage}>
            Send
          </button>
        </div>
      </section>
    </div>
  );
});
