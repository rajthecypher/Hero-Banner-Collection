import { motion, useMotionValue, useSpring, useTransform, animate } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import { Crosshair, Lock, Unlock } from 'lucide-react';

export const QuantumHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized distance from center (-1 to 1)
  const mouseX = useMotionValue(0.4);
  const mouseY = useMotionValue(0.3);

  // Viewport coordinates for the custom cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for the physics
  const springConfig = { stiffness: 80, damping: 20 };
  const springNormX = useSpring(mouseX, springConfig);
  const springNormY = useSpring(mouseY, springConfig);

  const cursorSpringX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const cursorSpringY = useSpring(cursorY, { stiffness: 300, damping: 30 });

  // Idle animation when not hovered
  useEffect(() => {
    if (!isHovered) {
      const controlsX = animate(mouseX, [0.4, -0.3, 0.5, -0.2, 0.4], { 
        duration: 15, 
        repeat: Infinity, 
        ease: "easeInOut" 
      });
      const controlsY = animate(mouseY, [0.3, -0.5, 0.2, -0.4, 0.3], { 
        duration: 18, 
        repeat: Infinity, 
        ease: "easeInOut" 
      });
      return () => {
        controlsX.stop();
        controlsY.stop();
      };
    }
  }, [isHovered, mouseX, mouseY]);

  const handleMouseMove = (e: React.MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalize from -1 to 1 based on container size
      const normX = (e.clientX - centerX) / (rect.width / 2);
      const normY = (e.clientY - centerY) / (rect.height / 2);

      mouseX.set(normX);
      mouseY.set(normY);
    }
  };

  // Non-linear curve to make it "snap" to clarity when near the center
  const curve = (v: number) => Math.sign(v) * Math.pow(Math.abs(v), 1.5);

  // Calculate chromatic offsets
  const cyanX = useTransform(springNormX, x => curve(x) * 150);
  const cyanY = useTransform(springNormY, y => curve(y) * 150);

  const magentaX = useTransform(springNormX, x => curve(x) * -120);
  const magentaY = useTransform(springNormY, y => curve(y) * 80);

  const yellowX = useTransform(springNormX, x => curve(x) * 80);
  const yellowY = useTransform(springNormY, y => curve(y) * -150);

  // Calculate blur based on distance from center
  const blurAmount = useTransform(springNormX, x => `blur(${Math.abs(curve(x)) * 20}px)`);
  const subtitleBlur = useTransform(springNormX, x => `blur(${Math.abs(curve(x)) * 5}px)`);

  // UI Opacity (shows "LOCKED" when perfectly aligned)
  const isAligned = useTransform(springNormX, x => Math.abs(x) < 0.05);
  const lockOpacity = useTransform(springNormX, x => 1 - Math.min(1, Math.abs(x) * 10));
  const unlockOpacity = useTransform(springNormX, x => Math.min(1, Math.abs(x) * 10));

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center border-t border-white/10 cursor-none"
    >
      {/* Cinematic Noise Overlay */}
      <div 
        className="absolute inset-0 z-10 opacity-20 pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} 
      />

      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, transparent 0%, #000 70%), linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '100% 100%, 4rem 4rem, 4rem 4rem' }} />

      {/* Custom Targeting Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
        style={{ 
          x: cursorSpringX, 
          y: cursorSpringY, 
          translateX: '-50%', 
          translateY: '-50%',
          opacity: isHovered ? 1 : 0
        }}
      >
        <div className="w-1 h-1 bg-white rounded-full" />
        <Crosshair className="absolute w-full h-full text-white/50" strokeWidth={1} />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-6">

        {/* Status UI */}
        <div className="absolute top-[-120px] flex flex-col items-center gap-3">
          <div className="relative h-6 flex items-center justify-center">
            <motion.div style={{ opacity: lockOpacity }} className="absolute flex items-center gap-2 text-white font-mono text-sm tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
              <Lock className="w-4 h-4" />
              <span>SIGNAL LOCKED</span>
            </motion.div>
            <motion.div style={{ opacity: unlockOpacity }} className="absolute flex items-center gap-2 text-red-500 font-mono text-sm tracking-widest">
              <Unlock className="w-4 h-4" />
              <span>ALIGN FREQUENCIES</span>
            </motion.div>
          </div>
          <div className="text-zinc-600 font-mono text-xs tracking-widest uppercase">
            Quantum Decryption Matrix v1.0
          </div>
        </div>

        {/* The Chromatic Typography */}
        <div className="relative text-[6rem] md:text-[10rem] lg:text-[14rem] font-display font-bold leading-none tracking-tighter uppercase select-none">
          
          {/* Cyan Layer */}
          <motion.div
            className="absolute inset-0 text-[#0ff] mix-blend-screen flex items-center justify-center whitespace-nowrap"
            style={{ x: cyanX, y: cyanY, filter: blurAmount }}
          >
            CLARITY.
          </motion.div>

          {/* Magenta Layer */}
          <motion.div
            className="absolute inset-0 text-[#f0f] mix-blend-screen flex items-center justify-center whitespace-nowrap"
            style={{ x: magentaX, y: magentaY, filter: blurAmount }}
          >
            CLARITY.
          </motion.div>

          {/* Yellow Layer */}
          <motion.div
            className="absolute inset-0 text-[#ff0] mix-blend-screen flex items-center justify-center whitespace-nowrap"
            style={{ x: yellowX, y: yellowY, filter: blurAmount }}
          >
            CLARITY.
          </motion.div>

          {/* Invisible relative text to give the container proper dimensions */}
          <span className="opacity-0 whitespace-nowrap">CLARITY.</span>
        </div>

        {/* Subtitle */}
        <motion.p
          className="mt-16 text-xl md:text-3xl text-zinc-300 font-light max-w-3xl text-center leading-relaxed"
          style={{ filter: subtitleBlur }}
        >
          We distill infinite noise into singular, actionable truth.
        </motion.p>

      </div>
    </div>
  );
};
