import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Appbar from "../Components/Appbar";
import Chat from "../Components/Chat";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { getUsers } from "../Store/Slice/authSlice";
import { getConversation } from "../Store/Slice/conversationSlice";
import { getChat } from "../Store/Slice/chatSlice";

import { AppBar, styled, Box } from "@mui/material";

function Home() {
  const [user, setUser] = React.useState();
  const [myuser, setmyUser] = React.useState([]);
  const [userName, setUserName] = React.useState({
    name: "",
    convoid: "",
  });
  const [show, setShow] = React.useState(false);
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.user);
  const { conversation } = useSelector((state) => state.conversation);
  const [users, setUsers] = React.useState();
  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userData")));
    dispatch(getUsers());
    dispatch(getConversation());

    setUsers(JSON.parse(localStorage.getItem("userData")));
    // const allusers = allUsers?.map((user) => {
    //   console.log("as", user._id);
    // });
  }, []);
  React.useEffect(() => {
    // console.log("conversation", conversation);

    // mapping users who have conversation with the login user
    conversation?.map((convo) => {
      console.log("mem", convo.members);
      convo.members.map((m) => {
        console.log("m", m);
        allUsers.filter((user) => {
          if (user._id === users._id) {
            return;
          } else if (user._id === m) {
            console.log("user", user);

            console.log("convo", user);
            setmyUser((prev) => [
              ...prev,
              (user = { ...user, convoId: convo._id }),
            ]);
          } else console.log("false");
        });
      });
    });
  }, [conversation]);
  console.log("name", userName);
  // console.log("users", users);
  console.log("myuser", myuser);
  // console.log("user", user);

  // console.log("all", allUsers);
  // console.log("user", user);

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
          {/* below code needs to be changed */}
          <div>This is {user?.name}</div>

          {myuser?.map((user) => {
            console.log(user);
            return (
              <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <Box
                    onClick={() => {
                      console.log("id", user._id);
                      console.log("id", user.convoId);
                      dispatch(getChat(user.convoId));
                      setUserName((prev) => ({
                        ...prev,
                        name: user.name,
                        convoid: user.convoId,
                      }));
                      setShow(true);
                    }}
                  >
                    {user.name}
                  </Box>
                  {/* <ListItemText
                    primary={user.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                      </React.Fragment>
                    }
                  /> */}
                </ListItem>
                <Divider variant="inset" />
              </>
            );
          })}
          {/* {allUsers?.map((user) => {
            return (
              <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <Box
                    onClick={() => {
                      console.log("id", user._id);
                      setUserName(user.name);
                      setShow(true);
                    }}
                  >
                    {user.name}
                  </Box> */}
          {/* <ListItemText
                    primary={user.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                      </React.Fragment>
                    }
                  /> */}
          {/* </ListItem>
                <Divider variant="inset" />
              </>
            );
          })} */}
        </Box>
        {show ? (
          <Box>
            <Chat
              username={userName.name}
              convoid={userName.convoid}
              sender={user._id}
            />
          </Box>
        ) : (
          <Box>
            <Typography variant="h1">Message someone </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}

export default Home;
