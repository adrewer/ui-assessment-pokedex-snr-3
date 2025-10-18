// src/screens/ListPage.tsx
import React from "react";
import { createUseStyles } from "react-jss";
import { PokemonList } from "../components";

export const ListPage = () => {
  const s = useStyles();

  return (
    // this wrapper becomes our "stage" for the grid
    <div className={s.stage}>
      {/* this is the diagonal background LAYER, under everything */}
      <div className={s.texture} aria-hidden /> 

      {/* your actual content sits above */}
      <div className={s.content}>
        <PokemonList />
      </div>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    // relative so the texture (absolute) anchors to this area only
    stage: {
      position: "relative",
      minHeight: "100%",
      padding: "24px 24px 40px",
    },

    // the diagonal slabs — lives *behind* the cards
    texture: {
      position: "absolute",
      inset: 0,
      zIndex: 0,                // UNDER the content
      pointerEvents: "none",    // don’t steal clicks/scroll
      // bold diagonal slabs + a soft vertical falloff
      backgroundImage: `
        /* wide, dark diagonal bands */
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
        /* subtle highlight edges for the “cut” feel */
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
        /* very soft vertical vignette for depth */
        linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0) 60%)
      `,
      backgroundSize: "1200px 1200px, 1200px 1200px, 100% 100%",
      backgroundRepeat: "repeat, repeat, no-repeat",
      backgroundAttachment: "local, local, local", // tied to this scroll area only
      backgroundBlendMode: "overlay, normal, normal",
      filter: "contrast(1.06) brightness(1.02)",
      borderRadius: 16, // matches card feel
    },

    // put grid and filters ABOVE the texture
    content: {
      position: "relative",
      zIndex: 1,
    },
  },
  { name: "ListPage" }
);
