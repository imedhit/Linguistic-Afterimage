/**
 * Bengaluru Pixel Grid Data Model (2026–2050)
 * 
 * Entire Bengaluru city rendered as a discrete equal-area raster pixel field.
 * STRICTLY BOUNDED: The BBMP municipal outline strictly defines the pixel field.
 * Every pixel belongs to Bengaluru and collectively forms the authentic silhouette of the city.
 * 
 * High-Density Resolution: 190 rows x 220 cols (~160m per micro-pixel unit)
 * Organic Demographic Diffusion: Spread is based on Census 2011 statistical data (C-16 Language,
 * D-05 Migration), transit arteries (BMRCL Metro), and arterial expressways — NOT radial circles or random noise.
 */

import { getProjectionForYear } from './bengaluru2050EvidencePack';

export type PixelCategory =
  | 'human-only'       // Desaturated Rich Teal/Cyan (#2b998a / #1f7a6e)
  | 'ai-recognised'    // Steel / Cobalt Corporate Blue (#487eb3 / #32618d)
  | 'off-grid'         // Desaturated Violet / Purple (#8572a8 / #5d4c7a)
  | 'ai-surveillance'  // Terracotta / Brick Red (#b84e47 / #c26543)
  | 'baseline-urban'   // Darker Cool Grey Matrix (#1d232d -> #384352)
  | 'outside-void';    // Transparent outer void

export interface PixelMetrics {
  category: PixelCategory;
  color: string;
  fillOpacity: number;
  strokeColor: string;
  linguisticMixingIndex: number;
  dominantTongue: string;
  migrantSharePct: number;
  aiTrackingConfidence: number;
  aiWordErrorRate: number;
  surveillanceLevel: 'None' | 'Low' | 'Moderate' | 'Intense' | 'Fractured';
  statusLabel: string;
  description: string;
  gradientIntensity: number;
}

export interface PixelCell {
  id: string;
  row: number;
  col: number;
  centerLat: number;
  centerLng: number;
  latMin: number;
  latMax: number;
  lngMin: number;
  lngMax: number;
  wardName: string;
  sectorTag: string;
  isInsideCity: boolean;
  baselineKannadaPct: number;
  baselineMigrantPct: number;
  isOffGrid: boolean;
  minCorpDist: number;
  dChickpet: number;
  dRussell: number;
  dMalleswaram: number;
  dBasavanagudi: number;
  dUlsoor: number;
  dFort: number;
  dManyata: number;
  dBagmane: number;
  dEcospace: number;
  dWhitefield: number;
  dEcity: number;
  dBellandur: number;
  dPeenya: number;
  dKRMarket: number;
  dHebbal: number;
  dKoramangala: number;
  dJayanagar: number;
  dKengeri: number;
  dYelahanka: number;
  dSilkBoard: number;
  dToPurpleLine: number;
  dToGreenLine: number;
  dToORR: number;
  dToHosur: number;
  morphFactor: number;
  dCenter: number;
}

// Bounded to Bengaluru metropolitan area
export const GRID_CONFIG = {
  minLat: 12.795,
  maxLat: 13.105,
  minLng: 77.440,
  maxLng: 77.800,
  rows: 190,
  cols: 220
};

export const dLat = (GRID_CONFIG.maxLat - GRID_CONFIG.minLat) / GRID_CONFIG.rows;
export const dLng = (GRID_CONFIG.maxLng - GRID_CONFIG.minLng) / GRID_CONFIG.cols;

/**
 * Authentic municipal boundary polygon of Bruhat Bengaluru Mahanagara Palike (BBMP)
 * Accurately models the iconic silhouette of Bengaluru:
 * - Yelahanka northern apex
 * - Whitefield & Kadugodi eastern salient
 * - Electronic City southeastern boot
 * - Silk Institute & Bannerghatta southern anchors
 * - Kengeri & Challaghatta southwestern spur along Mysore Road
 * - Madavara & BIEC northwestern spur along Tumkur Road
 * - Peenya industrial bulge
 */
export const BBMP_BOUNDARY: [number, number][] = [
  [13.088, 77.585], // Yelahanka North Core
  [13.085, 77.605], // Yelahanka Satellite Town East
  [13.078, 77.625], // Jakkur Aerodrome North
  [13.065, 77.638], // Thanisandra Main Rd
  [13.048, 77.662], // Hennur / Geddalahalli
  [13.032, 77.676], // Horamavu / Kalkere Lake
  [13.018, 77.695], // Ramamurthy Nagar / Kowdenahalli
  [13.008, 77.712], // KR Puram Lake / Old Madras Rd
  [12.998, 77.735], // Hoodi / Aavalahalli
  [12.992, 77.758], // Kadugodi / Whitefield East Terminus
  [12.984, 77.765], // Hope Farm / ECC Road
  [12.968, 77.758], // Whitefield Main / Immadihalli
  [12.952, 77.748], // Varthur Kodi / Gunjur
  [12.935, 77.742], // Varthur Lake South Basin
  [12.920, 77.725], // Balagere / Panathur
  [12.910, 77.708], // Carmelaram / Doddakannelli
  [12.898, 77.690], // Kaikondrahalli / Bellandur Gate
  [12.885, 77.682], // Kasavanahalli / Rayasandra
  [12.870, 77.675], // Hosa Road / Singasandra
  [12.852, 77.672], // Electronic City Phase 2 East
  [12.836, 77.662], // Electronic City Phase 1 South Toll
  [12.835, 77.645], // Electronic City West / Bettadasanapura
  [12.845, 77.628], // Begur / Nobel Residency
  [12.858, 77.605], // Hulimavu / Bannerghatta Rd
  [12.852, 77.582], // Gottigere / Meenakshi Temple
  [12.848, 77.560], // Anjanapura 11th Block
  [12.858, 77.532], // Silk Institute / Kanakapura Rd South Terminus
  [12.875, 77.518], // Thalaghattapura / Doddakallasandra
  [12.888, 77.502], // Turahalli Forest / Uttarahalli
  [12.905, 77.472], // Challaghatta Purple Line Southwest Terminus
  [12.918, 77.480], // Kengeri Satellite Town
  [12.935, 77.488], // Bangalore University Jnana Bharathi
  [12.948, 77.498], // Nayandahalli Mysore Rd Junction
  [12.968, 77.505], // Chandra Layout / Nagarabhavi
  [12.990, 77.502], // Kamakshipalya / Magadi Rd
  [13.008, 77.492], // Sunkadakatte
  [13.030, 77.488], // Peenya Industrial Area Phase 2
  [13.058, 77.470], // Madavara BIEC Green Line Northwest Terminus
  [13.068, 77.495], // Dasarahalli / Bagalakunte
  [13.072, 77.522], // Jalahalli West / Air Force Station
  [13.080, 77.548], // Vidyaranyapura North Ridge
  [13.088, 77.585]  // Close polygon loop back to Yelahanka North
];

// Point-in-polygon ray casting algorithm
export function pointInPolygon(point: [number, number], vs: [number, number][]): boolean {
  const x = point[0], y = point[1];
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const xi = vs[i][0], yi = vs[i][1];
    const xj = vs[j][0], yj = vs[j][1];
    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Distance helper in kilometers
function distKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLatKm = (lat1 - lat2) * 111.0;
  const dLngKm = (lng1 - lng2) * 108.0;
  return Math.sqrt(dLatKm * dLatKm + dLngKm * dLngKm);
}

// Distance from point to line segment in kilometers
function distToSegmentKm(pLat: number, pLng: number, aLat: number, aLng: number, bLat: number, bLng: number): number {
  const dLatKm = (bLat - aLat) * 111.0;
  const dLngKm = (bLng - aLng) * 108.0;
  const segLenSq = dLatKm * dLatKm + dLngKm * dLngKm;
  if (segLenSq === 0) return distKm(pLat, pLng, aLat, aLng);

  const pLatKm = (pLat - aLat) * 111.0;
  const pLngKm = (pLng - aLng) * 108.0;

  const t = Math.max(0, Math.min(1, (pLatKm * dLatKm + pLngKm * dLngKm) / segLenSq));
  const projLat = aLat + t * (bLat - aLat);
  const projLng = aLng + t * (bLng - aLng);
  return distKm(pLat, pLng, projLat, projLng);
}

// Distance to multi-segment polyline in kilometers
function distToPolylineKm(pLat: number, pLng: number, waypoints: [number, number][]): number {
  let minDist = Infinity;
  for (let i = 0; i < waypoints.length - 1; i++) {
    const d = distToSegmentKm(pLat, pLng, waypoints[i][0], waypoints[i][1], waypoints[i + 1][0], waypoints[i + 1][1]);
    if (d < minDist) minDist = d;
  }
  return minDist;
}

// Transit & Highway Waypoints for non-random organic diffusion along infrastructure
const PURPLE_LINE_WAYPOINTS: [number, number][] = [
  [12.906, 77.472], // Challaghatta
  [12.915, 77.485], // Kengeri
  [12.935, 77.490], // Jnana Bharathi / BU
  [12.948, 77.498], // Nayandahalli
  [12.960, 77.530], // Deepanjali Nagar
  [12.976, 77.573], // Majestic
  [12.975, 77.607], // MG Road
  [12.978, 77.640], // Indiranagar
  [12.990, 77.665], // Baiyappanahalli
  [13.001, 77.685], // KR Puram
  [12.986, 77.746]  // Whitefield ITPL
];

const GREEN_LINE_WAYPOINTS: [number, number][] = [
  [13.058, 77.475], // Madavara BIEC
  [13.030, 77.510], // Peenya
  [13.024, 77.550], // Yeshwanthpur
  [13.003, 77.570], // Malleswaram
  [12.976, 77.573], // Majestic
  [12.962, 77.576], // KR Market
  [12.944, 77.574], // Basavanagudi
  [12.930, 77.583], // Jayanagar
  [12.908, 77.585], // JP Nagar
  [12.862, 77.533]  // Silk Institute
];

const ORR_WAYPOINTS: [number, number][] = [
  [13.036, 77.597], // Hebbal
  [13.045, 77.620], // Manyata
  [13.001, 77.685], // KR Puram
  [12.955, 77.701], // Marathahalli
  [12.928, 77.678], // Bellandur
  [12.9177, 77.6238], // Silk Board
  [12.9165, 77.598], // BTM
  [12.924, 77.568], // Banashankari
  [12.952, 77.525], // Nayandahalli
  [13.028, 77.535], // Goraguntepalya
  [13.036, 77.597]  // Hebbal
];

const HOSUR_WAYPOINTS: [number, number][] = [
  [12.9177, 77.6238], // Silk Board
  [12.885, 77.650],   // Kudlu Gate
  [12.845, 77.665]    // Electronic City
];

// Key anchor localities across all municipal sectors with Census 2011 statistical baselines
const ANCHORS = [
  { name: 'Chickpet Pete Gallis', lat: 12.970, lng: 77.575, tag: 'Historic Wholesale Core', baselineK: 42.4, baselineM: 58.8 },
  { name: 'KR Market Wholesale Mandi', lat: 12.962, lng: 77.576, tag: 'Agrarian Auction Cavern', baselineK: 41.2, baselineM: 68.4 },
  { name: 'Avenue Road Catacombs', lat: 12.973, lng: 77.578, tag: 'Historic Book Bazaar', baselineK: 43.1, baselineM: 56.2 },
  { name: 'Majestic Intermodal Nexus', lat: 12.976, lng: 77.573, tag: 'Transit Core Interchange', baselineK: 44.0, baselineM: 64.0 },
  { name: 'Russell Market / Shivajinagar', lat: 12.984, lng: 77.605, tag: 'Cantonment Polyglot', baselineK: 28.5, baselineM: 62.5 },
  { name: 'Commercial Street Arcade', lat: 12.981, lng: 77.610, tag: 'Cantonment Retail Nexus', baselineK: 30.2, baselineM: 61.0 },
  { name: 'Malleswaram 8th Cross', lat: 13.003, lng: 77.570, tag: 'Traditional Northern Core', baselineK: 64.2, baselineM: 42.0 },
  { name: 'Malleswaram 15th Cross', lat: 13.012, lng: 77.568, tag: 'Northern Cultural Enclave', baselineK: 66.0, baselineM: 39.5 },
  { name: 'Basavanagudi Gandhi Bazaar', lat: 12.944, lng: 77.574, tag: 'Southern Cultural Core', baselineK: 61.8, baselineM: 44.2 },
  { name: 'VV Puram Heritage Street', lat: 12.952, lng: 77.577, tag: 'Heritage Culinary Nexus', baselineK: 52.4, baselineM: 52.1 },
  { name: 'Ulsoor Someshwara Cistern', lat: 12.982, lng: 77.625, tag: 'Subterranean Lithic Shield', baselineK: 34.0, baselineM: 66.5 },
  { name: 'Indiranagar 100ft Corridor', lat: 12.978, lng: 77.640, tag: 'Eastern Commercial Transit', baselineK: 32.5, baselineM: 68.0 },
  { name: 'Bangalore Fort Catacombs', lat: 12.963, lng: 77.576, tag: 'Lithic RF Shield', baselineK: 42.0, baselineM: 58.0 },
  { name: 'Whitefield ITPL Monolith', lat: 12.986, lng: 77.746, tag: 'Corporate IT SEZ', baselineK: 18.2, baselineM: 78.5 },
  { name: 'Whitefield EPIP Zone', lat: 12.978, lng: 77.728, tag: 'Corporate IT SEZ', baselineK: 21.0, baselineM: 75.2 },
  { name: 'Bellandur ORR Glass Corridor', lat: 12.926, lng: 77.676, tag: 'Outer Ring Road SEZ', baselineK: 22.4, baselineM: 76.8 },
  { name: 'Ecospace Tech Corridor', lat: 12.923, lng: 77.684, tag: 'Outer Ring Road SEZ', baselineK: 20.8, baselineM: 78.1 },
  { name: 'Electronic City Phase 1', lat: 12.845, lng: 77.660, tag: 'Industrial Electronics SEZ', baselineK: 24.5, baselineM: 74.0 },
  { name: 'Electronic City Phase 2', lat: 12.855, lng: 77.680, tag: 'Industrial Electronics SEZ', baselineK: 26.0, baselineM: 72.5 },
  { name: 'Manyata Tech Park Sector', lat: 13.050, lng: 77.620, tag: 'Northern Corporate IT', baselineK: 25.4, baselineM: 74.5 },
  { name: 'Hebbal Flyover Gateway', lat: 13.036, lng: 77.598, tag: 'Northern Arterial Nexus', baselineK: 36.2, baselineM: 65.0 },
  { name: 'Koramangala 4th Block', lat: 12.934, lng: 77.625, tag: 'Southeast Mixed Residential', baselineK: 29.5, baselineM: 71.0 },
  { name: 'HSR Layout Sector 1', lat: 12.912, lng: 77.648, tag: 'Southeast Planned Ward', baselineK: 31.0, baselineM: 70.2 },
  { name: 'Jayanagar 4th Block Complex', lat: 12.930, lng: 77.583, tag: 'Southern Planned Core', baselineK: 54.0, baselineM: 48.0 },
  { name: 'JP Nagar 2nd Phase', lat: 12.908, lng: 77.585, tag: 'Southern Planned Ward', baselineK: 52.0, baselineM: 50.0 },
  { name: 'BTM Layout 2nd Stage', lat: 12.916, lng: 77.610, tag: 'Transit Residential Nexus', baselineK: 38.0, baselineM: 68.0 },
  { name: 'Banashankari 2nd Stage', lat: 12.925, lng: 77.550, tag: 'Traditional Southwest Ward', baselineK: 62.0, baselineM: 44.0 },
  { name: 'Rajajinagar 1st Block', lat: 12.998, lng: 77.554, tag: 'Western Commercial Ward', baselineK: 58.5, baselineM: 46.5 },
  { name: 'Peenya Industrial Phase 2', lat: 13.038, lng: 77.520, tag: 'Northwest Manufacturing Belt', baselineK: 44.0, baselineM: 68.5 },
  { name: 'Yeshwanthpur Freight Core', lat: 13.024, lng: 77.550, tag: 'Northwest Transit Nexus', baselineK: 48.0, baselineM: 62.0 },
  { name: 'Vijayanagar Water Tank', lat: 12.968, lng: 77.535, tag: 'Western Residential Ward', baselineK: 60.5, baselineM: 44.0 },
  { name: 'Kengeri Satellite Town', lat: 12.915, lng: 77.485, tag: 'Southwest Metro Outpost', baselineK: 56.0, baselineM: 52.0 },
  { name: 'Challaghatta Viaduct Terminal', lat: 12.906, lng: 77.472, tag: 'Purple Line Terminus', baselineK: 52.0, baselineM: 55.0 },
  { name: 'Madavara BIEC Gateway', lat: 13.058, lng: 77.475, tag: 'Green Line North Terminus', baselineK: 49.0, baselineM: 57.0 },
  { name: 'Silk Institute Terminal', lat: 12.862, lng: 77.533, tag: 'Green Line South Terminus', baselineK: 54.0, baselineM: 50.0 },
  { name: 'Marathahalli Bridge Nexus', lat: 12.955, lng: 77.701, tag: 'Eastern Arterial Hub', baselineK: 26.5, baselineM: 74.5 },
  { name: 'Yelahanka Satellite Town', lat: 13.080, lng: 77.595, tag: 'Northern Peri-Urban Core', baselineK: 51.0, baselineM: 54.0 }
];

function getClosestAnchor(lat: number, lng: number) {
  let best = ANCHORS[0];
  let minDistSq = Infinity;
  for (let i = 0; i < ANCHORS.length; i++) {
    const a = ANCHORS[i];
    const dSq = (a.lat - lat) ** 2 + (a.lng - lng) ** 2;
    if (dSq < minDistSq) {
      minDistSq = dSq;
      best = a;
    }
  }
  return { anchor: best, distKm: Math.sqrt(minDistSq) * 111.0 };
}

/**
 * Generate the pixel grid where ONLY cells strictly inside Bengaluru's BBMP boundary exist.
 * The spread is completely limited to Bangalore boundaries.
 */
export function generateBengaluruPixelGrid(): PixelCell[] {
  const cells: PixelCell[] = [];

  for (let r = 0; r < GRID_CONFIG.rows; r++) {
    const latMax = GRID_CONFIG.maxLat - r * dLat;
    const latMin = latMax - dLat;
    const centerLat = (latMin + latMax) / 2;

    for (let c = 0; c < GRID_CONFIG.cols; c++) {
      const lngMin = GRID_CONFIG.minLng + c * dLng;
      const lngMax = lngMin + dLng;
      const centerLng = (lngMin + lngMax) / 2;

      // STRICT REQUIREMENT: Only pixels strictly inside BBMP municipal boundary exist.
      const isInsideBbmp = pointInPolygon([centerLat, centerLng], BBMP_BOUNDARY);
      if (!isInsideBbmp) {
        continue;
      }

      const { anchor, distKm: distToAnchor } = getClosestAnchor(centerLat, centerLng);

      const dChickpet = distKm(centerLat, centerLng, 12.970, 77.575);
      const dRussell = distKm(centerLat, centerLng, 12.984, 77.605);
      const dMalleswaram = distKm(centerLat, centerLng, 13.003, 77.570);
      const dBasavanagudi = distKm(centerLat, centerLng, 12.944, 77.574);
      const dUlsoor = distKm(centerLat, centerLng, 12.982, 77.625);
      const dFort = distKm(centerLat, centerLng, 12.963, 77.576);

      const dWhitefield = distKm(centerLat, centerLng, 12.9860, 77.7460);
      const dBellandur = distKm(centerLat, centerLng, 12.9260, 77.6762);
      const dEcity = distKm(centerLat, centerLng, 12.8452, 77.6602);
      const dManyata = distKm(centerLat, centerLng, 13.0500, 77.6200);
      const dBagmane = distKm(centerLat, centerLng, 12.9815, 77.6625);
      const dEcospace = distKm(centerLat, centerLng, 12.9260, 77.6830);

      const dPeenya = distKm(centerLat, centerLng, 13.0380, 77.5200);
      const dKRMarket = distKm(centerLat, centerLng, 12.9620, 77.5760);
      const dHebbal = distKm(centerLat, centerLng, 13.0360, 77.5980);
      const dKoramangala = distKm(centerLat, centerLng, 12.9340, 77.6250);
      const dJayanagar = distKm(centerLat, centerLng, 12.9300, 77.5830);
      const dKengeri = distKm(centerLat, centerLng, 12.9150, 77.4850);
      const dYelahanka = distKm(centerLat, centerLng, 13.0800, 77.5950);
      const dSilkBoard = distKm(centerLat, centerLng, 12.9177, 77.6238);

      const minCorpDist = Math.min(dWhitefield, dBellandur, dEcity, dManyata, dBagmane, dEcospace);
      const isOffGrid = (dUlsoor <= 0.85) || (dFort <= 0.80) || (dMalleswaram <= 0.80);
      const dCenter = distKm(centerLat, centerLng, 12.975, 77.595);

      // Precomputed infrastructure distances
      const dToPurpleLine = distToPolylineKm(centerLat, centerLng, PURPLE_LINE_WAYPOINTS);
      const dToGreenLine = distToPolylineKm(centerLat, centerLng, GREEN_LINE_WAYPOINTS);
      const dToORR = distToPolylineKm(centerLat, centerLng, ORR_WAYPOINTS);
      const dToHosur = distToPolylineKm(centerLat, centerLng, HOSUR_WAYPOINTS);

      // Deterministic morphological grain (non-random cellular micro-structure)
      const morphFactor = Math.sin(r * 0.43 + c * 0.31) * 0.12 + Math.cos(r * 0.29 - c * 0.37) * 0.10;

      const cellId = `px_${r}_${c}`;
      const wardLabel = distToAnchor <= 1.2 ? anchor.name : `${anchor.name} Sector`;

      cells.push({
        id: cellId,
        row: r,
        col: c,
        centerLat,
        centerLng,
        latMin,
        latMax,
        lngMin,
        lngMax,
        wardName: wardLabel,
        sectorTag: anchor.tag,
        isInsideCity: true,
        baselineKannadaPct: anchor.baselineK,
        baselineMigrantPct: anchor.baselineM,
        isOffGrid,
        minCorpDist,
        dChickpet,
        dRussell,
        dMalleswaram,
        dBasavanagudi,
        dUlsoor,
        dFort,
        dManyata,
        dBagmane,
        dEcospace,
        dWhitefield,
        dEcity,
        dBellandur,
        dPeenya,
        dKRMarket,
        dHebbal,
        dKoramangala,
        dJayanagar,
        dKengeri,
        dYelahanka,
        dSilkBoard,
        dToPurpleLine,
        dToGreenLine,
        dToORR,
        dToHosur,
        morphFactor,
        dCenter
      });
    }
  }

  return cells;
}

/**
 * Compute organic, non-random, demographic-grounded metrics for each pixel.
 * Spread is based on Census 2011 C-16/D-05 evidence, BMRCL metro arteries,
 * and highway infrastructure across every area of Bengaluru.
 */
export function getPixelMetrics(cell: PixelCell, year: number): PixelMetrics {
  // Guard: Strictly limited to Bengaluru municipal boundary only
  if (!cell.isInsideCity) {
    return {
      category: 'outside-void',
      color: 'transparent',
      fillOpacity: 0.0,
      strokeColor: 'transparent',
      linguisticMixingIndex: 0,
      dominantTongue: 'Outer Void',
      migrantSharePct: 0,
      aiTrackingConfidence: 0,
      aiWordErrorRate: 0,
      surveillanceLevel: 'None',
      statusLabel: 'Beyond BBMP Boundary',
      description: 'Beyond Bengaluru municipal boundary.',
      gradientIntensity: 0
    };
  }

  const projection = getProjectionForYear(year);
  const t = Math.max(0, Math.min(1, (year - 2026) / 24));
  const macroMixingIndex = projection.linguisticMixingIndex;
  const localMigrantPct = Math.min(96, Math.max(32, Math.round(cell.baselineMigrantPct + (projection.migrantSharePercent - 58.8))));

  // Micro-texture variation (unique per pixel based on coordinates) for crisp vector raster articulation
  const cellJitter = ((cell.row * 13 + cell.col * 17) % 7) * 0.02 - 0.06;

  // 0. OPENING BASELINE STATE (year <= 2026): Empty map with no speculative zones.
  // Every area shows the baseline inhabited grid based on Census 2011 plurality.
  if (year <= 2026) {
    const baselineMix = Math.round(macroMixingIndex * 0.82);
    const demographicWeight = Math.max(0, Math.min(1.0,
      (cell.baselineMigrantPct / 85) * 0.40 +
      Math.max(0, 1 - cell.dCenter / 13) * 0.35 +
      cellJitter * 0.30
    ));

    let vectorBaseColor = '#1d232d'; // Level 1: Outer peripheral wards
    if (demographicWeight >= 0.75) {
      vectorBaseColor = '#384352'; // Level 4: Dense metropolitan core
    } else if (demographicWeight >= 0.50) {
      vectorBaseColor = '#2e3743'; // Level 3: Established urban wards
    } else if (demographicWeight >= 0.25) {
      vectorBaseColor = '#252d37'; // Level 2: Mid-ring residential
    }

    return {
      category: 'baseline-urban',
      color: vectorBaseColor,
      fillOpacity: 1.0,
      strokeColor: '#13171e',
      linguisticMixingIndex: baselineMix,
      dominantTongue: `Kannada Plurality (${cell.baselineKannadaPct.toFixed(1)}%) with Regional Transit Dialects`,
      migrantSharePct: localMigrantPct,
      aiTrackingConfidence: 65,
      aiWordErrorRate: 35,
      surveillanceLevel: 'Low',
      statusLabel: 'Bengaluru Inhabited Linguistic Grid',
      description: `Urban geographic unit of ${cell.wardName}. Reflects Census 2011 baseline linguistic plurality (${cell.baselineKannadaPct.toFixed(1)}% Kannada, ${cell.baselineMigrantPct.toFixed(1)}% migrant baseline) evolving with metropolitan urbanisation.`,
      gradientIntensity: demographicWeight
    };
  }

  // =========================================================================
  // ORGANIC SPECULATIVE DIFFUSION ACROSS BANGALORE (year > 2026)
  // Grounded in statistical data: Census C-16, D-05, and BMRCL infrastructure.
  // =========================================================================

  // 1. OFF-GRID SPACES (Subterranean Lithic Shields - Purple #8572a8)
  // Emerge from 2028 around Chola & Kempe Gowda granite structures, subterranean tanks & catacombs
  const dLithic = Math.min(
    cell.dUlsoor * 0.95,
    cell.dFort * 0.90,
    cell.dMalleswaram * 1.10,
    distKm(cell.centerLat, cell.centerLng, 12.943, 77.568) * 1.05 // Bugle Rock / Bull Temple granite hill
  );
  const lithicMaxReach = 0.50 + t * 0.90;
  const isOffGridZone = year >= 2028 && (dLithic < lithicMaxReach) && (
    (1 - dLithic / lithicMaxReach) + cell.morphFactor * 0.15 >= 0.40
  );

  if (isOffGridZone) {
    const isCore = dLithic < lithicMaxReach * 0.50;
    const offColor = isCore ? '#8572a8' : '#5d4c7a';
    let anchorName = 'Bangalore Fort Lithic Catacombs';
    if (cell.dUlsoor < cell.dFort && cell.dUlsoor < cell.dMalleswaram) {
      anchorName = 'Ulsoor Someshwara Subterranean Cistern';
    } else if (cell.dMalleswaram < cell.dFort) {
      anchorName = 'Malleswaram 8th Cross Granite Steps';
    } else if (distKm(cell.centerLat, cell.centerLng, 12.943, 77.568) < 1.0) {
      anchorName = 'Bugle Rock Kempe Gowda Granite Rampart';
    }

    return {
      category: 'off-grid',
      color: offColor,
      fillOpacity: 1.0,
      strokeColor: '#a897cc',
      linguisticMixingIndex: Math.round(75 + t * 20),
      dominantTongue: 'Acoustic Phase-Cancellation Shield (Lithic Argot)',
      migrantSharePct: localMigrantPct,
      aiTrackingConfidence: 0,
      aiWordErrorRate: 99.8,
      surveillanceLevel: 'None',
      statusLabel: 'Off-Grid Space (AI Blocked)',
      description: `Stepped granite masonry and subterranean cisterns at ${anchorName} create 12-second acoustic multipath reverberation, attenuating 99.8% of RF signals and rendering neural voice models completely inoperative.`,
      gradientIntensity: isCore ? 1.0 : 0.6
    };
  }

  // 2. AI SURVEILLANCE POTENTIAL (Corporate IT & Highway Telemetry - Red #b84e47)
  // Sourced from 27.9% work migration rising to 39.8%, Outer Ring Road, and IT SEZs
  const minSezDist = Math.min(
    cell.dWhitefield * 0.85,
    cell.dEcity * 0.88,
    cell.dBellandur * 0.92,
    cell.dSilkBoard * 1.05
  );
  const sezSurvReach = 1.9 + t * 3.7;
  const sezProximity = Math.max(0, 1 - minSezDist / sezSurvReach);
  const expresswayProximity = Math.min(cell.dToORR, cell.dToHosur);
  const expresswaySurvBonus = expresswayProximity < 1.3 ? (1 - expresswayProximity / 1.3) * 0.38 : 0;
  const workMigrantWeight = Math.max(0, (cell.baselineMigrantPct - 50) / 35) * 0.25;
  const survScore = sezProximity * 0.62 + expresswaySurvBonus + workMigrantWeight + cell.morphFactor * 0.08;

  const isSurveillanceZone = year > 2026 && survScore >= 0.52;

  // 3. AI-RECOGNISED POTENTIAL (Standardized Enterprise NLP - Blue #487eb3)
  // Sourced from enterprise software campuses: Manyata (North), Bagmane (East), Ecospace (Bellandur)
  const minCorpParkDist = Math.min(
    cell.dManyata * 0.88,
    cell.dBagmane * 0.92,
    cell.dEcospace * 0.92
  );
  const corpParkReach = 1.7 + t * 3.3;
  const corpProximity = Math.max(0, 1 - minCorpParkDist / corpParkReach);
  const corpCorridorBonus = (cell.dToORR < 1.1 && cell.centerLat < 13.06) ? 0.28 : 0;
  const corpScore = corpProximity * 0.68 + corpCorridorBonus + (cell.baselineMigrantPct / 100) * 0.18 + cell.morphFactor * 0.08;

  const isRecognisedZone = year > 2026 && corpScore >= 0.50;

  // 4. DYNAMIC OVERLAP AT BELLANDUR & ORR CORRIDOR
  // Renders dynamic alternating blue and red pixel squares where red surveillance & blue enterprise NLP intersect
  if (isSurveillanceZone && isRecognisedZone) {
    const isFractured = year >= 2044;
    const isCore = minSezDist < sezSurvReach * 0.5 || minCorpParkDist < corpParkReach * 0.5;

    // Organic alternating checkerboard in terms of micro-pixels
    const isRedPixel = (cell.row + cell.col) % 2 === 0;
    const redColor = isFractured ? '#c26543' : (isCore ? '#b84e47' : '#9e3f39');
    const blueColor = isCore ? '#487eb3' : '#32618d';

    return {
      category: isRedPixel ? 'ai-surveillance' : 'ai-recognised',
      color: isRedPixel ? redColor : blueColor,
      fillOpacity: 1.0,
      strokeColor: isRedPixel ? '#d4827d' : '#7ea4cc',
      linguisticMixingIndex: Math.round(52 + t * 24),
      dominantTongue: isRedPixel
        ? 'Outer Ring Road (Bellandur) Biometric Optical Telemetry'
        : 'Ecospace Standardized Corporate English & Automated Synthesizers',
      migrantSharePct: localMigrantPct,
      aiTrackingConfidence: isFractured ? 42 : 88,
      aiWordErrorRate: isFractured ? 58 : 12,
      surveillanceLevel: isFractured ? 'Fractured' : 'Intense',
      statusLabel: 'Bellandur Emerging Dynamic Intersection (Surveillance & Corporate NLP)',
      description: `Contested spatial corridor at ${cell.wardName} along Outer Ring Road. High-density corporate enterprise models (${projection.workMigrantSharePercent.toFixed(1)}% work migrants) clash directly with automated perimeter telemetry, creating a dynamic interleaved micro-pixel matrix.`,
      gradientIntensity: isCore ? 1.0 : 0.65
    };
  }

  // 5. HUMAN-ONLY DIFFUSION POTENTIAL (Street Multilingual Polyphony - Teal #2b998a)
  // Driven by Census C-16 linguistic plurality (42.4% Kannada, 16.1% Tamil, 13.9% Telugu, 12.9% Urdu)
  // and linguistic mixing index rising from 44% in 2026 to 88% in 2050.
  // Originates in historical wholesale bazaars (Chickpet, KR Market, Russell Market, Majestic),
  // diffusing organically along BMRCL Purple & Green lines and industrial labor corridors (Peenya, Yeshwanthpur).
  const minBazaarDist = Math.min(
    cell.dChickpet * 0.88,
    cell.dRussell * 0.94,
    cell.dKRMarket * 0.90
  );
  const bazaarMaxReach = 1.6 + t * 4.6;
  const bazaarProximity = Math.max(0, 1 - minBazaarDist / bazaarMaxReach);

  // BMRCL Transit Conduit Diffusion (daily passenger contact accelerates multilingual code-switching)
  const minMetroDist = Math.min(cell.dToPurpleLine, cell.dToGreenLine);
  const metroConduitBonus = minMetroDist < 1.5 ? (1 - minMetroDist / 1.5) * (0.32 + t * 0.46) : 0;

  // Industrial & freight labor hub diffusion (Peenya Industrial Estate & Yeshwanthpur freight terminal)
  const minIndustrialDist = Math.min(cell.dPeenya * 0.95, distKm(cell.centerLat, cell.centerLng, 13.024, 77.550) * 1.0);
  const industrialLaborBonus = (minIndustrialDist < 3.2 && year >= 2030)
    ? (1 - minIndustrialDist / 3.2) * (0.32 + t * 0.38)
    : 0;

  // Student & startup hybrid slang corridors (Koramangala & HSR) emerging post-2036
  const youthSlangBonus = ((cell.dKoramangala < 2.2 || cell.dKengeri < 2.6) && year >= 2036) ? 0.26 : 0;

  // Demographic mixing pull
  const demographicPolyglotPull = (macroMixingIndex / 100) * 0.36 + ((100 - cell.baselineKannadaPct) / 100) * 0.20;

  const humanScore = bazaarProximity * 0.46 + metroConduitBonus + industrialLaborBonus + youthSlangBonus + demographicPolyglotPull + cell.morphFactor * 0.08;

  const isHumanZone = year > 2026 && humanScore >= 0.55;

  if (isHumanZone) {
    const isCore = minBazaarDist < bazaarMaxReach * 0.50 || minIndustrialDist < 1.4;
    let vectorColor = '#1f7a6e'; // Desaturated deep pine-teal
    if (isCore) {
      vectorColor = '#2b998a'; // Desaturated rich teal-cyan
    } else if (metroConduitBonus > 0.2) {
      vectorColor = '#37998b'; // Turquoise transit conduit
    }

    // Specific speculative dialect lore tailored to each area of Bangalore
    let dialectName = 'Vernacular Street Polyphony';
    let areaLore = '';

    if (minIndustrialDist < 2.2 && cell.centerLat > 13.01) {
      dialectName = 'Peenya-Yeshwanthpur Industrial Shop-Floor Cant';
      areaLore = `Northwestern manufacturing belt at ${cell.wardName}. Multilingual industrial labor cohorts (Tamil, Telugu, Hindi, Odia) fuse shop-floor machinery rhythm with street argot, inducing 92% word error rate in automated factory telemetry.`;
    } else if (cell.dChickpet < 1.5 || cell.dKRMarket < 1.5) {
      dialectName = 'Pete Galli Acoustic Baffle (Gajagalu)';
      areaLore = `Historic wholesale heart at ${cell.wardName}. Multilingual merchant banter (Kannada, Telugu, Marwari, Dakhni) and handloom clatter shatter neural NLP tokenizers into unparsed phonetic static.`;
    } else if (cell.dRussell < 1.8) {
      dialectName = 'Shivajinagar-Cantonment Tamil-Dakhni Synthesis';
      areaLore = `Cantonment market arcade at ${cell.wardName}. Rapid code-switching between Tamil, Urdu, English, and Kannada overwhelms directional audio sensors.`;
    } else if (metroConduitBonus > 0.2) {
      dialectName = 'BMRCL Transit Conduit Sub-Acoustic Artery';
      areaLore = `Transit resistance artery along ${cell.wardName}. High-density commuter code-switching across metro trains links peripheral wards with the historic core commons.`;
    } else if (youthSlangBonus > 0.15) {
      dialectName = 'Koramangala-HSR Hybrid Slang Commons';
      areaLore = `Startup and academic enclave at ${cell.wardName}. Tech workers and students generate unparsed hybrid slang that resists corporate NLP categorization.`;
    } else {
      dialectName = 'Metropolitan Multilingual Street Argot';
      areaLore = `Living polyphonic street mixing at ${cell.wardName}. Reflects metropolitan mixing index of ${macroMixingIndex}%, rendering automated surveillance models completely obsolete.`;
    }

    const aiErrorRate = Math.min(98, Math.round(48 + t * 49));

    return {
      category: 'human-only',
      color: vectorColor,
      fillOpacity: 1.0,
      strokeColor: '#5fb3a6',
      linguisticMixingIndex: Math.min(98, Math.round(macroMixingIndex + (1 - (minBazaarDist / 8)) * 14)),
      dominantTongue: dialectName,
      migrantSharePct: localMigrantPct,
      aiTrackingConfidence: Math.max(3, Math.round(100 - aiErrorRate * (isCore ? 0.9 : 0.7))),
      aiWordErrorRate: Math.round(aiErrorRate * (isCore ? 0.95 : 0.8)),
      surveillanceLevel: 'None',
      statusLabel: 'Human-Only Languages & Zones (AI Manipulated)',
      description: areaLore,
      gradientIntensity: isCore ? 1.0 : 0.65
    };
  }

  // 6. AI SURVEILLANCE STANDALONE ZONES (Red #b84e47)
  if (isSurveillanceZone) {
    const isFractured = year >= 2044;
    const isCore = minSezDist < sezSurvReach * 0.55;
    const redColor = isFractured ? '#c26543' : (isCore ? '#b84e47' : '#9e3f39');

    let hubName = 'Outer Ring Road Surveillance Corridor';
    if (cell.dWhitefield < 3.2) hubName = 'Whitefield ITPL / EPIP Monolith';
    else if (cell.dEcity < 3.2) hubName = 'Electronic City Phase 1 Data Fortress';
    else if (cell.dSilkBoard < 2.0) hubName = 'Silk Board Tollway Transit Nexus';

    return {
      category: 'ai-surveillance',
      color: redColor,
      fillOpacity: 1.0,
      strokeColor: isFractured ? '#d97746' : '#d4827d',
      linguisticMixingIndex: Math.round(38 + t * 28),
      dominantTongue: 'Corporate Highway Telemetry & Optical Profiling',
      migrantSharePct: localMigrantPct,
      aiTrackingConfidence: isFractured ? 38 : (isCore ? 95 : 75),
      aiWordErrorRate: isFractured ? 62 : (isCore ? 5 : 25),
      surveillanceLevel: isFractured ? 'Fractured' : (year >= 2036 ? 'Intense' : 'Moderate'),
      statusLabel: isFractured ? 'AI Surveillance Zone (Fracturing)' : 'AI Surveillance Zone (Corporate SEZ)',
      description: isFractured
        ? `Automated optical sensors and highway acoustic gantries at ${hubName} decaying under intense multilingual street mixing; error rates surging rapidly.`
        : `Dense array of automated facial recognition, acoustic telemetry, and smart turnstiles standardizing movement at ${hubName}.`,
      gradientIntensity: isCore ? 1.0 : 0.6
    };
  }

  // 7. AI-RECOGNISED STANDALONE CORRIDORS (Blue #487eb3)
  if (isRecognisedZone) {
    const isCore = minCorpParkDist < corpParkReach * 0.55;
    const blueColor = isCore ? '#487eb3' : '#32618d';

    let hubName = 'Corporate Tech Corridor';
    if (cell.dManyata < 3.0) hubName = 'Manyata Tech Park Sector';
    else if (cell.dBagmane < 2.6) hubName = 'Bagmane Tech Park Corridor';
    else if (cell.dEcospace < 2.8) hubName = 'Outer Ring Road (Ecospace) Sector';

    return {
      category: 'ai-recognised',
      color: blueColor,
      fillOpacity: 1.0,
      strokeColor: '#7ea4cc',
      linguisticMixingIndex: Math.round(44 + t * 20),
      dominantTongue: 'Standardized Corporate English & Formal Tokenized NLP',
      migrantSharePct: localMigrantPct,
      aiTrackingConfidence: isCore ? 98 : 88,
      aiWordErrorRate: isCore ? 2 : 12,
      surveillanceLevel: 'Moderate',
      statusLabel: 'AI-Recognised Languages (Corridor)',
      description: `Enterprise tech cluster at ${hubName} with high concentration of interstate engineering cohorts (${projection.workMigrantSharePercent.toFixed(1)}% work migrants); digital workplace models process corporate corpora with 99.4% parsing fidelity.`,
      gradientIntensity: isCore ? 1.0 : 0.6
    };
  }

  // 8. BASELINE INHABITED URBAN MATRIX (Darker Cool Grey #384352)
  // For wards that remain established residential enclaves:
  // Jayanagar, Basavanagudi, Banashankari, Rajajinagar, Vijayanagar, Yelahanka
  const baselineMix = Math.round(macroMixingIndex * 0.82);
  const demographicWeight = Math.max(0, Math.min(1.0,
    (cell.baselineMigrantPct / 85) * 0.40 +
    Math.max(0, 1 - cell.dCenter / 13) * 0.35 +
    t * 0.25 +
    cellJitter * 0.30
  ));

  let vectorBaseColor = '#1d232d'; // Level 1: Outer peripheral wards
  if (demographicWeight >= 0.75) {
    vectorBaseColor = '#384352'; // Level 4: Dense metropolitan core
  } else if (demographicWeight >= 0.50) {
    vectorBaseColor = '#2e3743'; // Level 3: Established urban wards
  } else if (demographicWeight >= 0.25) {
    vectorBaseColor = '#252d37'; // Level 2: Mid-ring residential
  }

  return {
    category: 'baseline-urban',
    color: vectorBaseColor,
    fillOpacity: 1.0,
    strokeColor: '#13171e',
    linguisticMixingIndex: baselineMix,
    dominantTongue: `Kannada Plurality (${cell.baselineKannadaPct.toFixed(1)}%) with Regional Transit Dialects`,
    migrantSharePct: localMigrantPct,
    aiTrackingConfidence: Math.round(65 - t * 15),
    aiWordErrorRate: Math.round(35 + t * 18),
    surveillanceLevel: 'Low',
    statusLabel: 'Bengaluru Inhabited Linguistic Grid',
    description: `Urban geographic unit of ${cell.wardName}. Established residential enclave preserving Census 2011 baseline linguistic plurality (${cell.baselineKannadaPct.toFixed(1)}% Kannada) amidst metropolitan expansion (${localMigrantPct}% migrant share).`,
    gradientIntensity: demographicWeight
  };
}
