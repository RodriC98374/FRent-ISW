from django.shortcuts import render
from rest_framework import viewsets
from decimal import Decimal
from django.utils import timezone
from django.db.models import F, ExpressionWrapper, fields
from .models import OutFit, Event, Rent
from users.models import Friend
from .serializers import OutFitSerializer, EventSerializer, RentSerializer, RentPriceSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from datetime import datetime, timedelta
from django.utils.timezone import now
from rest_framework.views import APIView
from rest_framework import status
from django.utils.timezone import localtime


class OutFitViewSet(viewsets.ModelViewSet):
    queryset = OutFit.objects.all()
    serializer_class = OutFitSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class RentViewSet(viewsets.ModelViewSet):
    queryset = Rent.objects.all()
    serializer_class = RentSerializer
    
    def get_queryset(self):
        now = timezone.now()
        return Rent.objects.annotate(
            time_elapsed=ExpressionWrapper(now - F('create'), output_field=fields.DurationField()) 
        ).order_by('-fecha_cita')
        
    @action(detail=True, methods=['GET'])
    def get_pendings_rents(self, request, pk=None):
        rents = Rent.objects.filter(status="pending", friend__id_user=pk)
        rents_serializer = RentSerializer(rents, many=True)
        return Response(rents_serializer.data)
    
    @action(detail=False, methods=['GET'])
    def get_accepted_rents(self, request):
        rents = Rent.objects.filter(status="accepted")
        rents_serializer = RentSerializer(rents, many=True)
        return Response(rents_serializer.data)

        
  
class RentPriceViewSet(viewsets.ModelViewSet):
    queryset = Rent.objects.all().order_by('-create')  
    serializer_class = RentPriceSerializer
    
    
class RentTimeElapsedViewSet(viewsets.ModelViewSet):
    queryset = Rent.objects.all()
    serializer_class = RentSerializer 
    def retrieve(self, request, pk=None):
            
        rent = get_object_or_404(Rent, pk=pk)
        now = timezone.now()
        time_elapsed = now - rent.create
        print(type(time_elapsed))
        total_minutes = int(round(time_elapsed.total_seconds() / 60))
        response_data = {
            'id': rent.id,
            'time_elapsed': total_minutes,
        }
        return Response(response_data)

class GetFriendRentsCalendar(APIView):
    def get(self, request, id_amigo):
        current_date = now().date()
        rents = Rent.objects.filter(friend_id=id_amigo, fecha_cita__gte=current_date, status='accepted')

        data = []
        for rent in rents:
            start_time = datetime.combine(rent.fecha_cita, rent.time)
            end_time = start_time + timedelta(hours=rent.duration)
            data.append({
                'id_amigo': rent.friend.id_user,
                'fecha_alquiler': rent.fecha_cita.strftime('%Y-%m-%d'),
                'hora_inicio': start_time.strftime('%H:%M:%S'),
                'hora_fin': end_time.strftime('%H:%M:%S'),
                'duration': rent.duration,
                'tipo_evento': rent.event.type_event if rent.event else 'No event',
            })

        if not data:
            return Response({'mensaje': 'No hay alquileres para este amigo'})
        return Response(data)
    
class RentDetailView(APIView):
    def get(self, request, friend_id):
        get_object_or_404(Friend, id_user=friend_id)
        #rents = Rent.objects.filter(friend__id_user=friend_id,status='pending').select_related('event', 'outfit')
        rents = Rent.objects.filter(friend__id_user=friend_id).select_related('event', 'outfit')
        rent_details = []
        for rent in rents:
            if rent.status=='pending':
              nvar='Pendiente'
            elif rent.status=='accepted':
              nvar='Aceptado'
            else:
              nvar='Rechazado'
            
            rent_details.append({
                'rent_id': rent.id,
                'friend_id': rent.friend.id_user,
                'client_id': rent.client.id_user,
                'fecha_cita': rent.fecha_cita,
                'nombre_cliente': rent.client.get_full_name(),
                'time': rent.time,
                'duration': rent.duration,
                'location': rent.location,
                'description': rent.description,
                'created': self.format_datetime_with_colon(localtime(rent.create)),
                'type_outfit': rent.outfit.type_outfit,
                'type_event': rent.event.type_event,
                'status':nvar,
                'price': rent.duration*(float(rent.friend.price)),
                'image': rent.client.image
            })  
        
        if not rent_details:
            return Response({'mensaje': 'No hay alquileres encontrados para este amigo.'})
        
        return Response(rent_details)
      
    def format_datetime_with_colon(self, datetime_obj):
      datetime_str = datetime_obj.strftime('%Y-%m-%dT%H:%M:%S.%f%z')
      return datetime_str[:-2] + ':' + datetime_str[-2:]