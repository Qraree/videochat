import React, {useEffect, useState} from 'react';
import {IMessage} from "@/types/IMessage";
import classNames from "classnames";

interface messageProps {
    message: IMessage;
    username: string;
}

const Message = ({message, username}: messageProps) => {


    return (
        <div className={classNames({
            "flex flex-col bg-gray-100 rounded-lg p-3 max-w-1/2 text-black self-end mb-2": message.username === username,
            "flex flex-col bg-gray-100 rounded-lg p-3 max-w-1/2 text-black self-start mb-2": message.username !== username,
        })}>
            <div>
                {message.username}
            </div>
            <div>
                {message.content}
            </div>
        </div>
    );
};

export default Message;
