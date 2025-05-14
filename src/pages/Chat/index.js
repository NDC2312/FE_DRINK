import React, { useState } from 'react';
import ChatBox from './ChatBox';
import './Chat.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

function Chat() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="chat-icon" onClick={() => setOpen(!open)}>
                <FontAwesomeIcon icon={faComment} fontSize={20} />
            </div>
            {open && <ChatBox onClose={() => setOpen(false)} />}
        </>
    );
}

export default Chat;
