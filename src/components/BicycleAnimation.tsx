import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { FaBicycle, FaCog, FaCircle, FaBolt, FaPaintBrush, FaFire, FaTools } from 'react-icons/fa';

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
  const bikeRef = useRef<HTMLDivElement>(null);
  const bikeContentRef = useRef<HTMLDivElement>(null);
  const gearsAnimationControls = useAnimation();
  const chainAnimationControls = useAnimation();
  const wheelAnimationControls = useAnimation();
  const bicycleControls = useAnimation();
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
  
  // Mode-specific animations
  useEffect(() => {
    const handleModeChange = async () => {
      // Reset any previous animations
      setSpeedMode(false);
      
      if (interactiveMode === "speed") {
        // Special effects for speed mode
        setSpeedMode(true);
        startWheelSpin();
        startGearsAnimation();
        
      } else if (interactiveMode === "customize") {
        // Custom effects for customize mode
        bicycleControls.start({
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1],
          transition: { duration: 1.5 }
        });
      }
    };
    
    handleModeChange();
  }, [interactiveMode, bicycleControls]);
  
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
            rotateX: interactiveMode === "customize" ? [0, 5, 0] : 0,
            rotateY: interactiveMode === "customize" ? [0, 8, 0] : 0,
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
            {/* Speed mode effects */}
            <AnimatePresence>
              {speedMode && (
                <>
                  {/* Speed lines */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={`speed-line-${i}`}
                      className="absolute h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"
                      style={{
                        top: `${30 + i * 5}%`,
                        width: '120%',
                        left: '-10%',
                        opacity: 0.6,
                      }}
                      initial={{ scaleX: 0, x: 100 }}
                      animate={{ 
                        scaleX: [0, 1, 0],
                        x: [100, -100],
                        opacity: [0, 0.8, 0]
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                      exit={{ opacity: 0 }}
                    />
                  ))}
                  
                  {/* Speed indicator */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black/70 px-3 py-1 rounded-full flex items-center z-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <FaFire className="text-orange-500 mr-1" size={14} />
                    <span className="text-orange-500 text-xs font-bold">SPEED MODE</span>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
            
            {/* Main bicycle - centered and fixed size */}
            <motion.div
              className="w-[180px] h-[180px] md:w-[220px] md:h-[220px]"
              animate={bicycleControls}
              style={{
                filter: speedMode ? 'drop-shadow(0 0 12px rgba(249, 115, 22, 0.5))' : undefined
              }}
            >
              <FaBicycle className={`w-full h-full ${
                interactiveMode === "customize" 
                  ? "text-gradient-animated" 
                  : speedMode 
                    ? "text-orange-500" 
                    : "text-orange-500"
              }`} />
            </motion.div>
            
            {/* Wheel animations - positioned relative to the bicycle */}
            <div 
              className="absolute top-[45%] left-[22%] w-16 h-16 cursor-pointer flex items-center justify-center"
              onClick={startWheelSpin}
            >
              <motion.div
                className={`w-14 h-14 rounded-full border-4 ${
                  speedMode 
                    ? "border-dashed border-orange-500/70 text-orange-500/70" 
                    : "border-dashed border-orange-500/30 text-orange-500/70"
                }`}
                animate={wheelAnimationControls}
                whileHover={{ scale: 1.1 }}
                style={{
                  boxShadow: speedMode ? '0 0 15px rgba(249, 115, 22, 0.5)' : undefined
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
                    : "border-dashed border-orange-500/30 text-orange-500/70"
                }`}
                animate={wheelAnimationControls}
                whileHover={{ scale: 1.1 }}
                style={{
                  boxShadow: speedMode ? '0 0 15px rgba(249, 115, 22, 0.5)' : undefined
                }}
              />
            </div>
          </motion.div>
          
          {/* Interactive parts overlay */}
          <AnimatePresence mode="wait">
            {interactiveMode === "repair" && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
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
                            <FaCircle 
                              size={30} 
                              color={part.color} 
                              className="filter drop-shadow-lg" 
                            />
                            <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                              {index + 1}
                            </span>
                          </motion.div>
                          
                          <AnimatePresence>
                            {hoverPart === index && (
                              <motion.div
                                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap z-20"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                              >
                                <div className="flex items-center gap-1">
                                  <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: part.color }}
                                  />
                                  <span>{part.name}</span>
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
                  className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/70 px-3 py-1 rounded-full flex items-center z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <FaTools className="text-yellow-500 mr-1" size={14} />
                  <span className="text-yellow-500 text-xs font-bold">REPAIR MODE</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive hint */}
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <p className="text-orange-500 text-sm mb-1">Click on wheels & gears to animate</p>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FaCircle className="text-orange-500/50 h-2 w-2 mx-auto" />
            </motion.div>
          </motion.div>
          
          {/* Mode indicator */}
          <AnimatePresence>
            {interactiveMode !== "default" && interactiveMode !== "repair" && (
              <motion.div
                className="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm text-white z-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="px-4 py-2 bg-gray-900/80 rounded-full flex items-center">
                  {interactiveMode === "speed" && <FaBolt className="text-orange-500 mr-2" />}
                  {interactiveMode === "customize" && <FaPaintBrush className="text-blue-500 mr-2" />}
                  <span>
                    {interactiveMode === "speed" && "Super-charged mode"}
                    {interactiveMode === "customize" && "Customization mode"}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Style fixes */}
      <style>{`
        .text-gradient-animated {
          background: linear-gradient(90deg, #f97316, #3b82f6, #10b981, #ef4444, #8b5cf6, #f97316);
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