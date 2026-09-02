import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  variant?: "icon" | "switch" | "pill";
  showLabel?: boolean;
}

export function ThemeToggle({ className, variant = "icon", showLabel = false }: ThemeToggleProps) {
  const { themeMode, setThemeMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = themeMode === "dark";

  const toggleTheme = () => {
    const nextMode = isDark ? "light" : "dark";
    setThemeMode(nextMode);
  };

  if (!mounted) {
    return (
      <div
        className={cn(
          variant === "switch"
            ? "h-11 w-full rounded-xl border border-border bg-muted/40"
            : "size-9 rounded-xl border border-border bg-background/50",
          className,
        )}
      />
    );
  }

  if (variant === "switch") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          "flex w-full items-center justify-between rounded-xl border border-border bg-muted/40 px-3.5 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-muted active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          className,
        )}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        <div className="flex items-center gap-2.5">
          <div className="grid size-7 place-items-center rounded-lg bg-background shadow-xs ring-1 ring-border">
            {isDark ? (
              <Moon className="size-3.5 text-indigo-400 transition-transform duration-300" />
            ) : (
              <Sun className="size-3.5 text-amber-500 transition-transform duration-300" />
            )}
          </div>
          <span className="text-foreground font-body text-[13px]">Appearance</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground shadow-xs">
          <span className="size-1.5 rounded-full bg-primary" />
          <span>{isDark ? "Dark mode" : "Light mode"}</span>
        </div>
      </button>
    );
  }

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          "inline-flex items-center gap-2 rounded-xl border border-border bg-background/80 px-3 py-1.5 font-body text-[13px] font-medium text-foreground backdrop-blur-xs transition-all duration-200 hover:bg-muted hover:border-primary/40 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          className,
        )}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        title={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        <div className="relative size-4">
          <Sun
            className={cn(
              "size-4 text-amber-500 transition-all duration-300 absolute inset-0",
              isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
            )}
          />
          <Moon
            className={cn(
              "size-4 text-indigo-400 transition-all duration-300 absolute inset-0",
              isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0",
            )}
          />
        </div>
        <span>{isDark ? "Dark" : "Light"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative grid size-9 place-items-center rounded-xl border border-border bg-background/80 text-foreground backdrop-blur-xs transition-all duration-200 hover:bg-muted hover:border-primary/40 hover:text-primary active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className,
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <Sun
        className={cn(
          "size-4 text-amber-500 transition-all duration-300",
          isDark ? "rotate-90 scale-0 opacity-0 absolute" : "rotate-0 scale-100 opacity-100",
        )}
      />
      <Moon
        className={cn(
          "size-4 text-indigo-400 transition-all duration-300",
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0 absolute",
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
