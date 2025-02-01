import { component$ } from "@builder.io/qwik";
import { StartSection } from "./StartSection";

export const MarketingPage = component$(() => {
  const startSectionData = {
    title: "Start your work with us",
    description: "Join Dexto, where collaboration meets innovation. Together, we transform ideas into reality, building powerful solutions through teamwork and shared skills. Dexto isn't just a platform—it's a space where creativity flows, code connects, and communities grow. Dexto is the hub for collaborative success. Let's create, innovate, and grow—together.",
    buttonText: "Start Now"
  };

  return <StartSection {...startSectionData} />;
});