import { motion, useMotionValue, useSpring, useMotionTemplate, useTransform } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import { MousePointer2, Sparkles } from 'lucide-react';

export const LiquidPortalHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinates
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  // Smooth springs for the trailing portal blobs
  const springConfig1 = { stiffness: 100, damping: 20 };
  const springConfig2 = { stiffness: 80, damping: 25 };
  const springConfig3 = { stiffness: 60, damping: 30 };

  const x1 = useSpring(mouseX, springConfig1);
  const y1 = useSpring(mouseY, springConfig1);
  
  const x2 = useSpring(mouseX, springConfig2);
  const y2 = useSpring(mouseY, springConfig2);
  
  const x3 = useSpring(mouseX, springConfig3);
  const y3 = useSpring(mouseY, springConfig3);

  // Spring animations for the size of the portal blobs
  // When pressed, they expand massively to consume the screen
  const sizeSpringConfig = { stiffness: 40, damping: 15 };
  const size1 = useSpring(400, sizeSpringConfig);
  const size2 = useSpring(250, sizeSpringConfig);
  const size3 = useSpring(150, sizeSpringConfig);

  useEffect(() => {
    if (isPressed) {
      size1.set(3000);
      size2.set(2500);
      size3.set(2000);
    } else {
      size1.set(400);
      size2.set(250);
      size3.set(150);
    }
  }, [isPressed, size1, size2, size3]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  // Combine the three radial gradients into a single fluid mask
  const maskImage = useMotionTemplate`
    radial-gradient(circle ${size1}px at ${x1}px ${y1}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%),
    radial-gradient(circle ${size2}px at ${x2}px ${y2}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%),
    radial-gradient(circle ${size3}px at ${x3}px ${y3}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)
  `;

  // 3D Tilt effect based on mouse position
  const rotateX = useTransform(y1, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [10, -10]);
  const rotateY = useTransform(x1, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-10, 10]);

  // Parallax for the inner dark world
  const innerGridX = useTransform(x1, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-50, 50]);
  const innerGridY = useTransform(y1, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [-50, 50]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={(e) => {
        setIsPressed(true);
        mouseX.set(e.touches[0].clientX);
        mouseY.set(e.touches[0].clientY);
      }}
      onTouchEnd={() => setIsPressed(false)}
      onTouchMove={(e) => {
        mouseX.set(e.touches[0].clientX);
        mouseY.set(e.touches[0].clientY);
      }}
      className="relative min-h-screen bg-white overflow-hidden cursor-none select-none border-t border-zinc-200"
    >
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none flex items-center justify-center mix-blend-difference"
        style={{
          x: x3,
          y: y3,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isHovered ? 1 : 0
        }}
      >
        <motion.div 
          animate={{ scale: isPressed ? 0.5 : 1 }}
          className="w-20 h-20 rounded-full border border-white/50 flex items-center justify-center backdrop-blur-sm bg-white/10"
        >
          <span className="text-white text-xs font-mono tracking-widest font-bold">
            {isPressed ? 'TEARING' : 'HOLD'}
          </span>
        </motion.div>
      </motion.div>

      {/* ========================================== */}
      {/* OUTER LAYER (THE LIGHT REALITY)            */}
      {/* ========================================== */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        
        <motion.div style={{ rotateX, rotateY, perspective: 1000 }} className="flex flex-col items-center">
          <div className="mb-6 px-6 py-2 rounded-full border border-zinc-300 bg-zinc-50 text-zinc-800 font-mono text-sm tracking-[0.2em] uppercase shadow-sm">
            The Surface Illusion
          </div>
          
          <h1 className="text-[6rem] md:text-[10rem] lg:text-[14rem] font-display font-bold leading-[0.8] tracking-tighter text-black text-center">
            PARADIGM.
          </h1>
          
          <p className="mt-8 text-xl md:text-2xl text-zinc-500 font-light max-w-2xl text-center leading-relaxed px-6">
            Conventional design is a flat surface. We build experiences that contain hidden depths and alternate dimensions.
          </p>
        </motion.div>

      </div>

      {/* ========================================== */}
      {/* INNER LAYER (THE DARK PORTAL)              */}
      {/* ========================================== */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950 pointer-events-none"
        style={{
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          // The mask composite allows the multiple radial gradients to add together
          WebkitMaskComposite: 'add',
          maskComposite: 'add',
        }}
      >
        {/* Inner World Background & Parallax Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e1b4b,#000000)]" />
        
        <motion.div 
          style={{ 
            x: innerGridX, 
            y: innerGridY,
            backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(200px)',
          }}
          className="absolute inset-[-10%] w-[120%] h-[120%] opacity-30"
        />

        {/* Inner World Floating Orbs */}
        <motion.div style={{ x: innerGridX, y: innerGridY }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px]" />
        <motion.div style={{ x: useTransform(innerGridX, v => -v), y: useTransform(innerGridY, v => -v) }} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-[100px]" />

        {/* Inner World Content (Perfectly aligned with outer world) */}
        <motion.div style={{ rotateX, rotateY, perspective: 1000 }} className="relative flex flex-col items-center z-10">
          <div className="mb-6 px-6 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-mono text-sm tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(0,255,255,0.2)] flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            The True Dimension
          </div>
          
          <h1 className="text-[6rem] md:text-[10rem] lg:text-[14rem] font-display font-bold leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500 text-center drop-shadow-[0_0_40px_rgba(0,255,255,0.4)]">
            PARADIGM.
          </h1>
          
          <p className="mt-8 text-xl md:text-2xl text-cyan-100/80 font-light max-w-2xl text-center leading-relaxed px-6 drop-shadow-md">
            You have breached the surface. Welcome to a reality where digital experiences are living, breathing ecosystems.
          </p>
        </motion.div>

      </motion.div>

    </div>
  );
};
