from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action

from .models import User, Client, Friend, Like, Photo, User_like
from .serializers import GustosSerializer, UserSerializer, ClientSerializer, FriendSerializer, LikeSerializer, PhotoSerializer, UserLikeSerializer, ProfileImageSerializer

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

class ProfileImageViewSet(viewsets.ModelViewSet):
    def create(self, request):
        serializer = ProfileImageSerializer(data=request.data)
        if serializer.is_valid():
            user_id = request.data.get('id_user')
            try:
                user = User.objects.get(id_user=user_id)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

            serializer.update(user, request.data)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def list(self, request):
        users = User.objects.all()
        serializer = ProfileImageSerializer(users, many=True)
        return Response(serializer.data)

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
                "like_id": like_id,
                "user_id": user_id
            }      
            serializer = self.get_serializer(data=new_data)
            if serializer.is_valid():
                self.perform_create(serializer)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"message": "Gustos creados correctamente"}, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['POST'])
    def get_likes_user(self, request):
        usuario_id = request.data.get('id_user', None)
        if usuario_id is not None:
            queryset = self.queryset.filter(user_id=usuario_id).select_related('like_id')
            
            gustos_nombres = []
            for usuario_gusto in queryset:
                gusto_nombre = usuario_gusto.like_id.name  
                gustos_nombres.append(gusto_nombre)
            
            serializer = GustosSerializer(data={'id_user': usuario_id, 'gustos': gustos_nombres})
            
            if serializer.is_valid():
                print(serializer.data)
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "ID de usuario no proporcionado"}, status=status.HTTP_400_BAD_REQUEST)

