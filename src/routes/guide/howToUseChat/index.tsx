import { component$ } from '@builder.io/qwik';
import { Footer } from '~/components/footer/Footer';
import { HowToUseChat } from '~/components/GuidePage/HowToUseChat/HowToUseChat';
import { HowToUseChatContainer } from '~/components/GuidePage/HowToUseChatII/HowToUseChat/HowToUseChatContainer';
import { Navigation } from '~/components/navigation/Navigation';

export default component$(() => {
  return (
    <>
      <Navigation/>
      <HowToUseChatContainer/>
      <HowToUseChat 
        quickstartGuides={["How to use IDE", "How to use chat", "How to add friend", "How to use forum", "Notification"]} 
        images={["/image/howToUseChatContent.png"]}
      />
      <Footer/>
    </>
  );
});
