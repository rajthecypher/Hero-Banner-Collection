import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import { 
  QrCode, 
  Camera, 
  MapPin, 
  ShieldCheck, 
  Box, 
  CheckCircle2,
  ArrowRight,
  ScanLine,
  FileText,
  Smartphone
} from 'lucide-react';

// --- Reusable Mockup Component (Renders both Light and X-Ray versions) ---
const MockupComposition = ({ isXRay }: { isXRay: boolean }) => {
  return (
    <div className="relative w-[320px] md:w-[400px] h-[600px] flex items-center justify-center">
      
      {/* --- CENTRAL PHONE MOCKUP --- */}
      <div 
        className={`absolute w-[280px] h-[580px] rounded-[3rem] border-[8px] shadow-2xl overflow-hidden flex flex-col transition-colors duration-300
          ${isXRay 
            ? 'bg-slate-950 border-cyan-900/50 shadow-[0_0_50px_rgba(6,182,212,0.15)]' 
            : 'bg-white border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)]'
          }`}
      >
        {/* Phone Notch */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
          <div className={`w-32 h-6 rounded-b-3xl ${isXRay ? 'bg-cyan-950/80' : 'bg-slate-100'}`} />
        </div>

        {/* App Header */}
        <div className={`pt-12 pb-6 px-6 ${isXRay ? 'bg-cyan-950/30 border-b border-cyan-900/50' : 'bg-blue-600'}`}>
          <div className="flex justify-between items-center mb-4">
            <span className={`font-mono text-xs ${isXRay ? 'text-cyan-400' : 'text-blue-200 font-semibold'}`}>
              {isXRay ? 'SYS.ID: 4829_X' : 'Job #4829'}
            </span>
            <span className={`text-xs ${isXRay ? 'text-cyan-500/70 font-mono' : 'text-blue-200'}`}>
              {isXRay ? 'SYNCING...' : 'In Progress'}
            </span>
          </div>
          <div className={`text-2xl font-bold ${isXRay ? 'text-white font-mono tracking-tight' : 'text-white'}`}>
            {isXRay ? 'SMITH_RELOCATION' : 'Smith Relocation'}
          </div>
        </div>

        {/* App Content (Inventory List) */}
        <div className={`flex-1 p-4 space-y-3 relative ${isXRay ? 'bg-slate-950' : 'bg-slate-50'}`}>
          
          {/* Scanning Line (Only in Light mode to show normal app function) */}
          {!isXRay && (
            <motion.div 
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 3, ease: "linear", repeat: Infinity }}
              className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-blue-400/10 to-blue-500/20 border-b border-blue-500/50 z-30 pointer-events-none"
            />
          )}

          {/* Grid Overlay (Only in X-Ray) */}
          {isXRay && (
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          )}

          {/* List Items */}
          {[
            { id: "001", name: "Leather Sofa", status: "VERIFIED", hex: "0x4A2F" },
            { id: "002", name: "Dining Table", status: "VERIFIED", hex: "0x9B1C" },
            { id: "003", name: "65\" OLED TV", status: "PENDING", hex: "0x2F8E" },
          ].map((item, i) => (
            <div 
              key={i} 
              className={`p-3 rounded-xl flex items-center gap-3 relative z-20 transition-colors
                ${isXRay 
                  ? 'bg-slate-900/50 border border-cyan-900/50 backdrop-blur-sm' 
                  : 'bg-white border border-slate-100 shadow-sm'
                }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                ${isXRay ? 'bg-cyan-950/50 border border-cyan-800/50' : 'bg-slate-100'}`}
              >
                {isXRay ? <ScanLine className="w-5 h-5 text-cyan-500" /> : <Box className="w-5 h-5 text-slate-400" />}
              </div>
              <div className="flex-1">
                <div className={`text-sm ${isXRay ? 'font-mono text-cyan-100' : 'font-semibold text-slate-800'}`}>
                  {isXRay ? `OBJ_${item.name.toUpperCase().replace(' ', '_')}` : item.name}
                </div>
                <div className={`text-xs mt-0.5 ${isXRay ? 'font-mono text-cyan-600' : 'text-slate-400 font-mono'}`}>
                  {isXRay ? `HASH: ${item.hex}` : `ID: ${item.id}`}
                </div>
              </div>
              {item.status === "VERIFIED" 
                ? <CheckCircle2 className={`w-5 h-5 ${isXRay ? 'text-cyan-400' : 'text-green-500'}`} />
                : <QrCode className={`w-5 h-5 ${isXRay ? 'text-cyan-800' : 'text-slate-300'}`} />
              }
            </div>
          ))}
        </div>
      </div>

      {/* --- FLOATING WIDGET 1: QR SCANNER --- */}
      <motion.div 
        className={`absolute -left-12 md:-left-24 top-32 p-4 rounded-2xl shadow-xl border backdrop-blur-md flex flex-col items-center gap-2
          ${isXRay ? 'bg-slate-900/80 border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.1)]' : 'bg-white/90 border-slate-100'}`}
      >
        <div className="relative overflow-hidden rounded-lg">
          <QrCode className={`w-16 h-16 ${isXRay ? 'text-cyan-400' : 'text-slate-800'}`} />
          {/* Laser Scan Animation */}
          <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
            className={`absolute left-0 right-0 h-0.5 shadow-[0_0_8px_currentColor] ${isXRay ? 'bg-cyan-400 text-cyan-400' : 'bg-red-500 text-red-500'}`}
          />
        </div>
        <div className={`text-[10px] font-mono tracking-widest ${isXRay ? 'text-cyan-500' : 'text-slate-400'}`}>
          {isXRay ? 'DECRYPTING...' : 'SCANNING'}
        </div>
      </motion.div>

      {/* --- FLOATING WIDGET 2: PHOTO PROOF --- */}
      <motion.div 
        className={`absolute -right-8 md:-right-16 bottom-40 p-3 rounded-2xl shadow-xl border backdrop-blur-md w-48
          ${isXRay ? 'bg-slate-900/80 border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.1)]' : 'bg-white/90 border-slate-100'}`}
      >
        <div className={`w-full h-24 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden
          ${isXRay ? 'bg-cyan-950/50 border border-cyan-500/30' : 'bg-slate-100'}`}
        >
          {isXRay && <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.2)_1px,transparent_1px)] bg-[size:10px_10px]" />}
          <Camera className={`w-8 h-8 relative z-10 ${isXRay ? 'text-cyan-500' : 'text-slate-400'}`} />
        </div>
        <div className={`text-xs ${isXRay ? 'font-mono text-cyan-400 leading-tight' : 'text-slate-600 font-medium'}`}>
          {isXRay ? (
            <>
              &gt; DAMAGE: FALSE<br/>
              &gt; CONFIDENCE: 99.8%
            </>
          ) : (
            'Condition: Pre-existing scratch noted.'
          )}
        </div>
      </motion.div>

      {/* --- FLOATING WIDGET 3: GPS TRACKING --- */}
      <motion.div 
        className={`absolute top-12 -right-4 md:-right-12 p-3 rounded-2xl shadow-xl border backdrop-blur-md flex items-center gap-3
          ${isXRay ? 'bg-slate-900/80 border-cyan-500/30' : 'bg-white/90 border-slate-100'}`}
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center
          ${isXRay ? 'bg-cyan-950 border border-cyan-500/50' : 'bg-indigo-50'}`}
        >
          <MapPin className={`w-5 h-5 ${isXRay ? 'text-cyan-400' : 'text-indigo-600'}`} />
        </div>
        <div>
          <div className={`text-sm font-bold ${isXRay ? 'font-mono text-cyan-100' : 'text-slate-800'}`}>
            {isXRay ? 'GPS_LOCKED' : 'Location Tagged'}
          </div>
          <div className={`text-[10px] ${isXRay ? 'font-mono text-cyan-600' : 'text-slate-500'}`}>
            {isXRay ? 'LAT: 40.7128 N' : 'Verified at pickup.'}
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export const SpeedyInventoryAdvanced = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse tracking relative to the container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse tracking for 3D parallax
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // 3D Parallax Transforms (mapped from mouse position relative to center)
  const rotateX = useTransform(smoothMouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [15, -15]);
  const rotateY = useTransform(smoothMouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-15, 15]);

  // X-Ray Mask Template
  const maskImage = useMotionTemplate`radial-gradient(circle 250px at ${smoothMouseX}px ${smoothMouseY}px, black 0%, transparent 100%)`;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-screen bg-slate-50 overflow-hidden font-sans border-t border-slate-200 flex items-center"
    >
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] opacity-50" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-400/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-8 items-center pt-24 lg:pt-0">
        
        {/* --- LEFT COLUMN: COPY & CTAS --- */}
        <div className="max-w-2xl relative z-50 pointer-events-none lg:pointer-events-auto">
          
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="relative w-12 h-12 flex items-center justify-center">
              {/* Abstract Sphere Logo */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500 drop-shadow-md">
                <ellipse cx="50" cy="50" rx="45" ry="45" fill="none" stroke="currentColor" strokeWidth="3" className="opacity-20" />
                <ellipse cx="50" cy="50" rx="45" ry="25" fill="none" stroke="currentColor" strokeWidth="3" className="opacity-50" transform="rotate(30 50 50)" />
                <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke="currentColor" strokeWidth="3" className="opacity-80" transform="rotate(60 50 50)" />
                <ellipse cx="50" cy="50" rx="45" ry="5" fill="none" stroke="currentColor" strokeWidth="3" transform="rotate(90 50 50)" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-slate-900 leading-none tracking-tight">SPEEDY</span>
              <span className="text-sm font-semibold text-blue-500 leading-none tracking-widest uppercase">Inventory</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6">
            <ShieldCheck className="w-4 h-4" />
            DOT Approved & Trusted by 500+ Companies
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
            Digitize the Move.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              See the Data.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
            Replace messy paper sheets with verifiable, photo-based digital tracking. Hover over the interface to reveal the powerful data layer powering your operations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 pointer-events-auto">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold text-lg transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 group">
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl font-semibold text-lg transition-all flex items-center justify-center gap-2 shadow-sm">
              Book a Demo
            </button>
          </div>

          {/* Key Selling Points */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-lg">Zero Paper</div>
                <div className="text-slate-500 text-sm">Eliminate lost records</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-lg">Crew Sync</div>
                <div className="text-slate-500 text-sm">Scan simultaneously</div>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: THE X-RAY INTERACTIVE SCENE --- */}
        <div className="relative h-[600px] lg:h-[800px] w-full perspective-1000 pointer-events-none">
          
          {/* Base Layer (Light Theme SaaS UI) */}
          <div className="absolute inset-0 z-10">
            <motion.div 
              style={{ rotateX, rotateY }} 
              className="w-full h-full flex items-center justify-center"
            >
              <MockupComposition isXRay={false} />
            </motion.div>
          </div>

          {/* X-Ray Layer (Dark/Neon Theme UI - Masked by Cursor) */}
          <motion.div 
            className="absolute inset-0 z-20"
            style={{ 
              WebkitMaskImage: maskImage, 
              maskImage: maskImage,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out'
            }}
          >
            {/* The X-Ray "Lens" Ring */}
            <motion.div 
              className="absolute w-[500px] h-[500px] rounded-full border border-cyan-500/30 shadow-[inset_0_0_50px_rgba(6,182,212,0.2)] pointer-events-none"
              style={{ 
                x: smoothMouseX, 
                y: smoothMouseY,
                translateX: '-50%',
                translateY: '-50%'
              }}
            />
            
            <motion.div 
              style={{ rotateX, rotateY }} 
              className="w-full h-full flex items-center justify-center"
            >
              <MockupComposition isXRay={true} />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
