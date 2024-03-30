from django.shortcuts import render
from rest_framework import viewsets
from .models import User, Client, Friend, Taste, Photo, User_Taste
from .serializers import UserSerializer, ClientSerializer, FriendSerializer, TasteSerializer, PhotoSerializer, UserTasteSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class FriendViewSet(viewsets.ModelViewSet):
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer

class TasteViewSet(viewsets.ModelViewSet):
    queryset = Taste.objects.all()
    serializer_class = TasteSerializer

class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

class UserTasteViewSet(viewsets.ModelViewSet):
    queryset = User_Taste.objects.all()
    serializer_class = UserTasteSerializer

