import {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { FaBicycle, FaCog, FaCircle } from "react-icons/fa";

import SpeedMode from "./bicycle/SpeedMode";
import CustomizeMode from "./bicycle/CustomizeMode";
import RepairMode from "./bicycle/RepairMode";
import {
  bicycleParts,
  getCurrentPartOption as getPartOption,
  getDefaultSelectedParts,
} from "./bicycle/BicycleParts";
import type {
  BicycleAnimationProps,
  BicycleAnimationRef,
  TimeoutRef,
} from "../interfaces/BicycleTypes";

export type { BicycleAnimationRef };

const BicycleAnimation = forwardRef<BicycleAnimationRef, BicycleAnimationProps>(
  (
    {
      interactiveMode,
      repairModeParts = [
        { name: "Frame", color: "#f97316" },
        { name: "Wheels", color: "#3b82f6" },
        { name: "Drivetrain", color: "#10b981" },
        { name: "Brakes", color: "#ef4444" },
        { name: "Handlebars", color: "#8b5cf6" },
      ],
    },
    ref
  ) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [hoverPart, setHoverPart] = useState<number | null>(null);
    const [speedMode, setSpeedMode] = useState(false);
    const [customizeMode, setCustomizeMode] = useState(false);
    const [repairMode, setRepairMode] = useState(false);
    const [selectedColor, setSelectedColor] = useState("#f97316");
    const [activePart, setActivePart] = useState<string>("frame");
    const [selectedParts, setSelectedParts] = useState(
      getDefaultSelectedParts()
    );

    const bikeRef = useRef<HTMLDivElement>(null);
    const bikeContentRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<TimeoutRef>(null);

    const gearsAnimationControls = useAnimation();
    const chainAnimationControls = useAnimation();
    const wheelAnimationControls = useAnimation();
    const bicycleControls = useAnimation();
    const customizeControls = useAnimation();

    const getCurrentPartOption = (partId: string) => {
      return getPartOption(partId, selectedParts);
    };

    const changePart = (partId: string, direction: "next" | "prev") => {
      const part = bicycleParts.find((p) => p.id === partId);
      if (!part) return;

      const currentOptionId = selectedParts[partId];
      const currentIndex = part.options.findIndex(
        (opt) => opt.id === currentOptionId
      );

      let newIndex;
      if (direction === "next") {
        newIndex = (currentIndex + 1) % part.options.length;
      } else {
        newIndex =
          (currentIndex - 1 + part.options.length) % part.options.length;
      }

      setSelectedParts({
        ...selectedParts,
        [partId]: part.options[newIndex].id,
      });

      setSelectedColor(part.options[newIndex].color);
    };

    useEffect(() => {
      const startBicycleAnimation = async () => {
        await bicycleControls.start({
          y: [0, -10, 0],
          transition: {
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        });
      };

      startBicycleAnimation();
    }, [bicycleControls]);

    useEffect(() => {
      const startContinuousGearAnimation = async () => {
        gearsAnimationControls.start({
          rotate: 360,
          transition: {
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          },
        });

        chainAnimationControls.start({
          pathOffset: [0, 1],
          transition: {
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          },
        });
      };

      startContinuousGearAnimation();
    }, [gearsAnimationControls, chainAnimationControls]);

    useEffect(() => {
      setSpeedMode(false);
      setCustomizeMode(false);
      setRepairMode(false);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      const handleModeChange = async () => {
        if (interactiveMode === "speed") {
          setSpeedMode(true);

          bicycleControls.start({
            scale: [1, 1.05, 1],
            transition: {
              duration: 0.5,
              ease: "easeInOut",
            },
          });

          bicycleControls.start({
            y: [0, -5, 0],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          });
        } else if (interactiveMode === "customize") {
          setCustomizeMode(true);

          customizeControls.start({
            rotateY: [0, 3, -3, 0],
            transition: {
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          });

          bicycleControls.start({
            y: [0, -8, 0],
            transition: {
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          });
        } else if (interactiveMode === "repair") {
          setRepairMode(true);

          bicycleControls.start({
            scale: [1, 1.02, 1],
            transition: {
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          });
        } else {
          bicycleControls.start({
            y: [0, -10, 0],
            transition: {
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          });
        }
      };

      handleModeChange();
    }, [interactiveMode, bicycleControls, customizeControls]);

    useImperativeHandle(ref, () => ({
      updateBikePosition: (moveX: number, moveY: number) => {
        if (bikeContentRef.current) {
          const dampedX = moveX * 0.4;
          const dampedY = moveY * 0.4;
          bikeContentRef.current.style.transform = `translate(${dampedX}px, ${dampedY}px)`;
        }
      },
    }));

    const startWheelSpin = async () => {
      if (isAnimating) return;

      try {
        setIsAnimating(true);

        if (interactiveMode === "speed") {
          await wheelAnimationControls.start({
            rotate: 360,
            transition: {
              duration: 0.5,
              repeat: 10,
              ease: "linear",
            },
          });
        } else {
          await wheelAnimationControls.start({
            rotate: 360,
            transition: {
              duration: 2,
              repeat: 3,
              ease: "linear",
            },
          });
        }

        await wheelAnimationControls.start({ rotate: 0 });

        setIsAnimating(false);
      } catch (error) {
        console.error("Animation error:", error);
        setIsAnimating(false);

        wheelAnimationControls.set({ rotate: 0 });
      }
    };

    const startGearsAnimation = async () => {
      if (isAnimating) return;

      try {
        setIsAnimating(true);

        const duration = interactiveMode === "speed" ? 0.8 : 2;
        const repeats = interactiveMode === "speed" ? 8 : 2;

        await gearsAnimationControls.start({
          rotate: 360,
          transition: {
            duration: duration,
            repeat: repeats,
            ease: "linear",
          },
        });

        gearsAnimationControls.start({
          rotate: 360,
          transition: {
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          },
        });

        setIsAnimating(false);
      } catch (error) {
        console.error("Animation error:", error);
        setIsAnimating(false);

        gearsAnimationControls.start({
          rotate: 360,
          transition: {
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          },
        });
      }
    };

    return (
      <div
        className="relative w-full h-full flex items-center justify-center"
        ref={bikeRef}
      >
        {/* Fixed stable background - no particles that can cause issues */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Static circle background - responsive sizing */}
          <div className="absolute w-[220px] h-[220px] sm:w-[250px] sm:h-[250px] md:w-[280px] md:h-[280px] rounded-full bg-gray-800/20 blur-md"></div>

          {/* Simple glow effect based on mode - responsive sizing */}
          {speedMode && (
            <div className="absolute w-[240px] h-[240px] sm:w-[270px] sm:h-[270px] md:w-[300px] md:h-[300px] rounded-full bg-orange-500/5 blur-xl"></div>
          )}
          {customizeMode && (
            <div
              className="absolute w-[240px] h-[240px] sm:w-[270px] sm:h-[270px] md:w-[300px] md:h-[300px] rounded-full blur-xl"
              style={{ backgroundColor: `${selectedColor}10` }}
            ></div>
          )}
          {repairMode && (
            <div className="absolute w-[240px] h-[240px] sm:w-[270px] sm:h-[270px] md:w-[300px] md:h-[300px] rounded-full bg-yellow-500/5 blur-xl"></div>
          )}
        </div>

        {/* Content container with limited movement - responsive sizing */}
        <div
          ref={bikeContentRef}
          className="relative w-[240px] h-[240px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] flex items-center justify-center"
        >
          {/* 3D transformation container */}
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            animate={{
              rotateX: customizeMode ? [0, 3, 0] : 0,
              rotateY: customizeMode ? [0, 5, 0] : 0,
              transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          >
            {/* Bicycle main frame */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {/* Main bicycle - centered and responsive size */}
              <motion.div
                className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px]"
                animate={bicycleControls}
                style={{
                  filter: speedMode
                    ? "drop-shadow(0 0 12px rgba(249, 115, 22, 0.5))"
                    : undefined,
                  color: customizeMode
                    ? getCurrentPartOption(activePart)?.color || selectedColor
                    : "rgba(249, 115, 22, 1)",
                }}
              >
                <FaBicycle
                  className={`w-full h-full ${
                    customizeMode
                      ? "text-gradient-animated"
                      : speedMode
                      ? "text-orange-500"
                      : "text-orange-500"
                  }`}
                />
              </motion.div>

              {/* Mode indicator - smaller on mobile */}
              <AnimatePresence>
                {interactiveMode === "default" && (
                  <motion.div
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm text-white z-20"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-900/70 rounded-full flex items-center">
                      <span>Select a mode</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Speed Mode Component */}
              {speedMode && (
                <SpeedMode
                  selectedColor={selectedColor}
                  wheelAnimationControls={wheelAnimationControls}
                  bicycleControls={bicycleControls}
                  startWheelSpin={startWheelSpin}
                  startGearsAnimation={startGearsAnimation}
                />
              )}

              {/* Customize Mode Component */}
              {customizeMode && (
                <CustomizeMode
                  selectedColor={selectedColor}
                  customizeControls={customizeControls}
                  bicycleControls={bicycleControls}
                  activePart={activePart}
                  setActivePart={setActivePart}
                  selectedParts={selectedParts}
                  setSelectedParts={setSelectedParts}
                  getCurrentPartOption={getCurrentPartOption}
                  changePart={changePart}
                />
              )}

              {/* Repair Mode Component */}
              {repairMode && (
                <RepairMode
                  selectedColor={selectedColor}
                  bicycleControls={bicycleControls}
                  repairModeParts={repairModeParts}
                  hoverPart={hoverPart}
                  setHoverPart={setHoverPart}
                />
              )}

              {/* Wheel animations - positioned relative to the bicycle */}
              <div
                className="absolute top-[45%] left-[18%] w-12 h-12 cursor-pointer flex items-center justify-center"
                onClick={startWheelSpin}
              >
                <motion.div
                  className={`w-10 h-10 rounded-full border-4 ${
                    speedMode
                      ? "border-dashed border-orange-500/70 text-orange-500/70"
                      : customizeMode
                      ? `border-dashed ${selectedColor}70 text-${selectedColor}70`
                      : "border-dashed border-orange-500/30 text-orange-500/70"
                  }`}
                  animate={wheelAnimationControls}
                  whileHover={{ scale: 1.1 }}
                  style={{
                    boxShadow: speedMode
                      ? "0 0 15px rgba(249, 115, 22, 0.5)"
                      : customizeMode
                      ? `0 0 10px ${selectedColor}50`
                      : undefined,
                  }}
                />
              </div>

              <div
                className="absolute top-[45%] right-[18%] w-12 h-12 cursor-pointer flex items-center justify-center"
                onClick={startWheelSpin}
              >
                <motion.div
                  className={`w-10 h-10 rounded-full border-4 ${
                    speedMode
                      ? "border-dashed border-orange-500/70 text-orange-500/70"
                      : customizeMode
                      ? `border-dashed ${selectedColor}70 text-${selectedColor}70`
                      : "border-dashed border-orange-500/30 text-orange-500/70"
                  }`}
                  animate={wheelAnimationControls}
                  whileHover={{ scale: 1.1 }}
                  style={{
                    boxShadow: speedMode
                      ? "0 0 15px rgba(249, 115, 22, 0.5)"
                      : customizeMode
                      ? `0 0 10px ${selectedColor}50`
                      : undefined,
                  }}
                />
              </div>
            </motion.div>

            {/* Gear system - positioned absolutely relative to the main container */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Main gear area - clickable */}
              <div
                className="absolute bottom-[42%] left-[45%] w-12 h-12 cursor-pointer pointer-events-auto"
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
                      ? "drop-shadow(0 0 5px rgba(249, 115, 22, 0.8))"
                      : customizeMode
                      ? `drop-shadow(0 0 5px ${selectedColor}80)`
                      : undefined,
                    color: customizeMode ? selectedColor : undefined,
                  }}
                >
                  <FaCog size={28} />
                </motion.div>
              </div>

              {/* Secondary gears positioned absolutely */}
              <motion.div
                className={
                  speedMode
                    ? "absolute bottom-[42%] left-[37%] text-orange-500/60"
                    : "absolute bottom-[42%] left-[37%] text-orange-500/60"
                }
                animate={{
                  rotate: -360,
                  transition: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                whileHover={{ scale: 1.1 }}
                style={{
                  color: customizeMode ? selectedColor : undefined,
                  opacity: customizeMode ? 0.6 : undefined,
                }}
              >
                <FaCog size={20} />
              </motion.div>

              <motion.div
                className="absolute bottom-[45%] left-[54%] text-orange-500/50"
                animate={{
                  rotate: 360,
                  transition: {
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                whileHover={{ scale: 1.1 }}
                style={{
                  color: customizeMode ? selectedColor : undefined,
                  opacity: customizeMode ? 0.5 : undefined,
                }}
              >
                <FaCog size={18} />
              </motion.div>

              <motion.div
                className="absolute bottom-[37%] left-[58%] text-orange-500/40"
                animate={{
                  rotate: -360,
                  transition: {
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                whileHover={{ scale: 1.1 }}
                style={{
                  color: customizeMode ? selectedColor : undefined,
                  opacity: customizeMode ? 0.4 : undefined,
                }}
              >
                <FaCog size={14} />
              </motion.div>
            </div>

            {/* SVG chains positioned absolutely over the entire component */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 300 300"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient
                  id="chainGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    stopColor={
                      customizeMode
                        ? `${selectedColor}33`
                        : "rgba(249, 115, 22, 0.3)"
                    }
                  />
                  <stop
                    offset="50%"
                    stopColor={
                      customizeMode ? selectedColor : "rgba(249, 115, 22, 0.8)"
                    }
                  />
                  <stop
                    offset="100%"
                    stopColor={
                      customizeMode
                        ? `${selectedColor}33`
                        : "rgba(249, 115, 22, 0.3)"
                    }
                  />
                </linearGradient>
              </defs>

              {/* Main chain */}
              <motion.path
                d="M70,190 C90,180 110,175 130,175 C150,175 170,180 190,190"
                stroke={
                  speedMode
                    ? "url(#chainGradient)"
                    : customizeMode
                    ? "url(#chainGradient)"
                    : "rgba(249, 115, 22, 0.5)"
                }
                strokeWidth={speedMode ? 3 : 2}
                fill="none"
                strokeDasharray="4 2"
                initial={{ pathLength: 0, pathOffset: 0 }}
                animate={chainAnimationControls}
                style={{
                  filter: speedMode
                    ? "drop-shadow(0 0 2px rgba(249, 115, 22, 0.5))"
                    : customizeMode
                    ? `drop-shadow(0 0 2px ${selectedColor}50)`
                    : undefined,
                }}
              />

              {/* Complex chain path */}
              <motion.path
                d="M100,170 C120,150 140,140 160,140 C180,140 200,150 220,170"
                stroke={
                  speedMode
                    ? "url(#chainGradient)"
                    : customizeMode
                    ? "url(#chainGradient)"
                    : "rgba(249, 115, 22, 0.4)"
                }
                strokeWidth={1.5}
                fill="none"
                strokeDasharray="2 1"
                animate={{
                  pathOffset: [0, 1],
                  transition: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              />
            </svg>

            {/* Interactive hint - responsive text */}
            {!customizeMode && (
              <motion.div
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-center z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <p
                  className={`text-[10px] sm:text-xs mb-1 ${
                    customizeMode ? "text-" + selectedColor : "text-orange-500"
                  }`}
                >
                  Click wheels & gears
                </p>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaCircle
                    className={`h-1 w-1 sm:h-2 sm:w-2 mx-auto ${
                      customizeMode
                        ? "text-" + selectedColor + "/50"
                        : "text-orange-500/50"
                    }`}
                  />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Style fixes */}
        <style>{`
        .text-gradient-animated {
          background: linear-gradient(90deg, ${
            getCurrentPartOption(activePart)?.color || selectedColor
          }, #3b82f6, #10b981, #ef4444, #8b5cf6, ${
          getCurrentPartOption(activePart)?.color || selectedColor
        });
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
  }
);

BicycleAnimation.displayName = "BicycleAnimation";

export default BicycleAnimation;
