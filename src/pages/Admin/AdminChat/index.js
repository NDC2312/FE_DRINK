import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import http from '~/components/utils/httpRequest'; // axios instance
import './AdminChat.css';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

import sendIcon from '~/assets/send.webp';
import ImgUserNoBG from '~/assets/user_chat_admin_nobg.png';
import { useSelector } from 'react-redux';

const socket = io('http://localhost:8000', { withCredentials: true });

function AdminChat() {
    const accountReducer = useSelector((state) => state.AccountReducer.accountAdminInfo);
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrent] = useState(null);
    const [history, setHistory] = useState([]);
    const [text, setText] = useState('');

    const [showPicker, setShowPicker] = useState(false);

    const addEmoji = (emoji) => {
        console.log(emoji);
        setText((prev) => prev + emoji.native);
    };

    useEffect(() => {
        http.get('/room-chat').then((res) => setRooms(res.data));
    }, []);

    useEffect(() => {
        if (!currentRoom) return;
        console.log('currentRoom', currentRoom);
        socket.emit('join-room', {
            roomId: currentRoom._id,
            user_id: accountReducer.id,
            role: 'employee',
        });
        http.get('/chat', { params: { room_chat_id: currentRoom._id } }).then((res) => {
            console.log(res.data);
            setHistory(res.data);
        });
        const handler = (msg) => {
            if (msg.room_chat_id === currentRoom._id) {
                setHistory((h) => [...h, msg]);
            }
        };
        socket.on('receive-message', handler);
        return () => {
            socket.off('receive-message', handler);
        };
    }, [currentRoom, accountReducer.id]);

    const send = () => {
        if (!text.trim() || !currentRoom) return;
        socket.emit('send-message', {
            room_chat_id: currentRoom._id,
            user_id: accountReducer.id,
            content: text,
        });
        setText('');
    };
    console.log(currentRoom);
    return (
        <div className="admin-container-chat">
            <div className="admin-chat">
                <aside className="rooms">
                    <h2 style={{ marginBottom: '10px' }}>Tin nhắn</h2>
                    {rooms.map((r) => (
                        <div
                            key={r._id}
                            className={r._id === currentRoom?._id ? 'room active' : 'room'}
                            onClick={() => setCurrent(r)}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    columnGap: '10px',
                                }}
                            >
                                <img
                                    src={r?.userInfo?.picture || ImgUserNoBG}
                                    alt=""
                                    width="48px"
                                    height="48px"
                                    style={{ objectFit: 'cover' }}
                                />
                                <p
                                    style={{
                                        fontWeight: '400',
                                    }}
                                >
                                    {r?.userInfo?.fullName}
                                </p>
                            </div>
                        </div>
                    ))}
                </aside>
                <section className="chat-window">
                    {currentRoom ? (
                        <>
                            <div className="history">
                                <div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            columnGap: '10px',
                                            borderBottom: '1px solid #ccc',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        <img
                                            src={currentRoom?.userInfo?.picture || ImgUserNoBG}
                                            alt=""
                                            width="48px"
                                            height="48px"
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <p
                                            style={{
                                                fontWeight: '400',
                                            }}
                                        >
                                            {currentRoom?.userInfo?.fullName}
                                        </p>
                                    </div>
                                </div>
                                {history.map((m, i) => {
                                    const isUser = m.user_id === accountReducer.id;
                                    return (
                                        <div className={`chat-message ${isUser ? 'user' : 'other'}`} key={i}>
                                            {!isUser ? (
                                                <div className="chat-is-user">
                                                    <img
                                                        src={ImgUserNoBG}
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
                                                        {m.content}
                                                        <div className="chat-content-time">
                                                            {new Date(m.createdAt).toLocaleTimeString([], {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="chat-content">
                                                    {' '}
                                                    {m.content}
                                                    <div className="chat-content-time">
                                                        {new Date(m.createdAt).toLocaleTimeString([], {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="input-area">
                                <input
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Nhập tin nhắn..."
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') send();
                                    }}
                                />
                                <div>
                                    <div
                                        onClick={() => setShowPicker(!showPicker)}
                                        style={{
                                            padding: '2px 3px',
                                            cursor: 'pointer',
                                            fontSize: '2rem',
                                        }}
                                    >
                                        😊
                                    </div>
                                    {showPicker && (
                                        <div className="emoji-picker-container">
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    bottom: '60px',
                                                    right: '40px',
                                                    zIndex: 999,
                                                    transform: 'scale(0.9)',
                                                    transformOrigin: 'bottom right',
                                                }}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Picker data={data} onEmojiSelect={addEmoji} theme="light" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button onClick={send}>
                                    <img
                                        src={sendIcon}
                                        alt=""
                                        style={{
                                            marginLeft: '2px',
                                            width: '32px',
                                            height: '32px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div
                            style={{
                                marginTop: '2px',
                                marginLeft: '15px',
                            }}
                        >
                            Chọn phòng để chat
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default AdminChat;
