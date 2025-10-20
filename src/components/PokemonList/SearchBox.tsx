import React from "react";
import { createUseStyles } from "react-jss";

// Props for controlled input behavior
type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

// JSS styles for search input
const useStyles = createUseStyles({
  root: {
    display: "flex",
    alignItems: "center",
    padding: "10px 14px",
    borderRadius: 999,                           // Pill shape
    border: "1px solid rgba(255,255,255,.15)", // Subtle border
    background: "rgba(255,255,255,.06)",       // Translucent background
    marginBottom: 16,
  },
  input: {
    flex: 1,
    background: "transparent",
    color: "#e6e7eb",
    border: 0,
    outline: "none",
    fontSize: 14,
  },
});

// Search box component for filtering Pokémon list
export const SearchBox: React.FC<Props> = ({ value, onChange, placeholder }) => {
  const s = useStyles();

  return (
    <label className={s.root} aria-label="Search Pokémon">
      <input
        className={s.input}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
};
