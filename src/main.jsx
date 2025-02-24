import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './App';
import "./assets/style/style.scss";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



createRoot(document.getElementById("root")).render(
  <StrictMode>
      <App />
  </StrictMode>
);