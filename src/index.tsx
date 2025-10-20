// Entry point for the React application

import './index.css'; // Global styles (background, font, scrollbar)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import reportWebVitals from './app/reportWebVitals';

// Mount the app to the root DOM node
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root container 'root' not found in index.html.");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: measure performance metrics
reportWebVitals();
