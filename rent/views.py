from django.shortcuts import render
from rest_framework import viewsets
from decimal import Decimal
from django.utils import timezone
from django.db.models import F, ExpressionWrapper, fields
from .models import OutFit, Event, Rent
from .serializers import OutFitSerializer, EventSerializer, RentSerializer, RentPriceSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from datetime import datetime, timedelta
from django.utils.timezone import now
from rest_framework.views import APIView


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
        
    @action(detail=False, methods=['GET'])
    def get_pendings_rents(self, request, pk=None):
        rents = Rent.objects.filter(status="pending", friend=pk)
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
                'hora_inicio': start_time.strftime('%Y-%m-%d %H:%M:%S'),
                'hora_fin': end_time.strftime('%Y-%m-%d %H:%M:%S'),
                'duration': rent.duration,
                'tipo_evento': rent.event.type_event if rent.event else 'No event',
            })

        if not data:
            return Response({'mensaje': 'No hay alquileres para este amigo'})
        return Response(data)