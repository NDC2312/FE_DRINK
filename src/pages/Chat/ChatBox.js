import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import './Chat.css';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import logo_chat from '~/assets/logo_chat.png';
import gradientCafe from '~/assets/gradient-cafe-signage-design.png';
import send from '~/assets/send.webp';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const SOCKET_URL = 'http://localhost:8000';
const REST_URL = 'http://localhost:8000';

const socket = io(SOCKET_URL, { withCredentials: true });

function ChatBox({ onClose }) {
    const [roomId, setRoomId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    const addEmoji = (emoji) => {
        console.log(emoji);
        setText((prev) => prev + emoji.native);
    };
    const { userInfo } = useSelector((state) => state.auth);
    // console.log('userInfo', userInfo);

    useEffect(() => {
        // 1. Khởi tạo hoặc lấy room support
        const user_id = userInfo?.id;
        console.log('user_id', user_id);

        fetch(`${REST_URL}/api/v1/room-chat/create-or-get`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id }),
        })
            .then((res) => res.json())
            .then(({ roomId }) => {
                setRoomId(roomId);
                socket.emit('join-room', {
                    roomId,
                    user_id,
                    role: 'customer',
                });
            });

        // 3. Lắng nghe tin nhắn từ server
        socket.on('receive-message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off('receive-message');
        };
    }, [userInfo.id]);

    const sendMessage = () => {
        if (!text.trim()) return;
        console.log('roomId', roomId);
        console.log('text', text);
        socket.emit('send-message', {
            room_chat_id: roomId,
            user_id: userInfo.id,
            content: text,
        });
        setText('');
    };

    return (
        <div className="chat-box">
            <div className="chat-header">
                <div>
                    <img
                        src={logo_chat}
                        alt=""
                        style={{
                            width: '40px',
                            height: '40px',
                            objectFit: 'cover',
                            borderRadius: '50%',
                        }}
                    />
                    <span>Coffee NTK</span>
                </div>
                <button onClick={onClose} className="btn-chat">
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
            <div className="chat-body">
                {messages.length ? (
                    messages.map((msg, i) => {
                        const isUser = msg.user_id === userInfo.id;
                        return (
                            <div className={`chat-message ${isUser ? 'user' : 'other'}`} key={i}>
                                {!isUser ? (
                                    <div className="chat-is-user">
                                        <img
                                            src={logo_chat}
                                            alt=""
                                            style={{
                                                width: '28px',
                                                height: '28px',
                                                objectFit: 'cover',
                                                borderRadius: '50%',
                                                background: 'white',
                                            }}
                                        />
                                        <div className="chat-content">
                                            {msg.content}
                                            <div className="chat-content-time">
                                                {new Date(msg.createdAt).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="chat-content">
                                        {' '}
                                        {msg.content}
                                        <div className="chat-content-time">
                                            {new Date(msg.createdAt).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <div
                            style={{
                                marginTop: '10px',
                                color: '#99a3ad',
                                textAlign: 'center',
                                fontSize: '1.4rem',
                            }}
                        >
                            Bắt đầu trò chuyện nhanh với NTK Phần mềm Quản lý Khách hàng. Thông tin của bạn được ẩn và
                            tin nhắn trò chuyện chỉ lưu trên trình duyệt web.
                        </div>
                        <img
                            src={gradientCafe}
                            alt=""
                            width="210px"
                            height="210px"
                            style={{
                                marginTop: '0px',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                )}
            </div>
            <div className="chat-input">
                <div
                    style={{
                        display: 'flex',
                        flex: '1',
                        alignItems: 'center',
                    }}
                >
                    <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Nhập tin nhắn..." />
                    <span>
                        <div
                            onClick={() => setShowPicker(!showPicker)}
                            style={{
                                padding: '2px 3px',
                                cursor: 'pointer',
                            }}
                        >
                            😊
                        </div>
                        {showPicker && (
                            <div
                                className="emoji-picker-container"
                                style={{
                                    position: 'absolute',
                                    bottom: '60px',
                                    left: '0',
                                    zIndex: 999,
                                    transform: 'scale(0.7)',
                                    transformOrigin: 'bottom ',
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Picker data={data} onEmojiSelect={addEmoji} theme="light" />
                            </div>
                        )}
                    </span>
                </div>
                <button className="btn-send-message" onClick={sendMessage}>
                    <img
                        src={send}
                        alt=""
                        style={{
                            width: '24px',
                            height: '24px',
                            objectFit: 'cover',
                        }}
                    />
                </button>
            </div>
        </div>
    );
}

export default ChatBox;
