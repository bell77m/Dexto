import { component$ } from "@builder.io/qwik";
import { InspirationSection } from "./InspirationSection";

export const InspirationPage = component$(() => {
  return (
    <InspirationSection
      title="Inpiration"
      subtitle="Creating a Collaborative Coding Website"
      description="The idea stems from the belief that teamwork drives innovation in the digital age. By connecting people from around the world, this platform empowers beginners and experienced developers alike to learn, share, and create together seamlessly."
      imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/eae189396cda8c42d3dac484a95d611660d74d7c98888c967680e2fef6fcf711?placeholderIfAbsent=true&apiKey=83086b8ef5ae4f9392edc247fd20d152"
      imageAlt="Collaborative coding illustration"
    />
  );
});