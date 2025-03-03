import { component$ } from "@builder.io/qwik";
import { HeroSection } from "./HeroSection";

export const Hero = component$(() => {
  return (
    <HeroSection 
      title="Make it happen with your potential."
      description="At Dexto, code is our passion. Ever since we started, we have strived to make the strongest, most effective developer tools on earth."
    />
  );
});