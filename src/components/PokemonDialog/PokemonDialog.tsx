import React from "react";
import { createUseStyles } from "react-jss";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPokemon } from "../../hooks/useGetPokemon";
import { useLayout } from "../../contexts";

// JSS styles for modal layout and content
const useStyles = createUseStyles({
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 1000,
  },
  dialog: {
    position: "absolute",
    left: (props: { navCollapsed: boolean }) => (props.navCollapsed ? 80 : 240),
    right: 0,
    margin: "auto",
    width: "min(720px, 80vw)",
    maxHeight: "90vh",
    background: "#141a26",
    border: "1px solid rgba(255,255,255,.12)",
    borderRadius: 20,
    boxShadow: "0 18px 48px rgba(0,0,0,.45)",
    display: "grid",
    gridTemplateRows: "auto 1fr",
    zIndex: 1001,
    transition: "left 240ms ease",
    overflow: "hidden",
    "@media (max-width: 720px)": {
      left: 0,
      right: 0,
      margin: "auto",
      width: "92vw",
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottom: "1px solid rgba(255,255,255,.12)",
  },
  title: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
    color: "#e6e7eb",
  },
  closeBtn: {
    border: "1px solid rgba(255,255,255,.2)",
    background: "transparent",
    borderRadius: 8,
    padding: "6px 10px",
    cursor: "pointer",
    color: "#e6e7eb",
    "&:hover": {
      background: "rgba(255,255,255,.06)",
    },
  },
  body: {
    padding: 20,
    overflow: "auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "240px 1fr",
    gap: 20,
    "@media (max-width: 720px)": {
      gridTemplateColumns: "1fr",
    },
  },
  spriteWrap: {
    display: "grid",
    placeItems: "center",
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 1px 0 rgba(0,0,0,.18) inset",
    width: 240,
    height: 240,
    margin: "0 auto",
    overflow: "hidden",
  },
  sprite: {
    width: 180,
    height: 180,
    objectFit: "contain",
    margin: "auto",
  },
  section: {
    display: "grid",
    gap: 12,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "150px 1fr",
    gap: 12,
  },
  label: {
    color: "rgba(230,231,235,.75)",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: {
    color: "#e6e7eb",
    fontSize: 14,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    background: "rgba(255,255,255,.08)",
    color: "#e6e7eb",
    border: "1px solid rgba(255,255,255,.12)",
    borderRadius: 999,
    padding: "4px 10px",
    fontSize: 12,
  },
  loading: {
    padding: 20,
    color: "rgba(230,231,235,.75)",
  },
  error: {
    padding: 20,
    color: "#ff7b7b",
  },
});

type Params = { name?: string };

// Modal component for detailed Pokémon info
const PokemonDialog: React.FC = () => {
  const { navCollapsed } = useLayout(); // Layout context for nav offset
  const s = useStyles({ navCollapsed });
  const nav = useNavigate();
  const { name } = useParams<Params>();
  const open = !!name;
  const close = () => nav(-1); // Close modal by navigating back

  const { data, loading, error } = useGetPokemon({ name: name ?? "" });
  const p = data ?? null;

  if (!open) return null;

  // Close modal on Escape key
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={s.overlay} onClick={close} aria-modal="true" role="dialog">
      <div className={s.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={s.header}>
          <h2 className={s.title}>{p?.name ?? name}</h2>
          <button className={s.closeBtn} onClick={close} aria-label="Close">
            Close
          </button>
        </div>

        {loading && <div className={s.loading}>Loading…</div>}
        {error && <div className={s.error}>Couldn’t load details.</div>}

        {!loading && !error && p && (
          <div className={s.body}>
            <div className={s.grid}>
              <div className={s.spriteWrap}>
                <img className={s.sprite} src={p.image} alt={p.name} />
              </div>

              <div className={s.section}>
                <div className={s.row}>
                  <span className={s.label}>Number</span>
                  <span className={s.value}>#{p.number}</span>
                </div>

                <div className={s.row}>
                  <span className={s.label}>Classification</span>
                  <span className={s.value}>{p.classification}</span>
                </div>

                <div className={s.row}>
                  <span className={s.label}>Types</span>
                  <div className={s.chips}>
                    {p.types.map((t: string) => (
                      <span key={t} className={s.chip}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={s.row}>
                  <span className={s.label}>Resistant</span>
                  <div className={s.chips}>
                    {p.resistant.map((t: string) => (
                      <span key={t} className={s.chip}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={s.row}>
                  <span className={s.label}>Weaknesses</span>
                  <div className={s.chips}>
                    {p.weaknesses.map((t: string) => (
                      <span key={t} className={s.chip}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={s.row}>
                  <span className={s.label}>Height</span>
                  <span className={s.value}>
                    {p.height.minimum} – {p.height.maximum}
                  </span>
                </div>

                <div className={s.row}>
                  <span className={s.label}>Weight</span>
                  <span className={s.value}>
                    {p.weight.minimum} – {p.weight.maximum}
                  </span>
                </div>

                <div className={s.row}>
                  <span className={s.label}>Max HP / CP</span>
                  <span className={s.value}>
                    {p.maxHP} / {p.maxCP}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDialog;
