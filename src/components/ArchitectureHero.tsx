import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import React, { useRef } from 'react';
import { Layers, Cpu, Database, Network, Zap, Shield } from 'lucide-react';

export const ArchitectureHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth spring for all scroll animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  // --- 3D Scene Rotations ---
  // Starts flat, then tilts into an isometric perspective
  const rotateX = useTransform(smoothProgress, [0, 0.2], [0, 55]);
  const rotateZ = useTransform(smoothProgress, [0, 0.2], [0, -35]);
  const scale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);

  // --- Layer Separation (Z-Axis) ---
  // Layers explode outwards
  const layer1Z = useTransform(smoothProgress, [0.3, 0.7], [0, 300]);
  const layer2Z = useTransform(smoothProgress, [0.3, 0.7], [0, 0]);
  const layer3Z = useTransform(smoothProgress, [0.3, 0.7], [0, -300]);

  // --- Text Opacities ---
  const introOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const introY = useTransform(smoothProgress, [0, 0.15], [0, -50]);

  const labelsOpacity = useTransform(smoothProgress, [0.6, 0.8], [0, 1]);
  const labelsX = useTransform(smoothProgress, [0.6, 0.8], [50, 0]);

  // --- Connecting Beams ---
  const beamOpacity = useTransform(smoothProgress, [0.4, 0.7], [0, 0.5]);
  const beamHeight = useTransform(smoothProgress, [0.3, 0.7], ["0px", "600px"]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black border-t border-white/10">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black" style={{ perspective: '2000px' }}>
        
        {/* Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.05),transparent_70%)] pointer-events-none" />

        {/* --- INTRO TEXT --- */}
        <motion.div 
          style={{ opacity: introOpacity, y: introY }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50"
        >
          <h2 className="text-[4rem] md:text-[8rem] font-display font-bold tracking-tighter text-white drop-shadow-2xl">
            THE STACK.
          </h2>
          <p className="mt-4 text-xl text-zinc-400 font-light tracking-widest uppercase">
            A multi-dimensional approach.
          </p>
        </motion.div>

        {/* --- 3D SCENE --- */}
        <motion.div
          style={{
            rotateX,
            rotateZ,
            scale,
            transformStyle: "preserve-3d",
          }}
          className="relative w-[90vw] max-w-[800px] h-[400px] flex items-center justify-center"
        >
          
          {/* Connecting Vertical Beams (Visible only when separated) */}
          <motion.div 
            style={{ 
              opacity: beamOpacity, 
              height: beamHeight,
              transform: 'translateZ(-300px) rotateX(-90deg)',
              transformOrigin: 'top'
            }} 
            className="absolute top-1/2 left-1/4 w-[2px] bg-gradient-to-b from-cyan-500 via-violet-500 to-fuchsia-500 shadow-[0_0_15px_rgba(56,189,248,0.8)]"
          />
          <motion.div 
            style={{ 
              opacity: beamOpacity, 
              height: beamHeight,
              transform: 'translateZ(-300px) rotateX(-90deg)',
              transformOrigin: 'top'
            }} 
            className="absolute top-1/2 right-1/4 w-[2px] bg-gradient-to-b from-cyan-500 via-violet-500 to-fuchsia-500 shadow-[0_0_15px_rgba(56,189,248,0.8)]"
          />

          {/* ========================================== */}
          {/* LAYER 1: NEURAL INTERFACE (TOP)            */}
          {/* ========================================== */}
          <motion.div
            style={{ z: layer1Z }}
            className="absolute inset-0 w-full h-full rounded-3xl bg-black/40 border border-white/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-50" />
            
            {/* Mock UI Elements */}
            <div className="absolute top-6 left-6 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            
            <div className="w-full h-full p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                  <Layers className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-display font-bold text-white">Neural Interface</h3>
                  <p className="text-cyan-200/70 font-mono text-sm tracking-wider uppercase">Client-Facing Layer</p>
                </div>
              </div>
              
              {/* Mock Data Bars */}
              <div className="space-y-4 w-2/3">
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[60%] bg-cyan-400/70" />
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[92%] bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ========================================== */}
          {/* LAYER 2: COGNITIVE ENGINE (MIDDLE)         */}
          {/* ========================================== */}
          <motion.div
            style={{ z: layer2Z }}
            className="absolute inset-0 w-full h-full rounded-3xl bg-black/60 border border-violet-500/30 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent opacity-50" />
            
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="w-full h-full p-12 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                  <Cpu className="w-8 h-8 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-display font-bold text-white">Cognitive Engine</h3>
                  <p className="text-violet-200/70 font-mono text-sm tracking-wider uppercase">Processing Core</p>
                </div>
              </div>

              {/* Abstract Nodes */}
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full border border-violet-400/50 flex items-center justify-center animate-pulse">
                  <Network className="w-5 h-5 text-violet-300" />
                </div>
                <div className="w-12 h-12 rounded-full border border-violet-400/50 flex items-center justify-center animate-pulse delay-75">
                  <Zap className="w-5 h-5 text-violet-300" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ========================================== */}
          {/* LAYER 3: DATA FOUNDATION (BOTTOM)          */}
          {/* ========================================== */}
          <motion.div
            style={{ z: layer3Z }}
            className="absolute inset-0 w-full h-full rounded-3xl bg-black/80 border border-fuchsia-500/20 backdrop-blur-sm shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/10 to-transparent opacity-50" />
            
            {/* Deep Glow */}
            <div className="absolute w-96 h-96 bg-fuchsia-600/20 blur-[100px] rounded-full" />

            <div className="w-full h-full p-12 flex items-end justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(217,70,239,0.3)]">
                  <Database className="w-8 h-8 text-fuchsia-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-display font-bold text-white">Data Foundation</h3>
                  <p className="text-fuchsia-200/70 font-mono text-sm tracking-wider uppercase">Immutable Storage</p>
                </div>
              </div>

              <div className="w-12 h-12 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-fuchsia-400" />
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* --- FLOATING LABELS (Appear when exploded) --- */}
        <motion.div 
          style={{ opacity: labelsOpacity, x: labelsX }}
          className="absolute right-[5%] top-1/2 -translate-y-1/2 flex flex-col gap-32 pointer-events-none z-50 hidden lg:flex"
        >
          <div className="text-right">
            <div className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-1">01 / Surface</div>
            <div className="text-white text-2xl font-light">Adaptive UI</div>
          </div>
          <div className="text-right">
            <div className="text-violet-400 font-mono text-sm tracking-widest uppercase mb-1">02 / Logic</div>
            <div className="text-white text-2xl font-light">AI Processing</div>
          </div>
          <div className="text-right">
            <div className="text-fuchsia-400 font-mono text-sm tracking-widest uppercase mb-1">03 / Core</div>
            <div className="text-white text-2xl font-light">Secure Data</div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
