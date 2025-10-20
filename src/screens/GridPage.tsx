import React from "react";
import { createUseStyles } from "react-jss";
import { PokemonList } from "../components";
import PokemonDialog from "../components/PokemonDialog/PokemonDialog";

// Grid-style layout that displays the full list and modal together
export const ListPage = () => {
  const s = useStyles();

  return (
    <div className={s.root}>
      <PokemonList />     {/* Full Pokémon list */}
      <PokemonDialog />   {/* Modal always rendered (not route-dependent) */}
    </div>
  );
};

// Basic container styles
const useStyles = createUseStyles(
  {
    root: {
      width: "100%",
      height: "100%",
    },
  },
  { name: "ListPage" }
);
