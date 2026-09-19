import { motion, AnimatePresence } from 'framer-motion';
import { FaTools, FaWrench, FaCircle } from 'react-icons/fa';
import type { RepairModeProps } from '../../interfaces/BicycleTypes';

const RepairMode: React.FC<RepairModeProps> = ({
  repairModeParts,
  hoverPart,
  setHoverPart
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
            const angle = (index / repairModeParts.length) * 2 * Math.PI;
            const radius = 90; // Reduced radius
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
                        size={24} 
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
                  
                  {/* Part details tooltip - adjusted position */}
                  {hoverPart === index && (
                    <motion.div
                      className="absolute top-[110%] left-1/2 transform -translate-x-1/2 mt-1 bg-gray-800/90 text-white text-[8px] sm:text-[10px] px-2 py-1 sm:px-3 sm:py-2 rounded-lg whitespace-nowrap z-30"
                      initial={{ opacity: 0, y: -5, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.9 }}
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 sm:gap-2 font-bold border-b border-gray-700 pb-1 mb-1">
                          <div
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                            style={{ backgroundColor: part.color }}
                          />
                          <span>{part.name}</span>
                        </div>
                        <div className="flex items-center gap-0.5 sm:gap-1 text-gray-300 text-[6px] sm:text-[8px]">
                          <FaWrench className="text-yellow-500" size={8} />
                          <span>Status: Needs attention</span>
                        </div>
                        <div className="flex items-center gap-0.5 sm:gap-1 text-gray-300 text-[6px] sm:text-[8px]">
                          <FaTools className="text-green-500" size={8} />
                          <span>Click to repair</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Repair mode details - responsive sizing */}
        <motion.div
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/80 px-2 py-1 sm:px-3 sm:py-2 rounded-lg flex items-center z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="mr-2 p-1 sm:mr-3 sm:p-1.5 bg-yellow-500/20 rounded-full">
            <FaTools className="text-yellow-500" size={12} />
          </div>
          <div>
            <p className="text-yellow-500 text-[10px] sm:text-xs font-bold">REPAIR MODE</p>
            <p className="text-gray-400 text-[8px] sm:text-[10px]">Diagnostic scan in progress</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RepairMode; 
