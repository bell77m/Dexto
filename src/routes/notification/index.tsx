import { component$ } from '@builder.io/qwik';
import { Sidebar } from '~/components/sidebar/Sidebar';

export default component$(() => {
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
        </section>
      </div>
    </>
  );
});
