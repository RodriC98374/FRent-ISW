import json
from channels.generic.websocket import AsyncJsonWebsocketConsumer

class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        # Obtiene el nombre de la sala del URL
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'
        
        # Une al grupo de la sala
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        
        # Acepta la conexión WebSocket
        await self.accept()
        
    async def disconnect(self, close_code):
        # Sale del grupo de la sala cuando se desconecta
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        
    async def receive(self, text_data=None, bytes_data=None):
        print('Datos recibidos:', text_data)  # Imprimir los datos recibidos

        if text_data:
            text_data_json = json.loads(text_data)  # Intenta decodificar los datos JSON
            message = text_data_json['message']
            sender = text_data_json['sender']  # Identifica al remitente del mensaje

            # Envía el mensaje al grupo de la sala
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'sender': sender
                }
            )


    
    async def chat_message(self, event):
        # Maneja los mensajes enviados al grupo de la sala
        message = event['message']
        sender = event['sender']
        
        # Envía el mensaje al cliente WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'sender': sender
        }))
