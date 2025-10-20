import React from "react";

/**
 * ThemeContext
 * - Provides app-wide theme tokens (colors, gradients, filters)
 * - Supports toggling between "dark" and "light" modes
 */

export type ThemeMode = "dark" | "light";

// Access current theme tokens
export const useTheme = () => React.useContext(ThemeCtx);

// Access theme toggle function
export const useToggleTheme = () => React.useContext(ThemeToggleCtx);

// Token shape for background styling
type ThemeTokens = {
  mode: ThemeMode;
  appBackground: {
    color: string;
    image: string;
    size: string;
    repeat: string;
    blend: string;
    filter: string;
  };
};

// Default theme context (dark mode)
const ThemeCtx = React.createContext<ThemeTokens>({
  mode: "dark",
  appBackground: {
    color: "#171E2b",
    image: "",
    size: "100% 100%",
    repeat: "no-repeat",
    blend: "normal",
    filter: "none",
  },
});

// Default toggle context (no-op fallback)
const ThemeToggleCtx = React.createContext<() => void>(() => {});

/** Returns theme tokens for the given mode */
function getTheme(mode: ThemeMode): ThemeTokens {
  if (mode === "light") {
    // LIGHT — soft diagonal beams + subtle highlights
    return {
      mode,
      appBackground: {
        color: "#f7f9fc",
        image: `
          /* wide soft diagonal beams */
          linear-gradient(
            135deg,
            rgba(0,0,0,0.00) 0%,
            rgba(0,0,0,0.03) 12%,
            rgba(0,0,0,0.00) 25%,
            rgba(0,0,0,0.03) 37%,
            rgba(0,0,0,0.00) 50%,
            rgba(0,0,0,0.03) 62%,
            rgba(0,0,0,0.00) 75%,
            rgba(0,0,0,0.03) 87%,
            rgba(0,0,0,0.00) 100%
          ),
          /* highlight edges */
          linear-gradient(
            135deg,
            rgba(255,255,255,0.00) 0%,
            rgba(255,255,255,0.15) 10%,
            rgba(255,255,255,0.00) 12%,
            rgba(255,255,255,0.15) 22%,
            rgba(255,255,255,0.00) 25%,
            rgba(255,255,255,0.15) 35%,
            rgba(255,255,255,0.00) 37%,
            rgba(255,255,255,0.15) 47%,
            rgba(255,255,255,0.00) 50%,
            rgba(255,255,255,0.15) 60%,
            rgba(255,255,255,0.00) 62%,
            rgba(255,255,255,0.15) 72%,
            rgba(255,255,255,0.00) 75%,
            rgba(255,255,255,0.15) 85%,
            rgba(255,255,255,0.00) 87%,
            rgba(255,255,255,0.15) 97%,
            rgba(255,255,255,0.00) 100%
          ),
          /* vertical falloff for depth */
          linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0) 60%)
        `,
        size: "1200px 1200px, 1200px 1200px, 100% 100%",
        repeat: "repeat, repeat, no-repeat",
        blend: "overlay, normal, normal",
        filter: "contrast(1.02) brightness(1.00)",
      },
    };
  }

  // DARK — original layered gradient style
  return {
    mode,
    appBackground: {
      color: "#171E2b",
      image: `
        linear-gradient(
          135deg,
          rgba(0,0,0,0.0) 0%,
          rgba(0,0,0,0.55) 12%,
          rgba(0,0,0,0.0) 25%,
          rgba(0,0,0,0.55) 37%,
          rgba(0,0,0,0.0) 50%,
          rgba(0,0,0,0.55) 62%,
          rgba(0,0,0,0.0) 75%,
          rgba(0,0,0,0.55) 87%,
          rgba(0,0,0,0.0) 100%
        ),
        linear-gradient(
          135deg,
          rgba(255,255,255,0.00) 0%,
          rgba(255,255,255,0.10) 10%,
          rgba(255,255,255,0.00) 12%,
          rgba(255,255,255,0.10) 22%,
          rgba(255,255,255,0.00) 25%,
          rgba(255,255,255,0.10) 35%,
          rgba(255,255,255,0.00) 37%,
          rgba(255,255,255,0.10) 47%,
          rgba(255,255,255,0.00) 50%,
          rgba(255,255,255,0.10) 60%,
          rgba(255,255,255,0.00) 62%,
          rgba(255,255,255,0.10) 72%,
          rgba(255,255,255,0.00) 75%,
          rgba(255,255,255,0.10) 85%,
          rgba(255,255,255,0.00) 87%,
          rgba(255,255,255,0.10) 97%,
          rgba(255,255,255,0.00) 100%
        ),
        linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0) 60%)
      `,
      size: "1200px 1200px, 1200px 1200px, 100% 100%",
      repeat: "repeat, repeat, no-repeat",
      blend: "overlay, normal, normal",
      filter: "contrast(1.06) brightness(1.02)",
    },
  };
}

// Theme provider that wraps the app and manages mode state
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = React.useState<ThemeMode>("dark");

  // Compute theme tokens based on current mode
  const tokens = React.useMemo(() => getTheme(mode), [mode]);

  // Toggle between dark and light modes
  const toggle = React.useCallback(() => {
    setMode((m) => (m === "dark" ? "light" : "dark"));
  }, []);

  // Sync theme mode to DOM for global styling
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <ThemeCtx.Provider value={tokens}>
      <ThemeToggleCtx.Provider value={toggle}>
        {children}
      </ThemeToggleCtx.Provider>
    </ThemeCtx.Provider>
  );
};
