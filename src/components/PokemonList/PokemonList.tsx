import React from "react";
import { createUseStyles } from "react-jss";
import { useGetPokemons, PokemonListItem } from "../../hooks/useGetPokemons";
import { useLocation } from "react-router-dom";
import { SearchBox } from "./SearchBox";
import PokemonListItemCard from "./PokemonListItem";

const useStyles = createUseStyles({
  root: { padding: 24, maxWidth: 1200, margin: "0 auto" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 16,
    alignItems: "stretch",
  },
  list: { display: "grid", gap: 12 },
  muted: { color: "rgba(230,231,235,.7)", padding: "12px 0" },
});

export const PokemonList: React.FC = () => {
  const s = useStyles();

  // ✅ use the hook with the default (151) — or pass a number if you want more
  const { data: pokemons, loading, error } = useGetPokemons();

  const { search } = useLocation();
  const params = React.useMemo(() => new URLSearchParams(search), [search]);

  // state from URL
  const qType = params.get("type") ?? "All";
  const sort = params.get("sort") ?? "numberAsc";
  const view = params.get("view") ?? "grid";

  // local search input
  const [q, setQ] = React.useState("");

  // filter + search
  const filtered = React.useMemo(() => {
    const v = q.trim().toLowerCase();
    return pokemons.filter((p: PokemonListItem) => {
      const matchesSearch =
        !v ||
        p.name.toLowerCase().includes(v) ||
        p.id.includes(v) ||
        p.number?.toString().includes(v);
      const matchesType = qType === "All" || p.types?.includes(qType);
      return matchesSearch && matchesType;
    });
  }, [q, qType, pokemons]);

  // sort
  const sorted = React.useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "numberAsc":
        arr.sort((a, b) => Number(a.number) - Number(b.number));
        break;
      case "numberDesc":
        arr.sort((a, b) => Number(b.number) - Number(a.number));
        break;
      case "nameAsc":
        arr.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameDesc":
        arr.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    return arr;
  }, [filtered, sort]);

  const containerClass = view === "list" ? s.list : s.grid;

  if (loading) return <div className={s.root}><div className={s.muted}>Loading…</div></div>;
  if (error)   return <div className={s.root}><div className={s.muted}>Couldn’t load Pokémon.</div></div>;

  return (
    <div className={s.root}>
      <SearchBox value={q} onChange={setQ} placeholder="Search by name or number…" />
      <div className={containerClass}>
        {sorted.map((p: PokemonListItem) => (
          <PokemonListItemCard key={p.id} p={p} listMode={view === "list"} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
