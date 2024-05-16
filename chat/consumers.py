import json
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from .models import rent

class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data=None, bytes_data=None):
        if text_data:
            text_data_json = json.loads(text_data)
            message = text_data_json['message']
            sender = text_data_json['sender']
            recipient_id = text_data_json.get('recipient_id')  # Obtén el ID del destinatario del mensaje

            if recipient_id:
                # Busca el canal de comunicación del usuario destinatario
                recipient_channel_name = self.get_recipient_channel_name(recipient_id)

                if recipient_channel_name:
                    # Envía el mensaje solo al usuario destinatario
                    await self.send_user(recipient_channel_name, {
                        'type': 'chat_message',
                        'message': message,
                        'sender': sender
                    })

    async def chat_message(self, event):
        message = event['message']
        sender = event['sender']
        await self.send(text_data=json.dumps({
            'message': message,
            'sender': sender
        }))

    def get_recipient_channel_name(self, id_user):
        try:
            rent_instance = rent.objects.get(id= id_user) 
            print("si existe")
            return rent_instance.client.channel_name  
        except rent.DoesNotExist:
            print("No existe")
            return None
