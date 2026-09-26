import Footer from './components/Footer';
import Navbar from './components/Navbar';
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
        <div className="relative overflow-clip">
          <div className="tread" aria-hidden="true" />
          <Products />
          <Location />
        </div>
      </main>
      <Footer />
      <WaBar />
    </>
  );
}

export default App;
