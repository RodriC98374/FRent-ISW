import json
from channels.generic.websocket import AsyncJsonWebsocketConsumer


class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['user_id1'] + '_' + self.scope['url_route']['kwargs']['user_id2']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        print("conexiion")
        try:
            text_data_json = json.loads(text_data)
            sender_id = text_data_json['sender']
            recipient_id = text_data_json['recipient']
            message = text_data_json['message']
            print("llego", text_data_json)
        except KeyError as ex:
            # Manejar la excepción cuando falta una clave en el JSON
            print(f"Error: Falta la clave {ex} en el JSON recibido.")
            return  # Retorna para evitar enviar un mensaje con datos faltantes

        # Save message in database or perform other operations as needed
        
        # Verificar si el destinatario es diferente del remitente actual
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender': sender_id,
                'recipient': recipient_id
            }
        )
    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        sender_id = event['sender']
        recipient_id = event['recipient']

        # Verificar si el destinatario es diferente del remitente actual
        if recipient_id != sender_id:
            # Send message to WebSocket
            await self.send(text_data=json.dumps({
                'message': message,
                'sender': sender_id,
                'recipient': recipient_id
            }))