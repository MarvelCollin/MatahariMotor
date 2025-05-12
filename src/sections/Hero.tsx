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
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
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
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      setCursorPosition({ x, y });
      
      if (bicycleAnimationRef.current) {
        const moveX = (x - 0.5) * 10;
        const moveY = (y - 0.5) * 5;
        bicycleAnimationRef.current.updateBikePosition(moveX, moveY);
      }
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
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-800 overflow-hidden">
        {/* Animated circles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/5"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              filter: 'blur(40px)'
            }}
            animate={{
              y: [0, Math.random() * 50 - 25],
              x: [0, Math.random() * 50 - 25],
              scale: [1, Math.random() * 0.3 + 0.8, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
        ))}
      </div>
      
      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full grid grid-cols-12 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="h-full w-px bg-gradient-to-b from-transparent via-orange-500/30 to-transparent"
              initial={{ height: 0 }}
              animate={{ height: '100%' }}
              transition={{ 
                duration: 2, 
                delay: i * 0.1,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
        <div className="w-full h-full grid grid-rows-12 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ 
                duration: 2, 
                delay: i * 0.1,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Custom radial glow following cursor */}
      <motion.div
        className="pointer-events-none absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: `radial-gradient(circle at center, rgba(249, 115, 22, 0.3) 0%, transparent 70%)`,
          left: `calc(${cursorPosition.x * 100}% - 250px)`,
          top: `calc(${cursorPosition.y * 100}% - 250px)`,
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />

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

            {/* Bicycle Animation Component - now in a fixed container */}
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