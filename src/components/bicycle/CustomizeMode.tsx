import { motion, AnimatePresence } from 'framer-motion';
import { FaMagic, FaChevronRight, FaChevronLeft, FaPaintBrush } from 'react-icons/fa';
import type { CustomizeModeProps } from '../../interfaces/BicycleTypes';
import { bicycleParts } from './BicycleParts';

const CustomizeMode: React.FC<CustomizeModeProps> = ({
  selectedColor,
  customizeControls,
  activePart,
  setActivePart,
  getCurrentPartOption,
  changePart
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-full h-full absolute"
          animate={customizeControls}
        >
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[240px] z-30"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex justify-center gap-1 sm:gap-2 mb-2">
              {bicycleParts.map((part) => (
                <motion.button
                  key={part.id}
                  className={`px-2 py-1 rounded text-[10px] sm:text-xs ${
                    activePart === part.id 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-gray-800/70 text-gray-300'
                  }`}
                  onClick={() => {
                    setActivePart(part.id);
                    const option = getCurrentPartOption(part.id);
                    if (option) {
                      
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {part.name}
                </motion.button>
              ))}
            </div>
            
            <motion.div
              className="bg-black/70 rounded-lg p-2 flex items-center justify-between"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              layoutId="partSelector"
            >
              <button 
                className="text-gray-400 hover:text-white p-1"
                onClick={() => changePart(activePart, 'prev')}
              >
                <FaChevronLeft size={12} />
              </button>
              
              <div className="flex flex-col items-center gap-1">
                <div 
                  className="w-8 h-8 flex items-center justify-center rounded-full"
                  style={{ background: getCurrentPartOption(activePart)?.color || selectedColor }}
                >
                  {getCurrentPartOption(activePart)?.icon}
                </div>
                <div className="text-white text-[10px] sm:text-xs font-medium">
                  {getCurrentPartOption(activePart)?.name || 'Standard'}
                </div>
              </div>
              
              <button 
                className="text-gray-400 hover:text-white p-1"
                onClick={() => changePart(activePart, 'next')}
              >
                <FaChevronRight size={12} />
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className={`absolute w-full h-full pointer-events-none ${
              activePart === 'frame' ? 'opacity-100' : 'opacity-0'
            }`}
            transition={{ duration: 0.3 }}
          >
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              viewBox="0 0 300 300"
              preserveAspectRatio="xMidYMid meet"
            >
              <motion.path
                d="M100,150 L150,100 L200,150"
                stroke={getCurrentPartOption('frame')?.color || selectedColor}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />
            </svg>
          </motion.div>
          
          <motion.div
            className={`absolute w-full h-full pointer-events-none ${
              activePart === 'wheels' ? 'opacity-100' : 'opacity-0'
            }`}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute top-[45%] left-[22%] w-8 h-8 border-2 rounded-full"
              style={{ borderColor: getCurrentPartOption('wheels')?.color || selectedColor }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute top-[45%] right-[22%] w-8 h-8 border-2 rounded-full"
              style={{ borderColor: getCurrentPartOption('wheels')?.color || selectedColor }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </motion.div>
          
          <motion.div
            className={`absolute w-full h-full pointer-events-none ${
              activePart === 'drivetrain' ? 'opacity-100' : 'opacity-0'
            }`}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute bottom-[40%] left-[46%] text-2xl"
              style={{ color: getCurrentPartOption('drivetrain')?.color || selectedColor }}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ 
                scale: { duration: 0.5 },
                rotate: { duration: 2, repeat: Infinity, ease: "linear" }
              }}
            >
              <FaPaintBrush />
            </motion.div>
          </motion.div>
          
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
        </motion.div>
        
        {/* Customize mode details - responsive sizing */}
        <motion.div
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/80 px-2 py-1 sm:px-3 sm:py-2 rounded-lg flex items-center z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="mr-2 p-1 sm:mr-3 sm:p-1.5 bg-blue-500/20 rounded-full">
            <FaMagic className="text-blue-500" size={12} />
          </div>
          <div>
            <p className="text-blue-500 text-[10px] sm:text-xs font-bold">CUSTOMIZE MODE</p>
            <p className="text-gray-400 text-[8px] sm:text-[10px]">Select parts to customize</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CustomizeMode; 
