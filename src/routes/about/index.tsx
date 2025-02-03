import { component$ } from '@builder.io/qwik';
import { DextoContainer } from '~/components/AboutPage/dexto/DextoContainer';
import { Hero } from '~/components/AboutPage/hero';
import { Footer } from '~/components/footer/Footer';
import { Navigation } from '~/components/navigation/Navigation';

export default component$(() => {
  return (
    <>
      <Navigation/>
      <Hero/>
      <DextoContainer/>
      <Footer/>
    </>
  );
});
