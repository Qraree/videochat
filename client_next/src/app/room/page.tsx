"use client"
import React, {useState} from 'react';
import {IMessage} from "@/types/IMessage";
import Message from "@/components/Message";

const Room = () => {

    const [messages, setMessages] = useState<IMessage[]>([
        {
            id: "fuiwhew",
            username: "you",
            content: "heelloo",
            time: "14:15",
        },
        {
            id: "fuiwhdqwew",
            username: "gleb",
            content: "hello, how are you?",
            time: "14:16",
        }
    ])

    return (
        <div className="w-full h-screen text-white bg-stone-800">
            <div className="absolute h-full w-1/5 right-0 bg-stone-900 flex flex-col">
                <div className="text-2xl py-4 pl-3">
                    Chat
                </div>
                <hr />
                <div className="h-4/5 bg-sky-500">
                    {messages.map((message) => (
                        <Message message={message} key={message.id}/>
                    ))}
                </div>
                <div className="h-24 bg-red-500 flex flex-row justify-around items-center">
                    <input className="p-3 rounded-lg"/>
                    <button className="p-3 bg-blue-700 rounded-lg">Send</button>
                </div>
            </div>

        </div>
    );
};

export default Room;
