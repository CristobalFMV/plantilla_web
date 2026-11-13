import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import LoginPage from "./components/Account/LoginPage";
import "./styles/tokens.css";
import "./styles/global.css";

// Punto de entrada: carga los estilos globales y monta App en el nodo raíz del HTML.
const isLoginPage = window.location.pathname === "/login"
  || window.location.pathname === "/login/";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {isLoginPage ? <LoginPage /> : <App />}
  </React.StrictMode>,
);
