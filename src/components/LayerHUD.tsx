/**
 * Layer HUD - Clean, quiet layer visibility toggle
 * Editorial data-visualisation aesthetic.
 */

import React, { useState } from 'react';
import { Layers, X } from 'lucide-react';

interface LayerHUDProps {
  layers: {
    humanLanguage: boolean;
    deadZones: boolean;
    signalTrails: boolean;
    monitoredZones: boolean;
    wandererNodes: boolean;
    metroNetwork?: boolean;
  };
  onToggleLayer: (layerKey: any) => void;
  onOpenIntro?: () => void;
}

export const LayerHUD: React.FC<LayerHUDProps> = ({
  layers,
  onToggleLayer
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="absolute top-4 left-5 z-20 select-none">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-[#07090e]/85 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white backdrop-blur-md rounded-xs transition-colors shadow-lg"
          title="Layer Visibility"
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Layers</span>
        </button>
      ) : (
        <div className="bg-[#07090e]/95 border border-white/15 backdrop-blur-xl shadow-2xl rounded-xs overflow-hidden text-slate-300 w-56">
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-[#090d16]">
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
              Map Layers
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          <div className="p-2 space-y-1 text-xs font-mono">
            {/* Metro Network (Centrepiece) */}
            <div
              onClick={() => onToggleLayer('metroNetwork')}
              className="flex items-center justify-between px-2 py-1.5 hover:bg-white/5 cursor-pointer rounded-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span className={layers.metroNetwork !== false ? 'text-white font-medium' : 'text-slate-600 line-through'}>
                  Metro Artery
                </span>
              </div>
            </div>

            {/* Language Sanctuaries */}
            <div
              onClick={() => onToggleLayer('humanLanguage')}
              className="flex items-center justify-between px-2 py-1.5 hover:bg-white/5 cursor-pointer rounded-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className={layers.humanLanguage ? 'text-white' : 'text-slate-600 line-through'}>
                  Linguistic Pockets
                </span>
              </div>
            </div>

            {/* Dead Zones */}
            <div
              onClick={() => onToggleLayer('deadZones')}
              className="flex items-center justify-between px-2 py-1.5 hover:bg-white/5 cursor-pointer rounded-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-rose-500 rounded-xs" />
                <span className={layers.deadZones ? 'text-white' : 'text-slate-600 line-through'}>
                  Null Zones
                </span>
              </div>
            </div>

            {/* Signal Trails */}
            <div
              onClick={() => onToggleLayer('signalTrails')}
              className="flex items-center justify-between px-2 py-1.5 hover:bg-white/5 cursor-pointer rounded-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-0.5 bg-emerald-400" />
                <span className={layers.signalTrails ? 'text-white' : 'text-slate-600 line-through'}>
                  Signal Trails
                </span>
              </div>
            </div>

            {/* Monitored Zones */}
            <div
              onClick={() => onToggleLayer('monitoredZones')}
              className="flex items-center justify-between px-2 py-1.5 hover:bg-white/5 cursor-pointer rounded-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full border border-orange-400" />
                <span className={layers.monitoredZones ? 'text-white' : 'text-slate-600 line-through'}>
                  Monitored Grids
                </span>
              </div>
            </div>

            {/* Wanderer Nodes */}
            <div
              onClick={() => onToggleLayer('wandererNodes')}
              className="flex items-center justify-between px-2 py-1.5 hover:bg-white/5 cursor-pointer rounded-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rotate-45 bg-amber-400" />
                <span className={layers.wandererNodes ? 'text-white' : 'text-slate-600 line-through'}>
                  Wanderer Nodes
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
