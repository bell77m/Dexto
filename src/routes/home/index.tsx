// import { component$ } from '@builder.io/qwik';
// import { Sidebar } from '~/components/sidebar/Sidebar';

// export default component$(() => {
//   return (
//     <>
//       <Sidebar/>
//     </>
//   );
// });
import { component$ } from "@builder.io/qwik";
import { Sidebar } from "~/components/sidebar/Sidebar";

export default component$(() => {
  return (
    <>
      <div class="flex h-screen">
        <Sidebar />
        <section class="flex flex-grow flex-col items-start bg-gray-900 text-white">
          <h1 class="ml-9 mt-10 text-center text-3xl font-extrabold leading-none tracking-widest max-md:ml-2.5">
            <div class="items-center self-center text-center text-3xl font-extrabold leading-none tracking-widest text-black">
              <img
                alt="My DEXTO Icon"
                src="/image/DextoLogo.svg"
                width="155"
                height="20"
              />
            </div>
          </h1>
          <h2 class="ml-8 mt-6 text-2xl font-semibold leading-none tracking-tight text-neutral-400">
            Message from developer
          </h2>
          <article class="ml-8 mt-5 flex h-[250px] 
            w-[1365px] flex-col items-start self-stretch rounded-lg bg-gray-800 px-6
            pb-20 pt-6 text-base font-medium leading-5 
            tracking-tight text-white"
          >
            <span>Version 0.0.1, release 01/01/2025</span>
            <br />
            <p class="text-zinc-600">
              - Add many function for new users, Hope you guys enjoy.
            </p>
          </article>
        </section>
      </div>
    </>
  );
});
