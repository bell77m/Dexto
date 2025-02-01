import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Collaboration } from "~/components/LandingPage/collaboration/Collaboration";
import { CollaborationHero } from "~/components/CollaborationHeroProps/collaborationSection/CollaborationHero";
import { Navigation } from "~/components/navigation/Navigation";
import { Footer } from "~/components/footer/Footer";
import { TestimonialsSection } from "~/components/LandingPage/testimonials/TestimonialsSection";
import { MarketingPage } from "~/components/LandingPage/marketing/MarketingPage";
import { TeamCoding } from "~/components/LandingPage/teamCoding/TeamCoding";

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
      <MarketingPage/>
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
