// Design tokens = single source of truth for styling.
// I tweak colors/spacing here once, and the whole UI updates.
// Keeps JSS styles consistent and easy to reason about.

export const tokens = {
  color: {
    bg: "#0b0c10",        // app background
    card: "#111218",      // surface/card background
    text: "#e6e7eb",      // primary text
    subtext: "#a8acb8",   // secondary text
    chip: "#1a1c24",      // type pill background
    chipText: "#dfe3ee",  // type pill text
    accent: "#6dd5fa",    // interactive/hover accent
    accentMuted: "#3ca0d0",
    border: "#232634",    // subtle borders
    focus: "#9bd7ff",     // keyboard focus ring
    danger: "#ff6b6b",    // errors + alerts
  },

  // Rounded corners (shared across cards/buttons)
  radius: { sm: 10, md: 14, lg: 20 },

  // Spacing scale (padding/margins)
  space: { xs: 6, sm: 10, md: 14, lg: 20 },

  // Typography (stack + sizes + weights)
  font: {
    // Inter if available; otherwise system fonts
    family:
      "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial",
    size: { sm: 12, md: 14, lg: 18, xl: 22 },
    weight: { regular: 400, medium: 500, semibold: 600 },
  },

  // Depth/elevation (soft shadows for cards and hover)
  shadow: {
    card: "0 8px 24px rgba(0,0,0,0.25)",
    hover: "0 12px 32px rgba(0,0,0,0.35)",
  },
};
