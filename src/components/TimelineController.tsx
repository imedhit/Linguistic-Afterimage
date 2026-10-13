/**
 * 2026–2050 Thinned Bottom Ribbon Timeline Controller
 * Placed at the bottom as an ultra-slim horizontal ribbon.
 * Designed to NEVER interrupt or occlude the map view.
 *
 * Height: ~46px - 50px ultra-thin sleek bar.
 * Features:
 * - Play / Pause toggle & Reset button
 * - Big Year counter + Stage Name badge
 * - Ultra-thin luminous scrubber slider with milestone tick marks
 * - Milestone quick-jump buttons (2026, 2030, 2040, 2050)
 * - Demographic projections (Population, Migrant share)
 * - One-line narrative ticker / expandable narrative popover so the map is never blocked
 */

import React, { useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Info, ChevronUp, ChevronDown } from 'lucide-react';
import { getNarrativeForYear } from '../data/languageRegionsData';
import { getProjectionForYear } from '../data/bengaluru2050EvidencePack';

interface TimelineControllerProps {
  currentYear: number;
  onYearChange: (year: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
}

const MILESTONES = [
  { year: 2026, label: 'Baseline' },
  { year: 2030, label: 'Pockets' },
  { year: 2040, label: 'Connected' },
  { year: 2050, label: 'Network' },
];

export const TimelineController: React.FC<TimelineControllerProps> = ({
  currentYear,
  onYearChange,
  isPlaying,
  onTogglePlay,
  onReset
}) => {
  const currentNarrative = getNarrativeForYear(currentYear);
  const currentProjection = getProjectionForYear(currentYear);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showFullNarrative, setShowFullNarrative] = useState(false);

  // Percentage from 2026 (0%) to 2050 (100%)
  const pct = Math.max(0, Math.min(100, ((currentYear - 2026) / (2050 - 2026)) * 100));

  const updateYearFromPointer = (clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clampedX = Math.max(rect.left, Math.min(rect.right, clientX));
    const ratio = (clampedX - rect.left) / rect.width;
    const year = Math.round(2026 + ratio * (2050 - 2026));
    onYearChange(Math.max(2026, Math.min(2050, year)));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updateYearFromPointer(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      updateYearFromPointer(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // fallback
      }
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 w-full pointer-events-none select-none">
      
      {/* Optional Floating Popover for Full Narrative & Evidence without taking permanent screen space */}
      {showFullNarrative && (
        <div className="mb-2 mx-3 sm:mx-6 max-w-4xl pointer-events-auto bg-[#07090e]/95 border border-teal-500/30 backdrop-blur-xl rounded-sm p-3.5 shadow-2xl text-slate-200 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-sans font-bold text-white tracking-tight">Year {currentYear}</span>
              {currentNarrative.stageName && currentNarrative.stageName.toLowerCase() !== 'almost no regions' && (
                <span className="text-[10px] font-mono text-teal-300 font-bold uppercase tracking-wider">
                  [{currentNarrative.stageName}]
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
              <span className="text-slate-300 font-semibold">{currentProjection.totalPopulationFormatted} POP</span>
              <span>·</span>
              <span className="text-teal-300 font-semibold">{currentProjection.migrantSharePercent}% MIGRANTS</span>
              <button
                onClick={() => setShowFullNarrative(false)}
                className="ml-2 text-slate-400 hover:text-white px-1 py-0.5 rounded-xs hover:bg-white/10 transition-colors"
                title="Close details"
              >
                ✕
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans border-l-2 border-teal-400/60 pl-2.5">
            {currentNarrative.narrative}
          </p>
        </div>
      )}

      {/* The Ultra-Thin Bottom Fixed Ribbon (End-to-End Across Screen) */}
      <div className="w-full bg-[#161d28]/95 hover:bg-[#161d28]/98 border-t border-[#2d3a4d] border-x-0 border-b-0 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.5)] rounded-none px-3.5 py-2 pointer-events-auto text-slate-200 transition-all flex flex-col gap-1 ring-1 ring-white/5">
        
        {/* Main Ribbon Bar: Controls, Year, Scrubbing Track, Milestones, Stats */}
        <div className="flex items-center justify-between gap-2.5 sm:gap-4 h-9">
          
          {/* 1. Play / Pause & Reset */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={onTogglePlay}
              style={{
                backgroundColor: isPlaying ? '#10b981' : '#ffffff',
                color: '#090d16',
                boxShadow: isPlaying ? '0 0 12px rgba(16,185,129,0.5)' : '0 0 10px rgba(255,255,255,0.4)',
              }}
              className="h-7 px-2.5 sm:px-3 flex items-center justify-center gap-1.5 rounded-xs font-mono text-xs font-bold tracking-wider transition-all cursor-pointer shrink-0"
              title={isPlaying ? 'Pause timeline' : 'Play timeline (2026–2050)'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  <span>PLAY</span>
                </>
              )}
            </button>

            <button
              onClick={onReset}
              className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xs transition-colors shrink-0"
              title="Reset to 2026"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 2. Prominent Year & Stage Label */}
          <div className="flex items-center gap-1.5 shrink-0 min-w-[76px] sm:min-w-[90px] h-7">
            <span className="text-xl sm:text-2xl font-sans font-bold text-white tabular-nums tracking-tight drop-shadow-[0_0_10px_rgba(0,245,212,0.3)]">
              {currentYear}
            </span>
            {currentNarrative.stageName && currentNarrative.stageName.toLowerCase() !== 'almost no regions' && (
              <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 truncate max-w-[80px] sm:max-w-none">
                {currentNarrative.stageName}
              </span>
            )}
          </div>

          {/* 3. Sleek Scrubber Track with Glowing Thumb & Milestones */}
          <div className="flex-1 flex flex-col justify-center px-1 sm:px-2 min-w-[60px] sm:min-w-[100px] h-7">
            <div
              ref={trackRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative w-full h-5 flex items-center cursor-ew-resize group touch-none select-none"
              title="Drag horizontally to scrub year (2026–2050)"
            >
              {/* Horizontal Background Rail */}
              <div className="absolute left-0 right-0 h-1 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-colors" />

              {/* Radiant Gradient Active Track Fill */}
              <div
                className="absolute left-0 h-1 bg-gradient-to-r from-[#2b998a] via-[#3a8da3] to-[#487eb3] rounded-full transition-[width] duration-75 pointer-events-none shadow-[0_0_8px_rgba(43,153,138,0.4)]"
                style={{ width: `${pct}%` }}
              />

              {/* Milestone Indicator Points on Rail */}
              {MILESTONES.map(({ year: yr }) => {
                const markerPct = ((yr - 2026) / (2050 - 2026)) * 100;
                const isPassed = currentYear >= yr;
                return (
                  <div
                    key={yr}
                    className={`absolute -translate-x-1/2 w-1.5 h-1.5 rounded-full pointer-events-none transition-colors ${
                      isPassed ? 'bg-teal-400' : 'bg-slate-600'
                    }`}
                    style={{ left: `${markerPct}%` }}
                  />
                );
              })}

              {/* Glowing Draggable Scrubber Thumb */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-[#07090e] transition-transform pointer-events-none flex items-center justify-center ${
                  isDragging
                    ? 'scale-125 bg-white shadow-[0_0_12px_#2b998a]'
                    : 'bg-teal-400 shadow-[0_0_8px_rgba(43,153,138,0.8)] group-hover:scale-110'
                }`}
                style={{ left: `${pct}%` }}
              >
                <div className="w-1 h-1 rounded-full bg-slate-950" />
              </div>
            </div>

            {/* Hidden accessibility input */}
            <input
              type="range"
              min="2026"
              max="2050"
              step="1"
              value={currentYear}
              onChange={(e) => onYearChange(Number(e.target.value))}
              aria-label="Timeline Year Scrubber"
              className="sr-only"
            />
          </div>

          {/* 4. Quick Milestone Jump Buttons & 5. Information Button beside 2050 */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 h-7">
            <div className="hidden sm:flex items-center gap-1">
              {MILESTONES.map(({ year: yr, label }) => {
                const isSelected = currentYear === yr;
                const isPassed = currentYear >= yr;
                return (
                  <button
                    key={yr}
                    onClick={() => onYearChange(yr)}
                    className={`h-7 px-2 rounded-xs text-[10px] font-mono transition-all border flex items-center justify-center ${
                      isSelected
                        ? 'text-teal-300 font-bold bg-white/10 border-teal-400/50 shadow-[0_0_8px_rgba(43,153,138,0.3)]'
                        : isPassed
                        ? 'text-slate-300 hover:text-white bg-white/5 border-white/10 hover:border-white/20'
                        : 'text-slate-500 hover:text-slate-300 border-transparent hover:border-white/10'
                    }`}
                    title={`Jump to ${yr} (${label})`}
                  >
                    <span className="font-bold">{yr}</span>
                  </button>
                );
              })}
            </div>

            {/* Information Button - Evident, high-contrast on right beside 2050 */}
            <button
              onClick={() => setShowFullNarrative(!showFullNarrative)}
              style={{
                backgroundColor: showFullNarrative ? '#5eead4' : '#2dd4bf',
                color: '#090d16',
                borderColor: showFullNarrative ? '#99f6e4' : '#5eead4',
                boxShadow: showFullNarrative ? '0 0 12px rgba(94,234,212,0.6)' : '0 0 10px rgba(45,212,191,0.5)',
              }}
              className="h-7 px-2.5 sm:px-3 flex items-center justify-center gap-1.5 rounded-xs font-mono text-xs font-bold tracking-wider transition-all shrink-0 cursor-pointer border"
              title={showFullNarrative ? 'Collapse narrative' : 'Read year narrative & context'}
            >
              <Info className="w-3.5 h-3.5 fill-current text-slate-950 shrink-0" />
              <span className="font-bold tracking-wider uppercase leading-none">INFO</span>
              {showFullNarrative ? (
                <ChevronDown className="w-3.5 h-3.5 text-slate-950 shrink-0" />
              ) : (
                <ChevronUp className="w-3.5 h-3.5 text-slate-950 shrink-0" />
              )}
            </button>
          </div>

        </div>

        {/* Compact Micro-Narrative Ticker (1 line, unobtrusive, doesn't interrupt the map) */}
        <div className="hidden lg:flex items-center justify-between text-[10px] text-slate-400 font-sans border-t border-white/5 pt-1 px-1 truncate">
          <div className="flex items-center gap-2 truncate">
            <span className="text-[9px] font-mono text-teal-400 uppercase font-semibold shrink-0">
              PHASE NOTE:
            </span>
            <span className="text-slate-300 truncate">
              {currentNarrative.narrative}
            </span>
          </div>
          <span className="text-[8px] font-mono text-slate-500 uppercase tracking-wider shrink-0 pl-3">
            CENSUS 2011 · BENGALURU 2050
          </span>
        </div>

      </div>
    </div>
  );
};
