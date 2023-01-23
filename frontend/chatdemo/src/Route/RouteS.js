import React, { useEffect } from "react";
import { Routes, Route, redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Signup from "../Pages/Signup";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Abdul from "../Pages/Abdul";
import { PrivateRoute } from "../Components/PrivateRoute";
import UserSettings from "../Pages/UserSettings";
function RouteS() {

  // const token = localStorage.getItem('token')

  return (
    <>
      <Routes>
        <Route exact path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
        <Route exact path="/settings"
          element={
            <PrivateRoute>
              <UserSettings/>
            </PrivateRoute>
          } />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/abdul" element={<Abdul />} />
      </Routes>
    </>

  );
}

export default RouteS;
