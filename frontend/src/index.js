import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ProjProvider } from "./api/context";

ReactDOM.render(
  <ProjProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProjProvider>,
  document.getElementById("root")
);
