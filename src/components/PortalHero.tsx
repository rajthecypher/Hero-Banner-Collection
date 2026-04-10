import { motion, useMotionValue, useSpring, useMotionTemplate, useTransform } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Activity, Network } from 'lucide-react';

export const PortalHero = () => {
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  const mouseX = useMotionValue(windowSize.width / 2);
  const mouseY = useMotionValue(windowSize.height / 2);
  
  const springConfig = { stiffness: 50, damping: 20 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Parallax calculations for the portal interior
  const parallaxX = useTransform(springX, [0, windowSize.width], [40, -40]);
  const parallaxY = useTransform(springY, [0, windowSize.height], [40, -40]);
  
  // Deeper parallax for floating elements
  const floatX = useTransform(springX, [0, windowSize.width], [100, -100]);
  const floatY = useTransform(springY, [0, windowSize.height], [100, -100]);

  // The mask template
  const maskImage = useMotionTemplate`radial-gradient(circle 300px at ${springX}px ${springY}px, black 40%, transparent 100%)`;

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden border-t border-zinc-200 cursor-crosshair">
      
      {/* ========================================== */}
      {/* BASE REALITY (LIGHT THEME)                 */}
      {/* ========================================== */}
      
      {/* Light Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 flex flex-col items-center text-center pointer-events-none px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-500 mb-8">
          <span className="w-2 h-2 rounded-full bg-zinc-400" />
          <span className="text-sm font-medium tracking-wide uppercase">Standard Agency Model</span>
        </div>

        <h1 className="text-[5rem] md:text-[8rem] lg:text-[10rem] leading-[0.85] font-display font-bold text-zinc-900 tracking-tighter">
          UNFAIR<br />ADVANTAGE.
        </h1>

        <p className="mt-8 text-xl text-zinc-500 max-w-2xl font-light">
          Move your cursor to reveal the autonomous neural network operating beneath the surface.
        </p>
      </div>


      {/* ========================================== */}
      {/* ALTERNATE REALITY PORTAL (DARK/NEON)       */}
      {/* ========================================== */}
      
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
        }}
      >
        {/* Portal Background */}
        <div className="absolute inset-0 bg-zinc-950 overflow-hidden">
          {/* Moving Neon Orbs */}
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }} 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[150vh] md:h-[150vh]"
          >
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/40 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/40 rounded-full blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-pink-500/40 rounded-full blur-[120px]" />
          </motion.div>
          
          {/* Dark Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_80%,transparent_100%)]" />
        </div>

        {/* Portal Content (Parallax Shifted) */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
          style={{ x: parallaxX, y: parallaxY }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 mb-8 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide uppercase">Autonomous AI Swarm</span>
          </div>

          <h1 className="text-[5rem] md:text-[8rem] lg:text-[10rem] leading-[0.85] font-display font-bold text-white tracking-tighter drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            UNFAIR<br />ADVANTAGE.
          </h1>

          <p className="mt-8 text-xl text-zinc-300 max-w-2xl font-light drop-shadow-md">
            We deploy self-learning agents that analyze, execute, and scale your revenue with mathematical precision.
          </p>

          {/* Floating UI Elements inside Portal */}
          <motion.div 
            style={{ x: floatX, y: floatY }}
            className="absolute top-1/4 left-[10%] bg-black/50 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider">Live Processing</div>
              <div className="text-xl font-bold text-white">2.4M Data Points</div>
            </div>
          </motion.div>

          <motion.div 
            style={{ x: floatX, y: floatY }}
            className="absolute bottom-1/4 right-[10%] bg-black/50 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
              <Network className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider">Agent Status</div>
              <div className="text-xl font-bold text-white flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Swarm Active
              </div>
            </div>
          </motion.div>

        </motion.div>
      </motion.div>

      {/* ========================================== */}
      {/* THE LENS / GLASS RIM                       */}
      {/* ========================================== */}
      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] -ml-[300px] -mt-[300px] rounded-full border border-zinc-900/5 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] pointer-events-none z-30 flex items-center justify-center"
        style={{ x: springX, y: springY }}
      >
        {/* Inner glass reflection ring */}
        <div className="absolute inset-[2px] rounded-full border border-white/50 mix-blend-overlay" />
        {/* Center reticle */}
        <div className="w-2 h-2 rounded-full bg-zinc-900/20" />
      </motion.div>

      {/* Global CTA (Sits above everything) */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40">
        <button className="group relative px-8 py-4 bg-zinc-900 text-white rounded-full font-medium flex items-center justify-center gap-2 hover:bg-black transition-all shadow-2xl hover:scale-105 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          <span className="relative z-10 flex items-center gap-2">
            Deploy Your Swarm
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>

    </div>
  );
};
