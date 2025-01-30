import { component$ } from "@builder.io/qwik";
import { HeroSection } from "./HeroSection";

export const TeamCoding = component$(() => {
  return (
    <HeroSection
      title={["Code with your", "team"]}
      description="Code with your team and bring your ideas to life! Collaborate seamlessly, innovate faster, and build something amazing together. Whether you're brainstorming, debugging, or launching the next big project, teamwork makes the code work!"
      buttonText="More detail"
      imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/7274f95eeeb2206df0e2f22c7d25f2c3a61a50b5e2839106d9cc38c1accdb9b2?placeholderIfAbsent=true&apiKey=83086b8ef5ae4f9392edc247fd20d152"
      imageAlt="Team coding collaboration illustration"
    />
  );
});