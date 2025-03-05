import { component$ } from '@builder.io/qwik';
import { Sidebarmini } from '~/components/sidebarmini/Sidebarmini';

export default component$(() => {
  return (
    <>
      <div class="flex h-screen">
        <Sidebarmini/>
      </div>
    </>
  );
});
