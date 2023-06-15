import React, {useEffect, useState} from 'react';
import './App.css';
import {socket} from "./socket";
import {RouterProvider} from "react-router-dom";
import {router} from "./router";

function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);


    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }



        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('server-message', (value) => {
            console.log(value)
        })

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);
    function sendMessage() {
        socket.emit('message', "Hello!!!")
    }

    return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
