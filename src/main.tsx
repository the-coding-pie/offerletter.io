import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ModalContextProvider from "./contexts/ModalContext";
import TemplateContextProvider from "./contexts/TemplateContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ModalContextProvider>
    <TemplateContextProvider>
      <App />
    </TemplateContextProvider>
  </ModalContextProvider>
);
