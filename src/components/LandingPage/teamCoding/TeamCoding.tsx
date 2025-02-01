import { component$ } from "@builder.io/qwik";
import { HeroSection } from "./HeroSection";

export const TeamCoding = component$(() => {
  const heroData = {
    title: ["Code with your", "team"],
    description: "Code with your team and bring your ideas to life! Collaborate seamlessly, innovate faster, and build something amazing together. Whether you're brainstorming, debugging, or launching the next big project, teamwork makes the code work!",
    buttonText: "More detail",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a7a99b40c5c818d63e91426dc7d3e2a59c98bfb3b336eb95a26b86aaa07af30b?placeholderIfAbsent=true&apiKey=83086b8ef5ae4f9392edc247fd20d152",
    imageAlt: "Team coding collaboration illustration"
  };

  return <HeroSection {...heroData} />;
});