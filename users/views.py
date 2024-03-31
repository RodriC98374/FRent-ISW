from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from .models import User, Client, Friend, Like, Photo, User_like
from .serializers import UserSerializer, ClientSerializer, FriendSerializer, LikeSerializer, PhotoSerializer, UserLikeSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    
    def perform_create(self, serializer):
        client_instance = serializer.save()


class FriendViewSet(viewsets.ModelViewSet):
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer
    

class TasteViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


class UserLikeViewSet(viewsets.ModelViewSet):
    queryset = User_like.objects.all()
    serializer_class = UserLikeSerializer
    
    def create(self, request, *args, **kwargs):
        likes = request.data.get('likes', [])
        user_id = request.data.get('user_id', None) 

        if user_id is None:
            return Response({"error": "ID de usuario no proporcionado"}, status=status.HTTP_400_BAD_REQUEST)

        for like_id in likes:
            new_data = {
                "taste_id": like_id,
                "user_id": user_id
            }      
            serializer = self.get_serializer(data=new_data)
            if serializer.is_valid():
                self.perform_create(serializer)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"message": "Gustos creados correctamente"}, status=status.HTTP_201_CREATED)

