from django.shortcuts import render
from rest_framework import viewsets
from .serializer import UserSerializer, FriendSerializer, ClientSerializer
from .models import User, Friend, Client

# Create your views here.
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class FriendView(viewsets.ModelViewSet):
    serializer_class = FriendSerializer
    queryset = Friend.objects.all()

class ClientView(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()