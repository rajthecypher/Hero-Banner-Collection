import React from 'react';
import { Lock } from 'lucide-react';

const TeaserOverlay = ({ title }: { title: string }) => (
  <div className="absolute inset-0 z-10 backdrop-blur-[16px] bg-slate-50/40 flex flex-col items-center justify-center">
    <div className="bg-white/90 border border-slate-200 shadow-2xl rounded-full px-6 py-3 flex items-center gap-3 transform transition-transform hover:scale-105 cursor-default">
      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
        <Lock className="w-4 h-4 text-blue-600" />
      </div>
      <span className="font-bold text-slate-800 text-lg tracking-tight">{title}</span>
      <div className="w-px h-6 bg-slate-200 mx-1" />
      <span className="text-blue-600 text-xs px-2 py-1 rounded-md font-bold tracking-widest uppercase bg-blue-50">
        Client Preview
      </span>
    </div>
  </div>
);

export const SpeedyInventoryTeasers = () => {
  return (
    <div className="bg-slate-50 py-24 space-y-32 overflow-hidden">
      
      {/* 1. Dashboard Design Teaser */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 relative z-20">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Powerful Dashboard</h2>
          <p className="text-slate-500 mt-4">Complete visibility into your operations.</p>
        </div>
        <div className="relative h-[500px] md:h-[600px] rounded-[2.5rem] border border-slate-200 bg-slate-100 overflow-hidden shadow-sm">
          <TeaserOverlay title="Dashboard Interface" />
          {/* Fake Dashboard UI */}
          <div className="absolute inset-0 p-6 md:p-8 flex gap-6 opacity-70 pointer-events-none">
            {/* Sidebar */}
            <div className="hidden md:flex w-64 bg-white rounded-2xl shadow-sm border border-slate-100 flex-col gap-6 p-6">
              <div className="h-8 bg-slate-100 rounded-lg w-3/4 mb-8" />
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded bg-slate-100" />
                  <div className="h-4 bg-slate-100 rounded w-full" />
                </div>
              ))}
            </div>
            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="h-20 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center px-6 justify-between">
                <div className="h-6 bg-slate-100 rounded w-1/4" />
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100" />
                  <div className="w-10 h-10 rounded-full bg-slate-100" />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between">
                    <div className="h-4 bg-slate-100 rounded w-1/2" />
                    <div className="h-10 bg-blue-50 rounded w-3/4" />
                  </div>
                ))}
              </div>
              <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="h-6 bg-slate-100 rounded w-1/4 mb-8" />
                <div className="w-full h-full bg-gradient-to-t from-slate-100 to-transparent rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Pricing Tables Teaser */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 relative z-20">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Simple Pricing</h2>
          <p className="text-slate-500 mt-4">Plans that scale with your moving business.</p>
        </div>
        <div className="relative h-[600px] rounded-[2.5rem] overflow-hidden">
          <TeaserOverlay title="Pricing Plans" />
          {/* Fake Pricing UI */}
          <div className="absolute inset-0 flex flex-col md:flex-row justify-center items-center gap-8 opacity-70 pointer-events-none px-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`w-full md:w-80 rounded-3xl shadow-sm border p-8 flex flex-col ${i === 2 ? 'h-[500px] bg-blue-50 border-blue-100' : 'h-[420px] bg-white border-slate-100'}`}>
                <div className={`h-6 rounded w-1/2 mb-4 ${i === 2 ? 'bg-blue-200' : 'bg-slate-100'}`} />
                <div className={`h-12 rounded w-3/4 mb-8 ${i === 2 ? 'bg-blue-200' : 'bg-slate-100'}`} />
                <div className="space-y-4 flex-1">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className={`h-3 rounded w-full ${i === 2 ? 'bg-blue-100' : 'bg-slate-50'}`} />
                  ))}
                </div>
                <div className={`h-12 rounded-xl w-full mt-8 ${i === 2 ? 'bg-blue-500' : 'bg-slate-100'}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Testimonials Teaser */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 relative z-20">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Trusted by Movers</h2>
          <p className="text-slate-500 mt-4">See what our partners are saying.</p>
        </div>
        <div className="relative h-[500px] rounded-[2.5rem] overflow-hidden">
          <TeaserOverlay title="Client Testimonials" />
          {/* Fake Testimonials UI */}
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-70 pointer-events-none p-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-48 flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-slate-100" />
                  <div>
                    <div className="w-24 h-4 bg-slate-100 rounded mb-2" />
                    <div className="w-16 h-3 bg-slate-50 rounded" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-3 bg-slate-50 rounded" />
                  <div className="w-5/6 h-3 bg-slate-50 rounded" />
                  <div className="w-4/6 h-3 bg-slate-50 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQs Teaser */}
      <section className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 relative z-20">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Common Questions</h2>
          <p className="text-slate-500 mt-4">Everything you need to know.</p>
        </div>
        <div className="relative h-[400px] rounded-[2.5rem] overflow-hidden">
          <TeaserOverlay title="FAQ Section" />
          {/* Fake FAQ UI */}
          <div className="absolute inset-0 flex flex-col gap-4 opacity-70 pointer-events-none p-4 justify-center">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full h-16 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center px-6 justify-between">
                <div className="w-1/2 h-4 bg-slate-100 rounded" />
                <div className="w-6 h-6 rounded-full bg-slate-50" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Blogs Teaser */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 relative z-20">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Latest Insights</h2>
          <p className="text-slate-500 mt-4">News and tips from the industry.</p>
        </div>
        <div className="relative h-[500px] rounded-[2.5rem] overflow-hidden">
          <TeaserOverlay title="Blog & News" />
          {/* Fake Blog UI */}
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 gap-8 opacity-70 pointer-events-none p-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col">
                <div className="h-48 bg-slate-100" />
                <div className="p-6 flex flex-col gap-4">
                  <div className="w-20 h-4 bg-blue-50 rounded" />
                  <div className="w-full h-6 bg-slate-100 rounded" />
                  <div className="w-4/5 h-6 bg-slate-100 rounded" />
                  <div className="w-full h-3 bg-slate-50 rounded mt-4" />
                  <div className="w-2/3 h-3 bg-slate-50 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
