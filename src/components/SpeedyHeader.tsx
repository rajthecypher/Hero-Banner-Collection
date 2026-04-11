import React from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SpeedyHeader = () => {
  return (
    <header className="w-full z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/speedy-inventory" className="flex items-center">
            <img 
              src="https://res.cloudinary.com/dqfkbfqx2/image/upload/v1775892526/logo-cropped_nvwbf2.png" 
              alt="Speedy Inventory" 
              className="h-7 md:h-9 object-contain" 
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium">Features</a>
            <a href="#how-it-works" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium">How it Works</a>
            <a href="#pricing" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium">Pricing</a>
            <Link to="/" className="text-slate-400 hover:text-slate-900 transition-colors text-sm font-medium">Back to Showcase</Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors">Log in</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-bold text-sm transition-all shadow-[0_4px_14px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.6)] hover:-translate-y-0.5">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-600 hover:text-slate-900">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
