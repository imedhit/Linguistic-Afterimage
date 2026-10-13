import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface IntroLandingPageProps {
  onExplore: () => void;
}

export const IntroLandingPage: React.FC<IntroLandingPageProps> = ({ onExplore }) => {
  const [headlinePart1] = useState('linguistic');
  const [headlinePart2] = useState('after image');

  const containerRef = useRef<HTMLDivElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const extendedSectionRef = useRef<HTMLElement | null>(null);
  const extendedCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [hoverPos, setHoverPos] = useState<{ col: number; row: number } | null>(null);
  const [extendedHoverPos, setExtendedHoverPos] = useState<{ col: number; row: number } | null>(null);

  // Exact colors from reference image and 2nd page map chassis
  const COLOR_LIGHT = '#e3e5e8';   // Crisp technical off-white/light grey field from reference
  const COLOR_DARK = '#151b24';    // Exact 2nd page map grey chassis
  const COLOR_WHITE = '#ffffff';   // Stepped white border pixel blocks
  const COLOR_GRID_LIGHT = 'rgba(0, 0, 0, 0.04)';
  const COLOR_GRID_DARK = 'rgba(255, 255, 255, 0.04)';
  const COLOR_HOVER = '#1d2f4d';   // Interactive hover cell deep navy/blue accent
  const COLOR_HOVER_BORDER = '#38639e';

  // Pixel box style matching 1st page dark/greyish blue (#151b24) with grid lines
  const pixelBoxGridStyle: React.CSSProperties = {
    backgroundColor: '#151b24',
    backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.07) 1px, transparent 1px)`,
    backgroundSize: '20px 20px',
  };

  // Helper to calculate cell size: reduced by 30% from previous size
  const getCellSize = (w: number) => {
    const base = Math.max(24, Math.min(32, Math.floor(w / 42)));
    return Math.max(16, Math.min(23, Math.round(base * 0.70))); // 30% smaller pixel boxes
  };

  // Draw the cellular Minesweeper / organic pixel map background for the Hero section
  const drawBackground = useCallback((
    canvas: HTMLCanvasElement,
    currentHover: { col: number; row: number } | null
  ) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const cellSize = getCellSize(width);
    const cols = Math.ceil(width / cellSize) + 1;
    const rows = Math.ceil(height / cellSize) + 1;

    // 1. Compute 2D grid matrix: 0 = Light, 1 = Dark, 2 = White block
    // We map out the organic territory contour from the reference image
    const grid: number[][] = [];

    // Helper to calculate main coastline row for a given column ratio u (0 to 1)
    const getCoastRow = (u: number): number => {
      if (u < 0.12) {
        return Math.floor(rows * 0.54);
      } else if (u < 0.22) {
        return Math.floor(rows * 0.62);
      } else if (u < 0.32) {
        return Math.floor(rows * 0.54);
      } else if (u < 0.40) {
        return Math.floor(rows * 0.46);
      } else if (u < 0.52) {
        return Math.floor(rows * 0.40);
      } else if (u < 0.65) {
        return Math.floor(rows * 0.34);
      } else if (u < 0.78) {
        return Math.floor(rows * 0.42);
      } else if (u < 0.88) {
        return Math.floor(rows * 0.50);
      } else {
        return Math.floor(rows * 0.56);
      }
    };

    // Initialize all cells as 0 (Light)
    for (let r = 0; r < rows; r++) {
      grid[r] = [];
      for (let c = 0; c < cols; c++) {
        grid[r][c] = 0;
      }
    }

    // Fill dark territory below the stepped coastline
    for (let c = 0; c < cols; c++) {
      const u = c / cols;
      const coastRow = getCoastRow(u);

      for (let r = coastRow; r < rows; r++) {
        grid[r][c] = 1; // Dark
      }
    }

    // 2. Carve out a light inlet in bottom right
    for (let c = Math.floor(cols * 0.72); c < cols; c++) {
      const u = c / cols;
      const inletCoast = Math.floor(rows * (0.64 + (u - 0.72) * 0.45));
      for (let r = inletCoast; r < rows; r++) {
        grid[r][c] = 0; // Light inlet
      }
    }

    // Small peninsula in bottom right
    const penStartC = Math.floor(cols * 0.82);
    const penEndC = Math.floor(cols * 0.94);
    for (let c = penStartC; c < penEndC; c++) {
      for (let r = Math.floor(rows * 0.74); r < Math.floor(rows * 0.82); r++) {
        if (r < rows && c < cols) {
          grid[r][c] = 1; // Dark peninsula
        }
      }
    }

    // 3. Add white pixel blocks (value 2) along the coast and inlets
    const addWhiteBlock = (cNorm: number, rOffsetFromCoast: number) => {
      const c = Math.floor(cols * cNorm);
      if (c >= 0 && c < cols) {
        const coast = getCoastRow(cNorm);
        const r = coast + rOffsetFromCoast;
        if (r >= 0 && r < rows) {
          grid[r][c] = 2; // White tile
        }
      }
    };

    // Stepped white blocks along the main coastline
    addWhiteBlock(0.10, 0);
    addWhiteBlock(0.14, 1);
    addWhiteBlock(0.18, 0);
    addWhiteBlock(0.24, 0);
    addWhiteBlock(0.28, 1);
    addWhiteBlock(0.34, 0);
    addWhiteBlock(0.42, 1);
    addWhiteBlock(0.45, 0);
    addWhiteBlock(0.48, 1);
    addWhiteBlock(0.70, 0);
    addWhiteBlock(0.76, 1);
    addWhiteBlock(0.80, 0);
    addWhiteBlock(0.85, 1);
    addWhiteBlock(0.89, 0);

    // White blocks along bottom-right inlet
    const addDirectWhite = (cNorm: number, rNorm: number) => {
      const c = Math.floor(cols * cNorm);
      const r = Math.floor(rows * rNorm);
      if (r >= 0 && r < rows && c >= 0 && c < cols) {
        grid[r][c] = 2;
      }
    };

    addDirectWhite(0.78, 0.67);
    addDirectWhite(0.82, 0.72);
    addDirectWhite(0.86, 0.76);
    addDirectWhite(0.88, 0.77);
    addDirectWhite(0.92, 0.81);

    // Floating white blocks in bottom-center area
    addDirectWhite(0.48, 0.76);
    addDirectWhite(0.49, 0.77);

    // 4. Render Canvas Background
    ctx.fillStyle = COLOR_LIGHT;
    ctx.fillRect(0, 0, width, height);

    // 5. Draw Dark Territory and White Blocks
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * cellSize;
        const y = r * cellSize;
        const state = grid[r][c];

        if (state === 1) {
          // Dark territory
          ctx.fillStyle = COLOR_DARK;
          ctx.fillRect(x, y, cellSize, cellSize);

          // Subtle grid line
          ctx.strokeStyle = COLOR_GRID_DARK;
          ctx.lineWidth = 1;
          ctx.strokeRect(x + 0.5, y + 0.5, cellSize - 1, cellSize - 1);
        } else if (state === 2) {
          // White block
          ctx.fillStyle = COLOR_WHITE;
          ctx.fillRect(x, y, cellSize, cellSize);

          ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
          ctx.lineWidth = 1;
          ctx.strokeRect(x + 0.5, y + 0.5, cellSize - 1, cellSize - 1);
        } else {
          // Light area subtle grid line
          ctx.strokeStyle = COLOR_GRID_LIGHT;
          ctx.lineWidth = 1;
          ctx.strokeRect(x + 0.5, y + 0.5, cellSize - 1, cellSize - 1);
        }
      }
    }

    // 6. Render Interactive Hover Cell (default or mouse-tracked)
    const activeHover = currentHover || {
      col: Math.floor(cols * 0.68),
      row: Math.floor(rows * 0.42),
    };

    if (activeHover && activeHover.col >= 0 && activeHover.col < cols && activeHover.row >= 0 && activeHover.row < rows) {
      const hx = activeHover.col * cellSize;
      const hy = activeHover.row * cellSize;

      // Glow behind hover cell
      ctx.shadowColor = 'rgba(43, 153, 138, 0.4)';
      ctx.shadowBlur = 14;

      // Fill highlighted cell with deep navy/indigo
      ctx.fillStyle = COLOR_HOVER;
      ctx.fillRect(hx, hy, cellSize, cellSize);

      ctx.shadowBlur = 0;

      // Bright accent border
      ctx.strokeStyle = COLOR_HOVER_BORDER;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(hx + 0.75, hy + 0.75, cellSize - 1.5, cellSize - 1.5);
    }
  }, [COLOR_LIGHT, COLOR_DARK, COLOR_WHITE, COLOR_GRID_LIGHT, COLOR_GRID_DARK, COLOR_HOVER, COLOR_HOVER_BORDER]);

  // Draw the extended page's pure white background with the exact same grid lines
  const drawExtendedGrid = useCallback((
    canvas: HTMLCanvasElement,
    currentHover: { col: number; row: number } | null
  ) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Use the exact same cellSize formula
    const cellSize = getCellSize(width);
    const cols = Math.ceil(width / cellSize) + 1;
    const rows = Math.ceil(height / cellSize) + 1;

    // 1. Fill background with crisp pure white as requested
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // 2. Draw subtle grid lines (exact same style and color as light area)
    ctx.strokeStyle = COLOR_GRID_LIGHT; // 'rgba(0, 0, 0, 0.04)'
    ctx.lineWidth = 1;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * cellSize;
        const y = r * cellSize;
        ctx.strokeRect(x + 0.5, y + 0.5, cellSize - 1, cellSize - 1);
      }
    }

    // 3. Highlight interactive hover cell if mouse is moving over extended page
    if (currentHover && currentHover.col >= 0 && currentHover.col < cols && currentHover.row >= 0 && currentHover.row < rows) {
      const hx = currentHover.col * cellSize;
      const hy = currentHover.row * cellSize;

      ctx.fillStyle = 'rgba(43, 153, 138, 0.12)';
      ctx.fillRect(hx, hy, cellSize, cellSize);

      ctx.strokeStyle = 'rgba(43, 153, 138, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(hx + 0.75, hy + 0.75, cellSize - 1.5, cellSize - 1.5);
    }
  }, [COLOR_GRID_LIGHT]);

  // Master function to measure and redraw both canvases
  const updateAllCanvases = useCallback(() => {
    // 1. Hero canvas
    const heroCanvas = canvasRef.current;
    const heroSection = heroSectionRef.current;
    if (heroCanvas && heroSection) {
      const w = heroSection.clientWidth || window.innerWidth;
      const h = heroSection.clientHeight || window.innerHeight;
      heroCanvas.width = w;
      heroCanvas.height = h;
      drawBackground(heroCanvas, hoverPos);
    }

    // 2. Extended canvas
    const extCanvas = extendedCanvasRef.current;
    const extSection = extendedSectionRef.current;
    if (extCanvas && extSection) {
      const w = extSection.clientWidth || window.innerWidth;
      const h = extSection.clientHeight || window.innerHeight;
      extCanvas.width = w;
      extCanvas.height = h;
      drawExtendedGrid(extCanvas, extendedHoverPos);
    }
  }, [drawBackground, drawExtendedGrid, hoverPos, extendedHoverPos]);

  // Initial draw and window resize listener
  useEffect(() => {
    updateAllCanvases();
    // Re-verify on animation frame for stable layout
    const rafId = requestAnimationFrame(updateAllCanvases);

    window.addEventListener('resize', updateAllCanvases);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateAllCanvases);
    };
  }, [updateAllCanvases]);

  // Mouse move handlers for Hero Section
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cellSize = getCellSize(canvas.width);
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    if (!hoverPos || hoverPos.col !== col || hoverPos.row !== row) {
      const newPos = { col, row };
      setHoverPos(newPos);
      drawBackground(canvas, newPos);
    }
  };

  const handleHeroMouseLeave = () => {
    setHoverPos(null);
    const canvas = canvasRef.current;
    if (canvas) {
      drawBackground(canvas, null);
    }
  };

  // Mouse move handlers for Extended Section
  const handleExtendedMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const canvas = extendedCanvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cellSize = getCellSize(canvas.width);
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    if (!extendedHoverPos || extendedHoverPos.col !== col || extendedHoverPos.row !== row) {
      const newPos = { col, row };
      setExtendedHoverPos(newPos);
      drawExtendedGrid(canvas, newPos);
    }
  };

  const handleExtendedMouseLeave = () => {
    setExtendedHoverPos(null);
    const canvas = extendedCanvasRef.current;
    if (canvas) {
      drawExtendedGrid(canvas, null);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen h-[100dvh] bg-[#e3e5e8] text-slate-900 overflow-y-auto overflow-x-hidden font-sans select-none scroll-smooth"
    >
      {/* 1. HERO VIEWPORT (Strictly retained exactly as it is) */}
      <section
        ref={heroSectionRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-between shrink-0"
      >
        {/* BACKGROUND CANVAS: Minesweeper-style Cellular Pixel Topography */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />

        {/* HERO SECTION CONTENT */}
        <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-12 sm:pt-20 lg:pt-24 pb-6 flex flex-col justify-between">
          <div className="max-w-4xl space-y-6 sm:space-y-8">
            
            {/* Hero Headline: linguistic after image */}
            <div className="space-y-1">
              {/* Line 1: linguistic */}
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-slate-900 leading-none">
                  {headlinePart1}
                </h1>
              </div>

              {/* Line 2: after image (retro horizontal striped scanline texture) */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight leading-none relative select-none">
                <span
                  className="bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      to bottom,
                      #0f172a 0px,
                      #0f172a 4px,
                      rgba(227, 229, 232, 0.95) 4px,
                      rgba(227, 229, 232, 0.95) 8px
                    )`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 1px rgba(15,23,42,0.15)'
                  }}
                >
                  {headlinePart2}
                </span>
              </h2>
            </div>

            {/* Subheading Narrative */}
            <p className="max-w-2xl text-sm sm:text-base md:text-lg font-sans text-slate-700 leading-relaxed font-normal">
              Shifts in Bengaluru’s linguistic patterns in the age of AI,{' '}
              <span className="whitespace-nowrap">visualised as spatial data.</span>
            </p>

            {/* Scroll Indicator Hint */}
            <div
              onClick={() => extendedSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="pt-3 inline-flex items-center gap-2 font-sans text-xs sm:text-sm text-slate-800 hover:text-slate-950 font-bold tracking-widest uppercase transition-all cursor-pointer group select-none"
              title="Scroll down to explore"
            >
              <span>SCROLL DOWN</span>
              <ChevronDown className="w-4 h-4 text-slate-800 transition-transform group-hover:translate-y-1 animate-bounce" />
            </div>

          </div>

          {/* BOTTOM METADATA BAR: Text size 2x */}
          <div className="pt-6 pb-3 flex items-center justify-between text-base sm:text-lg font-sans border-t border-slate-700/60 backdrop-blur-xs">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#2b998a] shadow-[0_0_8px_#2b998a]" />
              <span className="text-slate-200 font-semibold tracking-wide">Seminar 03 - Project</span>
            </div>

            <div className="font-sans text-base sm:text-lg font-semibold tracking-wide text-[#151b24]">
              <span>Medha Halapnavar</span>
            </div>
          </div>

        </main>
      </section>

      {/* 2. EXTENDED PAGE: White in color with grid lines like they exist already (same height as title page) */}
      <section
        ref={extendedSectionRef}
        onMouseMove={handleExtendedMouseMove}
        onMouseLeave={handleExtendedMouseLeave}
        className="relative w-full min-h-screen min-h-[100dvh] bg-[#ffffff] shrink-0 border-t border-slate-300/40 flex flex-col justify-between"
      >
        {/* Extended Background Canvas (Pure white with exact grid lines) */}
        <canvas
          ref={extendedCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />

        {/* Extended Page Content: Left half (Narrative) + Right half (How to read the Map inside dark/greyish-blue pixelated-edge box) + Centered Explore button */}
        <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-16 sm:pt-20 md:pt-24 pb-4 sm:pb-6 flex flex-col justify-between">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-stretch mt-4 sm:mt-6 md:mt-8">
            {/* Left Half: Narrative (Scaled up by 0.3x / 1.3x) */}
            <div className="flex flex-col justify-between pt-6 sm:pt-7 pb-6 sm:pb-7 text-left text-[#151b24] space-y-4 sm:space-y-5 md:space-y-0">
              {/* Paragraph 1 */}
              <p className="font-sans text-[14px] sm:text-[15px] md:text-[17px] lg:text-[18px] leading-relaxed font-normal text-[#151b24]">
                Imagine a world where microphones are everywhere, like cameras are today. AI can understand every language and dialect, making private conversations vulnerable to surveillance.
              </p>

              {/* Paragraph 2 */}
              <p className="font-sans text-[14px] sm:text-[15px] md:text-[17px] lg:text-[18px] leading-relaxed font-normal text-[#151b24]">
                To protect their privacy, people begin exploring new and revived ways of communicating through sounds, gestures, visuals and symbols.
              </p>

              {/* Paragraph 3 */}
              <p className="font-sans text-[14px] sm:text-[15px] md:text-[17px] lg:text-[18px] leading-relaxed font-normal text-[#151b24]">
                This project maps how these changing forms of communication could reshape Bengaluru’s languages, demographics and geography between 2026 and 2050.
              </p>
            </div>

            {/* Right Half: Dark/Greyish Blue shape with pixelated edges replicating the poster in image.png */}
            <div className="relative px-3 sm:px-6 flex flex-col justify-stretch">
              {/* === PIXELATED EDGES (Uneven yet well-composed silhouette in dark/greyish blue with grid lines) === */}
              <div className="absolute inset-0 pointer-events-none select-none">
                {/* 1. TOP EDGE PIXEL STEPS (Restrained, uneven towers) */}
                <div className="absolute top-0 left-3 sm:left-6 right-3 sm:right-6">
                  <div className="absolute -top-[14px] left-[8%] w-[6%] h-[14px]" style={pixelBoxGridStyle} />
                  <div className="absolute -top-[24px] left-[18%] w-[6%] h-[24px]" style={pixelBoxGridStyle} />
                  <div className="absolute -top-[12px] left-[28%] w-[5%] h-[12px]" style={pixelBoxGridStyle} />
                  <div className="absolute -top-[30px] left-[38%] w-[7%] h-[30px]" style={pixelBoxGridStyle} />
                  <div className="absolute -top-[16px] left-[50%] w-[6%] h-[16px]" style={pixelBoxGridStyle} />
                  <div className="absolute -top-[26px] left-[62%] w-[8%] h-[26px]" style={pixelBoxGridStyle} />
                  <div className="absolute -top-[14px] left-[76%] w-[6%] h-[14px]" style={pixelBoxGridStyle} />
                  <div className="absolute -top-[20px] left-[88%] w-[5%] h-[20px]" style={pixelBoxGridStyle} />

                  {/* Subtle detached pixel accents above top edge */}
                  <div className="absolute -top-[36px] left-[16%] w-[12px] h-[12px]" style={pixelBoxGridStyle} />
                  <div className="absolute -top-[38px] left-[42%] w-[12px] h-[12px]" style={pixelBoxGridStyle} />
                  <div className="absolute -top-[34px] left-[68%] w-[12px] h-[12px]" style={pixelBoxGridStyle} />
                </div>

                {/* 2. SIDE PIXEL STEPS (Crisp, subtle notches) */}
                <div className="absolute top-8 bottom-8 left-3 sm:left-6 right-3 sm:right-6">
                  {/* Left edge notches */}
                  <div className="absolute top-[18%] -left-[8px] w-[8px] h-[16px]" style={pixelBoxGridStyle} />
                  <div className="absolute top-[58%] -left-[6px] w-[6px] h-[16px]" style={pixelBoxGridStyle} />

                  {/* Right edge notches */}
                  <div className="absolute top-[28%] -right-[8px] w-[8px] h-[16px]" style={pixelBoxGridStyle} />
                  <div className="absolute top-[68%] -right-[6px] w-[6px] h-[14px]" style={pixelBoxGridStyle} />
                </div>

                {/* 3. BOTTOM EDGE PIXEL TEETH (Reduced, uneven yet cleanly composed) */}
                <div className="absolute bottom-0 left-3 sm:left-6 right-3 sm:right-6">
                  <div className="absolute top-0 left-[8%] w-[6%] h-[10px]" style={pixelBoxGridStyle} />
                  <div className="absolute top-0 left-[20%] w-[8%] h-[15px]" style={pixelBoxGridStyle} />
                  <div className="absolute top-0 left-[34%] w-[5%] h-[8px]" style={pixelBoxGridStyle} />
                  <div className="absolute top-0 left-[46%] w-[7%] h-[14px]" style={pixelBoxGridStyle} />
                  <div className="absolute top-0 left-[60%] w-[6%] h-[9px]" style={pixelBoxGridStyle} />
                  <div className="absolute top-0 left-[72%] w-[8%] h-[16px]" style={pixelBoxGridStyle} />
                  <div className="absolute top-0 left-[86%] w-[5%] h-[7px]" style={pixelBoxGridStyle} />
                </div>
              </div>

              {/* === SOLID GREYISH BLUE CORE WITH GRID LINES (Contains the text with high contrast & crisp padding) === */}
              <div
                style={pixelBoxGridStyle}
                className="relative z-10 text-white p-6 sm:p-7 space-y-4 text-left shadow-[0_10px_30px_rgba(21,27,36,0.22)] border border-white/10 flex flex-col justify-between h-full"
              >
                <h3 className="font-sans text-base sm:text-lg md:text-xl font-bold text-white tracking-wide">
                  How to read the Map?
                </h3>

                <p className="font-sans text-[14px] sm:text-[15px] md:text-[17px] lg:text-[18px] leading-relaxed font-normal text-slate-100">
                  Move through the timeline to explore how Bengaluru’s languages, communities, and urban spaces might change between 2026 and 2050.
                </p>

                <p className="font-sans text-[14px] sm:text-[15px] md:text-[17px] lg:text-[18px] leading-relaxed font-normal text-slate-100">
                  Combining 2011 census data, future projections, and speculative scenarios, the map uses colour-coded zones to show a possible shift from AI-monitored areas to human-only spaces.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom of Extended Page: EXPLORE NOW button (Moved up & enlarged as requested) */}
          <div className="pt-4 sm:pt-6 pb-2 sm:pb-4 flex items-center justify-center">
            <button
              onClick={onExplore}
              style={{
                backgroundColor: '#2b998a', // Map's primary Human-Only Teal
                color: '#070a0f',
                boxShadow: '0 6px 24px rgba(43, 153, 138, 0.42)',
              }}
              className="group w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] py-3.5 sm:py-4.5 md:py-5 px-8 sm:px-12 rounded-none font-sans text-sm sm:text-base md:text-lg font-bold tracking-[0.2em] uppercase transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-3 sm:gap-4 border border-[#1f7a6e]"
              title="Enter Bengaluru Cartography Spectral Map (Page 2)"
            >
              <span>EXPLORE NOW</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-2 text-slate-950 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
