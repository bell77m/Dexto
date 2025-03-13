import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useUserStore } from "~/store/store";

export const ChatMain = component$(() => {
  const { userId } = useUserStore();
  const friends = useSignal([]);
  const originalFriends = useSignal([]);
  const selectedFriend = useSignal(null);
  const messages = useSignal({});
  const messageText = useSignal("");
  const fileInputRef = useSignal<HTMLInputElement | null>(null);
  const scrollContainerRef = useSignal<HTMLDivElement | null>(null);
  const searchQuery = useSignal("");
  const unreadMessages = useSignal({});

  // Request notification permission
  const requestNotificationPermission = $(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted');
        }
      });
    }
  });

  // Send browser notification
  const sendBrowserNotification = $((friend, message) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`New message from ${friend.displayName}`, {
        body: message.length > 50 ? message.substring(0, 50) + '...' : message,
        icon: friend.profilePictureUrl || "/image/defaultProfile.svg"
      });
    }
  });

  // Load friends and sort by latest message
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
          friends.value = result.data.getFriends.sort((a, b) => {
            const timestampA = a.latestMessageTime ? new Date(a.latestMessageTime).getTime() : 0;
            const timestampB = b.latestMessageTime ? new Date(b.latestMessageTime).getTime() : 0;
            return timestampB - timestampA;
          });

          originalFriends.value = [...friends.value];

          // Load messages for all friends
          friends.value.forEach((friend) => {
            loadMessages(friend);
          });
        }
      })
      .catch((error) => console.error("❌ ERROR: Loading friends failed!", error));
  });

  // Search friends function
  const searchFriends = $(() => {
    if (!searchQuery.value.trim()) {
      friends.value = originalFriends.value;
      return;
    }

    const query = searchQuery.value.toLowerCase().trim();
    friends.value = originalFriends.value.filter(friend => 
      friend.displayName.toLowerCase().includes(query)
    );
  });

  // Load messages for a given friend
  const loadMessages = $((friend) => {
    fetch("http://dexto.com:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query { getChatMessages(userId: ${userId.value}, friendId: ${friend.id}) { id senderId message imageUrl isRead sentAt } }`
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        const newMessages = result.data?.getChatMessages || [];
        const previousMessages = messages.value[friend.id] || [];

        // Check for new messages
        const newUnreadMessages = newMessages.filter(
          msg => msg.senderId !== userId.value && 
          !previousMessages.some(prevMsg => prevMsg.id === msg.id)
        );

        // Update unread messages
        if (newUnreadMessages.length > 0) {
          unreadMessages.value[friend.id] = (unreadMessages.value[friend.id] || 0) + newUnreadMessages.length;
          
          // Send browser notification for the first new message
          if (selectedFriend.value?.id !== friend.id) {
            sendBrowserNotification(friend, newUnreadMessages[0].message);
          }
        }

        messages.value[friend.id] = newMessages;

        // Update latest message for friend
        const latestMessage = newMessages[newMessages.length - 1];
        if (latestMessage) {
          friend.latestMessage = latestMessage.message;
          friend.latestMessageTime = latestMessage.sentAt;

          // Re-sort friends list based on latest message
          friends.value = [...friends.value].sort((a, b) => {
            const timestampA = a.latestMessageTime ? new Date(a.latestMessageTime).getTime() : 0;
            const timestampB = b.latestMessageTime ? new Date(b.latestMessageTime).getTime() : 0;
            return timestampB - timestampA;
          });
        }
      })
      .catch((error) => console.error("❌ ERROR: Loading messages failed!", error));
  });

  // Clear unread messages when a friend is selected
  const clearUnreadMessages = $((friend) => {
    if (unreadMessages.value[friend.id]) {
      unreadMessages.value[friend.id] = 0;
    }
  });

  // Format message timestamp
  const formatMessageTime = $((timestamp: string) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  });

  // Scroll to bottom when new messages are added
  useVisibleTask$(() => {
    if (scrollContainerRef.value) {
      const observer = new MutationObserver(() => {
        scrollContainerRef.value!.scrollTop = scrollContainerRef.value!.scrollHeight;
      });

      observer.observe(scrollContainerRef.value, { childList: true, subtree: true });

      return () => observer.disconnect();
    }
  });

  // Send message and update database + UI
  const sendMessage = $(() => {
    if (!messageText.value.trim() || !selectedFriend.value) return;

    fetch("http://dexto.com:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation { sendMessage(userId: ${userId.value}, friendId: ${selectedFriend.value.id}, message: "${messageText.value}") }`
      }),
    })
      .then(() => {
        messageText.value = "";
        loadMessages(selectedFriend.value); // Reload messages after sending
      })
      .catch((error) => console.error("❌ ERROR: Sending message failed!", error));
  });

  // Load new messages every 2 seconds (Real-time) for all friends
  useVisibleTask$(() => {
    // Request notification permission on component mount
    requestNotificationPermission();

    const interval = setInterval(() => {
      friends.value.forEach((friend) => {
        loadMessages(friend);
      });
    }, 2000);

    return () => clearInterval(interval);
  });

  // Load friends when the chat page is loaded
  useVisibleTask$(() => loadFriends());

  return (
    <div class="flex h-screen w-[1421px] bg-gray-900 text-white">
      {/* Sidebar รายชื่อเพื่อน */}
      <aside class="w-1/3 bg-gray-800 p-4 flex flex-col">
        <h2 class="text-center font-semibold mb-4">Chat</h2>
        
        {/* Friend Search Input */}
        <div class="mb-4">
          <input 
            type="text" 
            placeholder="ค้นหาเพื่อน..." 
            value={searchQuery.value}
            onInput$={(e) => {
              searchQuery.value = (e.target as HTMLInputElement).value;
              searchFriends();
            }}
            class="w-full p-2 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <ul class="flex-1 overflow-y-auto">
          {friends.value.length === 0 ? (
            <p class="text-center text-gray-400">No friends found</p>
          ) : (
            friends.value.map((friend) => (
              <li 
                key={friend.id} 
                class={`p-4 cursor-pointer rounded-md flex items-center gap-4 relative ${selectedFriend.value?.id === friend.id ? "bg-gray-700" : "hover:bg-gray-700"}`} 
                onClick$={() => { 
                  selectedFriend.value = friend; 
                  clearUnreadMessages(friend);
                }}
              >
                <img src={friend.profilePictureUrl || "/image/defaultProfile.svg"} class="w-10 h-10 rounded-full" />
                <div class="flex-1">
                  <span class="font-semibold">{friend.displayName}</span>
                  {friend.latestMessage && (
                    <div class="text-xs text-gray-400 flex items-center gap-2">
                      <p class="flex-1 truncate max-w-[calc(100%-50px)]">
                        {friend.latestMessage.length > 30
                          ? friend.latestMessage.slice(0, 30) + '...'
                          : friend.latestMessage}
                      </p>
                      <p>{friend.latestMessageTime && formatMessageTime(friend.latestMessageTime)}</p>
                    </div>
                  )}
                </div>
                {/* Unread message indicator */}
                {unreadMessages.value[friend.id] > 0 && (
                  <div class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {unreadMessages.value[friend.id]}
                  </div>
                )}
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
          {selectedFriend.value && messages.value[selectedFriend.value.id]?.map((msg, index) => {
            const isUserMessage = msg.senderId === userId.value;
            return (
              <div key={index} class={`flex ${isUserMessage ? "justify-end" : "justify-start"} mb-3`}>
                <div class="max-w-[70%] relative">
                  {/* Message content */}
                  <div class={`relative p-3 rounded-xl break-words whitespace-pre-wrap ${isUserMessage ? "bg-blue-600 text-white" : "bg-gray-700 text-white"}`}>
                    {msg.message}
                  </div>
                  
                  {/* Time */}
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
          <textarea
            value={messageText.value}
            onInput$={(e) => { messageText.value = (e.target as HTMLTextAreaElement).value; }}
            class="flex-1 p-2 bg-gray-800 rounded-lg focus:outline-none focus:border-blue-500 border border-gray-700 resize-none h-12"
            placeholder="Type a message..."
            onKeyDown$={(e) => { 
              if (e.key === 'Enter' && !e.shiftKey) { 
                e.preventDefault(); 
                sendMessage(); 
              } else if (e.key === 'Enter' && e.shiftKey) {
                // Allow new line on Shift + Enter
                messageText.value += '\n';
              }
            }}
          />
          <button class="px-4 py-2 bg-blue-600 text-white rounded-lg" onClick$={() => sendMessage()}>Send</button>
        </div>
      </section>
    </div>
  );
});