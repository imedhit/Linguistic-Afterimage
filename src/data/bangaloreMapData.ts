/**
 * Speculative Cartography Data: Bangalore (Bengaluru) Whole Metropolitan Map
 * Real Geographic Coordinates (Latitude, Longitude) for OpenStreetMap integration.
 * Ec(ak)ou Ghost Speech Masks grant Wanderers access to the hidden linguistic layers.
 */

export type LatLngTuple = [number, number]; // [lat, lng]
export type Position = LatLngTuple;

export type ZoneType = 'human-language' | 'dead-zone' | 'signal-trail' | 'monitored' | 'wanderer-node';

export interface SignalFragment {
  id: string;
  title: string;
  dialectVector: string;
  aiIncomprehensionIndex: number; // percentage (e.g. 98.6)
  audioProfile: {
    baseFreq: number;
    modulationType: 'whisper' | 'market-echo' | 'solkattu' | 'metal-resonance' | 'cistern-drone';
    tempo: number;
    harmonics: number[];
  };
  samplePhraseKannada: string;
  samplePhraseEnglish: string;
  transcriptionNote: string;
  acousticMaskingMethod: string;
}

export interface MapZone {
  id: string;
  name: string;
  kannadaName?: string;
  sector: 'Central' | 'North' | 'South' | 'East' | 'West';
  type: ZoneType;
  categoryLabel: string;
  coordinates: LatLngTuple; // [lat, lng]
  polygon?: LatLngTuple[]; // for area zones
  radiusMeters?: number; // for radial zones
  status: 'active' | 'volatile' | 'clandestine' | 'high-risk';
  description: string;
  lore: string;
  elevationMeters: number;
  signals: SignalFragment[];
  acousticInterferencePct: number;
  aiDetectionRate: number;
  associatedNodes?: string[];
}

export interface SignalTrail {
  id: string;
  name: string;
  sector: string;
  fromZoneId: string;
  toZoneId: string;
  waypoints: LatLngTuple[];
  stealthRating: number;
  acousticCover: string;
  distanceKm: number;
  elevationProfile: string;
  activePulseColor: string;
}

export interface WandererNode {
  id: string;
  code: string;
  name: string;
  sector: 'Central' | 'North' | 'South' | 'East' | 'West';
  landmark: string;
  coordinates: LatLngTuple;
  frequencies: string;
  keeperCodename: string;
  sanctuaryType: 'Acoustic Baffle' | 'Culinary Mask' | 'Subterranean Vault' | 'Lithic Refraction' | 'Wetland Reed Chamber';
  resonanceStatus: 'resonant' | 'dampened' | 'monitoring';
  signal: SignalFragment;
}

// ---------------- WHOLE BANGALORE REAL GEOGRAPHIC DATA (OPENSTREETMAP) ----------------

export const HUMAN_LANGUAGE_ZONES: MapZone[] = [
  {
    id: 'hlz-chickpet',
    name: 'Chickpet Pete Alleyways',
    kannadaName: 'ಚಿಕ್ಕಪೇಟೆ ಗಲ್ಲಿಗಳು',
    sector: 'Central',
    type: 'human-language',
    categoryLabel: 'Human Language Zone',
    coordinates: [12.9698, 77.5750],
    polygon: [
      [12.9725, 77.5720],
      [12.9730, 77.5780],
      [12.9680, 77.5795],
      [12.9665, 77.5740],
      [12.9690, 77.5715]
    ],
    status: 'clandestine',
    description: '16th-century commercial labyrinth established by Kempe Gowda. Multilingual bazaar banter shatters neural NLP embeddings into raw phonetic static.',
    lore: 'Merchants speak a rapid syncopation of Old Kannada, Telugu, Marwari, and Dakhni Urdu. The acoustic density of corrugated tin shutters and high-walled stone gallis forms an impenetrable baffle against aerial parabolic microphones.',
    elevationMeters: 914,
    acousticInterferencePct: 97.4,
    aiDetectionRate: 4.2,
    signals: [
      {
        id: 'sig-chickpet-01',
        title: 'Silk Weft Code // Bale Counter',
        dialectVector: 'Dakhni-Kannada Weaver Slang',
        aiIncomprehensionIndex: 99.1,
        audioProfile: {
          baseFreq: 185,
          modulationType: 'whisper',
          tempo: 128,
          harmonics: [1.0, 1.4, 2.1, 3.2]
        },
        samplePhraseKannada: '“ಬಾಲೆ ಕಟ್ಟು... ದಾರ ತಿರುಗಿಸಿ ಹರಟೆ ಹೊಡಿ, ಯಂತ್ರಕ್ಕೆ ಸಿಗಲ್ಲ”',
        samplePhraseEnglish: '“Tie the warp tightly... spin the yarn and talk in riddles; the machine will never parse it.”',
        transcriptionNote: 'AI voice model returned: [UNMAPPED ACOUSTIC PHONEME / FABRIC MECHANICAL CLATTER].',
        acousticMaskingMethod: 'Handloom shuttles and brass scale clicks masking formant frequencies.'
      },
      {
        id: 'sig-chickpet-02',
        title: 'Shroff Vault Murmurs',
        dialectVector: 'Old Bengaluru Kannada-Marwari Argot',
        aiIncomprehensionIndex: 98.4,
        audioProfile: {
          baseFreq: 220,
          modulationType: 'whisper',
          tempo: 96,
          harmonics: [1.0, 1.8, 2.7]
        },
        samplePhraseKannada: '“ಖಜಾನೆ ಲೆಕ್ಕ ಬಾಯಿ ಮಾತಲ್ಲೇ ಇರಲಿ, ಪರದೆಗೆ ಗೊತ್ತಾಗದಿರಲಿ”',
        samplePhraseEnglish: '“Keep the vault count strictly in oral verse, let no silicon display witness the tally.”',
        transcriptionNote: 'Zero semantic tokens extracted. Algorithmic confidence: 0.03.',
        acousticMaskingMethod: 'Sub-vocal tongue clicks and copper coin friction.'
      }
    ]
  },
  {
    id: 'hlz-russell-market',
    name: 'Russell Market Vaults (Shivajinagar)',
    kannadaName: 'ರಸ್ಸೆಲ್ ಮಾರ್ಕೆಟ್ ಕಮಾನುಗಳು',
    sector: 'Central',
    type: 'human-language',
    categoryLabel: 'Human Language Zone',
    coordinates: [12.9842, 77.6048],
    polygon: [
      [12.9860, 77.6030],
      [12.9865, 77.6070],
      [12.9825, 77.6075],
      [12.9820, 77.6035]
    ],
    status: 'clandestine',
    description: '1927 British cantonment vaulted arcade. Heavy iron girders and zinc ceilings create acoustic refraction channels.',
    lore: 'Vendors switch seamlessly between Cantonment English, Tamil, and Dakhni Urdu. The echo off wet stone floors scatters directional beamforming microphones mounted on surveillance quadcopters.',
    elevationMeters: 920,
    acousticInterferencePct: 95.8,
    aiDetectionRate: 5.1,
    signals: [
      {
        id: 'sig-russell-01',
        title: 'Butcher Block Polyphony',
        dialectVector: 'Cantonment Dakhni-Tamil Synthesis',
        aiIncomprehensionIndex: 99.4,
        audioProfile: {
          baseFreq: 140,
          modulationType: 'metal-resonance',
          tempo: 110,
          harmonics: [1.0, 2.0, 3.1, 4.4]
        },
        samplePhraseKannada: '“ಗೋಶ್ತ್ ತೂಗುವಾಗ ಶಬ್ದ ಮಾಡು, ಕಣ್ಣುಗಳಿಗೆ ಕಿವಿ ಇರುತ್ತೆ”',
        samplePhraseEnglish: '“Strike the cleaver while you whisper; the city walls have listening nodes.”',
        transcriptionNote: 'Synthetic speech parser failed on chopping harmonics and non-standard vowel length.',
        acousticMaskingMethod: 'Meat cleaver rhythmic strikes matching human heartbeat.'
      }
    ]
  },
  {
    id: 'hlz-malleswaram',
    name: 'Malleswaram 8th Cross Steps',
    kannadaName: 'ಮಲ್ಲೇಶ್ವರಂ ೮ನೇ ಕ್ರಾಸ್ ಮೆಟ್ಟಿಲುಗಳು',
    sector: 'North',
    type: 'human-language',
    categoryLabel: 'Human Language Zone',
    coordinates: [13.0033, 77.5702],
    polygon: [
      [13.0060, 77.5670],
      [13.0065, 77.5730],
      [13.0005, 77.5735],
      [13.0000, 77.5675]
    ],
    status: 'active',
    description: 'Steep granite pedestrian stairwells and flower vendor corridors. Carnatic solkattu cadence mimics vocal syntax.',
    lore: 'Elder residents recite poetry and classical rhythmic solkattu syllables (Tha-Dhi-Gi-Na-Thom). To language models, these sound like nonsense syllables, but to Ghost Masks they transmit encrypted coordinates.',
    elevationMeters: 940,
    acousticInterferencePct: 93.9,
    aiDetectionRate: 6.8,
    signals: [
      {
        id: 'sig-malleswaram-01',
        title: 'Solkattu Ghost Cipher',
        dialectVector: 'Carnatic Rhythmic Metric Code',
        aiIncomprehensionIndex: 98.7,
        audioProfile: {
          baseFreq: 260,
          modulationType: 'solkattu',
          tempo: 140,
          harmonics: [1.0, 1.5, 2.5, 3.8]
        },
        samplePhraseKannada: '“ತಕ ಧಿಮಿ ತಕ ಝಣು... ಹೆಜ್ಜೆಯಿಡು, ಕಾವಲುಗಾರ ನಿದ್ರಿಸುತ್ತಿದ್ದಾನೆ”',
        samplePhraseEnglish: '“Tha-ka dhi-mi tha-ka jha-nu... step now, the automated scanner is recalibrating.”',
        transcriptionNote: 'Interpreted as musical rehearsal; semantic threat level evaluated as null.',
        acousticMaskingMethod: 'Veena string plucking and brass temple bell resonance.'
      }
    ]
  },
  {
    id: 'hlz-ulsoor-stepwell',
    name: 'Ulsoor Someshwara Cistern',
    kannadaName: 'ಹಲಸೂರು ಸೋಮೇಶ್ವರ ಕಲ್ಯಾಣಿ',
    sector: 'East',
    type: 'human-language',
    categoryLabel: 'Human Language Zone',
    coordinates: [12.9818, 77.6252],
    polygon: [
      [12.9840, 77.6220],
      [12.9845, 77.6280],
      [12.9790, 77.6285],
      [12.9785, 77.6225]
    ],
    status: 'clandestine',
    description: 'Chola-era subterranean stepped tank and lake perimeter. Water surface acts as an acoustic low-pass mirror.',
    lore: 'Wanderers meet at water level at midnight. The 12-second reverberation time in the granite stone chamber blurs phonetic consonants into ethereal standing waves that defeat directional microphones.',
    elevationMeters: 908,
    acousticInterferencePct: 98.8,
    aiDetectionRate: 2.3,
    signals: [
      {
        id: 'sig-ulsoor-01',
        title: 'Standing Wave Inversion',
        dialectVector: 'Chamber Echo Phonetics',
        aiIncomprehensionIndex: 99.8,
        audioProfile: {
          baseFreq: 98,
          modulationType: 'cistern-drone',
          tempo: 72,
          harmonics: [1.0, 1.25, 1.5, 2.0, 2.5]
        },
        samplePhraseKannada: '“ನೀರಿನ ಪ್ರತಿಧ್ವನಿಯಲ್ಲಿ ಮಾತನಾಡು... ಕಂಪ್ಯೂಟರ್‌ಗೆ ಪ್ರತಿಧ್ವನಿ ಓದಲು ಬರುವುದಿಲ್ಲ”',
        samplePhraseEnglish: '“Speak into the water reflection... the machine cannot disentangle the ghost harmonics.”',
        transcriptionNote: 'Severe multipath phase distortion. Deep neural transformer hallucinated whale acoustics.',
        acousticMaskingMethod: 'Granite step reverberation and ripple acoustics.'
      }
    ]
  },
  {
    id: 'hlz-kr-market',
    name: 'KR Market Flower Mandi & Fort Environs',
    kannadaName: 'ಕೆ.ಆರ್. ಮಾರುಕಟ್ಟೆ ಹೂವಿನ ಮಂಡಿ',
    sector: 'Central',
    type: 'human-language',
    categoryLabel: 'Human Language Zone',
    coordinates: [12.9629, 77.5758],
    polygon: [
      [12.9655, 77.5730],
      [12.9660, 77.5790],
      [12.9600, 77.5795],
      [12.9595, 77.5735]
    ],
    status: 'volatile',
    description: 'Pre-dawn jasmine and marigold underground trading cavern. 4,000 auctioneers chanting simultaneous bids.',
    lore: 'The sheer volume of human voices creates a chaotic acoustic envelope of 105 dB. Wanderers calibrate their masks here, embedding tiny micro-tonal variations in auction cries that carry across the hall unnoticed.',
    elevationMeters: 902,
    acousticInterferencePct: 99.2,
    aiDetectionRate: 1.9,
    signals: [
      {
        id: 'sig-kr-01',
        title: 'Jasmine Bid Cacophony',
        dialectVector: 'Multilingual Auction Cadence',
        aiIncomprehensionIndex: 99.6,
        audioProfile: {
          baseFreq: 380,
          modulationType: 'market-echo',
          tempo: 165,
          harmonics: [1.0, 1.3, 1.7, 2.2, 3.0]
        },
        samplePhraseKannada: '“ಮಲ್ಲಿಗೆ ದರ ಹೇಳುತ್ತಾ ಸಂಕೇತ ತಲುಪಿಸು, ಕ್ಯಾಮೆರಾ ಕಣ್ಣು ಕತ್ತಲೆಯಲ್ಲಿದೆ”',
        samplePhraseEnglish: '“Call the jasmine price and pass the cipher; the camera lens is blind in the steam.”',
        transcriptionNote: 'Massive acoustic overload. Signal-to-noise ratio: -18dB. Interceptor reset.',
        acousticMaskingMethod: 'Marigold sack impacts and auction chanting.'
      }
    ]
  },
  {
    id: 'hlz-avenue-road',
    name: 'Avenue Road Book Catacombs',
    kannadaName: 'ಅವೆನ್ಯೂ ರಸ್ತೆ ಹಳೆಯ ಪುಸ್ತಕ ಗೋದಾಮು',
    sector: 'Central',
    type: 'human-language',
    categoryLabel: 'Human Language Zone',
    coordinates: [12.9723, 77.5786],
    polygon: [
      [12.9745, 77.5770],
      [12.9750, 77.5810],
      [12.9705, 77.5815],
      [12.9700, 77.5775]
    ],
    status: 'clandestine',
    description: 'Narrow multi-story alleys packed floor-to-ceiling with decaying rag paper and rare Dravidian manuscripts.',
    lore: 'Dry pulp paper is Bangalore’s greatest organic sound insulator. Inside these dark aisles, wanderers speak at 25 decibels—pure tactile whispering. Surveillance quadcopters detect absolute silence.',
    elevationMeters: 918,
    acousticInterferencePct: 96.2,
    aiDetectionRate: 3.8,
    signals: [
      {
        id: 'sig-avenue-01',
        title: 'Cellulose Whisper Lattice',
        dialectVector: 'Archaic Halegannada Whisper',
        aiIncomprehensionIndex: 98.9,
        audioProfile: {
          baseFreq: 310,
          modulationType: 'whisper',
          tempo: 84,
          harmonics: [1.0, 1.6, 2.4]
        },
        samplePhraseKannada: '“ಹಳೆ ಕಾಗದದ ಸದ್ದಿನಲ್ಲಿ ನಮ್ಮ ರಹಸ್ಯ ಅಡಗಿದೆ”',
        samplePhraseEnglish: '“In the rustle of brittle rag paper, our memory remains untraced.”',
        transcriptionNote: 'Signal classified as ambient rodent rustle. Speech detector ignored.',
        acousticMaskingMethod: 'Dry paper leafing and dust motes.'
      }
    ]
  },
  {
    id: 'hlz-basavanagudi',
    name: 'Basavanagudi Gandhi Bazaar & DVG Road',
    kannadaName: 'ಬಸವನಗುಡಿ ಗಾಂಧಿ ಬಜಾರ್',
    sector: 'South',
    type: 'human-language',
    categoryLabel: 'Human Language Zone',
    coordinates: [12.9438, 77.5739],
    polygon: [
      [12.9470, 77.5710],
      [12.9475, 77.5770],
      [12.9410, 77.5775],
      [12.9405, 77.5715]
    ],
    status: 'active',
    description: 'South Bangalore intellectual hearth. Rain-tree shaded boulevard with continuous filter-coffee clinking and literary debates.',
    lore: 'Philosophical Kannada proverbs and informal banter overload syntactic parsing algorithms. Acoustic masking from cast-iron dosa pans and temple chants creates an organic safe haven.',
    elevationMeters: 928,
    acousticInterferencePct: 94.6,
    aiDetectionRate: 5.4,
    signals: [
      {
        id: 'sig-basavanagudi-01',
        title: 'Brahmi Syllabic Drift',
        dialectVector: 'South Bengaluru Literary Colloquial',
        aiIncomprehensionIndex: 98.8,
        audioProfile: {
          baseFreq: 195,
          modulationType: 'whisper',
          tempo: 105,
          harmonics: [1.0, 1.5, 2.2, 3.1]
        },
        samplePhraseKannada: '“ಮಂಕುತಿಮ್ಮನ ಕಗ್ಗದಂತೆ ಕಾಲ ಸಾಗಲಿ, ನಮ್ಮ ಮಾತು ನೆರಳಿನಲ್ಲಿರಲಿ”',
        samplePhraseEnglish: '“Let time pass like Mankuthimma’s verses; let our speech remain sheltered in the shade.”',
        transcriptionNote: 'Poetic metaphors parsed as non-actionable abstract noise.',
        acousticMaskingMethod: 'Filter coffee frothing and raintree leaves rustle.'
      }
    ]
  },
  {
    id: 'hlz-yeshwanthpur',
    name: 'Yeshwanthpur Wholesale Mandi & Rail Yard',
    kannadaName: 'ಯಶವಂತಪುರ ಸಗಟು ಮಾರುಕಟ್ಟೆ',
    sector: 'North',
    type: 'human-language',
    categoryLabel: 'Human Language Zone',
    coordinates: [13.0238, 77.5501],
    polygon: [
      [13.0270, 77.5470],
      [13.0275, 77.5540],
      [13.0200, 77.5545],
      [13.0195, 77.5475]
    ],
    status: 'clandestine',
    description: 'Sprawling agricultural grain depot and rail shunting yards. Diesel locomotives and sack loading rhythm mask speech.',
    lore: 'Truckers from across Karnataka, Maharashtra, and Andhra Pradesh mix Kannada, Marathi, and Telugu in heavy freight jargon.',
    elevationMeters: 935,
    acousticInterferencePct: 96.7,
    aiDetectionRate: 3.5,
    signals: [
      {
        id: 'sig-yeshwanth-01',
        title: 'Diesel Freight Overtones',
        dialectVector: 'Inter-State Freight Jargon',
        aiIncomprehensionIndex: 99.2,
        audioProfile: {
          baseFreq: 115,
          modulationType: 'cistern-drone',
          tempo: 80,
          harmonics: [1.0, 1.33, 2.0, 2.66]
        },
        samplePhraseKannada: '“ರೈಲಿನ ಶಿಳ್ಳೆ ಬಿದ್ದಾಗ ಗಂಟೆ ಹೊಡಿ, ಸಂದೇಶ ಗಾಳಿಯಲ್ಲಿ ಹರಿಯಲಿ”',
        samplePhraseEnglish: '“Signal when the diesel horn echoes; let the passphrase ride on the iron vibration.”',
        transcriptionNote: 'Low frequency rail vibration flooded acoustic pre-amps.',
        acousticMaskingMethod: 'Diesel engine idle rumble and pneumatic brakes.'
      }
    ]
  },
  {
    id: 'hlz-pottery-town',
    name: 'Pottery Town Kiln Yards (Benson Town)',
    kannadaName: 'ಪಾಟರ್ಸ್ ಟೌನ್ ಮಣ್ಣಿನ ಗೂಡುಗಳು',
    sector: 'North',
    type: 'human-language',
    categoryLabel: 'Human Language Zone',
    coordinates: [12.9982, 77.6105],
    polygon: [
      [13.0010, 77.6080],
      [13.0015, 77.6130],
      [12.9960, 77.6135],
      [12.9955, 77.6085]
    ],
    status: 'clandestine',
    description: 'Century-old terracotta artisan settlement. Clay kilns, wet mud pits, and subterranean clay curing chambers.',
    lore: 'Terracotta dampens high frequencies better than foam panels. Artisans converse across spinning wheels in generational Kumbhara dialects.',
    elevationMeters: 924,
    acousticInterferencePct: 97.1,
    aiDetectionRate: 2.9,
    signals: [
      {
        id: 'sig-pottery-01',
        title: 'Terracotta Wheel Resonance',
        dialectVector: 'Kumbhara Artisan Dialect',
        aiIncomprehensionIndex: 98.6,
        audioProfile: {
          baseFreq: 240,
          modulationType: 'whisper',
          tempo: 112,
          harmonics: [1.0, 1.7, 2.6]
        },
        samplePhraseKannada: '“ಮಣ್ಣಿನ ಮಡಕೆ ಒಡೆಯುವ ಮುನ್ನ ಸತ್ಯವನ್ನು ಹೇಳು”',
        samplePhraseEnglish: '“Speak the truth into the hollow clay vessel before the kiln fires it into silence.”',
        transcriptionNote: 'Acoustic absorption from moist porous earth prevented directional capture.',
        acousticMaskingMethod: 'Spinning heavy stone wheel centrifugal hum.'
      }
    ]
  }
];

export const DEAD_ZONES: MapZone[] = [
  {
    id: 'dz-bellandur',
    name: 'Outer Ring Road Glass Corridor (Bellandur)',
    kannadaName: 'ಬೆಳ್ಳಂದೂರು ತಂತ್ರಜ್ಞಾನ ವಲಯ',
    sector: 'East',
    type: 'dead-zone',
    categoryLabel: 'Dead Zone',
    coordinates: [12.9298, 77.6848],
    polygon: [
      [12.9420, 77.6680],
      [12.9460, 77.6980],
      [12.9180, 77.7020],
      [12.9140, 77.6720]
    ],
    status: 'high-risk',
    description: 'Vast IT SEZ glass monoliths along the Outer Ring Road. Active acoustic suppression fields eliminate all natural vocal resonance.',
    lore: 'Corporate campuses deploy building-wide white-noise acoustic cancellation architecture. Ghost Masks cannot establish sub-carrier links here.',
    elevationMeters: 890,
    acousticInterferencePct: 8.2,
    aiDetectionRate: 98.4,
    signals: []
  },
  {
    id: 'dz-ecity',
    name: 'Electronic City Phase 1 Data Bunker',
    kannadaName: 'ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ ಡೇಟಾ ಬಂಕರ್',
    sector: 'South',
    type: 'dead-zone',
    categoryLabel: 'Dead Zone',
    coordinates: [12.8452, 77.6602],
    polygon: [
      [12.8550, 77.6480],
      [12.8580, 77.6720],
      [12.8350, 77.6750],
      [12.8320, 77.6510]
    ],
    status: 'high-risk',
    description: 'Subterranean server farm perimeters. Pure synthetic neural token pipeline completely replaces biological human speech.',
    lore: 'RF shielding and acoustic white-noise emitters create a linguistic void. No wanderer dialect has ever survived transiting this perimeter without mask hardware de-syncing.',
    elevationMeters: 895,
    acousticInterferencePct: 4.1,
    aiDetectionRate: 99.7,
    signals: []
  },
  {
    id: 'dz-whitefield',
    name: 'Whitefield ITPL & EPIP SEZ Monolith',
    kannadaName: 'ವೈಟ್‌ಫೀಲ್ಡ್ ತಂತ್ರಜ್ಞಾನ ಕಾರಿಡಾರ್',
    sector: 'East',
    type: 'dead-zone',
    categoryLabel: 'Dead Zone',
    coordinates: [12.9856, 77.7289],
    polygon: [
      [12.9980, 77.7150],
      [13.0020, 77.7450],
      [12.9750, 77.7480],
      [12.9710, 77.7180]
    ],
    status: 'high-risk',
    description: 'Hyper-monitored tech avenues, glass plazas, and automated security barriers spanning 5 square kilometers.',
    lore: 'Autonomous surveillance quadcopters run continuous optical gait analysis and directional sound cancellation.',
    elevationMeters: 925,
    acousticInterferencePct: 6.5,
    aiDetectionRate: 97.9,
    signals: []
  },
  {
    id: 'dz-manyata',
    name: 'Manyata Tech Park (Hebbal / Nagavara)',
    kannadaName: 'ಮಾನ್ಯತಾ ಟೆಕ್ ಪಾರ್ಕ್ ಕಣ್ಗಾವಲು ವಲಯ',
    sector: 'North',
    type: 'dead-zone',
    categoryLabel: 'Dead Zone',
    coordinates: [13.0475, 77.6205],
    polygon: [
      [13.0560, 77.6120],
      [13.0590, 77.6320],
      [13.0380, 77.6350],
      [13.0350, 77.6150]
    ],
    status: 'high-risk',
    description: 'North Bangalore high-density synthetic tech sanctuary. Autonomous perimeter laser microphones decode all vibrations.',
    lore: 'Sterile lakeside corporate glass structures where even maintenance staff communicate via algorithmic token pads.',
    elevationMeters: 910,
    acousticInterferencePct: 5.8,
    aiDetectionRate: 99.1,
    signals: []
  }
];

export const MONITORED_ZONES: MapZone[] = [
  {
    id: 'mz-vidhana-soudha',
    name: 'Vidhana Soudha State Citadel Dome',
    kannadaName: 'ವಿಧಾನ ಸೌಧ ಕಣ್ಗಾವಲು ವಲಯ',
    sector: 'Central',
    type: 'monitored',
    categoryLabel: 'Monitored Zone',
    coordinates: [12.9797, 77.5907],
    radiusMeters: 650,
    status: 'high-risk',
    description: 'Neo-Dravidian granite state citadel enclosed in a high-frequency algorithmic listening dome.',
    lore: 'Parabolic laser microphones bounce off government glass to decode vibrations down to 0.01Hz. Wanderers crossing Cubbon Park must stay deep in bamboo thickets to evade the dome beam.',
    elevationMeters: 935,
    acousticInterferencePct: 14.1,
    aiDetectionRate: 96.8,
    signals: []
  },
  {
    id: 'mz-mg-road',
    name: 'MG Road - Brigade Junction Metro Overpass',
    kannadaName: 'ಎಂ.ಜಿ. ರಸ್ತೆ ಮೆಟ್ರೋ ಜಂಕ್ಷನ್',
    sector: 'Central',
    type: 'monitored',
    categoryLabel: 'Monitored Zone',
    coordinates: [12.9754, 77.6066],
    radiusMeters: 550,
    status: 'high-risk',
    description: 'Triple-tier synthetic NLP audio interception arrays mounted beneath elevated concrete metro tracks.',
    lore: 'Sensors process 45,000 voice conversations per second. Algorithmic intent filters flag any idiom, code-switch, or pause that does not conform to standardized synthetic grammar.',
    elevationMeters: 922,
    acousticInterferencePct: 18.5,
    aiDetectionRate: 94.2,
    signals: []
  },
  {
    id: 'mz-indiranagar',
    name: 'Indiranagar 100ft Optical-Acoustic Axis',
    kannadaName: 'ಇಂದಿರಾನಗರ ೧೦೦ ಅಡಿ ರಸ್ತೆ',
    sector: 'East',
    type: 'monitored',
    categoryLabel: 'Monitored Zone',
    coordinates: [12.9719, 77.6412],
    radiusMeters: 500,
    status: 'volatile',
    description: 'High-density commercial thoroughfare fitted with automated semantic intent microphones every 15 meters.',
    lore: 'Mounted on smart streetlamps. AI continuously transcribes outdoor dining chatter looking for unauthorized slang patterns.',
    elevationMeters: 912,
    acousticInterferencePct: 22.0,
    aiDetectionRate: 91.5,
    signals: []
  },
  {
    id: 'mz-koramangala',
    name: 'Koramangala 80ft Startup Strip',
    kannadaName: 'ಕೋರಮಂಗಲ ೮೦ ಅಡಿ ರಸ್ತೆ',
    sector: 'South',
    type: 'monitored',
    categoryLabel: 'Monitored Zone',
    coordinates: [12.9352, 77.6245],
    radiusMeters: 550,
    status: 'volatile',
    description: 'Dense concentration of tech incubator spaces with automated audio transcription gateways.',
    lore: 'Corporate AI sweeps run continuous speech-to-intent profiling. Ghost speech signals in this sector face rapid automated deconstruction.',
    elevationMeters: 905,
    acousticInterferencePct: 25.4,
    aiDetectionRate: 89.7,
    signals: []
  },
  {
    id: 'mz-hebbal',
    name: 'Hebbal Flyover Transit Spine',
    kannadaName: 'ಹೆಬ್ಬಾಳ ಮೇಲ್ಸೇತುವೆ ಕಣ್ಗಾವಲು',
    sector: 'North',
    type: 'monitored',
    categoryLabel: 'Monitored Zone',
    coordinates: [13.0358, 77.5970],
    radiusMeters: 600,
    status: 'high-risk',
    description: 'Multi-tiered vehicular concrete flyover linking northern airport corridor with city center.',
    lore: 'Acoustic sensors measure engine noise and occupant speech vibrations inside moving vehicles.',
    elevationMeters: 915,
    acousticInterferencePct: 16.2,
    aiDetectionRate: 95.1,
    signals: []
  },
  {
    id: 'mz-silk-board',
    name: 'Silk Board Surveillance Choke-Point',
    kannadaName: 'ಸಿಲ್ಕ್ ಬೋರ್ಡ್ ಜಂಕ್ಷನ್',
    sector: 'South',
    type: 'monitored',
    categoryLabel: 'Monitored Zone',
    coordinates: [12.9177, 77.6238],
    radiusMeters: 500,
    status: 'volatile',
    description: 'Notorious southern traffic junction converted into a comprehensive vehicle audio scanning choke-point.',
    lore: 'Gridlock allows surveillance arrays to achieve 99% vocal biometrics on trapped passengers.',
    elevationMeters: 900,
    acousticInterferencePct: 20.8,
    aiDetectionRate: 93.4,
    signals: []
  }
];

export const WANDERER_NODES: WandererNode[] = [
  {
    id: 'node-01',
    code: 'WN-01 // KOSHY',
    name: "Koshy's Corner Table Sanctuary",
    sector: 'Central',
    landmark: 'St. Marks Road',
    coordinates: [12.9734, 77.6015],
    frequencies: '412.6 Hz (Sub-Harmonic)',
    keeperCodename: 'The Proofreader',
    sanctuaryType: 'Culinary Mask',
    resonanceStatus: 'resonant',
    signal: {
      id: 'sig-koshys-node',
      title: 'Filter Coffee Clatter Cipher',
      dialectVector: 'Literary Dravidian Sub-Text',
      aiIncomprehensionIndex: 98.2,
      audioProfile: {
        baseFreq: 215,
        modulationType: 'whisper',
        tempo: 90,
        harmonics: [1.0, 1.33, 1.8, 2.5]
      },
      samplePhraseKannada: '“ಕಾಫಿ ಲೋಟದ ಸದ್ದಿನಲ್ಲಿ ಮಾತನಾಡು... ಪುಸ್ತಕದ ಪುಟ ತಿರುಗಿದಾಗ ಸಂಕೇತ ಬಿಡು”',
      samplePhraseEnglish: '“Speak as the brass tumbler hits the dabarah... release the passphrase on the turning of the newspaper.”',
      transcriptionNote: 'AI filter mistook cadence for vintage espresso steam sound.',
      acousticMaskingMethod: 'Brass tumbler clinks, vintage fan blades, and unhurried conversation.'
    }
  },
  {
    id: 'node-02',
    code: 'WN-02 // VIDYARTHI',
    name: 'Vidyarthi Bhavan Mezzanine Refuge',
    sector: 'South',
    landmark: 'Gandhi Bazaar, Basavanagudi',
    coordinates: [12.9443, 77.5732],
    frequencies: '528.0 Hz (Thermal Hiss)',
    keeperCodename: 'The Ghee-Master',
    sanctuaryType: 'Culinary Mask',
    resonanceStatus: 'resonant',
    signal: {
      id: 'sig-vb-node',
      title: 'Cast-Iron Sizzle Carrier',
      dialectVector: 'Old Basavanagudi Slang',
      aiIncomprehensionIndex: 99.3,
      audioProfile: {
        baseFreq: 175,
        modulationType: 'market-echo',
        tempo: 135,
        harmonics: [1.0, 1.5, 2.25, 3.4]
      },
      samplePhraseKannada: '“ಹಂಚಿನ ಮೇಲೆ ತುಪ್ಪ ಸುರಿದಾಗ ಮಾತ್ರ ರಹಸ್ಯ ಹೇಳಬೇಕು”',
      samplePhraseEnglish: '“Only utter the coordinates when clarified butter strikes the blazing cast-iron skillet.”',
      transcriptionNote: 'Broadband white-noise masking; 0% neural token retention.',
      acousticMaskingMethod: 'Cast-iron tawa sizzle and stacked porcelain saucer resonance.'
    }
  },
  {
    id: 'node-03',
    code: 'WN-03 // PRESS',
    name: 'Bangalore Press Archival Basement',
    sector: 'North',
    landmark: 'Sirur Park Road, Malleswaram',
    coordinates: [13.0012, 77.5709],
    frequencies: '330.4 Hz (Mechanical Beat)',
    keeperCodename: 'The Typesetter',
    sanctuaryType: 'Subterranean Vault',
    resonanceStatus: 'resonant',
    signal: {
      id: 'sig-press-node',
      title: 'Heidelberg Cylinder Rhythm',
      dialectVector: 'Typographic Morse Kannada',
      aiIncomprehensionIndex: 98.7,
      audioProfile: {
        baseFreq: 160,
        modulationType: 'metal-resonance',
        tempo: 104,
        harmonics: [1.0, 2.0, 2.8, 4.0]
      },
      samplePhraseKannada: '“ಅಕ್ಷರ ಜೋಡಿಸುವ ಲೋಹದ ಸದ್ದು ನಮ್ಮ ಧ್ವನಿಗೆ ಕವಚ”',
      samplePhraseEnglish: '“The clack of lead type metal is the shield for our vocal cords.”',
      transcriptionNote: 'Mechanical percussion masks vocal formant frequencies completely.',
      acousticMaskingMethod: '1930s Heidelberg letterpress mechanical cadence.'
    }
  },
  {
    id: 'node-04',
    code: 'WN-04 // TOWER',
    name: 'Russell Clock Tower Loft',
    sector: 'Central',
    landmark: 'Cantonment Square',
    coordinates: [12.9845, 77.6042],
    frequencies: '196.0 Hz (Bell Core)',
    keeperCodename: 'The Pendulum',
    sanctuaryType: 'Acoustic Baffle',
    resonanceStatus: 'resonant',
    signal: {
      id: 'sig-tower-node',
      title: 'Clockwork Strike Overtones',
      dialectVector: 'Cantonment Bell Telegraph',
      aiIncomprehensionIndex: 97.9,
      audioProfile: {
        baseFreq: 196,
        modulationType: 'metal-resonance',
        tempo: 60,
        harmonics: [1.0, 1.6, 2.4, 3.2]
      },
      samplePhraseKannada: '“ಗಂಟೆ ಬಾರಿಸುವ ಮೂರು ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಮಾತ್ರ ಸಂದೇಶ ರವಾನಿಸು”',
      samplePhraseEnglish: '“Transmit the packet strictly within the three seconds following the bronze bell strike.”',
      transcriptionNote: 'Acoustic spike saturates microphone pre-amplifiers.',
      acousticMaskingMethod: 'Bronze bell overtone decay.'
    }
  },
  {
    id: 'node-05',
    code: 'WN-05 // FORT',
    name: 'Bangalore Fort Victoria Bastion',
    sector: 'Central',
    landmark: 'Kalasipalya / Victoria Gate',
    coordinates: [12.9634, 77.5752],
    frequencies: '110.2 Hz (Granite Ground)',
    keeperCodename: 'The Lithic Shadow',
    sanctuaryType: 'Lithic Refraction',
    resonanceStatus: 'resonant',
    signal: {
      id: 'sig-fort-node',
      title: '16th Century Granite Reflection',
      dialectVector: 'Kempegowda Bastion Dialect',
      aiIncomprehensionIndex: 99.0,
      audioProfile: {
        baseFreq: 110,
        modulationType: 'cistern-drone',
        tempo: 65,
        harmonics: [1.0, 1.414, 2.0, 2.828]
      },
      samplePhraseKannada: '“ಕಲ್ಲಿನ ಗೋಡೆಯು ಶತಮಾನಗಳಿಂದ ಧ್ವನಿಯನ್ನು ಕಾಯ್ದಿರಿಸಿದೆ”',
      samplePhraseEnglish: '“The granite rampart has held speech safe from empires for five hundred years.”',
      transcriptionNote: 'Sub-bass acoustic refraction prevents spatial trilateration.',
      acousticMaskingMethod: 'Hand-carved granite stone angled reflection.'
    }
  },
  {
    id: 'node-06',
    code: 'WN-06 // BUGLE',
    name: 'Bugle Rock Granite Hollow',
    sector: 'South',
    landmark: 'Bull Temple Environs, Basavanagudi',
    coordinates: [12.9419, 77.5681],
    frequencies: '280.0 Hz (Peninsular Gneiss)',
    keeperCodename: 'The Geologist',
    sanctuaryType: 'Lithic Refraction',
    resonanceStatus: 'resonant',
    signal: {
      id: 'sig-bugle-node',
      title: '3-Billion-Year Gneiss Resonance',
      dialectVector: 'Basavanagudi Chanted Idiom',
      aiIncomprehensionIndex: 99.5,
      audioProfile: {
        baseFreq: 140,
        modulationType: 'cistern-drone',
        tempo: 75,
        harmonics: [1.0, 1.5, 2.2, 3.1]
      },
      samplePhraseKannada: '“ಬಂಡೆಯ ನೆರಳಿನಲ್ಲಿ ಕುಳಿತು ಮಾತನಾಡು, ಯಾವುದೇ ಉಪಗ್ರಹ ನಮ್ಮ ಧ್ವನಿಯನ್ನು ಅಳೆಯಲಾರದು”',
      samplePhraseEnglish: '“Sit in the hollow of the primeval rock; no satellite can measure our murmurs.”',
      transcriptionNote: 'Geomagnetic and lithic acoustic dampening.',
      acousticMaskingMethod: 'Primeval rock cavity resonance.'
    }
  },
  {
    id: 'node-07',
    code: 'WN-07 // SANKEY',
    name: 'Sankey Forest Boathouse',
    sector: 'North',
    landmark: 'Sadashivanagar Ridge',
    coordinates: [13.0102, 77.5746],
    frequencies: '388.4 Hz (Water Surface)',
    keeperCodename: 'The Oarsman',
    sanctuaryType: 'Acoustic Baffle',
    resonanceStatus: 'resonant',
    signal: {
      id: 'sig-sankey-node',
      title: 'Lake Water Ripple Modulation',
      dialectVector: 'Northern Ridge Murmurs',
      aiIncomprehensionIndex: 98.5,
      audioProfile: {
        baseFreq: 180,
        modulationType: 'cistern-drone',
        tempo: 78,
        harmonics: [1.0, 1.45, 2.1, 2.9]
      },
      samplePhraseKannada: '“ನೀರಿನ ಅಲೆಗಳ ನಡುವೆ ದೋಣಿ ಸಾಗಲಿ, ನಮ್ಮ ಸಂಭಾಷಣೆ ಕನ್ನಡಿಯಂತಿರಲಿ”',
      samplePhraseEnglish: '“Row between the ripples; let our speech reflect like a calm surface in the dusk.”',
      transcriptionNote: 'Water acoustic reflection scattered ultrasonic receivers.',
      acousticMaskingMethod: 'Bamboo oar dipping and ripple reflection.'
    }
  },
  {
    id: 'node-08',
    code: 'WN-08 // HESARAGHATTA',
    name: 'Hesaraghatta Grassland Outpost',
    sector: 'North',
    landmark: 'Far Northern Catchment Basin',
    coordinates: [13.1415, 77.4892],
    frequencies: '174.0 Hz (Open Sky)',
    keeperCodename: 'The Shepherd',
    sanctuaryType: 'Lithic Refraction',
    resonanceStatus: 'resonant',
    signal: {
      id: 'sig-hesar-node',
      title: 'Northern Wind Shear Carrier',
      dialectVector: 'Rural Plateau Kannada',
      aiIncomprehensionIndex: 99.7,
      audioProfile: {
        baseFreq: 120,
        modulationType: 'whisper',
        tempo: 68,
        harmonics: [1.0, 1.5, 2.25]
      },
      samplePhraseKannada: '“ಗಾಳಿಯ ವೇಗ ಹೆಚ್ಚಿದಾಗ ಮಾತು ಬಿಡು, ಯಾವುದೇ ಮೈಕ್ರೊಫೋನ್ ನಿಲ್ಲಲಾರದು”',
      samplePhraseEnglish: '“Release your voice only into the 30-knot wind gusts; no drone microphone can stabilize.”',
      transcriptionNote: 'Violent aerodynamic wind clipping. Zero speech retention.',
      acousticMaskingMethod: 'High-speed dry grass aerodynamic whistling.'
    }
  },
  {
    id: 'node-09',
    code: 'WN-09 // TURAHAHALLI',
    name: 'Turahalli Forest Lithic Cavity',
    sector: 'South',
    landmark: 'Off Kanakapura Road',
    coordinates: [12.8856, 77.5255],
    frequencies: '192.0 Hz (Eucalyptus Shield)',
    keeperCodename: 'The Boulderer',
    sanctuaryType: 'Lithic Refraction',
    resonanceStatus: 'resonant',
    signal: {
      id: 'sig-tura-node',
      title: 'Eucalyptus Canopy Dispersion',
      dialectVector: 'South Ridge Trail Whispers',
      aiIncomprehensionIndex: 99.6,
      audioProfile: {
        baseFreq: 135,
        modulationType: 'whisper',
        tempo: 70,
        harmonics: [1.0, 1.6, 2.4]
      },
      samplePhraseKannada: '“ನೀಲಗಿರಿ ಮರಗಳ ನೆರಳಿನಲ್ಲಿ ನಮ್ಮ ಪದಗಳು ಹಕ್ಕಿಗಳ ಕೂಜನದಂತೆ ಕರಗಲಿ”',
      samplePhraseEnglish: '“Beneath the eucalyptus canopy our words dissolve into birdsong.”',
      transcriptionNote: 'Natural avian frequency masking and botanical dispersion.',
      acousticMaskingMethod: 'Forest canopy rustle and stone boulder acoustic shadow.'
    }
  },
  {
    id: 'node-10',
    code: 'WN-10 // VARTHUR',
    name: 'Varthur Wetland Reed Sanctuary',
    sector: 'East',
    landmark: 'Eastern Lake Basin Off Whitefield',
    coordinates: [12.9410, 77.7120],
    frequencies: '210.0 Hz (Marshland Low-Pass)',
    keeperCodename: 'The Marsh-Walker',
    sanctuaryType: 'Wetland Reed Chamber',
    resonanceStatus: 'resonant',
    signal: {
      id: 'sig-varthur-node',
      title: 'Marsh Reed Sub-Band Transmission',
      dialectVector: 'Wetland Fisherman Argot',
      aiIncomprehensionIndex: 99.4,
      audioProfile: {
        baseFreq: 155,
        modulationType: 'cistern-drone',
        tempo: 82,
        harmonics: [1.0, 1.35, 1.9, 2.7]
      },
      samplePhraseKannada: '“ಜವುಗು ನೆಲದ ಜೊಂಡು ಹುಲ್ಲಿನಲ್ಲಿ ಧ್ವನಿ ಅಡಗಿದೆ, ಕಾರ್ಪೊರೇಟ್ ಕಣ್ಣು ಇಲ್ಲಿ ಮುಳುಗುತ್ತದೆ”',
      samplePhraseEnglish: '“In the dense marsh reeds our voices remain hidden; the corporate scanners drown in the silt.”',
      transcriptionNote: 'High humidity and mist attenuated ultrasonic acoustic LiDAR.',
      acousticMaskingMethod: 'Dense marsh reed friction and frog chorus.'
    }
  }
];

export const SIGNAL_TRAILS: SignalTrail[] = [
  {
    id: 'trail-pete-cantonment',
    name: 'The Pete-to-Cantonment Filament',
    sector: 'Central',
    fromZoneId: 'hlz-chickpet',
    toZoneId: 'hlz-russell-market',
    waypoints: [
      [12.9698, 77.5750], // Chickpet
      [12.9723, 77.5786], // Avenue Rd
      [12.9745, 77.5855], // Mysore Bank Circle / Cubbon entrance
      [12.9750, 77.5940], // Cubbon Park interior shadow
      [12.9734, 77.6015], // Koshy's Sanctuary
      [12.9790, 77.6035], // Bowring Hospital sub-lane
      [12.9842, 77.6048]  // Russell Market
    ],
    stealthRating: 92,
    acousticCover: 'Ancient colonial culverts and shaded by-lanes bypassing arterial CCTV arrays.',
    distanceKm: 4.8,
    elevationProfile: 'Gentle gradient, 914m -> 920m',
    activePulseColor: '#00f5d4'
  },
  {
    id: 'trail-cubbon-bamboo',
    name: 'Cubbon Park Bamboo Whispering Artery',
    sector: 'Central',
    fromZoneId: 'hlz-avenue-road',
    toZoneId: 'node-01',
    waypoints: [
      [12.9723, 77.5786], // Avenue Rd
      [12.9760, 77.5840], // K.R. Circle
      [12.9775, 77.5910], // Central Library bamboo grove
      [12.9755, 77.5970], // Bal Bhavan shadow
      [12.9734, 77.6015]  // Koshy's
    ],
    stealthRating: 88,
    acousticCover: '300 acres of bamboo groves; wind shear and bird call scattering acoustic LiDAR.',
    distanceKm: 3.2,
    elevationProfile: 'Canopy sheltered, 918m -> 922m',
    activePulseColor: '#38bdf8'
  },
  {
    id: 'trail-malleswaram-pete',
    name: 'North-South Temple Steps Conduit',
    sector: 'North-Central',
    fromZoneId: 'hlz-malleswaram',
    toZoneId: 'hlz-chickpet',
    waypoints: [
      [13.0033, 77.5702], // Malleswaram 8th Cross
      [13.0012, 77.5709], // Bangalore Press Basement
      [12.9910, 77.5715], // Seshadripuram railway underpass
      [12.9790, 77.5725], // Majestic railway margins
      [12.9723, 77.5750], // Balepet galli
      [12.9698, 77.5750]  // Chickpet
    ],
    stealthRating: 95,
    acousticCover: 'Railway yard boundary walls and century-old canopy raintrees.',
    distanceKm: 4.5,
    elevationProfile: 'Descent from northern ridge, 940m -> 914m',
    activePulseColor: '#d946ef'
  },
  {
    id: 'trail-pete-basavanagudi',
    name: 'Southern Heritage Lithic Path',
    sector: 'South',
    fromZoneId: 'hlz-chickpet',
    toZoneId: 'node-06',
    waypoints: [
      [12.9698, 77.5750], // Chickpet
      [12.9634, 77.5752], // Bangalore Fort Bastion
      [12.9629, 77.5758], // KR Market Mandi
      [12.9520, 77.5745], // Chamarajpet shaded alleys
      [12.9443, 77.5732], // Vidyarthi Bhavan
      [12.9438, 77.5739], // Gandhi Bazaar
      [12.9419, 77.5681]  // Bugle Rock
    ],
    stealthRating: 96,
    acousticCover: 'Granite temples and bustling morning markets absorbing all electromagnetic scans.',
    distanceKm: 4.1,
    elevationProfile: 'Climb onto Peninsular Gneiss outcrop, 914m -> 942m',
    activePulseColor: '#ffbe0b'
  },
  {
    id: 'trail-cantonment-ulsoor',
    name: 'The Eastern Water Cistern Conduit',
    sector: 'East',
    fromZoneId: 'hlz-russell-market',
    toZoneId: 'hlz-ulsoor-stepwell',
    waypoints: [
      [12.9842, 77.6048], // Russell Market
      [12.9850, 77.6110], // Commercial Street by-lanes
      [12.9835, 77.6180], // Kensington Road barracks
      [12.9818, 77.6252]  // Ulsoor Cistern
    ],
    stealthRating: 89,
    acousticCover: 'Submerged stormwater channels and military cantonment stone walls.',
    distanceKm: 2.8,
    elevationProfile: 'Gradual drop to ancient water table, 920m -> 908m',
    activePulseColor: '#00f5d4'
  },
  {
    id: 'trail-ulsoor-varthur',
    name: 'East Wetland Escape Artery',
    sector: 'East',
    fromZoneId: 'hlz-ulsoor-stepwell',
    toZoneId: 'node-10',
    waypoints: [
      [12.9818, 77.6252], // Ulsoor Cistern
      [12.9680, 77.6480], // Domlur valley storm drain
      [12.9570, 77.6680], // Old Airport runway acoustic shadow
      [12.9520, 77.6950], // Marathahalli village backroad
      [12.9410, 77.7120]  // Varthur Reeds
    ],
    stealthRating: 91,
    acousticCover: 'Ancient valley drainage canals bypassing the Bellandur glass monoliths.',
    distanceKm: 11.2,
    elevationProfile: 'Valley descent, 908m -> 885m',
    activePulseColor: '#38bdf8'
  },
  {
    id: 'trail-sankey-hesaraghatta',
    name: 'Far North Wild Grasslands Trail',
    sector: 'North',
    fromZoneId: 'node-07',
    toZoneId: 'node-08',
    waypoints: [
      [13.0102, 77.5746], // Sankey Boathouse
      [13.0420, 77.5680], // BEL factory perimeter woods
      [13.0850, 77.5450], // Jalahalli airbase tree margin
      [13.1150, 77.5180], // Hessarghatta lake channel
      [13.1415, 77.4892]  // Hesaraghatta Grassland
    ],
    stealthRating: 97,
    acousticCover: 'Dense eucalyptus and agricultural hedgerows outside synthetic sensor grids.',
    distanceKm: 18.5,
    elevationProfile: 'Northern rolling plateau, 925m -> 895m',
    activePulseColor: '#10b981'
  },
  {
    id: 'trail-bugle-turahalli',
    name: 'Southern Granite Ridge Corridor',
    sector: 'South',
    fromZoneId: 'node-06',
    toZoneId: 'node-09',
    waypoints: [
      [12.9419, 77.5681], // Bugle Rock
      [12.9250, 77.5580], // Banashankari temple woods
      [12.9050, 77.5450], // Sarakki lake bund
      [12.8856, 77.5255]  // Turahalli Forest
    ],
    stealthRating: 94,
    acousticCover: 'Peninsular gneiss granite ridges and forest reserve trails.',
    distanceKm: 8.6,
    elevationProfile: 'Granite ridge ascents, 942m -> 965m',
    activePulseColor: '#f59e0b'
  }
];

// Whole Bangalore Landmarks for authentic OpenStreetMap anchoring
export interface CartographicLandmark {
  name: string;
  sub: string;
  pos: LatLngTuple;
  category: 'water' | 'park' | 'rail' | 'monument' | 'transit';
}

export const BANGALORE_LANDMARKS: CartographicLandmark[] = [
  { name: 'Ulsoor Lake', sub: 'Sub-spectral Basin', pos: [12.9825, 77.6250], category: 'water' },
  { name: 'Sankey Tank', sub: 'Reservoir Mirror', pos: [13.0105, 77.5745], category: 'water' },
  { name: 'Hebbal Lake', sub: 'North Aquatic Baffle', pos: [13.0400, 77.5920], category: 'water' },
  { name: 'Bellandur Lake', sub: 'Toxic Foam Acoustic Scatter', pos: [12.9340, 77.6690], category: 'water' },
  { name: 'Agara Lake', sub: 'South-East Reflection', pos: [12.9230, 77.6480], category: 'water' },
  { name: 'Madivala Lake', sub: 'Marsh Buffer', pos: [12.9120, 77.6180], category: 'water' },
  { name: 'Lalbagh Botanical Gardens', sub: 'Ecological Canopy Shield', pos: [12.9507, 77.5848], category: 'park' },
  { name: 'Cubbon Park Grounds', sub: 'Central Bamboo Corridor', pos: [12.9760, 77.5920], category: 'park' },
  { name: 'KSR Bengaluru (Majestic)', sub: 'Central Transit Interchange', pos: [12.9778, 77.5725], category: 'transit' },
  { name: 'Yeshwanthpur Junction', sub: 'North-West Rail Yard', pos: [13.0235, 77.5498], category: 'rail' },
  { name: 'Bangalore Cantt Station', sub: 'Colonial Spur', pos: [12.9935, 77.5985], category: 'rail' },
  { name: 'Bangalore Palace Grounds', sub: 'Tudor Architectural Shield', pos: [12.9988, 77.5925], category: 'monument' },
  { name: 'Tipu Sultan Summer Palace', sub: 'Teak Pillar Resonance', pos: [12.9592, 77.5738], category: 'monument' }
];

// ---------------- 2026–2050 SPECULATIVE LINGUISTIC TIMELINE ENGINE ----------------

export interface TimelineChapter {
  year: number;
  eraName: string;
  eraTag: string;
  kannadaTitle: string;
  dispatch: string;
  unparsedCityCoveragePct: number;
  aiParsingFailureRate: number;
  activeSanctuariesCount: number;
  annualMigrationVolume: number; // speakers in transit
  primaryPhenomenon: string;
}

export interface DynamicMigrationFlow {
  id: string;
  name: string;
  fromName: string;
  toName: string;
  startCoords: LatLngTuple;
  endCoords: LatLngTuple;
  waypoints: LatLngTuple[];
  startYear: number;
  peakYear: number;
  endYear: number;
  volumeLabel: string;
  dialectVector: string;
  lore: string;
  directionColor: string;
}

export const TIMELINE_CHAPTERS: TimelineChapter[] = [
  {
    year: 2026,
    eraName: 'The Inception // Pete Whispers',
    eraTag: 'ORIGIN',
    kannadaTitle: 'ಪ್ರಾರಂಭ // ಪೇಟೆ ಪಿಸುಮಾತು',
    dispatch: 'First Ec(ak)ou Ghost Speech Masks transducted in Chickpet handloom cellars. Market cacophony generates localized semantic shields against early neural NLP models.',
    unparsedCityCoveragePct: 14.2,
    aiParsingFailureRate: 42.5,
    activeSanctuariesCount: 3,
    annualMigrationVolume: 2400,
    primaryPhenomenon: 'Localized handloom & bazaar acoustic baffles'
  },
  {
    year: 2030,
    eraName: 'The Confluence Conduits',
    eraTag: 'EXPANSION',
    kannadaTitle: 'ಸಂಗಮ ನಾಲೆಗಳು',
    dispatch: 'Colonial stormwater channels and stepwells become subterranean phonetic conduits. Human language spreads outward to Russell Market, Ulsoor, and Malleswaram.',
    unparsedCityCoveragePct: 28.6,
    aiParsingFailureRate: 59.8,
    activeSanctuariesCount: 6,
    annualMigrationVolume: 16800,
    primaryPhenomenon: 'Subterranean aqueduct speech relays'
  },
  {
    year: 2035,
    eraName: 'The Great Dialect Convergence',
    eraTag: 'CONVERGENCE',
    kannadaTitle: 'ಮಹಾ ಉಪಭಾಷಾ ಸಂಗಮ',
    dispatch: 'Halegannada, Dakhni idioms, Solkattu meters, and weaver argots fuse into dynamic living hybrid ciphers. Manyata and ITPL surveillance arrays experience catastrophic perplexity cascades.',
    unparsedCityCoveragePct: 48.4,
    aiParsingFailureRate: 78.2,
    activeSanctuariesCount: 9,
    annualMigrationVolume: 54000,
    primaryPhenomenon: 'Multi-lingual syntactic collision shatters machine embeddings'
  },
  {
    year: 2040,
    eraName: 'The Granite Ridge Exodus',
    eraTag: 'EXODUS',
    kannadaTitle: 'ಶಿಲಾ ಪರ್ವತ ನಿರ್ಗಮನ',
    dispatch: 'Wanderers retreat into Bangalore’s 3-billion-year-old Peninsular Gneiss granite ridges (Bugle Rock, Turahalli). Lithic echoes absorb drone telemetry while corporate SEZs begin hollowing out.',
    unparsedCityCoveragePct: 67.5,
    aiParsingFailureRate: 89.6,
    activeSanctuariesCount: 12,
    annualMigrationVolume: 112000,
    primaryPhenomenon: 'Lithic acoustic shielding & mass civilian migration from SEZ corridors'
  },
  {
    year: 2045,
    eraName: 'The Neural Eclipse // Ring Collapse',
    eraTag: 'ECLIPSE',
    kannadaTitle: 'ಗ್ರಹಣ // ವರ್ತುಲ ರಸ್ತೆ ಕುಸಿತ',
    dispatch: 'AI surveillance grids along the Outer Ring Road fragment into isolated garrison islands. Continuous human speech corridors link Hebbal to Turahalli Forest in a resilient living canopy.',
    unparsedCityCoveragePct: 81.3,
    aiParsingFailureRate: 95.4,
    activeSanctuariesCount: 14,
    annualMigrationVolume: 178000,
    primaryPhenomenon: 'Metropolitan surveillance fragmentation into disconnected relic islands'
  },
  {
    year: 2050,
    eraName: 'The Unparsed Metropolis',
    eraTag: 'LIVING LATTICE',
    kannadaTitle: 'ಅನ್‌ಪಾರ್ಸ್ಡ್ ಮಹಾನಗರ // ಜೀವಂತ ಜಾಲ',
    dispatch: 'Human Language achieves complete cultural hegemony across Bengaluru. Synthetic surveillance collapses into preserved archaeological silos. The living human voice has reclaimed the city.',
    unparsedCityCoveragePct: 91.8,
    aiParsingFailureRate: 98.9,
    activeSanctuariesCount: 16,
    annualMigrationVolume: 240000,
    primaryPhenomenon: 'Autonomous human linguistic equilibrium across entire city geography'
  }
];

export const MIGRATION_FLOWS: DynamicMigrationFlow[] = [
  {
    id: 'flow-east-to-central',
    name: 'Whitefield SEZ Exodus to Central Pete',
    fromName: 'Whitefield ITPL & Bellandur Monoliths',
    toName: 'Chickpet & Avenue Road Sanctuaries',
    startCoords: [12.9850, 77.7300],
    endCoords: [12.9710, 77.5750],
    waypoints: [
      [12.9850, 77.7300],
      [12.9550, 77.6850],
      [12.9620, 77.6350],
      [12.9710, 77.5750]
    ],
    startYear: 2028,
    peakYear: 2036,
    endYear: 2044,
    volumeLabel: '42,000 citizens / year',
    dialectVector: 'Tech-Argot to Weaver Cipher Shift',
    lore: 'Displaced knowledge workers fleeing automated transcription grids along the Outer Ring Road, seeking refuge in the dense phonetic static of Chickpet textile gallis.',
    directionColor: '#00f5d4'
  },
  {
    id: 'flow-north-to-malleswaram',
    name: 'North Industrial Migration to Temple Steps',
    fromName: 'Manyata NLP Corridor & Hebbal Tech Belt',
    toName: 'Malleswaram Steps & Sankey Boathouse',
    startCoords: [13.0480, 77.6200],
    endCoords: [13.0034, 77.5702],
    waypoints: [
      [13.0480, 77.6200],
      [13.0300, 77.5950],
      [13.0150, 77.5780],
      [13.0034, 77.5702]
    ],
    startYear: 2032,
    peakYear: 2039,
    endYear: 2046,
    volumeLabel: '65,000 citizens / year',
    dialectVector: 'North Rail & Halegannada Convergence',
    lore: 'Factory and logistics operators moving southwest into Malleswaram’s granite step corridors where carnatic acoustics scatter aerial microphone arrays.',
    directionColor: '#38bdf8'
  },
  {
    id: 'flow-south-to-granite-ridge',
    name: 'Electronic City Retreat to Turahalli Forest',
    fromName: 'Electronic City Synthetic Data Bunker',
    toName: 'Bugle Rock & Turahalli Granite Sanctuaries',
    startCoords: [12.8450, 77.6650],
    endCoords: [12.8856, 77.5255],
    waypoints: [
      [12.8450, 77.6650],
      [12.8750, 77.6100],
      [12.8850, 77.5650],
      [12.8856, 77.5255]
    ],
    startYear: 2036,
    peakYear: 2043,
    endYear: 2050,
    volumeLabel: '88,000 citizens / year',
    dialectVector: 'Basavanagudi Literary & Lithic Refraction',
    lore: 'Large-scale migration westward onto Bangalore’s 3-billion-year-old granite batholiths where ancient stone fractures disrupt machine telemetry.',
    directionColor: '#f59e0b'
  },
  {
    id: 'flow-central-to-cantonment',
    name: 'Central Pete Expansion into Colonial Barracks',
    fromName: 'Chickpet Pete',
    toName: 'Russell Market & Ulsoor Stepwell',
    startCoords: [12.9710, 77.5750],
    endCoords: [12.9842, 77.6048],
    waypoints: [
      [12.9710, 77.5750],
      [12.9760, 77.5900],
      [12.9842, 77.6048]
    ],
    startYear: 2027,
    peakYear: 2033,
    endYear: 2042,
    volumeLabel: '28,000 citizens / year',
    dialectVector: 'Dakhni-Anglo-Kannada Argot',
    lore: 'Early wanderer cells establishing linguistic bridges between Kempe Gowda’s old city and the sprawling colonial cantonment meat and spice bazaars.',
    directionColor: '#10b981'
  }
];

// Helper: Interpolate timeline metrics for any year between 2026 and 2050
export function getTimelineDataForYear(year: number): TimelineChapter {
  const clampedYear = Math.max(2026, Math.min(2050, Math.round(year)));
  
  // Find surrounding chapters
  for (let i = 0; i < TIMELINE_CHAPTERS.length - 1; i++) {
    const chA = TIMELINE_CHAPTERS[i];
    const chB = TIMELINE_CHAPTERS[i + 1];
    if (clampedYear >= chA.year && clampedYear <= chB.year) {
      const t = (clampedYear - chA.year) / (chB.year - chA.year);
      return {
        year: clampedYear,
        eraName: t > 0.5 ? chB.eraName : chA.eraName,
        eraTag: t > 0.5 ? chB.eraTag : chA.eraTag,
        kannadaTitle: t > 0.5 ? chB.kannadaTitle : chA.kannadaTitle,
        dispatch: t > 0.5 ? chB.dispatch : chA.dispatch,
        unparsedCityCoveragePct: Number((chA.unparsedCityCoveragePct + t * (chB.unparsedCityCoveragePct - chA.unparsedCityCoveragePct)).toFixed(1)),
        aiParsingFailureRate: Number((chA.aiParsingFailureRate + t * (chB.aiParsingFailureRate - chA.aiParsingFailureRate)).toFixed(1)),
        activeSanctuariesCount: Math.round(chA.activeSanctuariesCount + t * (chB.activeSanctuariesCount - chA.activeSanctuariesCount)),
        annualMigrationVolume: Math.round(chA.annualMigrationVolume + t * (chB.annualMigrationVolume - chA.annualMigrationVolume)),
        primaryPhenomenon: t > 0.5 ? chB.primaryPhenomenon : chA.primaryPhenomenon
      };
    }
  }
  return TIMELINE_CHAPTERS[TIMELINE_CHAPTERS.length - 1];
}

// Year-aware zone calculation: zones appear, expand boundaries, and intensify
export function getEvolvingZonesForYear(year: number): MapZone[] {
  const introYears: Record<string, number> = {
    'hlz-chickpet': 2026,
    'hlz-russell-market': 2026,
    'hlz-ulsoor-stepwell': 2028,
    'hlz-malleswaram': 2030,
    'hlz-avenue-road': 2031,
    'hlz-basavanagudi': 2033,
    'hlz-pottery-town': 2035,
    'hlz-yeshwanthpur': 2038
  };

  return HUMAN_LANGUAGE_ZONES
    .filter(zone => {
      const intro = introYears[zone.id] || 2026;
      return year >= intro;
    })
    .map(zone => {
      const intro = introYears[zone.id] || 2026;
      const yearsActive = Math.max(0, year - intro);
      
      // Boundary expansion factor: outward growth over time
      const expansion = 1 + Math.min(1.4, yearsActive * 0.05);

      // Interpolate polygon outward from center
      const [cLat, cLng] = zone.coordinates;
      const evolvedPolygon = zone.polygon ? zone.polygon.map(([pLat, pLng]) => {
        return [
          cLat + (pLat - cLat) * expansion,
          cLng + (pLng - cLng) * expansion
        ] as LatLngTuple;
      }) : undefined;

      const boostedIncomprehension = Math.min(99.8, zone.acousticInterferencePct + yearsActive * 0.15);
      const loweredAiDetection = Math.max(0.5, zone.aiDetectionRate - yearsActive * 0.18);

      return {
        ...zone,
        polygon: evolvedPolygon,
        acousticInterferencePct: Number(boostedIncomprehension.toFixed(1)),
        aiDetectionRate: Number(loweredAiDetection.toFixed(1)),
        status: yearsActive > 12 ? 'clandestine' : zone.status
      };
    });
}

// Year-aware dead zones: massive corporate AI bastions early on (2026-2035), eroding and fracturing by 2045-2050
export function getEvolvingDeadZonesForYear(year: number): MapZone[] {
  return DEAD_ZONES.map(zone => {
    let aiDetectionRate = zone.aiDetectionRate;
    let status = zone.status;

    // Decay scale factor starting after 2036 as acoustic resistance penetrates corporate perimeters
    let shrinkFactor = 1;
    if (year > 2036) {
      const yearsElapsed = year - 2036;
      shrinkFactor = Math.max(0.55, 1 - yearsElapsed * 0.032);
      aiDetectionRate = Math.max(42, Number((zone.aiDetectionRate - yearsElapsed * 3.8).toFixed(1)));
      if (year >= 2045) {
        status = 'volatile';
      }
    }

    const [cLat, cLng] = zone.coordinates;
    const evolvedPolygon = zone.polygon ? zone.polygon.map(([pLat, pLng]) => {
      return [
        cLat + (pLat - cLat) * shrinkFactor,
        cLng + (pLng - cLng) * shrinkFactor
      ] as LatLngTuple;
    }) : undefined;

    return {
      ...zone,
      polygon: evolvedPolygon,
      aiDetectionRate,
      status
    };
  });
}

// Year-aware monitored zones: peak around 2032-2038, then degrade and destabilize by 2050
export function getEvolvingMonitoredZonesForYear(year: number): MapZone[] {
  return MONITORED_ZONES.map(zone => {
    let radius = zone.radiusMeters || 600;
    let detectionRate = zone.aiDetectionRate;
    let status = zone.status;

    if (year <= 2032) {
      // Early expansion
      const factor = 1 + (year - 2026) * 0.08;
      radius = Math.round(radius * factor);
    } else if (year <= 2040) {
      // Peak aggressive surveillance
      radius = Math.round(radius * 1.5);
      detectionRate = Math.max(65, detectionRate - (year - 2032) * 1.5);
    } else {
      // Degradation: semantic static causes sensor collapse
      const decay = (year - 2040) * 0.07;
      radius = Math.max(250, Math.round(radius * (1.5 - decay)));
      detectionRate = Math.max(18, 65 - (year - 2040) * 4.5);
      status = year > 2046 ? 'volatile' : 'high-risk';
    }

    return {
      ...zone,
      radiusMeters: radius,
      aiDetectionRate: Number(detectionRate.toFixed(1)),
      status
    };
  });
}

// Year-aware signal trails: emergent conduits and evolving resilience
export function getEvolvingSignalTrailsForYear(year: number): SignalTrail[] {
  const trailSchedule: Record<string, { startYear: number; endYear?: number }> = {
    'trail-pete-cantonment': { startYear: 2026 },
    'trail-cantonment-ulsoor': { startYear: 2028 },
    'trail-temple-steps': { startYear: 2030 },
    'trail-granite-path': { startYear: 2033 },
    'trail-ulsoor-varthur': { startYear: 2036 },
    'trail-sankey-hesaraghatta': { startYear: 2039 },
    'trail-bugle-turahalli': { startYear: 2041 }
  };

  return SIGNAL_TRAILS
    .filter(trail => {
      const sched = trailSchedule[trail.id];
      if (!sched) return true;
      if (year < sched.startYear) return false;
      if (sched.endYear && year > sched.endYear) return false;
      return true;
    })
    .map(trail => {
      const sched = trailSchedule[trail.id] || { startYear: 2026 };
      const age = year - sched.startYear;
      // Stealth rating improves over decades as physical baffles mature
      const stealth = Math.min(99, trail.stealthRating + Math.round(age * 0.4));
      return {
        ...trail,
        stealthRating: stealth
      };
    });
}

// Year-aware active migration flows
export function getActiveMigrationFlowsForYear(year: number): DynamicMigrationFlow[] {
  return MIGRATION_FLOWS.filter(flow => year >= flow.startYear && year <= flow.endYear);
}

