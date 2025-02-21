import { component$ } from '@builder.io/qwik';
import { MyProject } from '~/components/creamm/MyProject';
import { Sidebar } from '~/components/sidebar/Sidebar';

export default component$(() => {
  return (
    <>
    <div class="flex h-screen">
      <Sidebar/>
      <MyProject class="flex-grow"/>
    </div>
    </>
  );
});
