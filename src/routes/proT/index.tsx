import { component$ } from '@builder.io/qwik';
import { MyProTest } from '~/components/creamm/MyProTest';
import { Sidebar } from '~/components/sidebar/Sidebar';

export default component$(() => {
  return (
    <>
    <div class="flex h-screen">
      <Sidebar/>
      <MyProTest class="flex-grow"/>
    </div>
    </>
  );
});
