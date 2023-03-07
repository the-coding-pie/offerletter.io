import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ModalContextProvider from "./contexts/ModalContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ModalContextProvider>
    <App />
  </ModalContextProvider>
);
