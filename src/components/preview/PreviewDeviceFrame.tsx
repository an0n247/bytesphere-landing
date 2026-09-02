import React, { useMemo } from "react";
import { usePreview, DEVICE_SPECS } from "./PreviewContext";
import { Wifi, Battery, Sparkles, Laptop, Smartphone, Tablet } from "lucide-react";

export function PreviewDeviceFrame({ children }: { children: React.ReactNode }) {
  const {
    device,
    orientation,
    zoom,
    customWidth,
    customHeight,
    currentDimensions,
  } = usePreview();

  const isSimulated = device !== "responsive";

  const spec = useMemo(() => {
    if (device === "responsive" || device === "custom") return null;
    return DEVICE_SPECS[device] || null;
  }, [device]);

  if (!isSimulated) {
    return <>{children}</>;
  }

  const { width, height } = currentDimensions;

  const isMobile = spec?.category === "mobile" || (device === "custom" && width <= 500);
  const isTablet = spec?.category === "tablet";
  const isLaptop = spec?.category === "laptop";

  return (
    <div className="relative min-h-screen w-full bg-slate-950/95 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] text-slate-100">
      {/* Canvas Top Bar Indicator */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-6 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            {isMobile && <Smartphone className="size-3.5" />}
            {isTablet && <Tablet className="size-3.5" />}
            {isLaptop && <Laptop className="size-3.5" />}
            <span>{spec?.name || `Custom (${width}×${height})`}</span>
          </div>
          <span className="font-mono text-xs text-slate-400">
            {width}px × {height}px
          </span>
          <span className="rounded bg-slate-800/80 px-1.5 py-0.5 font-mono text-[11px] text-slate-400">
            {Math.round(zoom * 100)}% scale
          </span>
          <span className="capitalize text-slate-500 text-xs">
            ({orientation})
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="inline-block size-2 animate-pulse rounded-full bg-emerald-500" />
          <span className="hidden sm:inline font-mono">Live Interactive Mode</span>
        </div>
      </div>

      {/* Device Centering Canvas */}
      <div className="flex min-h-[calc(100vh-50px)] items-start justify-center p-4 sm:p-8 pb-36 overflow-auto">
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            transition: "transform 0.2s ease-out, width 0.3s ease-out, height 0.3s ease-out",
          }}
          className="relative transition-all duration-300 ease-in-out"
        >
          {/* Laptop Lid Wrapper */}
          {isLaptop && (
            <div className="flex flex-col items-center">
              {/* Laptop Screen Frame */}
              <div
                style={{ width: `${width}px`, height: `${height}px` }}
                className="relative overflow-hidden rounded-[18px] border-[12px] border-slate-800 bg-background shadow-2xl ring-1 ring-white/10"
              >
                {/* Laptop Camera Notch */}
                <div className="absolute top-0 left-1/2 z-40 -translate-x-1/2 flex items-center justify-center rounded-b-md bg-slate-800 px-4 py-1">
                  <span className="size-1.5 rounded-full bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                </div>

                {/* Inner Scrollable Web Viewport */}
                <div
                  id="device-scroll-container"
                  className="h-full w-full overflow-y-auto overflow-x-hidden bg-background"
                >
                  {children}
                </div>
              </div>

              {/* Laptop Base Chin */}
              <div
                style={{ width: `${width + 80}px` }}
                className="relative h-4 rounded-b-xl border-t border-slate-700/60 bg-gradient-to-b from-slate-700 to-slate-800 shadow-xl"
              >
                <div className="absolute top-0 left-1/2 h-1.5 w-20 -translate-x-1/2 rounded-b bg-slate-600/80" />
              </div>
            </div>
          )}

          {/* Mobile / Tablet Device Frame */}
          {!isLaptop && (
            <div
              style={{
                width: `${width}px`,
                height: `${height}px`,
                borderRadius: `${spec?.bezelRadius || 36}px`,
                borderWidth: `${spec?.bezelWidth || 10}px`,
              }}
              className="relative overflow-hidden border-slate-800 bg-background shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] ring-1 ring-white/15"
            >
              {/* Mobile Dynamic Island / Notch */}
              {spec?.hasIsland && orientation === "portrait" && (
                <div className="pointer-events-none absolute top-2.5 left-1/2 z-40 h-[26px] w-[100px] -translate-x-1/2 rounded-full bg-black shadow-md flex items-center justify-end px-2">
                  <span className="size-2.5 rounded-full bg-slate-900 border border-slate-800" />
                </div>
              )}

              {/* Mobile Status Bar */}
              {isMobile && orientation === "portrait" && (
                <div className="pointer-events-none absolute top-0 left-0 right-0 z-30 flex h-11 items-center justify-between px-6 pt-1 text-[11px] font-semibold text-foreground/80">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="size-3.5" />
                    <span className="font-mono text-[10px]">5G</span>
                    <Battery className="size-4" />
                  </div>
                </div>
              )}

              {/* Inner Scrollable Web Viewport */}
              <div
                id="device-scroll-container"
                className="h-full w-full overflow-y-auto overflow-x-hidden bg-background pt-0"
              >
                {children}
              </div>

              {/* Mobile Home Swipe Indicator */}
              {isMobile && (
                <div className="pointer-events-none absolute bottom-1.5 left-1/2 z-40 h-1 w-32 -translate-x-1/2 rounded-full bg-foreground/40 backdrop-blur-sm" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
