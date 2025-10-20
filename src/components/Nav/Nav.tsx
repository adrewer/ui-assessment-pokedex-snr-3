import React from "react";
import { createUseStyles } from "react-jss";
import { useLocation, useNavigate } from "react-router-dom";
import { useLayout, useToggleNav } from "../../contexts";

/** Layout widths for expanded/collapsed nav */
const NAV_WIDE = 320;
const NAV_COLLAPSED = 104;

/** Filter options by Pokémon type */
const TYPES = [
  "All", "Grass", "Fire", "Water", "Electric", "Bug", "Poison", "Flying", "Ground",
  "Rock", "Psychic", "Ice", "Dragon", "Ghost", "Dark", "Steel", "Fairy", "Fighting"
];

export const Nav: React.FC = () => {
  const { navCollapsed } = useLayout();      // Read current nav state
  const toggleNav = useToggleNav();          // Toggle nav width
  const s = useStyles({ navCollapsed });

  const nav = useNavigate();
  const { pathname, search } = useLocation();
  const params = React.useMemo(() => new URLSearchParams(search), [search]);

  // Read current filter/sort/view state from URL
  const currentType = params.get("type") ?? "All";
  const sort = params.get("sort") ?? "numberAsc";
  const view = params.get("view") ?? "grid";

  // Update a single query param and preserve others
  const update = (key: string, val: string) => {
    const next = new URLSearchParams(params);
    if (val === "All" || val === "") next.delete(key);
    else next.set(key, val);
    nav(`${pathname}?${next.toString()}`, { replace: true });
  };

  return (
    <>
      <aside className={s.root}>
        <div className={s.main}>
          {/* Brand */}
          <div className={s.title}>
            <img src="/pokeball-white.png" className={s.img} alt="Pokéball" />
            <h3>Pokédex</h3>
          </div>

          {/* View toggle */}
          <div className={s.section}>
            <h4 className={s.sectionTitle}>View</h4>
            <div className={s.viewRow}>
              <button
                className={view === "grid" ? s.pillActive : s.pill}
                onClick={() => update("view", "grid")}
              >
                Grid
              </button>
              <button
                className={view === "list" ? s.pillActive : s.pill}
                onClick={() => update("view", "list")}
              >
                List
              </button>
            </div>
          </div>

          {/* Filter by type */}
          <div className={s.section}>
            <h4 className={s.sectionTitle}>Filter</h4>
            <div className={s.pillGroup}>
              {TYPES.map((t) => (
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

          {/* Sort options */}
          <div className={s.section}>
            <h4 className={s.sectionTitle}>Sort</h4>
            <div className={s.pillRow}>
              <button
                className={sort === "numberAsc" ? s.pillActive : s.pill}
                onClick={() => update("sort", "numberAsc")}
              >
                # ↑
              </button>
              <button
                className={sort === "numberDesc" ? s.pillActive : s.pill}
                onClick={() => update("sort", "numberDesc")}
              >
                # ↓
              </button>
              <button
                className={sort === "nameAsc" ? s.pillActive : s.pill}
                onClick={() => update("sort", "nameAsc")}
              >
                A–Z
              </button>
              <button
                className={sort === "nameDesc" ? s.pillActive : s.pill}
                onClick={() => update("sort", "nameDesc")}
              >
                Z–A
              </button>
            </div>
          </div>
        </div>

        {/* Collapse control */}
        <div className={s.bottom}>
          <button className={s.expandBtn} onClick={toggleNav}>
            <span className={`${s.btnIcon} material-icons`}>
              {navCollapsed ? "unfold_more" : "unfold_less"}
            </span>
            <span className={s.btnTxt}>Collapse</span>
          </button>
        </div>
      </aside>

      {/* Spacer to prevent content from sliding under nav */}
      <div className={s.spacer} />
    </>
  );
};

interface StyleProps {
  navCollapsed: boolean;
}

// JSS styles for nav layout and behavior
const useStyles = createUseStyles(
  {
    root: {
      zIndex: 100,
      background: "#131924",
      position: "fixed",
      inset: "0 auto 0 0",
      width: (p: StyleProps) => (p.navCollapsed ? NAV_COLLAPSED : NAV_WIDE),
      display: "flex",
      flexDirection: "column",
      transition: "width .2s ease-in-out",
      overflow: "hidden",
    },
    spacer: {
      width: (p: StyleProps) => (p.navCollapsed ? NAV_COLLAPSED : NAV_WIDE),
      transition: "width .2s ease-in-out",
    },
    main: {
      flex: 1,
      overflowY: "auto",
      paddingRight: 6,
      "& > *": {
        paddingLeft: 18,
        paddingRight: 18,
      },
    },

    title: {
      display: "flex",
      alignItems: "center",
      "& h3": { marginLeft: 12 },
    },
    img: {
      width: 36,
      filter: "brightness(85%)",
      margin: "12px 0",
    },

    section: { marginTop: 16 },
    sectionTitle: {
      margin: "8px 0",
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: 1,
      opacity: 0.75,
    },

    pillGroup: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      justifyContent: (p: StyleProps) =>
        p.navCollapsed ? "center" : "flex-start",
    },
    pillRow: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      justifyContent: (p: StyleProps) =>
        p.navCollapsed ? "center" : "flex-start",
    },
    viewRow: {
      display: "flex",
      gap: 8,
      alignItems: "center",
      width: "100%",
      flexDirection: (p: StyleProps) =>
        p.navCollapsed ? "column" : "row",
      justifyContent: (p: StyleProps) =>
        p.navCollapsed ? "center" : "flex-start",
    },

    pill: {
      border: "1px solid rgba(255,255,255,.15)",
      background: "transparent",
      color: "#e6e7eb",
      borderRadius: 999,
      padding: "6px 12px",
      cursor: "pointer",
      fontSize: 14,
      "&:hover": {
        background: "rgba(255,255,255,.06)",
      },
    },
    pillActive: {
      composes: "$pill",
      background: "rgba(255,255,255,.12)",
      borderColor: "rgba(255,255,255,.25)",
    },

    bottom: {
      display: "flex",
      alignItems: "center",
      padding: "12px 18px",
      borderTop: "2px solid rgba(255,255,255,.08)",
    },
    expandBtn: {
      background: "transparent",
      display: "flex",
      alignItems: "center",
      width: "100%",
      cursor: "pointer",
    },
    btnIcon: {
      transform: "rotate(90deg)",
    },
    btnTxt: {
      marginLeft: 12,
    },
  },
  { name: "Nav" }
);

export default Nav;
