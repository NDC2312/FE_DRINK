import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import * as ChatService from '~/services/chatService';

import Button from '~/components/Button';

const socket = io('http://localhost:5000', { withCredentials: true });

const Chat = () => {
    const [chatOpen, setChatOpen] = useState(false);
    const [onlineEmployees, setOnlineEmployees] = useState([]);
    const [onlineCustomers, setOnlineCustomers] = useState([]);
    // Đối tượng được chọn để chat
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const auth = useSelector((state) => state.auth);
    console.log('auth', auth);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected:', socket.id);
            if (auth && auth.userInfo && auth.userInfo.id) {
                console.log('auth.userInfo', auth.userInfo);
                socket.emit('SET_USER', auth.userInfo);
            }
        });
        if (auth.isLoggedIn && auth.userInfo?.id) {
            console.log('Emit SET_USER với userInfo:', auth.userInfo);
            socket.emit('SET_USER', auth.userInfo);
        }
        const handleOnlineUsers = (users) => {
            console.log('users_online', users);
            const employees = users.filter((user) => user.role === 'employee');
            const customers = users.filter((user) => user.role === 'customer');

            if (auth && auth.userInfo?.role === 'customer') {
                setOnlineEmployees(employees);
            } else if (auth && auth.userInfo?.role === 'employee') {
                setOnlineEmployees(employees);
                setOnlineCustomers(customers);
            }
        };

        socket.on('ONLINE_USERS', handleOnlineUsers);

        socket.on('receiveMessage', ({ sender, content }) => {
            if (selectedUser && sender === selectedUser.fullName) {
                setMessages((prev) => [...prev, { from: sender, message: content }]);
            }
        });

        return () => {
            socket.off('connect');
            socket.off('ONLINE_USERS');
            socket.off('receiveMessage');
        };
    }, [auth, selectedUser]);

    useEffect(() => {
        const fetch = async () => {
            const res = await ChatService.getChat({
                user1: auth.userInfo.id,
                user2: selectedUser.id,
            });
            console.log(res);
            const newMessage = res.map((item) => {
                return {
                    from: item.sender === auth.userInfo?.id ? 'me' : selectedUser.fullName,
                    message: item.content,
                };
            });
            setMessages(newMessage);
        };
        if (selectedUser) {
            setMessages([]);
            fetch();
            // setMessages(res.content);
        }
    }, [selectedUser, auth.userInfo?.id]);

    const sendMessage = () => {
        if (inputMessage.trim() !== '' && selectedUser) {
            const messageData = {
                sender: auth.userInfo.id,
                receiver: selectedUser.id,
                fullName: auth.userInfo.fullName,
                content: inputMessage,
            };
            console.log('Gửi tin nhắn:', messageData);
            socket.emit('CLIENT_SEND_MESSAGE', messageData);
            setMessages((prev) => [...prev, { from: 'me', message: inputMessage }]);
            setInputMessage('');
        }
    };

    return (
        <div className="chat-container">
            {!chatOpen && (
                <button className="chat-button" onClick={() => setChatOpen(true)}>
                    Chat
                </button>
            )}
            {chatOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <h4>{auth.userInfo?.role === 'customer' ? 'Hỗ trợ khách hàng' : 'Chat với khách hàng'}</h4>
                        <button className="close-chat" onClick={() => setChatOpen(false)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    <div className="chat-body">
                        {auth.userInfo?.role === 'customer' ? (
                            <div className="online-users">
                                <h5>Nhân viên</h5>
                                {onlineEmployees.length > 0 ? (
                                    onlineEmployees.map((user) => (
                                        <button
                                            key={user.id}
                                            onClick={() => setSelectedUser(user)}
                                            className={selectedUser?.id === user.id ? 'active' : ''}
                                        >
                                            {user.fullName}
                                        </button>
                                    ))
                                ) : (
                                    <p>Chưa có nhân viên online</p>
                                )}
                            </div>
                        ) : (
                            <div className="online-users">
                                <h5>Khách hàng</h5>
                                {onlineCustomers.length > 0 ? (
                                    onlineCustomers.map((user) => (
                                        <button
                                            key={user.id}
                                            onClick={() => setSelectedUser(user)}
                                            className={selectedUser?.id === user.id ? 'active' : ''}
                                        >
                                            {user.fullName || user.email}
                                        </button>
                                    ))
                                ) : (
                                    <p>Chưa có khách hàng online</p>
                                )}
                                <h5>Nhân viên</h5>
                                {onlineEmployees.length > 0 ? (
                                    onlineEmployees.map((user) => (
                                        <button
                                            key={user.id}
                                            onClick={() => setSelectedUser(user)}
                                            className={selectedUser?.id === user.id ? 'active' : ''}
                                        >
                                            {user.fullName}
                                        </button>
                                    ))
                                ) : (
                                    <p>Chưa có nhân viên online</p>
                                )}
                            </div>
                        )}

                        <div className="chat-messages">
                            {selectedUser ? (
                                <>
                                    <h5>Chat với {selectedUser.fullName || selectedUser.email}</h5>
                                    <div className="messages">
                                        {messages.map((msg, index) => (
                                            <p key={index} className={msg.from === 'me' ? 'message me' : 'message'}>
                                                <strong>{msg.from === 'me' ? 'Bạn' : msg.from}:</strong> {msg.message}
                                            </p>
                                        ))}
                                    </div>
                                    {/* Hiển thị input cho cả khách hàng và nhân viên */}
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            value={inputMessage}
                                            onChange={(e) => setInputMessage(e.target.value)}
                                            placeholder="Nhập tin nhắn..."
                                        />
                                        <button onClick={sendMessage}>Gửi</button>
                                    </div>
                                </>
                            ) : (
                                <p>Chọn đối tượng để bắt đầu chat</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
