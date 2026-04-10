import { motion } from 'motion/react';
import { ArrowRight, BarChart3, Sparkles, CheckCircle2, Network } from 'lucide-react';

export const LightHeroBanner = () => {
  return (
    <div className="relative min-h-screen bg-slate-50 flex items-center justify-center overflow-hidden border-t border-zinc-200">
      {/* Soft Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-blue-200/40 to-teal-100/40 blur-3xl" 
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 0], 
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-purple-200/40 to-pink-100/40 blur-3xl" 
        />
      </div>

      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-50" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
        
        {/* Left Content */}
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 text-zinc-600 mb-8 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium tracking-wide">Transparent AI. Measurable ROI.</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold text-zinc-900 leading-[1.1] mb-6 tracking-tight"
          >
            Growth, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Illuminated.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-600 mb-10 max-w-lg leading-relaxed"
          >
            Our AI doesn't hide in a black box. Watch in real-time as our agents optimize your funnels, score leads, and drive revenue with absolute clarity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="group px-8 py-4 bg-zinc-900 text-white rounded-full font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-900/20 hover:shadow-zinc-900/30 hover:-translate-y-0.5">
              Start Free Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white text-zinc-900 rounded-full font-medium flex items-center justify-center gap-2 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all shadow-sm">
              View Case Studies
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex items-center gap-6 text-sm text-zinc-500 font-medium"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              14-day free trial
            </div>
          </motion.div>
        </div>

        {/* Right Content - Light Bento Dashboard */}
        <div className="order-1 lg:order-2 relative h-[500px] md:h-[600px] w-full">
          
          {/* Main Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0 md:inset-4 bg-white/60 backdrop-blur-2xl border border-white shadow-2xl shadow-zinc-200/50 rounded-[2rem] p-6 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                  <Network className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900">Agent Network</h3>
                  <p className="text-xs text-zinc-500">Live Optimization</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Active
              </div>
            </div>

            {/* Bento Grid inside */}
            <div className="grid grid-cols-2 gap-4 flex-1">
              
              {/* Conversion Card */}
              <motion.div 
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="col-span-2 md:col-span-1 bg-gradient-to-br from-zinc-50 to-white rounded-2xl p-5 border border-zinc-100 shadow-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <BarChart3 className="w-16 h-16 text-blue-600" />
                </div>
                <p className="text-sm text-zinc-500 font-medium mb-1">Conversion Rate</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <h4 className="text-3xl font-display font-bold text-zinc-900">12.4%</h4>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+2.1%</span>
                </div>
                
                {/* Mini Graph - Continuous Wave */}
                <div className="h-12 w-full mt-auto flex items-end gap-1">
                  {[40, 30, 50, 40, 60, 50, 70, 65, 80, 90].map((height, i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: [`${height * 0.7}%`, `${height}%`, `${height * 0.7}%`] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                      className="flex-1 bg-blue-500/20 rounded-t-sm hover:bg-blue-500 transition-colors"
                    />
                  ))}
                </div>
              </motion.div>

              {/* Lead Quality Card */}
              <motion.div 
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="col-span-2 md:col-span-1 bg-gradient-to-br from-zinc-50 to-white rounded-2xl p-5 border border-zinc-100 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <p className="text-sm text-zinc-500 font-medium mb-1">Lead Quality Score</p>
                  <h4 className="text-3xl font-display font-bold text-zinc-900">94<span className="text-lg text-zinc-400 font-normal">/100</span></h4>
                </div>
                
                {/* Circular Progress */}
                <div className="relative w-24 h-24 mx-auto mt-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f4f4f5" strokeWidth="8" />
                    <motion.circle 
                      cx="50" cy="50" r="40" fill="none" 
                      stroke="url(#purple-gradient)" 
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="251.2"
                      initial={{ strokeDashoffset: 251.2 }}
                      whileInView={{ strokeDashoffset: 251.2 * (1 - 0.94) }}
                      viewport={{ once: false, margin: "-50px" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#d946ef" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                      <Sparkles className="w-6 h-6 text-purple-500" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Wide Card */}
              <motion.div 
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="col-span-2 bg-zinc-900 rounded-2xl p-5 text-white relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_infinite_linear]" />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-400 font-medium mb-1">AI Actions Taken</p>
                    <h4 className="text-2xl font-display font-bold">14,205</h4>
                  </div>
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center z-10">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

          {/* Floating Elements outside the card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ delay: 0.5 }}
            className="absolute -top-6 -right-6 md:-right-12 z-20"
          >
            <motion.div 
              animate={{ y: [-10, 10, -10] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white p-4 rounded-2xl shadow-xl shadow-zinc-200/50 border border-zinc-100 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold">+$</span>
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-medium">New Revenue</p>
                <p className="text-sm font-bold text-zinc-900">$4,200</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
