import React from "react";
import { Routes, Route } from "react-router-dom";

import Signup from "../Pages/Signup";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
function RouteS() {
  return (
    <div>
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default RouteS;
