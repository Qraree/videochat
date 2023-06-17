"use client"
import React, {useEffect, useState} from 'react';
import {IMessage} from "@/types/IMessage";
import Message from "@/components/Message";
import {guidGenerator} from "@/helpers/random";
import {useRouter} from "next/navigation";
import {socket} from "@/socket";

const Room = () => {
    const [messageInput, setMessageInput] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const router = useRouter();

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
        },
        {
            id: "fwefuiwhdqwew",
            username: "anton",
            content: "hellooooooooo, hofiepwfu weifuiwew are you?",
            time: "14:17",
        }
    ])

    useEffect(() => {
        const name = sessionStorage.getItem("username");
        if (!name) {
            router.push('/login');
        } else {
            setUserName(name);
        }

    }, [router])

    useEffect(() => {
        socket.on("serverEnter", (response) => {
            console.log(response);
        })
    }, [])

    function messageChange(e: React.ChangeEvent<HTMLInputElement>) {
        setMessageInput(e.target.value);
    }

    function sendMessage(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const date = new Date();

        const newMessage: IMessage = {
            id: guidGenerator(),
            username: "you",
            content: messageInput,
            time: `${date.getHours()}:${date.getMinutes()}`,
        }
        setMessages([...messages, newMessage]);
        setMessageInput('');
    }

    return (
        <div className="w-full h-screen text-white bg-stone-800">
            <div className="absolute h-full w-1/5 right-0 bg-stone-900 flex flex-col">
                <div className="text-2xl py-4 pl-3">
                    Chat
                </div>
                <hr />
                <div className="h-4/5 bg-sky-500 p-2 flex flex-col">
                    {messages.map((message) => (
                        <Message message={message} key={message.id}/>
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
