import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { postChat, uploadFile } from "../Store/Slice/chatSlice";


import { Typography, Box, TextField } from "@mui/material";
import PictureAsPdfSharpIcon from '@mui/icons-material/PictureAsPdfSharp';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';


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
  const { userData } = useSelector((state) => state.user);


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
  const handleSubmit = async (e) => {
    let a = await getImage(file)
    // to post images/pdf
    if (a) {
      console.log('im in inf')
      setMessage((prev) => ({
        ...prev,
        chat: a,
      }));
       socket.current.emit('sendMessage', message)

      dispatch(postChat(
        {
          ...message,
          chat: a
        }
      ));
      setFile("")
      return;
    }

      // to post only text message
      console.log('in else to emit')
      socket.current.emit('sendMessage', message)    

    dispatch(postChat(message));
    setMessage((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };


  const onFileChange = (e) => {
    setFile(e.target.files[0])
    setMessage((prev) => ({
      ...prev,
      chat: e.target.files[0].name
    }))
  }


  const getImage = async (file) => {
    if (file) {

      console.log('file', file, file.name)
      const data = new FormData()
      data.append("name", file.name)
      data.append("file", file)

      let a = await uploadFile(data)
      return a
    }
  }

  // function to download media
  const downloadMedia = (e, message) => {
    e.preventDefault()
    try {
      fetch(message)
        .then(res => res.blob())
        .then(blob => {

          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')

          a.style.display = 'none'
          a.href = url

          let displayName = message.split("/").pop()

          a.download = "" + displayName + ""
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
        })
    } catch (error) {
      console.log('error downloading media', error)
    }
  }

  return (
    <div>
      Hello from {props.username}
      {props.reciever}
      {props.activeUser?.find(active => active.userId === props.reciever) ? "Online" : "Offline"}
      <Box>
        {!messages?.message ? (
          messages?.map((chat) => {

            if (props.sender === chat.sender) {
              return (
                <>
                  {chat.chat.includes('jpg') || chat.chat.includes('png') || chat.chat.includes('jpeg')
                    ? <Box >
                      <img src={`${chat.chat}`} alt="image" style={{ width: "100px" }} />
                    </Box>
                    : chat.chat.includes('pdf')
                      ? <Box>
                        <PictureAsPdfSharpIcon />
                      </Box>
                      : <Typography class="text-blue-600 ml-5">
                        {chat.chat}
                      </Typography>
                  }
                </>
              );
            } else {
              return (
                <>
                  {chat.chat.includes('jpg') || chat.chat.includes('png') || chat.chat.includes('jpeg')
                    ? <Box sx={{ display: 'flex' }}>
                      <img src={`${chat.chat}`} alt="image" style={{ width: "100px" }} />
                      <Box
                        onClick={(e) => {
                          downloadMedia(e, chat.chat)
                        }}>
                        <BrowserUpdatedIcon />
                      </Box>
                    </Box>
                    : chat.chat.includes('pdf')
                      ? <Box sx={{ display: 'flex' }}>
                        <PictureAsPdfSharpIcon />
                        <Box
                          onClick={(e) => {
                            downloadMedia(e, chat.chat)
                          }}>
                          <BrowserUpdatedIcon />
                        </Box>
                      </Box>
                      : <Typography class="text-green-600 ml-5">
                        {chat.chat}
                      </Typography>
                  }
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
          onKeyDown={
            (e) => {
              if (e.keyCode === 13) {
                // socket.current.emit('sendMessage', message)

                handleSubmit(e);


              }
            }}
        />
      </Box>
      <input type="file" onChange={(e) => onFileChange(e)} />
    </div>
  );
}

export default Chat;
