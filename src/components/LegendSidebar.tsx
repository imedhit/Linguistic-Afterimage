/**
 * LegendSidebar: Right-hand legend, demographic evidence & ward inspector panel
 * Houses 2D vector color swatches, dynamic timeline projection stats,
 * inspected ward / pixel card, and Census 2011 evidence drawer.
 */

import React, { useState } from 'react';
import {
  Info,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  MapPin,
  FileText,
  Volume2,
  Users
} from 'lucide-react';
import { getNarrativeForYear } from '../data/languageRegionsData';
import { getProjectionForYear } from '../data/bengaluru2050EvidencePack';
import { PixelCell, PixelMetrics } from '../data/bengaluruPixelGridData';

export interface InspectedPixelData {
  cell: PixelCell;
  metrics: PixelMetrics;
  isPinned?: boolean;
}

interface LegendSidebarProps {
  currentYear: number;
  inspectedPixel: InspectedPixelData | null;
  onClearInspectedPixel: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const LegendSidebar: React.FC<LegendSidebarProps> = ({
  currentYear,
  inspectedPixel,
  onClearInspectedPixel,
  isCollapsed,
  onToggleCollapse
}) => {
  const [showCensusEvidence, setShowCensusEvidence] = useState(false);
  const currentNarrative = getNarrativeForYear(currentYear);
  const currentProjection = getProjectionForYear(currentYear);

  if (isCollapsed) {
    return (
      <aside className="relative z-20 flex-shrink-0 flex items-center justify-center w-12 h-full bg-[#181f2a] border-l border-[#2d3748] transition-all duration-200">
        <button
          onClick={onToggleCollapse}
          className="w-8 h-10 flex items-center justify-center rounded-sm bg-[#222b3a] hover:bg-[#2d384c] text-teal-400 hover:text-teal-300 border border-[#3b475a] shadow-lg transition-colors cursor-pointer"
          title="Expand Legend & Evidence Panel"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </aside>
    );
  }

  return (
    <aside className="relative z-20 flex-shrink-0 w-80 h-full bg-[#181f2a] border-l border-[#2d3748] flex flex-col text-slate-200 select-none shadow-xl transition-all duration-200 overflow-hidden">
      {/* Top Header & Collapse Toggle */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2d3748] bg-[#141a23]">
        <button
          onClick={onToggleCollapse}
          className="p-1 rounded-sm text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-[#384557] transition-colors"
          title="Collapse Panel"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="text-right">
          <div className="flex items-center justify-end gap-2">
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-800/80 px-1.5 py-0.5 rounded-xs uppercase tracking-wider">
              Legend
            </span>
            <span className="font-serif font-bold text-sm tracking-tight text-white">Ec(ak)ou</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 tracking-wider">
            Cartographic Layers & Evidence
          </div>
        </div>
      </div>

      {/* Scrollable Legend Body */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 space-y-4 custom-scrollbar">

        {/* SECTION 1: 2D VECTOR PALETTE SWATCHES */}
        <div className="bg-[#1e2634] border border-[#2e3a4d] rounded-sm p-3 shadow-inner">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2.5 pb-1 border-b border-white/10 flex items-center justify-between">
            <span>Spectral Color Legend</span>
            <span className="text-teal-400 text-[9px]">2D Vector Mode</span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            {/* 1. Human-Only Languages */}
            <div className="flex items-start gap-2.5">
              <span className="w-3 h-3 rounded-xs bg-[#2b998a] border border-[#5fb3a6] shrink-0 mt-0.5 shadow-sm" />
              <div>
                <div className="text-white font-medium text-[11px] leading-tight">
                  Human-Only Languages & Argots
                </div>
                <div className="text-[9px] text-slate-400 leading-snug">
                  Unparsed street contact tongues (Pete bazaar gallis, KR Market)
                </div>
              </div>
            </div>

            {/* 2. Off-Grid Spaces */}
            <div className="flex items-start gap-2.5">
              <span className="w-3 h-3 rounded-xs bg-[#8572a8] border border-[#a897cc] shrink-0 mt-0.5 shadow-sm" />
              <div>
                <div className="text-white font-medium text-[11px] leading-tight">
                  Off-Grid Spaces (AI Blocked)
                </div>
                <div className="text-[9px] text-slate-400 leading-snug">
                  Stepped granite tanks & stone catacombs physically attenuating RF
                </div>
              </div>
            </div>

            {/* 3. AI Surveillance Zones */}
            <div className="flex items-start gap-2.5">
              <span className="w-3 h-3 rounded-xs bg-[#b84e47] border border-[#d4827d] shrink-0 mt-0.5 shadow-sm" />
              <div>
                <div className="text-white font-medium text-[11px] leading-tight">
                  AI Surveillance Zones (Corporate SEZ)
                </div>
                <div className="text-[9px] text-slate-400 leading-snug">
                  High-frequency acoustic/optical biometric perimeters (Whitefield, E-City)
                </div>
              </div>
            </div>

            {/* 4. AI-Recognised Corridors */}
            <div className="flex items-start gap-2.5">
              <span className="w-3 h-3 rounded-xs bg-[#487eb3] border border-[#7ea4cc] shrink-0 mt-0.5 shadow-sm" />
              <div>
                <div className="text-white font-medium text-[11px] leading-tight">
                  AI-Recognised Corridors
                </div>
                <div className="text-[9px] text-slate-400 leading-snug">
                  Standardized corporate English & formal tokenized NLP models
                </div>
              </div>
            </div>

            {/* 5. Baseline Inhabited Grid */}
            <div className="flex items-start gap-2.5">
              <span className="w-3 h-3 rounded-xs bg-[#384352] border border-[#13171e] shrink-0 mt-0.5 shadow-sm" />
              <div>
                <div className="text-white font-medium text-[11px] leading-tight">
                  Baseline Inhabited Grid (Darker Grey)
                </div>
                <div className="text-[9px] text-slate-400 leading-snug">
                  Census 2011 residential plurality & urban density matrix
                </div>
              </div>
            </div>

            {/* 6. Fixed Metro Lines */}
            <div className="flex items-start gap-2.5 pt-1 border-t border-white/5">
              <div className="flex items-center gap-1 shrink-0 mt-1">
                <span className="w-2.5 h-1 bg-[#7b68a6] rounded-xs" />
                <span className="w-2.5 h-1 bg-[#3d8f68] rounded-xs" />
              </div>
              <div>
                <div className="text-white font-medium text-[11px] leading-tight">
                  Namma Metro Network
                </div>
                <div className="text-[9px] text-slate-400 leading-snug">
                  Purple (Challaghatta–Whitefield) & Green (Madavara–Silk Inst.)
                </div>
              </div>
            </div>

            {/* 7. Arterial Corridors */}
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-0.5 border-t border-dashed border-[#94a3b8] shrink-0 mt-2" />
              <div>
                <div className="text-white font-medium text-[11px] leading-tight">
                  Arterial Network
                </div>
                <div className="text-[9px] text-slate-400 leading-snug">
                  Outer Ring Road loop & NICE Expressway corridor
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: CURRENT YEAR DEMOGRAPHIC PROFILE */}
        <div className="bg-[#1e2634] border border-[#2e3a4d] rounded-sm p-3 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3 text-teal-400" />
              <span>Year {currentYear} Projection</span>
            </span>
            <span className="text-[9px] font-mono text-teal-300 font-bold uppercase">
              [{currentNarrative.stageName}]
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 py-1.5 mb-2.5 bg-[#141b25] p-2 rounded-xs border border-[#273244] text-[9px] font-mono">
            <div>
              <span className="text-slate-400 block text-[8px]">TOTAL POP</span>
              <span className="text-white font-bold text-xs">{currentProjection.totalPopulationFormatted}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[8px]">MIGRANT %</span>
              <span className="text-teal-300 font-bold text-xs">{currentProjection.migrantSharePercent}%</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[8px]">MIXING INDEX</span>
              <span className="text-cyan-300 font-bold text-xs">{currentProjection.linguisticMixingIndex}%</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-300 font-sans leading-relaxed border-l-2 border-teal-500/70 pl-2">
            {currentNarrative.narrative}
          </p>
        </div>

        {/* SECTION 3: WARD / PIXEL INSPECTOR CARD */}
        <div className="bg-[#1e2634] border border-[#2e3a4d] rounded-sm p-3 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-teal-400" />
              <span>Ward / Pixel Inspector</span>
            </span>
            {inspectedPixel && (
              <button
                onClick={onClearInspectedPixel}
                className="text-[9px] font-mono text-slate-400 hover:text-white px-1 py-0.5 rounded-xs hover:bg-white/10"
              >
                Clear
              </button>
            )}
          </div>

          {inspectedPixel ? (
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-serif font-bold text-white tracking-tight leading-tight">
                    {inspectedPixel.cell.wardName}
                  </div>
                  <div className="text-[9px] text-slate-400">
                    Unit [R{inspectedPixel.cell.row}, C{inspectedPixel.cell.col}] · {inspectedPixel.cell.sectorTag}
                  </div>
                </div>

                <span
                  className="px-1.5 py-0.5 rounded-xs text-[9px] font-bold uppercase shrink-0 border"
                  style={{
                    backgroundColor: `${inspectedPixel.metrics.color}25`,
                    borderColor: inspectedPixel.metrics.color,
                    color: inspectedPixel.metrics.color
                  }}
                >
                  {inspectedPixel.metrics.statusLabel}
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-1.5 py-1.5 bg-[#141b25] p-2 rounded-xs border border-[#273244] text-[9px]">
                <div>
                  <span className="text-slate-400 block text-[8px]">MIXING INDEX:</span>
                  <span className="text-white font-semibold">{inspectedPixel.metrics.linguisticMixingIndex}%</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[8px]">MIGRANT SHARE:</span>
                  <span className="text-teal-300 font-semibold">{inspectedPixel.metrics.migrantSharePct}%</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[8px]">AI WORD ERROR:</span>
                  <span className="text-amber-300 font-semibold">{inspectedPixel.metrics.aiWordErrorRate}%</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[8px]">SURVEILLANCE:</span>
                  <span className={inspectedPixel.metrics.surveillanceLevel === 'None' ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                    {inspectedPixel.metrics.surveillanceLevel}
                  </span>
                </div>
              </div>

              <div className="text-[10px] text-slate-300 font-sans">
                <span className="text-slate-500 font-mono text-[9px]">PLURALITY TONGUE: </span>
                {inspectedPixel.metrics.dominantTongue}
              </div>

              <p className="text-[9px] text-slate-400 font-mono leading-relaxed border-t border-white/5 pt-1.5">
                {inspectedPixel.metrics.description}
              </p>
            </div>
          ) : (
            <div className="py-4 px-2 text-center text-slate-400 text-[10px] font-mono border border-dashed border-[#2d3a4d] rounded-xs bg-[#141b25]">
              <MapPin className="w-4 h-4 text-slate-500 mx-auto mb-1.5 animate-pulse" />
              <div>Hover or click any vector pixel cell on the map to inspect ward metrics.</div>
            </div>
          )}
        </div>

        {/* SECTION 4: OBSERVED CENSUS 2011 BASELINE DRAWER */}
        <div className="bg-[#1e2634] border border-[#2e3a4d] rounded-sm p-3 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 font-semibold flex items-center gap-1.5">
              <FileText className="w-3 h-3 text-cyan-400" />
              <span>Census 2011 Evidence Base</span>
            </span>

            <button
              onClick={() => setShowCensusEvidence(!showCensusEvidence)}
              className="text-[10px] font-mono text-teal-400 hover:text-teal-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Info className="w-3 h-3" />
              <span>{showCensusEvidence ? 'Hide' : 'View'}</span>
            </button>
          </div>

          {showCensusEvidence && (
            <div className="mt-2.5 pt-2 border-t border-white/10 text-[9px] font-mono space-y-1.5 text-slate-300 animate-in fade-in duration-150">
              <div className="text-slate-400">
                Data collected from Census of India 2011 (Census Tables C-16 & D-05):
              </div>
              <div className="bg-[#141b25] p-2 rounded-xs border border-[#273244] space-y-1">
                <div>• Total Bengaluru Pop: <strong className="text-white">8,749,944</strong> (C-16)</div>
                <div>• Migrant Inhabitants: <strong className="text-teal-300">5,140,755 (58.8%)</strong> (D-05)</div>
                <div>• Work/Job Migration: <strong className="text-white">27.9%</strong> | Household: <strong className="text-white">21.2%</strong></div>
              </div>

              <div className="text-slate-400 pt-1 font-semibold text-[8px] uppercase tracking-wider">
                MOTHER TONGUES BREAKDOWN (CENSUS C-16):
              </div>
              <div className="grid grid-cols-2 gap-1 text-[9px] bg-[#141b25] p-2 rounded-xs border border-[#273244]">
                <div>Kannada: <strong className="text-white">42.4%</strong></div>
                <div>Tamil: <strong className="text-white">16.1%</strong></div>
                <div>Telugu: <strong className="text-white">13.9%</strong></div>
                <div>Urdu: <strong className="text-white">12.9%</strong></div>
                <div>Hindi: <strong className="text-white">5.6%</strong></div>
                <div>Malayalam: <strong className="text-white">3.1%</strong></div>
              </div>

              <div className="text-slate-400 pt-1 text-[8px] leading-tight">
                * Projections (2026–2050) extrapolate urbanisation, employment transit corridors, and polyglot mixing producing unparsed argots and SEZ surveillance perimeters.
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Footer Info */}
      <div className="px-3.5 py-2 border-t border-[#2d3748] bg-[#141a23] text-[9px] font-mono text-slate-500 flex items-center justify-between">
        <span>Census 2011 C-16 / D-05 Baseline</span>
        <span className="text-cyan-400">Validated</span>
      </div>
    </aside>
  );
};
