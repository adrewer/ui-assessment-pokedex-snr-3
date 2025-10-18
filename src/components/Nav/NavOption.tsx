import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

type Props = { to: string; icon: string; children: React.ReactNode };

export const NavOption: React.FC<Props> = ({ to, icon, children }) => {
  const { pathname, search } = useLocation();
  const s = useStyles({ active: pathname === to });
  return (
    <Link to={`${to}${search}`} className={s.root} aria-current={pathname === to ? "page" : undefined}>
      <span className={clsx("material-icons", s.icon)} aria-hidden>
        {icon}
      </span>
      <span className={s.label}>{children}</span>
    </Link>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      display: "flex",
      alignItems: "center",
      height: 44,
      gap: 12,
      color: "#e6e7eb",
      textDecoration: "none",
      borderRadius: 10,
      margin: "6px 8px",
      padding: "0 12px",
      background: (p: { active: boolean }) => (p.active ? "rgba(255,255,255,.08)" : "transparent"),
      "&:hover": { background: "rgba(255,255,255,.06)" },
    },
    icon: { opacity: 0.9 },
    label: { whiteSpace: "nowrap" },
  },
  { name: "NavOption" }
);
