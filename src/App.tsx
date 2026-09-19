import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Layanan from './sections/Layanan';
import Katalog from './sections/Katalog';
import Bengkel from './sections/Bengkel';
import Kontak from './sections/Kontak';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Layanan />
        <Katalog />
        <Bengkel />
        <Kontak />
      </main>
      <Footer />
    </>
  );
}

export default App;
