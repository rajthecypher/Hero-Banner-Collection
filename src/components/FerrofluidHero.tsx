import { motion, useMotionValue, useSpring } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const FerrofluidHero = () => {
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  const mouseX = useMotionValue(windowSize.width / 2);
  const mouseY = useMotionValue(windowSize.height / 2);

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

  // Create different spring physics for different "droplets"
  // This creates the organic, trailing, liquid effect
  const createSpring = (stiffness: number, damping: number) => {
    return {
      x: useSpring(mouseX, { stiffness, damping }),
      y: useSpring(mouseY, { stiffness, damping })
    };
  };

  const droplets = [
    // Core mass (follows closely but heavily)
    { ...createSpring(40, 20), size: 300 },
    { ...createSpring(30, 15), size: 250 },
    // Trailing masses
    { ...createSpring(20, 10), size: 180 },
    { ...createSpring(15, 8), size: 150 },
    { ...createSpring(10, 5), size: 100 },
    // Fast, small satellites
    { ...createSpring(80, 25), size: 80 },
    { ...createSpring(60, 20), size: 60 },
    { ...createSpring(100, 30), size: 40 },
  ];

  return (
    <div className="relative min-h-screen bg-white overflow-hidden border-t border-zinc-200">
      
      {/* SVG Filter for the Gooey Liquid Effect */}
      <svg className="absolute hidden">
        <defs>
          <filter id="gooey-effect">
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 80 -40" 
              result="gooey" 
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* The Liquid Container */}
      <div 
        className="absolute inset-0 w-full h-full z-10"
        style={{ filter: 'url(#gooey-effect)' }}
      >
        {/* Central Static Breathing Mass */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 0.9, 1],
            x: ['-50%', '-48%', '-52%', '-50%'],
            y: ['-50%', '-52%', '-48%', '-50%']
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-black rounded-full"
        />

        {/* Dynamic Interactive Droplets */}
        {droplets.map((droplet, i) => (
          <motion.div
            key={i}
            className="absolute top-0 left-0 bg-black rounded-full"
            style={{
              width: droplet.size,
              height: droplet.size,
              x: droplet.x,
              y: droplet.y,
              marginLeft: -droplet.size / 2,
              marginTop: -droplet.size / 2,
            }}
          />
        ))}
      </div>

      {/* 
        Typography & UI Layer 
        Using mix-blend-difference so the text automatically inverts 
        from black (on white bg) to white (when the black liquid passes behind it)
      */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center mix-blend-difference text-white px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-6"
        >
          <span className="font-mono text-sm tracking-[0.3em] uppercase border border-white/30 px-4 py-2 rounded-full">
            Organic Intelligence
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[6rem] md:text-[10rem] lg:text-[14rem] font-display font-bold leading-[0.8] tracking-tighter text-center"
        >
          ADAPT.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-8 text-xl md:text-3xl font-light max-w-3xl text-center leading-relaxed"
        >
          Marketing shouldn't be static. We build living, breathing systems that mold to your market in real-time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 pointer-events-auto"
        >
          <button className="group flex items-center gap-4 text-2xl font-medium hover:gap-8 transition-all duration-500">
            <span>Initiate Sequence</span>
            <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-500">
              <ArrowRight className="w-6 h-6" />
            </div>
          </button>
        </motion.div>

      </div>

    </div>
  );
};
