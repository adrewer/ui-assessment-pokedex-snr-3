import React from "react";
import { createUseStyles } from "react-jss";
import { useLocation } from "react-router-dom";
import { PokemonList } from "../components";
import { PokemonDialog } from "../components";

// Page-level layout styles using JSS
const useStyles = createUseStyles({
  stage: {
    position: "relative",           // Contains background + content
    minHeight: "100%",              // Ensures full viewport height
    padding: "24px 24px 40px",      // Page padding
  },
  texture: {
    position: "absolute",           // Full-page background layer
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",          // Non-interactive
    backgroundImage: `
      linear-gradient(
        135deg,
        rgba(0,0,0,0) 0%,
        rgba(0,0,0,0.55) 12%,
        rgba(0,0,0,0) 25%,
        rgba(0,0,0,0.55) 37%,
        rgba(0,0,0,0) 50%,
        rgba(0,0,0,0.55) 62%,
        rgba(0,0,0,0) 75%,
        rgba(0,0,0,0.55) 87%,
        rgba(0,0,0,0) 100%
      ),
      linear-gradient(
        135deg,
        rgba(255,255,255,0) 0%,
        rgba(255,255,255,0.09) 10%,
        rgba(255,255,255,0) 12%,
        rgba(255,255,255,0.09) 22%,
        rgba(255,255,255,0) 25%,
        rgba(255,255,255,0.09) 35%,
        rgba(255,255,255,0) 37%,
        rgba(255,255,255,0.09) 47%,
        rgba(255,255,255,0) 50%,
        rgba(255,255,255,0.09) 60%,
        rgba(255,255,255,0) 62%,
        rgba(255,255,255,0.09) 72%,
        rgba(255,255,255,0) 75%,
        rgba(255,255,255,0.09) 85%,
        rgba(255,255,255,0) 87%,
        rgba(255,255,255,0.09) 97%,
        rgba(255,255,255,0) 100%
      ),
      linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0) 60%)
    `,
    backgroundSize: "1200px 1200px, 1200px 1200px, 100% 100%",
    backgroundRepeat: "repeat, repeat, no-repeat",
    backgroundAttachment: "local, local, local",
    backgroundBlendMode: "overlay, normal, normal",
    filter: "contrast(1.06) brightness(1.02)",
    borderRadius: 16,
  },
  content: {
    position: "relative",           // Ensures content sits above texture
    zIndex: 1,
  },
});

const ListPage = () => {
  const s = useStyles();
  const location = useLocation();
  const background = location.state?.background; // Used to control modal routing

  return (
    <>
      <div className={s.stage}>
        <div className={s.texture} aria-hidden /> {/* Decorative background */}
        <div className={s.content}>
          <PokemonList /> {/* Main list of Pokémon */}
        </div>
      </div>

      {/* Route-dependent modal rendered outside scrollable content */}
      {background && <PokemonDialog />}
    </>
  );
};

export default ListPage;
