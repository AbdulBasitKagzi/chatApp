const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const socket = require("socket.io");

const connectToMongo = require("./db");
const route = require("./route/route");
const cors = require("cors");
const register_login = require("./route/register_loginRoute");
const conversationRoute = require("./route/conversation_route");
const chat_route = require("./route/chat_route");

// setting up server with socket
const app = express();
const httpServer = createServer(app)

app.use(express.json());
app.use(cors());

// setting up routes
app.use(route);
app.use(register_login);
app.use(conversationRoute);
app.use(chat_route);

// connection to mongo
connectToMongo();

const server = httpServer.listen(4000, () => {
  console.log("Server Started ");
});

const io = socket(server, {
  cors: {
    origin: '*',
    // origin: [
    //     "http://localhost:3000",
    //     "https://chat.myriad-tech.com/",
    //     "https://jumlazdb.myriad-tech.com/"
    // ],
    credentials: true,
    transports: ['polling'],
  }
});


let users = []
let user
let newMessage


// function to use in sockets
const addUser = (userId, socketId) => {
  !users.some(user => user.userId === userId) && users.push({ userId, socketId })
}

const removerUserByUserId = (userId) => {
  users = users.filter((user) => user.userId !== userId)
}

const getUser = (userId) => {
  // console.log('here', users.find(user => user.userId === userId))
  return users.find(user => user.userId === userId)
}

// socket events
io.on("connection", (socket) => {

  // ...testing
  socket.on('hello', (data) => {
    console.log(socket.id)
    console.log('data', data)
  })

  // to add login user
  socket.on('addUser', (userid) => {
    addUser(userid, socket.id)
    // console.log('users',users).

    io.emit('getUsers', users)
  })

  // to remove logout userfrom users array
  socket.on('logOut', (userid) => {
    // console.log('userId', userid)
    removerUserByUserId(userid)
    // console.log('newUsers', users)

    io.emit('getUsers', users)
  })

  // to send and receive message
  socket.on('sendMessage', (message) => {
    console.log('message', message)
    newMessage = message
    user = getUser(message.reciever)
    io.emit('getMessage', newMessage, true)
  })


});


