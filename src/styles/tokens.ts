// Design tokens: centralized styling values for consistent theming across the app

export const tokens = {
  color: {
    bg: "#0b0c10",         // App background
    card: "#111218",       // Card/surface background
    text: "#e6e7eb",       // Primary text color
    subtext: "#a8acb8",    // Secondary text color
    chip: "#1a1c24",       // Type pill background
    chipText: "#dfe3ee",   // Type pill text
    accent: "#6dd5fa",     // Hover/interactive accent
    accentMuted: "#3ca0d0",// Subtle accent variant
    border: "#232634",     // Divider and border color
    focus: "#9bd7ff",      // Focus ring color
    danger: "#ff6b6b",     // Error and alert color
  },

  radius: {
    sm: 10,  // Small rounded corners (e.g. pills)
    md: 14,  // Medium radius (e.g. cards)
    lg: 20,  // Large radius (e.g. modals)
  },

  space: {
    xs: 6,   // Extra small spacing
    sm: 10,  // Small spacing
    md: 14,  // Medium spacing
    lg: 20,  // Large spacing
  },

  font: {
    family: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial",
    size: {
      sm: 12,  // Small text (labels, chips)
      md: 14,  // Default body text
      lg: 18,  // Section headers
      xl: 22,  // Modal titles or large headings
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
    },
  },

  shadow: {
    card: "0 8px 24px rgba(0,0,0,0.25)",   // Default card elevation
    hover: "0 12px 32px rgba(0,0,0,0.35)", // Hover elevation
  },
};
