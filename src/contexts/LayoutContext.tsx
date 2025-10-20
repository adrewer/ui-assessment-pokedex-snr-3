import React, { createContext, useContext, useState } from "react";

// Layout context: tracks left-nav collapsed state and exposes a toggle function

type LayoutCtx = {
  navCollapsed: boolean;
  toggleNav: () => void;
};

// Internal context container
const Ctx = createContext<LayoutCtx | undefined>(undefined);

// Provider wraps the app and manages nav state
const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [navCollapsed, setNavCollapsed] = useState(false);

  // Toggle between collapsed and expanded nav
  const toggleNav = () => setNavCollapsed(v => !v);

  return (
    <Ctx.Provider value={{ navCollapsed, toggleNav }}>
      {children}
    </Ctx.Provider>
  );
};

// Hook to access layout context
export function useLayout() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useLayout must be used within LayoutProvider");
  return v;
}

// Shortcut hook to access just the toggle function
export const useToggleNav = () => useLayout().toggleNav;

export default LayoutProvider;
