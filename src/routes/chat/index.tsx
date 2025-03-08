import { component$ } from '@builder.io/qwik';
import { ChatMain } from '~/components/Chat/ChatMain';
import { Sidebar } from '~/components/sidebar/Sidebar';

export default component$(() => {
  return (
    <>
    <div class="flex h-screen">
      <Sidebar/>
      <ChatMain class="flex-grow"/>
    </div>
    </>
  );
});