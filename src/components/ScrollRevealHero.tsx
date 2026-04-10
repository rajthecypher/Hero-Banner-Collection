import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'motion/react';
import { Download } from 'lucide-react';

const products = [
  {
    id: 1,
    title: "Quantum Core",
    description: "Next-generation processing unit with unparalleled speed and efficiency. Designed for the future of AI.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: 2,
    title: "Neural Link",
    description: "Seamless brain-computer interface. Experience direct data transfer with zero latency.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: 3,
    title: "Aether Drive",
    description: "Zero-point energy storage solution. Power your devices indefinitely without recharging.",
    image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=1000",
    color: "from-emerald-500/20 to-teal-500/20"
  }
];

export const ScrollRevealHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Intro Animation Values
  const introOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const introScale = useTransform(scrollYProgress, [0, 0.1], [1, 1.5]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Image 1 (Top) clips away from bottom to top to reveal Image 2
  const img1ClipProgress = useTransform(scrollYProgress, [0.15, 0.45], [0, 100]);
  const img1Clip = useMotionTemplate`inset(0 0 ${img1ClipProgress}% 0)`;

  // Image 2 (Middle) clips away from bottom to top to reveal Image 3
  const img2ClipProgress = useTransform(scrollYProgress, [0.45, 0.75], [0, 100]);
  const img2Clip = useMotionTemplate`inset(0 0 ${img2ClipProgress}% 0)`;

  // Text 1 (Visible 0.15 to 0.45)
  const text1Opacity = useTransform(scrollYProgress, [0.1, 0.15, 0.4, 0.45], [0, 1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0.1, 0.15, 0.4, 0.45], [30, 0, 0, -30]);
  const text1Pointer = useTransform(scrollYProgress, [0.15, 0.4], ["auto", "none"]);

  // Text 2 (Visible 0.45 to 0.75)
  const text2Opacity = useTransform(scrollYProgress, [0.4, 0.45, 0.7, 0.75], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.4, 0.45, 0.7, 0.75], [30, 0, 0, -30]);
  const text2Pointer = useTransform(scrollYProgress, [0.45, 0.7], ["auto", "none"]);

  // Text 3 (Visible 0.75 to 1.0)
  const text3Opacity = useTransform(scrollYProgress, [0.7, 0.75, 0.9, 1.0], [0, 1, 1, 1]);
  const text3Y = useTransform(scrollYProgress, [0.7, 0.75, 0.9, 1.0], [30, 0, 0, 0]);
  const text3Pointer = useTransform(scrollYProgress, [0.75, 1.0], ["auto", "auto"]);

  const handleDownload = () => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scroll Reveal Animation</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <style>
        body { margin: 0; background-color: #000; color: #fff; font-family: sans-serif; overflow-x: hidden; }
        .pin-container { height: 400vh; position: relative; }
        .sticky-wrapper { position: sticky; top: 0; height: 100vh; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        
        /* Intro */
        .intro-section { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 50; background: #000; }
        .intro-text { font-size: 5rem; font-weight: bold; text-align: center; background: linear-gradient(to right, #fff, #888); -webkit-background-clip: text; color: transparent; }
        
        /* Main Content */
        .content-grid { display: grid; grid-template-columns: 1fr 1fr; width: 100%; max-width: 1200px; height: 80vh; gap: 4rem; padding: 0 2rem; opacity: 0; }
        
        /* Left: Images */
        .image-container { position: relative; height: 100%; border-radius: 1.5rem; overflow: hidden; }
        .product-image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .image-mask { position: absolute; inset: 0; overflow: hidden; }
        
        /* Right: Text */
        .text-container { position: relative; height: 100%; display: flex; align-items: center; }
        .product-info { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; opacity: 0; transform: translateY(30px); }
        .product-info.active { opacity: 1; transform: translateY(0); transition: all 0.5s ease; }
        .product-title { font-size: 3rem; font-weight: bold; margin-bottom: 1rem; }
        .product-desc { font-size: 1.25rem; color: #aaa; line-height: 1.6; }
    </style>
</head>
<body>

    <div class="pin-container">
        <div class="sticky-wrapper">
            
            <!-- Intro Overlay -->
            <div class="intro-section" id="intro">
                <h1 class="intro-text" id="intro-text">DISCOVER<br>THE FUTURE</h1>
            </div>

            <!-- Main Content -->
            <div class="content-grid" id="main-content">
                <!-- Left Side: Images -->
                <div class="image-container">
                    <!-- Image 3 (Bottom) -->
                    <img src="${products[2].image}" class="product-image" alt="Product 3">
                    
                    <!-- Image 2 (Middle) -->
                    <div class="image-mask" id="mask-2">
                        <img src="${products[1].image}" class="product-image" alt="Product 2">
                    </div>
                    
                    <!-- Image 1 (Top) -->
                    <div class="image-mask" id="mask-1">
                        <img src="${products[0].image}" class="product-image" alt="Product 1">
                    </div>
                </div>

                <!-- Right Side: Text -->
                <div class="text-container">
                    <div class="product-info active" id="info-1">
                        <h2 class="product-title">${products[0].title}</h2>
                        <p class="product-desc">${products[0].description}</p>
                    </div>
                    <div class="product-info" id="info-2">
                        <h2 class="product-title">${products[1].title}</h2>
                        <p class="product-desc">${products[1].description}</p>
                    </div>
                    <div class="product-info" id="info-3">
                        <h2 class="product-title">${products[2].title}</h2>
                        <p class="product-desc">${products[2].description}</p>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <script>
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".pin-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        });

        // 1. Intro Animation (0% to 15% of scroll)
        tl.to("#intro-text", { scale: 1.5, opacity: 0, duration: 1.5 })
          .to("#intro", { opacity: 0, duration: 1.5 }, "<")
          .to("#main-content", { opacity: 1, duration: 0.5 }, "-=0.5");

        // 2. Reveal Image 2 & Show Info 2 (15% to 45% of scroll)
        tl.to("#info-1", { opacity: 0, y: -30, duration: 1 })
          .to("#mask-1", { clipPath: "inset(0 0 100% 0)", duration: 3 }, "<") // Shrink mask from bottom
          .to("#info-2", { opacity: 1, y: 0, duration: 1 }, "-=1.5");

        // 3. Reveal Image 3 & Show Info 3 (45% to 75% of scroll)
        tl.to("#info-2", { opacity: 0, y: -30, duration: 1 })
          .to("#mask-2", { clipPath: "inset(0 0 100% 0)", duration: 3 }, "<") // Shrink mask from bottom
          .to("#info-3", { opacity: 1, y: 0, duration: 1 }, "-=1.5");
    </script>
</body>
</html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scroll-reveal-animation.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="relative bg-black text-white">
      {/* Download Button */}
      <div className="absolute top-8 right-8 z-[100]">
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full backdrop-blur-md transition-all text-sm font-medium"
        >
          <Download className="w-4 h-4" />
          Download Standalone HTML
        </button>
      </div>

      {/* 
        The container needs to be very tall to allow for scrolling.
        We have 1 intro phase + 3 products = 4 "screens" of scrolling.
      */}
      <div ref={containerRef} className="h-[400vh] relative">
        
        {/* Sticky Container */}
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
          
          {/* --- INTRO OVERLAY --- */}
          <motion.div 
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black z-50 flex items-center justify-center pointer-events-none"
          >
            <motion.h1 
              style={{ scale: introScale, opacity: introOpacity }}
              className="text-6xl md:text-8xl font-bold text-center tracking-tighter"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                DISCOVER<br/>THE FUTURE
              </span>
            </motion.h1>
          </motion.div>

          {/* --- MAIN CONTENT --- */}
          <div className="w-full max-w-7xl mx-auto px-6 h-[80vh] grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
            
            {/* LEFT SIDE: Images */}
            <div className="relative w-full h-[50vh] md:h-[70vh] rounded-3xl overflow-hidden bg-slate-900 border border-white/10">
              
              {/* Image 3 (Bottom Layer) */}
              <div className="absolute inset-0 z-0">
                <img src={products[2].image} alt={products[2].title} className="w-full h-full object-cover opacity-80" />
                <div className={`absolute inset-0 bg-gradient-to-tr ${products[2].color} mix-blend-overlay`} />
              </div>

              {/* Image 2 (Middle Layer) */}
              <motion.div 
                className="absolute inset-0 z-10"
                style={{ clipPath: img2Clip }}
              >
                <img src={products[1].image} alt={products[1].title} className="w-full h-full object-cover opacity-80" />
                <div className={`absolute inset-0 bg-gradient-to-tr ${products[1].color} mix-blend-overlay`} />
              </motion.div>

              {/* Image 1 (Top Layer) */}
              <motion.div 
                className="absolute inset-0 z-20"
                style={{ clipPath: img1Clip }}
              >
                <img src={products[0].image} alt={products[0].title} className="w-full h-full object-cover opacity-80" />
                <div className={`absolute inset-0 bg-gradient-to-tr ${products[0].color} mix-blend-overlay`} />
              </motion.div>

            </div>

            {/* RIGHT SIDE: Content */}
            <div className="relative h-full flex items-center">
              
              {/* Text 1 */}
              <motion.div 
                className="absolute inset-x-0 flex flex-col justify-center"
                style={{ opacity: text1Opacity, y: text1Y, pointerEvents: text1Pointer as any }}
              >
                <div className="text-sm font-mono text-cyan-400 mb-4 tracking-widest">
                  01 // {products[0].title.toUpperCase()}
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                  {products[0].title}
                </h2>
                <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-lg">
                  {products[0].description}
                </p>
                <div className="mt-8">
                  <button className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-slate-200 transition-colors">
                    Explore Features
                  </button>
                </div>
              </motion.div>

              {/* Text 2 */}
              <motion.div 
                className="absolute inset-x-0 flex flex-col justify-center"
                style={{ opacity: text2Opacity, y: text2Y, pointerEvents: text2Pointer as any }}
              >
                <div className="text-sm font-mono text-purple-400 mb-4 tracking-widest">
                  02 // {products[1].title.toUpperCase()}
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                  {products[1].title}
                </h2>
                <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-lg">
                  {products[1].description}
                </p>
                <div className="mt-8">
                  <button className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-slate-200 transition-colors">
                    Explore Features
                  </button>
                </div>
              </motion.div>

              {/* Text 3 */}
              <motion.div 
                className="absolute inset-x-0 flex flex-col justify-center"
                style={{ opacity: text3Opacity, y: text3Y, pointerEvents: text3Pointer as any }}
              >
                <div className="text-sm font-mono text-emerald-400 mb-4 tracking-widest">
                  03 // {products[2].title.toUpperCase()}
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                  {products[2].title}
                </h2>
                <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-lg">
                  {products[2].description}
                </p>
                <div className="mt-8">
                  <button className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-slate-200 transition-colors">
                    Explore Features
                  </button>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
