import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import React, { useEffect, useRef } from 'react';
import { 
  QrCode, 
  Camera, 
  MapPin, 
  PenTool, 
  ShieldCheck, 
  TrendingDown, 
  Box, 
  CheckCircle2,
  ArrowRight,
  Star
} from 'lucide-react';

export const SpeedyInventoryHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse tracking for parallax
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Parallax transforms for floating elements
  const phoneY = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);
  const phoneX = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  
  const card1Y = useTransform(smoothMouseY, [-0.5, 0.5], [-40, 40]);
  const card1X = useTransform(smoothMouseX, [-0.5, 0.5], [-40, 40]);
  
  const card2Y = useTransform(smoothMouseY, [-0.5, 0.5], [30, -30]);
  const card2X = useTransform(smoothMouseX, [-0.5, 0.5], [30, -30]);

  const card3Y = useTransform(smoothMouseY, [-0.5, 0.5], [-50, 50]);
  const card3X = useTransform(smoothMouseX, [-0.5, 0.5], [20, -20]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-slate-50 overflow-hidden font-sans border-t border-slate-200 flex items-center"
    >
      {/* --- BACKGROUND ELEMENTS --- */}
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] opacity-50" />
      
      {/* Glowing Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-400/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- HEADER / LOGO --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-8 left-6 md:left-12 flex items-center gap-3"
        >
          {/* Logo Icon mimicking the provided image */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-[3px] border-blue-500 opacity-20" />
            <div className="absolute inset-1 rounded-full border-[3px] border-blue-500 opacity-40" />
            <div className="absolute inset-2 rounded-full border-[3px] border-blue-500 opacity-60" />
            <div className="absolute inset-3 rounded-full bg-blue-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-slate-900 leading-none tracking-tight">SPEEDY</span>
            <span className="text-sm font-semibold text-blue-500 leading-none tracking-widest uppercase">Inventory</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center pt-24 lg:pt-0">
          
          {/* --- LEFT COLUMN: COPY & CTAS --- */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6"
            >
              <ShieldCheck className="w-4 h-4" />
              DOT Approved & Trusted by 500+ Companies
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6"
            >
              Kill the Paperwork.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Track Every Item.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl"
            >
              The mobile app for moving & storage companies that replaces messy inventory sheets with digital, photo-based tracking. Scan, track, and resolve claims instantly.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold text-lg transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 group">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl font-semibold text-lg transition-all flex items-center justify-center gap-2 shadow-sm">
                Book a Demo
              </button>
            </motion.div>

            {/* Key Selling Points */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <TrendingDown className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-lg">78% Less</div>
                  <div className="text-slate-500 text-sm">Damage Claims</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Box className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-lg">Zero Lost</div>
                  <div className="text-slate-500 text-sm">Items & Records</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT COLUMN: INTERACTIVE MOCKUP --- */}
          <div className="relative h-[600px] lg:h-[800px] flex items-center justify-center perspective-1000">
            
            {/* Main Phone Mockup */}
            <motion.div 
              style={{ x: phoneX, y: phoneY }}
              className="relative z-20 w-[300px] h-[620px] bg-white rounded-[3rem] border-[8px] border-slate-100 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Phone Notch */}
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
                <div className="w-32 h-6 bg-slate-100 rounded-b-3xl" />
              </div>

              {/* App Header */}
              <div className="bg-blue-600 pt-12 pb-6 px-6 text-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Job #4829</span>
                  <span className="text-blue-200 text-sm">In Progress</span>
                </div>
                <div className="text-2xl font-bold">Smith Relocation</div>
                <div className="text-blue-200 text-sm mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Chicago → New York
                </div>
              </div>

              {/* App Content (Inventory List) */}
              <div className="flex-1 bg-slate-50 p-4 space-y-3 overflow-hidden relative">
                
                {/* Scanning Overlay Animation */}
                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                  className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-blue-400/20 to-blue-500/40 border-b-2 border-blue-500 z-30 pointer-events-none"
                />

                {[
                  { id: "001", name: "Leather Sofa", status: "Scanned", icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> },
                  { id: "002", name: "Oak Dining Table", status: "Scanned", icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> },
                  { id: "003", name: "Samsung 65\" TV", status: "Pending", icon: <QrCode className="w-5 h-5 text-slate-400" /> },
                  { id: "004", name: "Master Bed Frame", status: "Pending", icon: <QrCode className="w-5 h-5 text-slate-400" /> },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3 relative z-20">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                      <Box className="w-6 h-6 text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800 text-sm">{item.name}</div>
                      <div className="text-slate-400 text-xs font-mono mt-0.5">ID: {item.id}</div>
                    </div>
                    {item.icon}
                  </div>
                ))}
              </div>

              {/* App Bottom Nav */}
              <div className="h-20 bg-white border-t border-slate-100 flex items-center justify-around px-6 pb-4">
                <div className="flex flex-col items-center gap-1 text-blue-600">
                  <QrCode className="w-6 h-6" />
                  <span className="text-[10px] font-medium">Scan</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-slate-400">
                  <Camera className="w-6 h-6" />
                  <span className="text-[10px] font-medium">Photo</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-slate-400">
                  <PenTool className="w-6 h-6" />
                  <span className="text-[10px] font-medium">Sign</span>
                </div>
              </div>
            </motion.div>

            {/* --- FLOATING UI CARDS --- */}
            
            {/* Floating Card 1: Photo Proof */}
            <motion.div 
              style={{ x: card1X, y: card1Y }}
              className="absolute top-[15%] -left-[10%] md:-left-[20%] z-30 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 w-64"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">Condition Logged</div>
                <div className="text-xs text-slate-500 mt-0.5">Pre-existing scratch noted.</div>
              </div>
            </motion.div>

            {/* Floating Card 2: GPS Tracking */}
            <motion.div 
              style={{ x: card2X, y: card2Y }}
              className="absolute bottom-[25%] -right-[10%] md:-right-[20%] z-30 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 w-56"
            >
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">GPS Tagged</div>
                <div className="text-xs text-slate-500 mt-0.5">Location verified.</div>
              </div>
            </motion.div>

            {/* Floating Card 3: Multi-user Sync */}
            <motion.div 
              style={{ x: card3X, y: card3Y }}
              className="absolute top-[45%] -left-[15%] md:-left-[25%] z-10 bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-600">JD</div>
                <div className="w-8 h-8 rounded-full bg-green-100 border-2 border-white flex items-center justify-center text-xs font-bold text-green-600">MS</div>
                <div className="w-8 h-8 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-xs font-bold text-purple-600">+3</div>
              </div>
              <div className="text-xs font-medium text-slate-600">Crew syncing...</div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};
