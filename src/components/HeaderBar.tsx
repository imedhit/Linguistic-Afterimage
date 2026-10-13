/**
 * Editorial Masthead HeaderBar with Layer Toggles:
 * LANGUAGE / POPULATION / SURVEILLANCE / METRO
 */

import React from 'react';
import { Layers } from 'lucide-react';
import { MilestoneYear } from '../data/cityTimelineData';

export interface ActiveLayersState {
  language: boolean;
  population: boolean;
  surveillance: boolean;
  metro: boolean;
}

interface HeaderBarProps {
  layers: ActiveLayersState;
  onToggleLayer: (layerKey: keyof ActiveLayersState) => void;
  currentYear: MilestoneYear;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  layers,
  onToggleLayer,
  currentYear
}) => {
  return (
    <header className="h-14 shrink-0 px-4 sm:px-6 border-b border-white/10 bg-[#05070c]/95 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 z-30 select-none">
      
      {/* Editorial Title */}
      <div className="flex items-baseline gap-2.5">
        <span className="text-lg font-serif font-bold tracking-tight text-white">
          Ec(ak)ou
        </span>
        <span className="text-slate-600 text-xs font-mono">/</span>
        <span className="text-xs font-mono text-slate-400 tracking-wider hidden md:inline">
          Bengaluru Cartography · 2026–2050
        </span>
      </div>

      {/* Direct Layer Toggles: LANGUAGE / POPULATION / SURVEILLANCE / METRO */}
      <div className="flex items-center gap-1.5 bg-[#080b12] p-1 border border-white/10 rounded-xs shadow-inner">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 px-2 hidden lg:inline flex items-center gap-1">
          <Layers className="w-3 h-3 text-slate-400" />
          <span>LAYERS:</span>
        </span>

        {/* 1. LANGUAGE */}
        <button
          onClick={() => onToggleLayer('language')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono tracking-wider rounded-xs transition-all ${
            layers.language
              ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/50 shadow-[0_0_10px_rgba(0,245,212,0.25)] font-semibold'
              : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
          }`}
          title="Toggle Language Layer"
        >
          <span className={`w-2 h-2 rounded-full ${layers.language ? 'bg-cyan-400 shadow-[0_0_6px_#00f5d4]' : 'bg-slate-600'}`} />
          <span>LANGUAGE</span>
        </button>

        {/* 2. POPULATION */}
        <button
          onClick={() => onToggleLayer('population')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono tracking-wider rounded-xs transition-all ${
            layers.population
              ? 'bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-400/50 shadow-[0_0_10px_rgba(217,70,239,0.25)] font-semibold'
              : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
          }`}
          title="Toggle Population Shift Layer"
        >
          <span className={`w-2 h-2 rounded-full ${layers.population ? 'bg-fuchsia-400 shadow-[0_0_6px_#d946ef]' : 'bg-slate-600'}`} />
          <span>POPULATION</span>
        </button>

        {/* 3. SURVEILLANCE */}
        <button
          onClick={() => onToggleLayer('surveillance')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono tracking-wider rounded-xs transition-all ${
            layers.surveillance
              ? 'bg-amber-500/20 text-amber-200 border border-amber-400/50 shadow-[0_0_10px_rgba(245,158,11,0.25)] font-semibold'
              : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
          }`}
          title="Toggle AI Surveillance Layer"
        >
          <span className={`w-2 h-2 rounded-full ${layers.surveillance ? 'bg-amber-400 shadow-[0_0_6px_#f59e0b]' : 'bg-slate-600'}`} />
          <span>SURVEILLANCE</span>
        </button>

        {/* 4. METRO */}
        <button
          onClick={() => onToggleLayer('metro')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono tracking-wider rounded-xs transition-all ${
            layers.metro
              ? 'bg-purple-500/20 text-purple-200 border border-purple-400/50 shadow-[0_0_10px_rgba(168,85,247,0.25)] font-semibold'
              : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
          }`}
          title="Toggle Real BMRCL Metro Layer"
        >
          <span className={`w-2 h-2 rounded-full ${layers.metro ? 'bg-purple-400 shadow-[0_0_6px_#a855f7]' : 'bg-slate-600'}`} />
          <span>METRO</span>
        </button>
      </div>

      {/* Current Year Badge */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-cyan-300 px-2 py-0.5 bg-cyan-400/10 border border-cyan-400/20 rounded-xs tabular-nums">
          YEAR {currentYear}
        </span>
      </div>

    </header>
  );
};
