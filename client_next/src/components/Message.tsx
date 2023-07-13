import React, {useEffect, useState} from 'react';
import {IMessage} from "@/types/IMessage";
import classNames from "classnames";
import {useTime} from "@/hooks/useTime";

interface messageProps {
    message: IMessage;
    username: string;
}

const Message = ({message, username}: messageProps) => {
    const [newTime] = useTime(message.time)

    return (
        <div className={classNames({
            "flex flex-col bg-gray-100 rounded-lg p-3 max-w-1/2 text-black self-end mb-2 break-all": message.username === username,
            "flex flex-col bg-gray-100 rounded-lg p-3 max-w-1/2 text-black self-start mb-2 break-all": message.username !== username,
        })}>
            <div className="text-xs">
                {message.username}
            </div>
            <div>
                {message.content}
            </div>
            <div className="flex flex-row justify-end text-xs">{newTime}</div>
        </div>
    );
};

export default Message;
