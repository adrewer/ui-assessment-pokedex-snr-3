// src/app/App.tsx
import React from "react";
import { createUseStyles } from "react-jss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./client";
import { LayoutProvider } from "../contexts";
import { Nav } from "../components";
import { ListPage } from "../screens";

// app shell: GraphQL client, layout context, router
function App() {
  const s = useStyles();
  return (
    <ApolloProvider client={client}>
      <LayoutProvider>
        <div className={s.root}>
          <BrowserRouter>
            <Nav />
            <div className={s.content}>
              <div className={s.scroll}>
                <Routes>
                  <Route path="/pokemon" element={<ListPage />} />
                  <Route path="/pokemon/:name" element={<ListPage />} />
                  {/* default → list */}
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

// keep the app background simple; the diagonal texture will live in ListPage only
const useStyles = createUseStyles(
  {
    root: {
      background: "#171E2b", // base tone
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
    },
    content: { flex: 1, overflow: "hidden", position: "relative" },
    scroll: { position: "absolute", inset: 0, overflow: "auto", paddingBottom: 24 },
  },
  { name: "App" }
);

export default App;
