// src/app/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { ApolloProvider } from "@apollo/client";
import { client } from "./client";
import { LayoutProvider } from "../contexts";
import { Nav } from "../components";
import { ListPage } from "../screens";

function App() {
  const s = useStyles();

  return (
    <ApolloProvider client={client}>
      <LayoutProvider>
        {/* Fixed background layer always behind everything */}
        <div id="app-bg" className={s.background}></div>

        {/* Foreground content */}
        <div className={s.root}>
          <BrowserRouter>
            <Nav />
            <div className={s.content}>
              <div className={s.scroll}>
                <Routes>
                  <Route path="/pokemon" element={<ListPage />} />
                  <Route path="/pokemon/:name" element={<ListPage />} />
                  <Route path="*" element={<ListPage />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </div>
      </LayoutProvider>
    </ApolloProvider>
  );
}

const useStyles = createUseStyles(
  {
    // main container
    root: {
      position: "relative",
      zIndex: 2,
      backgroundColor: "transparent",
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
    },

    content: {
      flex: 1,
      overflow: "hidden",
      position: "relative",
    },

    scroll: {
      position: "absolute",
      inset: 0,
      overflow: "auto",
      paddingBottom: 24,
      zIndex: 3,
    },

    // true background
    background: {
      position: "fixed",
      inset: 0,
      zIndex: -9999, // nothing can top this
      pointerEvents: "none",
      backgroundColor: "#171E2b",
      backgroundImage: `
        linear-gradient(
          135deg,
          rgba(0, 0, 0, 0.0) 0%,
          rgba(0, 0, 0, 0.55) 12%,
          rgba(0, 0, 0, 0.0) 25%,
          rgba(0, 0, 0, 0.55) 37%,
          rgba(0, 0, 0, 0.0) 50%,
          rgba(0, 0, 0, 0.55) 62%,
          rgba(0, 0, 0, 0.0) 75%,
          rgba(0, 0, 0, 0.55) 87%,
          rgba(0, 0, 0, 0.0) 100%
        ),
        linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.00) 0%,
          rgba(255, 255, 255, 0.10) 10%,
          rgba(255, 255, 255, 0.00) 12%,
          rgba(255, 255, 255, 0.10) 22%,
          rgba(255, 255, 255, 0.00) 25%,
          rgba(255, 255, 255, 0.10) 35%,
          rgba(255, 255, 255, 0.00) 37%,
          rgba(255, 255, 255, 0.10) 47%,
          rgba(255, 255, 255, 0.00) 50%,
          rgba(255, 255, 255, 0.10) 60%,
          rgba(255, 255, 255, 0.00) 62%,
          rgba(255, 255, 255, 0.10) 72%,
          rgba(255, 255, 255, 0.00) 75%,
          rgba(255, 255, 255, 0.10) 85%,
          rgba(255, 255, 255, 0.00) 87%,
          rgba(255, 255, 255, 0.10) 97%,
          rgba(255, 255, 255, 0.00) 100%
        ),
        linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0) 60%)
      `,
      backgroundSize: "1200px 1200px, 1200px 1200px, 100% 100%",
      backgroundRepeat: "repeat, repeat, no-repeat",
      backgroundBlendMode: "overlay, normal, normal",
      filter: "contrast(1.06) brightness(1.02)",
    },
  },
  { name: "App" }
);

export default App;
