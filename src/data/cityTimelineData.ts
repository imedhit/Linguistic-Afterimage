/**
 * Fictional Speculative Timeline Data for Bengaluru (2026–2050)
 * Exact milestone years: 2026, 2032, 2038, 2044, 2050.
 * Models language states, population shifts, and AI surveillance levels across zones.
 */

import { LatLngTuple } from './bangaloreMapData';

export type MilestoneYear = 2026 | 2032 | 2038 | 2044 | 2050;

export const TIMELINE_YEARS: MilestoneYear[] = [2026, 2032, 2038, 2044, 2050];

export interface ZoneMetricData {
  id: string;
  name: string;
  sector: string;
  coordinates: LatLngTuple;
  polygon?: LatLngTuple[];
  category: 'sanctuary' | 'corridor' | 'metro-hub';
  // Required 4 Core Interaction Fields:
  languageState: string;
  populationShift: string;
  aiSurveillanceLevel: string;
  // Numerical values for visual heat / scale
  populationPct: number; // e.g. +14%
  surveillancePct: number; // 0-100%
  // Visual properties for map rendering
  activeInYear: boolean;
  radiusMeters: number;
}

export interface EraOverview {
  year: MilestoneYear;
  title: string;
  subtitle: string;
  description: string;
  avgSurveillance: number;
  totalPopulationShift: string;
  dominantLanguageState: string;
}

export const ERA_OVERVIEWS: Record<MilestoneYear, EraOverview> = {
  2026: {
    year: 2026,
    title: 'Baseline Inception',
    subtitle: 'Genesis of unparsed vocal enclaves',
    description: 'First acoustic resistance pockets form beneath BMRCL viaducts. AI NLP models begin losing tracking confidence in dense bazaar corridors.',
    avgSurveillance: 24,
    totalPopulationShift: '+8% organic migration toward old pete markets',
    dominantLanguageState: 'Unparsed Kempe Gowda Bazaar Argot'
  },
  2032: {
    year: 2032,
    title: 'Transit Corridor Influx',
    subtitle: 'BMRCL arterial consolidation',
    description: 'Transit lines become acoustic conduits. AI surveillance drones install directional parabolic arrays along the Outer Ring Road.',
    avgSurveillance: 58,
    totalPopulationShift: '+32% commuter density shift along Metro arteries',
    dominantLanguageState: 'Clandestine Dialect Synthesis & Rapid Vernacular'
  },
  2038: {
    year: 2038,
    title: 'Peak Surveillance Grid',
    subtitle: 'High-density telemetry vs encrypted phonemes',
    description: 'Corporate AI bastions deploy blanket acoustic telemetry. Wanderers establish subterranean stone stepwell acoustic nullifiers.',
    avgSurveillance: 91,
    totalPopulationShift: '+65% sanctuary densification in historic wards',
    dominantLanguageState: 'Sub-harmonic Encrypted Phoneme Ciphers'
  },
  2044: {
    year: 2044,
    title: 'Telemetry Fracturing',
    subtitle: 'Sensor degradation & sanctuary expansion',
    description: 'Sensor arrays suffer semantic multipath distortion. Automated listening grids experience cascading blindspots across Bengaluru.',
    avgSurveillance: 46,
    totalPopulationShift: '+95% decentralized community relocation',
    dominantLanguageState: 'Autonomous Resonant Lingua Franca'
  },
  2050: {
    year: 2050,
    title: 'Polyphonic Metropolis',
    subtitle: 'Complete unparsed linguistic sovereignty',
    description: 'The whole Bengaluru metropolitan network operates on living oral syntax. The metro network functions as an untouchable acoustic sanctuary.',
    avgSurveillance: 16,
    totalPopulationShift: '+142% total population redistribution into linguistic commons',
    dominantLanguageState: 'Pervasive Neo-Kannada Polyphony'
  }
};

export const BASE_ZONES: Array<{
  id: string;
  name: string;
  sector: string;
  coordinates: LatLngTuple;
  polygon?: LatLngTuple[];
  category: 'sanctuary' | 'corridor' | 'metro-hub';
  timelineData: Record<MilestoneYear, {
    languageState: string;
    populationShift: string;
    aiSurveillanceLevel: string;
    populationPct: number;
    surveillancePct: number;
    activeInYear: boolean;
    radiusMeters: number;
  }>;
}> = [
  {
    id: 'zone-chickpet',
    name: 'Chickpet Pete Sanctuary',
    sector: 'Central Pete',
    coordinates: [12.9698, 77.5750],
    polygon: [
      [12.9735, 77.5710],
      [12.9740, 77.5790],
      [12.9670, 77.5805],
      [12.9655, 77.5735],
      [12.9690, 77.5705]
    ],
    category: 'sanctuary',
    timelineData: {
      2026: {
        languageState: 'Bazaar Slang & Handloom Rhythm',
        populationShift: '+14% Influx (Merchant Families)',
        aiSurveillanceLevel: '18% Low Baseline (Acoustic Blindspot)',
        populationPct: 14,
        surveillancePct: 18,
        activeInYear: true,
        radiusMeters: 450
      },
      2032: {
        languageState: 'Old Kannada-Marwari Cryptic Argot',
        populationShift: '+38% Influx (Textile Guild Consolidation)',
        aiSurveillanceLevel: '42% Moderate (Perimeter Drone Patrols)',
        populationPct: 38,
        surveillancePct: 42,
        activeInYear: true,
        radiusMeters: 620
      },
      2038: {
        languageState: 'Sub-vocal Coin Clicks & Brass Harmonics',
        populationShift: '+72% Influx (High-Density Resistance Haven)',
        aiSurveillanceLevel: '82% High (Parabolic Listening Posts)',
        populationPct: 72,
        surveillancePct: 82,
        activeInYear: true,
        radiusMeters: 850
      },
      2044: {
        languageState: 'Subterranean Vault Phonetic Cipher',
        populationShift: '+105% Influx (Permanent Clandestine Enclave)',
        aiSurveillanceLevel: '35% Failing (Sensor Overload & Jamming)',
        populationPct: 105,
        surveillancePct: 35,
        activeInYear: true,
        radiusMeters: 1100
      },
      2050: {
        languageState: 'Sovereign Bazaar Polyphony',
        populationShift: '+150% Influx (Primary Heritage Core)',
        aiSurveillanceLevel: '10% Null (Total Signal Immunity)',
        populationPct: 150,
        surveillancePct: 10,
        activeInYear: true,
        radiusMeters: 1350
      }
    }
  },
  {
    id: 'zone-russell-market',
    name: 'Russell Market Vaults (Shivajinagar)',
    sector: 'Cantonment',
    coordinates: [12.9842, 77.6048],
    polygon: [
      [12.9870, 77.6015],
      [12.9875, 77.6080],
      [12.9815, 77.6085],
      [12.9810, 77.6020]
    ],
    category: 'sanctuary',
    timelineData: {
      2026: {
        languageState: 'Cantonment Dakhni-Tamil Synthesis',
        populationShift: '+11% Influx (Butcher Guild Community)',
        aiSurveillanceLevel: '22% Baseline Sweep',
        populationPct: 11,
        surveillancePct: 22,
        activeInYear: true,
        radiusMeters: 420
      },
      2032: {
        languageState: 'Iron Girdle Acoustic Reflection',
        populationShift: '+34% Influx (Cantonment Dispersion)',
        aiSurveillanceLevel: '48% Quadcopter Array',
        populationPct: 34,
        surveillancePct: 48,
        activeInYear: true,
        radiusMeters: 580
      },
      2038: {
        languageState: 'Cleaver Percussion Vocal Masking',
        populationShift: '+66% Influx (Multi-ethnic Sanctuary)',
        aiSurveillanceLevel: '88% High Beamforming Scanners',
        populationPct: 66,
        surveillancePct: 88,
        activeInYear: true,
        radiusMeters: 780
      },
      2044: {
        languageState: 'Multipath Polyglot Dispersion',
        populationShift: '+92% Influx (Dense Cantonment Commons)',
        aiSurveillanceLevel: '38% Fragmented Sensor Array',
        populationPct: 92,
        surveillancePct: 38,
        activeInYear: true,
        radiusMeters: 980
      },
      2050: {
        languageState: 'Harmonic Cantonment Vernacular',
        populationShift: '+135% Influx (Autonomous Cultural Nexus)',
        aiSurveillanceLevel: '12% Passive Null',
        populationPct: 135,
        surveillancePct: 12,
        activeInYear: true,
        radiusMeters: 1200
      }
    }
  },
  {
    id: 'zone-malleswaram',
    name: 'Malleswaram 8th Cross Steps',
    sector: 'North',
    coordinates: [13.0033, 77.5702],
    polygon: [
      [13.0070, 77.5655],
      [13.0075, 77.5745],
      [12.9995, 77.5750],
      [12.9990, 77.5660]
    ],
    category: 'sanctuary',
    timelineData: {
      2026: {
        languageState: 'Classical Rhythmic Solkattu Recitation',
        populationShift: '+8% Influx (Elder Poets & Musicians)',
        aiSurveillanceLevel: '15% Minimal Street Cameras',
        populationPct: 8,
        surveillancePct: 15,
        activeInYear: true,
        radiusMeters: 400
      },
      2032: {
        languageState: 'Solkattu Ghost Cipher (Tha-Dhi-Gi-Na-Thom)',
        populationShift: '+29% Influx (Academic Refugees)',
        aiSurveillanceLevel: '45% Voiceprint Audio Recorders',
        populationPct: 29,
        surveillancePct: 45,
        activeInYear: true,
        radiusMeters: 550
      },
      2038: {
        languageState: 'Veena Harmonics & Granite Echo Inversion',
        populationShift: '+58% Influx (Acoustic Preservation Ward)',
        aiSurveillanceLevel: '79% Pervasive Lamp-post Microphones',
        populationPct: 58,
        surveillancePct: 79,
        activeInYear: true,
        radiusMeters: 750
      },
      2044: {
        languageState: 'Temple Bell Frequency Jamming',
        populationShift: '+84% Influx (Cultural Fortification)',
        aiSurveillanceLevel: '29% Optical Only / Audio Defeated',
        populationPct: 84,
        surveillancePct: 29,
        activeInYear: true,
        radiusMeters: 920
      },
      2050: {
        languageState: 'Sovereign Metric Poetry Commons',
        populationShift: '+120% Influx (Heritage Sanctuary Hub)',
        aiSurveillanceLevel: '8% Zero Telemetry Extraction',
        populationPct: 120,
        surveillancePct: 8,
        activeInYear: true,
        radiusMeters: 1150
      }
    }
  },
  {
    id: 'zone-ulsoor',
    name: 'Ulsoor Someshwara Cistern',
    sector: 'East',
    coordinates: [12.9818, 77.6252],
    polygon: [
      [12.9850, 77.6205],
      [12.9855, 77.6295],
      [12.9775, 77.6300],
      [12.9770, 77.6210]
    ],
    category: 'sanctuary',
    timelineData: {
      2026: {
        languageState: 'Subterranean Stepped Tank Echoes',
        populationShift: '+6% Influx (Night Gathering)',
        aiSurveillanceLevel: '12% Surface Only',
        populationPct: 6,
        surveillancePct: 12,
        activeInYear: true,
        radiusMeters: 380
      },
      2032: {
        languageState: 'Water Surface Low-Pass Reflection',
        populationShift: '+26% Influx (Clandestine Enclave)',
        aiSurveillanceLevel: '39% Hydrophone Scanning',
        populationPct: 26,
        surveillancePct: 39,
        activeInYear: true,
        radiusMeters: 520
      },
      2038: {
        languageState: 'Standing Wave 12-Second Reverberation',
        populationShift: '+54% Influx (Lakefront Sanctuary)',
        aiSurveillanceLevel: '74% Perimeter Drone Buoys',
        populationPct: 54,
        surveillancePct: 74,
        activeInYear: true,
        radiusMeters: 700
      },
      2044: {
        languageState: 'Lithic Resonator Multi-channel Web',
        populationShift: '+81% Influx (Aquatic Defense Sector)',
        aiSurveillanceLevel: '24% Phase Distortion Error',
        populationPct: 81,
        surveillancePct: 24,
        activeInYear: true,
        radiusMeters: 900
      },
      2050: {
        languageState: 'Aquatic Acoustic Sovereign Network',
        populationShift: '+115% Influx (Eastern Refuge Nexus)',
        aiSurveillanceLevel: '6% Completely Untracked',
        populationPct: 115,
        surveillancePct: 6,
        activeInYear: true,
        radiusMeters: 1100
      }
    }
  },
  {
    id: 'zone-kr-market',
    name: 'KR Market Flower Mandi & Fort',
    sector: 'South-Central',
    coordinates: [12.9629, 77.5758],
    polygon: [
      [12.9660, 77.5720],
      [12.9665, 77.5795],
      [12.9595, 77.5800],
      [12.9590, 77.5725]
    ],
    category: 'sanctuary',
    timelineData: {
      2026: {
        languageState: 'Jasmine Mandi Shouting Cadence',
        populationShift: '+16% Influx (Wholesale Laborers)',
        aiSurveillanceLevel: '20% Optical Crowd Scanning',
        populationPct: 16,
        surveillancePct: 20,
        activeInYear: true,
        radiusMeters: 450
      },
      2032: {
        languageState: 'Flower Auction Numeric Code (Gajagalu)',
        populationShift: '+42% Influx (Agrarian Transit Labor)',
        aiSurveillanceLevel: '52% High-Density Face/Voice Recorders',
        populationPct: 42,
        surveillancePct: 52,
        activeInYear: true,
        radiusMeters: 650
      },
      2038: {
        languageState: 'Basement Mandi Baffle Dynamics',
        populationShift: '+75% Influx (Dense Commercial Resistance)',
        aiSurveillanceLevel: '86% Overhead Thermal & Audio Drones',
        populationPct: 75,
        surveillancePct: 86,
        activeInYear: true,
        radiusMeters: 850
      },
      2044: {
        languageState: 'Fort Stone Wall Acoustic Deflection',
        populationShift: '+110% Influx (Fortified Trade Commune)',
        aiSurveillanceLevel: '32% Sensor Smearing from Mist/Decibels',
        populationPct: 110,
        surveillancePct: 32,
        activeInYear: true,
        radiusMeters: 1100
      },
      2050: {
        languageState: 'Organic Flower Trade Polyphony',
        populationShift: '+160% Influx (Southern Mercantile Core)',
        aiSurveillanceLevel: '9% Low Residual Sensor Static',
        populationPct: 160,
        surveillancePct: 9,
        activeInYear: true,
        radiusMeters: 1350
      }
    }
  },
  {
    id: 'zone-whitefield',
    name: 'Whitefield ITPL Tech Citadel',
    sector: 'East Corridor',
    coordinates: [12.9860, 77.7460],
    polygon: [
      [12.9910, 77.7390],
      [12.9915, 77.7530],
      [12.9810, 77.7535],
      [12.9805, 77.7395]
    ],
    category: 'corridor',
    timelineData: {
      2026: {
        languageState: 'Synthetic Corporate English & Silicon Tokenization',
        populationShift: '+25% Tech Expat & Corporate Workers',
        aiSurveillanceLevel: '72% High Corporate Campus Telemetry',
        populationPct: 25,
        surveillancePct: 72,
        activeInYear: true,
        radiusMeters: 750
      },
      2032: {
        languageState: 'Algorithmic Monitored Speech Standard',
        populationShift: '+15% Stabilized SEZ Workforce',
        aiSurveillanceLevel: '92% Peak Biometric Facial & Voice Fence',
        populationPct: 15,
        surveillancePct: 92,
        activeInYear: true,
        radiusMeters: 950
      },
      2038: {
        languageState: 'Strict Neural NLP Censorship Grid',
        populationShift: '-12% Exodus to Historic Wards',
        aiSurveillanceLevel: '98% Total Automated Audio Sweep',
        populationPct: -12,
        surveillancePct: 98,
        activeInYear: true,
        radiusMeters: 1200
      },
      2044: {
        languageState: 'Underground Server Basement Sub-dialects',
        populationShift: '-35% Corporate Contraction',
        aiSurveillanceLevel: '68% Deteriorating Server Infrastructure',
        populationPct: -35,
        surveillancePct: 68,
        activeInYear: true,
        radiusMeters: 850
      },
      2050: {
        languageState: 'Reclaimed Hacker Kannada-English Hybrid',
        populationShift: '+45% Repurposed Community Labs',
        aiSurveillanceLevel: '22% Decommissioned Monolith',
        populationPct: 45,
        surveillancePct: 22,
        activeInYear: true,
        radiusMeters: 650
      }
    }
  },
  {
    id: 'zone-bellandur',
    name: 'Bellandur Outer Ring Road Corridor',
    sector: 'South-East',
    coordinates: [12.9260, 77.6762],
    polygon: [
      [12.9310, 77.6690],
      [12.9315, 77.6830],
      [12.9210, 77.6835],
      [12.9205, 77.6695]
    ],
    category: 'corridor',
    timelineData: {
      2026: {
        languageState: 'Corporate Commuter English & Filtered Hindi',
        populationShift: '+30% High Density Suburban Surge',
        aiSurveillanceLevel: '65% Automated Traffic Video & Mic Array',
        populationPct: 30,
        surveillancePct: 65,
        activeInYear: true,
        radiusMeters: 700
      },
      2032: {
        languageState: 'Automated Language Profiling Zone',
        populationShift: '+18% Moderate Commercial Growth',
        aiSurveillanceLevel: '88% Highway Parabolic Surveillance',
        populationPct: 18,
        surveillancePct: 88,
        activeInYear: true,
        radiusMeters: 900
      },
      2038: {
        languageState: 'Sub-viaduct Vendor Dialect Smuggling',
        populationShift: '-15% Dispersion into BMRCL Arteries',
        aiSurveillanceLevel: '95% Continuous Drone Sweep',
        populationPct: -15,
        surveillancePct: 95,
        activeInYear: true,
        radiusMeters: 1100
      },
      2044: {
        languageState: 'Acoustic Smog & Sensor Nullification',
        populationShift: '-28% Shift to Pete Sanctuaries',
        aiSurveillanceLevel: '55% Sensor Erosion from Environmental Acid',
        populationPct: -28,
        surveillancePct: 55,
        activeInYear: true,
        radiusMeters: 800
      },
      2050: {
        languageState: 'Decentralized Transit Bazaar Vernacular',
        populationShift: '+38% Rebuilt Pedestrian Commons',
        aiSurveillanceLevel: '18% Localized Community Nodes',
        populationPct: 38,
        surveillancePct: 18,
        activeInYear: true,
        radiusMeters: 600
      }
    }
  },
  {
    id: 'zone-majestic-hub',
    name: 'Majestic Central Interchange Nexus',
    sector: 'Central Transit Hub',
    coordinates: [12.9757, 77.5728],
    polygon: [
      [12.9790, 77.5690],
      [12.9795, 77.5765],
      [12.9720, 77.5770],
      [12.9715, 77.5695]
    ],
    category: 'metro-hub',
    timelineData: {
      2026: {
        languageState: 'Cross-Corridor Multi-Dialect Junction',
        populationShift: '+45% Transit Hub Density Concentration',
        aiSurveillanceLevel: '45% Turnstile CCTV & Voice Sensors',
        populationPct: 45,
        surveillancePct: 45,
        activeInYear: true,
        radiusMeters: 600
      },
      2032: {
        languageState: 'Dual-Line Acoustic Cross-Bleed (Purple/Green)',
        populationShift: '+85% Massive Commuter Transfer Flux',
        aiSurveillanceLevel: '78% High-Frequency Gate Scanners',
        populationPct: 85,
        surveillancePct: 78,
        activeInYear: true,
        radiusMeters: 800
      },
      2038: {
        languageState: 'Crowd-Sourced Acoustic Shielding',
        populationShift: '+120% Hub of Underground Transit Migration',
        aiSurveillanceLevel: '92% Peak Terminal Surveillance',
        populationPct: 120,
        surveillancePct: 92,
        activeInYear: true,
        radiusMeters: 1050
      },
      2044: {
        languageState: 'Subterranean Whisper Corridor Network',
        populationShift: '+155% Major Migration Redistribution Nexus',
        aiSurveillanceLevel: '42% Mechanical Track Noise Baffling',
        populationPct: 155,
        surveillancePct: 42,
        activeInYear: true,
        radiusMeters: 1250
      },
      2050: {
        languageState: 'Metropolitan Polyphonic Cathedral',
        populationShift: '+210% Central Circulatory Heart of City',
        aiSurveillanceLevel: '14% Open Free-Speech Transit Nexus',
        populationPct: 210,
        surveillancePct: 14,
        activeInYear: true,
        radiusMeters: 1500
      }
    }
  },
  {
    id: 'zone-ecity',
    name: 'Electronic City Phase 1 Bunker',
    sector: 'South SEZ',
    coordinates: [12.8452, 77.6602],
    polygon: [
      [12.8500, 77.6540],
      [12.8510, 77.6660],
      [12.8400, 77.6670],
      [12.8390, 77.6550]
    ],
    category: 'corridor',
    timelineData: {
      2026: {
        languageState: 'Corporate English & Standard Token Vocabulary',
        populationShift: '+20% SEZ Tech Commuters',
        aiSurveillanceLevel: '70% Strict Elevated Tollway Scanners',
        populationPct: 20,
        surveillancePct: 70,
        activeInYear: true,
        radiusMeters: 650
      },
      2032: {
        languageState: 'Rigid Standardized Corporate Language',
        populationShift: '+12% Managed Workforce',
        aiSurveillanceLevel: '90% Continuous Perimeter Telemetry',
        populationPct: 12,
        surveillancePct: 90,
        activeInYear: true,
        radiusMeters: 850
      },
      2038: {
        languageState: 'Automated Language Enforcement Zone',
        populationShift: '-18% Decentralization Migration',
        aiSurveillanceLevel: '96% Full Spectral AI Sweeps',
        populationPct: -18,
        surveillancePct: 96,
        activeInYear: true,
        radiusMeters: 1100
      },
      2044: {
        languageState: 'Perimeter Slang Infiltration',
        populationShift: '-40% High Vacancy Rate',
        aiSurveillanceLevel: '60% Partial Sensor Power Outages',
        populationPct: -40,
        surveillancePct: 60,
        activeInYear: true,
        radiusMeters: 750
      },
      2050: {
        languageState: 'Southern Hybrid Vernacular Workshop',
        populationShift: '+30% Repurposed Solar Communes',
        aiSurveillanceLevel: '19% Passive Regional Monitors',
        populationPct: 30,
        surveillancePct: 19,
        activeInYear: true,
        radiusMeters: 600
      }
    }
  },
  {
    id: 'zone-yeshwanthpur',
    name: 'Yeshwanthpur Rail & Mandi Yards',
    sector: 'North-West',
    coordinates: [13.0238, 77.5501],
    polygon: [
      [13.0280, 77.5450],
      [13.0285, 77.5550],
      [13.0190, 77.5555],
      [13.0185, 77.5455]
    ],
    category: 'sanctuary',
    timelineData: {
      2026: {
        languageState: 'Rail Shunting Cant & Porter Jargon',
        populationShift: '+12% Rail Freight Workers',
        aiSurveillanceLevel: '24% Station Overhead Cameras',
        populationPct: 12,
        surveillancePct: 24,
        activeInYear: true,
        radiusMeters: 450
      },
      2032: {
        languageState: 'Freight Engine Low-Frequency Masking',
        populationShift: '+36% Northern Migration Hub',
        aiSurveillanceLevel: '55% Rail Corridor Directional Audio',
        populationPct: 36,
        surveillancePct: 55,
        activeInYear: true,
        radiusMeters: 650
      },
      2038: {
        languageState: 'Interstate Multi-Lingual Rail Dialects',
        populationShift: '+70% Regional Transit Sanctuary',
        aiSurveillanceLevel: '84% AI Freight Track Surveillance',
        populationPct: 70,
        surveillancePct: 84,
        activeInYear: true,
        radiusMeters: 850
      },
      2044: {
        languageState: 'Wholesale Mandi Acoustic Baffle Guild',
        populationShift: '+98% Northern Commercial Fortress',
        aiSurveillanceLevel: '36% Diesel Vibration Sensor Jamming',
        populationPct: 98,
        surveillancePct: 36,
        activeInYear: true,
        radiusMeters: 1050
      },
      2050: {
        languageState: 'Northwestern Polyphonic Rail Commons',
        populationShift: '+140% Intermodal Transit Metropolis',
        aiSurveillanceLevel: '11% Zero-Threat Sovereign Zone',
        populationPct: 140,
        surveillancePct: 11,
        activeInYear: true,
        radiusMeters: 1300
      }
    }
  }
];

/**
 * Helper to get all zone data tailored to a specific milestone year.
 */
export function getZonesForYear(year: MilestoneYear): ZoneMetricData[] {
  return BASE_ZONES.map(z => {
    const data = z.timelineData[year] || z.timelineData[2026];
    return {
      id: z.id,
      name: z.name,
      sector: z.sector,
      coordinates: z.coordinates,
      polygon: z.polygon,
      category: z.category,
      languageState: data.languageState,
      populationShift: data.populationShift,
      aiSurveillanceLevel: data.aiSurveillanceLevel,
      populationPct: data.populationPct,
      surveillancePct: data.surveillancePct,
      activeInYear: data.activeInYear,
      radiusMeters: data.radiusMeters
    };
  });
}
