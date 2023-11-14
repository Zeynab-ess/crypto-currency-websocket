import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MarketProvider } from "./context/marketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MarketProvider>
      <App />
    </MarketProvider>
  </React.StrictMode>
);

reportWebVitals();
