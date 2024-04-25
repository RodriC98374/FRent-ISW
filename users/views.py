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
from rest_framework.renderers import BrowsableAPIRenderer, JSONRenderer
from .models import Availability, User, Client, Friend, Like, Photo, User_like
from .serializers import AvailabilitySerializer, GustosSerializer, UserSerializer, ClientSerializer, FriendSerializer, LikeSerializer, PhotoSerializer, UserLikeSerializer, ProfileImageSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #permission_classes = [IsAuthenticated]


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    #permission_classes = [IsAuthenticated]
    
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                new_client = Client.objects.create_user(**serializer.validated_data)
                new_client_serializer = self.get_serializer(new_client)
                return Response(new_client_serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FriendViewSet(viewsets.ModelViewSet):
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer
    #permission_classes = [IsAuthenticated]
    
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                new_friend = Friend.objects.create_user(**serializer.validated_data)
                new_friend_serializer = self.get_serializer(new_friend)
                return Response(new_friend_serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

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
    
    def retrieve(self, request, pk=None):
        try:
            user = User.objects.get(id_user=pk)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProfileImageSerializer(user)
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
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "ID de usuario no proporcionado"}, status=status.HTTP_400_BAD_REQUEST)
        
class AvailabilityViewSet(viewsets.ModelViewSet):
    queryset = Availability.objects.all()
    serializer_class = AvailabilitySerializer
    
    @action(detail=True, methods=['GET'])
    def get_availability_user(self, request, pk=None, *args, **kwargs):
        availability_user = Availability.objects.filter(user_id=pk)
        
        availability_serial = AvailabilitySerializer(availability_user, many=True)
        
        if availability_serial.data:
            return Response(availability_serial.data)
        
        return Response({'error': 'No tiene rangos'})    
        
        
        # GET /users/api/v1/availability/11/get_availability_user/
        

class CustomLoginView(APIView):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    def post(self, request):
        email = request.data.get('email', None)
        password = request.data.get('password', None)
        user = authenticate(username=email, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            if hasattr(user, 'client'):
                user_type = 'Client'
            elif hasattr(user, 'friend'):
                user_type = 'Friend'
            else:
                user_type = 'User'
            return Response({
                'token': token.key,
                'user_id': user.pk,
                #'full_name': user.get_full_name(),
                'first_name': user.first_name,
                'last_name': user.last_name,
                'user_type': user_type
            })
        else:
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_400_BAD_REQUEST)