import React from 'react';
import { Twitter, Linkedin, Github, Box } from 'lucide-react';

export const SpeedyFooter = () => {
  return (
    <div className="p-4 md:p-5 bg-slate-50">
      <footer className="bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 rounded-[2rem] md:rounded-[2.5rem] pt-16 pb-8 px-8 md:px-16 relative overflow-hidden text-white shadow-2xl">
        
        {/* Massive Watermark Text */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end pointer-events-none select-none overflow-hidden opacity-10">
          <span className="text-[18vw] font-black leading-[0.75] tracking-tighter">SPEEDY</span>
        </div>

        {/* Top CTA Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 relative z-10">
          <div className="max-w-2xl">
            <span className="bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6 inline-block backdrop-blur-sm border border-white/10">
              JOIN THE DIGITAL REVOLUTION
            </span>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
              Ready to streamline your moving business?
            </h2>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-blue-600 px-8 py-3.5 rounded-full font-bold hover:bg-slate-50 transition-colors shadow-lg">
                Get Started
              </button>
              <button className="bg-white/10 text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20">
                Book a Demo
              </button>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center w-64 h-64 relative">
            {/* 3D-ish Box Graphic */}
            <div className="absolute inset-0 bg-white/10 rounded-3xl rotate-12 backdrop-blur-sm border border-white/20 animate-pulse" />
            <div className="absolute inset-0 bg-cyan-400/20 rounded-3xl -rotate-6 backdrop-blur-md border border-white/30" />
            <Box className="w-32 h-32 text-white relative z-10 drop-shadow-2xl" />
          </div>
        </div>

        <hr className="border-white/20 mb-16 relative z-10" />

        {/* Bottom Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10 mb-24">
          <div className="md:col-span-5">
            <img 
              src="https://res.cloudinary.com/dqfkbfqx2/image/upload/v1775892526/logo-cropped_nvwbf2.png" 
              alt="Speedy Inventory" 
              className="h-10 mb-6 brightness-0 invert" 
            />
            <p className="text-blue-100 max-w-sm mb-8 text-lg">
              Manage your inventory effortlessly. Ditch the paper, track everything, and build trust with your customers.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"><Github className="w-4 h-4" /></a>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h4 className="font-bold text-lg mb-6">Use Link</h4>
            <ul className="space-y-4 text-blue-100">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Testimonial</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <p className="text-blue-100 leading-relaxed">
              105 North 1st Street, #28,<br />
              San Jose, CA 94748
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-blue-200 text-sm relative z-10 pt-8 border-t border-white/10">
          <p>© {new Date().getFullYear()} Design & Developed by Speedy</p>
          <a href="#" className="hover:text-white transition-colors mt-4 md:mt-0">Privacy Policy</a>
        </div>

      </footer>
    </div>
  );
};
