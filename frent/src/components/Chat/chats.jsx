import { io } from 'socket.io-client';

const socket = io('ws://localhost:8000/ws/chat/');

socket.on('connect', () => {
    console.log('Conectado al servidor de WebSocket');
});

socket.on('chat_message', (data) => {
    console.log('Mensaje recibido:', data.message);
    
});

function enviarMensaje(message) {
    socket.emit('message', { message });
}

export default enviarMensaje;
