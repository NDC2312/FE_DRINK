// socket.js
import { io } from 'socket.io-client';

// Khởi tạo kết nối socket một lần duy nhất
const socket = io('http://localhost:5000', { withCredentials: true });

export default socket;
