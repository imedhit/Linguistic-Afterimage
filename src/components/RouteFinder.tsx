/**
 * Clandestine Route Finder Component for Whole Bangalore Map
 * Computes stealthy routes between real Bangalore locations,
 * avoiding AI monitored perimeters and dead zones.
 */

import React, { useState, useEffect } from 'react';
import {
  HUMAN_LANGUAGE_ZONES,
  WANDERER_NODES,
  MONITORED_ZONES,
  SIGNAL_TRAILS,
  Position
} from '../data/bangaloreMapData';
import {
  BMRCL_STATIONS,
  getMetroRouteBetweenStations
} from '../data/bangaloreMetroData';
import { Navigation, ShieldCheck, AlertTriangle, Train } from 'lucide-react';

interface RouteFinderProps {
  initialOriginId?: string;
  initialDestId?: string;
  onApplyRoute: (route: {
    originId: string;
    destinationId: string;
    path: Position[];
    safetyScore: number;
    corridorName: string;
  } | null) => void;
  onClose: () => void;
}

export const RouteFinder: React.FC<RouteFinderProps> = ({
  initialOriginId = 'hlz-chickpet',
  initialDestId = 'hlz-russell-market',
  onApplyRoute,
  onClose
}) => {
  const [originId, setOriginId] = useState(initialOriginId);
  const [destId, setDestId] = useState(initialDestId);

  // Available locations for routing across all sectors of Bangalore (including BMRCL metro skeleton)
  const routableLocations = [
    ...HUMAN_LANGUAGE_ZONES.map(z => ({
      id: z.id,
      name: z.name,
      sector: z.sector,
      type: 'Language Zone',
      coords: z.coordinates
    })),
    ...WANDERER_NODES.map(n => ({
      id: n.id,
      name: n.name,
      sector: n.sector,
      type: 'Wanderer Node',
      coords: n.coordinates
    })),
    ...BMRCL_STATIONS.map(s => ({
      id: s.id,
      name: `${s.name} [${s.code}]`,
      sector: s.isInterchange ? 'Interchange' : `${s.colors[0].toUpperCase()} Artery`,
      type: 'BMRCL Station',
      coords: s.coordinates
    }))
  ];

  // Calculate clandestine route whenever origin or dest change
  useEffect(() => {
    if (!originId || !destId || originId === destId) {
      onApplyRoute(null);
      return;
    }

    const origin = routableLocations.find(l => l.id === originId);
    const dest = routableLocations.find(l => l.id === destId);

    if (!origin || !dest) {
      onApplyRoute(null);
      return;
    }

    // 1. Check if both origin and destination are Metro Stations or have a direct Metro connection
    const metroRoute = getMetroRouteBetweenStations(originId, destId);
    if (metroRoute) {
      onApplyRoute({
        originId,
        destinationId: destId,
        path: metroRoute.path,
        safetyScore: metroRoute.safetyScore,
        corridorName: metroRoute.corridorName
      });
      return;
    }

    // 2. Check if an existing direct signal trail connects them or adjacent nodes
    const directTrail = SIGNAL_TRAILS.find(
      t => (t.fromZoneId === originId && t.toZoneId === destId) ||
           (t.fromZoneId === destId && t.toZoneId === originId)
    );

    let path: Position[] = [];
    let corridorName = '';
    let safetyScore = 92;

    if (directTrail) {
      path = directTrail.waypoints;
      corridorName = directTrail.name;
      safetyScore = directTrail.stealthRating;
    } else {
      // Dynamic clandestine path generation avoiding monitored zones
      corridorName = `Ghost Corridor // ${origin.name.split(' ')[0]} → ${dest.name.split(' ')[0]}`;

      const dLat = dest.coords[0] - origin.coords[0];
      const dLng = dest.coords[1] - origin.coords[1];

      const wp1: Position = [
        origin.coords[0] + dLat * 0.28 + 0.004,
        origin.coords[1] + dLng * 0.28 - 0.005
      ];
      const wp2: Position = [
        origin.coords[0] + dLat * 0.52 - 0.005,
        origin.coords[1] + dLng * 0.52 + 0.004
      ];
      const wp3: Position = [
        origin.coords[0] + dLat * 0.78 + 0.003,
        origin.coords[1] + dLng * 0.78 - 0.003
      ];

      path = [origin.coords, wp1, wp2, wp3, dest.coords];

      // Calculate safety penalty if path passes near Monitored Zones
      let penalty = 0;
      MONITORED_ZONES.forEach(mz => {
        path.forEach(pt => {
          const dist = Math.hypot(pt[0] - mz.coordinates[0], pt[1] - mz.coordinates[1]);
          if (dist < 0.02) {
            penalty += 5;
          }
        });
      });
      safetyScore = Math.max(70, 96 - penalty);
    }

    onApplyRoute({
      originId,
      destinationId: destId,
      path,
      safetyScore,
      corridorName
    });
  }, [originId, destId]);

  const originObj = routableLocations.find(l => l.id === originId);
  const destObj = routableLocations.find(l => l.id === destId);

  return (
    <div className="absolute top-16 left-6 w-96 bg-[#070a10]/95 border border-white/15 backdrop-blur-xl shadow-2xl z-30 rounded-sm overflow-hidden text-slate-200">
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#090d16]">
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-cyan-400">
          <Navigation className="w-3.5 h-3.5" />
          <span>GHOST ROUTE NAVIGATOR // BANGALORE</span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white text-xs font-mono px-2 py-1 hover:bg-white/10 transition-colors"
        >
          [CLOSE]
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Origin / Destination Pickers */}
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-mono tracking-widest uppercase text-slate-400 block mb-1">
              Departure Point (Acoustic Sanctuary)
            </label>
            <select
              value={originId}
              onChange={e => setOriginId(e.target.value)}
              className="w-full bg-black/60 border border-white/15 text-xs font-sans text-slate-200 px-3 py-2 rounded-sm focus:outline-none focus:border-cyan-400"
            >
              {routableLocations.map(loc => (
                <option key={loc.id} value={loc.id} className="bg-slate-900 text-slate-200">
                  [{loc.sector}] {loc.name} ({loc.type})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center -my-1">
            <button
              onClick={() => {
                const temp = originId;
                setOriginId(destId);
                setDestId(temp);
              }}
              className="px-2 py-0.5 text-[10px] font-mono text-cyan-400 bg-black/40 border border-white/10 hover:bg-white/5 rounded-sm transition-colors"
              title="Reverse Points"
            >
              ⇅ REVERSE
            </button>
          </div>

          <div>
            <label className="text-[10px] font-mono tracking-widest uppercase text-slate-400 block mb-1">
              Destination Safe Haven
            </label>
            <select
              value={destId}
              onChange={e => setDestId(e.target.value)}
              className="w-full bg-black/60 border border-white/15 text-xs font-sans text-slate-200 px-3 py-2 rounded-sm focus:outline-none focus:border-cyan-400"
            >
              {routableLocations.map(loc => (
                <option key={loc.id} value={loc.id} className="bg-slate-900 text-slate-200">
                  [{loc.sector}] {loc.name} ({loc.type})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Route Infiltration Assessment */}
        {originObj && destObj && originId !== destId && (
          <div className="space-y-3 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
                Acoustic Stealth Clearance
              </span>
              <span className="text-xs font-mono font-bold text-cyan-400">
                94% SAFE
              </span>
            </div>

            {/* Infiltration Trajectory Waypoints */}
            <div className="space-y-2 bg-black/40 border border-white/10 p-3 rounded-sm">
              <div className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Stealth Transit Corridor ({originObj.sector} → {destObj.sector})</span>
              </div>
              <ul className="text-xs font-sans space-y-2 pt-1">
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-cyan-400 font-mono text-[10px] mt-0.5">01.</span>
                  <span>Depart <strong className="text-white">{originObj.name}</strong> under calibrated mask modulation.</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-cyan-400 font-mono text-[10px] mt-0.5">02.</span>
                  <span>Transit through shaded secondary alleys, storm drainage culverts, and raintree canopies.</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-cyan-400 font-mono text-[10px] mt-0.5">03.</span>
                  <span>Steer clear of elevated metro lines and corporate SEZ acoustic cancellation gates.</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <span className="text-cyan-400 font-mono text-[10px] mt-0.5">04.</span>
                  <span>Arrive at <strong className="text-white">{destObj.name}</strong>; verify sanctuary keeper signal.</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 p-2 rounded-sm">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>Maintain vocal pitch below 240 Hz when transiting arterial ring road junctions.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
