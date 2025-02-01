import { component$ } from "@builder.io/qwik";
import type { TestimonialProps } from "./types";

export const TestimonialCard = component$((props: TestimonialProps) => {
  return (
    <div class="flex flex-col items-start pt-6 pr-0.5 pb-36 pl-12 mx-auto w-full text-white bg-gray-800 rounded-xl max-md:pb-24 max-md:pl-5 max-md:mt-5">
      <div class="flex gap-9">
        <img
          loading="lazy"
          src={props.imageSrc}
          alt={`Profile picture of ${props.name}`}
          class="object-contain shrink-0 max-w-full rounded-full aspect-[1.03] w-[106px]"
        />
        <div class="flex flex-col self-start mt-3.5">
          <div class="text-xl">{props.name}</div>
          <div class="mt-2 text-base font-light">{props.role}</div>
        </div>
      </div>
      <div class="mt-6 text-base">{props.content}</div>
    </div>
  );
});