import { $, component$, useSignal } from "@builder.io/qwik";

export const ChatMain = component$(() => {
  const users = useSignal([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ]);

  const selectedUser = useSignal(users.value[0]);
  const messages = useSignal<{ userId: number; text: string; self: boolean }[]>([]);
  const searchTerm = useSignal(""); // This will store the search input

  // Filtered users based on the search term
  const filteredUsers = useSignal(users.value);

  // Function to filter users based on the search term
  const filterUsers = $(() => {
    const term = searchTerm.value.toLowerCase();
    filteredUsers.value = users.value.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.id.toString().includes(term)
    );
  });

  return (
    <div class="flex h-screen w-full bg-gray-900 text-white">
      {/* Sidebar */}
      <aside class="w-1/2 bg-gray-800 p-4 overflow-y-auto">
        <h2 class="text-center font-semibold mt-4 mb-8">Chats</h2>

        {/* Search */}
        <div class="flex gap-2 pb-2">
          <input
            class="flex-1 p-2 bg-gray-600 rounded-md"
            value={searchTerm.value}
            onInput$={() => filterUsers()} // Trigger filter on input change
            placeholder="Search by name or ID"
          />
        </div>

        {/* Display filtered users */}
        <ul>
          {filteredUsers.value.map((user) => (
            <li
              key={user.id}
              class={`p-8 cursor-pointer rounded-md ${
                selectedUser.value.id === user.id ? "bg-gray-700" : ""
              }`}
              onClick$={() => (selectedUser.value = user)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Chat Panel */}
      <section class="w-1/2 flex flex-col p-4">
        <h2 class="text-lg font-semibold border-b pb-2">
          {selectedUser.value.name}
        </h2>

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

        {/* Input */}
        <div class="flex gap-2 border-t p-2">
          <input
            class="flex-1 p-2 bg-gray-800 rounded-md"
            value={searchTerm.value}
            onInput$={(e) => (searchTerm.value = (e.target as HTMLInputElement).value)}
            placeholder="Type a message..."
          />
          <button
            class="px-4 py-2 bg-blue-600 rounded-md"
            onClick$={() => {
              if (searchTerm.value.trim()) {
                messages.value = [
                  ...messages.value,
                  { userId: selectedUser.value.id, text: searchTerm.value, self: true },
                ];
                searchTerm.value = "";
              }
            }}
          >
            Send
          </button>
        </div>
      </section>
    </div>
  );
});
