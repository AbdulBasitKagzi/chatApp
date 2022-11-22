import React from "react";
import { useSelector, useDispatch } from "react-redux";

import chatSlice, { postChat, getChat } from "../Store/Slice/chatSlice";
import { chatAction } from "../Store/Slice/chatSlice";

import { Typography, Box, TextField } from "@mui/material";
function Chat(props) {
  const [message, setMessage] = React.useState({
    chat: "",
    sender: "",
    conversationId: "",
  });
  React.useEffect(() => {
    setMessage((prev) => ({
      ...prev,
      sender: props.sender,
      conversationId: props.convoid,
    }));
  }, [props.convoid]);
  const [sent, setSent] = React.useState();
  const dispatch = useDispatch();
  const { chat } = useSelector((state) => state.chat);

  // React.useEffect(() => {
  //   dispatch(getChat(props.convoid));
  // }, [props.convoid]);

  const handleMessage = (e) => {
    setMessage((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    dispatch(postChat(message));
    // setSent(true);
    // dispatch(chatAction.emptyState());
  };

  console.log("message", message);
  console.log("chat", chat);
  return (
    <div>
      Hello from {props.username}
      {props.convoid}
      <Box>
        {!chat?.message ? (
          chat?.map((chat) => {
            if (props.sender === chat.sender) {
              return (
                <>
                  <Typography class="text-blue-600 ml-5">
                    {chat.chat}
                  </Typography>
                </>
              );
            } else {
              return (
                <>
                  <Typography class="text-green-600 mr-5">
                    {chat.chat}
                  </Typography>
                </>
              );
            }
          })
        ) : (
          <>
            <Typography>No messages found</Typography>
          </>
        )}
      </Box>
      <Box>
        <TextField
          class=" border-4 rounded-lg w-96"
          placeholder="type a message"
          margin="normal"
          required
          fullWidth
          id="message"
          name="chat"
          autoFocus
          onChange={handleMessage}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              handleSubmit();
            }
          }}
        />
      </Box>
    </div>
  );
}

export default Chat;
