/**
 * Ec(ak)ou Ghost Speech Cartography Application
 * 
 * Layout:
 * - Single column ON THE LEFT retaining Cartographic Layers & Legend (sized to fit with NO scrolling)
 * - Map in the center/remaining viewport
 * - Fixed horizontal Timeline Ribbon at the bottom
 */

import React, { useState, useEffect } from 'react';
import { BangaloreSpectralMap } from './components/BangaloreSpectralMap';
import { LeftSidebar, LayerVisibilityState } from './components/LeftSidebar';
import { TimelineController } from './components/TimelineController';
import { IntroLandingPage } from './components/IntroLandingPage';
import { CustomCursor } from './components/CustomCursor';
import { Menu, X } from 'lucide-react';

export default function App() {
  // Page 1: Introduction, Page 2: Spectral Map & Timeline Cartography
  const [currentPage, setCurrentPage] = useState<'intro' | 'map'>('intro');

  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Cartographic layer visibility state
  const [layers, setLayers] = useState<LayerVisibilityState>({
    showAreas: true,
    showRoads: true,
    showMetro: true,
    showZoneRings: true
  });

  // Left sidebar collapse state on desktop
  const [isLeftCollapsed, setIsLeftCollapsed] = useState<boolean>(false);

  // Mobile sidebar open state
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  const handleToggleLayer = (layerKey: keyof LayerVisibilityState) => {
    setLayers(prev => ({
      ...prev,
      [layerKey]: !prev[layerKey]
    }));
  };

  // Play animation smoothly stepping through 2026 to 2050
  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = 380;
    const timer = setInterval(() => {
      setCurrentYear(prev => {
        if (prev >= 2050) {
          setIsPlaying(false);
          return 2050;
        }
        return prev + 1;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleTogglePlay = () => {
    if (currentYear >= 2050 && !isPlaying) {
      setCurrentYear(2026);
      setIsPlaying(true);
    } else {
      setIsPlaying(prev => !prev);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentYear(2026);
  };

  // Main Application with Custom White Reticle Cursor
  return (
    <>
      <CustomCursor />
      {currentPage === 'intro' ? (
        <IntroLandingPage onExplore={() => setCurrentPage('map')} />
      ) : (
        <div className="relative w-full h-screen h-[100dvh] bg-[#151b24] text-slate-100 overflow-hidden font-sans select-none flex">
      
      {/* Mobile Drawer Toggle Floating Button (< md screens) */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden absolute top-3 left-3 z-40 p-2 rounded-xs bg-[#141a23]/95 border border-[#2d3748] text-teal-400 hover:text-white shadow-xl cursor-pointer"
        title="Toggle Controls & Legend"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Drawer Backdrop (< md screens) */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* SINGLE COLUMN ON THE LEFT: Cartographic Layers & Legend with Intro button at top-left corner */}
      <div className={`h-full ${
        isMobileOpen
          ? 'fixed inset-y-0 left-0 z-40 block max-w-[85vw] shadow-2xl animate-in slide-in-from-left duration-200'
          : 'hidden md:block'
      }`}>
        <LeftSidebar
          layers={layers}
          onToggleLayer={handleToggleLayer}
          isCollapsed={isLeftCollapsed}
          onToggleCollapse={() => {
            if (window.innerWidth < 768) {
              setIsMobileOpen(false);
            } else {
              setIsLeftCollapsed(!isLeftCollapsed);
            }
          }}
          onReturnToIntro={() => setCurrentPage('intro')}
        />
      </div>

      {/* THE MAP & FIXED BOTTOM TIMELINE RIBBON */}
      <main className="flex-1 h-full min-w-0 relative bg-[#151b24]">
        <BangaloreSpectralMap
          currentYear={currentYear}
          showAreas={layers.showAreas}
          showRoads={layers.showRoads}
          showMetro={layers.showMetro}
          showZoneRings={layers.showZoneRings}
        />

        {/* Fixed Horizontal Ribbon Timeline Controller at Bottom */}
        <TimelineController
          currentYear={currentYear}
          onYearChange={setCurrentYear}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onReset={handleReset}
        />
      </main>

    </div>
      )}
    </>
  );
}
