import React from "react";
import { createUseStyles } from "react-jss";
import { useLayout, useToggleNav } from "../../contexts";
import { NavOption } from "./NavOption";
import { useLocation, useNavigate } from "react-router-dom";

const TYPES = ["All","Grass","Fire","Water","Electric","Bug","Poison","Flying","Ground","Rock","Psychic","Ice","Dragon","Ghost","Dark","Steel","Fairy","Fighting"];

export const Nav: React.FC = () => {
  const { navCollapsed } = useLayout();
  const toggleNav = useToggleNav();
  const s = useStyles({ navCollapsed });
  const nav = useNavigate();
  const { pathname, search } = useLocation();
  const params = React.useMemo(() => new URLSearchParams(search), [search]);

  // utilities to update query params in-place
  const update = (key: string, val: string) => {
    const p = new URLSearchParams(params);
    if (val === "All" || val === "") p.delete(key);
    else p.set(key, val);
    nav(`${pathname}?${p.toString()}`, { replace: true });
  };

  const currentType = params.get("type") ?? "All";
  const sort = params.get("sort") ?? "numberAsc";
  const view = params.get("view") ?? "grid";

  return (
    <>
      <aside className={s.root}>
        <div className={s.main}>
          {/* header */}
          <div className={s.title}>
            <img src="/pokeball-white.png" className={s.img} alt="Pokéball" />
            <h3>Pokédex</h3>
          </div>

          {/* primary destination */}
          <NavOption to="/pokemon" icon="view_module">List</NavOption>

          {/* filters */}
          <div className={s.section}>
            <h4 className={s.sectionTitle}>Filter</h4>
            <div className={s.pillGroup}>
              {TYPES.map(t => (
                <button
                  key={t}
                  className={t === currentType ? s.pillActive : s.pill}
                  onClick={() => update("type", t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* sort */}
          <div className={s.section}>
            <h4 className={s.sectionTitle}>Sort</h4>
            <div className={s.pillRow}>
              <button className={sort === "numberAsc" ? s.pillActive : s.pill} onClick={() => update("sort","numberAsc")}># ↑</button>
              <button className={sort === "numberDesc" ? s.pillActive : s.pill} onClick={() => update("sort","numberDesc")}># ↓</button>
              <button className={sort === "nameAsc" ? s.pillActive : s.pill} onClick={() => update("sort","nameAsc")}>A–Z</button>
              <button className={sort === "nameDesc" ? s.pillActive : s.pill} onClick={() => update("sort","nameDesc")}>Z–A</button>
            </div>
          </div>

          {/* view */}
          <div className={s.section}>
            <h4 className={s.sectionTitle}>View</h4>
            <div className={s.pillRow}>
              <button className={view === "grid" ? s.pillActive : s.pill} onClick={() => update("view","grid")}>Grid</button>
              <button className={view === "list" ? s.pillActive : s.pill} onClick={() => update("view","list")}>List</button>
            </div>
          </div>
        </div>

        {/* collapse control */}
        <div className={s.bottom}>
          <button className={s.expandBtn} onClick={toggleNav}>
            <span className={`${s.btnIcon} material-icons`}>
              {navCollapsed ? "unfold_more" : "unfold_less"}
            </span>
            <span className={s.btnTxt}>Collapse</span>
          </button>
        </div>
      </aside>
      <div className={s.spacer} />
    </>
  );
};

interface StyleProps { navCollapsed: boolean; }

const useStyles = createUseStyles(
  {
    root: {
      zIndex: 100,
      background: "#131924",
      position: "fixed",
      inset: "0 auto 0 0",
      width: (p: StyleProps) => (p.navCollapsed ? 81 : 320),
      display: "flex",
      flexDirection: "column",
      transition: "width .2s ease-in-out",
      overflow: "hidden",
    },
    spacer: { width: (p: StyleProps) => (p.navCollapsed ? 81 : 320), transition: "width .2s ease-in-out" },
    main: { flex: 1, overflowY: "auto", paddingRight: 6, "& > *": { paddingLeft: 18, paddingRight: 18 } },
    title: { display: "flex", alignItems: "center", "& h3": { marginLeft: 12 } },
    img: { width: 36, filter: "brightness(85%)", margin: "12px 0" },

    section: { marginTop: 16 },
    sectionTitle: { margin: "8px 0", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, opacity: 0.75 },

    pillGroup: { display: "flex", flexWrap: "wrap", gap: 8 },
    pillRow: { display: "flex", gap: 8 },
    pill: {
      border: "1px solid rgba(255,255,255,.15)",
      background: "transparent",
      color: "#e6e7eb",
      borderRadius: 999,
      padding: "6px 10px",
      cursor: "pointer",
      fontSize: 12,
      "&:hover": { background: "rgba(255,255,255,.06)" },
    },
    pillActive: {
      composes: "$pill",
      background: "rgba(255,255,255,.12)",
      borderColor: "rgba(255,255,255,.25)",
    },

    bottom: {
      display: "flex", alignItems: "center", padding: "12px 18px",
      borderTop: "2px solid rgba(255,255,255,.08)"
    },
    expandBtn: { background: "transparent", display: "flex", alignItems: "center", width: "100%", cursor: "pointer" },
    btnIcon: { transform: "rotate(90deg)" },
    btnTxt: { marginLeft: 12 },
  },
  { name: "Nav" }
);
