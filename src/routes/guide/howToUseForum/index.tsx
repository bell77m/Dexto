import { component$ } from '@builder.io/qwik';
import { Footer } from '~/components/footer/Footer';
import { HowToUseForum } from '~/components/GuidePage/HowToUseForum/HowToUseForum';
import { HowToUseForumPage } from '~/components/GuidePage/HowToUseForumSection/HowToUseForumFeature/HowToUseForumPage';
import { Navigation } from '~/components/navigation/Navigation';

export default component$(() => {
  return (
    <>
      <Navigation/>
      <HowToUseForumPage/>
      <HowToUseForum/>
      <Footer/>
    </>
  );
});
