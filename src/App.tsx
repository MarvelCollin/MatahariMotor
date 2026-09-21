import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Odometer from './components/Odometer';
import WaBar from './components/WaBar';
import Hero from './sections/Hero';
import Location from './sections/Location';
import Products from './sections/Products';
import Services from './sections/Services';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Products />
        <Location />
      </main>
      <Footer />
      <Odometer />
      <WaBar />
    </>
  );
}

export default App;
