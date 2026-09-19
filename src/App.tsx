import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Layanan from './sections/Layanan';
import Katalog from './sections/Katalog';
import About from './sections/About';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Layanan />
        <Katalog />
        <div className="bg-black">
          <About />
          <Testimonials />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
