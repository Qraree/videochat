import React from 'react';
import {IMessage} from "@/types/IMessage";
import classNames from "classnames";

interface messageProps {
    message: IMessage;
}

const Message = ({message}: messageProps) => {
    return (
        <div className={classNames({
            "flex flex-col bg-gray-100 rounded-lg p-3 max-w-1/2 text-black self-end mb-2": message.username === 'you',
            "flex flex-col bg-gray-100 rounded-lg p-3 max-w-1/2 text-black self-start mb-2": message.username !== 'you',
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
