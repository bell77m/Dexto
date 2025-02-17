// import { component$ } from '@builder.io/qwik';
// import { Sidebar } from '~/components/sidebar/Sidebar';

// export default component$(() => {
//   return (
//     <>
//       <Sidebar/>
//     </>
//   );
// });
import { component$ } from '@builder.io/qwik';
import { Sidebar } from '~/components/sidebar/Sidebar';

export default component$(() => {
  return (
    <>
      <div class="flex h-screen">
        <Sidebar/>
        <section class="flex flex-col flex-grow items-start text-white bg-gray-900">
      <h1 class="ml-9 mt-10 text-3xl font-extrabold tracking-widest leading-none text-center max-md:ml-2.5">
        <div class="self-center items-center text-3xl font-extrabold tracking-widest leading-none text-center text-black">
        <img alt="My DEXTO Icon" src="/image/DextoLogo.svg" width="155" height="20" />
      </div>
      </h1>
      <h2 class="mt-6 ml-8 text-2xl font-semibold tracking-tight leading-none text-neutral-400">
        Message from developer
      </h2>
      <article class="flex flex-col items-start self-stretch 
  px-6 pt-6 pb-20 mt-5 w-[1400px] h-[250px] ml-8
  text-base font-medium tracking-tight leading-5 text-white 
  bg-gray-800 rounded-lg">
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
