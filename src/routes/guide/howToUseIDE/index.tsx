import { component$ } from '@builder.io/qwik';
import { Footer } from '~/components/footer/Footer';
import { HowToUseIDESection } from '~/components/GuidePage/HowToUseIDE/HowToUseIDESection';
import { HowToUseIDE } from '~/components/GuidePage/HowToUseIDEGuide/HowToUseIDE';
import { Navigation } from '~/components/navigation/Navigation';

export default component$(() => {
  return (
    <>
      <Navigation/>
      <HowToUseIDESection/>
      <HowToUseIDE 
        quickstartGuides={["How to use IDE", "How to use chat", "How to add friend", "How to use forum", "Notification"]}
        stepInstructions={[
          { step: 1, content: "This side will show list of your files in folder , which you can add more new files , rename and delete your files." },
          { step: 2, content: "This side will show member of your current team that you can talk with them and you choose to mute your microphone and your headphone ." },
          { step: 3, content: "In this section, you and your teammates can edit the code together. It will display information about which member is working on which part, including the terminal section." },
          { step: 4, content: "You can invite new team member." }
        ]}
      />
      <Footer/>
    </>
  );
});
