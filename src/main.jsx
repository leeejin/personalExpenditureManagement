import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecordProvider } from "./contexts/data.context";
import { PopupProvider } from "./contexts/warning.context";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecordProvider>
      <PopupProvider>
        <App />
      </PopupProvider>
    </RecordProvider>
  </React.StrictMode>
);
