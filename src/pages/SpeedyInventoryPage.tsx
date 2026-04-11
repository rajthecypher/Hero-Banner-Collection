import React from 'react';
import { SpeedyHeader } from '../components/SpeedyHeader';
import { SpeedyFooter } from '../components/SpeedyFooter';
import { SpeedyInventoryAdvanced } from '../components/SpeedyInventoryAdvanced';
import { SpeedyInventoryShift } from '../components/SpeedyInventoryShift';
import { SpeedyInventoryProcess } from '../components/SpeedyInventoryProcess';
import { SpeedyInventoryTeasers } from '../components/SpeedyInventoryTeasers';

export const SpeedyInventoryPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-blue-500/30">
      <SpeedyHeader />
      
      <main>
        {/* We add a small top padding to account for the fixed header if needed, 
            but the hero might be designed to go under it. SpeedyInventoryAdvanced 
            is full screen, so we might just let it sit under the transparent header. */}
        <SpeedyInventoryAdvanced />
        <SpeedyInventoryShift />
        <SpeedyInventoryProcess />
        <SpeedyInventoryTeasers />
      </main>

      <SpeedyFooter />
    </div>
  );
};
