import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { FaBicycle, FaCog, FaCircle, FaBolt, FaPaintBrush, FaFire, FaTools, FaWrench, FaRocket, FaMagic } from 'react-icons/fa';

// Add NodeJS types for Timeout
type TimeoutRef = ReturnType<typeof setTimeout> | null;

interface BicycleAnimationProps {
  interactiveMode: string;
  repairModeParts?: Array<{name: string, color: string}>;
}

export interface BicycleAnimationRef {
  updateBikePosition: (moveX: number, moveY: number) => void;
}

const BicycleAnimation = forwardRef<BicycleAnimationRef, BicycleAnimationProps>(({ 
  interactiveMode, 
  repairModeParts = [
    { name: "Frame", color: "#f97316" },
    { name: "Wheels", color: "#3b82f6" },
    { name: "Drivetrain", color: "#10b981" },
    { name: "Brakes", color: "#ef4444" },
    { name: "Handlebars", color: "#8b5cf6" }
  ]
}, ref) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoverPart, setHoverPart] = useState<number | null>(null);
  const [speedMode, setSpeedMode] = useState(false);
  const [customizeMode, setCustomizeMode] = useState(false);
  const [repairMode, setRepairMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#f97316");
  const bikeRef = useRef<HTMLDivElement>(null);
  const bikeContentRef = useRef<HTMLDivElement>(null);
  const gearsAnimationControls = useAnimation();
  const chainAnimationControls = useAnimation();
  const wheelAnimationControls = useAnimation();
  const bicycleControls = useAnimation();
  const customizeControls = useAnimation();
  const particlesRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<TimeoutRef>(null);
  
  // Initialize continuous bicycle animation
  useEffect(() => {
    const startBicycleAnimation = async () => {
      await bicycleControls.start({
        y: [0, -10, 0],
        transition: { 
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      });
    };

    startBicycleAnimation();
  }, [bicycleControls]);
  
  // Add continuous gear rotation animation
  useEffect(() => {
    const startContinuousGearAnimation = async () => {
      // Primary gear rotation
      gearsAnimationControls.start({
        rotate: 360,
        transition: { 
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }
      });
      
      // Chain animation
      chainAnimationControls.start({
        pathOffset: [0, 1],
        transition: { 
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }
      });
    };
    
    startContinuousGearAnimation();
  }, [gearsAnimationControls, chainAnimationControls]);
  
  // Mode-specific animations - Enhanced with more distinct effects
  useEffect(() => {
    // Reset all mode states
    setSpeedMode(false);
    setCustomizeMode(false);
    setRepairMode(false);
    
    // Clear any previous mode-specific animations
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    // Configure animations based on active mode
    const handleModeChange = async () => {
      if (interactiveMode === "speed") {
        // Speed mode activation
        setSpeedMode(true);
        
        // Boost initial animations for dramatic effect
        startWheelSpin();
        startGearsAnimation();
        
        // Apply special bicycle controls for speed mode
        bicycleControls.start({
          scale: [1, 1.05, 1],
          transition: { 
            duration: 0.5,
            ease: "easeInOut"
          }
        });
        
        // Pulsing effect for speed mode
        bicycleControls.start({
          y: [0, -5, 0],
          transition: { 
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        });
        
      } else if (interactiveMode === "customize") {
        // Customize mode activation
        setCustomizeMode(true);
        
        // Gentle rotation effect
        customizeControls.start({
          rotateY: [0, 5, -5, 0],
          transition: { 
            duration: 8,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }
        });
        
        // More pronounced bicycle movement
        bicycleControls.start({
          y: [0, -8, 0],
          transition: { 
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        });
        
      } else if (interactiveMode === "repair") {
        // Repair mode activation
        setRepairMode(true);
        
        // Subtle diagnostic pulse
        bicycleControls.start({
          scale: [1, 1.02, 1],
          transition: { 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        });
      } else {
        // Default mode - gentle float
        bicycleControls.start({
          y: [0, -10, 0],
          transition: { 
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        });
      }
    };
    
    handleModeChange();
  }, [interactiveMode, bicycleControls, customizeControls]);
  
  // Expose methods to parent component - MODIFIED for better positioning
  useImperativeHandle(ref, () => ({
    updateBikePosition: (moveX: number, moveY: number) => {
      // Only apply subtle transformations to content inside the container
      // but keep the main container fixed in place
      if (bikeContentRef.current) {
        bikeContentRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
      
      // Create particle trail effect
      if (particlesRef.current && Math.random() > 0.7) {
        createParticle(moveX, moveY);
      }
    }
  }));
  
  // Particle effect
  const createParticle = (moveX: number, moveY: number) => {
    if (!particlesRef.current) return;
    
    const particle = document.createElement('div');
    const size = Math.random() * 8 + 4;
    const speedX = Math.random() * 2 - 1;
    const speedY = Math.random() * 2 - 1;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.borderRadius = '50%';
    particle.style.position = 'absolute';
    particle.style.pointerEvents = 'none';
    
    // Different particles for different modes
    if (interactiveMode === "customize") {
      particle.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;
    } else if (interactiveMode === "speed") {
      particle.style.background = '#f97316';
      particle.style.boxShadow = '0 0 8px #f97316';
    } else {
      particle.style.background = 'rgba(249, 115, 22, 0.7)';
    }
    
    // Position at the center of the container plus the parallax offset
    particle.style.left = `calc(50% + ${moveX}px)`;
    particle.style.top = `calc(50% + ${moveY}px)`;
    
    particlesRef.current.appendChild(particle);
    
    // Animate the particle
    let posX = 0;
    let posY = 0;
    let opacity = 1;
    
    const animate = () => {
      if (opacity <= 0) {
        if (particlesRef.current && particle.parentNode === particlesRef.current) {
          particlesRef.current.removeChild(particle);
        }
        return;
      }
      
      posX += speedX;
      posY += speedY;
      opacity -= 0.02;
      
      particle.style.transform = `translate(${posX}px, ${posY}px)`;
      particle.style.opacity = opacity.toString();
      
      requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  };
  
  // Wheel animation with safety check
  const startWheelSpin = async () => {
    if (isAnimating) return; // Prevent multiple animation triggers
    
    try {
      setIsAnimating(true);
      
      // Different animation styles based on mode
      if (interactiveMode === "speed") {
        await wheelAnimationControls.start({
          rotate: 360,
          transition: { 
            duration: 0.5,
            repeat: 10,
            ease: "linear"
          }
        });
      } else {
        await wheelAnimationControls.start({
          rotate: 360,
          transition: { 
            duration: 2,
            repeat: 3,
            ease: "linear"
          }
        });
      }
      
      // Reset to default state after animation
      await wheelAnimationControls.start({ rotate: 0 });
      
      setIsAnimating(false);
    } catch (error) {
      console.error("Animation error:", error);
      setIsAnimating(false);
      
      // Reset animation state on error
      wheelAnimationControls.set({ rotate: 0 });
    }
  };
  
  // Gear animation with improved error handling
  const startGearsAnimation = async () => {
    if (isAnimating) return; // Prevent multiple animation triggers
    
    try {
      setIsAnimating(true);
      
      // Speed mode has faster animations
      const duration = interactiveMode === "speed" ? 0.8 : 2;
      const repeats = interactiveMode === "speed" ? 8 : 2;
      
      // Temporarily boost the continuous animation
      await gearsAnimationControls.start({
        rotate: 360, 
        transition: { 
          duration: duration,
          repeat: repeats,
          ease: "linear"
        }
      });
      
      // Then return to normal animation
      gearsAnimationControls.start({
        rotate: 360,
        transition: { 
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }
      });
      
      setIsAnimating(false);
    } catch (error) {
      console.error("Animation error:", error);
      setIsAnimating(false);
      
      // Reset animation state on error
      gearsAnimationControls.start({
        rotate: 360,
        transition: { 
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }
      });
    }
  };
  
  // SVG Chain Path (enhanced for dynamic effect)
  const chainPath = "M10,30 Q50,10 90,30 Q130,50 170,30 Q210,10 250,30";
  
  // Add more complex chain paths to connect all gears
  const complexChainPath = `
    M 40,130 
    C 60,100 80,90 100,90 
    C 120,90 140,100 160,130 
    C 180,160 200,170 220,170 
    C 240,170 260,160 270,130
    C 280,100 290,90 310,90
    C 330,90 350,110 360,130
  `;
  
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden" ref={bikeRef}>
      {/* Particle container - fixed position */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden" />
      
      {/* Content container that can move slightly with mouse for parallax effect */}
      <div 
        ref={bikeContentRef} 
        className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center"
      >
        {/* 3D transformation container */}
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          animate={{
            rotateX: customizeMode ? [0, 5, 0] : 0,
            rotateY: customizeMode ? [0, 8, 0] : 0,
            transition: {
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        >
          {/* Bicycle main frame */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Main bicycle - centered and fixed size */}
            <motion.div
              className="w-[180px] h-[180px] md:w-[220px] md:h-[220px]"
              animate={bicycleControls}
              style={{
                filter: speedMode ? 'drop-shadow(0 0 12px rgba(249, 115, 22, 0.5))' : undefined,
                color: customizeMode ? selectedColor : 'rgba(249, 115, 22, 1)'
              }}
            >
              <FaBicycle className={`w-full h-full ${
                customizeMode 
                  ? "text-gradient-animated" 
                  : speedMode 
                    ? "text-orange-500" 
                    : "text-orange-500"
              }`} />
            </motion.div>
            
            {/* Speed Mode Enhancement */}
            <AnimatePresence mode="wait">
              {speedMode && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Speed lines */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={`speed-line-${i}`}
                      className="absolute h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"
                      style={{
                        top: `${15 + i * 6}%`,
                        width: '180%',
                        left: '-40%',
                        opacity: 0.6,
                        transformOrigin: 'center',
                        transform: `rotate(${Math.random() * 5 - 2.5}deg)`
                      }}
                      initial={{ scaleX: 0, x: 200 }}
                      animate={{ 
                        scaleX: [0, 1, 0],
                        x: [200, -200],
                        opacity: [0, 0.7, 0]
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.08,
                      }}
                    />
                  ))}
                  
                  {/* Radial motion blur effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'radial-gradient(circle at center, transparent 30%, rgba(249, 115, 22, 0.2) 70%, transparent 100%)',
                    }}
                    animate={{ 
                      scale: [0.9, 1.2, 0.9],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  
                  {/* Speed particles */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={`speed-particle-${i}`}
                      className="absolute w-1 h-1 bg-orange-500 rounded-full"
                      style={{
                        top: `${30 + Math.random() * 40}%`,
                        left: '100%',
                        boxShadow: '0 0 4px #f97316, 0 0 8px #f97316'
                      }}
                      animate={{
                        x: [0, -300],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                  
                  {/* Energy burst effects */}
                  <motion.div
                    className="absolute w-full h-full"
                    animate={{
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={`energy-burst-${i}`}
                        className="absolute w-8 h-8 rounded-full"
                        style={{
                          background: `radial-gradient(circle at center, rgba(249, 115, 22, 0.7) 0%, transparent 70%)`,
                          left: '50%',
                          top: '50%',
                          transform: `rotate(${i * 120}deg) translateX(120px) translateY(-4px)`,
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.5
                        }}
                      />
                    ))}
                  </motion.div>
                  
                  {/* Speed indicators */}
                  <motion.div
                    className="absolute bottom-20 left-10 bg-black/50 px-2 py-1 rounded-md border border-orange-500/30 z-20 flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <FaBolt className="text-orange-500 mr-1" size={10} />
                    <div className="h-1 w-16 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
                        initial={{ width: '10%' }}
                        animate={{ width: '90%' }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity,
                          repeatType: "reverse" 
                        }}
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="absolute top-20 right-10 bg-black/50 px-2 py-1 rounded-md border border-orange-500/30 z-20 flex items-center text-[10px] text-orange-500"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <span className="mr-1">TURBO</span>
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <FaRocket size={10} />
                    </motion.div>
                  </motion.div>
                  
                  {/* Speed mode details */}
                  <motion.div
                    className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/80 px-3 py-2 rounded-lg flex items-center z-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <div className="mr-3 p-1.5 bg-orange-500/20 rounded-full">
                      <FaRocket className="text-orange-500" size={16} />
                    </div>
                    <div>
                      <p className="text-orange-500 text-xs font-bold">SPEED MODE</p>
                      <p className="text-gray-400 text-[10px]">Maximum performance activated</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Customize Mode Enhancement */}
            <AnimatePresence mode="wait">
              {customizeMode && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* 3D rotation container */}
                  <motion.div
                    className="w-full h-full absolute"
                    animate={customizeControls}
                  >
                    {/* Color swatch selector */}
                    <motion.div
                      className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 p-2 rounded-xl flex gap-2 z-30"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      {['#f97316', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6'].map((color, i) => (
                        <motion.div
                          key={i}
                          className="relative w-6 h-6 rounded-full cursor-pointer flex items-center justify-center"
                          style={{ backgroundColor: color }}
                          whileHover={{ scale: 1.2, boxShadow: `0 0 8px ${color}` }}
                          whileTap={{ scale: 0.9 }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          onClick={() => setSelectedColor(color)}
                        >
                          {selectedColor === color && (
                            <motion.div 
                              className="absolute inset-0 rounded-full border-2 border-white"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              layoutId="selectedColorRing"
                            />
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                    
                    {/* Paint splatter effects */}
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={`paint-splash-${i}`}
                        className="absolute w-16 h-16 rounded-full mix-blend-screen pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at center, ${selectedColor}bb 0%, transparent 70%)`,
                          top: `${20 + Math.random() * 60}%`,
                          left: `${20 + Math.random() * 60}%`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0, 0.8, 0],
                          scale: [0, 1.5, 0],
                          x: [0, Math.random() * 40 - 20],
                          y: [0, Math.random() * 40 - 20],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: i * 1.3,
                        }}
                      />
                    ))}
                    
                    {/* Paint stroke effects */}
                    <svg 
                      className="absolute inset-0 w-full h-full pointer-events-none" 
                      viewBox="0 0 300 300"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <linearGradient id="paintGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor={`${selectedColor}33`} />
                          <stop offset="50%" stopColor={selectedColor} />
                          <stop offset="100%" stopColor={`${selectedColor}33`} />
                        </linearGradient>
                      </defs>
                      
                      <motion.path
                        d="M80,120 C120,80 180,80 220,120"
                        stroke="url(#paintGradient)"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                          pathLength: [0, 1], 
                          opacity: [0, 1, 0],
                          pathOffset: [0, 1]
                        }}
                        transition={{ 
                          duration: 5, 
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                      />
                      
                      <motion.path
                        d="M70,150 C100,180 200,180 230,150"
                        stroke="url(#paintGradient)"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                          pathLength: [0, 1], 
                          opacity: [0, 1, 0],
                          pathOffset: [0, 1]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity,
                          repeatType: "loop",
                          delay: 1
                        }}
                      />
                    </svg>
                    
                    {/* Brushes and tools */}
                    <motion.div
                      className="absolute bottom-[15%] right-[15%] text-gray-400 transform -rotate-12"
                      animate={{
                        rotate: [-12, -5, -12],
                        y: [0, -5, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <FaPaintBrush size={24} color={selectedColor} />
                    </motion.div>
                    
                    <motion.div
                      className="absolute bottom-[25%] left-[20%] text-gray-400 transform rotate-45"
                      animate={{
                        rotate: [45, 55, 45],
                        y: [0, -3, 0]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 0.5
                      }}
                    >
                      <FaPaintBrush size={18} color={selectedColor} />
                    </motion.div>
                  </motion.div>
                  
                  {/* Customize mode details */}
                  <motion.div
                    className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/80 px-3 py-2 rounded-lg flex items-center z-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <div className="mr-3 p-1.5 bg-blue-500/20 rounded-full">
                      <FaMagic className="text-blue-500" size={16} />
                    </div>
                    <div>
                      <p className="text-blue-500 text-xs font-bold">CUSTOMIZE MODE</p>
                      <p className="text-gray-400 text-[10px]">Select colors and paint your bike</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Repair Mode Enhancement */}
            <AnimatePresence mode="wait">
              {repairMode && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Diagnostic scan effect */}
                  <motion.div
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {/* Horizontal scan line */}
                    <motion.div
                      className="absolute left-0 w-full h-[2px] bg-yellow-500/40"
                      style={{ boxShadow: '0 0 8px rgba(234, 179, 8, 0.6)' }}
                      initial={{ top: 0 }}
                      animate={{ 
                        top: ['0%', '100%', '0%'] 
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    {/* Vertical scan line */}
                    <motion.div
                      className="absolute top-0 h-full w-[2px] bg-yellow-500/40"
                      style={{ boxShadow: '0 0 8px rgba(234, 179, 8, 0.6)' }}
                      initial={{ left: 0 }}
                      animate={{ 
                        left: ['0%', '100%', '0%'] 
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    {/* Scanning grid overlay */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        background: `
                          linear-gradient(to right, transparent 98%, rgba(234, 179, 8, 0.3) 98%),
                          linear-gradient(to bottom, transparent 98%, rgba(234, 179, 8, 0.3) 98%)
                        `,
                        backgroundSize: '20px 20px'
                      }}
                    />
                  </motion.div>
                  
                  {/* Fixed positions for repair mode parts */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {repairModeParts.map((part, index) => {
                      // Calculate fixed positions for repair parts in a circle around the bike
                      const angle = (index / repairModeParts.length) * 2 * Math.PI;
                      const radius = 110; // Fixed radius
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;
                      
                      return (
                        <motion.div
                          key={index}
                          className="absolute"
                          style={{
                            left: `calc(50% + ${x}px)`,
                            top: `calc(50% + ${y}px)`,
                          }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ 
                            opacity: 1, 
                            scale: 1,
                            x: [0, Math.cos(angle) * 5], // Small fixed movement
                            y: [0, Math.sin(angle) * 5], // Small fixed movement
                          }}
                          transition={{ 
                            delay: index * 0.2,
                            duration: 0.5,
                            x: {
                              duration: 3,
                              repeat: Infinity,
                              repeatType: "reverse"
                            },
                            y: {
                              duration: 4,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }
                          }}
                          whileHover={{ scale: 1.2 }}
                          onHoverStart={() => setHoverPart(index)}
                          onHoverEnd={() => setHoverPart(null)}
                        >
                          <div className="relative flex items-center justify-center cursor-pointer">
                            <motion.div
                              animate={{ 
                                rotate: hoverPart === index ? [0, 5, -5, 0] : 0,
                                boxShadow: hoverPart === index ? ['0 0 0px rgba(0,0,0,0)', '0 0 10px rgba(255,255,255,0.5)', '0 0 0px rgba(0,0,0,0)'] : '0 0 0px rgba(0,0,0,0)'
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              {/* Part indicator with tool icon */}
                              <div className="relative">
                                <FaCircle 
                                  size={30} 
                                  color={part.color} 
                                  className="filter drop-shadow-lg" 
                                />
                                <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                                  {index + 1}
                                </span>
                              </div>
                              
                              {/* Diagnostic pulse around repair part */}
                              <motion.div
                                className="absolute inset-0 rounded-full"
                                style={{ 
                                  border: `1px solid ${part.color}`,
                                  opacity: 0.6
                                }}
                                animate={{
                                  scale: [1, 1.5, 1],
                                  opacity: [0.7, 0, 0.7]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: index * 0.3
                                }}
                              />
                            </motion.div>
                            
                            {/* Connecting line to bicycle */}
                            <motion.div
                              className="absolute top-0 left-0 w-full h-full pointer-events-none"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: hoverPart === index ? 1 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <svg width="100%" height="100%" style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0 }}>
                                <motion.line
                                  x1="0"
                                  y1="0"
                                  x2={-x * 0.7}
                                  y2={-y * 0.7}
                                  stroke={part.color}
                                  strokeWidth="1"
                                  strokeDasharray="4 2"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 0.4 }}
                                />
                              </svg>
                            </motion.div>
                            
                            {/* Part details tooltip */}
                            <AnimatePresence>
                              {hoverPart === index && (
                                <motion.div
                                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-30"
                                  initial={{ opacity: 0, y: -5, scale: 0.9 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -5, scale: 0.9 }}
                                >
                                  <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 font-bold border-b border-gray-700 pb-1 mb-1">
                                      <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: part.color }}
                                      />
                                      <span>{part.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-300 text-[10px]">
                                      <FaWrench className="text-yellow-500" size={10} />
                                      <span>Status: Needs attention</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-300 text-[10px]">
                                      <FaTools className="text-green-500" size={10} />
                                      <span>Click to repair</span>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  {/* Repair mode details */}
                  <motion.div
                    className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/80 px-3 py-2 rounded-lg flex items-center z-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <div className="mr-3 p-1.5 bg-yellow-500/20 rounded-full">
                      <FaTools className="text-yellow-500" size={16} />
                    </div>
                    <div>
                      <p className="text-yellow-500 text-xs font-bold">REPAIR MODE</p>
                      <p className="text-gray-400 text-[10px]">Diagnostic scan in progress</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Wheel animations - positioned relative to the bicycle */}
            <div 
              className="absolute top-[45%] left-[22%] w-16 h-16 cursor-pointer flex items-center justify-center"
              onClick={startWheelSpin}
            >
              <motion.div
                className={`w-14 h-14 rounded-full border-4 ${
                  speedMode 
                    ? "border-dashed border-orange-500/70 text-orange-500/70" 
                    : customizeMode
                      ? `border-dashed ${selectedColor}70 text-${selectedColor}70`
                      : "border-dashed border-orange-500/30 text-orange-500/70"
                }`}
                animate={wheelAnimationControls}
                whileHover={{ scale: 1.1 }}
                style={{
                  boxShadow: speedMode ? '0 0 15px rgba(249, 115, 22, 0.5)' : (customizeMode ? `0 0 10px ${selectedColor}50` : undefined)
                }}
              />
            </div>
            
            <div 
              className="absolute top-[45%] right-[22%] w-16 h-16 cursor-pointer flex items-center justify-center"
              onClick={startWheelSpin}
            >
              <motion.div
                className={`w-14 h-14 rounded-full border-4 ${
                  speedMode 
                    ? "border-dashed border-orange-500/70 text-orange-500/70" 
                    : customizeMode
                      ? `border-dashed ${selectedColor}70 text-${selectedColor}70`
                      : "border-dashed border-orange-500/30 text-orange-500/70"
                }`}
                animate={wheelAnimationControls}
                whileHover={{ scale: 1.1 }}
                style={{
                  boxShadow: speedMode ? '0 0 15px rgba(249, 115, 22, 0.5)' : (customizeMode ? `0 0 10px ${selectedColor}50` : undefined)
                }}
              />
            </div>
          </motion.div>
          
          {/* Gear system - positioned absolutely relative to the main container */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Main gear area - clickable */}
            <div 
              className="absolute bottom-[38%] left-[45%] w-16 h-16 cursor-pointer pointer-events-auto"
              onClick={startGearsAnimation}
            >
              {/* Main gear */}
              <motion.div 
                className={`absolute ${
                  speedMode 
                    ? "text-orange-500 filter drop-shadow-lg" 
                    : customizeMode
                      ? `text-${selectedColor} filter drop-shadow-lg`
                      : "text-orange-500/70"
                }`}
                animate={gearsAnimationControls}
                whileHover={{ scale: 1.1 }}
                style={{
                  filter: speedMode 
                    ? 'drop-shadow(0 0 5px rgba(249, 115, 22, 0.8))' 
                    : (customizeMode ? `drop-shadow(0 0 5px ${selectedColor}80)` : undefined),
                  color: customizeMode ? selectedColor : undefined
                }}
              >
                <FaCog size={36} />
              </motion.div>
            </div>
            
            {/* Secondary gears positioned absolutely */}
            <motion.div 
              className={speedMode ? "absolute bottom-[38%] left-[37%] text-orange-500/60" : "absolute bottom-[38%] left-[37%] text-orange-500/60"}
              animate={{
                rotate: -360,
                transition: { 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              whileHover={{ scale: 1.1 }}
              style={{
                color: customizeMode ? selectedColor : undefined,
                opacity: customizeMode ? 0.6 : undefined
              }}
            >
              <FaCog size={26} />
            </motion.div>
            
            <motion.div 
              className="absolute bottom-[45%] left-[55%] text-orange-500/50"
              animate={{
                rotate: 360,
                transition: { 
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              whileHover={{ scale: 1.1 }}
              style={{
                color: customizeMode ? selectedColor : undefined,
                opacity: customizeMode ? 0.5 : undefined
              }}
            >
              <FaCog size={22} />
            </motion.div>
            
            <motion.div 
              className="absolute bottom-[30%] left-[60%] text-orange-500/40"
              animate={{
                rotate: -360,
                transition: { 
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              whileHover={{ scale: 1.1 }}
              style={{
                color: customizeMode ? selectedColor : undefined,
                opacity: customizeMode ? 0.4 : undefined
              }}
            >
              <FaCog size={18} />
            </motion.div>
          </div>
          
          {/* SVG chains positioned absolutely over the entire component */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 300 300"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="chainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={customizeMode ? `${selectedColor}33` : "rgba(249, 115, 22, 0.3)"} />
                <stop offset="50%" stopColor={customizeMode ? selectedColor : "rgba(249, 115, 22, 0.8)"} />
                <stop offset="100%" stopColor={customizeMode ? `${selectedColor}33` : "rgba(249, 115, 22, 0.3)"} />
              </linearGradient>
            </defs>
            
            {/* Main chain */}
            <motion.path
              d="M70,190 C90,180 110,175 130,175 C150,175 170,180 190,190"
              stroke={speedMode ? "url(#chainGradient)" : (customizeMode ? "url(#chainGradient)" : "rgba(249, 115, 22, 0.5)")}
              strokeWidth={speedMode ? 3 : 2}
              fill="none"
              strokeDasharray="4 2"
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={chainAnimationControls}
              style={{
                filter: speedMode ? 'drop-shadow(0 0 2px rgba(249, 115, 22, 0.5))' : (customizeMode ? `drop-shadow(0 0 2px ${selectedColor}50)` : undefined)
              }}
            />
            
            {/* Complex chain path */}
            <motion.path
              d="M100,170 C120,150 140,140 160,140 C180,140 200,150 220,170" 
              stroke={speedMode ? "url(#chainGradient)" : (customizeMode ? "url(#chainGradient)" : "rgba(249, 115, 22, 0.4)")}
              strokeWidth={1.5}
              fill="none"
              strokeDasharray="2 1"
              animate={{
                pathOffset: [0, 1],
                transition: { 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            />
          </svg>

          {/* Interactive hint */}
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <p className={`text-sm mb-1 ${customizeMode ? 'text-' + selectedColor : 'text-orange-500'}`}>
              Click on wheels & gears to animate
            </p>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FaCircle className={`h-2 w-2 mx-auto ${customizeMode ? 'text-' + selectedColor + '/50' : 'text-orange-500/50'}`} />
            </motion.div>
          </motion.div>
          
          {/* Mode indicator - shown only in default mode */}
          <AnimatePresence>
            {interactiveMode === "default" && (
              <motion.div
                className="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm text-white z-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="px-4 py-2 bg-gray-900/70 rounded-full flex items-center">
                  <span>Select a mode to continue</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Style fixes */}
      <style>{`
        .text-gradient-animated {
          background: linear-gradient(90deg, ${selectedColor}, #3b82f6, #10b981, #ef4444, #8b5cf6, ${selectedColor});
          background-size: 600% 600%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          animation: gradientShift 8s ease infinite;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
});

BicycleAnimation.displayName = 'BicycleAnimation';

export { BicycleAnimation, type BicycleAnimationProps };
export default BicycleAnimation; 