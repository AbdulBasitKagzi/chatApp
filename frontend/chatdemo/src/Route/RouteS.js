import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Signup from "../Pages/Signup";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Abdul from "../Pages/Abdul";
function RouteS() {
  const { isAuthenticated } = useSelector((state) => state.user)
  return (
    <div>
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/abdul" element={<Abdul />} />
      </Routes>
    </div>
  );
}

export default RouteS;
