import { component$ } from '@builder.io/qwik';
import { Footer } from '~/components/footer/Footer';
import { AddFriendPage } from '~/components/GuidePage/addFriend/AddFriendPage';
import { HowToAddFriend } from '~/components/GuidePage/HowToAddFriend/HowToAddFriend';
import { Navigation } from '~/components/navigation/Navigation';

export default component$(() => {
  return (
    <>
      <Navigation/>
      <AddFriendPage/>
      <HowToAddFriend/>
      <Footer/>
    </>
  );
});
