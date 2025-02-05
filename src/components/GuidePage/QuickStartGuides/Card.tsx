import { component$, QwikIntrinsicElements } from "@builder.io/qwik";

type CardProps = {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
} & QwikIntrinsicElements["div"];

export const Card = component$<CardProps>(
  ({ title, subtitle, description, buttonText, ...props }) => (
    <div
      {...props}
      class="flex flex-col grow shrink justify-center self-stretch px-6 py-4 my-auto bg-gray-800 rounded-2xl min-w-[240px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[341px] max-md:px-5 max-md:max-w-full"
    >
      <div class="flex flex-col pt-3 bg-gray-800">
        <div class="flex flex-col px-3.5">
          <div class="overflow-hidden px-6 pt-6 pb-16 text-5xl tracking-tighter leading-10 rounded-xl w-[336px] max-md:px-5 max-md:text-4xl max-md:leading-9">
            {title}
          </div>
          <div class="self-start mt-6 text-2xl tracking-tight leading-none">
            {subtitle}
          </div>
        </div>
        <div class="mt-12 text-base font-extralight tracking-wider leading-5 max-md:mt-10">
          {description}
        </div>
        <div class="self-start px-6 py-2 mt-9 text-base font-medium tracking-wider leading-none text-center text-gray-800 bg-white rounded-2xl max-md:px-5">
          {buttonText}
        </div>
      </div>
    </div>
  )
);
