from .models import User, Chat
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ['id_user', 'first_name', 'last_name', 'image']

class ChatSerializer(serializers.ModelSerializer):
    receiver_profile = UserSerializer(read_only=True)
    sender_profile = UserSerializer(read_only=True)
    
    class Meta: 
        model = Chat
        fields = ['id', 'user', 'message', 'created_at']
