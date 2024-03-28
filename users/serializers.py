from rest_framework import serializers
from .models import User, Client, Friend, Taste, Photo, User_Taste

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id_user', 'first_name', 'last_name', 'email', 'personal_description', 'gender', 'is_active', 'is_staff', 'date_joined']

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = '__all__'

class TasteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Taste
        fields = '__all__'

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'

class UserTasteSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Taste
        fields = '__all__'
