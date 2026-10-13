/**
 * World Lore & Ghost Speech Mask Briefing
 * Explains the speculative world, Ec(ak)ou Ghost Speech Masks, and Bangalore's hidden cartography.
 */

import React from 'react';
import { Radio, ShieldAlert, Navigation, Layers, X } from 'lucide-react';

interface WorldLoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorldLoreModal: React.FC<WorldLoreModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 select-none animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#070a10] border border-white/20 shadow-2xl p-8 rounded-sm text-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Kicker */}
        <div className="space-y-1">
          <div className="text-[10px] font-mono tracking-widest uppercase text-cyan-400">
            SPECULATIVE CARTOGRAPHY DOSSIER // BENGALURU SPECTRUM
          </div>
          <h2 className="text-3xl font-serif tracking-tight text-white">
            Ec(ak)ou: Ghost Speech Masks & The Unparsed City
          </h2>
        </div>

        {/* Narrative Core */}
        <div className="space-y-3 font-sans text-sm text-slate-300 leading-relaxed">
          <p>
            In speculative Bangalore, synthetic algorithmic listeners, neural transformer microphones, and automated acoustic sweep drones monitor the city’s airwaves 24/7. Standard human speech is instantly transcribed, semanticized, and categorized.
          </p>
          <p>
            To evade linguistic surveillance, <strong className="text-white font-medium">Wanderers</strong> wear handcrafted <strong className="text-cyan-300 font-medium">Ec(ak)ou Ghost Speech Masks</strong>. These acoustic transducer masks tune human voice into non-standard phonemic frequencies, dialect code-switching (Kannada, Dakhni Urdu, Tamil, English), market cadences, and multi-path echoes that artificial intelligence models simply cannot parse.
          </p>
        </div>

        {/* Map Elements Guide */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <div className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
            Cartographic Symbology
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 bg-white/5 border border-cyan-500/20 rounded-sm space-y-1">
              <div className="flex items-center gap-2 text-cyan-300 font-bold">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Human Language Zones</span>
              </div>
              <p className="text-[11px] font-sans text-slate-300">
                Pockets of high human acoustic density (Chickpet, Russell Market, Malleswaram) where dialects and ambient chaos defeat AI NLP.
              </p>
            </div>

            <div className="p-3 bg-white/5 border border-rose-500/20 rounded-sm space-y-1">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <span className="w-2 h-2 bg-rose-500" />
                <span>Dead Zones</span>
              </div>
              <p className="text-[11px] font-sans text-slate-300">
                Corporate tech SEZs (Bellandur, Electronic City) with active acoustic suppression fields where masks lose carrier connection.
              </p>
            </div>

            <div className="p-3 bg-white/5 border border-emerald-500/20 rounded-sm space-y-1">
              <div className="flex items-center gap-2 text-emerald-300 font-bold">
                <span className="w-2.5 h-0.5 bg-emerald-400" />
                <span>Signal Trails</span>
              </div>
              <p className="text-[11px] font-sans text-slate-300">
                Clandestine filaments threading through underground culverts, raintree canopies, and historic back-alleys.
              </p>
            </div>

            <div className="p-3 bg-white/5 border border-amber-500/20 rounded-sm space-y-1">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <span className="w-2 h-2 rotate-45 bg-amber-400" />
                <span>Wanderer Nodes</span>
              </div>
              <p className="text-[11px] font-sans text-slate-300">
                Safe havens (Koshy’s, Vidyarthi Bhavan, old printing basements) where wanderers recalibrate mask frequencies.
              </p>
            </div>
          </div>
        </div>

        {/* Operating Instructions */}
        <div className="bg-black/60 p-4 border border-white/10 rounded-sm space-y-2 text-xs font-mono text-slate-300">
          <div className="text-cyan-400 uppercase tracking-widest text-[9px]">
            Wanderer Protocol
          </div>
          <p className="font-sans leading-relaxed">
            1. Click any glowing zone or node to inspect its spectral dossier and listen to transduced ghost speech.<br />
            2. Use the "Route Finder" to calculate safe clandestine paths avoiding AI Monitored Zones.<br />
            3. Use "Transmit Echo" to pulse high-frequency acoustic waves across the Bangalore grid.
          </p>
        </div>

        {/* Footer dismiss */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-mono tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 font-medium rounded-sm transition-colors"
          >
            ENTER SPECTRAL CARTOGRAPHY
          </button>
        </div>
      </div>
    </div>
  );
};
