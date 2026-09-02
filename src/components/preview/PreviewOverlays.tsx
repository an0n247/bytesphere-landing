import React from "react";
import { usePreview } from "./PreviewContext";

export function PreviewOverlays() {
  const { showGrid, showOutlines } = usePreview();

  return (
    <>
      {/* 12-Column Responsive Grid Overlay */}
      {showGrid && (
        <div
          className="pointer-events-none fixed inset-0 z-[9998] mx-auto max-w-6xl px-6 opacity-80 transition-opacity duration-200"
          aria-hidden="true"
        >
          <div className="grid h-full grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-12 md:gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-full border-x border-red-500/20 bg-red-500/5 backdrop-blur-[0.5px]"
              >
                <div className="pt-2 text-center font-mono text-[10px] font-semibold text-red-500/60">
                  {i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wireframe / Element Outlines CSS */}
      {showOutlines && (
        <style>{`
          * {
            outline: 1px solid rgba(59, 130, 246, 0.35) !important;
            outline-offset: -1px !important;
          }
          section, header, footer, main, nav, article {
            outline: 1.5px solid rgba(239, 68, 68, 0.5) !important;
          }
          button, a, input, select {
            outline: 1.5px solid rgba(16, 185, 129, 0.6) !important;
          }
        `}</style>
      )}
    </>
  );
}
