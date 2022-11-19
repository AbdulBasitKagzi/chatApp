import React from "react";
import "./App.css";
import { useNavigate, useLocation } from "react-router-dom";

import RouteS from "./Route/RouteS";

function App() {
  const location = useLocation();
  console.log("pathname", location.pathname);
  const [token, setToken] = React.useState();
  const navigate = useNavigate();

  // to navigate to home page after login and signup
  React.useEffect(() => {
    setToken(localStorage.getItem("token"));

    if (
      (location.pathname === "/login" && token) ||
      (location.pathname === "/signup" && token)
    ) {
      navigate("/");
    } else if (!token && location.pathname === "/login") {
      navigate("/login");
    } else if (!token && location.pathname === "/signup") {
      navigate("/signup");
    } else if (!token) {
      navigate("/login");
    }
  }, [token]);
  return (
    <div className="App">
      <RouteS />
    </div>
  );
}

export default App;
