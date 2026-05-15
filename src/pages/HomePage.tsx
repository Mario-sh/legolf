import Hero from '../components/Hero';
import About from '../components/About';
import Menu from '../components/Menu';
import Gallery from '../components/Gallery';
import Reviews from '../components/Reviews';
import MapSection from '../components/MapSection';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Reviews />
      <MapSection />
      <Contact />
    </main>
  );
}
