import React from "react";
import { createUseStyles } from "react-jss";
import { Link, useLocation } from "react-router-dom";
import type { PokemonListItem as Item } from "../../hooks/useGetPokemons";

// Props for rendering a single Pokémon card
type Props = {
  p: Item;
  listMode?: boolean;
};

// Used to conditionally style layout based on list/grid mode
type StyleProps = { listMode?: boolean };

// JSS styles for card layout and hover behavior
const useStyles = createUseStyles(
  {
    card: {
      borderRadius: 14,
      backgroundColor: "#0f1522",
      border: "1px solid rgba(255,255,255,.10)",
      boxShadow: "0 2px 0 rgba(0,0,0,.28) inset, 0 6px 18px rgba(0,0,0,.35)",
      color: "#e6e7eb",
      textDecoration: "none",
      overflow: "hidden",
      position: "relative",
      transition:
        "transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease",
      outline: "1px solid rgba(0,0,0,.25)",

      // Hover and focus styles
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow:
          "0 10px 28px rgba(0,0,0,.40), 0 0 0 2px rgba(56,132,255,.35) inset",
        borderColor: "rgba(56,132,255,.55)",
      },
      "&:focus-visible": {
        transform: "translateY(-2px)",
        boxShadow:
          "0 10px 28px rgba(0,0,0,.40), 0 0 0 3px rgba(56,132,255,.75) inset",
        borderColor: "rgba(56,132,255,.85)",
      },

      // Layout adjustments based on listMode
      display: (p: StyleProps) => "grid",
      gridTemplateColumns: (p: StyleProps) =>
        p.listMode ? "112px 1fr auto" : "1fr",
      gridTemplateRows: (p: StyleProps) => (p.listMode ? "auto" : "1fr auto"),
      alignItems: (p: StyleProps) => (p.listMode ? "center" : "stretch"),
      gap: (p: StyleProps) => (p.listMode ? 16 : 0),
      padding: (p: StyleProps) => (p.listMode ? "10px 16px" : 0),
      minHeight: (p: StyleProps) => (p.listMode ? 124 : 0),

      // Accessibility: disable motion for reduced-motion users
      "@media (prefers-reduced-motion: reduce)": {
        transition: "none",
        "&:hover, &:focus-visible": { transform: "none" },
      },
    },

    // Grid-style media container (non-list mode)
    media: {
      display: "grid",
      placeItems: "center",
      background: "rgba(0,0,0,.15)",
      padding: 24,
    },

    // Card-style image container
    canvas: {
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 1px 0 rgba(0,0,0,.18) inset",
      width: 200,
      height: 200,
      display: "grid",
      placeItems: "center",
      "& img": {
        width: 180,
        height: 180,
        objectFit: "contain",
        transition: "transform 160ms ease",
        margin: "auto",
      },
      "$card:hover & img": { transform: "translateY(-4px)" },
      "$card:focus-visible & img": { transform: "translateY(-4px)" },
    },

    // Compact media container (list mode)
    mediaList: {
      display: "grid",
      placeItems: "center",
      background: "rgba(0,0,0,.20)",
      borderRadius: 10,
      width: 96,
      height: 96,
    },

    // Compact image container (list mode)
    canvasList: {
      background: "#fff",
      borderRadius: 10,
      boxShadow: "0 1px 0 rgba(0,0,0,.18) inset",
      width: 88,
      height: 88,
      display: "grid",
      placeItems: "center",
      "& img": {
        width: 76,
        height: 76,
        objectFit: "contain",
        margin: "auto",
      },
    },

    // Metadata section: name, number, types
    meta: {
      display: "grid",
      gap: 6,
      padding: (p: StyleProps) => (p.listMode ? 0 : 16),
    },
    name: {
      fontWeight: 700,
      letterSpacing: 0.15,
    },
    number: {
      fontSize: 12,
      color: "rgba(230,231,235,.65)",
    },

    // Type pill container
    chips: {
      display: "flex",
      flexWrap: "wrap",
      gap: (p: StyleProps) => (p.listMode ? 6 : 8),
      marginTop: (p: StyleProps) => (p.listMode ? 4 : 6),
    },

    // Individual type pill
    chip: {
      fontSize: (p: StyleProps) => (p.listMode ? 11 : 12),
      padding: (p: StyleProps) => (p.listMode ? "2px 8px" : "4px 10px"),
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,.12)",
      background: "rgba(255,255,255,.06)",
      color: "#e6e7eb",
    },

    // Decorative tail element (list mode only)
    tail: {
      display: (p: StyleProps) => (p.listMode ? "block" : "none"),
      width: 12,
      height: 1,
    },
  },
  { name: "PokemonListItem" }
);

const PokemonListItem: React.FC<Props> = ({ p, listMode }) => {
  const s = useStyles({ listMode });
  const location = useLocation();

  return (
    <Link
      to={`/pokemon/${encodeURIComponent(p.name)}${location.search}`}
      state={{ background: location }} // Enables modal overlay routing
      className={s.card}
      aria-label={`${p.name} details`}
    >
      {listMode ? (
        <div className={s.mediaList}>
          <div className={s.canvasList}>
            <img src={p.image} alt={p.name} />
          </div>
        </div>
      ) : (
        <div className={s.media}>
          <div className={s.canvas}>
            <img src={p.image} alt={p.name} />
          </div>
        </div>
      )}

      <div className={s.meta}>
        <div className={s.name}>{p.name}</div>
        <div className={s.number}>#{p.number?.toString().padStart(3, "0")}</div>
        <div className={s.chips}>
          {p.types?.map((t) => (
            <span key={t} className={s.chip}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className={s.tail} />
    </Link>
  );
};

export default PokemonListItem;
