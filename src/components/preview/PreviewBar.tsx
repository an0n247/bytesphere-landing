import React, { useState, useRef, useEffect } from "react";
import {
  usePreview,
  ACCENT_PALETTES,
  SECTIONS,
  type DevicePreset,
  type AccentColor,
} from "./PreviewContext";
import {
  Smartphone,
  Tablet,
  Laptop,
  Maximize2,
  RotateCw,
  Sun,
  Moon,
  Palette,
  Grid3X3,
  Square,
  Navigation,
  ZoomIn,
  ZoomOut,
  ChevronDown,
  ChevronUp,
  Sparkles,
  RotateCcw,
  SlidersHorizontal,
  X,
  Layers,
} from "lucide-react";

export function PreviewBar() {
  const {
    device,
    setDevice,
    orientation,
    toggleOrientation,
    zoom,
    setZoom,
    themeMode,
    setThemeMode,
    accentColor,
    setAccentColor,
    showGrid,
    setShowGrid,
    showOutlines,
    setShowOutlines,
    fontScale,
    setFontScale,
    isExpanded,
    setIsExpanded,
    currentDimensions,
    scrollToSection,
    resetPreview,
  } = usePreview();

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showSectionPicker, setShowSectionPicker] = useState(false);
  const [showMoreTools, setShowMoreTools] = useState(false);

  const colorPickerRef = useRef<HTMLDivElement>(null);
  const sectionPickerRef = useRef<HTMLDivElement>(null);
  const moreToolsRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(e.target as Node)
      ) {
        setShowColorPicker(false);
      }
      if (
        sectionPickerRef.current &&
        !sectionPickerRef.current.contains(e.target as Node)
      ) {
        setShowSectionPicker(false);
      }
      if (
        moreToolsRef.current &&
        !moreToolsRef.current.contains(e.target as Node)
      ) {
        setShowMoreTools(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const devicePresets: { id: DevicePreset; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "responsive", label: "Responsive", icon: Maximize2 },
    { id: "iphone16", label: "iPhone 16", icon: Smartphone },
    { id: "pixel8", label: "Pixel 8", icon: Smartphone },
    { id: "ipad", label: "iPad Air", icon: Tablet },
    { id: "macbook", label: "MacBook", icon: Laptop },
  ];

  // Minimized floating trigger pill
  if (!isExpanded) {
    return (
      <div className="fixed bottom-5 left-5 z-[9999] animate-in fade-in slide-in-from-bottom-3 duration-200">
        <button
          onClick={() => setIsExpanded(true)}
          className="group flex items-center gap-2.5 rounded-full border border-slate-800 bg-slate-950/90 px-4 py-2.5 text-xs font-semibold text-slate-200 shadow-2xl backdrop-blur-xl transition-all hover:scale-105 hover:border-primary/60 hover:bg-slate-900 active:scale-95"
          title="Open Preview Bar (Alt+P)"
        >
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/75 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
          </span>
          <span className="font-display">Preview Bar</span>
          <span className="rounded-md bg-slate-800 px-2 py-0.5 font-mono text-[11px] text-slate-300">
            {device === "responsive" ? "Full" : currentDimensions.width + "px"}
          </span>
          <span className="hidden text-[10px] text-slate-500 group-hover:inline">
            Alt+P
          </span>
        </button>
      </div>
    );
  }

  return (
    <aside
      aria-label="Preview Bar"
      className="fixed bottom-4 left-1/2 z-[9999] -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      <div className="flex items-center gap-1.5 sm:gap-2.5 rounded-2xl border border-slate-800/90 bg-slate-950/92 px-3 py-2 text-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
        {/* Brand / Title Tag */}
        <div className="hidden lg:flex items-center gap-2 pl-1 pr-2 border-r border-slate-800/80">
          <Sparkles className="size-4 text-primary animate-pulse" />
          <div className="flex flex-col">
            <span className="font-display text-[11px] font-bold tracking-tight text-white leading-none">
              BYTSPHERE
            </span>
            <span className="text-[9px] text-slate-400 font-mono leading-none mt-0.5">
              PREVIEW
            </span>
          </div>
        </div>

        {/* Device Mode Switcher */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-900/80 p-1 ring-1 ring-slate-800">
          {devicePresets.map((preset) => {
            const Icon = preset.icon;
            const isActive = device === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => setDevice(preset.id)}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                }`}
                title={preset.label}
              >
                <Icon className="size-3.5" />
                <span className="hidden md:inline">{preset.label}</span>
              </button>
            );
          })}
        </div>

        {/* Orientation & Zoom (when simulated device active) */}
        {device !== "responsive" && (
          <div className="flex items-center gap-1 rounded-xl bg-slate-900/80 p-1 ring-1 ring-slate-800">
            <button
              onClick={toggleOrientation}
              className={`rounded-lg p-1.5 text-slate-400 transition-all hover:bg-slate-800 hover:text-slate-100 ${
                orientation === "landscape" ? "text-primary bg-slate-800" : ""
              }`}
              title={`Rotate to ${orientation === "portrait" ? "Landscape" : "Portrait"}`}
            >
              <RotateCw className="size-3.5" />
            </button>

            <div className="flex items-center gap-0.5 pl-1 border-l border-slate-800">
              <button
                onClick={() => setZoom(Math.max(0.5, Number((zoom - 0.1).toFixed(1))))}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                title="Zoom out"
                disabled={zoom <= 0.5}
              >
                <ZoomOut className="size-3.5" />
              </button>
              <span className="min-w-[42px] text-center font-mono text-[11px] font-medium text-slate-300">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom(Math.min(1.25, Number((zoom + 0.1).toFixed(1))))}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                title="Zoom in"
                disabled={zoom >= 1.25}
              >
                <ZoomIn className="size-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Theme Mode Toggle */}
        <button
          onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}
          className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition-all hover:bg-slate-800 hover:text-white"
          title={`Switch to ${themeMode === "dark" ? "Light" : "Dark"} Mode`}
        >
          {themeMode === "dark" ? (
            <>
              <Moon className="size-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Dark</span>
            </>
          ) : (
            <>
              <Sun className="size-3.5 text-amber-400" />
              <span className="hidden sm:inline">Light</span>
            </>
          )}
        </button>

        {/* Accent Color Palette Popover */}
        <div className="relative" ref={colorPickerRef}>
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition-all hover:bg-slate-800 hover:text-white"
            title="Brand Color Palette"
          >
            <span
              className={`size-3 rounded-full ${
                ACCENT_PALETTES[accentColor]?.bgDot || "bg-blue-500"
              } ring-1 ring-white/20`}
            />
            <span className="hidden sm:inline">Accent</span>
          </button>

          {showColorPicker && (
            <div className="absolute bottom-full mb-2 left-0 z-50 min-w-[200px] rounded-xl border border-slate-800 bg-slate-950 p-2 shadow-2xl backdrop-blur-xl">
              <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Theme Accent Color
              </div>
              <div className="mt-1 space-y-1">
                {(Object.keys(ACCENT_PALETTES) as AccentColor[]).map((key) => {
                  const item = ACCENT_PALETTES[key];
                  const isSelected = accentColor === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setAccentColor(key);
                        setShowColorPicker(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                        isSelected
                          ? "bg-slate-800 text-white"
                          : "text-slate-300 hover:bg-slate-900"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`size-3 rounded-full ${item.bgDot} ring-1 ring-white/20`}
                        />
                        <span>{item.name}</span>
                      </div>
                      {isSelected && (
                        <span className="text-xs text-primary">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Section Quick Jump Popover */}
        <div className="relative" ref={sectionPickerRef}>
          <button
            onClick={() => setShowSectionPicker(!showSectionPicker)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition-all hover:bg-slate-800 hover:text-white"
            title="Quick Jump to Page Section"
          >
            <Navigation className="size-3.5 text-slate-400" />
            <span className="hidden sm:inline">Sections</span>
            <ChevronDown className="size-3 text-slate-400" />
          </button>

          {showSectionPicker && (
            <div className="absolute bottom-full mb-2 right-0 sm:left-0 z-50 min-w-[190px] rounded-xl border border-slate-800 bg-slate-950 p-2 shadow-2xl backdrop-blur-xl">
              <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Jump to Section
              </div>
              <div className="mt-1 space-y-0.5">
                {SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => {
                      scrollToSection(sec.id);
                      setShowSectionPicker(false);
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white text-left transition-colors"
                  >
                    <span>{sec.label}</span>
                    <span className="font-mono text-[10px] text-slate-500">
                      {sec.href}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Inspection Tools: 12-Col Grid & Wireframe Outlines */}
        <div className="hidden sm:flex items-center gap-1 rounded-xl bg-slate-900/80 p-1 ring-1 ring-slate-800">
          <button
            onClick={() => setShowGrid((prev) => !prev)}
            className={`flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-all ${
              showGrid
                ? "bg-red-500/20 text-red-400 ring-1 ring-red-500/40"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
            }`}
            title="Toggle 12-Column Responsive Grid"
          >
            <Grid3X3 className="size-3.5" />
            <span className="hidden xl:inline">Grid</span>
          </button>

          <button
            onClick={() => setShowOutlines((prev) => !prev)}
            className={`flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-all ${
              showOutlines
                ? "bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/40"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
            }`}
            title="Toggle Element Wireframe Outlines"
          >
            <Square className="size-3.5" />
            <span className="hidden xl:inline">Outlines</span>
          </button>
        </div>

        {/* Reset Preview */}
        <button
          onClick={resetPreview}
          className="rounded-xl p-2 text-slate-400 transition-all hover:bg-slate-900 hover:text-slate-100"
          title="Reset Preview Settings"
        >
          <RotateCcw className="size-3.5" />
        </button>

        {/* Minimize / Collapse Button */}
        <button
          onClick={() => setIsExpanded(false)}
          className="rounded-xl p-2 text-slate-400 transition-all hover:bg-slate-900 hover:text-white"
          title="Collapse Preview Bar (Alt+P)"
        >
          <ChevronDown className="size-4" />
        </button>
      </div>
    </aside>
  );
}
