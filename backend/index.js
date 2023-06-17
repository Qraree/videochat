require("dotenv").config();
const express = require('express');
const { createServer } = require("http");
const cors = require('cors')
const mongoose = require('mongoose');
const messageRouter = require('./routes/MessageRoute');
const { Server } = require("socket.io");


const app = express();
const httpServer = createServer(app);
const io =  new Server(httpServer, {
    cors: {
        origin: "*"
    }});

io.on("connection", (socket) => {
    console.log("client connected");

    socket.on("message", (...args) => {
        socket.emit("server-message", "WHAT DO YOU WANT??");
    });

    socket.on("chatEnter", (name) => {
        console.log(`${name} entered the chat!`)
    })

    socket.on("disconnect", () => {
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
app.use("/", messageRouter);




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
