import { component$ } from "@builder.io/qwik";
import { NavigationSection } from "./NavigationSection";
import { SocialLink } from "./SocialLink";

export const Footer = component$(() => {
  const navigationSections = [
    {
      title: "Dexto",
      links: [
        { text: "About", href: "/about" },
        { text: "Guides", href: "/guides" },
        { text: "Forum", href: "/forum" }
      ]
    },
    {
      title: "Legal",
      links: [
        { text: "Terms of Service", href: "/termsOfservice" },
        { text: "Privacy", href: "/privacy" }
      ]
    }
  ];

  const socialLinks = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a40eaffc3c67d96216546438e9e7eeb27bb62b27c0fdd8bbbb17bd0a12e40563?placeholderIfAbsent=true&apiKey=83086b8ef5ae4f9392edc247fd20d152", alt: "Social media link 1" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0b3e64aa2ef89e440983147d4f2e69b881a7dc2c7f99f8cd2a245428974dd43b?placeholderIfAbsent=true&apiKey=83086b8ef5ae4f9392edc247fd20d152", alt: "Social media link 2" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5f912ae8e98319ab8ea181823cd55fe03a3c42b84f56cb12e344fb8e2d1ab0ec?placeholderIfAbsent=true&apiKey=83086b8ef5ae4f9392edc247fd20d152", alt: "Social media link 3" }
  ];

  return (
    <footer class="flex overflow-hidden flex-col px-20 pt-40 pb-24 w-full bg-gray-900 max-md:px-5 max-md:pt-24 max-md:">
      <div class="flex flex-col items-end mr-7 w-full  max-md:mr-2.5 max-md:max-w-full ">
        <div class="flex gap-5 justify-between items-start self-stretch text-white max-md:max-w-full">
          <div class="mt-6 text-5xl font-extrabold leading-none text-center text-black tracking-[2.4px] max-md:text-4xl">
            <img alt="My DEXTO Icon" src= "/image/DextoLogo.svg" width="167" height="32" />
          </div>
          
          {navigationSections.map((section) => (
            <NavigationSection
              key={section.title}
              title={section.title}
              links={section.links}
            />
          ))}

          <div class="flex flex-col">
            <div class="text-2xl font-semibold">WANT TO BE A PART OF US?</div>
            <form class="flex gap-2.5 self-start mt-10">
              <button class= "underline">
                SIGN UP FOR OUR COMMUNITY
              </button>
              <button type="submit" aria-label="Submit signup">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e40fa9753d102fbfeefed538adc4a5272b86425388f55303e79ccebd2de0020d?placeholderIfAbsent=true&apiKey=83086b8ef5ae4f9392edc247fd20d152"
                  alt=""
                  class="object-contain shrink-0 w-6 aspect-square"
                />
              </button>
            </form>
          </div>
        </div>

        <div class="mt-48 mr-40 text-base font-medium text-white max-md:mt-10 max-md:mr-2.5">
          FOLLOW US
        </div>
        <div class="flex gap-8 mt-7 mr-28 max-md:mr-2.5">
          {socialLinks.map((link) => (
            <SocialLink key={link.src} src={link.src} alt={link.alt} />
          ))}
        </div>
      </div>

      <div class="flex flex-wrap gap-5 justify-between items-start mt-6 w-full text-white  max-md:max-w-full ">
        <div class="text-xl font-semibold ">
          DEXTO Code Together, Achieve More
        </div>
        <div class="flex gap-3.5 mt-2.5 text-base font-medium">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e981efc7591908c052e7fb9db8de53ae6f5cf3520fc0b5aa26118f87e75ff9ec?placeholderIfAbsent=true&apiKey=83086b8ef5ae4f9392edc247fd20d152"
            alt=""
            class="object-contain shrink-0 w-5 aspect-square"
          />
          <div class="basis-auto">2024 Dexto. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
});