import { component$ } from '@builder.io/qwik';
import { Footer } from '~/components/footer/Footer';
import { Card } from '~/components/GuidePage/QuickStartGuides/Card';
import { QuickStartGuides } from '~/components/GuidePage/QuickStartGuides/QuickStartGuides';
import { DextoGuide } from '~/components/GuidePage/search/DextoGuide';
import { SearchBar } from '~/components/GuidePage/search/SearchBar';
import { Navigation } from '~/components/navigation/Navigation';

export default component$(() => {
  return (
    <>
      <Navigation/>
      <DextoGuide/>
      <QuickStartGuides/>
      <Footer/>
    </>
  );
});
