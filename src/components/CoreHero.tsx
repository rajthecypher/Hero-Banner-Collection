import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import React, { useRef, useMemo } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

// --- Particle Component ---
const Particle = ({ startX, startY, progress }: { key?: React.Key, startX: number, startY: number, progress: any }) => {
  // Particles move from their start position to the center (0,0)
  const x = useTransform(progress, [0, 0.3], [`${startX}vw`, "0vw"]);
  const y = useTransform(progress, [0, 0.3], [`${startY}vh`, "0vh"]);
  
  // Fade in, then fade out right as they hit the center
  const opacity = useTransform(progress, [0, 0.1, 0.25, 0.3], [0, 1, 1, 0]);
  
  // Scale down as they get sucked in
  const scale = useTransform(progress, [0, 0.3], [1, 0]);

  return (
    <motion.div
      style={{ x, y, opacity, scale }}
      className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"
    />
  );
};

export const CoreHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  // --- Generate Random Particles ---
  const particles = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => {
      const angle = (i / 60) * Math.PI * 2;
      // Start them far outside the center
      const radius = 40 + Math.random() * 60; 
      const startX = Math.cos(angle) * radius;
      const startY = Math.sin(angle) * radius;
      return { id: i, startX, startY };
    });
  }, []);

  // --- Core Animations ---
  // Core shrinks during compression, then disappears during explosion
  const coreScale = useTransform(smoothProgress, [0.3, 0.6, 0.65], [1, 0.2, 0]);
  const coreRotate = useTransform(smoothProgress, [0, 0.6], [0, 720]);
  
  // --- Shockwave (The Explosion) ---
  // Scales massively to cover the entire screen
  const shockwaveScale = useTransform(smoothProgress, [0.6, 0.8], [0, 150]);
  const shockwaveOpacity = useTransform(smoothProgress, [0.6, 0.65], [0, 1]);

  // --- Typography Phases ---
  // Phase 1: Ingestion
  const text1Opacity = useTransform(smoothProgress, [0, 0.1, 0.25, 0.3], [0, 1, 1, 0]);
  const text1Y = useTransform(smoothProgress, [0, 0.1], [20, 0]);

  // Phase 2: Compression
  const text2Opacity = useTransform(smoothProgress, [0.35, 0.4, 0.55, 0.6], [0, 1, 1, 0]);
  const text2Scale = useTransform(smoothProgress, [0.35, 0.6], [1, 0.8]);

  // Phase 3: Omniscience (Final State)
  const finalOpacity = useTransform(smoothProgress, [0.8, 0.9], [0, 1]);
  const finalY = useTransform(smoothProgress, [0.8, 0.9], [50, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black border-t border-white/10">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        
        {/* --- PHASE 1 & 2: THE DARK CORE --- */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          
          {/* The Particles */}
          {particles.map((p) => (
            <Particle key={p.id} startX={p.startX} startY={p.startY} progress={smoothProgress} />
          ))}

          {/* The Central Core */}
          <motion.div
            style={{ scale: coreScale, rotate: coreRotate }}
            className="relative flex items-center justify-center"
          >
            {/* Inner Black Hole */}
            <div className="absolute w-32 h-32 bg-black rounded-full z-20 shadow-[inset_0_0_20px_rgba(0,0,0,1)]" />
            
            {/* Glowing Event Horizon */}
            <div className="absolute w-36 h-36 bg-gradient-to-tr from-cyan-500 to-violet-500 rounded-full z-10 blur-md" />
            <div className="absolute w-48 h-48 bg-cyan-500/30 rounded-full z-0 blur-2xl" />

            {/* Rotating Rings */}
            <div className="absolute w-64 h-64 border border-cyan-500/30 border-dashed rounded-full z-30" />
            <div className="absolute w-80 h-80 border border-violet-500/20 border-dotted rounded-full z-30" style={{ animation: 'spin 10s linear infinite reverse' }} />
          </motion.div>

        </div>

        {/* --- PHASE 3: THE SHOCKWAVE --- */}
        <motion.div
          style={{ 
            scale: shockwaveScale,
            opacity: shockwaveOpacity,
          }}
          className="absolute w-10 h-10 bg-white rounded-full pointer-events-none z-40"
        />

        {/* --- TYPOGRAPHY LAYERS --- */}
        
        {/* Text 1 */}
        <motion.div 
          style={{ opacity: text1Opacity, y: text1Y }}
          className="absolute bottom-32 flex flex-col items-center pointer-events-none z-30"
        >
          <div className="text-cyan-400 font-mono tracking-[0.5em] text-sm mb-2">PHASE 01</div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter">DATA INGESTION</h2>
        </motion.div>

        {/* Text 2 */}
        <motion.div 
          style={{ opacity: text2Opacity, scale: text2Scale }}
          className="absolute bottom-32 flex flex-col items-center pointer-events-none z-30"
        >
          <div className="text-violet-400 font-mono tracking-[0.5em] text-sm mb-2 animate-pulse">PHASE 02</div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter">NEURAL COMPRESSION</h2>
        </motion.div>

        {/* Final Text (Appears over the white shockwave) */}
        <motion.div 
          style={{ opacity: finalOpacity, y: finalY }}
          className="absolute inset-0 flex flex-col items-center justify-center z-50"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 text-black font-mono text-sm tracking-widest uppercase mb-8">
            <Sparkles className="w-4 h-4" />
            System Online
          </div>
          
          <h1 className="text-[4rem] md:text-[8rem] lg:text-[12rem] font-display font-bold leading-[0.85] tracking-tighter text-black text-center">
            PURE<br />INTELLIGENCE.
          </h1>
          
          <p className="mt-8 text-xl md:text-2xl text-zinc-600 font-light max-w-2xl text-center">
            The convergence is complete. Your new reality is ready to be deployed.
          </p>

          <button className="mt-12 px-8 py-4 bg-black text-white rounded-full font-medium tracking-wide hover:scale-105 transition-transform duration-300 flex items-center gap-2 group shadow-2xl">
            Initialize Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </div>
    </div>
  );
};
