import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

export type DevicePreset =
  | "responsive"
  | "iphone16"
  | "pixel8"
  | "ipad"
  | "macbook"
  | "custom";

export type DeviceOrientation = "portrait" | "landscape";

export type ThemeMode = "light" | "dark" | "system";

export type AccentColor = "blue" | "purple" | "emerald" | "amber" | "rose";

export interface DeviceSpec {
  id: DevicePreset;
  name: string;
  category: "desktop" | "mobile" | "tablet" | "laptop";
  width: number;
  height: number;
  bezelRadius: number;
  bezelWidth: number;
  hasNotch?: boolean;
  hasIsland?: boolean;
}

export const DEVICE_SPECS: Record<Exclude<DevicePreset, "responsive" | "custom">, DeviceSpec> = {
  iphone16: {
    id: "iphone16",
    name: "iPhone 16 Pro",
    category: "mobile",
    width: 393,
    height: 852,
    bezelRadius: 48,
    bezelWidth: 10,
    hasIsland: true,
  },
  pixel8: {
    id: "pixel8",
    name: "Google Pixel 8",
    category: "mobile",
    width: 412,
    height: 915,
    bezelRadius: 36,
    bezelWidth: 10,
    hasNotch: false,
  },
  ipad: {
    id: "ipad",
    name: "iPad Air 11\"",
    category: "tablet",
    width: 820,
    height: 1180,
    bezelRadius: 28,
    bezelWidth: 14,
  },
  macbook: {
    id: "macbook",
    name: "MacBook Air 13\"",
    category: "laptop",
    width: 1280,
    height: 800,
    bezelRadius: 18,
    bezelWidth: 12,
    hasNotch: true,
  },
};

export const ACCENT_PALETTES: Record<
  AccentColor,
  { name: string; lightPrimary: string; darkPrimary: string; bgDot: string }
> = {
  blue: {
    name: "Bytsphere Blue",
    lightPrimary: "oklch(0.62 0.19 250)",
    darkPrimary: "oklch(0.62 0.19 250)",
    bgDot: "bg-blue-500",
  },
  purple: {
    name: "Cyber Violet",
    lightPrimary: "oklch(0.58 0.23 295)",
    darkPrimary: "oklch(0.68 0.22 295)",
    bgDot: "bg-purple-500",
  },
  emerald: {
    name: "Emerald Mint",
    lightPrimary: "oklch(0.60 0.19 155)",
    darkPrimary: "oklch(0.68 0.18 155)",
    bgDot: "bg-emerald-500",
  },
  amber: {
    name: "Solar Amber",
    lightPrimary: "oklch(0.68 0.18 65)",
    darkPrimary: "oklch(0.74 0.17 65)",
    bgDot: "bg-amber-500",
  },
  rose: {
    name: "Radiant Rose",
    lightPrimary: "oklch(0.62 0.23 15)",
    darkPrimary: "oklch(0.68 0.22 15)",
    bgDot: "bg-rose-500",
  },
};

export const SECTIONS = [
  { id: "hero", label: "Top / Hero", href: "#" },
  { id: "services", label: "Services", href: "#services" },
  { id: "portfolio", label: "Portfolio", href: "#portfolio" },
  { id: "process", label: "Process", href: "#process" },
  { id: "proof", label: "Proof & Stats", href: "#proof" },
  { id: "testimonials", label: "Testimonials", href: "#testimonials" },
  { id: "contact", label: "Contact / CTA", href: "#contact" },
];

interface PreviewContextType {
  device: DevicePreset;
  setDevice: (device: DevicePreset) => void;
  orientation: DeviceOrientation;
  setOrientation: (orientation: DeviceOrientation) => void;
  toggleOrientation: () => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  customWidth: number;
  setCustomWidth: (w: number) => void;
  customHeight: number;
  setCustomHeight: (h: number) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  accentColor: AccentColor;
  setAccentColor: (accent: AccentColor) => void;
  showGrid: boolean;
  setShowGrid: (show: boolean | ((prev: boolean) => boolean)) => void;
  showOutlines: boolean;
  setShowOutlines: (show: boolean | ((prev: boolean) => boolean)) => void;
  fontScale: number;
  setFontScale: (scale: number) => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean | ((prev: boolean) => boolean)) => void;
  currentDimensions: { width: number; height: number };
  activeSection: string;
  scrollToSection: (id: string) => void;
  resetPreview: () => void;
}

const PreviewContext = createContext<PreviewContextType | null>(null);

const STORAGE_KEY_PREFIX = "bytsphere_preview_";

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [device, setDevice] = useState<DevicePreset>("responsive");
  const [orientation, setOrientation] = useState<DeviceOrientation>("portrait");
  const [zoom, setZoom] = useState<number>(1);
  const [customWidth, setCustomWidth] = useState<number>(390);
  const [customHeight, setCustomHeight] = useState<number>(844);
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const [accentColor, setAccentColor] = useState<AccentColor>("blue");
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [showOutlines, setShowOutlines] = useState<boolean>(false);
  const [fontScale, setFontScale] = useState<number>(100);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Load from local storage on client mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(`${STORAGE_KEY_PREFIX}theme`) as ThemeMode;
      if (savedTheme) setThemeMode(savedTheme);

      const savedAccent = localStorage.getItem(`${STORAGE_KEY_PREFIX}accent`) as AccentColor;
      if (savedAccent && ACCENT_PALETTES[savedAccent]) setAccentColor(savedAccent);

      const savedExpanded = localStorage.getItem(`${STORAGE_KEY_PREFIX}expanded`);
      if (savedExpanded !== null) setIsExpanded(savedExpanded === "true");
    } catch {
      // Storage unavailable or disabled
    }
  }, []);

  // Sync theme mode to DOM root
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    const isDark =
      themeMode === "dark" ||
      (themeMode === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}theme`, themeMode);
    } catch {
      // ignore
    }
  }, [themeMode]);

  // Sync accent color to DOM root via CSS variables
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const palette = ACCENT_PALETTES[accentColor] || ACCENT_PALETTES.blue;

    const isDark = root.classList.contains("dark");
    const primaryColor = isDark ? palette.darkPrimary : palette.lightPrimary;

    root.style.setProperty("--primary", primaryColor);
    root.style.setProperty("--ring", primaryColor);
    root.style.setProperty("--bluedrop", primaryColor);
    root.style.setProperty("--sidebar-primary", primaryColor);
    root.style.setProperty("--sidebar-ring", primaryColor);

    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}accent`, accentColor);
    } catch {
      // ignore
    }
  }, [accentColor, themeMode]);

  // Sync font scaling
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (fontScale === 100) {
      root.style.removeProperty("font-size");
    } else {
      root.style.fontSize = `${fontScale}%`;
    }
  }, [fontScale]);

  // Sync isExpanded persistence
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}expanded`, String(isExpanded));
    } catch {
      // ignore
    }
  }, [isExpanded]);

  // Global Keyboard shortcuts: Alt+P or Ctrl+Shift+P to toggle bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.altKey && (e.key === "p" || e.key === "P")) ||
        (e.ctrlKey && e.shiftKey && (e.key === "p" || e.key === "P"))
      ) {
        e.preventDefault();
        setIsExpanded((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Compute active viewport dimensions
  const currentDimensions = useMemo(() => {
    if (device === "responsive") {
      if (typeof window !== "undefined") {
        return { width: window.innerWidth, height: window.innerHeight };
      }
      return { width: 1200, height: 800 };
    }

    if (device === "custom") {
      return orientation === "portrait"
        ? { width: customWidth, height: customHeight }
        : { width: customHeight, height: customWidth };
    }

    const spec = DEVICE_SPECS[device];
    if (!spec) return { width: 390, height: 844 };

    return orientation === "portrait"
      ? { width: spec.width, height: spec.height }
      : { width: spec.height, height: spec.width };
  }, [device, orientation, customWidth, customHeight]);

  const toggleOrientation = () => {
    setOrientation((prev) => (prev === "portrait" ? "landscape" : "portrait"));
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const scrollableFrame = document.getElementById("device-scroll-container");
      if (scrollableFrame) {
        scrollableFrame.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const resetPreview = () => {
    setDevice("responsive");
    setOrientation("portrait");
    setZoom(1);
    setFontScale(100);
    setShowGrid(false);
    setShowOutlines(false);
    setThemeMode("light");
    setAccentColor("blue");
  };

  return (
    <PreviewContext.Provider
      value={{
        device,
        setDevice,
        orientation,
        setOrientation,
        toggleOrientation,
        zoom,
        setZoom,
        customWidth,
        setCustomWidth,
        customHeight,
        setCustomHeight,
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
        activeSection,
        scrollToSection,
        resetPreview,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreview() {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error("usePreview must be used within a PreviewProvider");
  }
  return context;
}
