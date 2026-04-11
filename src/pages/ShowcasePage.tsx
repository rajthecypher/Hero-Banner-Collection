import React from 'react';
import { Hero } from '../components/Hero';
import { AIHeroBanner } from '../components/AIHeroBanner';
import { LightHeroBanner } from '../components/LightHeroBanner';
import { CinematicHero } from '../components/CinematicHero';
import { PortalHero } from '../components/PortalHero';
import { ScrollSequenceHero } from '../components/ScrollSequenceHero';
import { FerrofluidHero } from '../components/FerrofluidHero';
import { QuantumHero } from '../components/QuantumHero';
import { EclipseHero } from '../components/EclipseHero';
import { RiftHero } from '../components/RiftHero';
import { ConvergenceHero } from '../components/ConvergenceHero';
import { ArchitectureHero } from '../components/ArchitectureHero';
import { CoreHero } from '../components/CoreHero';
import { ScrollRevealHero } from '../components/ScrollRevealHero';
import { Link } from 'react-router-dom';

export const ShowcasePage = () => {
  return (
    <div className="bg-black min-h-screen font-sans selection:bg-cyan-500/30">
      
      {/* Navigation to the new page */}
      <div className="fixed top-4 right-4 z-50">
        <Link 
          to="/speedy-inventory" 
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-3 rounded-full font-bold text-sm transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] flex items-center gap-2"
        >
          View Speedy Inventory App
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Link>
      </div>

      {/* --- MARKER: Base Hero Section --- */}
      <div id="hero-base">
        <Hero />
      </div>

      {/* --- MARKER: AI Animated Banner --- */}
      <div id="hero-ai-banner">
        <AIHeroBanner />
      </div>

      {/* --- MARKER: Light Theme Apple-esque Banner --- */}
      <div id="hero-light-banner">
        <LightHeroBanner />
      </div>

      {/* --- MARKER: Cinematic Spotlight Hero --- */}
      <div id="hero-cinematic">
        <CinematicHero />
      </div>

      {/* --- MARKER: Portal/Hidden Reality Hero --- */}
      <div id="hero-portal">
        <PortalHero />
      </div>

      {/* --- MARKER: Scroll Narrative Sequence --- */}
      <div id="hero-scroll-sequence">
        <ScrollSequenceHero />
      </div>

      {/* --- MARKER: Ferrofluid Liquid Simulation --- */}
      <div id="hero-ferrofluid">
        <FerrofluidHero />
      </div>

      {/* --- MARKER: Quantum Chromatic Aberration --- */}
      <div id="hero-quantum">
        <QuantumHero />
      </div>

      {/* --- MARKER: Solar Eclipse Interactive --- */}
      <div id="hero-eclipse">
        <EclipseHero />
      </div>

      {/* --- MARKER: Dimensional Rift Scroll --- */}
      <div id="hero-rift">
        <RiftHero />
      </div>

      {/* --- MARKER: Convergence / 3D Dashboard Reveal --- */}
      <div id="hero-convergence">
        <ConvergenceHero />
      </div>

      {/* --- MARKER: 3D Architecture Exploded View --- */}
      <div id="hero-architecture">
        <ArchitectureHero />
      </div>

      {/* --- MARKER: Core Singularity Shockwave --- */}
      <div id="hero-core">
        <CoreHero />
      </div>

      {/* --- MARKER: Standalone Scroll Reveal Animation --- */}
      <div id="hero-scroll-reveal">
        <ScrollRevealHero />
      </div>
    </div>
  );
};
