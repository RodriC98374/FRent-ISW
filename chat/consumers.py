import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from . models import Chat


class PersonalChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.my_user = self.scope['url_route']['kwargs']['my_username']
        self.other_username = self.scope['url_route']['kwargs']['username']

        if self.my_user < self.other_username:
            self.room_name = f'{self.my_user}-{self.other_username}'
        else:
            self.room_name = f'{self.other_username}-{self.my_user}'

        self.room_group_name = f'chat_{self.room_name}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
