import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useNavigate } from '@builder.io/qwik-city';
import { useUserStore } from "~/store/store";
import API_URL from "~/configURL/config";

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
  const lastNotifiedMessages = useSignal({});
  const navigate = useNavigate();

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
      // Check if this is the latest unnotified message for this friend
      const lastNotifiedMessageId = lastNotifiedMessages.value[friend.id];
      const newMessages = messages.value[friend.id]
        .filter(msg => msg.senderId !== userId.value && !msg.isRead);

      if (newMessages.length > 0) {
        const latestMessage = newMessages[newMessages.length - 1];
        
        // Only send notification if the latest message hasn't been notified before
        if (latestMessage.id !== lastNotifiedMessageId) {
          // Clean message text for notification (remove line breaks)
          const cleanMessage = message.replace(/\n/g, ' ');
          
          const notification = new Notification(`New message from ${friend.displayName}`, {
            body: cleanMessage.length > 50 ? cleanMessage.substring(0, 50) + '...' : cleanMessage,
            icon: friend.profilePictureUrl || "/image/defaultProfile.svg"
          });

          // Add click event to focus on the specific chat
          notification.onclick = () => {
            // Focus the browser window
            window.focus();

            // Select the friend and clear unread messages
            selectedFriend.value = friend;
            clearUnreadMessages(friend);
          };

          // Update the last notified message for this friend
          lastNotifiedMessages.value[friend.id] = latestMessage.id;
        }
      }
    }
  });

  // Mark messages as read
  const markMessagesAsRead = $((friendId) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation { markMessagesAsRead(userId: ${userId.value}, friendId: ${friendId}) }`
      }),
    })
      .then(() => {
        // Clear unread messages for this friend after marking as read
        unreadMessages.value[friendId] = 0;
      })
      .catch((error) => console.error("❌ ERROR: Marking messages as read failed!", error));
  });

  // Load friends and sort by latest message
  const loadFriends = $(() => {
    fetch(API_URL, {
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
    fetch(API_URL, {
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

        // Count unread messages that are not from the current user
        const newUnreadMessages = newMessages.filter(
          msg => msg.senderId !== userId.value && !msg.isRead
        );

        // Update unread messages
        if (newUnreadMessages.length > 0) {
          // Only show unread messages indicator if not in this friend's chat
          if (selectedFriend.value?.id !== friend.id) {
            unreadMessages.value[friend.id] = newUnreadMessages.length;
            
            // Send browser notification only for the latest new unread message
            sendBrowserNotification(friend, newUnreadMessages[newUnreadMessages.length - 1].message);
          } else {
            // If currently in this friend's chat, clear unread messages
            unreadMessages.value[friend.id] = 0;
            markMessagesAsRead(friend.id);
          }
        }

        messages.value[friend.id] = newMessages;

        // Update latest message for friend
        const latestMessage = newMessages[newMessages.length - 1];
        if (latestMessage) {
          // Store the original message with line breaks
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
      .catch((error) => {
        console.error("❌ ERROR: Loading messages failed!", error);
        navigate('/service-unavailable'); // เพิ่มการ route
      });
  });

  // Clear unread messages when a friend is selected
  const clearUnreadMessages = $((friend) => {
    if (unreadMessages.value[friend.id]) {
      // Mark messages as read on backend
      markMessagesAsRead(friend.id);
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

  // Process message text for preview in the sidebar
  const getMessagePreview = $((message: string) => {
    // Replace line breaks with spaces for preview
    const previewText = message.replace(/\n/g, ' ');
    return previewText.length > 30 ? previewText.slice(0, 30) + '...' : previewText;
  });

  // Send message and update database + UI
  const sendMessage = $(() => {
    if (!messageText.value.trim() || !selectedFriend.value) return;

    // Escape special characters for GraphQL query
    const escapedMessage = messageText.value
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n');

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation { sendMessage(userId: ${userId.value}, friendId: ${selectedFriend.value.id}, message: "${escapedMessage}") }`
      }),
    })
      .then(() => {
        messageText.value = "";
        loadMessages(selectedFriend.value); // Reload messages after sending
      })
      .catch((error) => {
        console.error("❌ ERROR: Sending message failed!", error);
        navigate('/service-unavailable'); // เพิ่มการ route
      });
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
            placeholder="Search ..." 
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
                        {getMessagePreview(friend.latestMessage)}
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
            // Split the message by newline characters to create separate lines
            const messageLines = msg.message.split('\n');
            
            return (
              <div key={index} class={`flex ${isUserMessage ? "justify-end" : "justify-start"} mb-3`}>
                <div class="max-w-[70%] relative">
                  {/* Message content with preserved line breaks */}
                  <div class={`relative p-3 rounded-xl whitespace-pre-wrap ${isUserMessage ? "bg-blue-600 text-white" : "bg-gray-700 text-white"}`}>
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
              }
              // Removed the Shift+Enter condition as it's unnecessary
              // Textarea will handle new lines naturally on Enter press
            }}
          />
          <button class="px-4 py-2 bg-blue-600 text-white rounded-lg" onClick$={() => sendMessage()}>Send</button>
        </div>
      </section>
    </div>
  );
});