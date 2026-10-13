/**
 * Bengaluru 2050 Evidence Pack & Applied Demographic Projections
 * 
 * Factual Baseline:
 * - Census C-16 (2011): Mother tongue distribution in Bangalore (8,749,944 population)
 * - Census D-05 (2011): Migration distribution in Bangalore (5,140,755 migrants, 58.75% of city)
 * - Census C-17 (2011): State-level Karnataka data (contextual only)
 * 
 * Future Projections:
 * - Transparent logic for 2026 → 2030 → 2040 → 2050 based on:
 *   1. Population growth & urbanisation rate
 *   2. Migration share (Work/Employment dominant)
 *   3. Increasing linguistic mixing & polyglot code-switching
 * 
 * Speculative Layers derived from projections:
 * - AI-recognised languages (standardized corpora in tech SEZs)
 * - Human-only languages (unparseable polyglot contact argots)
 * - AI surveillance zones (corporate IT/transit corridors)
 * - Human-only zones (where AI is manipulated by acoustic/bazaar noise)
 * - Off-grid spaces (subterranean/lithic zones where AI signals are blocked)
 */

import { LatLngTuple } from './bangaloreMapData';

// -------------------------------------------------------------
// 1. FACTUAL OBSERVED BASELINE (CENSUS 2011)
// -------------------------------------------------------------
export interface LanguageBaseline {
  language: string;
  speakers: number;
  sharePercent: number;
  status: 'OBSERVED';
  source: string;
}

export const CENSUS_2011_LANGUAGES: LanguageBaseline[] = [
  { language: 'Kannada', speakers: 3705852, sharePercent: 42.35, status: 'OBSERVED', source: 'Census C-16, 2011' },
  { language: 'Tamil', speakers: 1409124, sharePercent: 16.10, status: 'OBSERVED', source: 'Census C-16, 2011' },
  { language: 'Telugu', speakers: 1212071, sharePercent: 13.85, status: 'OBSERVED', source: 'Census C-16, 2011' },
  { language: 'Urdu', speakers: 1128801, sharePercent: 12.90, status: 'OBSERVED', source: 'Census C-16, 2011' },
  { language: 'Hindi', speakers: 493867, sharePercent: 5.64, status: 'OBSERVED', source: 'Census C-16, 2011' },
  { language: 'Malayalam', speakers: 272883, sharePercent: 3.12, status: 'OBSERVED', source: 'Census C-16, 2011' },
  { language: 'Marathi', speakers: 177526, sharePercent: 2.03, status: 'OBSERVED', source: 'Census C-16, 2011' },
  { language: 'Konkani', speakers: 63520, sharePercent: 0.73, status: 'OBSERVED', source: 'Census C-16, 2011' },
  { language: 'Bengali', speakers: 57163, sharePercent: 0.65, status: 'OBSERVED', source: 'Census C-16, 2011' },
  { language: 'Tulu', speakers: 46006, sharePercent: 0.53, status: 'OBSERVED', source: 'Census C-16, 2011' },
  { language: 'Gujarati', speakers: 44714, sharePercent: 0.51, status: 'OBSERVED', source: 'Census C-16, 2011' },
  { language: 'Odia', speakers: 41440, sharePercent: 0.47, status: 'OBSERVED', source: 'Census C-16, 2011' },
  { language: 'Coorgi/Kodagu', speakers: 17195, sharePercent: 0.20, status: 'OBSERVED', source: 'Census C-16, 2011' },
  { language: 'English', speakers: 16756, sharePercent: 0.19, status: 'OBSERVED', source: 'Census C-16, 2011' },
  { language: 'Punjabi', speakers: 16044, sharePercent: 0.18, status: 'OBSERVED', source: 'Census C-16, 2011' },
  { language: 'Other languages', speakers: 46982, sharePercent: 0.54, status: 'OBSERVED', source: 'Census C-16, 2011' }
];

export const TOTAL_OBSERVED_POPULATION_2011 = 8749944;

export interface MigrationBaseline {
  category: string;
  people: number;
  sharePercent: number;
  status: 'OBSERVED';
  source: string;
}

export const CENSUS_2011_MIGRATION: MigrationBaseline[] = [
  { category: 'Work / Employment', people: 1434948, sharePercent: 27.91, status: 'OBSERVED', source: 'Census D-05' },
  { category: 'Moved with household', people: 1090409, sharePercent: 21.21, status: 'OBSERVED', source: 'Census D-05' },
  { category: 'Marriage', people: 762122, sharePercent: 14.83, status: 'OBSERVED', source: 'Census D-05' },
  { category: 'Education', people: 137351, sharePercent: 2.67, status: 'OBSERVED', source: 'Census D-05' },
  { category: 'Business', people: 88232, sharePercent: 1.72, status: 'OBSERVED', source: 'Census D-05' },
  { category: 'Moved after birth', people: 210657, sharePercent: 4.10, status: 'OBSERVED', source: 'Census D-05' },
  { category: 'Others', people: 1417036, sharePercent: 27.56, status: 'OBSERVED', source: 'Census D-05' }
];

export const TOTAL_OBSERVED_MIGRANTS_2011 = 5140755; // 58.75% of city population

// -------------------------------------------------------------
// 2. TRANSPARENT PROJECTIONS: 2026 → 2030 → 2040 → 2050
// -------------------------------------------------------------
export interface DemographicProjection {
  year: number;
  status: 'PROJECTED';
  totalPopulation: number;
  totalPopulationFormatted: string;
  migrantSharePercent: number;
  workMigrantSharePercent: number;
  linguisticMixingIndex: number; // 0-100 scale of multi-code polyphony
  dominantTrends: string;
  linguisticComposition: {
    kannadaPluralityPct: number;
    tamilPct: number;
    teluguPct: number;
    urduPct: number;
    hindiTechInflowPct: number;
    polyglotHybridPct: number; // Speakers regularly using unparseable mixed code
  };
}

export const PROJECTIONS: Record<number, DemographicProjection> = {
  2026: {
    year: 2026,
    status: 'PROJECTED',
    totalPopulation: 14200000,
    totalPopulationFormatted: '14.2M',
    migrantSharePercent: 64.1,
    workMigrantSharePercent: 31.4,
    linguisticMixingIndex: 44,
    dominantTrends: 'Rapid tech-corridor expansion; BMRCL Phase 2 metro operational; work migration drives linguistic diversification along Outer Ring Road.',
    linguisticComposition: {
      kannadaPluralityPct: 38.6,
      tamilPct: 15.2,
      teluguPct: 13.5,
      urduPct: 12.1,
      hindiTechInflowPct: 8.9,
      polyglotHybridPct: 11.7
    }
  },
  2030: {
    year: 2030,
    status: 'PROJECTED',
    totalPopulation: 15850000,
    totalPopulationFormatted: '15.9M',
    migrantSharePercent: 66.8,
    workMigrantSharePercent: 33.8,
    linguisticMixingIndex: 58,
    dominantTrends: 'Metro artery consolidation; peripheral peri-urban absorption; high daily contact in transit hubs accelerating code-switching.',
    linguisticComposition: {
      kannadaPluralityPct: 36.8,
      tamilPct: 14.8,
      teluguPct: 13.1,
      urduPct: 11.8,
      hindiTechInflowPct: 10.8,
      polyglotHybridPct: 12.7
    }
  },
  2040: {
    year: 2040,
    status: 'PROJECTED',
    totalPopulation: 18900000,
    totalPopulationFormatted: '18.9M',
    migrantSharePercent: 71.2,
    workMigrantSharePercent: 37.5,
    linguisticMixingIndex: 76,
    dominantTrends: 'High-density infill across historic wards; corporate SEZ automation encounters high error rates in polyglot transit corridors.',
    linguisticComposition: {
      kannadaPluralityPct: 33.5,
      tamilPct: 14.1,
      teluguPct: 12.6,
      urduPct: 11.2,
      hindiTechInflowPct: 13.2,
      polyglotHybridPct: 15.4
    }
  },
  2050: {
    year: 2050,
    status: 'PROJECTED',
    totalPopulation: 21600000,
    totalPopulationFormatted: '21.6M',
    migrantSharePercent: 74.0,
    workMigrantSharePercent: 39.8,
    linguisticMixingIndex: 88,
    dominantTrends: 'Megacity polyphony; pervasive multi-code switching across generations; complete decoupling of colloquial street grammar from formal AI NLP models.',
    linguisticComposition: {
      kannadaPluralityPct: 31.2,
      tamilPct: 13.6,
      teluguPct: 12.1,
      urduPct: 10.7,
      hindiTechInflowPct: 14.8,
      polyglotHybridPct: 17.6
    }
  }
};

/**
 * Returns projection data for any intermediate year using linear interpolation.
 */
export function getProjectionForYear(year: number): DemographicProjection {
  if (year <= 2026) return PROJECTIONS[2026];
  if (year >= 2050) return PROJECTIONS[2050];

  const milestones = [2026, 2030, 2040, 2050];
  let lower = 2026;
  let upper = 2030;
  for (let i = 0; i < milestones.length - 1; i++) {
    if (year >= milestones[i] && year <= milestones[i + 1]) {
      lower = milestones[i];
      upper = milestones[i + 1];
      break;
    }
  }

  const pLow = PROJECTIONS[lower];
  const pHigh = PROJECTIONS[upper];
  const t = (year - lower) / (upper - lower);

  const pop = Math.round(pLow.totalPopulation + t * (pHigh.totalPopulation - pLow.totalPopulation));
  const migrantShare = Number((pLow.migrantSharePercent + t * (pHigh.migrantSharePercent - pLow.migrantSharePercent)).toFixed(1));
  const workShare = Number((pLow.workMigrantSharePercent + t * (pHigh.workMigrantSharePercent - pLow.workMigrantSharePercent)).toFixed(1));
  const mixIdx = Math.round(pLow.linguisticMixingIndex + t * (pHigh.linguisticMixingIndex - pLow.linguisticMixingIndex));

  return {
    year,
    status: 'PROJECTED',
    totalPopulation: pop,
    totalPopulationFormatted: `${(pop / 1000000).toFixed(1)}M`,
    migrantSharePercent: migrantShare,
    workMigrantSharePercent: workShare,
    linguisticMixingIndex: mixIdx,
    dominantTrends: t > 0.5 ? pHigh.dominantTrends : pLow.dominantTrends,
    linguisticComposition: {
      kannadaPluralityPct: Number((pLow.linguisticComposition.kannadaPluralityPct + t * (pHigh.linguisticComposition.kannadaPluralityPct - pLow.linguisticComposition.kannadaPluralityPct)).toFixed(1)),
      tamilPct: Number((pLow.linguisticComposition.tamilPct + t * (pHigh.linguisticComposition.tamilPct - pLow.linguisticComposition.tamilPct)).toFixed(1)),
      teluguPct: Number((pLow.linguisticComposition.teluguPct + t * (pHigh.linguisticComposition.teluguPct - pLow.linguisticComposition.teluguPct)).toFixed(1)),
      urduPct: Number((pLow.linguisticComposition.urduPct + t * (pHigh.linguisticComposition.urduPct - pLow.linguisticComposition.urduPct)).toFixed(1)),
      hindiTechInflowPct: Number((pLow.linguisticComposition.hindiTechInflowPct + t * (pHigh.linguisticComposition.hindiTechInflowPct - pLow.linguisticComposition.hindiTechInflowPct)).toFixed(1)),
      polyglotHybridPct: Number((pLow.linguisticComposition.polyglotHybridPct + t * (pHigh.linguisticComposition.polyglotHybridPct - pLow.linguisticComposition.polyglotHybridPct)).toFixed(1))
    }
  };
}

// -------------------------------------------------------------
// 3. SPECULATIVE SPATIAL LAYERS (DERIVED LOGICALLY FROM DATA)
// -------------------------------------------------------------
export type SpeculativeLayerType =
  | 'ai-recognised'    // AI-recognised languages (standard corpora in tech parks)
  | 'human-only-lang'  // Human-only languages (unparseable polyglot street vernaculars)
  | 'ai-surveillance'  // AI surveillance zones (corporate telemetry grids)
  | 'human-only-zone'  // Human-only zones (where AI is manipulated by noise/switching)
  | 'off-grid-space';  // Off-grid spaces (where AI signals/audio are blocked)

export interface SpeculativeSpatialFeature {
  id: string;
  name: string;
  type: SpeculativeLayerType;
  typeLabel: string;
  color: string;
  center: LatLngTuple;
  polygon?: LatLngTuple[];
  radiusMeters: number;
  demographicOrigin: string; // Explains how this emerges from Census 2011 & projection
  phenomenonDescription: string;
  activeFromYear: number;
}

export const SPECULATIVE_SPATIAL_FEATURES: SpeculativeSpatialFeature[] = [
  // A. HUMAN-ONLY ZONES (Where AI is manipulated / scrambled) - SAME COLOR (#00f5d4) AS HUMAN-ONLY LANGUAGES
  {
    id: 'hz-chickpet',
    name: 'Chickpet Pete Acoustic Baffle',
    type: 'human-only-zone',
    typeLabel: 'Human-Only Zone (AI Manipulated)',
    color: '#00f5d4', // Luminous Cyan
    center: [12.9698, 77.5750],
    radiusMeters: 850,
    demographicOrigin: 'Derived from 16th-century commercial ward mixing: 42.4% Kannada baseline interacting with Telugu and Marwari merchant migrants. Extreme vocal cadence and handloom clatter.',
    phenomenonDescription: 'Dense maze of high-walled stone gallis and brass scale chimes shatter automated NLP tokenizers into unparsed phonetic static.',
    activeFromYear: 2026
  },
  {
    id: 'hz-russell',
    name: 'Russell Market Vault Arcade',
    type: 'human-only-zone',
    typeLabel: 'Human-Only Zone (AI Manipulated)',
    color: '#00f5d4', // Luminous Cyan (unified with Human-Only Languages)
    center: [12.9842, 77.6048],
    radiusMeters: 780,
    demographicOrigin: 'Rooted in Cantonment migration baseline: 16.1% Tamil and 12.9% Urdu coexistence. Rapid code-switching with English and Dakhni.',
    phenomenonDescription: 'Butchers cleaver cadence and wet stone acoustic reflections actively jam directional parabolic microphones mounted on drones.',
    activeFromYear: 2028
  },
  {
    id: 'hz-kr-market',
    name: 'KR Market Flower Mandi & Fort Baffle',
    type: 'human-only-zone',
    typeLabel: 'Human-Only Zone (AI Manipulated)',
    color: '#00f5d4', // Luminous Cyan (unified with Human-Only Languages)
    center: [12.9629, 77.5758],
    radiusMeters: 800,
    demographicOrigin: 'Sourced from wholesale labor influx (27.9% work migration): multilingual agrarian auctioneers switching dialects at 180 words/min.',
    phenomenonDescription: 'Basement market decibels and flower auction numeric cants (Gajagalu) induce 94% word error rates in AI acoustic surveillance.',
    activeFromYear: 2030
  },

  // B. OFF-GRID SPACES (Where AI is physically blocked) - DISTINCT ELECTRIC VIOLET (#a855f7)
  {
    id: 'og-ulsoor',
    name: 'Ulsoor Someshwara Subterranean Cistern',
    type: 'off-grid-space',
    typeLabel: 'Off-Grid Space (AI Blocked)',
    color: '#a855f7', // Electric Violet (Distinct from blue and cyan)
    center: [12.9818, 77.6252],
    radiusMeters: 620,
    demographicOrigin: 'Historic water tank catchment where Tamil cantonment laborers and local fishers met outside corporate surveillance perimeters.',
    phenomenonDescription: 'Chola-era stepped granite stone tank creates 12-second multipath reverberation. Acoustic phase cancellation physically prevents voice recognition.',
    activeFromYear: 2030
  },
  {
    id: 'og-malleswaram',
    name: 'Malleswaram 8th Cross Granite Steps',
    type: 'off-grid-space',
    typeLabel: 'Off-Grid Space (AI Blocked)',
    color: '#a855f7', // Electric Violet
    center: [13.0033, 77.5702],
    radiusMeters: 680,
    demographicOrigin: 'Traditional residential enclave where 42.4% Kannada baseline cultivated classical Solkattu rhythmic mnemonic recitations.',
    phenomenonDescription: 'Steep granite pedestrian stairwells shielded by dense rain trees block satellite optical sensors and aerial telemetry.',
    activeFromYear: 2030
  },
  {
    id: 'og-fort',
    name: 'Bangalore Fort Lithic Catacombs',
    type: 'off-grid-space',
    typeLabel: 'Off-Grid Space (AI Blocked)',
    color: '#a855f7', // Electric Violet
    center: [12.9627, 77.5762],
    radiusMeters: 550,
    demographicOrigin: 'Kempe Gowda granite ramparts acting as an RF-impermeable lithic shield in the heart of the central transit nexus.',
    phenomenonDescription: 'Massive mud-and-granite ramparts attenuate 99.8% of high-frequency wireless sensor signals, creating an autonomous offline sanctuary.',
    activeFromYear: 2036
  },

  // C. AI SURVEILLANCE ZONES (Corporate IT / transit corridors) - AMBER / RED (#ef4444 / #f97316)
  {
    id: 'sv-whitefield',
    name: 'Whitefield ITPL / EPIP Tech Monolith',
    type: 'ai-surveillance',
    typeLabel: 'AI Surveillance Zone',
    color: '#ef4444', // Red/Orange
    center: [12.9860, 77.7460],
    radiusMeters: 1400,
    demographicOrigin: 'Direct manifestation of the 27.91% work/employment migration wave: high-density corporate tech campuses reliant on automated access control.',
    phenomenonDescription: 'Dense perimeter array of automated facial recognition, license-plate cameras, and smart turnstiles standardizing corporate corpora.',
    activeFromYear: 2026
  },
  {
    id: 'sv-bellandur',
    name: 'Outer Ring Road (Bellandur) Glass Corridor',
    type: 'ai-surveillance',
    typeLabel: 'AI Surveillance Zone',
    color: '#f97316', // Orange
    center: [12.9260, 77.6762],
    radiusMeters: 1500,
    demographicOrigin: 'Spurred by massive post-2011 tech corridor consolidation: influx of interstate white-collar work migrants creating standardized English/Hindi clusters.',
    phenomenonDescription: 'Overhead highway gantry microphones and automated noise profiling monitors scanning arterial traffic corridors.',
    activeFromYear: 2026
  },
  {
    id: 'sv-ecity',
    name: 'Electronic City Phase 1 Data Fortress',
    type: 'ai-surveillance',
    typeLabel: 'AI Surveillance Zone',
    color: '#ea580c', // Deep Orange
    center: [12.8452, 77.6602],
    radiusMeters: 1300,
    demographicOrigin: 'Dedicated industrial electronics SEZ created under state industrial policy, housing centralized server farms and automated gate systems.',
    phenomenonDescription: 'Elevated tollway surveillance and private industrial security telemetry enforcing linguistic and behavioral conformity.',
    activeFromYear: 2026
  },

  // D. AI-RECOGNISED LANGUAGES (Standardized corporate corpora) - DISTINCT COBALT TECH BLUE (#3b82f6)
  {
    id: 'ar-manyata',
    name: 'Manyata Tech Park Sector',
    type: 'ai-recognised',
    typeLabel: 'AI-Recognised Language Corridor',
    color: '#3b82f6', // Cobalt Tech Blue
    center: [13.0498, 77.6198],
    radiusMeters: 1100,
    demographicOrigin: 'Northern IT corridor absorbing inter-state tech migration (Hindi, Bengali, English): standard token vocabularies parsed by corporate LLMs.',
    phenomenonDescription: 'Standardized Corporate English and Formal Hindi operate seamlessly across all digital workplace models and smart interfaces.',
    activeFromYear: 2026
  },
  {
    id: 'ar-bagmane',
    name: 'Bagmane Tech Park Corridor',
    type: 'ai-recognised',
    typeLabel: 'AI-Recognised Language Corridor',
    color: '#3b82f6', // Cobalt Tech Blue
    center: [12.9815, 77.6625],
    radiusMeters: 950,
    demographicOrigin: 'Eastern tech cluster with predominant interstate engineering cohorts communicating in standardized corporate English corpora.',
    phenomenonDescription: 'Automated synthesis models process enterprise communication channels with 99.4% parsing fidelity.',
    activeFromYear: 2028
  },
  {
    id: 'ar-ecospace',
    name: 'Outer Ring Road (Ecospace) Sector',
    type: 'ai-recognised',
    typeLabel: 'AI-Recognised Language Corridor',
    color: '#3b82f6', // Cobalt Tech Blue
    center: [12.9260, 77.6830],
    radiusMeters: 1100,
    demographicOrigin: 'Southern IT corridor where inter-regional migrant cohorts converge on enterprise campuses with structured linguistic uniformity.',
    phenomenonDescription: 'Corporate speech analytics and conversational agents operate continuously across campus networks.',
    activeFromYear: 2026
  }
];

/**
 * Returns active speculative features for the given year with dynamic scaling.
 */
export function getSpeculativeFeaturesForYear(year: number) {
  const t = Math.max(0, Math.min(1, (year - 2026) / (2050 - 2026)));

  return SPECULATIVE_SPATIAL_FEATURES
    .filter(f => year >= f.activeFromYear)
    .map(f => {
      // Dynamic radius and opacity based on timeline year
      let radiusMultiplier = 1;
      let opacity = 0.5;

      if (f.type === 'ai-surveillance') {
        // Peaks in 2038-2040, then fractures/decays by 2045-2050
        if (year <= 2040) {
          radiusMultiplier = 0.8 + ((year - 2026) / 14) * 0.7; // 0.8 -> 1.5
          opacity = 0.5 + ((year - 2026) / 14) * 0.4; // 0.5 -> 0.9
        } else {
          radiusMultiplier = 1.5 - ((year - 2040) / 10) * 0.6; // 1.5 -> 0.9
          opacity = 0.9 - ((year - 2040) / 10) * 0.5; // 0.9 -> 0.4 (fracturing)
        }
      } else if (f.type === 'human-only-zone' || f.type === 'human-only-lang') {
        // Grows consistently as linguistic mixing expands (44% -> 88%)
        radiusMultiplier = 0.6 + t * 1.4; // 0.6 -> 2.0
        opacity = 0.35 + t * 0.45; // 0.35 -> 0.80
      } else if (f.type === 'off-grid-space') {
        // Fortifies over time
        radiusMultiplier = 0.8 + t * 0.8;
        opacity = 0.5 + t * 0.4;
      } else if (f.type === 'ai-recognised') {
        // Standardized corporate corridors expand with IT corridor infrastructure
        radiusMultiplier = 0.85 + t * 0.5;
        opacity = 0.4 + t * 0.35;
      }

      return {
        ...f,
        radiusMeters: Math.round(f.radiusMeters * radiusMultiplier),
        opacity: Number(opacity.toFixed(2))
      };
    });
}
