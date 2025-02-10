import { component$ } from '@builder.io/qwik';
import { Footer } from '~/components/footer/Footer';
import { Navigation } from '~/components/navigation/Navigation';
import { PrivacyPolicy } from "~/components/PrivacyPolicy/PrivacyPolicy";


export default component$(() => {
  return (
    <>
      <Navigation/>
      <PrivacyPolicy lastUpdated="February 10, 2025" />
      <Footer/>
    </>
  );
});
