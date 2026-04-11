import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { ScanLine, QrCode, CheckCircle2, MapPin, Package, FileSignature, Check } from 'lucide-react';

export const SpeedyInventoryProcess = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) setActiveStep(0);
    else if (latest < 0.66) setActiveStep(1);
    else setActiveStep(2);
  });

  const steps = [
    {
      num: "01",
      title: "Scan & Capture",
      desc: "Choose items using picklist, typing, or voice entry. Snap condition photos. Print QR labels with any office-store label printer."
    },
    {
      num: "02",
      title: "Track in Real-Time",
      desc: "Multiple crew members scan simultaneously. Tally & reconcile at every stop. Scan items in and out of vaults, storage units, and lift vans."
    },
    {
      num: "03",
      title: "Deliver with Proof",
      desc: "Capture digital signatures at every step. Auto-generate delivery reports. Transfer jobs between 3rd party carriers with full chain-of-custody."
    }
  ];

  return (
    <section ref={containerRef} className="h-[300vh] relative bg-slate-50 font-sans">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 md:px-12">
        
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-100/50 blur-3xl" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-cyan-100/50 blur-3xl" />
        </div>

        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
          
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center order-2 lg:order-1 mt-8 lg:mt-0">
            <div className="mb-12">
              <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2">Process</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Three steps. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Total control.</span>
              </h3>
              <p className="text-slate-500 text-lg md:text-xl">
                From the first scan to final signature — every item accounted for.
              </p>
            </div>

            <div className="space-y-8 relative">
              {/* Vertical Line connecting steps */}
              <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-200 hidden md:block" />

              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`relative flex gap-6 transition-all duration-500 ${activeStep === index ? 'opacity-100 translate-x-2' : 'opacity-30 hover:opacity-50'}`}
                >
                  <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg z-10 transition-colors duration-500 ${activeStep === index ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'bg-slate-200 text-slate-500'}`}>
                    {step.num}
                  </div>
                  <div>
                    <h4 className={`text-2xl font-bold mb-2 transition-colors duration-500 ${activeStep === index ? 'text-slate-900' : 'text-slate-600'}`}>
                      {step.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Phone Mockup */}
          <div className="flex justify-center items-center order-1 lg:order-2 h-[50vh] lg:h-auto">
            <div className="relative w-[280px] md:w-[320px] h-[580px] md:h-[650px] bg-white rounded-[3rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border-[10px] border-slate-100 overflow-hidden flex flex-col">
              
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-100 rounded-b-2xl z-50" />

              {/* Dynamic Screen Content */}
              <div className="flex-1 relative bg-slate-50 overflow-hidden">
                <AnimatePresence mode="wait">
                  
                  {/* STEP 1: Scan & Capture */}
                  {activeStep === 0 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 bg-slate-900"
                    >
                      {/* Fake Camera View */}
                      <div className="absolute inset-0 opacity-60 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center" />
                      
                      {/* Scanner UI Overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                        <div className="relative w-48 h-48 border-2 border-white/30 rounded-xl mb-8">
                          {/* Corner brackets */}
                          <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-500 rounded-tl-xl" />
                          <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-500 rounded-tr-xl" />
                          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-500 rounded-bl-xl" />
                          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-500 rounded-br-xl" />
                          
                          {/* Animated Laser */}
                          <motion.div 
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                          />
                        </div>

                        {/* Floating Success Card */}
                        <motion.div 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5, duration: 0.4 }}
                          className="bg-white/90 backdrop-blur-md p-4 rounded-2xl w-full shadow-xl flex items-center gap-4"
                        >
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                            <QrCode className="text-blue-600 w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-slate-500 font-medium">Item Scanned</p>
                            <p className="text-sm font-bold text-slate-900">#4029 - Leather Sofa</p>
                          </div>
                          <CheckCircle2 className="text-emerald-500 w-6 h-6 shrink-0" />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Track in Real-Time */}
                  {activeStep === 1 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 bg-slate-50 flex flex-col pt-12"
                    >
                      <div className="px-6 pb-4 border-b border-slate-200 bg-white">
                        <div className="flex items-center gap-2 text-blue-600 mb-1">
                          <MapPin className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase tracking-wider">Building B, Vault 3</span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">Inventory Sync</h3>
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        {/* Progress Ring */}
                        <div className="relative w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                            <motion.circle 
                              cx="50" cy="50" r="45" fill="none" stroke="#2563eb" strokeWidth="8"
                              strokeLinecap="round"
                              initial={{ strokeDasharray: "283", strokeDashoffset: "283" }}
                              animate={{ strokeDashoffset: "53" }} // ~81% (64/79)
                              transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-black text-slate-900">64</span>
                            <span className="text-xs text-slate-500 font-medium">of 79 items</span>
                          </div>
                        </div>

                        {/* List of items */}
                        <div className="space-y-3 flex-1">
                          {[1, 2, 3].map((i) => (
                            <motion.div 
                              key={i}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: i * 0.15 + 0.5 }}
                              className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3"
                            >
                              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                                <Check className="text-emerald-600 w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <div className="h-2 w-24 bg-slate-200 rounded-full mb-2" />
                                <div className="h-2 w-16 bg-slate-100 rounded-full" />
                              </div>
                              <span className="text-xs font-mono text-slate-400">#40{30-i}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Deliver with Proof */}
                  {activeStep === 2 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 bg-white flex flex-col pt-12"
                    >
                      <div className="px-6 pb-4 border-b border-slate-100">
                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                          <FileSignature className="text-blue-600 w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-1">Delivery Proof</h3>
                        <p className="text-sm text-slate-500">Please sign to confirm receipt of all 79 items.</p>
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        
                        {/* Signature Pad */}
                        <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 h-40 relative mb-6 flex items-center justify-center overflow-hidden">
                          <span className="absolute top-3 left-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Sign Here</span>
                          
                          {/* Animated SVG Signature */}
                          <svg className="w-full h-full absolute inset-0" viewBox="0 0 200 100">
                            <motion.path
                              d="M 40,60 C 50,40 60,30 70,50 C 80,70 90,80 100,60 C 110,40 120,50 130,70 C 140,90 150,60 160,50"
                              fill="transparent"
                              stroke="#0f172a"
                              strokeWidth="3"
                              strokeLinecap="round"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                            />
                          </svg>
                        </div>

                        {/* Meta Data */}
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2 }}
                          className="bg-slate-50 p-4 rounded-xl mb-auto"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-slate-500">Customer</span>
                            <span className="text-sm font-bold text-slate-900">Ron Moore</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-500">Timestamp</span>
                            <span className="text-sm font-bold text-slate-900">Jan 3, 2026 · 2:41 PM</span>
                          </div>
                        </motion.div>

                        {/* Complete Button */}
                        <motion.button 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2.2 }}
                          className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_10px_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                          Complete Job
                        </motion.button>

                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Phone Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-slate-300 rounded-full z-50" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
