/**
 * Human Language Regions Generator (2026–2050)
 * Grounded in Bengaluru 2050 Evidence Pack:
 * - Census 2011 Baseline (42.4% Kannada, 16.1% Tamil, 13.9% Telugu, 12.9% Urdu; 58.8% Migrants)
 * - Projections: 2026 (14.2M) → 2030 (15.9M) → 2040 (18.9M) → 2050 (21.6M)
 * 
 * Speculative Diffusion Milestones:
 * 2026 → almost no Human Language regions
 * 2030 → small pockets (Pete, Russell Market, Malleswaram)
 * 2040 → connected regions (merging along BMRCL Purple & Green arteries)
 * 2050 → large established Human Language network (sovereign polyphonic commons)
 */

import { LatLngTuple } from './bangaloreMapData';
import { getProjectionForYear } from './bengaluru2050EvidencePack';

export interface LanguageRegion {
  id: string;
  name: string;
  dialectCode: string;
  color: string;
  center: LatLngTuple;
  radiusMeters: number;
  polygon: LatLngTuple[];
  opacity: number;
  active: boolean;
  demographicContext: string;
}

export interface ConnectingCorridor {
  id: string;
  fromName: string;
  toName: string;
  color: string;
  path: LatLngTuple[];
  weight: number;
  opacity: number;
  active: boolean;
}

export interface EraNarrative {
  year: number;
  stageName: string;
  narrative: string;
  coveragePct: number;
  populationFormatted: string;
  migrantSharePct: number;
}

export const ERA_NARRATIVES: Record<number, EraNarrative> = {
  2026: {
    year: 2026,
    stageName: '',
    narrative: 'Faint unparsed whispers linger in Chickpet; AI surveillance anchors corporate SEZs.',
    coveragePct: 3,
    populationFormatted: '14.2M',
    migrantSharePct: 64.1
  },
  2030: {
    year: 2030,
    stageName: 'Small pockets',
    narrative: '15.9M Pop (66.8% Migrants). Small human-only language pockets emerge in Chickpet, Russell Market, and Malleswaram.',
    coveragePct: 22,
    populationFormatted: '15.9M',
    migrantSharePct: 66.8
  },
  2040: {
    year: 2040,
    stageName: 'Connected regions',
    narrative: '18.9M Pop (71.2% Migrants). Dialect regions expand and merge along BMRCL arteries into connected resistance corridors.',
    coveragePct: 68,
    populationFormatted: '18.9M',
    migrantSharePct: 71.2
  },
  2050: {
    year: 2050,
    stageName: 'Established network',
    narrative: '21.6M Pop (74.0% Migrants). Large established Human Language network blankets the metropolitan core with living polyphony.',
    coveragePct: 96,
    populationFormatted: '21.6M',
    migrantSharePct: 74.0
  }
};

export function getNarrativeForYear(year: number): EraNarrative {
  const proj = getProjectionForYear(year);
  if (year <= 2028) {
    return {
      ...ERA_NARRATIVES[2026],
      year,
      populationFormatted: proj.totalPopulationFormatted,
      migrantSharePct: proj.migrantSharePercent
    };
  }
  if (year <= 2034) {
    return {
      ...ERA_NARRATIVES[2030],
      year,
      populationFormatted: proj.totalPopulationFormatted,
      migrantSharePct: proj.migrantSharePercent
    };
  }
  if (year <= 2044) {
    return {
      ...ERA_NARRATIVES[2040],
      year,
      populationFormatted: proj.totalPopulationFormatted,
      migrantSharePct: proj.migrantSharePercent
    };
  }
  return {
    ...ERA_NARRATIVES[2050],
    year,
    populationFormatted: proj.totalPopulationFormatted,
    migrantSharePct: proj.migrantSharePercent
  };
}

/**
 * Generates smooth organic polygon around a center point simulating fluid language diffusion.
 */
function generateOrganicPolygon(
  center: LatLngTuple,
  radiusKm: number,
  pointsCount: number = 18,
  angleOffset: number = 0,
  noiseSeed: number = 1
): LatLngTuple[] {
  const [cLat, cLng] = center;
  const coords: LatLngTuple[] = [];

  const dLatPerKm = 1 / 111.0;
  const dLngPerKm = 1 / 108.0;

  for (let i = 0; i < pointsCount; i++) {
    const angle = (i / pointsCount) * Math.PI * 2 + angleOffset;
    const harmonic1 = Math.sin(angle * 2 + noiseSeed) * 0.16;
    const harmonic2 = Math.cos(angle * 3 + noiseSeed * 1.5) * 0.12;
    const harmonic3 = Math.sin(angle * 5 + noiseSeed * 0.7) * 0.08;
    const r = radiusKm * (1 + harmonic1 + harmonic2 + harmonic3);

    const lat = cLat + Math.sin(angle) * r * dLatPerKm;
    const lng = cLng + Math.cos(angle) * r * dLngPerKm;
    coords.push([lat, lng]);
  }

  coords.push(coords[0]);
  return coords;
}

/**
 * Computes all dynamic Human Language regions for a given year (2026–2050).
 */
export function getLanguageRegionsForYear(year: number): {
  regions: LanguageRegion[];
  corridors: ConnectingCorridor[];
} {
  const t = Math.max(0, Math.min(1, (year - 2026) / (2050 - 2026)));

  const regions: LanguageRegion[] = [];
  const corridors: ConnectingCorridor[] = [];

  // REGION 1: Pete Vernacular Core (Chickpet / KR Market / Avenue Rd)
  // Rooted in 42.4% Kannada baseline + Telugu/Marwari merchant migration
  const peteRadiusKm = 0.25 + t * 4.95;
  const peteOpacity = 0.15 + t * 0.35;
  regions.push({
    id: 'region-pete',
    name: 'Pete Vernacular Core',
    dialectCode: 'Kannada-Telugu-Marwari Argot',
    color: '#00f5d4', // Luminous Cyan (unified with Human-Only Zones)
    center: [12.9698, 77.5750],
    radiusMeters: peteRadiusKm * 1000,
    polygon: generateOrganicPolygon([12.9698, 77.5750], peteRadiusKm, 20, 0.2, 1.2),
    opacity: peteOpacity,
    active: true,
    demographicContext: 'Historic commercial ward: 42.4% Kannada baseline hybridizing with Telugu and merchant migrants.'
  });

  // REGION 2: Cantonment Polyglot (Shivajinagar / Russell Market)
  // Rooted in 16.1% Tamil & 12.9% Urdu coexistence
  if (year >= 2028) {
    const tCanton = Math.max(0, Math.min(1, (year - 2028) / (2050 - 2028)));
    const cantonRadiusKm = 0.2 + tCanton * 4.4;
    const cantonOpacity = 0.12 + tCanton * 0.38;
    regions.push({
      id: 'region-cantonment',
      name: 'Cantonment Polyglot',
      dialectCode: 'Tamil-Dakhni Urdu Synthesis',
      color: '#00f5d4', // Luminous Cyan (unified)
      center: [12.9842, 77.6048],
      radiusMeters: cantonRadiusKm * 1000,
      polygon: generateOrganicPolygon([12.9842, 77.6048], cantonRadiusKm, 18, 0.8, 2.4),
      opacity: cantonOpacity,
      active: true,
      demographicContext: 'Cantonment ward: 16.1% Tamil and 12.9% Urdu baseline creating rapid bilingual code-switching.'
    });
  }

  // REGION 3: Northern Solkattu Rhythm (Malleswaram / Yeshwanthpur)
  // Rooted in traditional Kannada poetry and rhythm codes
  if (year >= 2029) {
    const tNorth = Math.max(0, Math.min(1, (year - 2029) / (2050 - 2029)));
    const northRadiusKm = 0.2 + tNorth * 4.2;
    const northOpacity = 0.12 + tNorth * 0.36;
    regions.push({
      id: 'region-north',
      name: 'Northern Solkattu Rhythm',
      dialectCode: 'Mnemonic Solkattu Ciphers',
      color: '#00f5d4', // Luminous Cyan (unified)
      center: [13.0033, 77.5702],
      radiusMeters: northRadiusKm * 1000,
      polygon: generateOrganicPolygon([13.0033, 77.5702], northRadiusKm, 18, 1.4, 3.1),
      opacity: northOpacity,
      active: true,
      demographicContext: 'Traditional northern wards: classical Carnatic solkattu rhythm masking verbal syntax.'
    });
  }

  // REGION 4: Southern Heritage Dialect (Basavanagudi / Gandhi Bazaar)
  if (year >= 2031) {
    const tSouth = Math.max(0, Math.min(1, (year - 2031) / (2050 - 2031)));
    const southRadiusKm = 0.3 + tSouth * 4.0;
    const southOpacity = 0.14 + tSouth * 0.34;
    regions.push({
      id: 'region-south',
      name: 'Southern Heritage Dialect',
      dialectCode: 'Old Mysore Literary Dialect',
      color: '#00f5d4', // Luminous Cyan (unified)
      center: [12.9438, 77.5739],
      radiusMeters: southRadiusKm * 1000,
      polygon: generateOrganicPolygon([12.9438, 77.5739], southRadiusKm, 16, 2.1, 4.5),
      opacity: southOpacity,
      active: true,
      demographicContext: 'Southern cultural wards: deeply rooted literary Kannada idioms resisting AI normalization.'
    });
  }

  // REGION 5: Eastern Cistern Enclaves (Ulsoor / Someshwara / Indiranagar)
  if (year >= 2032) {
    const tEast = Math.max(0, Math.min(1, (year - 2032) / (2050 - 2032)));
    const eastRadiusKm = 0.25 + tEast * 3.85;
    const eastOpacity = 0.14 + tEast * 0.34;
    regions.push({
      id: 'region-east',
      name: 'Eastern Cistern Enclave',
      dialectCode: 'Aquatic Reverberation Dialect',
      color: '#00f5d4', // Luminous Cyan (unified)
      center: [12.9818, 77.6252],
      radiusMeters: eastRadiusKm * 1000,
      polygon: generateOrganicPolygon([12.9818, 77.6252], eastRadiusKm, 16, 2.8, 5.2),
      opacity: eastOpacity,
      active: true,
      demographicContext: 'Subterranean stepped tank perimeter: water acoustics scattering directional microphone sensors.'
    });
  }

  // CONNECTING CORRIDORS (Merges regions by 2038–2044)
  if (year >= 2036) {
    const tCorr = Math.max(0, Math.min(1, (year - 2036) / (2050 - 2036)));
    const corrWeight = 4 + tCorr * 14;
    const corrOpacity = 0.18 + tCorr * 0.32;

    corridors.push({
      id: 'corr-pete-cantonment',
      fromName: 'Pete',
      toName: 'Cantonment',
      color: '#00f5d4',
      path: [
        [12.9698, 77.5750],
        [12.9740, 77.5880],
        [12.9790, 77.5970],
        [12.9842, 77.6048]
      ],
      weight: corrWeight,
      opacity: corrOpacity,
      active: true
    });

    corridors.push({
      id: 'corr-pete-north',
      fromName: 'Pete',
      toName: 'Malleswaram',
      color: '#00f5d4',
      path: [
        [12.9698, 77.5750],
        [12.9780, 77.5720],
        [12.9900, 77.5710],
        [13.0033, 77.5702]
      ],
      weight: corrWeight * 0.9,
      opacity: corrOpacity,
      active: true
    });

    corridors.push({
      id: 'corr-pete-south',
      fromName: 'Pete',
      toName: 'Basavanagudi',
      color: '#00f5d4',
      path: [
        [12.9698, 77.5750],
        [12.9610, 77.5750],
        [12.9520, 77.5745],
        [12.9438, 77.5739]
      ],
      weight: corrWeight * 0.9,
      opacity: corrOpacity,
      active: true
    });

    corridors.push({
      id: 'corr-cantonment-east',
      fromName: 'Cantonment',
      toName: 'Ulsoor',
      color: '#00f5d4',
      path: [
        [12.9842, 77.6048],
        [12.9835, 77.6150],
        [12.9818, 77.6252]
      ],
      weight: corrWeight * 0.85,
      opacity: corrOpacity,
      active: true
    });
  }

  // 2045–2050: ESTABLISHED UNIFIED METROPOLITAN NETWORK
  if (year >= 2044) {
    const tFull = Math.max(0, Math.min(1, (year - 2044) / (2050 - 2044)));
    const fullRadiusKm = 4.2 + tFull * 2.6;
    const fullOpacity = 0.08 + tFull * 0.16;

    regions.push({
      id: 'region-metropolis-membrane',
      name: 'Unified Polyphonic Commons',
      dialectCode: 'Sovereign Multi-Code Network',
      color: '#00f5d4',
      center: [12.9757, 77.5880],
      radiusMeters: fullRadiusKm * 1000,
      polygon: generateOrganicPolygon([12.9757, 77.5880], fullRadiusKm, 24, 0.4, 6.8),
      opacity: fullOpacity,
      active: true,
      demographicContext: '74% migrant metropolitan synthesis: complete decoupling from monolingual AI NLP tokenizers.'
    });
  }

  return { regions, corridors };
}
