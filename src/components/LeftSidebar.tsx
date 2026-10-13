/**
 * LeftSidebar: Single unified left column
 * Strictly retains:
 * 1. Legend (Without brackets, without arterial & metro, without "2d vector", without Palette icon)
 * 2. Cartographic Layers (Evident ON/OFF toggle, without surveillance zone rings)
 * 
 * Enhanced typography: Text enlarged 1.5x - 1.8x for high legibility.
 * Intro button positioned at the top-left most corner of the column.
 */

import React from 'react';
import {
  Tag,
  Route,
  Train,
  ChevronLeft,
  ChevronRight,
  Layers,
  ArrowLeft
} from 'lucide-react';

export interface LayerVisibilityState {
  showAreas: boolean;
  showRoads: boolean;
  showMetro: boolean;
  showZoneRings?: boolean;
}

interface LeftSidebarProps {
  layers: LayerVisibilityState;
  onToggleLayer: (layerKey: keyof LayerVisibilityState) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onReturnToIntro?: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  layers,
  onToggleLayer,
  isCollapsed,
  onToggleCollapse,
  onReturnToIntro
}) => {
  if (isCollapsed) {
    return (
      <aside className="relative z-20 flex-shrink-0 flex flex-col items-center justify-between py-3 w-12 h-full bg-[#181f2a] border-r border-[#2d3748] transition-all duration-200">
        {onReturnToIntro && (
          <button
            onClick={onReturnToIntro}
            className="w-8 h-8 flex items-center justify-center rounded-none bg-[#2b998a] hover:bg-[#34b3a1] active:bg-[#238073] text-[#070a0f] border-2 border-[#1f7a6e] hover:border-teal-200 shadow-[0_0_12px_rgba(43,153,138,0.55)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            title="Back to Introduction Page (Page 1)"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.8] text-[#070a0f]" />
          </button>
        )}
        <button
          onClick={onToggleCollapse}
          className="w-8 h-10 flex items-center justify-center rounded-xs bg-[#222b3a] hover:bg-[#2d384c] text-teal-400 hover:text-teal-300 border border-[#3b475a] shadow-lg transition-colors cursor-pointer"
          title="Expand Panel"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <div className="w-2" />
      </aside>
    );
  }

  return (
    <aside className="relative z-20 flex-shrink-0 w-[85vw] max-w-[340px] sm:w-88 md:w-96 h-full bg-[#181f2a]/95 border-r border-[#2d3748] flex flex-col text-slate-200 select-none shadow-xl transition-all duration-200 overflow-hidden">
      {/* Header: Intro button at the TOP LEFT MOST CORNER of the column */}
      <div className="flex items-center justify-between px-3.5 py-3 border-b border-[#2d3748] bg-[#141a23]">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Top-left most corner BACK button (Highlighted) */}
          {onReturnToIntro && (
            <button
              onClick={onReturnToIntro}
              className="px-3 py-1.5 rounded-none bg-[#2b998a] hover:bg-[#34b3a1] active:bg-[#238073] text-[#070a0f] border-2 border-[#1f7a6e] hover:border-teal-200 text-xs font-sans font-bold transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-1.5 shadow-[0_0_14px_rgba(43,153,138,0.55)] shrink-0"
              title="Back to Introduction Page (Page 1)"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.8] text-[#070a0f]" />
              <span className="font-bold tracking-widest text-[11px] uppercase">BACK</span>
            </button>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-sans font-bold text-base sm:text-lg tracking-tight text-white truncate">Ec(ak)ou</span>
            </div>
            <div className="text-xs font-sans font-medium text-slate-400 tracking-tight truncate mt-0.5">
              Cartographic Layers & Legend
            </div>
          </div>
        </div>

        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-xs text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-[#384557] transition-colors cursor-pointer shrink-0 ml-1"
          title="Collapse Panel"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Main Column Body: Non-scrollable, fit edge-to-edge */}
      <div className="flex-1 flex flex-col justify-between p-2.5 sm:p-3 space-y-2 overflow-hidden">

        {/* 1. LEGEND */}
        <div className="bg-[#1e2634]/90 border border-[#2e3a4d] rounded-none p-2.5 sm:p-3 shadow-inner">
          <div className="text-[13px] sm:text-[14px] font-sans font-bold tracking-tight text-white mb-2 pb-1 border-b border-white/10 flex items-center justify-between">
            <span>Legend</span>
          </div>

          <div className="space-y-2">
            {/* 1. Human-Only Languages & Argots */}
            <div className="flex items-start gap-2">
              <span className="w-3 h-3 rounded-none bg-[#2b998a] border border-[#5fb3a6] shrink-0 mt-0.5 shadow-xs" />
              <div className="min-w-0">
                <div className="text-white font-sans font-bold text-[12px] sm:text-[13px] leading-tight tracking-tight">
                  Human-Only Languages & Argots
                </div>
                <div className="text-[11px] sm:text-[11.5px] font-sans text-slate-400 leading-snug mt-0.5">
                  Secret communication that AI cannot easily understand.
                </div>
              </div>
            </div>

            {/* 2. Off-Grid Spaces */}
            <div className="flex items-start gap-2">
              <span className="w-3 h-3 rounded-none bg-[#8572a8] border border-[#a897cc] shrink-0 mt-0.5 shadow-xs" />
              <div className="min-w-0">
                <div className="text-white font-sans font-bold text-[12px] sm:text-[13px] leading-tight tracking-tight">
                  Off-Grid Spaces
                </div>
                <div className="text-[11px] sm:text-[11.5px] font-sans text-slate-400 leading-snug mt-0.5">
                  Spaces that block or weaken surveillance signals.
                </div>
              </div>
            </div>

            {/* 3. AI Surveillance Zones */}
            <div className="flex items-start gap-2">
              <span className="w-3 h-3 rounded-none bg-[#b84e47] border border-[#d4827d] shrink-0 mt-0.5 shadow-xs" />
              <div className="min-w-0">
                <div className="text-white font-sans font-bold text-[12px] sm:text-[13px] leading-tight tracking-tight">
                  AI Surveillance Zones
                </div>
                <div className="text-[11px] sm:text-[11.5px] font-sans text-slate-400 leading-snug mt-0.5">
                  Areas heavily monitored by AI-powered microphones and cameras.
                </div>
              </div>
            </div>

            {/* 4. AI-Recognised Corridors */}
            <div className="flex items-start gap-2">
              <span className="w-3 h-3 rounded-none bg-[#487eb3] border border-[#7ea4cc] shrink-0 mt-0.5 shadow-xs" />
              <div className="min-w-0">
                <div className="text-white font-sans font-bold text-[12px] sm:text-[13px] leading-tight tracking-tight">
                  AI-Recognised Corridors
                </div>
                <div className="text-[11px] sm:text-[11.5px] font-sans text-slate-400 leading-snug mt-0.5">
                  Routes where standardised English and AI-readable language are commonly used
                </div>
              </div>
            </div>

            {/* 5. Base Map */}
            <div className="flex items-start gap-2">
              <span className="w-3 h-3 rounded-none bg-[#384352] border border-[#13171e] shrink-0 mt-0.5 shadow-xs" />
              <div className="min-w-0">
                <div className="text-white font-sans font-bold text-[12px] sm:text-[13px] leading-tight tracking-tight">
                  Base Map
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. CARTOGRAPHIC LAYERS: Reduced text size, fit edge-to-edge */}
        <div className="bg-[#1e2634]/90 border border-[#2e3a4d] rounded-none p-2.5 sm:p-3 shadow-inner">
          <div className="text-[13px] sm:text-[14px] font-sans font-bold tracking-tight text-white mb-2 pb-1 border-b border-white/10 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              <span>Cartographic Layers</span>
            </span>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            {/* 1. Area & Ward Badges */}
            <div
              onClick={() => onToggleLayer('showAreas')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 sm:py-2 rounded-none border transition-all cursor-pointer ${
                layers.showAreas
                  ? 'bg-[#1b2636] border-teal-500/50 shadow-xs'
                  : 'bg-[#141b25] border-[#253040] hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <Tag className={`w-3.5 h-3.5 ${layers.showAreas ? 'text-teal-400' : 'text-slate-500'}`} />
                <span className={`font-sans font-medium text-[12px] sm:text-[13px] tracking-tight ${layers.showAreas ? 'text-white font-semibold' : 'text-slate-400'}`}>
                  Area & Ward Badges
                </span>
              </div>
              
              {/* Hard-edged Evident ON / OFF toggle button */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className={`font-mono text-[10px] font-bold px-1.5 py-0.2 rounded-none border transition-colors ${
                  layers.showAreas
                    ? 'text-teal-300 border-teal-500/50 bg-teal-950/60'
                    : 'text-slate-500 border-slate-700 bg-slate-900/60'
                }`}>
                  {layers.showAreas ? 'ON' : 'OFF'}
                </span>
                <div
                  className={`w-7 h-4 rounded-none p-0.5 flex items-center transition-all ${
                    layers.showAreas
                      ? 'bg-teal-400 justify-end shadow-[0_0_6px_rgba(45,212,191,0.5)]'
                      : 'bg-slate-800 justify-start border border-slate-700'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-none transition-transform ${layers.showAreas ? 'bg-slate-950 shadow-xs' : 'bg-slate-500'}`} />
                </div>
              </div>
            </div>

            {/* 2. Arterial & Ring Roads */}
            <div
              onClick={() => onToggleLayer('showRoads')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 sm:py-2 rounded-none border transition-all cursor-pointer ${
                layers.showRoads
                  ? 'bg-[#1b2636] border-slate-400/50 shadow-xs'
                  : 'bg-[#141b25] border-[#253040] hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <Route className={`w-3.5 h-3.5 ${layers.showRoads ? 'text-slate-200' : 'text-slate-500'}`} />
                <span className={`font-sans font-medium text-[12px] sm:text-[13px] tracking-tight ${layers.showRoads ? 'text-white font-semibold' : 'text-slate-400'}`}>
                  Arterial & Ring Roads
                </span>
              </div>
              
              {/* Hard-edged Evident ON / OFF toggle button */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className={`font-mono text-[10px] font-bold px-1.5 py-0.2 rounded-none border transition-colors ${
                  layers.showRoads
                    ? 'text-slate-200 border-slate-400/50 bg-slate-800/60'
                    : 'text-slate-500 border-slate-700 bg-slate-900/60'
                }`}>
                  {layers.showRoads ? 'ON' : 'OFF'}
                </span>
                <div
                  className={`w-7 h-4 rounded-none p-0.5 flex items-center transition-all ${
                    layers.showRoads
                      ? 'bg-slate-200 justify-end shadow-[0_0_6px_rgba(255,255,255,0.4)]'
                      : 'bg-slate-800 justify-start border border-slate-700'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-none transition-transform ${layers.showRoads ? 'bg-slate-950 shadow-xs' : 'bg-slate-500'}`} />
                </div>
              </div>
            </div>

            {/* 3. Metro Skeleton Lines */}
            <div
              onClick={() => onToggleLayer('showMetro')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 sm:py-2 rounded-none border transition-all cursor-pointer ${
                layers.showMetro
                  ? 'bg-[#1b2636] border-purple-500/50 shadow-xs'
                  : 'bg-[#141b25] border-[#253040] hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <Train className={`w-3.5 h-3.5 ${layers.showMetro ? 'text-purple-300' : 'text-slate-500'}`} />
                <span className={`font-sans font-medium text-[12px] sm:text-[13px] tracking-tight ${layers.showMetro ? 'text-white font-semibold' : 'text-slate-400'}`}>
                  Metro Skeleton Lines
                </span>
              </div>
              
              {/* Hard-edged Evident ON / OFF toggle button */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className={`font-mono text-[10px] font-bold px-1.5 py-0.2 rounded-none border transition-colors ${
                  layers.showMetro
                    ? 'text-purple-300 border-purple-500/50 bg-purple-950/60'
                    : 'text-slate-500 border-slate-700 bg-slate-900/60'
                }`}>
                  {layers.showMetro ? 'ON' : 'OFF'}
                </span>
                <div
                  className={`w-7 h-4 rounded-none p-0.5 flex items-center transition-all ${
                    layers.showMetro
                      ? 'bg-purple-400 justify-end shadow-[0_0_6px_rgba(192,132,252,0.5)]'
                      : 'bg-slate-800 justify-start border border-slate-700'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-none transition-transform ${layers.showMetro ? 'bg-slate-950 shadow-xs' : 'bg-slate-500'}`} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Info */}
      <div className="px-3.5 py-2.5 border-t border-[#2d3748] bg-[#141a23] text-[11px] sm:text-xs font-sans text-slate-400 flex items-center justify-between">
        <span className="font-medium tracking-tight">Bengaluru Cartography</span>
        <span className="text-teal-400 font-mono font-semibold">2026–2050</span>
      </div>
    </aside>
  );
};
