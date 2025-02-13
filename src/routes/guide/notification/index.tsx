import { component$ } from '@builder.io/qwik';
import { Footer } from '~/components/footer/Footer';
import { AboutNotification } from '~/components/GuidePage/AboutNotification/AboutNotification';
import { NotificationPage } from '~/components/GuidePage/notification/NotificationPage';
import { Navigation } from '~/components/navigation/Navigation';

export default component$(() => {
  return (
    <>
      <Navigation/>
      <NotificationPage/>
      <AboutNotification/>
      <Footer/>
    </>
  );
});
