import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { postChat, uploadFile } from "../Store/Slice/chatSlice";


import { Typography, Box, TextField } from "@mui/material";

function Chat(props) {
  const socket = React.useRef();
  const [message, setMessage] = React.useState({
    chat: "",
    sender: "",
    conversationId: "",
  });
  const [incomingMessages, setIncomingMessages] = React.useState(null)
  const [activeUser, setActiveUser] = React.useState([])
  const [state, setState] = React.useState()
  const [messages, setMessages] = React.useState()
  const [file, setFile] = React.useState()

  const dispatch = useDispatch();
  const { chat, image, isLoading } = useSelector((state) => state.chat);


  React.useEffect(() => {

    socket.current = io("http://localhost:4000", { secure: true })

    socket.current.on('getMessage', (data, abdul) => {
      setIncomingMessages({
        ...data
      })
      setState(abdul)
    })
  }, [incomingMessages])


  // setting message state to have sender, receiver and conversation id
  React.useEffect(() => {
    setMessage((prev) => ({
      ...prev,
      sender: props.sender,
      conversationId: props.convoid,
      reciever: props.reciever
    }));
  }, [props.convoid]);

  React.useEffect(() => {
    setMessages(chat)
  }, [chat])

  React.useEffect(() => {
    console.log('imagefrom', image)
  }, [image])

  // setting new massage to messages array (realtime)
  React.useEffect(() => {
    // incomingMessages && console.log('abduldon', incomingMessages, props.conversation.members.includes(incomingMessages.sender))
    incomingMessages
      && props.conversation.members.includes(incomingMessages.sender)
      && setMessages((prev) => [...prev, incomingMessages])
  }, [incomingMessages, props.conversation])


  // to handle text of the text box
  const handleMessage = (e) => {
    setMessage((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // to handle submit 
  const handleSubmit = (e) => {
    console.log('fileimage', image,)
    if (file) {
      console.log('im in inf')
      image && setMessage((prev) => ({
        ...prev,
        [e.target.name]: image,
      }));
      image && dispatch(postChat(message));
      !isLoading && setMessage((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
      setFile("")
      return;
    }


    dispatch(postChat(message));
    setMessage((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  useEffect(() => {
    console.log('m---->', message)
  }, [message])

  const onFileChange = (e) => {
    setFile(e.target.files[0])
    setMessage((prev) => ({
      ...prev,
      chat: e.target.files[0].name
    }))
  }

  // React.useEffect(() => {

  //   getImage(file)
  // }, [file])
  const getImage = async (file) => {
    if (file) {
      console.log('file', file, file.name)
      const data = new FormData()
      data.append("name", file.name)
      data.append("file", file)
      dispatch(uploadFile(data))
    }
  }

  useEffect(() => {
    console.log('file', file)
  }, [file])

  return (
    <div>
      Hello from {props.username}
      {props.reciever}
      {props.activeUser?.find(active => active.userId === props.reciever) ? "Online" : "Offline"}
      <Box>
        {!chat?.message ? (
          messages?.map((chat) => {

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
          value={message.chat}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              socket.current.emit('sendMessage', message)
              handleSubmit(e);
              getImage(file)

            }
          }}
        />
      </Box>
      <input type="file" onChange={(e) => onFileChange(e)} />
    </div>
  );
}

export default Chat;
