import { motion, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import React, { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

export const CinematicHero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth out the mouse movement
  const springX = useSpring(mouseX, { stiffness: 40, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Dynamic gradients based on mouse position
  const spotlightBackground = useMotionTemplate`radial-gradient(800px circle at ${springX}px ${springY}px, rgba(255,255,255,0.04), transparent 80%)`;
  const coreGlow = useMotionTemplate`radial-gradient(400px circle at ${springX}px ${springY}px, rgba(56, 189, 248, 0.15), transparent 80%)`;

  return (
    <div className="relative min-h-screen bg-[#030303] overflow-hidden flex items-center justify-center border-t border-white/5">
      
      {/* Dynamic Spotlight & Glow */}
      <motion.div className="absolute inset-0 z-10 pointer-events-none" style={{ background: spotlightBackground }} />
      <motion.div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen" style={{ background: coreGlow }} />

      {/* Abstract 3D Geometry (The "Core") */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-60">
        <div className="relative w-[100vw] h-[100vh] perspective-[1200px] flex items-center justify-center">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                rotateX: [0, 360], 
                rotateY: [0, 360],
                rotateZ: [0, 360]
              }}
              transition={{ 
                duration: 20 + i * 5, 
                repeat: Infinity, 
                ease: "linear",
                direction: i % 2 === 0 ? "normal" : "reverse"
              }}
              className="absolute border border-white/[0.03] rounded-full"
              style={{
                width: `${300 + i * 180}px`,
                height: `${300 + i * 180}px`,
                transformStyle: 'preserve-3d',
                borderTopColor: i === 2 ? 'rgba(56, 189, 248, 0.4)' : undefined,
                borderBottomColor: i === 4 ? 'rgba(168, 85, 247, 0.4)' : undefined,
                borderRightColor: i === 5 ? 'rgba(236, 72, 153, 0.2)' : undefined,
              }}
            />
          ))}
        </div>
      </div>

      {/* Noise Overlay for Cinematic Texture */}
      <div 
        className="absolute inset-0 z-20 opacity-[0.04] pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
      />

      {/* Main Content */}
      <div className="relative z-30 text-center px-6 w-full max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-xs font-mono tracking-widest text-zinc-300 uppercase">System Architecture v4.0</span>
        </motion.div>

        {/* Massive Typography */}
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl md:text-9xl lg:text-[12rem] font-display font-bold text-white tracking-tighter leading-[0.85] uppercase"
        >
          Defy <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-zinc-900">
            Gravity.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 text-lg md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed"
        >
          We don't just optimize campaigns. We engineer autonomous, self-learning growth ecosystems that dominate markets.
        </motion.p>

        {/* Magnetic / Expanding Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16"
        >
          <button className="group relative flex items-center justify-center w-40 h-40 rounded-full bg-transparent border border-white/20 hover:border-white/50 transition-colors duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1] rounded-full" />
            <span className="relative z-10 flex flex-col items-center gap-2 text-white group-hover:text-black transition-colors duration-500">
              <span className="text-sm font-bold tracking-widest uppercase">Engage</span>
              <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-500" />
            </span>
          </button>
        </motion.div>

      </div>
    </div>
  );
};
