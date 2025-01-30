import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Collaboration } from "~/components/collaboration/Collaboration";
import { CollaborationHero } from "~/components/CollaborationHeroProps/collaborationSection/CollaborationHero";
import { Navigation } from "~/components/navigation/Navigation";
import { TeamCoding } from "~/components/Teamcoding/teamCoding/TeamCoding";
import { Footer } from "~/components/footer/Footer";
import { TestimonialsSection } from "~/components/testimonials/TestimonialsSection";


export default component$(() => {
  return (
    <>
    <Navigation/>
      <div class = "text-white flex flex-col justify-center items-center text-center">
        <CollaborationHero 
          title="Collaborate Effortlessly"
          buttonText="More detail"
        />
      </div>
      <Collaboration/>
      <TeamCoding/>
      <TestimonialsSection/>
      <Footer/>
    </>
  );
});




export const head: DocumentHead = {
  title: "Dexto",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
