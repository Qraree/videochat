import React from 'react';
import {IMessage} from "@/types/IMessage";

interface messageProps {
    message: IMessage;
}

const Message = ({message}: messageProps) => {
    return (
        <div className="flex flex-col bg-gray-100 rounded-lg p-3 max-w-1/2 text-black">
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
