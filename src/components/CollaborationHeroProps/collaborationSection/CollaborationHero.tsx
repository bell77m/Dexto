import { component$ } from "@builder.io/qwik";

interface CollaborationHeroProps {
  title: string;
  buttonText: string;
}

export const CollaborationHero = component$((props: CollaborationHeroProps) => {
  return (
    <div class="flex relative flex-col justify-center items-center px-20 py-52 w-full min-h-[858px] max-md:px-5 max-md:py-24 max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2d3bb2fb31b02e1c3a483a6d251e9c097a3ea946420ddaffea95ac705b877d2a?placeholderIfAbsent=true&apiKey=83086b8ef5ae4f9392edc247fd20d152"
        alt=""
        class="object-cover absolute inset-0 size-full"
      />
      <div class="flex relative flex-col -mb-10 max-w-full w-[951px] max-md:mb-2.5">
        <h1 class="z-0 text-9xl font-bold max-md:max-w-full max-md:text-4xl">
          {props.title}
        </h1>
        <button 
          class="flex z-0 self-center mt-20 max-w-full bg-orange-600 rounded-3xl border-orange-600 border-solid border-[3px] min-h-[71px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[281px] max-md:mt-10"
          aria-label={props.buttonText}
          tabIndex={0}>
            
        
          <span class="absolute z-0 text-2xl font-medium bottom-[21px] h-[29px] left-[394px] w-[138px]">
            {props.buttonText}
          </span>
        </button>
      </div>
    </div>
  );
});