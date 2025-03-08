import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Notification } from '~/components/notification/notification';
import { Sidebar } from '~/components/sidebar/Sidebar';

export default component$(() => {
  const notifications = useSignal([]);

  useVisibleTask$(async () => {
    try {
      const response = await fetch('http://dexto.com:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query GetNotifications($userId: Int!) {
              getNotifications(userId: $userId) {
                id
                type
                senderId
                senderName
                senderEmail
                sentAt
                isRead
              }
            }
          `,
          variables: { userId: 2 }, // เปลี่ยนเป็น user ที่ล็อกอิน
        }),
      });

      const result = await response.json();
      notifications.value = result.data?.getNotifications || [];
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  });

  return (
    <div class="flex h-screen">
      <Sidebar />
      <section class="flex flex-col flex-grow items-start text-white bg-gray-900">
        <div class="flex items-center space-x-4">
          <img src="/image/notification.svg" width="30" height="30" class="mt-6 mx-9 ml-16" />
          <h1 class="text-3xl mt-4 text-center text-gray-400">Notification</h1>
        </div>
        <div class="w-full h-px mt-4 bg-gray-400"></div>
        <div class="max-w-[1200px] h-full ml-32 mt-7 p-3 overflow-y-auto scroll-smooth scrollbar-hidden">
          {notifications.value.length > 0 ? (
            notifications.value.map((noti) => (
              <Notification
                key={noti.id}
                title={noti.type === "friend_request" ? "Friend Request" : "Project Invite"}
                description={`From: ${noti.senderName} (${noti.senderEmail})`}
                image1={noti.type === "friend_request" ? "/image/add-friend.svg" : "/image/project.svg"}
                image2={`/image/user-${noti.senderId}.svg`}
              />
            ))
          ) : (
            <p class="text-gray-500 text-center mt-4">No notifications</p>
          )}
        </div>
      </section>
    </div>
  );
});
