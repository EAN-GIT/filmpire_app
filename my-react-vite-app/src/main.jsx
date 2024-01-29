import ReactDOM from "react-dom";
import React from "react";
import App from "./components/app";
import { BrowserRouter } from "react-router-dom";

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
