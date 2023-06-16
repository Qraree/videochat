import React from 'react';

interface EnterButtonProps {
    children: React.ReactNode
}
const EnterButton = ({children}: EnterButtonProps) => {
    return (
        <button>
            {children}
        </button>
    );
};

export default EnterButton;
