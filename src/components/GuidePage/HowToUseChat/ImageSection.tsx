import { component$ } from "@builder.io/qwik";

export interface ImageSectionProps {
  images: string[];
}

export const ImageSection = component$((props: ImageSectionProps) => {
  return (
    <div class="flex flex-col items-center w-full">
      {props.images.map((src, index) => (
        <img
          key={index}
          loading="lazy"
          src={src}
          alt={`Getting started guide image ${index + 1}`}
          class={`object-cover ${
            index === 0 ? "mt-20" : "mt-44"
          } width="483" height="841" max-md:mt-10`}
        />
      ))}
    </div>
  );
});
