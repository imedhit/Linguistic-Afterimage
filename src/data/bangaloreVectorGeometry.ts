/**
 * Bengaluru 2D Vector Cartographic Geometry
 * 
 * Provides high-precision 2D vector geographic features across Bengaluru:
 * 1. Prominent City Areas & Neighborhoods (Historic Petes, Cantons, Tech Corridors, Residential Quadrants)
 * 2. Major Arterial Road Network (Outer Ring Road Loop, NICE Peripheral Road, Major Radials)
 * 3. Prominent Lakes & Ecological Canopies
 * 4. Speculative 2D Vector Zone Geometry (Epicenters, Technical Radii, Coordinate Reticles)
 */

export interface VectorArea {
  id: string;
  name: string;
  kannadaName?: string;
  coordinates: [number, number]; // [lat, lng]
  sector: 'Central' | 'North' | 'South' | 'East' | 'West' | 'South-East';
  sectorCode: string; // e.g. 'C-01', 'N-02'
  prominence: 'primary' | 'secondary';
  type: 'heritage-pete' | 'colonial-canton' | 'tech-corridor' | 'residential-agrahara' | 'transit-node';
}

export interface VectorRoad {
  id: string;
  name: string;
  type: 'ring-road' | 'expressway' | 'arterial-spine';
  coordinates: [number, number][];
  dashArray?: string;
  color: string;
  weight: number;
}

export interface VectorWaterBody {
  id: string;
  name: string;
  center: [number, number];
  coordinates: [number, number][]; // Polygon coordinates
}

export interface VectorGreenZone {
  id: string;
  name: string;
  center: [number, number];
  coordinates: [number, number][];
}

// ---------------- 1. COMPREHENSIVE BENGALURU AREAS & NEIGHBORHOODS ----------------
export const BENGALURU_AREAS: VectorArea[] = [
  // CENTRAL SECTOR
  {
    id: 'area-chickpet',
    name: 'Chickpet',
    kannadaName: 'ಚಿಕ್ಕಪೇಟೆ',
    coordinates: [12.9698, 77.5750],
    sector: 'Central',
    sectorCode: 'C-01',
    prominence: 'primary',
    type: 'heritage-pete'
  },
  {
    id: 'area-majestic',
    name: 'Majestic',
    kannadaName: 'ಮೆಜೆಸ್ಟಿಕ್',
    coordinates: [12.9778, 77.5725],
    sector: 'Central',
    sectorCode: 'C-02',
    prominence: 'primary',
    type: 'transit-node'
  },
  {
    id: 'area-cantonment',
    name: 'Cantonment',
    kannadaName: 'ದಂಡು ಪ್ರದೇಶ',
    coordinates: [12.9935, 77.5985],
    sector: 'Central',
    sectorCode: 'C-03',
    prominence: 'primary',
    type: 'colonial-canton'
  },
  {
    id: 'area-mg-road',
    name: 'MG Road',
    kannadaName: 'ಎಂ.ಜಿ. ರಸ್ತೆ',
    coordinates: [12.9754, 77.6066],
    sector: 'Central',
    sectorCode: 'C-04',
    prominence: 'primary',
    type: 'colonial-canton'
  },
  {
    id: 'area-shivajinagar',
    name: 'Shivajinagar',
    kannadaName: 'ಶಿವಾಜಿನಗರ',
    coordinates: [12.9850, 77.6040],
    sector: 'Central',
    sectorCode: 'C-05',
    prominence: 'secondary',
    type: 'heritage-pete'
  },
  {
    id: 'area-cubbon',
    name: 'Cubbon Park',
    kannadaName: 'ಕಬ್ಬನ್ ಪಾರ್ಕ್',
    coordinates: [12.9760, 77.5920],
    sector: 'Central',
    sectorCode: 'C-06',
    prominence: 'secondary',
    type: 'colonial-canton'
  },

  // NORTH SECTOR
  {
    id: 'area-malleswaram',
    name: 'Malleswaram',
    kannadaName: 'ಮಲ್ಲೇಶ್ವರಂ',
    coordinates: [13.0033, 77.5702],
    sector: 'North',
    sectorCode: 'N-01',
    prominence: 'primary',
    type: 'residential-agrahara'
  },
  {
    id: 'area-hebbal',
    name: 'Hebbal',
    kannadaName: 'ಹೆಬ್ಬಾಳ',
    coordinates: [13.0358, 77.5970],
    sector: 'North',
    sectorCode: 'N-02',
    prominence: 'primary',
    type: 'transit-node'
  },
  {
    id: 'area-yeshwanthpur',
    name: 'Yeshwanthpur',
    kannadaName: 'ಯಶವಂತಪುರ',
    coordinates: [13.0235, 77.5498],
    sector: 'North',
    sectorCode: 'N-03',
    prominence: 'primary',
    type: 'transit-node'
  },
  {
    id: 'area-manyata',
    name: 'Manyata',
    kannadaName: 'ಮಾನ್ಯತಾ ಟೆಕ್ ಪಾರ್ಕ್',
    coordinates: [13.0500, 77.6210],
    sector: 'North',
    sectorCode: 'N-04',
    prominence: 'primary',
    type: 'tech-corridor'
  },
  {
    id: 'area-yelahanka',
    name: 'Yelahanka',
    kannadaName: 'ಯಲಹಂಕ',
    coordinates: [13.1005, 77.5960],
    sector: 'North',
    sectorCode: 'N-05',
    prominence: 'secondary',
    type: 'residential-agrahara'
  },
  {
    id: 'area-peenya',
    name: 'Peenya',
    kannadaName: 'ಪೀಣ್ಯ',
    coordinates: [13.0380, 77.5200],
    sector: 'North',
    sectorCode: 'N-06',
    prominence: 'secondary',
    type: 'tech-corridor'
  },

  // SOUTH SECTOR
  {
    id: 'area-basavanagudi',
    name: 'Basavanagudi',
    kannadaName: 'ಬಸವನಗುಡಿ',
    coordinates: [12.9430, 77.5740],
    sector: 'South',
    sectorCode: 'S-01',
    prominence: 'primary',
    type: 'residential-agrahara'
  },
  {
    id: 'area-jayanagar',
    name: 'Jayanagar',
    kannadaName: 'ಜಯನಗರ',
    coordinates: [12.9300, 77.5830],
    sector: 'South',
    sectorCode: 'S-02',
    prominence: 'primary',
    type: 'residential-agrahara'
  },
  {
    id: 'area-jp-nagar',
    name: 'JP Nagar',
    kannadaName: 'ಜೆ.ಪಿ. ನಗರ',
    coordinates: [12.9080, 77.5850],
    sector: 'South',
    sectorCode: 'S-03',
    prominence: 'secondary',
    type: 'residential-agrahara'
  },
  {
    id: 'area-btm',
    name: 'BTM Layout',
    kannadaName: 'ಬಿ.ಟಿ.ಎಂ. ಬಡಾವಣೆ',
    coordinates: [12.9160, 77.6100],
    sector: 'South',
    sectorCode: 'S-04',
    prominence: 'secondary',
    type: 'residential-agrahara'
  },
  {
    id: 'area-banashankari',
    name: 'Banashankari',
    kannadaName: 'ಬನಶಂಕರಿ',
    coordinates: [12.9250, 77.5500],
    sector: 'South',
    sectorCode: 'S-05',
    prominence: 'secondary',
    type: 'residential-agrahara'
  },

  // EAST SECTOR
  {
    id: 'area-indiranagar',
    name: 'Indiranagar',
    kannadaName: 'ಇಂದಿರಾನಗರ',
    coordinates: [12.9719, 77.6412],
    sector: 'East',
    sectorCode: 'E-01',
    prominence: 'primary',
    type: 'residential-agrahara'
  },
  {
    id: 'area-koramangala',
    name: 'Koramangala',
    kannadaName: 'ಕೋರಮಂಗಲ',
    coordinates: [12.9352, 77.6245],
    sector: 'East',
    sectorCode: 'E-02',
    prominence: 'primary',
    type: 'tech-corridor'
  },
  {
    id: 'area-hsr',
    name: 'HSR Layout',
    kannadaName: 'ಎಚ್.ಎಸ್.ಆರ್. ಬಡಾವಣೆ',
    coordinates: [12.9120, 77.6440],
    sector: 'East',
    sectorCode: 'E-03',
    prominence: 'secondary',
    type: 'residential-agrahara'
  },
  {
    id: 'area-bellandur',
    name: 'Bellandur',
    kannadaName: 'ಬೆಳ್ಳಂದೂರು',
    coordinates: [12.9340, 77.6690],
    sector: 'East',
    sectorCode: 'E-04',
    prominence: 'primary',
    type: 'tech-corridor'
  },
  {
    id: 'area-marathahalli',
    name: 'Marathahalli',
    kannadaName: 'ಮಾರತ್ತಹಳ್ಳಿ',
    coordinates: [12.9560, 77.7010],
    sector: 'East',
    sectorCode: 'E-05',
    prominence: 'secondary',
    type: 'transit-node'
  },
  {
    id: 'area-whitefield',
    name: 'Whitefield',
    kannadaName: 'ವೈಟ್‌ಫೀಲ್ಡ್',
    coordinates: [12.9698, 77.7500],
    sector: 'East',
    sectorCode: 'E-06',
    prominence: 'primary',
    type: 'tech-corridor'
  },
  {
    id: 'area-ulsoor',
    name: 'Ulsoor',
    kannadaName: 'ಹಲಸೂರು',
    coordinates: [12.9818, 77.6252],
    sector: 'East',
    sectorCode: 'E-07',
    prominence: 'secondary',
    type: 'heritage-pete'
  },

  // SOUTH-EAST & HIGHWAY NODES
  {
    id: 'area-ecity',
    name: 'Electronic City',
    kannadaName: 'ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ',
    coordinates: [12.8450, 77.6650],
    sector: 'South-East',
    sectorCode: 'SE-01',
    prominence: 'primary',
    type: 'tech-corridor'
  },
  {
    id: 'area-silk-board',
    name: 'Silk Board',
    kannadaName: 'ಸಿಲ್ಕ್ ಬೋರ್ಡ್',
    coordinates: [12.9177, 77.6238],
    sector: 'South-East',
    sectorCode: 'SE-02',
    prominence: 'primary',
    type: 'transit-node'
  },
  {
    id: 'area-sarjapur-rd',
    name: 'Sarjapur Rd',
    kannadaName: 'ಸರ್ಜಾಪುರ ರಸ್ತೆ',
    coordinates: [12.9100, 77.6850],
    sector: 'South-East',
    sectorCode: 'SE-03',
    prominence: 'secondary',
    type: 'tech-corridor'
  },

  // WEST SECTOR
  {
    id: 'area-rajajinagar',
    name: 'Rajajinagar',
    kannadaName: 'ರಾಜಾಜಿನಗರ',
    coordinates: [12.9900, 77.5530],
    sector: 'West',
    sectorCode: 'W-01',
    prominence: 'secondary',
    type: 'residential-agrahara'
  },
  {
    id: 'area-kengeri',
    name: 'Kengeri',
    kannadaName: 'ಕೆಂಗೇರಿ',
    coordinates: [12.8980, 77.4850],
    sector: 'West',
    sectorCode: 'W-02',
    prominence: 'secondary',
    type: 'transit-node'
  }
];

// ---------------- 2. 2D VECTOR ARTERIAL ROAD NETWORK ----------------
export const BENGALURU_ROADS: VectorRoad[] = [
  // Outer Ring Road (ORR Loop)
  {
    id: 'road-orr',
    name: 'Outer Ring Road (ORR)',
    type: 'ring-road',
    dashArray: '8, 5',
    color: '#64748b',
    weight: 2.0,
    coordinates: [
      [13.0358, 77.5970], // Hebbal
      [13.0450, 77.6200], // Nagawara / Manyata
      [13.0200, 77.6480], // Kalyan Nagar
      [12.9980, 77.6650], // Kasturi Nagar / Tin Factory
      [13.0010, 77.6850], // KR Puram
      [12.9550, 77.7010], // Marathahalli
      [12.9280, 77.6780], // Bellandur ORR
      [12.9230, 77.6850], // Ecospace
      [12.9180, 77.6650], // Iblur
      [12.9160, 77.6480], // Agara / HSR
      [12.9177, 77.6238], // Silk Board
      [12.9140, 77.6080], // BTM
      [12.9165, 77.5980], // Jayadeva
      [12.9240, 77.5680], // Banashankari
      [12.9350, 77.5450], // Kathriguppe
      [12.9520, 77.5250], // Nayandahalli
      [12.9680, 77.5150], // Chandra Layout
      [13.0050, 77.5300], // Mahalakshmi
      [13.0280, 77.5350], // Goraguntepalya / Peenya
      [13.0358, 77.5970]  // Back to Hebbal (Closed Loop)
    ]
  },

  // NICE Peripheral Road Arc
  {
    id: 'road-nice',
    name: 'NICE Peripheral Expressway',
    type: 'expressway',
    dashArray: '10, 6',
    color: '#475569',
    weight: 2.2,
    coordinates: [
      [12.8450, 77.6580], // Electronic City interchange
      [12.8550, 77.5920], // Bannerghatta Rd
      [12.8680, 77.5380], // Kanakapura Rd
      [12.9050, 77.4850], // Mysore Rd / Kengeri
      [12.9750, 77.4650], // Magadi Rd
      [13.0480, 77.4720]  // Tumkur Rd (Madavara)
    ]
  },

  // North-South Airport Corridor (NH 44 Bellary Road)
  {
    id: 'road-bellary',
    name: 'NH 44 Bellary Road (Airport Corridor)',
    type: 'arterial-spine',
    color: '#475569',
    weight: 1.6,
    coordinates: [
      [12.9780, 77.5910], // Vidhana Soudha
      [13.0050, 77.5880], // Palace Grounds
      [13.0358, 77.5970], // Hebbal Flyover
      [13.0750, 77.5950], // Jakkur
      [13.1005, 77.5960]  // Yelahanka Bypass
    ]
  },

  // South-East Hosur Highway (Electronic City Elevated Expressway)
  {
    id: 'road-hosur',
    name: 'Hosur Road Expressway (NH 48)',
    type: 'arterial-spine',
    color: '#475569',
    weight: 1.8,
    coordinates: [
      [12.9177, 77.6238], // Silk Board
      [12.9030, 77.6320], // Bommanahalli
      [12.8750, 77.6450], // Kudlu Gate / Singasandra
      [12.8450, 77.6650]  // Electronic City Tollgate
    ]
  },

  // East Corridor (Old Airport Road -> Varthur / Whitefield)
  {
    id: 'road-airport-whitefield',
    name: 'Old Airport Road / Whitefield Corridor',
    type: 'arterial-spine',
    color: '#475569',
    weight: 1.6,
    coordinates: [
      [12.9754, 77.6066], // MG Road
      [12.9610, 77.6380], // Domlur Flyover
      [12.9550, 77.6680], // HAL Airport
      [12.9550, 77.7010], // Marathahalli
      [12.9698, 77.7500]  // Whitefield ITPL
    ]
  }
];

// ---------------- 3. 2D VECTOR LAKES & GREEN CANOPIES ----------------
export const BENGALURU_LAKES: VectorWaterBody[] = [
  {
    id: 'lake-bellandur',
    name: 'Bellandur Lake',
    center: [12.9340, 77.6690],
    coordinates: [
      [12.9370, 77.6580],
      [12.9420, 77.6720],
      [12.9320, 77.6850],
      [12.9250, 77.6740],
      [12.9300, 77.6620]
    ]
  },
  {
    id: 'lake-varthur',
    name: 'Varthur Lake',
    center: [12.9450, 77.7250],
    coordinates: [
      [12.9480, 77.7120],
      [12.9550, 77.7320],
      [12.9400, 77.7400],
      [12.9350, 77.7200]
    ]
  },
  {
    id: 'lake-ulsoor',
    name: 'Ulsoor Lake',
    center: [12.9825, 77.6250],
    coordinates: [
      [12.9860, 77.6220],
      [12.9870, 77.6270],
      [12.9790, 77.6280],
      [12.9780, 77.6230]
    ]
  },
  {
    id: 'lake-sankey',
    name: 'Sankey Tank',
    center: [13.0105, 77.5745],
    coordinates: [
      [13.0130, 77.5720],
      [13.0135, 77.5770],
      [13.0075, 77.5765],
      [13.0070, 77.5725]
    ]
  },
  {
    id: 'lake-hebbal',
    name: 'Hebbal Lake',
    center: [13.0400, 77.5920],
    coordinates: [
      [13.0450, 77.5850],
      [13.0470, 77.5960],
      [13.0370, 77.5980],
      [13.0340, 77.5880]
    ]
  }
];

export const BENGALURU_PARKS: VectorGreenZone[] = [
  {
    id: 'park-cubbon',
    name: 'Cubbon Park Grounds',
    center: [12.9760, 77.5920],
    coordinates: [
      [12.9810, 77.5890],
      [12.9820, 77.5960],
      [12.9710, 77.5970],
      [12.9700, 77.5880]
    ]
  },
  {
    id: 'park-lalbagh',
    name: 'Lalbagh Botanical Gardens',
    center: [12.9507, 77.5848],
    coordinates: [
      [12.9570, 77.5820],
      [12.9560, 77.5920],
      [12.9440, 77.5900],
      [12.9450, 77.5790]
    ]
  }
];

// ---------------- 4. 2D VECTOR SPECULATIVE ZONE BOUNDARY CALCULATOR ----------------
export interface VectorZoneRing {
  id: string;
  name: string;
  center: [number, number];
  radiusKm: number;
  category: 'human-only' | 'ai-recognised' | 'ai-surveillance' | 'off-grid';
  color: string;
  technicalLabel: string;
  statusText: string;
}

/**
 * Returns crisp 2D vector boundary rings for any timeline year (2026–2050)
 * Eliminates 3D bubble/dome gradients in favor of sharp 2D vector HUD geography.
 */
export function getActiveVectorZoneRings(year: number): VectorZoneRing[] {
  // Empty when opening at starting year 2026: no zone rings or epicenters seen
  if (year <= 2026) {
    return [];
  }

  const rings: VectorZoneRing[] = [];

  const getR = (r26: number, r30: number, r40: number, r50: number): number => {
    if (year <= 2026) return 0;
    if (year <= 2030) return (r30 * (year - 2026)) / 4;
    if (year <= 2040) return r30 + (r40 - r30) * ((year - 2030) / 10);
    return r40 + (r50 - r40) * ((year - 2040) / 10);
  };

  // 1. Human-Only Language Zones (Vector Desaturated Teal Rings)
  rings.push({
    id: 'vring-chickpet',
    name: 'Chickpet Pete Alleyways',
    center: [12.9698, 77.5750],
    radiusKm: getR(1.80, 2.70, 3.70, 4.60),
    category: 'human-only',
    color: '#2b998a',
    technicalLabel: `Chickpet · ${getR(1.80, 2.70, 3.70, 4.60).toFixed(1)}km`,
    statusText: 'AI Parsing Error: 99.1%'
  });

  rings.push({
    id: 'vring-russell',
    name: 'Russell Market Vaults',
    center: [12.9842, 77.6048],
    radiusKm: getR(0.90, 2.10, 3.10, 4.10),
    category: 'human-only',
    color: '#2b998a',
    technicalLabel: `Russell Market · ${getR(0.90, 2.10, 3.10, 4.10).toFixed(1)}km`,
    statusText: 'AI Parsing Error: 98.4%'
  });

  rings.push({
    id: 'vring-malleswaram',
    name: 'Malleswaram Steps',
    center: [13.0033, 77.5702],
    radiusKm: getR(0.80, 1.80, 2.65, 3.45),
    category: 'human-only',
    color: '#2b998a',
    technicalLabel: `Malleswaram · ${getR(0.80, 1.80, 2.65, 3.45).toFixed(1)}km`,
    statusText: 'Solkattu Metric Cipher'
  });

  rings.push({
    id: 'vring-basavanagudi',
    name: 'Basavanagudi Quarter',
    center: [12.9430, 77.5740],
    radiusKm: getR(0.80, 1.80, 2.65, 3.45),
    category: 'human-only',
    color: '#2b998a',
    technicalLabel: `Basavanagudi · ${getR(0.80, 1.80, 2.65, 3.45).toFixed(1)}km`,
    statusText: 'Old Mysore Literary Dialect'
  });

  if (year >= 2030) {
    rings.push({
      id: 'vring-ulsoor-h',
      name: 'Ulsoor Cistern Argot',
      center: [12.9818, 77.6252],
      radiusKm: getR(0.00, 1.10, 2.00, 2.80),
      category: 'human-only',
      color: '#2b998a',
      technicalLabel: `Ulsoor · ${getR(0.00, 1.10, 2.00, 2.80).toFixed(1)}km`,
      statusText: 'Sub-Spectral Acoustic Reflection'
    });
  }

  // 2. AI Corporate Tech SEZs (Vector Desaturated Steel Blue Rings)
  rings.push({
    id: 'vring-manyata',
    name: 'Manyata Tech Park SEZ',
    center: [13.0500, 77.6210],
    radiusKm: getR(2.00, 2.65, 3.50, 4.40),
    category: 'ai-recognised',
    color: '#487eb3',
    technicalLabel: `Manyata SEZ · ${getR(2.00, 2.65, 3.50, 4.40).toFixed(1)}km`,
    statusText: 'NLP Tracking: High'
  });

  rings.push({
    id: 'vring-bagmane',
    name: 'Bagmane Tech Park',
    center: [12.9780, 77.6620],
    radiusKm: getR(1.60, 2.15, 2.95, 3.75),
    category: 'ai-recognised',
    color: '#487eb3',
    technicalLabel: `Bagmane · ${getR(1.60, 2.15, 2.95, 3.75).toFixed(1)}km`,
    statusText: 'Standardized Corporate Corpus'
  });

  // 3. AI Surveillance Red Zones (Vector Desaturated Terracotta / Crimson Rings)
  rings.push({
    id: 'vring-whitefield',
    name: 'Whitefield ITPL Citadel',
    center: [12.9698, 77.7500],
    radiusKm: getR(2.20, 2.95, 3.90, 4.85),
    category: 'ai-surveillance',
    color: year >= 2044 ? '#b05831' : '#b84e47',
    technicalLabel: `Whitefield · ${getR(2.20, 2.95, 3.90, 4.85).toFixed(1)}km`,
    statusText: year >= 2044 ? 'Sensory Grid Fractured' : 'Acoustic Perimeter Lock'
  });

  rings.push({
    id: 'vring-ecity',
    name: 'Electronic City Data Fortress',
    center: [12.8450, 77.6650],
    radiusKm: getR(2.10, 2.85, 3.80, 4.70),
    category: 'ai-surveillance',
    color: year >= 2044 ? '#b05831' : '#b84e47',
    technicalLabel: `Electronic City · ${getR(2.10, 2.85, 3.80, 4.70).toFixed(1)}km`,
    statusText: year >= 2044 ? 'Sensory Grid Fractured' : 'Facial & Vocal Telemetry'
  });

  rings.push({
    id: 'vring-bellandur',
    name: 'Bellandur ORR Glass Corridor',
    center: [12.9340, 77.6690],
    radiusKm: getR(1.80, 2.40, 3.30, 4.10),
    category: 'ai-surveillance',
    color: year >= 2044 ? '#b05831' : '#b84e47',
    technicalLabel: `Bellandur · ${getR(1.80, 2.40, 3.30, 4.10).toFixed(1)}km`,
    statusText: 'Arterial Camera Grid'
  });

  // 4. Off-Grid Sanctuaries (Vector Desaturated Lavender/Purple Rings)
  rings.push({
    id: 'vring-offgrid-fort',
    name: 'Bangalore Fort Lithic Chamber',
    center: [12.9620, 77.5760],
    radiusKm: 1.1,
    category: 'off-grid',
    color: '#8572a8',
    technicalLabel: `Fort (Off-Grid) · 1.1km`,
    statusText: 'RF Attenuation 99.8%'
  });

  return rings;
}
