import { useState, useEffect, useRef } from 'react';
import { motion, useCycle, AnimatePresence } from 'framer-motion';
import { 
  FaArrowRight, FaTools, FaMagic, FaRocket
} from 'react-icons/fa';
import logo from '../assets/logo.png';
import BicycleAnimation from '../components/BicycleAnimation';
import type { BicycleAnimationRef } from '../components/BicycleAnimation';

const Hero = () => {
  const [interactiveMode, setInteractiveMode] = useState("default");
  const containerRef = useRef<HTMLDivElement>(null);
  const bicycleAnimationRef = useRef<BicycleAnimationRef>(null);
  
  const cycleMode = (targetMode: string) => {
    if (targetMode !== interactiveMode) {
      setInteractiveMode(targetMode);
    } else {
      setInteractiveMode("default");
    }
  };
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !bicycleAnimationRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      // Calculate normalized position with strong dampening
      const rawX = (clientX - left) / width;
      const rawY = (clientY - top) / height;
      
      // Very minimal movement for bicycle only
      const moveX = (rawX - 0.5) * 4;
      const moveY = (rawY - 0.5) * 2;
      bicycleAnimationRef.current.updateBikePosition(moveX, moveY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.section 
      id="home" 
      className="relative h-screen overflow-hidden bg-gray-900"
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Fixed Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Static gradient overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent"></div>
        
        {/* Fixed position decorative elements */}
        <div className="absolute top-[15%] left-[10%] w-24 h-24 rounded-full bg-orange-500/5 blur-3xl"></div>
        <div className="absolute bottom-[20%] right-[15%] w-32 h-32 rounded-full bg-orange-500/5 blur-3xl"></div>
        <div className="absolute top-[40%] right-[20%] w-16 h-16 rounded-full bg-orange-600/5 blur-2xl"></div>
      </div>
      
      {/* Stable Grid Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(249, 115, 22, 0.3)" strokeWidth="0.5"/>
            </pattern>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="url(#smallGrid)"/>
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(249, 115, 22, 0.5)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Fixed animated accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top accent */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"
          animate={{ 
            x: ['-100%', '100%'],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        />
        
        {/* Bottom accent */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"
          animate={{ 
            x: ['100%', '-100%'],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        />
        
        {/* Minimal animated dots */}
        {[1, 2, 3, 4].map((item) => (
          <motion.div
            key={item}
            className="absolute w-2 h-2 rounded-full bg-orange-500/30"
            style={{
              top: `${20 + item * 15}%`,
              left: `${10 + item * 20}%`,
            }}
            animate={{
              y: [0, item % 2 === 0 ? 30 : -30, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10 + item * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="container mx-auto px-6 h-full flex flex-col items-center justify-center relative z-10">
        {/* Logo with animated entry */}
        <motion.div
          className="absolute top-8 left-6 z-20"
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            type: "spring",
            delay: 0.2
          }}
        >
          <img src={logo} alt="Matahari Motor" className="w-24 h-24 md:w-28 md:h-28" />
        </motion.div>
        
        {/* Interactive content area */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between mt-16 md:mt-0">
          {/* Left side - Text content */}
          <motion.div 
            className="md:w-1/2 text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.8, 
              type: "spring",
              delay: 0.5
            }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.span 
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-600"
                animate={{
                  backgroundPosition: ['0% center', '100% center', '0% center'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                }}
              >
                Matahari
              </motion.span>{" "}
              <motion.span 
                className="inline-block text-white"
                animate={{
                  textShadow: [
                    '0 0 5px rgba(255,255,255,0.1)',
                    '0 0 15px rgba(255,255,255,0.3)',
                    '0 0 5px rgba(255,255,255,0.1)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
              >
                Motor
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Premium Bicycle Spare Parts & Workshop
            </motion.p>
            
            <motion.p 
              className="text-gray-400 max-w-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              We provide high-quality bicycle parts and professional repair services to
              keep your ride smooth and enjoyable, with expertise in all types of bicycles.
            </motion.p>
            
            {/* Interactive Mode Selector */}
            <motion.div 
              className="flex gap-4 mb-8 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              {[
                { mode: "repair", icon: <FaTools />, text: "Repair Services" },
                { mode: "customize", icon: <FaMagic />, text: "Custom Builds" },
                { mode: "speed", icon: <FaRocket />, text: "Speed Upgrades" }
              ].map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => cycleMode(item.mode)}
                  className={`px-4 py-3 rounded-lg flex items-center gap-2 transition-all ${
                    interactiveMode === item.mode
                      ? "bg-orange-500 text-white" 
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                  {interactiveMode === item.mode && (
                    <motion.span 
                      className="w-1.5 h-1.5 rounded-full bg-white ml-1"
                      layoutId="activeModeDot"
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
            
            {/* Call to action buttons */}
            <motion.div 
              className="flex gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <motion.a
                href="#services"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl flex items-center gap-2"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 20px rgba(249, 115, 22, 0.4)" 
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Explore Services</span>
                <FaTools />
              </motion.a>
              <motion.a
                href="#parts"
                className="bg-gray-800 text-orange-500 border border-orange-500 px-8 py-4 rounded-xl flex items-center gap-2"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(249, 115, 22, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Browse Parts</span>
                <FaArrowRight />
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Right side - Interactive bicycle visualization */}
          <motion.div 
            className="relative md:w-1/2 h-[500px] mt-8 md:mt-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {/* Expert service badge */}
            <motion.div
              className="absolute bottom-4 right-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-xl shadow-xl z-10"
              initial={{ opacity: 0, scale: 0, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 2, duration: 0.5, type: "spring" }}
              whileHover={{ 
                scale: 1.1, 
                rotate: 5,
                boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
              }}
            >
              <p className="font-bold">Expert Service</p>
              <p className="text-sm">10+ Years Experience</p>
            </motion.div>

            {/* Bicycle Animation Component */}
            <div className="relative w-full h-full flex items-center justify-center pt-8">
              <BicycleAnimation 
                ref={bicycleAnimationRef} 
                interactiveMode={interactiveMode} 
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div 
          className="flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-gray-400 text-sm mb-2">Scroll to explore</p>
          <motion.div 
            className="w-6 h-10 border-2 border-orange-500 rounded-full flex justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div 
              className="w-2 h-2 bg-orange-500 rounded-full mt-1"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero; 