/**
 * Bengaluru 2D Vector Spectral Cartography Engine
 * 
 * - Pure 2D Vector Aesthetic (Zero 3D bubbles / zero spherical dome gradients)
 * - Solid 2D Vector Pixels (Zero translucency / crisp quantized vector palette)
 * - Prominent 2D Vector Area & Neighborhood Badges (All areas clearly visible over the vector mesh)
 * - 2D Vector Arterial Network (Outer Ring Road loop, NICE Peripheral arc, major highway corridors)
 * - 2D Vector Water Bodies (Bellandur, Ulsoor, Sankey, Hebbal) & Green Canopies
 * - Futuristic 2D Vector Zone Boundary Rings (Thin dashed perimeters, reticle [+] epicenters, technical callouts)
 * - Edge-to-edge Bangalore framing with faint monochrome external context
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  BMRCL_STATIONS,
  BMRCL_GREEN_LINE_COORDS,
  BMRCL_PURPLE_LINE_COORDS
} from '../data/bangaloreMetroData';
import {
  generateBengaluruPixelGrid,
  getPixelMetrics,
  GRID_CONFIG,
  BBMP_BOUNDARY,
  PixelCell,
  PixelMetrics
} from '../data/bengaluruPixelGridData';
import {
  BENGALURU_AREAS,
  BENGALURU_ROADS,
  BENGALURU_LAKES,
  BENGALURU_PARKS,
  getActiveVectorZoneRings,
  VectorArea
} from '../data/bangaloreVectorGeometry';

export interface MapControllerHandles {
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
  flyTo: (lat: number, lng: number, zoom?: number) => void;
}

interface BangaloreSpectralMapProps {
  currentYear: number;
  showAreas?: boolean;
  showRoads?: boolean;
  showMetro?: boolean;
  showZoneRings?: boolean;
  onHoverPixel?: (info: { cell: PixelCell; metrics: PixelMetrics } | null) => void;
  onMapControlsReady?: (controls: MapControllerHandles) => void;
}

interface HoveredPixelInfo {
  cell: PixelCell;
  metrics: PixelMetrics;
  screenX: number;
  screenY: number;
  isPinned: boolean;
}

export const BangaloreSpectralMap: React.FC<BangaloreSpectralMapProps> = ({
  currentYear,
  showAreas: propShowAreas,
  showRoads: propShowRoads,
  showMetro: propShowMetro = true,
  showZoneRings: propShowZoneRings = true,
  onHoverPixel,
  onMapControlsReady
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cellsRef = useRef<PixelCell[]>([]);
  const cellMapRef = useRef<Map<string, PixelCell>>(new Map());
  const currentYearRef = useRef<number>(currentYear);

  currentYearRef.current = currentYear;

  // Feature group refs for dynamic timeline updates
  const zoneRingsGroupRef = useRef<L.FeatureGroup | null>(null);
  const areaLabelsGroupRef = useRef<L.FeatureGroup | null>(null);
  const roadsGroupRef = useRef<L.FeatureGroup | null>(null);
  const metroGroupRef = useRef<L.FeatureGroup | null>(null);

  // Layer visibility toggles (combining props and internal state)
  const [internalShowAreas, setInternalShowAreas] = useState<boolean>(true);
  const [internalShowRoads, setInternalShowRoads] = useState<boolean>(true);
  const showAreas = propShowAreas !== undefined ? propShowAreas : internalShowAreas;
  const showRoads = propShowRoads !== undefined ? propShowRoads : internalShowRoads;
  const showMetro = propShowMetro;
  const showZoneRings = propShowZoneRings;

  // Hovered / pinned pixel state
  const [hoveredPixel, setHoveredPixel] = useState<HoveredPixelInfo | null>(null);
  const hoveredCellIdRef = useRef<string | null>(null);
  hoveredCellIdRef.current = hoveredPixel?.cell.id ?? null;

  // Track zoom-out limit state so users know when Bangalore fits edge-to-edge
  const [isAtMinZoom, setIsAtMinZoom] = useState<boolean>(true);
  const [isAtMaxZoom, setIsAtMaxZoom] = useState<boolean>(false);

  // Initialize cells and spatial lookup map once
  if (cellsRef.current.length === 0) {
    const generated = generateBengaluruPixelGrid();
    cellsRef.current = generated;
    const mapLookup = new Map<string, PixelCell>();
    generated.forEach(c => {
      mapLookup.set(`${c.row}_${c.col}`, c);
    });
    cellMapRef.current = mapLookup;
  }

  // Fast O(1) mathematical pixel cell lookup
  const findCell = useCallback((lat: number, lng: number): PixelCell | null => {
    if (
      lat < GRID_CONFIG.minLat ||
      lat > GRID_CONFIG.maxLat ||
      lng < GRID_CONFIG.minLng ||
      lng > GRID_CONFIG.maxLng
    ) {
      return null;
    }

    const dLatSpan = (GRID_CONFIG.maxLat - GRID_CONFIG.minLat) / GRID_CONFIG.rows;
    const dLngSpan = (GRID_CONFIG.maxLng - GRID_CONFIG.minLng) / GRID_CONFIG.cols;
    const r = Math.floor((GRID_CONFIG.maxLat - lat) / dLatSpan);
    const c = Math.floor((lng - GRID_CONFIG.minLng) / dLngSpan);

    return cellMapRef.current.get(`${r}_${c}`) || null;
  }, []);

  // Draw the entire pixelated city onto the canvas with SOLID 2D VECTOR PIXELS
  const renderGrid = useCallback(() => {
    const map = mapInstanceRef.current;
    const canvas = canvasRef.current;
    if (!map || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = map.getSize();
    const dpr = window.devicePixelRatio || 1;

    // Reposition canvas to map layer origin
    const panePos = map.containerPointToLayerPoint([0, 0]);
    L.DomUtil.setPosition(canvas, panePos);

    // Keep canvas dimensions synced with container
    if (canvas.width !== size.x * dpr || canvas.height !== size.y * dpr) {
      canvas.width = size.x * dpr;
      canvas.height = size.y * dpr;
      canvas.style.width = `${size.x}px`;
      canvas.style.height = `${size.y}px`;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size.x, size.y);
    ctx.imageSmoothingEnabled = false;

    const year = currentYearRef.current;
    const activeHoverId = hoveredCellIdRef.current;

    // Screen projection from grid bounding box corners
    const pTopLeft = map.latLngToContainerPoint([GRID_CONFIG.maxLat, GRID_CONFIG.minLng]);
    const pBottomRight = map.latLngToContainerPoint([GRID_CONFIG.minLat, GRID_CONFIG.maxLng]);

    const totalW = pBottomRight.x - pTopLeft.x;
    const totalH = pBottomRight.y - pTopLeft.y;
    const cellW = totalW / GRID_CONFIG.cols;
    const cellH = totalH / GRID_CONFIG.rows;

    let hoveredRect: { x: number; y: number; w: number; h: number; color: string } | null = null;

    const cells = cellsRef.current;
    const len = cells.length;

    // 100% Solid 2D Vector Fill (Zero translucency, pure opaque vector tiles)
    ctx.globalAlpha = 1.0;

    // Render every discrete square micro-pixel belonging to Bengaluru
    for (let i = 0; i < len; i++) {
      const cell = cells[i];

      const x = Math.round(pTopLeft.x + cell.col * cellW);
      const y = Math.round(pTopLeft.y + cell.row * cellH);
      const w = Math.max(1, Math.round(pTopLeft.x + (cell.col + 1) * cellW) - x);
      const h = Math.max(1, Math.round(pTopLeft.y + (cell.row + 1) * cellH) - y);

      // Viewport culling
      if (x + w < -5 || x > size.x + 5 || y + h < -5 || y > size.y + 5) {
        continue;
      }

      const metrics = getPixelMetrics(cell, year);

      // Skip inactive outer buffer cells or cells beyond BBMP boundary
      if (metrics.fillOpacity <= 0 || metrics.category === 'outside-void' || !cell.isInsideCity) {
        continue;
      }

      const isHovered = cell.id === activeHoverId;

      // Clean discrete square pixel with micro-gutter (Swiss/Tornadoes tactile raster)
      const gap = w >= 3.6 ? 0.55 : (w >= 2.0 ? 0.35 : 0.20);
      const pxX = x + gap / 2;
      const pxY = y + gap / 2;
      const pxW = Math.max(1, w - gap);
      const pxH = Math.max(1, h - gap);

      // Draw solid 2D vector pixel
      ctx.fillStyle = metrics.color;
      ctx.fillRect(pxX, pxY, pxW, pxH);

      // Micro-border for off-grid nodes when zoomed in
      if (metrics.category === 'off-grid' && w >= 2.8) {
        ctx.strokeStyle = '#8572a8';
        ctx.lineWidth = 0.6;
        ctx.strokeRect(pxX, pxY, pxW, pxH);
      }

      if (isHovered) {
        hoveredRect = { x, y, w, h, color: metrics.color };
      }
    }

    // High-contrast crisp focus bracket for hovered / selected pixel on darker grey base
    if (hoveredRect) {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(hoveredRect.x - 0.5, hoveredRect.y - 0.5, hoveredRect.w + 1, hoveredRect.h + 1);
    }

    ctx.restore();
  }, []);

  // Update dynamic 2D futuristic vector zone rings based on current timeline year
  const updateVectorZoneRings = useCallback((year: number) => {
    const group = zoneRingsGroupRef.current;
    if (!group) return;

    group.clearLayers();
    const rings = getActiveVectorZoneRings(year);

    rings.forEach(ring => {
      // 2. Center reticle crosshair [+]
      const reticleMarker = L.marker(ring.center, {
        icon: L.divIcon({
          className: 'zone-reticle pointer-events-none',
          html: `<div class="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-mono font-bold text-xs" style="color: ${ring.color};">+</div>`,
          iconSize: [0, 0]
        }),
        interactive: false
      });
      reticleMarker.addTo(group);
    });
  }, []);

  // Unified, Non-Overlapping 2D Vector Area & Zone Labels Engine
  const updateAreaAndZoneLabels = useCallback((year: number) => {
    const map = mapInstanceRef.current;
    const group = areaLabelsGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();

    const rings = getActiveVectorZoneRings(year);
    const activeZoneMap = new Map<string, typeof rings[0]>();
    rings.forEach(r => {
      if (r.id.includes('chickpet')) activeZoneMap.set('chickpet', r);
      else if (r.id.includes('malleswaram')) activeZoneMap.set('malleswaram', r);
      else if (r.id.includes('basavanagudi')) activeZoneMap.set('basavanagudi', r);
      else if (r.id.includes('russell')) activeZoneMap.set('russell', r);
      else if (r.id.includes('ulsoor')) activeZoneMap.set('ulsoor', r);
      else if (r.id.includes('manyata')) activeZoneMap.set('manyata', r);
      else if (r.id.includes('bagmane')) activeZoneMap.set('bagmane', r);
      else if (r.id.includes('whitefield')) activeZoneMap.set('whitefield', r);
      else if (r.id.includes('ecity')) activeZoneMap.set('ecity', r);
      else if (r.id.includes('bellandur')) activeZoneMap.set('bellandur', r);
      else if (r.id.includes('fort')) activeZoneMap.set('fort', r);
    });

    type AnchorType = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-right';

    interface LabelCandidate {
      id: string;
      name: string;
      subLabel?: string;
      coordinates: [number, number];
      dotColor: string;
      priority: number; // 1 = highest
      primaryAnchor: AnchorType;
      fallbackAnchors: AnchorType[];
    }

    const getZoneSubLabel = (zoneKey: string): string | undefined => {
      if (year <= 2026) return undefined;
      const z = activeZoneMap.get(zoneKey);
      return z ? z.statusText : undefined;
    };

    const getZoneDotColor = (zoneKey: string, defaultColor: string): string => {
      if (year <= 2026) return '#94a3b8';
      const z = activeZoneMap.get(zoneKey);
      return z ? z.color : defaultColor;
    };

    const candidates: LabelCandidate[] = [
      // 1. ACTIVE VECTOR ZONE HUBS (Neutral landmarks at opening, zone sublabels emerge as timeline moves)
      {
        id: 'zone-chickpet',
        name: 'Chickpet',
        subLabel: getZoneSubLabel('chickpet'),
        coordinates: [12.9698, 77.5750],
        dotColor: getZoneDotColor('chickpet', '#2b998a'),
        priority: 1,
        primaryAnchor: 'right',
        fallbackAnchors: ['bottom-right', 'top-right']
      },
      {
        id: 'zone-malleswaram',
        name: 'Malleswaram',
        subLabel: getZoneSubLabel('malleswaram'),
        coordinates: [13.0033, 77.5702],
        dotColor: getZoneDotColor('malleswaram', '#2b998a'),
        priority: 1,
        primaryAnchor: 'left',
        fallbackAnchors: ['top-left', 'bottom-left']
      },
      {
        id: 'zone-basavanagudi',
        name: 'Basavanagudi',
        subLabel: getZoneSubLabel('basavanagudi'),
        coordinates: [12.9430, 77.5740],
        dotColor: getZoneDotColor('basavanagudi', '#2b998a'),
        priority: 1,
        primaryAnchor: 'left',
        fallbackAnchors: ['bottom-left', 'top-left']
      },
      {
        id: 'zone-russell',
        name: 'Russell Market',
        subLabel: getZoneSubLabel('russell'),
        coordinates: [12.9842, 77.6048],
        dotColor: getZoneDotColor('russell', '#2b998a'),
        priority: 1,
        primaryAnchor: 'top',
        fallbackAnchors: ['top-right', 'right']
      },
      {
        id: 'zone-whitefield',
        name: 'Whitefield',
        subLabel: getZoneSubLabel('whitefield'),
        coordinates: [12.9698, 77.7500],
        dotColor: getZoneDotColor('whitefield', year >= 2044 ? '#b05831' : '#b84e47'),
        priority: 1,
        primaryAnchor: 'right',
        fallbackAnchors: ['bottom-right', 'top-right']
      },
      {
        id: 'zone-ecity',
        name: 'Electronic City',
        subLabel: getZoneSubLabel('ecity'),
        coordinates: [12.8450, 77.6650],
        dotColor: getZoneDotColor('ecity', year >= 2044 ? '#b05831' : '#b84e47'),
        priority: 1,
        primaryAnchor: 'right',
        fallbackAnchors: ['bottom-right', 'top-right']
      },
      {
        id: 'zone-bellandur',
        name: 'Bellandur',
        subLabel: getZoneSubLabel('bellandur'),
        coordinates: [12.9340, 77.6690],
        dotColor: getZoneDotColor('bellandur', year >= 2044 ? '#b05831' : '#b84e47'),
        priority: 1,
        primaryAnchor: 'bottom-right',
        fallbackAnchors: ['right', 'bottom']
      },
      {
        id: 'zone-manyata',
        name: 'Manyata',
        subLabel: getZoneSubLabel('manyata'),
        coordinates: [13.0500, 77.6210],
        dotColor: getZoneDotColor('manyata', '#487eb3'),
        priority: 1,
        primaryAnchor: 'right',
        fallbackAnchors: ['top-right', 'top']
      },
      {
        id: 'zone-bagmane',
        name: 'Bagmane',
        subLabel: getZoneSubLabel('bagmane'),
        coordinates: [12.9780, 77.6620],
        dotColor: getZoneDotColor('bagmane', '#487eb3'),
        priority: 2,
        primaryAnchor: 'right',
        fallbackAnchors: ['top-right', 'bottom-right']
      },
      {
        id: 'zone-fort',
        name: 'Fort',
        subLabel: year > 2026 ? 'Off-Grid' : undefined,
        coordinates: [12.9620, 77.5760],
        dotColor: year > 2026 ? '#8572a8' : '#94a3b8',
        priority: 1,
        primaryAnchor: 'bottom-left',
        fallbackAnchors: ['bottom', 'left']
      },
      // 2. MAJOR LANDMARK NODES (Strategically Offset from Neighbors)
      {
        id: 'area-majestic',
        name: 'Majestic',
        coordinates: [12.9778, 77.5725],
        dotColor: '#94a3b8',
        priority: 2,
        primaryAnchor: 'top-left', // Points northwest, safely away from Chickpet (east) and Fort (south)
        fallbackAnchors: ['top', 'left']
      },
      {
        id: 'area-mg-road',
        name: 'MG Road',
        coordinates: [12.9754, 77.6066],
        dotColor: '#94a3b8',
        priority: 2,
        primaryAnchor: 'bottom', // Points south, safely away from Russell Market (north)
        fallbackAnchors: ['bottom-right', 'right']
      },
      {
        id: 'area-hebbal',
        name: 'Hebbal',
        coordinates: [13.0358, 77.5970],
        dotColor: '#94a3b8',
        priority: 2,
        primaryAnchor: 'top',
        fallbackAnchors: ['top-left', 'left']
      },
      {
        id: 'area-indiranagar',
        name: 'Indiranagar',
        coordinates: [12.9719, 77.6412],
        dotColor: '#94a3b8',
        priority: 2,
        primaryAnchor: 'top-right',
        fallbackAnchors: ['top', 'right']
      },
      {
        id: 'area-jayanagar',
        name: 'Jayanagar',
        coordinates: [12.9300, 77.5830],
        dotColor: '#94a3b8',
        priority: 2,
        primaryAnchor: 'bottom-right', // Points southeast, cleanly away from Basavanagudi (northwest)
        fallbackAnchors: ['bottom', 'right']
      },
      {
        id: 'area-yeshwanthpur',
        name: 'Yeshwanthpur',
        coordinates: [13.0235, 77.5498],
        dotColor: '#94a3b8',
        priority: 3,
        primaryAnchor: 'left',
        fallbackAnchors: ['top-left', 'bottom-left']
      },
      {
        id: 'area-koramangala',
        name: 'Koramangala',
        coordinates: [12.9352, 77.6245],
        dotColor: '#94a3b8',
        priority: 3,
        primaryAnchor: 'top',
        fallbackAnchors: ['top-left', 'left']
      },
      {
        id: 'area-silk-board',
        name: 'Silk Board',
        coordinates: [12.9177, 77.6238],
        dotColor: '#94a3b8',
        priority: 3,
        primaryAnchor: 'bottom',
        fallbackAnchors: ['bottom-left', 'left']
      },
      {
        id: 'area-peenya',
        name: 'Peenya',
        subLabel: year >= 2030 ? 'Shop-Floor Cant' : undefined,
        coordinates: [13.0380, 77.5200],
        dotColor: year >= 2030 ? '#2b998a' : '#94a3b8',
        priority: 2,
        primaryAnchor: 'left',
        fallbackAnchors: ['top-left', 'bottom-left']
      }
    ];

    if (year >= 2030) {
      candidates.push({
        id: 'zone-ulsoor',
        name: 'Ulsoor',
        subLabel: 'Off-Grid',
        coordinates: [12.9818, 77.6252],
        dotColor: '#8572a8',
        priority: 2,
        primaryAnchor: 'top',
        fallbackAnchors: ['top-right', 'right']
      });
    }

    candidates.sort((a, b) => a.priority - b.priority);

    // Dynamic 2D Bounding Box Collision Engine
    interface PlacedBox {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    }
    const placedBoxes: PlacedBox[] = [];

    const getBoxForAnchor = (
      pt: L.Point,
      anchor: AnchorType,
      w: number,
      h: number
    ): { box: PlacedBox; cssClasses: string } => {
      let x1 = 0, y1 = 0;
      let cssClasses = '';

      switch (anchor) {
        case 'right':
          x1 = pt.x + 8;
          y1 = pt.y - h / 2;
          cssClasses = 'left-2 top-1/2 -translate-y-1/2';
          break;
        case 'left':
          x1 = pt.x - 8 - w;
          y1 = pt.y - h / 2;
          cssClasses = 'right-2 top-1/2 -translate-y-1/2';
          break;
        case 'top':
          x1 = pt.x - w / 2;
          y1 = pt.y - 8 - h;
          cssClasses = 'bottom-2 left-1/2 -translate-x-1/2';
          break;
        case 'bottom':
          x1 = pt.x - w / 2;
          y1 = pt.y + 8;
          cssClasses = 'top-2 left-1/2 -translate-x-1/2';
          break;
        case 'top-left':
          x1 = pt.x - 6 - w;
          y1 = pt.y - 6 - h;
          cssClasses = 'right-1.5 bottom-1.5';
          break;
        case 'top-right':
          x1 = pt.x + 6;
          y1 = pt.y - 6 - h;
          cssClasses = 'left-1.5 bottom-1.5';
          break;
        case 'bottom-left':
          x1 = pt.x - 6 - w;
          y1 = pt.y + 6;
          cssClasses = 'right-1.5 top-1.5';
          break;
        case 'bottom-right':
          x1 = pt.x + 6;
          y1 = pt.y + 6;
          cssClasses = 'left-1.5 top-1.5';
          break;
      }

      return {
        box: { x1, y1, x2: x1 + w, y2: y1 + h },
        cssClasses
      };
    };

    const isColliding = (b: PlacedBox): boolean => {
      const padding = 6;
      return placedBoxes.some(
        p => !(b.x2 + padding < p.x1 || b.x1 - padding > p.x2 || b.y2 + padding < p.y1 || b.y1 - padding > p.y2)
      );
    };

    candidates.forEach(c => {
      const pt = map.latLngToContainerPoint(c.coordinates);
      const labelW = c.subLabel ? 98 : 72;
      const labelH = 22;

      const anchorsToTry = [c.primaryAnchor, ...c.fallbackAnchors];
      let chosenBox: PlacedBox | null = null;
      let chosenCss = '';

      for (const a of anchorsToTry) {
        const { box, cssClasses } = getBoxForAnchor(pt, a, labelW, labelH);
        if (!isColliding(box)) {
          chosenBox = box;
          chosenCss = cssClasses;
          break;
        }
      }

      // If priority 1 zone still collides, force placement with primary anchor
      if (!chosenBox && c.priority === 1) {
        const { box, cssClasses } = getBoxForAnchor(pt, c.primaryAnchor, labelW, labelH);
        chosenBox = box;
        chosenCss = cssClasses;
      }

      if (!chosenBox) return; // Suppress colliding lower-priority badge

      placedBoxes.push(chosenBox);

      // Create crisp, high-contrast, non-overlapping label marker
      const marker = L.marker(c.coordinates, {
        icon: L.divIcon({
          className: 'custom-area-vector-label pointer-events-auto',
          html: `
            <div class="relative flex items-center select-none pointer-events-auto">
              <span class="absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 ring-2 ring-slate-900 shadow-sm shrink-0" style="background-color: ${c.dotColor};"></span>
              <div class="absolute ${chosenCss} flex items-center gap-1.5 px-2 py-0.5 rounded bg-white text-slate-900 border border-slate-300 shadow-[0_2px_8px_rgba(0,0,0,0.45)] cursor-pointer group hover:border-slate-500 hover:shadow-lg hover:scale-105 transition-all">
                <span class="w-1.5 h-1.5 rounded-full shrink-0 shadow-xs" style="background-color: ${c.dotColor};"></span>
                <span class="font-sans text-[10px] font-bold text-slate-800 tracking-tight whitespace-nowrap">${c.name}</span>
                ${c.subLabel ? `<span class="font-mono text-[8.5px] font-medium text-slate-500 whitespace-nowrap pl-1 border-l border-slate-200">${c.subLabel}</span>` : ''}
              </div>
            </div>
          `,
          iconSize: [0, 0]
        })
      });

      marker.on('click', () => {
        const cell = findCell(c.coordinates[0], c.coordinates[1]);
        if (cell) {
          const metrics = getPixelMetrics(cell, currentYearRef.current);
          const screenPt = map.latLngToContainerPoint(c.coordinates);
          setHoveredPixel({
            cell,
            metrics,
            screenX: screenPt.x,
            screenY: screenPt.y,
            isPinned: true
          });
        }
      });

      marker.addTo(group);
    });
  }, [findCell]);

  // Initialize Leaflet Map ONCE on mount
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Tightly cropped to Bengaluru metropolitan boundary
    const bSouthWest = L.latLng(GRID_CONFIG.minLat, GRID_CONFIG.minLng);
    const bNorthEast = L.latLng(GRID_CONFIG.maxLat, GRID_CONFIG.maxLng);
    const bounds = L.latLngBounds(bSouthWest, bNorthEast);

    const map = L.map(mapContainerRef.current, {
      center: [12.9600, 77.6150],
      zoomSnap: 0.1,
      zoomDelta: 0.5,
      wheelPxPerZoomLevel: 100,
      minZoom: 1, // Will be strictly locked to edge-to-edge fitZoom below
      maxZoom: 16.5,
      maxBounds: bounds.pad(0.18), // Focused on Bengaluru while revealing surrounding regional geography
      maxBoundsViscosity: 0.85,
      zoomControl: false,
      attributionControl: false
    });

    // Fit bounds so Bengaluru map fits on screen edge to edge with some gap around
    const getViewportPadding = () => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      return {
        paddingTopLeft: [isMobile ? 18 : 32, isMobile ? 16 : 24] as [number, number],
        paddingBottomRight: [isMobile ? 18 : 32, isMobile ? 54 : 64] as [number, number]
      };
    };
    const vpPad = getViewportPadding();
    map.fitBounds(bounds, {
      paddingTopLeft: vpPad.paddingTopLeft,
      paddingBottomRight: vpPad.paddingBottomRight,
      animate: false
    });

    // CRITICAL: Lock zoom out limit so user cannot zoom out further than edge-to-edge fit
    const initialFitZoom = map.getZoom();
    map.setMinZoom(initialFitZoom);

    // 1. Outside Regional Map Pane: Faint Greyscale OSM tile layer
    const greyscalePane = map.createPane('greyscaleTilePane');
    greyscalePane.style.zIndex = '190';
    greyscalePane.className = 'leaflet-pane osm-faint-greyscale';

    const greyscaleTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      subdomains: ['a', 'b', 'c'],
      maxZoom: 19,
      pane: 'greyscaleTilePane'
    });
    greyscaleTileLayer.addTo(map);

    // 2. Municipal Boundary Line: Subtle dashed cartographic border separating Bengaluru from outside
    const boundaryPane = map.createPane('cityBoundaryPane');
    boundaryPane.style.zIndex = '240';
    boundaryPane.style.pointerEvents = 'none';

    const cityBoundary = L.polygon(BBMP_BOUNDARY, {
      pane: 'cityBoundaryPane',
      fill: false,
      stroke: true,
      color: '#94a3b8',
      weight: 1.5,
      opacity: 0.85,
      dashArray: '4, 4',
      interactive: false,
      className: 'pointer-events-none'
    });
    cityBoundary.addTo(map);

    // 3. Pixel Grid Pane (Middle layer: Solid 2D Vector Data field inside Bengaluru)
    const gridPane = map.createPane('pixelGridPane');
    gridPane.style.zIndex = '260';
    gridPane.style.pointerEvents = 'none';

    const canvas = document.createElement('canvas');
    canvas.className = 'leaflet-pixel-grid-canvas';
    canvas.style.position = 'absolute';
    canvas.style.pointerEvents = 'none';
    gridPane.appendChild(canvas);
    canvasRef.current = canvas;

    // 4. 2D Vector Arterial Road Network Pane (Above the pixels)
    const roadsPane = map.createPane('vectorRoadsPane');
    roadsPane.style.zIndex = '290';
    roadsPane.style.pointerEvents = 'none';

    const roadsGroup = L.featureGroup([], { pane: 'vectorRoadsPane' }).addTo(map);
    roadsGroupRef.current = roadsGroup;

    BENGALURU_ROADS.forEach(road => {
      const line = L.polyline(road.coordinates, {
        color: road.color,
        weight: road.weight,
        opacity: 0.80,
        dashArray: road.dashArray,
        className: 'pointer-events-none'
      });
      line.addTo(roadsGroup);
    });

    // 5. 2D Vector Lakes & Parks Pane
    const lakesPane = map.createPane('vectorLakesPane');
    lakesPane.style.zIndex = '295';
    lakesPane.style.pointerEvents = 'none';

    const lakesGroup = L.featureGroup([], { pane: 'vectorLakesPane' }).addTo(map);

    BENGALURU_LAKES.forEach(lake => {
      const poly = L.polygon(lake.coordinates, {
        color: '#5b8e9f',
        weight: 1.2,
        opacity: 0.70,
        fill: true,
        fillColor: '#88b5c7',
        fillOpacity: 0.35,
        className: 'pointer-events-none'
      });
      poly.addTo(lakesGroup);
    });

    BENGALURU_PARKS.forEach(park => {
      const poly = L.polygon(park.coordinates, {
        color: '#5e946f',
        weight: 1.2,
        opacity: 0.70,
        fill: true,
        fillColor: '#8dbfa0',
        fillOpacity: 0.30,
        className: 'pointer-events-none'
      });
      poly.addTo(lakesGroup);
    });

    // 6. Metro Network Pane (Fixed reference skeleton running above the vector mesh)
    const metroPane = map.createPane('metroSkeletonPane');
    metroPane.style.zIndex = '320';
    metroPane.style.pointerEvents = 'none';

    const metroGroup = L.featureGroup([], { pane: 'metroSkeletonPane' }).addTo(map);

    // Purple Line (Challaghatta ↔ Whitefield)
    const purpleTrack = L.polyline(BMRCL_PURPLE_LINE_COORDS, {
      color: '#7b68a6',
      weight: 2.2,
      opacity: 0.75,
      className: 'pointer-events-none'
    });
    purpleTrack.addTo(metroGroup);

    // Green Line (Madavara ↔ Silk Institute)
    const greenTrack = L.polyline(BMRCL_GREEN_LINE_COORDS, {
      color: '#3d8f68',
      weight: 2.2,
      opacity: 0.75,
      className: 'pointer-events-none'
    });
    greenTrack.addTo(metroGroup);

    // Key Metro Stations
    BMRCL_STATIONS.forEach(station => {
      const isInterchange = station.isInterchange;
      const marker = L.circleMarker(station.coordinates, {
        radius: isInterchange ? 3.8 : 2.2,
        color: isInterchange ? '#1e293b' : '#64748b',
        weight: isInterchange ? 1.4 : 0.8,
        fillColor: '#ffffff',
        fillOpacity: 1.0,
        opacity: 0.90,
        className: 'pointer-events-none'
      });
      marker.addTo(metroGroup);
    });
    metroGroupRef.current = metroGroup;

    // 7. 2D Futuristic Vector Zone Rings Pane
    const zoneRingsPane = map.createPane('vectorZoneRingsPane');
    zoneRingsPane.style.zIndex = '340';
    zoneRingsPane.style.pointerEvents = 'none';

    const zoneRingsGroup = L.featureGroup([], { pane: 'vectorZoneRingsPane' }).addTo(map);
    zoneRingsGroupRef.current = zoneRingsGroup;
    updateVectorZoneRings(currentYearRef.current);

    // 8. 2D Vector Area & Neighborhood Badges Pane (Concise, Legible, Professional)
    const areasPane = map.createPane('areaLabelsPane');
    areasPane.style.zIndex = '360';
    areasPane.style.pointerEvents = 'auto';

    const areaLabelsGroup = L.featureGroup([], { pane: 'areaLabelsPane' }).addTo(map);
    areaLabelsGroupRef.current = areaLabelsGroup;
    updateAreaAndZoneLabels(currentYearRef.current);

    // Map repaint listeners: renderGrid on rapid moves; collision re-eval on zoom/moveend
    const handleMapRepaint = () => {
      renderGrid();
    };
    const handleMapZoomOrMove = () => {
      renderGrid();
      updateAreaAndZoneLabels(currentYearRef.current);
    };

    map.on('move', handleMapRepaint);
    map.on('moveend', handleMapZoomOrMove);
    map.on('zoom', handleMapRepaint);
    map.on('zoomend', handleMapZoomOrMove);
    map.on('viewreset', handleMapZoomOrMove);
    map.on('resize', handleMapZoomOrMove);

    const handleMouseMove = (e: L.LeafletMouseEvent) => {
      const cell = findCell(e.latlng.lat, e.latlng.lng);
      if (cell) {
        const metrics = getPixelMetrics(cell, currentYearRef.current);
        if (metrics.category !== 'outside-void' && metrics.fillOpacity > 0) {
          setHoveredPixel(prev => {
            if (prev?.isPinned) return prev;
            return {
              cell,
              metrics,
              screenX: e.originalEvent.clientX,
              screenY: e.originalEvent.clientY,
              isPinned: false
            };
          });
          return;
        }
      }

      setHoveredPixel(prev => (prev?.isPinned ? prev : null));
    };

    const handleMouseClick = (e: L.LeafletMouseEvent) => {
      const cell = findCell(e.latlng.lat, e.latlng.lng);
      if (cell) {
        const metrics = getPixelMetrics(cell, currentYearRef.current);
        if (metrics.category !== 'outside-void' && metrics.fillOpacity > 0) {
          setHoveredPixel({
            cell,
            metrics,
            screenX: e.originalEvent.clientX,
            screenY: e.originalEvent.clientY,
            isPinned: true
          });
          return;
        }
      }
      setHoveredPixel(null);
    };

    const handleMouseOut = () => {
      setHoveredPixel(prev => (prev?.isPinned ? prev : null));
    };

    map.on('mousemove', handleMouseMove);
    map.on('click', handleMouseClick);
    map.on('mouseout', handleMouseOut);

    // Sync zoom button enabled states
    const updateZoomButtons = () => {
      const z = map.getZoom();
      const minZ = map.getMinZoom();
      const maxZ = map.getMaxZoom();
      setIsAtMinZoom(z <= minZ + 0.05);
      setIsAtMaxZoom(z >= maxZ - 0.05);
    };

    map.on('zoom', updateZoomButtons);
    map.on('zoomend', updateZoomButtons);
    updateZoomButtons();

    const resizeObserver = new ResizeObserver(() => {
      if (!mapContainerRef.current || !mapInstanceRef.current) return;
      const m = mapInstanceRef.current;
      const currentZoom = m.getZoom();
      const currentMin = m.getMinZoom();
      const wasAtMin = Math.abs(currentZoom - currentMin) < 0.20;

      m.invalidateSize();
      m.setMinZoom(1); // Release minZoom temporarily to fit the new viewport

      const currentPad = getViewportPadding();
      m.fitBounds(bounds, {
        paddingTopLeft: currentPad.paddingTopLeft,
        paddingBottomRight: currentPad.paddingBottomRight,
        animate: false
      });
      const newFitZoom = m.getZoom();
      m.setMinZoom(newFitZoom);

      if (!wasAtMin && currentZoom > newFitZoom) {
        m.setZoom(currentZoom);
      }

      renderGrid();
      updateZoomButtons();
    });
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    mapInstanceRef.current = map;
    renderGrid();

    return () => {
      resizeObserver.disconnect();
      map.off('move', handleMapRepaint);
      map.off('zoom', handleMapRepaint);
      map.off('viewreset', handleMapRepaint);
      map.off('resize', handleMapRepaint);
      map.off('mousemove', handleMouseMove);
      map.off('click', handleMouseClick);
      map.off('mouseout', handleMouseOut);
      map.off('zoom', updateZoomButtons);
      map.off('zoomend', updateZoomButtons);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [renderGrid, updateVectorZoneRings, updateAreaAndZoneLabels]);

  // Redraw canvas, vector rings, and area labels whenever timeline year updates
  useEffect(() => {
    renderGrid();
    updateVectorZoneRings(currentYear);
    updateAreaAndZoneLabels(currentYear);
    if (hoveredPixel) {
      const updatedMetrics = getPixelMetrics(hoveredPixel.cell, currentYear);
      setHoveredPixel(prev => (prev ? { ...prev, metrics: updatedMetrics } : null));
    }
  }, [currentYear, renderGrid, updateVectorZoneRings, updateAreaAndZoneLabels]);

  // Sync visibility toggles
  useEffect(() => {
    if (areaLabelsGroupRef.current) {
      if (showAreas) {
        mapInstanceRef.current?.addLayer(areaLabelsGroupRef.current);
      } else {
        mapInstanceRef.current?.removeLayer(areaLabelsGroupRef.current);
      }
    }
  }, [showAreas]);

  useEffect(() => {
    if (roadsGroupRef.current) {
      if (showRoads) {
        mapInstanceRef.current?.addLayer(roadsGroupRef.current);
      } else {
        mapInstanceRef.current?.removeLayer(roadsGroupRef.current);
      }
    }
  }, [showRoads]);

  useEffect(() => {
    if (metroGroupRef.current && mapInstanceRef.current) {
      if (showMetro) {
        if (!mapInstanceRef.current.hasLayer(metroGroupRef.current)) {
          mapInstanceRef.current.addLayer(metroGroupRef.current);
        }
      } else {
        if (mapInstanceRef.current.hasLayer(metroGroupRef.current)) {
          mapInstanceRef.current.removeLayer(metroGroupRef.current);
        }
      }
    }
  }, [showMetro]);

  useEffect(() => {
    if (zoneRingsGroupRef.current && mapInstanceRef.current) {
      if (showZoneRings) {
        if (!mapInstanceRef.current.hasLayer(zoneRingsGroupRef.current)) {
          mapInstanceRef.current.addLayer(zoneRingsGroupRef.current);
        }
      } else {
        if (mapInstanceRef.current.hasLayer(zoneRingsGroupRef.current)) {
          mapInstanceRef.current.removeLayer(zoneRingsGroupRef.current);
        }
      }
    }
  }, [showZoneRings]);

  // Transmit hovered or clicked pixel to external callback (for Legend sidebar inspection)
  useEffect(() => {
    if (onHoverPixel) {
      if (hoveredPixel) {
        onHoverPixel({ cell: hoveredPixel.cell, metrics: hoveredPixel.metrics });
      } else {
        onHoverPixel(null);
      }
    }
  }, [hoveredPixel, onHoverPixel]);

  // Expose map controller handles to left button sidebar
  useEffect(() => {
    if (!onMapControlsReady || !mapInstanceRef.current) return;
    onMapControlsReady({
      zoomIn: () => {
        if (mapInstanceRef.current && !isAtMaxZoom) {
          mapInstanceRef.current.zoomIn();
        }
      },
      zoomOut: () => {
        if (mapInstanceRef.current && !isAtMinZoom) {
          mapInstanceRef.current.zoomOut();
        }
      },
      resetView: () => {
        if (mapInstanceRef.current) {
          const bSouthWest = L.latLng(GRID_CONFIG.minLat, GRID_CONFIG.minLng);
          const bNorthEast = L.latLng(GRID_CONFIG.maxLat, GRID_CONFIG.maxLng);
          const bounds = L.latLngBounds(bSouthWest, bNorthEast);
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
          mapInstanceRef.current.fitBounds(bounds, {
            paddingTopLeft: [isMobile ? 18 : 32, isMobile ? 16 : 24],
            paddingBottomRight: [isMobile ? 18 : 32, isMobile ? 54 : 64],
            animate: true
          });
        }
      },
      flyTo: (lat: number, lng: number, zoom = 14) => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([lat, lng], zoom, { duration: 1.2 });
        }
      }
    });
  }, [onMapControlsReady, isAtMaxZoom, isAtMinZoom]);

  return (
    <div className="relative w-full h-full bg-[#151b24] overflow-hidden select-none">
      
      {/* 1. Bengaluru cartographic viewport focused on the city */}
      <div
        ref={mapContainerRef}
        className="w-full h-full isolate cursor-crosshair bg-[#151b24]"
      />

      {/* Floating Pixel Data Inspector Card (on hover/click) */}
      {hoveredPixel && (
        <div
          className={`fixed z-50 transform -translate-x-1/2 -translate-y-full mb-3 px-3.5 py-3 bg-[#07090e]/95 border border-white/20 backdrop-blur-md shadow-2xl rounded-xs max-w-sm ${
            hoveredPixel.isPinned ? 'pointer-events-auto ring-1 ring-cyan-400/50' : 'pointer-events-none'
          }`}
          style={{
            left: hoveredPixel.screenX,
            top: hoveredPixel.screenY - 12
          }}
        >
          {/* Header row */}
          <div className="flex items-center justify-between gap-3 mb-1">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 shrink-0"
                style={{ backgroundColor: hoveredPixel.metrics.color }}
              />
              <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-300 font-semibold truncate">
                {hoveredPixel.metrics.statusLabel}
              </span>
            </div>

            {hoveredPixel.isPinned && (
              <button
                onClick={() => setHoveredPixel(null)}
                className="text-slate-400 hover:text-white text-xs px-1 hover:bg-white/10 rounded-xs transition-colors"
                title="Dismiss"
              >
                ✕
              </button>
            )}
          </div>

          {/* Ward Name & Coordinate */}
          <div className="text-xs font-sans font-bold text-white tracking-tight leading-snug">
            {hoveredPixel.cell.wardName}
          </div>
          <div className="text-[9px] font-mono text-slate-400 mb-2">
            Bengaluru Unit [R{hoveredPixel.cell.row}, C{hoveredPixel.cell.col}] · {hoveredPixel.cell.sectorTag}
          </div>

          {/* Quantitative Metrics Grid */}
          <div className="grid grid-cols-2 gap-1.5 py-1.5 border-y border-white/10 text-[9px] font-mono mb-2">
            <div>
              <span className="text-slate-500 block">MIXING INDEX:</span>
              <span className="text-slate-200 font-semibold">{hoveredPixel.metrics.linguisticMixingIndex}%</span>
            </div>
            <div>
              <span className="text-slate-500 block">MIGRANT SHARE:</span>
              <span className="text-slate-200 font-semibold">{hoveredPixel.metrics.migrantSharePct}%</span>
            </div>
            <div>
              <span className="text-slate-500 block">AI WORD ERROR:</span>
              <span className="text-slate-200 font-semibold">{hoveredPixel.metrics.aiWordErrorRate}%</span>
            </div>
            <div>
              <span className="text-slate-500 block">SURVEILLANCE:</span>
              <span className={`font-semibold ${hoveredPixel.metrics.surveillanceLevel === 'None' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {hoveredPixel.metrics.surveillanceLevel}
              </span>
            </div>
          </div>

          {/* Dominant Tongue */}
          <div className="text-[10px] text-slate-300 font-sans leading-tight mb-1">
            <span className="text-slate-500 text-[9px] font-mono">TONGUE: </span>
            {hoveredPixel.metrics.dominantTongue}
          </div>

          {/* Factual Context */}
          <div className="text-[9px] font-mono text-slate-400 leading-relaxed border-t border-white/5 pt-1">
            {hoveredPixel.metrics.description}
          </div>
        </div>
      )}

      {/* Clean zoom buttons in top right corner of the map */}
      <div className="absolute top-3 right-4 z-20 pointer-events-auto flex items-center bg-[#141b25]/90 border border-white/10 backdrop-blur-md rounded-xs text-xs font-mono shadow-md">
        <button
          onClick={() => {
            if (mapInstanceRef.current && !isAtMaxZoom) {
              mapInstanceRef.current.zoomIn();
            }
          }}
          disabled={isAtMaxZoom}
          className={`w-7 h-7 flex items-center justify-center transition-colors ${
            isAtMaxZoom
              ? 'text-slate-600 cursor-not-allowed opacity-40'
              : 'text-slate-300 hover:text-white cursor-pointer'
          }`}
          title={isAtMaxZoom ? "Maximum zoom level reached" : "Zoom In (+)"}
        >
          +
        </button>
        <div className="w-px h-3 bg-white/10" />
        <button
          onClick={() => {
            if (mapInstanceRef.current && !isAtMinZoom) {
              mapInstanceRef.current.zoomOut();
            }
          }}
          disabled={isAtMinZoom}
          className={`w-7 h-7 flex items-center justify-center transition-colors ${
            isAtMinZoom
              ? 'text-slate-600 cursor-not-allowed opacity-40'
              : 'text-slate-300 hover:text-white cursor-pointer'
          }`}
          title={isAtMinZoom ? "Zoom out limit reached" : "Zoom Out (−)"}
        >
          −
        </button>
      </div>

    </div>
  );
};
