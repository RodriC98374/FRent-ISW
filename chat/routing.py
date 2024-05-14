from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<my_username>\w+)/(?P<username>\w+)/$', consumers.PersonalChatConsumer.as_asgi()),
]