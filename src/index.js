import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import UserService from "./helpers/userService";

const renderApp = () =>
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );

UserService.initKeycloak(renderApp);
