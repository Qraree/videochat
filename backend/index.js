require("dotenv").config();
const express = require('express');
const { createServer } = require("http");
const mongoose = require('mongoose');
const { Server } = require("socket.io");
const { AccessToken } = require('livekit-server-sdk');
const {CONNECTION, DISCONNECT} = require('./const/socketEvents')

const newMessageHandler = require('./socketHandlers/messageHandler');
const fetchingDataHandler = require('./socketHandlers/fetchingDataHandler');
const getTokenHandler = require('./socketHandlers/getTokenHandler');
const newUserHandler = require('./socketHandlers/newUserHandler');


const app = express();
const httpServer = createServer(app);
const io =  new Server(httpServer, {
    cors: {
        origin: "*"
    }});

const users = [];

io.on(CONNECTION, (socket) => {

    newUserHandler(socket, users);
    getTokenHandler(socket);
    fetchingDataHandler(socket);
    newMessageHandler(socket, io);

    socket.on(DISCONNECT, () => {
        users.pop();
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
