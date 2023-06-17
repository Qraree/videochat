"use client"
import React, {useState} from 'react';
import {socket} from "@/socket";
import {useRouter} from "next/navigation";

const Login = () => {

    const [nameInput, setNameInput] = useState<string>('');
    const router = useRouter();


    const changeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNameInput(e.target.value);
    }

    const enterRoom = () => {
        router.push('room');

        socket.emit("chatEnter", nameInput);

        sessionStorage.setItem("username", nameInput);
    }

    return (
        <div className="w-full h-screen flex justify-center items-center text-white bg-stone-800">
            <div className="w-1/4 h-1/3 flex flex-col justify-center items-center bg-stone-900 rounded-lg">
                <label className="mb-5 text-2xl">Enter your name</label>
                <input type="text" className="text-black mb-5 p-3" value={nameInput} onChange={(e) => changeInput(e)}/>
                <button onClick={enterRoom} className="bg-blue-700 text-white py-3 px-10 rounded-lg">Enter</button>
            </div>
        </div>
    );
};

export default Login;
