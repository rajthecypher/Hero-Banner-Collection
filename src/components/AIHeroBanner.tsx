import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { Target, TrendingUp, Zap, Cpu } from 'lucide-react';

export const AIHeroBanner = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Ticking numbers
  const [revenue, setRevenue] = useState(124500);
  const [leads, setLeads] = useState(842);

  useEffect(() => {
    const interval = setInterval(() => {
      setRevenue(prev => prev + Math.floor(Math.random() * 1000));
      setLeads(prev => prev + Math.floor(Math.random() * 5));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative min-h-screen bg-[#030303] flex items-center justify-center overflow-hidden border-t border-zinc-900"
      style={{ perspective: 1500 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 3D Scene Wrapper */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-6xl mx-auto px-6 flex items-center justify-center h-[80vh]"
      >
        {/* BACKGROUND LAYER (-200px) */}
        <div
          style={{ transform: "translateZ(-200px)" }}
          className="absolute inset-0 flex flex-col items-center justify-center opacity-20 pointer-events-none"
        >
          <h1 className="text-[10rem] md:text-[14rem] font-display font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent">
            SYSTEM
          </h1>
          <h1 className="text-[10rem] md:text-[14rem] font-display font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-t from-white to-transparent">
            ONLINE
          </h1>
        </div>

        {/* MAIN CARD LAYER (0px) */}
        <div
          style={{ transform: "translateZ(0px)" }}
          className="relative w-full max-w-4xl bg-zinc-950/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-16 shadow-2xl overflow-hidden"
        >
          {/* Grid pattern inside main card */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <span className="text-sm font-mono text-zinc-300">Neural Engine v4.2 Active</span>
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 tracking-tight leading-tight">
              We don't guess.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                We compute growth.
              </span>
            </h2>

            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
              Deploy a swarm of autonomous AI agents that analyze millions of data points, execute campaigns, and generate revenue with mathematical precision.
            </p>

            <button className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold text-lg overflow-hidden transition-transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Initialize Protocol
              </span>
            </button>
          </div>
        </div>

        {/* LEFT FLOATING PANEL (100px) */}
        <motion.div
          style={{ transform: "translateZ(100px)" }}
          className="hidden lg:block absolute -left-12 top-1/4 w-72 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-cyan-400">
              <TrendingUp className="w-5 h-5" />
              <span className="font-mono text-sm font-semibold">Live Revenue</span>
            </div>
            <span className="text-xs text-zinc-500 font-mono">+24.5%</span>
          </div>
          <div className="text-4xl font-display font-bold text-white mb-4">
            ${revenue.toLocaleString()}
          </div>
          {/* Animated SVG Graph */}
          <div className="h-16 w-full">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
              <motion.path
                d="M 0 40 C 20 35, 30 10, 50 20 C 70 30, 80 5, 100 0"
                fill="none"
                stroke="url(#graph-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
              />
              <defs>
                <linearGradient id="graph-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

        {/* RIGHT FLOATING PANEL (150px) */}
        <motion.div
          style={{ transform: "translateZ(150px)" }}
          className="hidden lg:block absolute -right-12 bottom-1/4 w-72 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-purple-400">
              <Target className="w-5 h-5" />
              <span className="font-mono text-sm font-semibold">Targeting Radar</span>
            </div>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
          </div>
          
          {/* Radar Animation */}
          <div className="relative w-full aspect-square rounded-full border border-white/10 flex items-center justify-center overflow-hidden mb-4">
            <div className="absolute inset-4 rounded-full border border-white/5" />
            <div className="absolute inset-12 rounded-full border border-white/5" />
            <div className="absolute inset-20 rounded-full border border-white/5" />
            
            {/* Sweeper */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 origin-center"
            >
              <div className="w-1/2 h-1/2 bg-gradient-to-br from-purple-500/40 to-transparent origin-bottom-right" />
            </motion.div>

            {/* Blips */}
            <motion.div 
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 1.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"
            />
            <motion.div 
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 1.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_#a855f7]"
            />
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-display font-bold text-white">{leads}</div>
            <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider">High-Intent Leads Found</div>
          </div>
        </motion.div>

        {/* BOTTOM FLOATING TERMINAL (200px) */}
        <motion.div
          style={{ transform: "translateZ(200px)" }}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-black/80 backdrop-blur-2xl border border-white/10 rounded-xl p-4 shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
        >
          <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
            <Cpu className="w-4 h-4 text-zinc-500" />
            <span className="text-xs font-mono text-zinc-500">agent_swarm.log</span>
          </div>
          <div className="font-mono text-sm space-y-1 h-16 overflow-hidden relative">
            <motion.div
              animate={{ y: [0, -24, -48, -72] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="text-green-400/80 leading-6"
            >
              <div>&gt; Agent_01: Analyzing Meta ad performance...</div>
              <div>&gt; Agent_02: Reallocating $500 to winning creative...</div>
              <div>&gt; Agent_03: Generating 50 new ad variations...</div>
              <div>&gt; Agent_04: Identifying new lookalike audience...</div>
              <div>&gt; Agent_01: Analyzing Meta ad performance...</div>
            </motion.div>
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};
