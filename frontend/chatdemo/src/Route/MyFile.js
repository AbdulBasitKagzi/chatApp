import { useNavigate, Outlet } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import React from "react";
import Signup from "../Pages/Signup";

const MyFile = (token) => {
  const navigate = useNavigate();
  const arr = [
    {
      path: "/",
      element: token ? <Home /> : navigate("/login"),
      children: [
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },

        // {
        //   path: "/",
        //   element: <Outlet />,
        //   children: [{ path: "/", element: <Home /> }],
        // },
      ],
    },
    {
      path: "/",
      element: !token ? navigate("/login") : <Home />,
      children: [
        { path: "/login", element: <Login /> },
        { path: "/", element: <Home /> },
        // { path: "/", element: <Navigate to="/login" /> },
      ],
    },
  ];
};
export default MyFile;
