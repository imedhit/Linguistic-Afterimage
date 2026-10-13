/**
 * Zone & Signal Dossier Inspector
 * Detailed editorial exploration of selected Bangalore zones, signal fragments,
 * audio playback with live spectrogram, and route-finding shortcuts.
 */

import React, { useState } from 'react';
import {
  HUMAN_LANGUAGE_ZONES,
  DEAD_ZONES,
  MONITORED_ZONES,
  WANDERER_NODES,
  SIGNAL_TRAILS,
  SignalFragment
} from '../data/bangaloreMapData';
import {
  BMRCL_STATIONS,
  BMRCL_METRO_LINES
} from '../data/bangaloreMetroData';
import { ghostAudio } from '../utils/audioEngine';
import { AudioVisualizer } from './AudioVisualizer';
import { Play, Square, Volume2, ShieldAlert, Radio, Compass, ArrowRight, CornerDownRight, Train } from 'lucide-react';

interface ZoneInspectorProps {
  selectedElement: { type: string; id: string } | null;
  onClose: () => void;
  onSelectRoutePoints: (originId: string, destId: string) => void;
  onSelectElement: (type: string, id: string) => void;
}

export const ZoneInspector: React.FC<ZoneInspectorProps> = ({
  selectedElement,
  onClose,
  onSelectRoutePoints,
  onSelectElement
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeSignalIndex, setActiveSignalIndex] = useState(0);
  const [maskResonance, setMaskResonance] = useState(440);
  const [volume, setVolume] = useState(75);

  if (!selectedElement) return null;

  // Resolve current item
  let data: any = null;
  let categoryLabel = '';
  let colorAccent = '#00f5d4';

  if (selectedElement.type === 'human-language') {
    data = HUMAN_LANGUAGE_ZONES.find(z => z.id === selectedElement.id);
    categoryLabel = 'Human Language Zone';
    colorAccent = '#00f5d4';
  } else if (selectedElement.type === 'dead-zone') {
    data = DEAD_ZONES.find(z => z.id === selectedElement.id);
    categoryLabel = 'Dead Zone (Acoustic Null)';
    colorAccent = '#f43f5e';
  } else if (selectedElement.type === 'monitored') {
    data = MONITORED_ZONES.find(z => z.id === selectedElement.id);
    categoryLabel = 'Monitored Zone (AI Sweep)';
    colorAccent = '#fb923c';
  } else if (selectedElement.type === 'wanderer-node') {
    data = WANDERER_NODES.find(z => z.id === selectedElement.id);
    categoryLabel = `Wanderer Node // ${data?.code || ''}`;
    colorAccent = '#f59e0b';
  } else if (selectedElement.type === 'signal-trail') {
    data = SIGNAL_TRAILS.find(t => t.id === selectedElement.id);
    categoryLabel = 'Clandestine Signal Trail';
    colorAccent = data?.activePulseColor || '#00f5d4';
  } else if (selectedElement.type === 'metro-station') {
    const station = BMRCL_STATIONS.find(s => s.id === selectedElement.id || s.code === selectedElement.id);
    if (station) {
      const isInterchange = station.isInterchange;
      const isPurple = station.colors.includes('purple');
      data = {
        id: station.id,
        name: station.name,
        kannadaName: `ನಮ್ಮ ಮೆಟ್ರೋ [${station.code}] · BMRCL ARTERY`,
        sector: isInterchange ? 'Central Artery' : isPurple ? 'East-West Artery' : 'North-South Artery',
        coordinates: station.coordinates,
        status: isInterchange ? 'Dual Artery Interchange' : `${station.colors.join(' & ').toUpperCase()} Line Artery`,
        aiDetectionRate: 48,
        acousticInterferencePct: isInterchange ? 92 : 78,
        lore: `Official BMRCL Station [${station.code}] on the ${station.colors.map(c => c.toUpperCase()).join(' & ')} Line. The BMRCL transit network serves as the fixed geographic skeleton of Bengaluru, anchoring clandestine Wanderer acoustic conduits.`,
        surveillanceTech: isInterchange ? 'Majestic Dual-Hub Telemetry' : 'Viaduct Sensor Grid',
        signals: [
          {
            id: `sig-${station.code.toLowerCase()}`,
            timestamp: 'LIVE ARTERY CARRIER',
            source: `BMRCL Platform [${station.code}]`,
            rawTranscript: `Acoustic transit resonance at ${station.coordinates[0].toFixed(4)}°N, ${station.coordinates[1].toFixed(4)}°E. Low-frequency track vibration shielding clandestine Wanderer vocal exchanges.`,
            audioToneHz: isInterchange ? 380 : 310,
            modulation: 'Continuous Wave Artery'
          }
        ]
      };
      categoryLabel = `BMRCL Station Artery [${station.code}]`;
      colorAccent = isInterchange ? '#38bdf8' : isPurple ? '#c084fc' : '#34d399';
    }
  } else if (selectedElement.type === 'metro-line') {
    const line = BMRCL_METRO_LINES[selectedElement.id as 'purple' | 'green'];
    if (line) {
      data = {
        id: line.id,
        name: line.name,
        kannadaName: line.id === 'purple' ? 'ನೇರಳೆ ಮಾರ್ಗ (Challaghatta ↔ Whitefield)' : 'ಹಸಿರು ಮಾರ್ಗ (Madavara ↔ Silk Institute)',
        sector: line.id === 'purple' ? 'East-West Artery' : 'North-South Artery',
        coordinates: line.id === 'purple' ? [12.9757, 77.5728] : [12.9757, 77.5728],
        status: 'Active Transit Artery Skeleton',
        aiDetectionRate: 52,
        acousticInterferencePct: 84,
        lore: `Official BMRCL ${line.colorName} Artery: ${line.termini}. Real geographic geometry with ${line.coordinates.length} alignment points spanning ${line.stationCount} stations. Serves as the fixed physical skeleton for all speculative Wanderer conduits.`,
        surveillanceTech: 'Elevated Viaduct Telemetry & Optical Sensing',
        signals: [
          {
            id: `sig-line-${line.id}`,
            timestamp: 'CONTINUOUS CONDUIT',
            source: `${line.colorName} Artery Track`,
            rawTranscript: `Continuous elevated viaduct path connecting terminal nodes: ${line.termini}.`,
            audioToneHz: line.id === 'purple' ? 330 : 260,
            modulation: 'Harmonic Rail Resonance'
          }
        ]
      };
      categoryLabel = `BMRCL ${line.colorName} Artery`;
      colorAccent = line.primaryColor;
    }
  }

  if (!data) return null;

  // Signal extraction
  const signals: SignalFragment[] = data.signals || (data.signal ? [data.signal] : []);
  const currentSignal: SignalFragment | undefined = signals[activeSignalIndex];

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      ghostAudio.stop();
      setIsPlayingAudio(false);
    } else if (currentSignal) {
      ghostAudio.playSignal(currentSignal);
      ghostAudio.setMaskResonanceFrequency(maskResonance);
      ghostAudio.setVolume(volume / 100);
      setIsPlayingAudio(true);
    }
  };

  const handleResonanceChange = (val: number) => {
    setMaskResonance(val);
    ghostAudio.setMaskResonanceFrequency(val);
  };

  const handleVolumeChange = (val: number) => {
    setVolume(val);
    ghostAudio.setVolume(val / 100);
  };

  return (
    <div className="absolute top-16 right-6 w-96 max-h-[calc(100vh-5.5rem)] bg-[#070a10]/95 border border-white/15 backdrop-blur-xl shadow-2xl flex flex-col z-30 rounded-sm overflow-hidden text-slate-200">
      {/* Header bar with category and close */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#090d16]">
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-slate-400">
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{ backgroundColor: colorAccent }}
          />
          <span className="uppercase">{categoryLabel}</span>
        </div>
        <button
          onClick={() => {
            ghostAudio.stop();
            setIsPlayingAudio(false);
            onClose();
          }}
          className="text-slate-400 hover:text-white text-xs font-mono px-2 py-1 hover:bg-white/10 transition-colors"
        >
          [ESC / CLOSE]
        </button>
      </div>

      {/* Main Scrollable Content */}
      <div className="p-5 overflow-y-auto space-y-5 flex-1 divide-y divide-white/10">
        {/* Title and Top Lore */}
        <div className="space-y-2">
          <h2 className="text-xl font-sans font-bold tracking-tight text-white leading-snug">
            {data.name}
          </h2>
          {data.kannadaName && (
            <p className="text-xs text-teal-300 font-sans tracking-wide">
              {data.kannadaName}
            </p>
          )}

          {/* Clean Unboxed Metadata with Typographic Separators */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-1">
            {data.elevationMeters && (
              <>
                <span>{data.elevationMeters}m MSL</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
              </>
            )}
            {data.distanceKm && (
              <>
                <span>{data.distanceKm} km Span</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
              </>
            )}
            {data.status && (
              <span className="uppercase text-slate-300">{data.status}</span>
            )}
            {data.keeperCodename && (
              <span>Keeper: {data.keeperCodename}</span>
            )}
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
            {data.description}
          </p>
        </div>

        {/* Tactical Metrics & Incomprehension Index */}
        <div className="pt-4 space-y-3">
          <div className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
            Acoustic & Surveillance Telemetry
          </div>

          <div className="grid grid-cols-2 gap-3">
            {data.acousticInterferencePct !== undefined && (
              <div className="p-2.5 bg-black/40 border border-white/10 rounded-sm">
                <div className="text-[9px] font-mono text-slate-400 uppercase">
                  Acoustic Scramble
                </div>
                <div className="text-lg font-mono font-medium text-cyan-300 tabular-nums mt-0.5">
                  {data.acousticInterferencePct}%
                </div>
              </div>
            )}

            {data.aiDetectionRate !== undefined && (
              <div className="p-2.5 bg-black/40 border border-white/10 rounded-sm">
                <div className="text-[9px] font-mono text-slate-400 uppercase">
                  AI Intercept Prob
                </div>
                <div
                  className={`text-lg font-mono font-medium tabular-nums mt-0.5 ${
                    data.aiDetectionRate > 60 ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {data.aiDetectionRate}%
                </div>
              </div>
            )}

            {data.stealthRating !== undefined && (
              <div className="p-2.5 bg-black/40 border border-white/10 rounded-sm">
                <div className="text-[9px] font-mono text-slate-400 uppercase">
                  Corridor Stealth
                </div>
                <div className="text-lg font-mono font-medium text-cyan-300 tabular-nums mt-0.5">
                  {data.stealthRating}/100
                </div>
              </div>
            )}

            {data.frequencies && (
              <div className="p-2.5 bg-black/40 border border-white/10 rounded-sm">
                <div className="text-[9px] font-mono text-slate-400 uppercase">
                  Mask Sub-Carrier
                </div>
                <div className="text-xs font-mono font-medium text-amber-300 mt-1 truncate">
                  {data.frequencies}
                </div>
              </div>
            )}
          </div>

          {data.lore && (
            <p className="text-xs text-slate-400 font-sans italic leading-relaxed pt-1">
              "{data.lore}"
            </p>
          )}

          {data.acousticCover && (
            <div className="text-xs text-slate-400 font-sans leading-relaxed pt-1">
              <span className="text-slate-300 font-medium">Acoustic Shielding: </span>
              {data.acousticCover}
            </div>
          )}
        </div>

        {/* Signals & Ghost Speech Transduction Audio Player */}
        {signals.length > 0 && currentSignal && (
          <div className="pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-mono tracking-widest uppercase text-slate-400 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ghost Speech Signal ({activeSignalIndex + 1}/{signals.length})</span>
              </div>
              {signals.length > 1 && (
                <div className="flex items-center gap-1">
                  {signals.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        ghostAudio.stop();
                        setIsPlayingAudio(false);
                        setActiveSignalIndex(i);
                      }}
                      className={`w-5 h-5 text-[10px] font-mono rounded-sm transition-colors ${
                        activeSignalIndex === i
                          ? 'bg-cyan-400 text-slate-950 font-bold'
                          : 'bg-white/5 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Signal Title & Dialect Info */}
            <div className="bg-black/50 border border-white/10 p-3 space-y-2.5 rounded-sm">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-serif font-medium text-slate-100">
                    {currentSignal.title}
                  </h4>
                  <div className="text-[11px] font-mono text-cyan-400">
                    {currentSignal.dialectVector}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-mono text-slate-400 uppercase">AI Bypass</div>
                  <div className="text-xs font-mono font-bold text-emerald-400">
                    {currentSignal.aiIncomprehensionIndex}%
                  </div>
                </div>
              </div>

              {/* Sample Phrases */}
              <div className="space-y-1 bg-white/5 p-2.5 rounded-sm border-l-2 border-cyan-400">
                <div className="text-xs font-sans text-teal-200">
                  {currentSignal.samplePhraseKannada}
                </div>
                <div className="text-[11px] font-sans text-slate-400 italic">
                  {currentSignal.samplePhraseEnglish}
                </div>
              </div>

              {/* Live Audio Visualizer */}
              <AudioVisualizer isPlaying={isPlayingAudio} accentColor={colorAccent} />

              {/* Audio Controls */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={handleToggleAudio}
                  className={`flex-1 py-2 px-3 text-xs font-mono tracking-wider flex items-center justify-center gap-2 rounded-sm transition-colors ${
                    isPlayingAudio
                      ? 'bg-rose-500/20 border border-rose-500 text-rose-300 hover:bg-rose-500/30'
                      : 'bg-cyan-500 text-slate-950 font-medium hover:bg-cyan-400 shadow-md'
                  }`}
                >
                  {isPlayingAudio ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>HALT TRANSDUCTION</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>TRANSDUCE GHOST SPEECH</span>
                    </>
                  )}
                </button>
              </div>

              {/* Mask Resonance Modulation Slider */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>MASK RESONANCE FILTER</span>
                  <span className="text-cyan-300 tabular-nums">{maskResonance} Hz</span>
                </div>
                <input
                  type="range"
                  min="120"
                  max="1800"
                  step="10"
                  value={maskResonance}
                  onChange={e => handleResonanceChange(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-2 pt-1 text-[10px] font-mono text-slate-400">
                <Volume2 className="w-3 h-3 text-slate-400" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={e => handleVolumeChange(Number(e.target.value))}
                  className="w-24 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-400"
                />
                <span className="tabular-nums">{volume}%</span>
              </div>

              {/* Failure Report from AI Parser */}
              <div className="text-[10px] font-mono text-slate-400 bg-black/60 p-2 rounded-sm border border-white/5 space-y-1">
                <div className="text-slate-500 uppercase tracking-widest text-[8px]">
                  INTERCEPT PARSER LOG
                </div>
                <div className="text-slate-300">
                  {currentSignal.transcriptionNote}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Route Planning Connection Trigger */}
        <div className="pt-4 space-y-2">
          <div className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
            Clandestine Navigation
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectRoutePoints(data.id, 'hlz-russell-market')}
              className="flex-1 py-1.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 rounded-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <Compass className="w-3 h-3 text-cyan-400" />
              <span>Route to Russell</span>
            </button>
            <button
              onClick={() => onSelectRoutePoints('hlz-chickpet', data.id)}
              className="flex-1 py-1.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 rounded-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <CornerDownRight className="w-3 h-3 text-cyan-400" />
              <span>Route from Pete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
