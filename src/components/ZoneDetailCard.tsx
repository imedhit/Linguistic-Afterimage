/**
 * Zone Detail Card
 * Displays the 4 requested metrics when a zone is clicked:
 * 1. Name
 * 2. Language State
 * 3. Population Shift
 * 4. AI Surveillance Level
 */

import React from 'react';
import { X, ShieldAlert, Users, Radio, MapPin } from 'lucide-react';
import { ZoneMetricData, MilestoneYear } from '../data/cityTimelineData';

interface ZoneDetailCardProps {
  zone: ZoneMetricData;
  year: MilestoneYear;
  onClose: () => void;
}

export const ZoneDetailCard: React.FC<ZoneDetailCardProps> = ({
  zone,
  year,
  onClose
}) => {
  // Determine color accent based on zone category and surveillance severity
  const isHighSurveillance = zone.surveillancePct >= 70;
  const isModerateSurveillance = zone.surveillancePct >= 40 && zone.surveillancePct < 70;
  const survColor = isHighSurveillance
    ? '#ef4444'
    : isModerateSurveillance
    ? '#f97316'
    : '#10b981';

  const isPositivePop = zone.populationPct >= 0;

  return (
    <div className="absolute top-16 right-6 z-40 w-88 max-w-[calc(100vw-3rem)] bg-[#07090e]/95 border border-white/15 backdrop-blur-xl shadow-2xl rounded-sm overflow-hidden text-slate-200 select-none animate-in fade-in slide-in-from-right-4 duration-200">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#090d16]">
        <div className="flex items-center gap-2 min-w-0">
          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <div className="truncate">
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 block">
              {zone.sector} · YEAR {year}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-xs hover:bg-white/10 transition-colors shrink-0"
          title="Close Card"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-4 font-sans text-xs">
        
        {/* 1. Zone Name */}
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">
            ZONE NAME
          </div>
          <h2 className="text-base font-serif font-bold text-white tracking-tight leading-snug">
            {zone.name}
          </h2>
        </div>

        {/* 2. Language State */}
        <div className="bg-cyan-950/20 border border-cyan-500/25 p-3 rounded-xs">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-cyan-300 font-semibold">
              <Radio className="w-3 h-3 text-cyan-400" />
              <span>LANGUAGE STATE</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 bg-cyan-400/10 text-cyan-200 border border-cyan-400/30 rounded-xs">
              ACTIVE
            </span>
          </div>
          <p className="text-slate-200 font-medium leading-relaxed">
            {zone.languageState}
          </p>
        </div>

        {/* 3. Population Shift */}
        <div className="bg-fuchsia-950/20 border border-fuchsia-500/25 p-3 rounded-xs">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-fuchsia-300 font-semibold">
              <Users className="w-3 h-3 text-fuchsia-400" />
              <span>POPULATION SHIFT</span>
            </div>
            <span
              className={`text-[9px] font-mono px-1.5 py-0.5 rounded-xs font-bold ${
                isPositivePop
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
              }`}
            >
              {isPositivePop ? `+${zone.populationPct}%` : `${zone.populationPct}%`}
            </span>
          </div>
          <p className="text-slate-200 font-medium leading-relaxed">
            {zone.populationShift}
          </p>
        </div>

        {/* 4. AI Surveillance Level */}
        <div className="bg-amber-950/20 border border-amber-500/25 p-3 rounded-xs">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-amber-300 font-semibold">
              <ShieldAlert className="w-3 h-3 text-amber-400" />
              <span>AI SURVEILLANCE LEVEL</span>
            </div>
            <span
              className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-xs"
              style={{
                color: survColor,
                backgroundColor: `${survColor}15`,
                borderColor: `${survColor}35`,
                borderWidth: '1px'
              }}
            >
              {zone.surveillancePct}%
            </span>
          </div>

          <p className="text-slate-200 font-medium leading-relaxed mb-2">
            {zone.aiSurveillanceLevel}
          </p>

          {/* Clean Progress Meter */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${zone.surveillancePct}%`,
                backgroundColor: survColor,
                boxShadow: `0 0 8px ${survColor}`
              }}
            />
          </div>
        </div>

      </div>

      {/* Footer hint */}
      <div className="px-4 py-2 border-t border-white/5 bg-[#05070c] text-[10px] font-mono text-slate-500 flex items-center justify-between">
        <span>BENGALURU CARTOGRAPHY</span>
        <span>LAT: {zone.coordinates[0].toFixed(3)}°N</span>
      </div>

    </div>
  );
};
