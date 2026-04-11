import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'motion/react';
import { 
  FileSignature, 
  HelpCircle, 
  Scale, 
  Hourglass, 
  EyeOff,
  Smartphone,
  MapPin,
  Camera,
  Users,
  Globe,
  ScanLine,
  AlertTriangle
} from 'lucide-react';

export const SpeedyInventoryShift = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // The scanner moves from 0% (top) to 100% (bottom) between 10% and 90% of the scroll
  const scanProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 100]);
  
  // Clip path reveals the top layer (Digital Order) as the scanner moves down
  const clipPath = useMotionTemplate`inset(0 0 calc(100% - ${scanProgress}%) 0)`;

  // Parallax effects for the messy paper notes to make them feel floating/chaotic
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section ref={containerRef} className="h-[400vh] relative bg-slate-100 font-sans">
      
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* ========================================== */}
        {/* LAYER 1: THE OLD WAY (PAPER CHAOS)         */}
        {/* ========================================== */}
        <div className="absolute inset-0 bg-[#f4f4f0] p-4 md:p-12 overflow-hidden">
          
          {/* Grungy Background Texture */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="relative z-10 max-w-7xl mx-auto h-full">
            <h2 className="text-4xl md:text-7xl font-black text-slate-800 tracking-tighter opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none px-4">
              THE PAPER NIGHTMARE
            </h2>

            {/* Messy Note 1 */}
            <motion.div style={{ y: y1 }} className="absolute top-[10%] md:top-[12%] left-[2%] md:left-[5%] rotate-[-6deg] bg-[#fef08a] p-3 md:p-6 shadow-xl max-w-[200px] md:max-w-xs border border-[#fde047] pointer-events-auto">
              <div className="text-red-600 font-bold text-sm md:text-xl mb-1 md:mb-2 flex items-center gap-1 md:gap-2">
                <FileSignature className="w-4 h-4 md:w-6 md:h-6 shrink-0" /> Handwritten
              </div>
              <div className="text-slate-700 font-serif italic text-xs md:text-lg leading-snug">Illegible, inaccurate, half unreadable.</div>
              <div className="absolute -top-3 -right-3 md:-top-6 md:-right-6 border-2 md:border-4 border-red-500 text-red-500 font-black text-xs md:text-2xl p-0.5 md:p-1 rotate-[15deg] opacity-80">MESSY</div>
            </motion.div>

            {/* Messy Note 2 */}
            <motion.div style={{ y: y2 }} className="absolute top-[35%] md:top-[15%] right-[2%] md:right-[5%] rotate-[4deg] bg-white p-3 md:p-6 shadow-2xl max-w-[220px] md:max-w-sm border border-slate-200 pointer-events-auto">
              <div className="text-red-600 font-bold text-sm md:text-xl mb-1 md:mb-2 flex items-center gap-1 md:gap-2">
                <HelpCircle className="w-4 h-4 md:w-6 md:h-6 shrink-0" /> "Unaccounted for"
              </div>
              <div className="text-slate-700 font-serif italic text-xs md:text-lg leading-snug">Nobody knows where it went. Complete mystery.</div>
              <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 text-red-500 opacity-40">
                <AlertTriangle className="w-8 h-8 md:w-12 md:h-12" />
              </div>
            </motion.div>

            {/* Messy Note 3 */}
            <motion.div style={{ y: y3 }} className="absolute top-[65%] md:top-[65%] left-[5%] md:left-[8%] rotate-[-3deg] bg-[#fecaca] p-3 md:p-6 shadow-lg max-w-[200px] md:max-w-xs border border-[#fca5a5] pointer-events-auto">
              <div className="text-red-800 font-bold text-sm md:text-xl mb-1 md:mb-2 flex items-center gap-1 md:gap-2">
                <Scale className="w-4 h-4 md:w-6 md:h-6 shrink-0" /> Claim disputes
              </div>
              <div className="text-red-900 font-serif italic text-xs md:text-lg leading-snug">Drag on forever. No proof or photos.</div>
            </motion.div>

            {/* Messy Note 4 (Hidden on mobile to reduce clutter) */}
            <motion.div style={{ y: y4 }} className="hidden md:block absolute top-[45%] md:top-[50%] right-[5%] md:right-[10%] rotate-[8deg] bg-[#e2e8f0] p-6 shadow-xl max-w-xs border border-slate-300 pointer-events-auto">
              <div className="text-slate-800 font-bold text-xl mb-2 flex items-center gap-2">
                <Hourglass className="w-6 h-6" /> Foreman bottleneck
              </div>
              <div className="text-slate-600 font-serif italic text-lg leading-snug">Writes everything alone. Slows down the entire job.</div>
            </motion.div>

            {/* Messy Note 5 (Hidden on mobile to reduce clutter) */}
            <motion.div style={{ y: y5 }} className="hidden md:block absolute bottom-[10%] md:bottom-[15%] left-[20%] md:left-[35%] rotate-[-8deg] bg-[#fef08a] p-6 shadow-2xl max-w-xs border border-[#fde047] pointer-events-auto">
              <div className="text-red-600 font-bold text-xl mb-2 flex items-center gap-2">
                <EyeOff className="w-6 h-6" /> Zero visibility
              </div>
              <div className="text-slate-700 font-serif italic text-lg leading-snug">"Where are my things?" Angry customers calling daily.</div>
              <div className="absolute -bottom-4 -left-4 border-4 border-red-600 text-red-600 font-black text-xl p-1 rotate-[-20deg] opacity-80">BLIND</div>
            </motion.div>

          </div>
        </div>

        {/* ========================================== */}
        {/* LAYER 2: THE SPEEDY WAY (DIGITAL ORDER)    */}
        {/* ========================================== */}
        <motion.div 
          className="absolute inset-0 bg-slate-950 z-20 overflow-hidden"
          style={{ clipPath }}
        >
          {/* High-tech Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px] md:bg-[size:40px_40px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] md:w-[800px] h-[300px] md:h-[600px] bg-cyan-500/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-4 md:px-12 py-12 md:py-0">
            
            <div className="mb-6 md:mb-12 text-center mt-8 md:mt-0">
              <h2 className="text-3xl md:text-6xl font-black text-white tracking-tight mb-2 md:mb-4">
                THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">SPEEDY</span> WAY
              </h2>
              <p className="text-cyan-100/60 font-mono tracking-widest uppercase text-[10px] md:text-sm">System Digitized & Optimized</p>
            </div>

            {/* Responsive Bento Grid / Compact List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 max-w-lg md:max-w-none mx-auto w-full">
              
              {/* Card 1 */}
              <motion.div 
                whileHover="hover" initial="initial"
                className="md:col-span-2 bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 p-3 md:p-8 rounded-2xl md:rounded-3xl shadow-[0_0_30px_rgba(6,182,212,0.05)] hover:border-cyan-500/50 transition-colors group flex md:block items-center gap-4 md:gap-0 cursor-pointer overflow-hidden relative"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0"
                  variants={{ hover: { opacity: 1 } }}
                  transition={{ duration: 0.3 }}
                />
                <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-cyan-500/10 flex items-center justify-center md:mb-6 relative overflow-hidden">
                  <Smartphone className="text-cyan-400 w-6 h-6 md:w-7 md:h-7 relative z-10" />
                  <motion.div 
                    className="absolute left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                    variants={{
                      initial: { top: '-10%', opacity: 0 },
                      hover: { top: ['-10%', '110%'], opacity: [0, 1, 1, 0], transition: { duration: 1.5, repeat: Infinity, ease: "linear" } }
                    }}
                  />
                </div>
                <div className="relative z-10">
                  <h3 className="text-sm md:text-2xl font-bold text-white mb-0.5 md:mb-3 leading-tight">Digital photographic inventory</h3>
                  <p className="text-slate-400 text-xs md:text-lg leading-snug">Every single item is photographed, logged, and timestamped in seconds.</p>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                whileHover="hover" initial="initial"
                className="md:col-span-1 bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 p-3 md:p-8 rounded-2xl md:rounded-3xl shadow-[0_0_30px_rgba(6,182,212,0.05)] hover:border-cyan-500/50 transition-colors group flex md:block items-center gap-4 md:gap-0 cursor-pointer overflow-hidden relative"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0"
                  variants={{ hover: { opacity: 1 } }}
                  transition={{ duration: 0.3 }}
                />
                <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-blue-500/10 flex items-center justify-center md:mb-6 relative overflow-hidden">
                  <MapPin className="text-blue-400 w-6 h-6 md:w-7 md:h-7 relative z-10" />
                  <motion.div 
                    className="absolute inset-0 border-2 border-blue-400 rounded-xl md:rounded-2xl"
                    variants={{
                      initial: { scale: 0.8, opacity: 0 },
                      hover: { scale: [0.8, 1.5], opacity: [1, 0], transition: { duration: 1.5, repeat: Infinity, ease: "easeOut" } }
                    }}
                  />
                </div>
                <div className="relative z-10">
                  <h3 className="text-sm md:text-2xl font-bold text-white mb-0.5 md:mb-3 leading-tight">Full item tracking</h3>
                  <p className="text-slate-400 text-xs md:text-lg leading-snug">GPS, time-stamp, and a complete crew member audit trail.</p>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div 
                whileHover="hover" initial="initial"
                className="md:col-span-1 bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 p-3 md:p-8 rounded-2xl md:rounded-3xl shadow-[0_0_30px_rgba(6,182,212,0.05)] hover:border-cyan-500/50 transition-colors group flex md:block items-center gap-4 md:gap-0 cursor-pointer overflow-hidden relative"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0"
                  variants={{ hover: { opacity: 1 } }}
                  transition={{ duration: 0.3 }}
                />
                <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-emerald-500/10 flex items-center justify-center md:mb-6 relative overflow-hidden">
                  <Camera className="text-emerald-400 w-6 h-6 md:w-7 md:h-7 relative z-10" />
                  <motion.div 
                    className="absolute inset-0 bg-emerald-400"
                    variants={{
                      initial: { opacity: 0 },
                      hover: { opacity: [0, 0.5, 0], transition: { duration: 1.5, repeat: Infinity, times: [0, 0.1, 1] } }
                    }}
                  />
                </div>
                <div className="relative z-10">
                  <h3 className="text-sm md:text-2xl font-bold text-white mb-0.5 md:mb-3 leading-tight">Claims resolved instantly</h3>
                  <p className="text-slate-400 text-xs md:text-lg leading-snug">Undeniable photo proof of condition at every step.</p>
                </div>
              </motion.div>

              {/* Card 4 */}
              <motion.div 
                whileHover="hover" initial="initial"
                className="md:col-span-1 bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 p-3 md:p-8 rounded-2xl md:rounded-3xl shadow-[0_0_30px_rgba(6,182,212,0.05)] hover:border-cyan-500/50 transition-colors group flex md:block items-center gap-4 md:gap-0 cursor-pointer overflow-hidden relative"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0"
                  variants={{ hover: { opacity: 1 } }}
                  transition={{ duration: 0.3 }}
                />
                <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-purple-500/10 flex items-center justify-center md:mb-6 relative overflow-hidden">
                  <Users className="text-purple-400 w-6 h-6 md:w-7 md:h-7 relative z-10" />
                  <motion.div 
                    className="absolute w-[150%] h-[150%] border-2 border-purple-400/30 rounded-full border-t-transparent border-b-transparent"
                    variants={{
                      initial: { rotate: 0 },
                      hover: { rotate: 360, transition: { duration: 3, repeat: Infinity, ease: "linear" } }
                    }}
                  />
                  <motion.div 
                    className="absolute w-[100%] h-[100%] border-2 border-purple-400/50 rounded-full border-l-transparent border-r-transparent"
                    variants={{
                      initial: { rotate: 0 },
                      hover: { rotate: -360, transition: { duration: 2, repeat: Infinity, ease: "linear" } }
                    }}
                  />
                </div>
                <div className="relative z-10">
                  <h3 className="text-sm md:text-2xl font-bold text-white mb-0.5 md:mb-3 leading-tight">All crew scan simultaneously</h3>
                  <p className="text-slate-400 text-xs md:text-lg leading-snug">Including temp labor. Zero bottlenecks. Maximum efficiency.</p>
                </div>
              </motion.div>

              {/* Card 5 */}
              <motion.div 
                whileHover="hover" initial="initial"
                className="md:col-span-1 bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 p-3 md:p-8 rounded-2xl md:rounded-3xl shadow-[0_0_30px_rgba(6,182,212,0.05)] hover:border-cyan-500/50 transition-colors group flex md:block items-center gap-4 md:gap-0 cursor-pointer overflow-hidden relative"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0"
                  variants={{ hover: { opacity: 1 } }}
                  transition={{ duration: 0.3 }}
                />
                <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-indigo-500/10 flex items-center justify-center md:mb-6 relative overflow-hidden">
                  <Globe className="text-indigo-400 w-6 h-6 md:w-7 md:h-7 relative z-10" />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-indigo-500/40 to-transparent"
                    variants={{
                      initial: { y: '100%' },
                      hover: { y: ['100%', '-100%'], transition: { duration: 1.5, repeat: Infinity, ease: "linear" } }
                    }}
                  />
                </div>
                <div className="relative z-10">
                  <h3 className="text-sm md:text-2xl font-bold text-white mb-0.5 md:mb-3 leading-tight">Customers see inventory online</h3>
                  <p className="text-slate-400 text-xs md:text-lg leading-snug">Full transparency builds ultimate trust and drives sales.</p>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* THE SCANNER BEAM                           */}
        {/* ========================================== */}
        <motion.div
          className="absolute left-0 right-0 h-1 bg-cyan-400 z-30 pointer-events-none"
          style={{ top: useMotionTemplate`${scanProgress}%` }}
        >
          {/* Core bright line */}
          <div className="absolute inset-0 bg-white blur-[2px]" />
          
          {/* Top glow (scanning the old) */}
          <div className="absolute bottom-full w-full h-24 md:h-48 bg-gradient-to-t from-cyan-400/20 to-transparent" />
          
          {/* Bottom glow (revealing the new) */}
          <div className="absolute top-full w-full h-12 md:h-24 bg-gradient-to-b from-cyan-400/40 to-transparent" />
          
          {/* Center flare */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] md:w-[800px] h-8 md:h-16 bg-cyan-300/40 blur-xl md:blur-2xl rounded-full" />

          {/* Scanner UI Indicator */}
          <div className="absolute right-2 md:right-10 bottom-full mb-2 md:mb-4 text-cyan-400 font-mono text-[10px] md:text-sm tracking-widest flex items-center gap-1.5 md:gap-3 bg-slate-950/80 px-2 py-1 md:px-4 md:py-2 rounded-full border border-cyan-500/30 backdrop-blur-md">
            <ScanLine className="w-3 h-3 md:w-5 md:h-5 animate-pulse" />
            <span className="hidden md:inline">DIGITIZING WORKFLOW...</span>
            <span className="md:hidden">DIGITIZING...</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
