import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Budi Santoso',
      role: 'Mountain Biker',
      image: 'https://placehold.co/100x100/333/FFA500?text=BS',
      content: 'Matahari Motor transformed my riding experience. Their expertise in tuning my suspension and upgrading my drivetrain has made a world of difference on the trails.',
      rating: 5
    },
    {
      id: 2,
      name: 'Dewi Anggraini',
      role: 'Road Cyclist',
      image: 'https://placehold.co/100x100/333/FFA500?text=DA',
      content: 'The attention to detail is exceptional. I brought in my carbon road bike for a complete overhaul, and it feels like new again. I wouldn\'t trust anyone else with my bike.',
      rating: 5
    },
    {
      id: 3,
      name: 'Adi Nugroho',
      role: 'Commuter',
      image: 'https://placehold.co/100x100/333/FFA500?text=AN',
      content: 'I use my bike daily for commuting, and Matahari Motor keeps it running perfectly with their maintenance package. Reliable service with friendly staff.',
      rating: 4
    },
    {
      id: 4,
      name: 'Siti Rahayu',
      role: 'BMX Enthusiast',
      image: 'https://placehold.co/100x100/333/FFA500?text=SR',
      content: 'As a competitive BMX rider, I need my equipment in top shape. The team at Matahari Motor understands the specific needs of BMX bikes and always delivers.',
      rating: 5
    },
    {
      id: 5,
      name: 'Rudi Hartono',
      role: 'Weekend Rider',
      image: 'https://placehold.co/100x100/333/FFA500?text=RH',
      content: 'I brought in an old bike that had been sitting in my garage for years. They restored it beautifully and now I can enjoy weekend rides again. Great value for the price!',
      rating: 4
    }
  ];

  useEffect(() => {
    let interval: number | null = null;
    
    if (autoplay) {
      interval = window.setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay, testimonials.length]);

  const handlePrev = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setAutoplay(false);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const direction = 1;

  return (
    <section id="testimonials" className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-orange-500"></div>
        <div className="absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-orange-600"></div>
        <div className="absolute right-1/4 bottom-10 h-72 w-72 rounded-full bg-orange-400"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">What Our <span className="text-orange-500">Customers Say</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Hear what our satisfied customers have to say about our services and products.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-2xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl">
            <div className="relative h-full">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 },
                  }}
                  className="p-8 md:p-12 md:flex items-center"
                >
                  <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                    <div className="relative">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-28 h-28 rounded-full overflow-hidden border-4 border-orange-500 shadow-xl mb-4"
                      >
                        <img 
                          src={testimonials[currentIndex].image} 
                          alt={testimonials[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center"
                      >
                        <h3 className="text-lg font-bold text-white">{testimonials[currentIndex].name}</h3>
                        <p className="text-orange-500 text-sm">{testimonials[currentIndex].role}</p>
                        <div className="flex justify-center mt-2">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={`${i < testimonials[currentIndex].rating ? 'text-orange-500' : 'text-gray-600'}`}
                            />
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 md:pl-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="relative"
                    >
                      <FaQuoteLeft className="text-orange-500/30 text-6xl absolute -top-4 -left-2" />
                      <p className="text-white text-lg md:text-xl italic relative z-10 pl-6">
                        {testimonials[currentIndex].content}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-4">
            <motion.button
              onClick={handlePrev}
              className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <motion.button
              onClick={handleNext}
              className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full focus:outline-none ${
                index === currentIndex ? 'bg-orange-500' : 'bg-gray-600'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 text-white px-8 py-3 rounded-full inline-flex items-center"
          >
            <span className="mr-2">Leave Your Feedback</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials; 