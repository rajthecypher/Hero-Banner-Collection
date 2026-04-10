import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import React, { useRef } from 'react';
import { Activity, Cpu, Network, Shield, Database, Zap } from 'lucide-react';

const lettersData = [
  { char: "S", x: -60, y: -40, r: -90, s: 3 },
  { char: "Y", x: -40, y: 60, r: 45, s: 2 },
  { char: "N", x: -20, y: -80, r: -120, s: 4 },
  { char: "T", x: 0, y: 80, r: 90, s: 2.5 },
  { char: "H", x: 20, y: -60, r: 180, s: 3.5 },
  { char: "E", x: 40, y: 40, r: -45, s: 2 },
  { char: "S", x: 60, y: -80, r: 120, s: 4 },
  { char: "I", x: 80, y: 20, r: -60, s: 2.5 },
  { char: "S", x: 100, y: -50, r: 45, s: 3 },
];

const Letter = ({ char, progress, startX, startY, startR, startS }: any) => {
  const x = useTransform(progress, [0, 0.3], [`${startX}vw`, "0vw"]);
  const y = useTransform(progress, [0, 0.3], [`${startY}vh`, "0vh"]);
  const rotate = useTransform(progress, [0, 0.3], [startR, 0]);
  const scale = useTransform(progress, [0, 0.3], [startS, 1]);
  const opacity = useTransform(progress, [0, 0.2], [0, 1]);
  const filter = useTransform(progress, [0, 0.3], ["blur(20px)", "blur(0px)"]);

  return (
    <motion.span
      style={{ x, y, rotate, scale, opacity, filter, display: 'inline-block' }}
      className="text-[4rem] md:text-[8rem] lg:text-[12rem] font-display font-bold tracking-tighter text-white drop-shadow-2xl"
    >
      {char}
    </motion.span>
  );
};

export const ConvergenceHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Buttery smooth spring for all scroll animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  // --- Text Assembly & Movement ---
  const subOpacity = useTransform(smoothProgress, [0.25, 0.35], [0, 1]);
  const subY = useTransform(smoothProgress, [0.25, 0.35], [20, 0]);
  
  const textContainerY = useTransform(smoothProgress, [0.4, 0.6], ["0vh", "-35vh"]);
  const textContainerScale = useTransform(smoothProgress, [0.4, 0.6], [1, 0.4]);

  // --- Dashboard 3D Reveal ---
  const dashRotateX = useTransform(smoothProgress, [0.4, 0.7], [60, 0]);
  const dashY = useTransform(smoothProgress, [0.4, 0.7], ["50vh", "5vh"]);
  const dashZ = useTransform(smoothProgress, [0.4, 0.7], [-500, 0]);
  const dashOpacity = useTransform(smoothProgress, [0.4, 0.6], [0, 1]);

  // --- Dashboard Inner Elements Stagger ---
  const innerOpacity = useTransform(smoothProgress, [0.6, 0.8], [0, 1]);
  const innerY = useTransform(smoothProgress, [0.6, 0.8], [40, 0]);

  // --- Background Aura ---
  const bgOpacity = useTransform(smoothProgress, [0.3, 0.6], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black border-t border-white/10">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        
        {/* Background Aura that ignites when dashboard appears */}
        <motion.div 
          style={{ opacity: bgOpacity }} 
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(139,92,246,0.15),transparent_60%)] pointer-events-none" 
        />

        {/* --- THE TYPOGRAPHY ASSEMBLY --- */}
        <motion.div 
          style={{ y: textContainerY, scale: textContainerScale }} 
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20"
        >
          <div className="flex">
            {lettersData.map((l, i) => (
              <Letter 
                key={i} 
                char={l.char} 
                startX={l.x} 
                startY={l.y} 
                startR={l.r} 
                startS={l.s} 
                progress={smoothProgress} 
              />
            ))}
          </div>
          <motion.p 
            style={{ opacity: subOpacity, y: subY }} 
            className="mt-6 text-lg md:text-2xl text-zinc-400 tracking-[0.5em] uppercase font-mono font-light"
          >
            Order from Chaos
          </motion.p>
        </motion.div>

        {/* --- THE 3D DASHBOARD REVEAL --- */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10" style={{ perspective: '2000px' }}>
          <motion.div
            style={{
              rotateX: dashRotateX,
              y: dashY,
              z: dashZ,
              opacity: dashOpacity,
            }}
            className="w-full max-w-6xl mx-auto h-[60vh] rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_100px_rgba(139,92,246,0.1)] overflow-hidden p-6 md:p-8"
          >
            {/* Bento Grid Layout inside Dashboard */}
            <motion.div 
              style={{ opacity: innerOpacity, y: innerY }}
              className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 w-full h-full"
            >
              
              {/* Main Core (Spans 2 columns, 2 rows) */}
              <div className="col-span-1 md:col-span-2 row-span-2 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Glowing Core */}
                <div className="absolute w-64 h-64 rounded-full bg-violet-500/20 blur-[80px] animate-pulse" />
                
                {/* Abstract UI Rings */}
                <div className="absolute w-48 h-48 rounded-full border border-white/20 border-dashed animate-[spin_20s_linear_infinite]" />
                <div className="absolute w-64 h-64 rounded-full border border-white/10 animate-[spin_30s_linear_infinite_reverse]" />
                <div className="absolute w-80 h-80 rounded-full border border-white/5 border-dotted animate-[spin_40s_linear_infinite]" />
                
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md shadow-2xl">
                    <Cpu className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-white font-mono text-sm tracking-widest uppercase">Core Engine</div>
                    <div className="text-violet-300 font-bold text-2xl mt-1">ONLINE</div>
                  </div>
                </div>
              </div>

              {/* Side Card 1 */}
              <div className="col-span-1 row-span-1 rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />
                <Activity className="w-8 h-8 text-cyan-400 mb-4" />
                <div>
                  <div className="text-4xl font-display font-bold text-white mb-1">99.9%</div>
                  <div className="text-sm text-zinc-400 font-mono uppercase tracking-wider">System Accuracy</div>
                </div>
              </div>

              {/* Side Card 2 */}
              <div className="col-span-1 row-span-1 rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-fuchsia-500/10 blur-3xl rounded-full" />
                <Network className="w-8 h-8 text-fuchsia-400 mb-4" />
                <div>
                  <div className="text-4xl font-display font-bold text-white mb-1">1.2M</div>
                  <div className="text-sm text-zinc-400 font-mono uppercase tracking-wider">Nodes Active</div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};
