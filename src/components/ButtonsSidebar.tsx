/**
 * ButtonsSidebar: Left-hand control panel
 * Houses timeline playback, scrubber, milestone quick-jumps,
 * map navigation buttons, and layer visibility toggles.
 */

import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layers,
  MapPin,
  Sliders,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Train,
  Tag,
  Route
} from 'lucide-react';
import { getNarrativeForYear } from '../data/languageRegionsData';

export interface LayerVisibilityState {
  showAreas: boolean;
  showRoads: boolean;
  showMetro: boolean;
  showZoneRings: boolean;
}

export interface SectorQuickNav {
  id: string;
  label: string;
  sublabel: string;
  coordinates: [number, number];
  zoom: number;
}

const SECTOR_NAV_HUBS: SectorQuickNav[] = [
  { id: 'central', label: 'Central Pete', sublabel: 'Chickpet / Majestic', coordinates: [12.9700, 77.5750], zoom: 14.5 },
  { id: 'canton', label: 'Cantonment', sublabel: 'MG Road / Russell', coordinates: [12.9800, 77.6050], zoom: 14.5 },
  { id: 'east', label: 'East SEZ', sublabel: 'Whitefield / ORR', coordinates: [12.9720, 77.7250], zoom: 14 },
  { id: 'south', label: 'South Tech', sublabel: 'Electronic City / Silk Board', coordinates: [12.8700, 77.6550], zoom: 13.8 },
  { id: 'north', label: 'North Hub', sublabel: 'Hebbal / Peenya', coordinates: [13.0300, 77.5750], zoom: 14 }
];

const MILESTONES = [
  { year: 2026, label: 'Baseline', desc: 'Census Plurality' },
  { year: 2030, label: 'Pockets', desc: 'Bazaar Argots' },
  { year: 2040, label: 'Connected', desc: 'SEZ Corridors' },
  { year: 2050, label: 'Network', desc: 'Polyglot Mesh' }
];

interface ButtonsSidebarProps {
  currentYear: number;
  onYearChange: (year: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  playSpeed: number;
  onChangeSpeed: (speed: number) => void;
  layers: LayerVisibilityState;
  onToggleLayer: (layerKey: keyof LayerVisibilityState) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onFlyTo: (lat: number, lng: number, zoom?: number) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const ButtonsSidebar: React.FC<ButtonsSidebarProps> = ({
  currentYear,
  onYearChange,
  isPlaying,
  onTogglePlay,
  onReset,
  playSpeed,
  onChangeSpeed,
  layers,
  onToggleLayer,
  onZoomIn,
  onZoomOut,
  onResetView,
  onFlyTo,
  isCollapsed,
  onToggleCollapse
}) => {
  const currentNarrative = getNarrativeForYear(currentYear);

  if (isCollapsed) {
    return (
      <aside className="relative z-20 flex-shrink-0 flex items-center justify-center w-12 h-full bg-[#181f2a] border-r border-[#2d3748] transition-all duration-200">
        <button
          onClick={onToggleCollapse}
          className="w-8 h-10 flex items-center justify-center rounded-sm bg-[#222b3a] hover:bg-[#2d384c] text-teal-400 hover:text-teal-300 border border-[#3b475a] shadow-lg transition-colors cursor-pointer"
          title="Expand Controls & Buttons Panel"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </aside>
    );
  }

  const handleStepYear = (delta: number) => {
    const next = Math.max(2026, Math.min(2050, currentYear + delta));
    onYearChange(next);
  };

  return (
    <aside className="relative z-20 flex-shrink-0 w-80 h-full bg-[#181f2a] border-r border-[#2d3748] flex flex-col text-slate-200 select-none shadow-xl transition-all duration-200 overflow-hidden">
      {/* Top Header & Collapse Toggle */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2d3748] bg-[#141a23]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-sm tracking-tight text-white">Ec(ak)ou</span>
            <span className="text-[10px] font-mono text-teal-400 bg-teal-950/70 border border-teal-800/80 px-1.5 py-0.5 rounded-xs uppercase tracking-wider">
              Controls
            </span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 tracking-wider">
            Bengaluru Cartography 2026–2050
          </div>
        </div>

        <button
          onClick={onToggleCollapse}
          className="p-1 rounded-sm text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-[#384557] transition-colors"
          title="Collapse Panel"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable controls body */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 space-y-4 custom-scrollbar">
        
        {/* SECTION 1: TIMELINE PLAYBACK & BIG YEAR */}
        <div className="bg-[#1e2634] border border-[#2e3a4d] rounded-sm p-3 shadow-inner">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Timeline Year</span>
              <div className="text-3xl font-serif font-bold text-white tracking-tight flex items-baseline gap-2">
                {currentYear}
                <span className="text-[10px] font-mono font-normal text-teal-300 uppercase px-1.5 py-0.5 bg-teal-950/60 border border-teal-700/60 rounded-xs">
                  {currentNarrative.stageName}
                </span>
              </div>
            </div>

            {/* Playback speed selector */}
            <div className="flex items-center gap-1 bg-[#141b25] p-0.5 rounded-xs border border-[#2b3648] text-[9px] font-mono">
              {[1, 1.5, 2].map(speed => (
                <button
                  key={speed}
                  onClick={() => onChangeSpeed(speed)}
                  className={`px-1.5 py-0.5 rounded-xs transition-colors ${
                    playSpeed === speed
                      ? 'bg-teal-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title={`${speed}x playback speed`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          {/* Scrubber slider */}
          <div className="space-y-1 mb-3">
            <input
              type="range"
              min={2026}
              max={2050}
              step={1}
              value={currentYear}
              onChange={e => onYearChange(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-[#121822] rounded-lg appearance-none cursor-pointer accent-teal-400"
            />
            <div className="flex justify-between text-[9px] font-mono text-slate-500">
              <span>2026</span>
              <span>2032</span>
              <span>2038</span>
              <span>2044</span>
              <span>2050</span>
            </div>
          </div>

          {/* Main Action Buttons: Play/Pause, Step, Reset */}
          <div className="grid grid-cols-4 gap-1.5">
            <button
              onClick={onTogglePlay}
              style={{
                backgroundColor: isPlaying ? '#10b981' : '#ffffff',
                color: '#090d16',
                boxShadow: isPlaying ? '0 0 12px rgba(16,185,129,0.5)' : '0 0 10px rgba(255,255,255,0.4)',
              }}
              className="col-span-2 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xs font-mono text-xs font-semibold tracking-wider transition-all cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  <span>PLAY TIMELINE</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleStepYear(-1)}
              disabled={currentYear <= 2026}
              className="flex items-center justify-center py-2 px-1 bg-[#141b25] hover:bg-[#253041] disabled:opacity-40 text-slate-300 disabled:hover:bg-[#141b25] border border-[#2b3648] rounded-xs font-mono text-[10px] transition-colors"
              title="Previous Year (-1)"
            >
              <SkipBack className="w-3 h-3" />
            </button>

            <button
              onClick={() => handleStepYear(1)}
              disabled={currentYear >= 2050}
              className="flex items-center justify-center py-2 px-1 bg-[#141b25] hover:bg-[#253041] disabled:opacity-40 text-slate-300 disabled:hover:bg-[#141b25] border border-[#2b3648] rounded-xs font-mono text-[10px] transition-colors"
              title="Next Year (+1)"
            >
              <SkipForward className="w-3 h-3" />
            </button>
          </div>

          <div className="mt-1.5 flex justify-end">
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-slate-200 transition-colors py-0.5 px-1.5 rounded-xs hover:bg-white/5"
              title="Reset timeline back to 2026"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Reset to 2026</span>
            </button>
          </div>
        </div>

        {/* SECTION 2: MILESTONES QUICK JUMP BUTTONS */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
            <Sliders className="w-3 h-3 text-teal-400" />
            <span>Milestone Stages</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {MILESTONES.map(m => {
              const isActive = currentYear === m.year;
              return (
                <button
                  key={m.year}
                  onClick={() => onYearChange(m.year)}
                  className={`flex flex-col text-left p-2 rounded-xs border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-950/80 border-teal-500/70 text-teal-200 shadow-[0_0_8px_rgba(45,212,191,0.2)]'
                      : 'bg-[#1a2230] hover:bg-[#222c3e] border-[#2c3749] text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-white">{m.year}</span>
                    <span className={`text-[9px] font-mono uppercase ${isActive ? 'text-teal-300' : 'text-slate-400'}`}>
                      {m.label}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 truncate mt-0.5">
                    {m.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: MAP VIEW & ZOOM BUTTONS */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
            <Maximize2 className="w-3 h-3 text-teal-400" />
            <span>Map Extents & Zoom</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={onZoomIn}
              className="flex items-center justify-center gap-1 py-1.5 px-2 bg-[#1a2230] hover:bg-[#242f42] border border-[#2c3749] rounded-xs text-xs font-mono text-slate-200 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5 text-teal-300" />
              <span>In (+)</span>
            </button>

            <button
              onClick={onZoomOut}
              className="flex items-center justify-center gap-1 py-1.5 px-2 bg-[#1a2230] hover:bg-[#242f42] border border-[#2c3749] rounded-xs text-xs font-mono text-slate-200 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5 text-teal-300" />
              <span>Out (−)</span>
            </button>

            <button
              onClick={onResetView}
              className="flex items-center justify-center gap-1 py-1.5 px-2 bg-[#1a2230] hover:bg-[#242f42] border border-[#2c3749] rounded-xs text-xs font-mono text-slate-200 transition-colors"
              title="Fit Bangalore Metropolitan Extent"
            >
              <RotateCcw className="w-3 h-3 text-slate-400" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* SECTION 4: LAYER VISIBILITY TOGGLES */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
            <Layers className="w-3 h-3 text-teal-400" />
            <span>Cartographic Layers</span>
          </div>

          <div className="space-y-1 text-xs font-mono">
            {/* Areas */}
            <button
              onClick={() => onToggleLayer('showAreas')}
              className={`w-full flex items-center justify-between p-2 rounded-none border transition-colors ${
                layers.showAreas
                  ? 'bg-teal-950/40 border-teal-600/50 text-teal-100'
                  : 'bg-[#161d27] border-[#253040] text-slate-500 hover:text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5" />
                <span>Area & Ward Badges</span>
              </div>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-none font-bold uppercase ${
                layers.showAreas ? 'bg-teal-400 text-slate-950' : 'bg-slate-800 text-slate-500'
              }`}>
                {layers.showAreas ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Roads */}
            <button
              onClick={() => onToggleLayer('showRoads')}
              className={`w-full flex items-center justify-between p-2 rounded-none border transition-colors ${
                layers.showRoads
                  ? 'bg-slate-800/60 border-slate-600/60 text-slate-200'
                  : 'bg-[#161d27] border-[#253040] text-slate-500 hover:text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <Route className="w-3.5 h-3.5" />
                <span>Arterial & Ring Roads</span>
              </div>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-none font-bold uppercase ${
                layers.showRoads ? 'bg-slate-300 text-slate-950' : 'bg-slate-800 text-slate-500'
              }`}>
                {layers.showRoads ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Metro */}
            <button
              onClick={() => onToggleLayer('showMetro')}
              className={`w-full flex items-center justify-between p-2 rounded-none border transition-colors ${
                layers.showMetro
                  ? 'bg-purple-950/40 border-purple-600/50 text-purple-200'
                  : 'bg-[#161d27] border-[#253040] text-slate-500 hover:text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <Train className="w-3.5 h-3.5" />
                <span>Metro Skeleton Lines</span>
              </div>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-none font-bold uppercase ${
                layers.showMetro ? 'bg-purple-400 text-slate-950' : 'bg-slate-800 text-slate-500'
              }`}>
                {layers.showMetro ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Zone Rings */}
            <button
              onClick={() => onToggleLayer('showZoneRings')}
              className={`w-full flex items-center justify-between p-2 rounded-none border transition-colors ${
                layers.showZoneRings
                  ? 'bg-rose-950/40 border-rose-600/50 text-rose-200'
                  : 'bg-[#161d27] border-[#253040] text-slate-500 hover:text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Surveillance Zone Rings</span>
              </div>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-none font-bold uppercase ${
                layers.showZoneRings ? 'bg-rose-400 text-slate-950' : 'bg-slate-800 text-slate-500'
              }`}>
                {layers.showZoneRings ? 'ON' : 'OFF'}
              </span>
            </button>
          </div>
        </div>

        {/* SECTION 5: QUICK SECTOR JUMP BUTTONS */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
            <MapPin className="w-3 h-3 text-teal-400" />
            <span>Quick Sector Jump</span>
          </div>

          <div className="grid grid-cols-1 gap-1 text-xs font-mono">
            {SECTOR_NAV_HUBS.map(hub => (
              <button
                key={hub.id}
                onClick={() => onFlyTo(hub.coordinates[0], hub.coordinates[1], hub.zoom)}
                className="flex items-center justify-between p-1.5 bg-[#171e2a] hover:bg-[#202a3a] border border-[#283344] hover:border-teal-500/50 rounded-xs text-left transition-colors cursor-pointer group"
              >
                <div>
                  <div className="text-white text-[11px] group-hover:text-teal-300 font-medium">
                    {hub.label}
                  </div>
                  <div className="text-slate-400 text-[9px]">
                    {hub.sublabel}
                  </div>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-teal-300 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Footer Info */}
      <div className="px-3.5 py-2 border-t border-[#2d3748] bg-[#141a23] text-[9px] font-mono text-slate-500 flex items-center justify-between">
        <span>Cartography Engine v2.4</span>
        <span className="text-teal-400">2D Vector Mode</span>
      </div>
    </aside>
  );
};
