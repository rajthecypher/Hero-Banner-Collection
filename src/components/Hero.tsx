import { motion } from 'motion/react';
import { ChevronDown, Zap, BarChart, Bot, Sparkles, TrendingUp } from 'lucide-react';
import { ParticleNetwork } from './ParticleNetwork';

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white">
      <ParticleNetwork />
      
      {/* Radial Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,78,99,0.3)_0%,rgba(0,0,0,1)_70%)] z-0 pointer-events-none" />

      {/* Floating Studio Elements */}
      <motion.div
        animate={{ y: [-20, 20, -20], rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-4 md:left-20 lg:left-32 z-20 hidden sm:flex items-center gap-3 bg-zinc-900/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl"
      >
        <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
          <Bot className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <div className="text-sm font-bold text-white">Agent 04</div>
          <div className="text-xs text-cyan-400">Optimizing Funnel...</div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [20, -20, 20], rotate: [2, -2, 2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-4 md:right-20 lg:right-32 z-20 hidden sm:flex items-center gap-3 bg-zinc-900/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl"
      >
        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
          <TrendingUp className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <div className="text-sm font-bold text-white">+324%</div>
          <div className="text-xs text-purple-400">Conversion Lift</div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm mb-8"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium text-zinc-300">Next-Gen AI Growth Engine</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-6 leading-tight relative"
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            Not Just Marketing.<br />
            We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Growth Engines.</span>
          </motion.div>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-zinc-400 max-w-3xl mb-12"
        >
          We synthesize data across all platforms to automate your marketing, generate high-quality leads, and scale your business autonomously.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <button className="relative group overflow-hidden rounded-full p-[1px] hover:scale-105 transition-transform">
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-spin-slow" style={{ animationDuration: '3s' }} />
            <div className="relative bg-black px-8 py-4 rounded-full flex items-center gap-2 transition-all duration-300 group-hover:bg-zinc-900">
              <Zap className="w-5 h-5 text-cyan-400" />
              <span className="font-semibold text-white">Initialize Growth</span>
            </div>
          </button>
          
          <button className="px-8 py-4 rounded-full text-zinc-300 hover:text-white transition-colors flex items-center gap-2 hover:bg-white/5">
            <BarChart className="w-5 h-5" />
            <span>View Live Data</span>
          </button>
        </motion.div>

      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500"
      >
        <span className="text-sm tracking-widest uppercase">Scroll to explore</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </div>
  );
};
