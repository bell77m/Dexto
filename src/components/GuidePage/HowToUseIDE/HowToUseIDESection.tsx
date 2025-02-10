import { component$ } from "@builder.io/qwik";
import { HowToUseIDEHeader } from "./HowToUseIDEHeader";

export const HowToUseIDESection = component$(() => {
  return (
    <section>
      <HowToUseIDEHeader title="How to use IDE" />
    </section>
  );
});
