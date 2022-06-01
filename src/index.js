import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalStateProvider } from "./Context/GlobalStateContext";
import App from "./App";

import "react-loading-skeleton/dist/skeleton.css";
import "./Styles/index.scss";
import "./Styles/utils.css";
import "inter-ui/inter.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  </React.StrictMode>
);
