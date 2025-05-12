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
    <div className="bg-black">
      <Navbar />
      <Hero />
      <Services />
      <Parts />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
