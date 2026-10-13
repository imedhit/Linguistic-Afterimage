/**
 * Minimal Legend
 * Concisely displays the 5 speculative layers and the 2011 Census evidence base.
 */

import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

export const MinimalLegend: React.FC = () => {
  const [showEvidence, setShowEvidence] = useState(false);

  return (
    <div className="absolute top-4 left-5 z-20 select-none pointer-events-none">
      <div className="bg-[#07090e]/90 border border-white/10 backdrop-blur-md px-3.5 py-3 rounded-sm shadow-xl pointer-events-auto text-slate-300 max-w-xs">
        
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="text-xs font-serif font-bold text-white tracking-tight">
            Ec(ak)ou <span className="text-slate-500 font-normal font-mono">/</span> Bengaluru 2050
          </div>
          <button
            onClick={() => setShowEvidence(!showEvidence)}
            className="text-[10px] font-mono text-teal-400 hover:text-teal-300 flex items-center gap-1 transition-colors"
            title="View Census 2011 Evidence Base"
          >
            <Info className="w-3 h-3" />
            <span>{showEvidence ? 'Close' : 'Evidence'}</span>
          </button>
        </div>

        {/* Speculative Layers Key (2D Vector Swatches) */}
        <div className="space-y-1.5 text-[10px] font-mono border-t border-white/10 pt-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#2b998a] border border-[#5fb3a6] shrink-0" />
            <span className="text-slate-200">Human-Only Languages & Zones</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#8572a8] border border-[#a897cc] shrink-0" />
            <span className="text-slate-200">Off-Grid Spaces (AI Blocked)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#b84e47] border border-[#d4827d] shrink-0" />
            <span className="text-slate-200">AI Surveillance Zones (Corporate SEZ)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#487eb3] border border-[#7ea4cc] shrink-0" />
            <span className="text-slate-200">AI-Recognised Languages (Corridors)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#384352] border border-[#13171e] shrink-0" />
            <span className="text-slate-300">Baseline Inhabited Grid (Darker Grey)</span>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-white/5 text-[9px] text-slate-400">
            <span className="w-2 h-0.5 border-t border-dashed border-[#64748b] shrink-0" />
            <span>Outer Ring Road & NICE Expressway</span>
          </div>
        </div>

        {/* Factual Evidence Base Drawer */}
        {showEvidence && (
          <div className="mt-2.5 pt-2 border-t border-white/10 text-[9px] font-mono space-y-1 text-slate-400">
            <div className="text-slate-300 font-semibold uppercase tracking-wider text-[10px] text-cyan-300">
              OBSERVED 2011 CENSUS BASELINE
            </div>
            <div>• Total Pop: <strong>8,749,944</strong> (Census C-16)</div>
            <div>• Migrants: <strong>5,140,755 (58.8%)</strong> (Census D-05)</div>
            <div>• Work Migration: <strong>27.9%</strong> | Household: <strong>21.2%</strong></div>
            <div className="text-slate-300 pt-0.5 font-semibold">MOTHER TONGUES (C-16):</div>
            <div>Kannada 42.4% | Tamil 16.1% | Telugu 13.9% | Urdu 12.9% | Hindi 5.6%</div>
            <div className="text-slate-500 pt-1 text-[8px] leading-tight">
              Projections (2026–2050) model urbanisation & multilingual mixing creating unparsed human argots and SEZ surveillance perimeters.
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
