import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';

export const RiftHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress over the 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- Rift Dimensions & Styling ---
  // Starts as a thin vertical slit, expands to a window, then fills the screen
  const riftWidth = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8], ["4px", "20vw", "70vw", "100vw"]);
  const riftHeight = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8], ["200px", "60vh", "80vh", "100vh"]);
  const riftRadius = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8], ["100px", "30px", "20px", "0px"]);
  
  // Glowing edge that dissipates as it opens
  const riftShadow = useTransform(
    scrollYProgress, 
    [0, 0.4, 0.8], 
    [
      "0 0 80px 10px rgba(139, 92, 246, 0.8), inset 0 0 40px rgba(139, 92, 246, 0.8)", 
      "0 0 40px 0px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.3)", 
      "0 0 0px 0px rgba(139, 92, 246, 0), inset 0 0 0px rgba(139, 92, 246, 0)"
    ]
  );

  // --- Outer Reality (Dark) ---
  const outerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const leftTextX = useTransform(scrollYProgress, [0, 0.2], [0, -150]);
  const rightTextX = useTransform(scrollYProgress, [0, 0.2], [0, 150]);

  // --- Inner Reality (Vibrant) ---
  // Massive parallax scale and slight rotation for a dizzying, deep effect
  const innerScale = useTransform(scrollYProgress, [0, 1], [2.5, 1]);
  const innerRotate = useTransform(scrollYProgress, [0, 1], [10, 0]);
  
  // Text fading in and floating up
  const innerTextOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const innerTextY = useTransform(scrollYProgress, [0.6, 0.9], [100, 0]);
  const innerSubOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
  const innerSubY = useTransform(scrollYProgress, [0.7, 1], [50, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black">
      {/* Sticky container holds the viewport in place while we scroll through the 400vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* --- THE OUTER REALITY --- */}
        <motion.div
          style={{ opacity: outerOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none"
        >
          <div className="flex items-center gap-8 text-white text-5xl md:text-7xl lg:text-9xl font-light tracking-[0.2em] uppercase">
            <motion.span style={{ x: leftTextX }}>THE</motion.span>
            <motion.span style={{ x: rightTextX }}>BOUNDARY</motion.span>
          </div>
          <motion.p 
            style={{ y: useTransform(scrollYProgress, [0, 0.1], [0, 50]) }}
            className="absolute bottom-20 text-zinc-500 tracking-[0.5em] text-sm font-mono animate-pulse"
          >
            SCROLL TO BREACH
          </motion.p>
        </motion.div>

        {/* --- THE RIFT --- */}
        <motion.div
          style={{
            width: riftWidth,
            height: riftHeight,
            borderRadius: riftRadius,
            boxShadow: riftShadow,
          }}
          className="relative z-10 overflow-hidden flex items-center justify-center bg-zinc-900"
        >
          {/* Inner World Background */}
          <motion.div
            style={{ scale: innerScale, rotate: innerRotate }}
            className="absolute inset-0 w-full h-full origin-center"
          >
            {/* Color Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-fuchsia-600/40 to-orange-500/40 mix-blend-overlay z-10" />
            
            {/* Cinematic Noise */}
            <div 
              className="absolute inset-0 z-20 opacity-30 mix-blend-overlay" 
              style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} 
            />
            
            {/* High-Res Abstract 3D Image */}
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
              alt="Abstract 3D Liquid"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Inner World Content */}
          <div className="relative z-30 flex flex-col items-center justify-center text-center px-4 w-full h-full bg-black/20">
            <motion.h1
              style={{ opacity: innerTextOpacity, y: innerTextY }}
              className="text-[5rem] md:text-[10rem] lg:text-[15rem] font-display font-bold leading-[0.85] tracking-tighter text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.5)]"
            >
              UNBOUND.
            </motion.h1>
            
            <motion.div
              style={{ opacity: innerSubOpacity, y: innerSubY }}
              className="mt-8 flex flex-col items-center gap-6"
            >
              <p className="text-xl md:text-3xl text-white/90 font-light max-w-2xl drop-shadow-lg">
                Step into a reality where constraints no longer exist. The old rules have been rewritten.
              </p>
              
              <button className="px-8 py-4 bg-white text-black rounded-full font-medium tracking-wide hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Explore The New Paradigm
              </button>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
