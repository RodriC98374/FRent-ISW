from django.shortcuts import render
from rest_framework import viewsets
from decimal import Decimal
from django.utils import timezone
from django.db.models import F, ExpressionWrapper, fields
from .models import OutFit, Event, Rent
from .serializers import OutFitSerializer, EventSerializer, RentSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

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


class RentPriceViewSet(viewsets.ModelViewSet):
    queryset = Rent.objects.all()
    serializer_class = RentSerializer
    def retrieve(self, request, pk=None):
        rent = get_object_or_404(Rent, pk=pk)
        duration_decimal = Decimal(rent.duration)
        rent_price_get = duration_decimal * rent.friend.price
        response_data = {
            'id': rent.id,
            'friend': rent.client.id_user,
            'rent_price': float(rent_price_get),
        }
        return Response(response_data)
    
    
class RentTimeElapsedViewSet(viewsets.ModelViewSet):
    queryset = Rent.objects.all()
    serializer_class = RentSerializer 
    def retrieve(self, request, pk=None):
        
        rent = get_object_or_404(Rent, pk=pk)
        now = timezone.now()
        time_elapsed = now - rent.create
        total_minutes = round(time_elapsed.total_seconds() / 60)
        
        if total_minutes >= 60:
            hours = total_minutes // 60
            time_elapsed_get = f"{hours} horas"
        else:
            time_elapsed_get = f"{total_minutes} minutos"
        response_data = {
            'id': rent.id,
            'time_elapsed': time_elapsed_get,
        }
        return Response(response_data)