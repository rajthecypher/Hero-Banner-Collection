import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

export const EclipseHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSupernova, setIsSupernova] = useState(false);

  // Mouse position normalized from -1 to 1
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the parallax effect
  const springConfig = { stiffness: 40, damping: 20 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Spring for the click-and-hold explosion effect
  const supernovaProgress = useSpring(0, { stiffness: 30, damping: 15 });

  useEffect(() => {
    supernovaProgress.set(isSupernova ? 1 : 0);
  }, [isSupernova, supernovaProgress]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set((e.clientX - centerX) / (rect.width / 2));
      mouseY.set((e.clientY - centerY) / (rect.height / 2));
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsSupernova(false);
  };

  // Plasma layers move with the mouse to create the "light leak" eclipse effect
  const plasma1X = useTransform(springX, [-1, 1], [-120, 120]);
  const plasma1Y = useTransform(springY, [-1, 1], [-120, 120]);
  
  const plasma2X = useTransform(springX, [-1, 1], [-180, 180]);
  const plasma2Y = useTransform(springY, [-1, 1], [-180, 180]);

  // Lens flare moves inversely to the mouse
  const flareX = useTransform(springX, [-1, 1], [250, -250]);
  const flareY = useTransform(springY, [-1, 1], [250, -250]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsSupernova(true)}
      onMouseUp={() => setIsSupernova(false)}
      onTouchStart={() => setIsSupernova(true)}
      onTouchEnd={() => setIsSupernova(false)}
      className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center border-t border-white/10 select-none cursor-pointer"
    >
      {/* Deep Space Background Stars */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 50px 160px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 90px 40px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 130px 80px, #fff, rgba(0,0,0,0))', backgroundSize: '200px 200px' }} />

      {/* Plasma Layer 1 (The Inner Corona) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute z-10 rounded-full mix-blend-screen pointer-events-none"
        style={{
          width: 'min(70vw, 800px)',
          height: 'min(70vw, 800px)',
          background: 'conic-gradient(from 0deg, #ff0055, #4300ff, #00ffcc, #ff0055)',
          filter: 'blur(60px)',
          x: plasma1X,
          y: plasma1Y,
          scale: useTransform(supernovaProgress, [0, 1], [1, 5]),
          opacity: useTransform(supernovaProgress, [0, 1], [0.8, 1]),
        }}
      />

      {/* Plasma Layer 2 (The Outer Flare) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute z-10 rounded-full mix-blend-screen pointer-events-none"
        style={{
          width: 'min(60vw, 700px)',
          height: 'min(60vw, 700px)',
          background: 'conic-gradient(from 180deg, #ffaa00, #ff0055, #aa00ff, #ffaa00)',
          filter: 'blur(40px)',
          x: plasma2X,
          y: plasma2Y,
          scale: useTransform(supernovaProgress, [0, 1], [1, 5]),
          opacity: useTransform(supernovaProgress, [0, 1], [0.6, 1]),
        }}
      />

      {/* The Moon (The Mask that creates the Eclipse) */}
      <motion.div
        className="absolute z-20 rounded-full bg-black pointer-events-none"
        style={{
          width: 'min(65vw, 750px)',
          height: 'min(65vw, 750px)',
          scale: useTransform(supernovaProgress, [0, 1], [1, 0]),
          boxShadow: 'inset 0 0 100px rgba(0,0,0,1), 0 0 50px rgba(0,0,0,0.8)'
        }}
      />

      {/* Lens Flare Artifact */}
      <motion.div
        className="absolute z-30 w-32 h-32 rounded-full bg-cyan-400 mix-blend-screen pointer-events-none"
        style={{
          filter: 'blur(20px)',
          x: flareX,
          y: flareY,
          opacity: useTransform(supernovaProgress, [0, 1], [0.3, 0]),
        }}
      />

      {/* Typography & UI Layer */}
      <div className="absolute z-40 flex flex-col items-center justify-center pointer-events-none w-full h-full">
        
        {/* Default State (ECLIPSE) */}
        <motion.div
          style={{
            opacity: useTransform(supernovaProgress, [0, 0.3], [1, 0]),
            scale: useTransform(supernovaProgress, [0, 1], [1, 0.8]),
          }}
          className="absolute flex flex-col items-center"
        >
          <div className="flex items-center gap-2 text-zinc-400 font-mono text-sm tracking-[0.3em] uppercase mb-6 animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>Click & Hold to Ignite</span>
          </div>
          <h1 className="text-[5rem] md:text-[8rem] lg:text-[12rem] font-display font-bold leading-none tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            ECLIPSE.
          </h1>
        </motion.div>

        {/* Supernova State (ILLUMINATE) */}
        <motion.div
          style={{
            opacity: useTransform(supernovaProgress, [0.6, 1], [0, 1]),
            scale: useTransform(supernovaProgress, [0, 1], [1.2, 1]),
          }}
          className="absolute flex flex-col items-center"
        >
          <h1 className="text-[4rem] md:text-[7rem] lg:text-[11rem] font-display font-bold leading-none tracking-tighter text-black drop-shadow-2xl">
            ILLUMINATE.
          </h1>
          <p className="mt-8 text-xl md:text-3xl font-light text-black font-mono tracking-widest text-center px-4 font-bold">
            THE NEW STANDARD IS HERE.
          </p>
        </motion.div>

      </div>
    </div>
  );
};
