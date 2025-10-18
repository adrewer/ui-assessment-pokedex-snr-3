import React from "react";
import { createUseStyles } from "react-jss";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPokemon } from "../../hooks/useGetPokemon";

const useStyles = createUseStyles({
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  dialog: { width: "min(920px, 92vw)", maxHeight: "90vh", background: "#141a26", border: "1px solid rgba(255,255,255,.12)", borderRadius: 20, boxShadow: "0 18px 48px rgba(0,0,0,.45)", display: "grid", gridTemplateRows: "auto 1fr" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, borderBottom: "1px solid rgba(255,255,255,.12)" },
  title: { margin: 0, fontSize: 20, fontWeight: 700, color: "#e6e7eb" },
  closeBtn: { border: "1px solid rgba(255,255,255,.2)", background: "transparent", borderRadius: 8, padding: "6px 10px", cursor: "pointer", color: "#e6e7eb", "&:hover": { background: "rgba(255,255,255,.06)" } },
  body: { padding: 20, overflow: "auto" },
  grid: { display: "grid", gridTemplateColumns: "280px 1fr", gap: 20, "@media (max-width: 720px)": { gridTemplateColumns: "1fr" } },
  spriteWrap: { display: "grid", placeItems: "center", background: "rgba(255,255,255,.04)", borderRadius: 12, padding: 16 },
  sprite: { width: 220, height: 220, objectFit: "contain" },
  section: { display: "grid", gap: 12 },
  row: { display: "grid", gridTemplateColumns: "150px 1fr", gap: 12 },
  label: { color: "rgba(230,231,235,.75)", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 },
  value: { color: "#e6e7eb", fontSize: 14 },
  chips: { display: "flex", flexWrap: "wrap", gap: 8 },
  chip: { background: "rgba(255,255,255,.08)", color: "#e6e7eb", border: "1px solid rgba(255,255,255,.12)", borderRadius: 999, padding: "4px 10px", fontSize: 12 },
  loading: { padding: 20, color: "rgba(230,231,235,.75)" },
  error: { padding: 20, color: "#ff7b7b" },
});

type Params = { name?: string };

const PokemonDialog: React.FC = () => {
  const s = useStyles();
  const nav = useNavigate();
  const { name } = useParams<Params>();
  const open = !!name;
  const close = () => nav(-1);

  // grab the details for the selected pokemon (by name)
  const { data, loading, error } = useGetPokemon({ name: name ?? "" });
  const p = data ?? null;

  if (!open) return null;

  // simple escape-to-close
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
          <button className={s.closeBtn} onClick={close} aria-label="Close">Close</button>
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

                {/* NOTE: typed map callbacks to avoid implicit any */}
                <div className={s.row}>
                  <span className={s.label}>Types</span>
                  <div className={s.chips}>
                    {p.types.map((t: string) => (
                      <span key={t} className={s.chip}>{t}</span>
                    ))}
                  </div>
                </div>

                <div className={s.row}>
                  <span className={s.label}>Resistant</span>
                  <div className={s.chips}>
                    {p.resistant.map((t: string) => (
                      <span key={t} className={s.chip}>{t}</span>
                    ))}
                  </div>
                </div>

                <div className={s.row}>
                  <span className={s.label}>Weaknesses</span>
                  <div className={s.chips}>
                    {p.weaknesses.map((t: string) => (
                      <span key={t} className={s.chip}>{t}</span>
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
