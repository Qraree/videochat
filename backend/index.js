require("dotenv").config();
const express = require('express');
const { createServer } = require("http");
const cors = require('cors')
const mongoose = require('mongoose');
const Message = require('./models/Message');
const { Server } = require("socket.io");
const { AccessToken } = require('livekit-server-sdk');
// const { getLivekitToken } = require('./services/getLivekitToken')


const app = express();
const httpServer = createServer(app);
const io =  new Server(httpServer, {
    cors: {
        origin: "*"
    }});

const roomStack = [];
const roomName = 'room';

io.on("connection", (socket) => {
    console.log("client connected");

    socket.on("message", (...args) => {
        socket.emit("server-message", "WHAT DssdyO YOU hWANT??");
    });

    socket.on("chatEnter", async (name) => {
        console.log(`${name} entered the chat!`)
        roomStack.push(name);
    })

    socket.on("getToken", (name) => {
        try {
            const at = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
                identity: name,
            });
            at.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true });
            const token = at.toJwt();

            socket.emit('serverToken', token)
        } catch(e) {
            console.log("livekit identity error")
        }
    })

    socket.on("getAllMessages", async () => {
        const messages = await Message.find({});
        console.log(messages);
        socket.emit("allMessages", messages);
    })

    socket.on("sendMessage", async (message) => {
        await Message.create(message)
        io.emit("sendMessageServer", message)
    })

    socket.on("exitRoom", () => {
        console.log(roomStack);
    })

    socket.on("disconnect", () => {
        roomStack.pop();
        console.log("user was disconnected");
    })
});

const port = 5000;

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});




mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.get('/', (req, res) => {
    res.send('Hello Worslddwqdwqdsw!')
})

httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
