"use client"
import React, {useEffect, useRef, useState} from 'react';
import {IMessage} from "@/types/IMessage";
import Message from "@/components/Message";
import {useRouter} from "next/navigation";
import {socket} from "@/socket";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
const Room = () => {
    const [messageInput, setMessageInput] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [livekitToken, setLivekitToken] = useState('');
    const router = useRouter();
    const messageListRef = useRef(null);

    const url = 'wss://127.0.0.1:7880';

    const [messages, setMessages] = useState<IMessage[]>([])

    useEffect(() => {
        const name = sessionStorage.getItem("username");
        socket.emit("getAllMessages");
        socket.emit("getToken", name);
    }, [])

    useEffect(() => {
        socket.on("allMessages", (messages) => {
            setMessages(messages);
        })

        socket.on("serverToken", (token) => {
            console.log(token);
            // setLivekitToken(token);
        })

    }, [socket])

    useEffect(() => {
        const name = sessionStorage.getItem("username");
        if (!name) {
            router.push('/login');
        } else {
            setUserName(name);
        }

    }, [router])

    useEffect(() => {
        socket.on("sendMessageServer", (message) => {
            setMessages([...messages, message]);
        })
    }, [socket, messages])

    function messageChange(e: React.ChangeEvent<HTMLInputElement>) {
        setMessageInput(e.target.value);
    }

    const exitRoom = () => {
        socket.emit("exitRoom");
        sessionStorage.clear();
        window.location.reload();
        router.push('/login');
    }

    function sendMessage(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const date = new Date();

        const newMessage = {
            username: userName,
            content: messageInput,
            time: `${date.getHours()}:${date.getMinutes()}`,
        }

        socket.emit("sendMessage", newMessage);
        setMessageInput('');
    }

    return (
        <div className="w-full h-screen text-white bg-stone-800 mt-0 relative overflow-auto flex flex-row">
            <div className="w-5/6 h-full bg-red-200 flex flex-col justify-center items-center">
                <div className="w-10/12 h-4/5 bg-sky-500 mb-5">
                </div>
                <div className="w-2/12 h-12 bg-amber-200 flex flex-row justify-center text-black">
                    <button onClick={exitRoom}>Exit</button>
                </div>
            </div>
            <div className="w-1/5 h-full">

            </div>
            <div className="absolute h-full w-1/5 right-0 top-0 bg-stone-900 flex flex-col">
                <div className="text-2xl py-4 pl-3">
                    Chat
                </div>
                <hr />
                <div className="h-4/5 bg-sky-500 p-2 flex flex-col overflow-y-scroll no-scrollbar" ref={messageListRef}>
                    {messages.map((message) => (
                        <Message message={message} username={userName} key={message._id}/>
                    ))}
                </div>
                <form className="h-24 bg-red-500 flex flex-row justify-around items-center" onSubmit={(e) => sendMessage(e)}>
                    <input className="p-3 rounded-lg text-black" value={messageInput} onChange={(e) => messageChange(e)}/>
                    <button className="p-3 bg-blue-700 rounded-lg">Send</button>
                </form>
            </div>

        </div>
    );
};


export default Room;
