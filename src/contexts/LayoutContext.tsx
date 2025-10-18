import React, { createContext, useContext, useState } from "react";

// simple layout context; only tracks left-nav collapsed state for now
type LayoutCtx = {
  navCollapsed: boolean;
  toggleNav: () => void;
};

const Ctx = createContext<LayoutCtx | undefined>(undefined);

const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [navCollapsed, setNavCollapsed] = useState(false);
  const toggleNav = () => setNavCollapsed(v => !v);
  return <Ctx.Provider value={{ navCollapsed, toggleNav }}>{children}</Ctx.Provider>;
};

export function useLayout() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useLayout must be used within LayoutProvider");
  return v;
}
export const useToggleNav = () => useLayout().toggleNav;

export default LayoutProvider;
