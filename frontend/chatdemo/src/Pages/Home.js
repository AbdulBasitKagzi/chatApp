import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Appbar from "../Components/Appbar";
import Chat from "../Components/Chat";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

import { getUsers, getCurrentUser } from "../Store/Slice/authSlice";
import { getConversation } from "../Store/Slice/conversationSlice";
import { getChat } from "../Store/Slice/chatSlice";

function Home() {
  const [myuser, setmyUser] = React.useState([]);
  const [userName, setUserName] = React.useState({
    name: "",
    convoid: "",
  });
  const [show, setShow] = React.useState(false);
  const dispatch = useDispatch();
  const { allUsers,userData } = useSelector((state) => state.user);
  const { conversation } = useSelector((state) => state.conversation);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getConversation());
    dispatch(getCurrentUser())
  }, [dispatch]);

  useEffect(() => {
    setmyUser([])

    // mapping users who have conversation with the login user
     conversation?.map((convo) => {
      convo.members.map((m) => {
       userData && allUsers?.filter((user) => {
          console.log(user._id,userData?._id)
          if (user._id === userData?._id) {
            return;
          } else if (user._id === m) {
            console.log('else',user)
            setmyUser((prev) => [
              ...prev,
              (user = { ...user, convoId: convo._id }),
            ]);
          } else console.log("false");
        });
      });
    });
  }, [conversation,userData]);


  
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box>
          <Appbar />
          {/* below code needs to be changed */}
          <div>This is {userData?.name}</div>

          {myuser?.map((user) => {  
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
                </ListItem>
                <Divider variant="inset" />
              </>
            );
          })}
        </Box>
        {show ? (
          <Box>
            <Chat
              username={userName.name}
              convoid={userName.convoid}
              sender={userData._id}
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
