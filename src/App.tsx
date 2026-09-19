import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Lokasi from './sections/Lokasi';
import Produk from './sections/Produk';
import Servis from './sections/Servis';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Produk />
        <Servis />
        <Lokasi />
      </main>
      <Footer />
    </>
  );
}

export default App;
