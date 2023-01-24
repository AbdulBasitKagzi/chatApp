import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { postChat, uploadFile } from "../Store/Slice/chatSlice";
import Appbar from "./Appbar"

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
  const [online, setOnline] = React.useState()

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
      setMessage((prev) => ({
        ...prev,
        chat: "",
      }));
      return;
    }

    // to post only text message
    socket.current.emit('sendMessage', message)

    dispatch(postChat(message));
    setMessage((prev) => ({
      ...prev,
      chat: "",
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

  useEffect(() => {
    setOnline(`${props.activeUser?.find(active => active.userId === props.reciever) ? "Online" : "Offline"}`)
  }, [props.activeUser, props.reciever])

  return (
    <div>
      <Appbar user={props.username} status={online} title="User Profile" width={1037} />

      <Box>
        {!messages?.message ? (
          messages?.map((chat) => {

            if (props.sender === chat.sender) {
              return (
                <>
                  {chat.chat.includes('jpg') || chat.chat.includes('png') || chat.chat.includes('jpeg')
                    ? <Box className="flex justify-end m-5" >
                      <img src={`${chat.chat}`} alt="chat" style={{ width: "100px" }} loading="lazy" />
                    </Box>
                    : chat.chat.includes('pdf')
                      ? <Box className="flex justify-end">
                        <PictureAsPdfSharpIcon />
                      </Box>
                      : <Box className="border-r-4  border-indigo-600 inline-block flex justify-end mb-5 mr-2 mt-2">
                        <Typography class="text-indigo-600 ml-5 mr-2 border-b-4  border-indigo-400">
                          {chat.chat}
                        </Typography>
                      </Box>
                  }
                </>
              );
            } else {
              return (
                <>
                  {chat.chat.includes('jpg') || chat.chat.includes('png') || chat.chat.includes('jpeg')
                    ? <Box sx={{ display: 'flex', justifyContent: "flex-start" }}>
                      <img src={`${chat.chat}`} alt="image" style={{ width: "100px" }} loading="lazy" />

                      <Box
                        onClick={(e) => {
                          downloadMedia(e, chat.chat)
                        }}>
                        <BrowserUpdatedIcon />
                      </Box>
                    </Box>
                    : chat.chat.includes('pdf')
                      ? <Box sx={{ display: 'flex', justifyContent: "flex-start" }}>
                        <PictureAsPdfSharpIcon />
                        <Box
                          onClick={(e) => {
                            downloadMedia(e, chat.chat)
                          }}>
                          <BrowserUpdatedIcon />
                        </Box>
                      </Box>
                      : <Box className="border-l-4  border-green-600  inline-block flex justify-start m-2">
                        <Typography class="text-green-600 ml-2 border-b-4 border-green-400">
                          {chat.chat}
                        </Typography>
                      </Box>
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
      <Box className="flex justify-center">
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
        <button className="rounded transition ease-in-out delay-150
        p-2 m-2 bg-blue-500 hover:-translate-y-1 hover:scale-110
          hover:bg-indigo-500 duration-300 ..."
          onClick={(e) => handleSubmit(e)}
        >
          Send
        </button>
      </Box>
      <input type="file" onChange={(e) => onFileChange(e)} />
    </div >
  );
}

export default Chat;
