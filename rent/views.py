from django.shortcuts import render
from rest_framework import viewsets
from decimal import Decimal
from django.utils import timezone
from django.db.models import F, ExpressionWrapper, fields
from .models import OutFit, Event, Rent
from .serializers import OutFitSerializer, EventSerializer, RentSerializer, RentPriceSerializer
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