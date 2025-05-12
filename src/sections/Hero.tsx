import { motion } from 'framer-motion';
import { FaArrowRight, FaTools, FaBicycle } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden bg-black">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-orange-900">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-orange-500"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                opacity: [0.7, 0.1, 0.7],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between">
        <motion.div 
          className="md:w-1/2 text-white"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="flex items-center gap-4 mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <img src={logo} alt="Matahari Motor" className="w-24 md:w-32" />
            <div>
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="text-orange-500">Matahari</span> Motor
              </h1>
              <p className="text-xl md:text-2xl text-gray-300">
                Premium Bicycle Spare Parts & Workshop
              </p>
            </div>
          </motion.div>
          
          <p className="mb-8 text-gray-400 max-w-md">
            We provide high-quality bicycle parts and professional repair services to keep your ride smooth and enjoyable.
          </p>
          <div className="flex space-x-4">
            <motion.a
              href="#services"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Our Services</span>
              <FaTools />
            </motion.a>
            <motion.a
              href="#parts"
              className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-3 rounded-full flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Browse Parts</span>
              <FaArrowRight />
            </motion.a>
          </div>
        </motion.div>

        <motion.div 
          className="md:w-1/2 mt-12 md:mt-0 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative w-full h-72 md:h-96">
            <motion.div
              className="absolute inset-0 flex justify-center items-center"
              animate={{ 
                rotateY: [0, 360],
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"  
              }}
            >
              <FaBicycle className="text-orange-500 w-full h-full max-w-xs" />
            </motion.div>
            
            <motion.div
              className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-black/50 to-transparent rounded-full blur-md"
              animate={{ 
                scaleX: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
          </div>

          <motion.div
            className="absolute -bottom-4 -right-4 bg-orange-500 text-white p-4 rounded-lg shadow-xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <p className="font-bold">Expert Service</p>
            <p className="text-sm">10+ Years Experience</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-8 h-12 rounded-full border-2 border-white flex justify-center">
          <motion.div 
            className="w-2 h-2 bg-white rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 