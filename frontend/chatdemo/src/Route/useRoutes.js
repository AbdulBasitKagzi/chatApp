import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../Pages/Home";
import React from "react";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import { useSelector } from "react-redux";

const routes = [
  {
    path: '/',
    // nav: () => <Nav />,
    main: () => <Home />
  },
]

const useRoutes = () => {
  const { isAutheticated } = useSelector((state) => state.user)
  const navigate = useNavigate()


  React.useEffect(() => {
    isAutheticated && navigate('/')
  }, [isAutheticated])


  if (isAutheticated) {
    return (
      <>
        <Routes>
          {
            routes.map((route, index) => (
              console.log(route.path),
              <Route element={route.main} path={route.path} />
            ))
          }
        </Routes>
      </>
    )
  } else {
    return (
      <>
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </>
    )
  }
}

export default useRoutes;
