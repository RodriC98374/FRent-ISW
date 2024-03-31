from rest_framework import serializers
from .models import User, Client, Friend, Taste, Photo, User_Taste

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'personal_description', 'gender','country','password', 'birth_date','city']
        

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['first_name', 'last_name', 'email', 'personal_description', 'gender','country','password', 'birth_date','city']

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = ['first_name', 'last_name', 'email', 'personal_description', 'gender','country','password', 'birth_date','city', 'price']

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
