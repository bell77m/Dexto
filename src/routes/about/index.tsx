import { component$ } from '@builder.io/qwik';
import { Footer } from '~/components/footer/Footer';
import { Navigation } from '~/components/navigation/Navigation';

export default component$(() => {
  return (
    <>
      <Navigation/>
      <Footer/>
    </>
  );
});
