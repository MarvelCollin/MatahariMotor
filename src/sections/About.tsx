import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FaUsers, FaTrophy, FaTools, FaBicycle } from 'react-icons/fa';

const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const stats = [
    { value: '10+', label: 'Years Experience', icon: <FaUsers />, delay: 0.1 },
    { value: '1000+', label: 'Happy Customers', icon: <FaTrophy />, delay: 0.2 },
    { value: '5000+', label: 'Repairs Completed', icon: <FaTools />, delay: 0.3 },
    { value: '500+', label: 'Premium Parts', icon: <FaBicycle />, delay: 0.4 },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-black" ref={sectionRef}>
      {/* Parallax background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 to-transparent opacity-50"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute top-0 left-0 w-full h-full"
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-orange-500/20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">About <span className="text-orange-500">Matahari Motor</span></h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Premium Bicycle Workshop Since 2013</h3>
            <p className="text-gray-300 mb-6">
              Matahari Motor started as a small bicycle repair shop with a passion for quality service and has grown into a trusted name in the cycling community.
            </p>
            <p className="text-gray-300 mb-6">
              Our team of experienced technicians are dedicated to providing the highest quality service for all types of bicycles. From basic repairs to complex custom builds, we handle it all with precision and care.
            </p>
            <p className="text-gray-300 mb-8">
              We stock only premium quality parts and accessories to ensure your bicycle performs at its best. Our workshop is equipped with the latest tools and technology to provide efficient and accurate service.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-orange-500 text-white rounded-full inline-flex items-center"
            >
              <span>Read Our Story</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-96 overflow-hidden rounded-xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/40 to-black/30 z-10 mix-blend-multiply"></div>
              <div className="h-full w-full bg-[url('https://placehold.co/600x400/333/FFA500?text=Workshop')] bg-cover bg-center"></div>
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent"
                style={{ opacity }}
              ></motion.div>
            </div>
            
            <motion.div 
              className="absolute -bottom-10 -left-10 bg-gray-800 p-4 rounded-lg shadow-xl max-w-xs"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-white italic text-sm">
                "Our mission is to provide exceptional service and quality parts to help cyclists enjoy every ride to the fullest."
              </p>
              <p className="text-orange-500 mt-2 font-bold">- Founder, Matahari Motor</p>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: stat.delay }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg text-center border border-gray-700"
            >
              <motion.div 
                className="text-4xl text-orange-500 mb-2 flex justify-center"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                {stat.icon}
              </motion.div>
              <h4 className="text-3xl font-bold text-white mb-1">{stat.value}</h4>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About; 