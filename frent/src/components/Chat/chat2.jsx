import React, { useEffect } from 'react';

const WebSocketTest = () => {
  const roomName = 'Cliente';  

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new WebSocket(`ws://localhost:9000/ws/chat/${roomName}/`);

      socket.onopen = () => {
        console.log('Conexión WebSocket abierta');
        socket.onopen = () => {
          console.log('Conexión WebSocket abierta');
          const message = {
            sender: 'React Client',
            message: 'Hola desde el cliente React'
          };
          socket.send(JSON.stringify(message));  
        };
        
      };

      socket.onmessage = (e) => {
        console.log('Mensaje recibido desde el servidor:', e.data);
      };

      socket.onerror = (error) => {
        console.error('Error en la conexión WebSocket:', error);
      };

      socket.onclose = () => {
        console.log('Conexión WebSocket cerrada');
      };

      return () => {
        socket.close();
      };
    };

    connectWebSocket();

  }, [roomName]);

  return (
    <div>
      <h1>Prueba de WebSocket desde React</h1>
    </div>
  );
};

export default WebSocketTest;
