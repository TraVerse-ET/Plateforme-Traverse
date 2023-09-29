import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const renderApp = () =>
  ReactDOM.render(
    <React.StrictMode>
      <ToastContainer />
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );

renderApp();
