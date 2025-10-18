import React from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import type { PokemonListItem as Item } from "../../hooks/useGetPokemons";

// Card for each Pokémon in the list/grid.
// Clean, slightly animated on hover (lift + blue ring), keyboard accessible.
const useStyles = createUseStyles(
  {
    card: {
      // base tile look
      display: "grid",
      gridTemplateRows: "1fr auto",
      borderRadius: 14,
      background:
        "linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02))",
      border: "1px solid rgba(255,255,255,.10)",
      boxShadow: "0 2px 0 rgba(0,0,0,.25) inset",
      overflow: "hidden",
      textDecoration: "none",
      color: "#e6e7eb",
      position: "relative",
      transition:
        "transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease",
      willChange: "transform",

      // pointer affordance
      cursor: "pointer",

      // subtle separation from the background even when not hovered
      outline: "1px solid rgba(0,0,0,.25)",
      outlineOffset: 0,

      // hover/focus state: lift + blue ring
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow:
          "0 10px 28px rgba(0,0,0,.40), 0 0 0 2px rgba(56,132,255,.35) inset",
        borderColor: "rgba(56,132,255,.55)",
      },

      // keyboard focus ring (visible only when tabbing)
      "&:focus-visible": {
        transform: "translateY(-3px)",
        boxShadow:
          "0 10px 28px rgba(0,0,0,.40), 0 0 0 3px rgba(56,132,255,.75) inset",
        borderColor: "rgba(56,132,255,.85)",
      },

      // motion safety
      "@media (prefers-reduced-motion: reduce)": {
        transition: "none",
        "&:hover, &:focus-visible": { transform: "none" },
      },
    },

    // top area that holds the sprite
    media: {
      display: "grid",
      placeItems: "center",
      padding: 24,
      background: "rgba(0,0,0,.15)", // faint split from the metadata area
      transition: "background 160ms ease",
      "& img": {
        width: 180,
        height: 180,
        objectFit: "contain",
        transition: "transform 160ms ease",
      },
      // slight header brighten + sprite float on hover (via parent)
      "$card:hover &": { background: "rgba(0,0,0,.20)" },
      "$card:hover & img": { transform: "translateY(-4px)" },
      "$card:focus-visible &": { background: "rgba(0,0,0,.22)" },
      "$card:focus-visible & img": { transform: "translateY(-4px)" },
    },

    // bottom meta area (name, number, chips)
    meta: {
      display: "grid",
      gap: 6,
      padding: 16,
    },
    name: { fontWeight: 700, letterSpacing: 0.15 },
    number: { fontSize: 12, color: "rgba(230,231,235,.65)" },

    chips: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 },
    chip: {
      fontSize: 12,
      padding: "4px 10px",
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,.12)",
      background: "rgba(255,255,255,.06)",
      color: "#e6e7eb",
    },
  },
  { name: "PokemonListItem" }
);

type Props = {
  p: Item;
  listMode?: boolean; // still here if you switch views, but not required for grid
};

const PokemonListItem: React.FC<Props> = ({ p }) => {
  const s = useStyles();

  return (
    <Link
      to={`/pokemon/${encodeURIComponent(p.name)}`}
      className={s.card}
      aria-label={`${p.name} details`}
    >
      <div className={s.media}>
        <img src={p.image} alt={p.name} />
      </div>

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
    </Link>
  );
};

export default PokemonListItem;
