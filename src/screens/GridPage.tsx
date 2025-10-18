import React from "react";
import { createUseStyles } from "react-jss";
import { PokemonList } from "../components";
import PokemonDialog from "../components/PokemonDialog/PokemonDialog";

export const ListPage = () => {
  const s = useStyles();
  return (
    <div className={s.root}>
      <PokemonList />
      <PokemonDialog />
    </div>
  );
};

const useStyles = createUseStyles(
  { root: { width: "100%", height: "100%" } },
  { name: "ListPage" }
);
