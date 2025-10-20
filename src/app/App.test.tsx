import React from "react";
import { createUseStyles } from "react-jss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./client";
import { LayoutProvider } from "../contexts";
import { Nav } from "../components";
import { ListPage } from "../screens"; // default import

// App shell: wraps the entire app with GraphQL, layout context, and routing
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
                  {/* List view and modal routing */}
                  <Route path="/pokemon" element={<ListPage />} />
                  <Route path="/pokemon/:name" element={<ListPage />} />
                  <Route path="*" element={<ListPage />} /> {/* fallback route */}
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </div>
      </LayoutProvider>
    </ApolloProvider>
  );
}

// Layout styles — background stays simple here; texture lives in ListPage
const useStyles = createUseStyles(
  {
    root: {
      background: "#171E2b", // base tone
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
    },
  },
  { name: "App" }
);

export default App;
