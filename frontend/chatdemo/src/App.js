import React from "react";
import "./App.css";
import {
  useNavigate,
  useLocation,
  useRoutes,
  Navigate,
} from "react-router-dom";
import MyFile from "./Route/MyFile";
import { useSelector } from "react-redux";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";

// import RouteS from "./Route/RouteS";

function App() {
  const [token, setToken] = React.useState();
  // const location = useLocation();
  // console.log("pathname", location.pathname);

  // const { token } = useSelector((state) => state.user);
  React.useEffect(() => {
    console.log("i am here");
    setToken(localStorage.getItem("token"));
  }, [token]);

  let element = useRoutes([
    {
      path: "/",
      element: <Home />,
      // children: [
      //   {
      //     path: "messages",
      //     element: <DashboardMessages />,
      //   },
      //   { path: "tasks", element: <DashboardTasks /> },
      // ],
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },

    // { path: "/login", element: token ? <Home /> : <Navigate to="/login" /> },
  ]);
  // const [token, setToken] = React.useState();

  // to navigate to home page after login and signup
  // React.useEffect(() => {
  //   setToken(localStorage.getItem("token"));
  // }, []);
  // // React.useEffect(() => {
  //   setToken(localStorage.getItem("token"));

  //   if (
  //     (location.pathname === "/login" && token) ||
  //     (location.pathname === "/signup" && token)
  //   ) {
  //     navigate("/");
  //   } else if (!token && location.pathname === "/login") {
  //     navigate("/login");
  //   } else if (!token && location.pathname === "/signup") {
  //     navigate("/signup");
  //   } else if (!token) {
  //     navigate("/login");
  //   }
  // }, [token]);

  // const isRouting = useRoutes(MyFile(token));

  return <div className="App">{element}</div>;
}

export default App;
