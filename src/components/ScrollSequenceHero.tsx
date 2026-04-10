import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import React, { useRef } from 'react';
import { Download } from 'lucide-react';

const standaloneHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Premium Scroll Reveal</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Space+Grotesk:wght@700&display=swap');
        body, html { margin: 0; padding: 0; background: #000; color: #fff; font-family: 'Inter', sans-serif; overflow-x: hidden; }
        .scroll-container { height: 400vh; position: relative; }
        .sticky-wrapper { position: sticky; top: 0; height: 100vh; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #000; }
        
        /* Intro */
        .intro-container { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 50; background: #000; }
        .intro-text { font-family: 'Space Grotesk', sans-serif; font-size: 6vw; font-weight: 700; text-align: center; line-height: 1.1; margin: 0; background: linear-gradient(180deg, #fff 0%, #71717a 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -0.03em; }
        
        /* Main Content */
        .content-wrapper { position: absolute; inset: 0; display: flex; max-width: 1400px; margin: 0 auto; padding: 5vh 5vw; opacity: 0; width: 100%; box-sizing: border-box; gap: 8vw; }
        
        /* Left Side (Images) */
        .left-side { flex: 1; position: relative; border-radius: 2vw; overflow: hidden; height: 90vh; border: 1px solid rgba(255,255,255,0.1); background: #111; }
        .img-layer { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transform-origin: center; }
        .img-2, .img-3 { clip-path: inset(100% 0 0 0); transform: scale(1.1); }
        
        /* Right Side (Cards) */
        .right-side { flex: 1; position: relative; display: flex; align-items: center; height: 90vh; }
        
        /* Progress Line */
        .progress-track { position: absolute; left: -4vw; top: 20%; bottom: 20%; width: 2px; background: rgba(255,255,255,0.1); }
        .progress-fill { position: absolute; top: 0; left: 0; width: 100%; background: #fff; height: 0%; }

        .card { position: absolute; opacity: 0; transform: translateY(40px); width: 100%; max-width: 500px; }
        .icon-box { width: 60px; height: 60px; border-radius: 50%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; margin-bottom: 30px; font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700; color: #fff; }
        .card h2 { font-family: 'Space Grotesk', sans-serif; font-size: 3.5rem; margin: 0 0 20px 0; line-height: 1.1; letter-spacing: -0.02em; color: #fff; }
        .card p { font-size: 1.25rem; color: #a1a1aa; line-height: 1.6; margin: 0; font-weight: 300; }
    </style>
</head>
<body>
    <div class="scroll-container">
        <div class="sticky-wrapper">
            <div class="intro-container">
                <h1 class="intro-text">The Next Evolution<br/>of Digital Experience.</h1>
            </div>
            <div class="content-wrapper">
                <div class="left-side">
                    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop" class="img-layer img-1" alt="Phase 1">
                    <img src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1200&auto=format&fit=crop" class="img-layer img-2" alt="Phase 2">
                    <img src="https://images.unsplash.com/photo-1618005192384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop" class="img-layer img-3" alt="Phase 3">
                </div>
                <div class="right-side">
                    <div class="progress-track">
                        <div class="progress-fill"></div>
                    </div>
                    <div class="card card-1">
                        <div class="icon-box">01</div>
                        <h2>Analyze & Adapt</h2>
                        <p>Our neural networks process millions of data points in real-time, identifying hidden patterns and opportunities before your competitors even wake up.</p>
                    </div>
                    <div class="card card-2">
                        <div class="icon-box">02</div>
                        <h2>Strategic Deployment</h2>
                        <p>Autonomous agents deploy targeted campaigns across multiple channels simultaneously, optimizing bids and creative assets on the fly.</p>
                    </div>
                    <div class="card card-3">
                        <div class="icon-box">03</div>
                        <h2>Exponential Scale</h2>
                        <p>Watch as the system compounds your growth. The more it runs, the smarter it gets, creating an unstoppable revenue engine.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        const container = document.querySelector('.scroll-container');
        const introContainer = document.querySelector('.intro-container');
        const introText = document.querySelector('.intro-text');
        const contentWrapper = document.querySelector('.content-wrapper');
        const img2 = document.querySelector('.img-2');
        const img3 = document.querySelector('.img-3');
        const card1 = document.querySelector('.card-1');
        const card2 = document.querySelector('.card-2');
        const card3 = document.querySelector('.card-3');
        const progressFill = document.querySelector('.progress-fill');

        let targetProgress = 0;
        let currentProgress = 0;

        window.addEventListener('scroll', () => {
            const rect = container.getBoundingClientRect();
            const maxScroll = rect.height - window.innerHeight;
            targetProgress = Math.max(0, Math.min(1, -rect.top / maxScroll));
        });

        function lerp(start, end, factor) {
            return start + (end - start) * factor;
        }

        function update() {
            currentProgress = lerp(currentProgress, targetProgress, 0.08);
            const p = currentProgress;

            // Intro (0 to 0.15)
            if (p <= 0.15) {
                const introP = p / 0.15;
                introText.style.transform = \`scale(\${1 + introP * 0.1}) translateY(\${-introP * 30}px)\`;
                introText.style.opacity = 1 - introP;
                introContainer.style.opacity = 1 - introP;
                contentWrapper.style.opacity = 0;
            } else {
                introContainer.style.opacity = 0;
                
                // Content Fade In (0.15 to 0.2)
                if (p <= 0.2) {
                    contentWrapper.style.opacity = (p - 0.15) / 0.05;
                } else {
                    contentWrapper.style.opacity = 1;
                }
            }

            // Progress Line
            if (p >= 0.2 && p <= 0.9) {
                const progP = (p - 0.2) / 0.7;
                progressFill.style.height = \`\${progP * 100}%\`;
            } else if (p < 0.2) {
                progressFill.style.height = '0%';
            } else {
                progressFill.style.height = '100%';
            }

            // Card 1 (0.2 to 0.4)
            if (p >= 0.15 && p < 0.45) {
                let c1P = 0;
                if (p < 0.25) c1P = (p - 0.2) / 0.05; // Fade in
                else if (p > 0.35) c1P = 1 - ((p - 0.35) / 0.05); // Fade out
                else c1P = 1; // Hold
                
                c1P = Math.max(0, Math.min(1, c1P));
                card1.style.opacity = c1P;
                card1.style.transform = \`translateY(\${(1 - c1P) * 40}px)\`;
            } else {
                card1.style.opacity = 0;
            }

            // Image 2 Reveal (0.35 to 0.45)
            if (p <= 0.35) {
                img2.style.clipPath = 'inset(100% 0 0 0)';
                img2.style.transform = 'scale(1.1)';
            } else if (p > 0.35 && p < 0.45) {
                const imgP = (p - 0.35) / 0.1;
                img2.style.clipPath = \`inset(\${100 - (imgP * 100)}% 0 0 0)\`;
                img2.style.transform = \`scale(\${1.1 - (imgP * 0.1)})\`;
            } else {
                img2.style.clipPath = 'inset(0% 0 0 0)';
                img2.style.transform = 'scale(1)';
            }

            // Card 2 (0.45 to 0.7)
            if (p >= 0.4 && p < 0.75) {
                let c2P = 0;
                if (p < 0.5) c2P = (p - 0.45) / 0.05; // Fade in
                else if (p > 0.6) c2P = 1 - ((p - 0.6) / 0.05); // Fade out
                else c2P = 1; // Hold
                
                c2P = Math.max(0, Math.min(1, c2P));
                card2.style.opacity = c2P;
                card2.style.transform = \`translateY(\${(1 - c2P) * 40}px)\`;
            } else {
                card2.style.opacity = 0;
            }

            // Image 3 Reveal (0.6 to 0.7)
            if (p <= 0.6) {
                img3.style.clipPath = 'inset(100% 0 0 0)';
                img3.style.transform = 'scale(1.1)';
            } else if (p > 0.6 && p < 0.7) {
                const imgP = (p - 0.6) / 0.1;
                img3.style.clipPath = \`inset(\${100 - (imgP * 100)}% 0 0 0)\`;
                img3.style.transform = \`scale(\${1.1 - (imgP * 0.1)})\`;
            } else if (p >= 0.7) {
                img3.style.clipPath = 'inset(0% 0 0 0)';
                img3.style.transform = 'scale(1)';
            }

            // Card 3 (0.7 to 0.95)
            if (p >= 0.65) {
                let c3P = 0;
                if (p < 0.75) c3P = (p - 0.7) / 0.05; // Fade in
                else if (p > 0.9) c3P = 1 - ((p - 0.9) / 0.05); // Fade out
                else c3P = 1; // Hold
                
                c3P = Math.max(0, Math.min(1, c3P));
                card3.style.opacity = c3P;
                card3.style.transform = \`translateY(\${(1 - c3P) * 40}px)\`;
            } else {
                card3.style.opacity = 0;
            }

            requestAnimationFrame(update);
        }
        
        update();
    </script>
</body>
</html>`;

export const ScrollSequenceHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress for buttery animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Intro Animations (0 to 0.15)
  const introScale = useTransform(smoothProgress, [0, 0.15], [1, 1.1]);
  const introY = useTransform(smoothProgress, [0, 0.15], [0, -50]);
  const introOpacity = useTransform(smoothProgress, [0, 0.1, 0.15], [1, 1, 0]);

  // Content Fade In (0.15 to 0.2)
  const contentOpacity = useTransform(smoothProgress, [0.15, 0.2], [0, 1]);

  // Progress Line (0.2 to 0.9)
  const progressHeight = useTransform(smoothProgress, [0.2, 0.9], ["0%", "100%"]);

  // Card 1 (0.2 to 0.4)
  const card1Opacity = useTransform(smoothProgress, [0.2, 0.25, 0.35, 0.4], [0, 1, 1, 0]);
  const card1Y = useTransform(smoothProgress, [0.2, 0.25, 0.35, 0.4], [40, 0, 0, -40]);

  // Image 2 Reveal (0.35 to 0.45)
  const img2Clip = useTransform(smoothProgress, [0.35, 0.45], ["inset(100% 0px 0px 0px)", "inset(0% 0px 0px 0px)"]);
  const img2Scale = useTransform(smoothProgress, [0.35, 0.45], [1.1, 1]);

  // Card 2 (0.45 to 0.65)
  const card2Opacity = useTransform(smoothProgress, [0.45, 0.5, 0.6, 0.65], [0, 1, 1, 0]);
  const card2Y = useTransform(smoothProgress, [0.45, 0.5, 0.6, 0.65], [40, 0, 0, -40]);

  // Image 3 Reveal (0.6 to 0.7)
  const img3Clip = useTransform(smoothProgress, [0.6, 0.7], ["inset(100% 0px 0px 0px)", "inset(0% 0px 0px 0px)"]);
  const img3Scale = useTransform(smoothProgress, [0.6, 0.7], [1.1, 1]);

  // Card 3 (0.7 to 0.9)
  const card3Opacity = useTransform(smoothProgress, [0.7, 0.75, 0.9, 0.95], [0, 1, 1, 0]);
  const card3Y = useTransform(smoothProgress, [0.7, 0.75, 0.9, 0.95], [40, 0, 0, -40]);

  const handleDownload = () => {
    const blob = new Blob([standaloneHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'premium-scroll-sequence.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black text-white border-t border-white/10">
      
      {/* Download Button (Fixed while in section) */}
      <div className="sticky top-6 z-50 flex justify-end px-6 max-w-[1400px] mx-auto w-full pointer-events-none">
        <button 
          onClick={handleDownload}
          className="pointer-events-auto flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-full text-sm font-medium transition-all shadow-2xl hover:scale-105"
        >
          <Download className="w-4 h-4" />
          Download Standalone HTML
        </button>
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center -mt-[68px]">
        
        {/* Intro Sequence */}
        <motion.div 
          className="absolute inset-0 z-50 flex items-center justify-center bg-black pointer-events-none"
          style={{ opacity: introOpacity }}
        >
          <motion.h1 
            style={{ scale: introScale, y: introY }}
            className="text-5xl md:text-7xl lg:text-[6vw] font-display font-bold text-center leading-[1.1] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500"
          >
            The Next Evolution<br/>of Digital Experience.
          </motion.h1>
        </motion.div>

        {/* Main Split Content */}
        <motion.div 
          className="absolute inset-0 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-[5vh] flex flex-col md:flex-row gap-12 lg:gap-24"
          style={{ opacity: contentOpacity }}
        >
          {/* Left Side: Images */}
          <div className="w-full md:w-1/2 relative h-[40vh] md:h-[90vh] rounded-[2vw] overflow-hidden border border-white/10 bg-zinc-900 mt-10 md:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop" 
              alt="Phase 1" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <motion.img 
              src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1200&auto=format&fit=crop" 
              alt="Phase 2" 
              style={{ clipPath: img2Clip, scale: img2Scale }}
              className="absolute inset-0 w-full h-full object-cover origin-center"
            />
            <motion.img 
              src="https://images.unsplash.com/photo-1618005192384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop" 
              alt="Phase 3" 
              style={{ clipPath: img3Clip, scale: img3Scale }}
              className="absolute inset-0 w-full h-full object-cover origin-center"
            />
          </div>

          {/* Right Side: Text Cards */}
          <div className="w-full md:w-1/2 relative h-[40vh] md:h-[90vh] flex items-center">
            
            {/* Progress Line */}
            <div className="hidden md:block absolute left-[-4vw] top-[20%] bottom-[20%] w-[2px] bg-white/10">
              <motion.div 
                className="absolute top-0 left-0 w-full bg-white"
                style={{ height: progressHeight }}
              />
            </div>

            {/* Card 1 */}
            <motion.div 
              className="absolute w-full max-w-[500px]"
              style={{ opacity: card1Opacity, y: card1Y }}
            >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 font-display text-xl font-bold text-white">
                01
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">Analyze & Adapt</h2>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light">
                Our neural networks process millions of data points in real-time, identifying hidden patterns and opportunities before your competitors even wake up.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              className="absolute w-full max-w-[500px]"
              style={{ opacity: card2Opacity, y: card2Y }}
            >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 font-display text-xl font-bold text-white">
                02
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">Strategic Deployment</h2>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light">
                Autonomous agents deploy targeted campaigns across multiple channels simultaneously, optimizing bids and creative assets on the fly.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              className="absolute w-full max-w-[500px]"
              style={{ opacity: card3Opacity, y: card3Y }}
            >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 font-display text-xl font-bold text-white">
                03
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">Exponential Scale</h2>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light">
                Watch as the system compounds your growth. The more it runs, the smarter it gets, creating an unstoppable revenue engine.
              </p>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </div>
  );
};
