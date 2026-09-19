import { motion, AnimatePresence } from 'framer-motion';
import { FaBolt, FaRocket } from 'react-icons/fa';
import type { SpeedModeProps } from '../../interfaces/BicycleTypes';
import React from 'react';

const SpeedMode: React.FC<SpeedModeProps> = ({
  startWheelSpin,
  startGearsAnimation
}) => {
  React.useEffect(() => {
    startWheelSpin();
    startGearsAnimation();
  }, [startWheelSpin, startGearsAnimation]);

  return (
    <AnimatePresence mode="wait">
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
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/80 px-2 py-1 sm:px-3 sm:py-2 rounded-lg flex items-center z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="mr-2 p-1 sm:mr-3 sm:p-1.5 bg-orange-500/20 rounded-full">
            <FaRocket className="text-orange-500" size={12} />
          </div>
          <div>
            <p className="text-orange-500 text-[10px] sm:text-xs font-bold">SPEED MODE</p>
            <p className="text-gray-400 text-[8px] sm:text-[10px]">Maximum performance activated</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SpeedMode; 
