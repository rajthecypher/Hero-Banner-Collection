/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Hero } from './components/Hero';
import { AIHeroBanner } from './components/AIHeroBanner';
import { LightHeroBanner } from './components/LightHeroBanner';
import { CinematicHero } from './components/CinematicHero';
import { PortalHero } from './components/PortalHero';
import { ScrollSequenceHero } from './components/ScrollSequenceHero';
import { FerrofluidHero } from './components/FerrofluidHero';
import { QuantumHero } from './components/QuantumHero';
import { EclipseHero } from './components/EclipseHero';
import { RiftHero } from './components/RiftHero';
import { ConvergenceHero } from './components/ConvergenceHero';
import { ArchitectureHero } from './components/ArchitectureHero';
import { CoreHero } from './components/CoreHero';
import { SpeedyInventoryAdvanced } from './components/SpeedyInventoryAdvanced';
import { SpeedyInventoryShift } from './components/SpeedyInventoryShift';
import { ScrollRevealHero } from './components/ScrollRevealHero';

export default function App() {
  return (
    <div className="bg-black min-h-screen font-sans selection:bg-cyan-500/30">
      <Hero />
      <AIHeroBanner />
      <LightHeroBanner />
      <CinematicHero />
      <PortalHero />
      <ScrollSequenceHero />
      <FerrofluidHero />
      <QuantumHero />
      <EclipseHero />
      <RiftHero />
      <ConvergenceHero />
      <ArchitectureHero />
      <CoreHero />
      <SpeedyInventoryAdvanced />
      <SpeedyInventoryShift />
      <ScrollRevealHero />
    </div>
  );
}
