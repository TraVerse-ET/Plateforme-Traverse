import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import UnityProject from "./components/unityProject";

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vr-visit" element={<UnityProject />} />
      </Routes>
    </Router>
  );
};

export default App;
