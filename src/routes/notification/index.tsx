import { component$ } from '@builder.io/qwik';
import { Notification } from '~/components/notification/notification';
import { Sidebar } from '~/components/sidebar/Sidebar';

export default component$(() => {
  const notiData = [
    {
      id: 1,
      title: "Project Invite",
      description: "Sommeone has invite you to project",
      image1: "/image/project.svg",
      image2: "/image/minnie.svg"
    },
    {
      id: 2,
      title: "Friend Request",
      description: "Sommeone want to be your friend",
      image1: "/image/add-friend.svg",
      image2: "/image/donaldduck.svg"
    },
    {
      id: 3,
      title: "Project Invite",
      description: "Sommeone has invite you to project",
      image1: "/image/project.svg",
      image2: "/image/minnie.svg"
    },
    {
      id: 4,
      title: "Friend Request",
      description: "Sommeone want to be your friend",
      image1: "/image/add-friend.svg",
      image2: "/image/donaldduck.svg"
    },
    {
      id: 5,
      title: "Project Invite",
      description: "Sommeone has invite you to project",
      image1: "/image/project.svg",
      image2: "/image/minnie.svg"
    }
  ]

  return (
    <>
      <div class="flex h-screen">
        <Sidebar/>
        <section class="flex flex-col flex-grow items-start text-white bg-gray-900">
          <div class="flex items-center space-x-4">
            <img src="/image/notification.svg" width="30" height="30" class="mt-6 mx-9 ml-16" />
            <h1 class="text-3xl mt-4 text-center text-gray-400">
              Notification
            </h1>
          </div>
          <div class="w-full h-px mt-4 bg-gray-400"></div>
          <div class="max-w-[1200px] h-full ml-32 mt-7 p-3 overflow-y-auto scroll-smooth">
          {notiData.map((item) => (
            <Notification key={item.id} {...item} />
          ))}
          </div>
        </section>
      </div>
    </>
  );
});
