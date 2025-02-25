import { component$ } from "@builder.io/qwik";
import { TestimonialCard } from "./TestimonialCard";
import type { TestimonialProps } from "./types";

const testimonials: TestimonialProps[] = [
  {
    name: "Chawakorn Chayakoom",
    role: "Co-Founder PonHab",
    content: "From my experience I have been using this website for like 3 month it is a very great choice when you work with your team i love you so much because im so gay right now",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/df518153a15c9d006ada4e9d2aaede04c94a5d1b311591da5331b5cdd1dcd5a9?placeholderIfAbsent=true&apiKey=83086b8ef5ae4f9392edc247fd20d152"
  },
  {
    name: "Sasikhet M",
    role: "Co-Founder PonHab",
    content: "From my experience I have been using this website for like 3 month it is a very great choice when you work with your team",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/df518153a15c9d006ada4e9d2aaede04c94a5d1b311591da5331b5cdd1dcd5a9?placeholderIfAbsent=true&apiKey=83086b8ef5ae4f9392edc247fd20d152"
  },
  {
    name: "Lobute Gulliman",
    role: "Co-Founder PonHab",
    content: "From my experience I have been using this website for like 3 month it is a very great choice when you work with your team",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ec354c4db3755da3a8295b7475afe60174e94698c0958011590e1524485c2325?placeholderIfAbsent=true&apiKey=83086b8ef5ae4f9392edc247fd20d152"
  },
  {
    name: "Sasikhet Gaylord",
    role: "Co-Founder PonHab",
    content: "From my experience I have been using this website for like 3 month it is a very great choice when you work with your team",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ec354c4db3755da3a8295b7475afe60174e94698c0958011590e1524485c2325?placeholderIfAbsent=true&apiKey=83086b8ef5ae4f9392edc247fd20d152"
  },
  {
    name: "Aik sud lor",
    role: "Co-Founder PonHab",
    content: "From my experience I have been using this website for like 3 month it is a very great choice when you work with your team",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ec354c4db3755da3a8295b7475afe60174e94698c0958011590e1524485c2325?placeholderIfAbsent=true&apiKey=83086b8ef5ae4f9392edc247fd20d152"
  }
];

export const TestimonialsSection = component$(() => {
  return (
    <div class="flex overflow-hidden flex-col items-center pt-24 pb-52 w-full bg-gray-900 max-md:pb-24 max-md:max-w-full">
      <div class="text-2xl font-medium text-center text-zinc-100">
        Testimonial
      </div>
      <div class="mt-9 text-4xl font-semibold text-center text-white max-md:max-w-full">
        What Our Customers Are Saying
      </div>
      <div class="overflow-hidden mt-20 w-full overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hidden">
      <div class="flex gap-5 flex-nowrap w-max bg-gree">
            {testimonials.map((testimonial, index) => (
              <div key={index} class="flex flex-col w-1/3 max-md:ml-0 max-md:w-full snap-center">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
    </div>
  );
});
