import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Appbar from "../Components/Appbar";
import Chat from "../Components/Chat";

import { getUsers } from "../Store/Slice/authSlice";

import { AppBar, styled, Box } from "@mui/material";

function Home() {
  const [user, setUser] = React.useState();
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.user);
  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userData")));
    dispatch(getUsers());
  }, []);

  console.log("all", allUsers);
  console.log("user", user);

  // const Header = styled(Appbar)`
  //   height: 200px;
  //   width: 100px;
  //   display: "flex-start";
  // `;
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box>
          <Appbar />
          <div>This is {user?.name}</div>
          {allUsers?.map((user) => {
            return (
              <>
                <h3>{user.name}</h3>
              </>
            );
          })}
        </Box>
        <Box>
          <Chat />
        </Box>
      </Box>
    </>
  );
}

export default Home;
