import { component$ } from '@builder.io/qwik';
import { DextoContainer } from '~/components/AboutPage/dexto/DextoContainer';
import { DextoFeatures } from '~/components/AboutPage/dextoFeatures/DextoFeatures';
import { Hero } from '~/components/AboutPage/hero';
import { InspirationPage } from '~/components/AboutPage/inspiration/InspirationPage';
import { Footer } from '~/components/footer/Footer';
import { MarketingPage } from '~/components/LandingPage/marketing/MarketingPage';
import { Navigation } from '~/components/navigation/Navigation';

export default component$(() => {
  return (
    <>
      <Navigation/>
      <Hero/>
      <DextoContainer/>
      <DextoFeatures/>
      <InspirationPage/>
      <MarketingPage/>
      <Footer/>
    </>
  );
});
