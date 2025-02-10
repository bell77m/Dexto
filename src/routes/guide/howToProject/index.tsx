import { component$ } from '@builder.io/qwik';
import { Footer } from '~/components/footer/Footer';
import { GettingStartedPage } from '~/components/GuidePage/GettingStarted/GettingStartedPage';
import { ProjectCreation } from '~/components/GuidePage/projectCreation/ProjectCreation';
import { Navigation } from '~/components/navigation/Navigation';

export default component$(() => {
  return (
    <>
      <Navigation/>
      <ProjectCreation/>
      <GettingStartedPage quickstartGuides={["How to use IDE", "How to use chat", "How to add friend", "How to use forum", "Notification"]} />
      <Footer/>
    </>
  );
});
