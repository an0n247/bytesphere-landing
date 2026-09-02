import React, { useState, useRef, useEffect } from "react";
import {
  usePreview,
  DEVICE_SPECS,
  SECTIONS,
  type DevicePreset,
  type DeviceOrientation,
} from "./PreviewContext";
import {
  Smartphone,
  Tablet,
  Laptop,
  Maximize2,
  RotateCw,
  RotateCcw,
  Sun,
  Moon,
  X,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Layout,
  MoveRight,
  MoveLeft,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Layers,
  ArrowUpRight,
  PanelRightClose,
  PanelRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function SidePreview() {
  const {
    sidePreviewOpen,
    setSidePreviewOpen,
    sidePreviewDevice,
    setSidePreviewDevice,
    sidePreviewPosition,
    setSidePreviewPosition,
    sidePreviewWidth,
    setSidePreviewWidth,
    isIframe,
    themeMode,
  } = usePreview();

  const [orientation, setOrientation] = useState<DeviceOrientation>("portrait");
  const [zoom, setZoom] = useState<number>(0.85);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isLoading, setIsLoading] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isResizing, setIsResizing] = useState(false);
  const [showSectionMenu, setShowSectionMenu] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const sectionMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sectionMenuRef.current &&
        !sectionMenuRef.current.contains(e.target as Node)
      ) {
        setShowSectionMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle drag to resize panel
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      let newWidth =
        sidePreviewPosition === "right"
          ? window.innerWidth - e.clientX
          : e.clientX;
      newWidth = Math.max(340, Math.min(850, newWidth));
      setSidePreviewWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    } else {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, sidePreviewPosition, setSidePreviewWidth]);

  // Don't render inside iframe
  if (isIframe || !sidePreviewOpen) return null;

  const spec =
    sidePreviewDevice !== "responsive" && sidePreviewDevice !== "custom"
      ? DEVICE_SPECS[sidePreviewDevice]
      : null;

  const deviceWidth = spec
    ? orientation === "portrait"
      ? spec.width
      : spec.height
    : 390;

  const deviceHeight = spec
    ? orientation === "portrait"
      ? spec.height
      : spec.width
    : 844;

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleScrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setShowSectionMenu(false);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        const hash = sectionId === "hero" ? "#" : `#${sectionId}`;
        iframeRef.current.contentWindow.location.hash = hash;
      } catch {
        // cross-origin guard if needed
      }
    }
  };

  const isFloating = sidePreviewPosition === "floating";

  return (
    <aside
      aria-label="In-App Side Live Preview"
      style={{
        width: isFloating ? "460px" : `${sidePreviewWidth}px`,
      }}
      className={cn(
        "fixed z-50 flex flex-col bg-slate-950 text-slate-100 shadow-[0_0_50px_rgba(0,0,0,0.6)] border-slate-800 transition-all duration-150",
        sidePreviewPosition === "right" &&
          "top-0 right-0 bottom-0 border-l border-slate-800 animate-in slide-in-from-right duration-200",
        sidePreviewPosition === "left" &&
          "top-0 left-0 bottom-0 border-r border-slate-800 animate-in slide-in-from-left duration-200",
        isFloating &&
          "bottom-6 right-6 h-[720px] max-h-[85vh] rounded-3xl border border-slate-800 shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
      )}
    >
      {/* Drag Resize Handle (when docked) */}
      {!isFloating && (
        <div
          onMouseDown={() => setIsResizing(true)}
          className={cn(
            "absolute top-0 bottom-0 w-1.5 cursor-col-resize z-50 hover:bg-primary transition-colors",
            sidePreviewPosition === "right" ? "-left-1 hover:w-2" : "-right-1 hover:w-2"
          )}
          title="Drag to resize preview panel"
        />
      )}

      {/* Top Header Controls Bar */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800/90 bg-slate-900/90 px-3.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5 animate-pulse" />
            <span>Live Side Preview</span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-slate-400">
            {deviceWidth}×{deviceHeight}
          </span>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          {/* Section Picker */}
          <div className="relative" ref={sectionMenuRef}>
            <button
              onClick={() => setShowSectionMenu(!showSectionMenu)}
              className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
              title="Jump to Section"
            >
              <span className="capitalize">{activeSection}</span>
              <ChevronDown className="size-3 text-slate-500" />
            </button>

            {showSectionMenu && (
              <div className="absolute right-0 top-full mt-1 z-50 w-44 rounded-xl border border-slate-800 bg-slate-950 p-1.5 shadow-2xl backdrop-blur-xl">
                <div className="px-2 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Jump to Section
                </div>
                {SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => handleScrollToSection(sec.id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
                      activeSection === sec.id
                        ? "bg-slate-800 text-primary font-semibold"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    )}
                  >
                    <span>{sec.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Refresh Frame */}
          <button
            onClick={handleRefresh}
            className="grid size-7.5 place-items-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            title="Reload Preview Frame"
            aria-label="Reload Preview Frame"
          >
            <RefreshCw className={cn("size-3.5", isLoading && "animate-spin text-primary")} />
          </button>

          {/* Orientation Toggle */}
          <button
            onClick={() =>
              setOrientation((prev) => (prev === "portrait" ? "landscape" : "portrait"))
            }
            className="grid size-7.5 place-items-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            title={`Rotate (${orientation})`}
            aria-label="Toggle Orientation"
          >
            <RotateCw className="size-3.5" />
          </button>

          {/* Dock Position Switcher */}
          <button
            onClick={() => {
              if (sidePreviewPosition === "right") setSidePreviewPosition("left");
              else if (sidePreviewPosition === "left") setSidePreviewPosition("floating");
              else setSidePreviewPosition("right");
            }}
            className="grid size-7.5 place-items-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            title={`Position: ${sidePreviewPosition} (Click to change)`}
            aria-label="Change preview dock position"
          >
            {sidePreviewPosition === "right" && <PanelRightClose className="size-3.5" />}
            {sidePreviewPosition === "left" && <MoveRight className="size-3.5" />}
            {sidePreviewPosition === "floating" && <PanelRight className="size-3.5" />}
          </button>

          {/* Close Button */}
          <button
            onClick={() => setSidePreviewOpen(false)}
            className="grid size-7.5 place-items-center rounded-lg text-slate-400 hover:bg-rose-950/50 hover:text-rose-400 transition-colors"
            title="Close Side Preview (Alt+S)"
            aria-label="Close Side Preview"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Device Preset Switcher Row */}
      <div className="flex items-center justify-between border-b border-slate-800/60 bg-slate-950/80 px-3 py-1.5 text-xs text-slate-400">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSidePreviewDevice("iphone16")}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors",
              sidePreviewDevice === "iphone16"
                ? "bg-slate-800 text-white shadow-xs"
                : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
            )}
          >
            <Smartphone className="size-3" />
            <span>iPhone 16</span>
          </button>

          <button
            onClick={() => setSidePreviewDevice("pixel8")}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors",
              sidePreviewDevice === "pixel8"
                ? "bg-slate-800 text-white shadow-xs"
                : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
            )}
          >
            <Smartphone className="size-3" />
            <span>Pixel 8</span>
          </button>

          <button
            onClick={() => setSidePreviewDevice("ipad")}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors",
              sidePreviewDevice === "ipad"
                ? "bg-slate-800 text-white shadow-xs"
                : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
            )}
          >
            <Tablet className="size-3" />
            <span>iPad</span>
          </button>
        </div>

        {/* Zoom scale controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoom((z) => Math.max(0.4, Number((z - 0.1).toFixed(2))))}
            className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            title="Zoom out"
          >
            <ZoomOut className="size-3" />
          </button>
          <span className="font-mono text-[10.5px] text-slate-300 w-9 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(1.2, Number((z + 0.1).toFixed(2))))}
            className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            title="Zoom in"
          >
            <ZoomIn className="size-3" />
          </button>
        </div>
      </div>

      {/* Main Preview Container Viewport */}
      <div className="relative flex-1 overflow-auto bg-slate-950 p-4 flex items-start justify-center bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]">
        {/* Device Frame Wrapper */}
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            transition: "transform 0.15s ease-out",
          }}
          className="relative transition-all duration-200"
        >
          <div
            style={{
              width: `${deviceWidth}px`,
              height: `${deviceHeight}px`,
              borderRadius: spec ? `${spec.bezelRadius || 36}px` : "24px",
              borderWidth: spec ? `${spec.bezelWidth || 10}px` : "8px",
            }}
            className="relative overflow-hidden border-slate-800 bg-background shadow-2xl ring-1 ring-white/10 transition-all"
          >
            {/* Live Interactive Iframe */}
            <iframe
              key={iframeKey}
              ref={iframeRef}
              src={`/?_in_side_preview=1${activeSection !== "hero" ? `#${activeSection}` : ""}`}
              title="Bytsphere Live Preview"
              className="h-full w-full border-0 bg-background"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="flex h-8 shrink-0 items-center justify-between border-t border-slate-800/80 bg-slate-950 px-4 text-[11px] text-slate-500 font-mono">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-slate-400">Live Syncing</span>
        </div>
        <span>Press Alt+S to toggle</span>
      </div>
    </aside>
  );
}
