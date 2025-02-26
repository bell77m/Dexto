import { component$ } from '@builder.io/qwik';
import { MyProject } from '~/components/creamm/MyProject';
import { Sidebar } from '~/components/sidebar/Sidebar';

export default component$(() => {
  return (
    <>
    <div class="flex h-screen w-full overflow-hidden">
      <Sidebar/>
      <MyProject class="flex-grow"/>
    </div>
    </>
  );
});
