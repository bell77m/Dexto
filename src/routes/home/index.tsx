import { component$ } from '@builder.io/qwik';
import { MessageSection } from '~/components/creamm/MessageSection';
import { Sidebar } from '~/components/sidebar/Sidebar';

export default component$(() => {
  return (
    <>
    <div class="flex h-screen">
    <Sidebar/>
    <MessageSection/>
    </div>
    </>
  );
});

