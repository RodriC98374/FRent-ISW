from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.response import Response

from .models import User, Client, Friend, Like, Photo, User_like
from .serializers import GustosSerializer, UserSerializer, ClientSerializer, FriendSerializer, LikeSerializer, PhotoSerializer, UserLikeSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #permission_classes = [IsAuthenticated]


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        client_instance = serializer.save()
# 'id_user', 'first_name', 'last_name', 'email', 'personal_description', 'gender','country','password', 'birth_date','city', 'price'

class FriendViewSet(viewsets.ModelViewSet):
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer
    # permission_classes = [IsAuthenticated]
    
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                new_friend = Friend.objects.create_user(**serializer.validated_data)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

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
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "ID de usuario no proporcionado"}, status=status.HTTP_400_BAD_REQUEST)

    

class CustomLoginView(APIView):
    def post(self, request):
        email = request.data.get('email', None)
        password = request.data.get('password', None)

        user = authenticate(username=email, password=password)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            return Response({'error': 'Credenciales inválidas'}, status=400)