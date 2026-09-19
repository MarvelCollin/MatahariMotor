import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Parts from './sections/Parts';
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
        <div className="bg-black">
          <Services />
          <Parts />
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
