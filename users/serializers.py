from rest_framework import serializers
from .models import User, Client, Friend, Like, Photo, User_like

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id_user', 'first_name', 'last_name', 'email', 'personal_description', 'gender','country','password', 'birth_date','city']
        

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id_user', 'first_name', 'last_name', 'email', 'personal_description', 'gender','country','password', 'birth_date','city']

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = ['id_user', 'first_name', 'last_name', 'email', 'personal_description', 'gender','country','password', 'birth_date','city', 'price']

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'

class UserLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_like
        fields = '__all__'
