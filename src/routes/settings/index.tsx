import { component$ } from '@builder.io/qwik';
import { Sidebar } from '~/components/sidebar/Sidebar';
import { UserProfile } from '~/components/userProfile/UserProfile';

export default component$(() => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <UserProfile />
    </div>
  );
});
