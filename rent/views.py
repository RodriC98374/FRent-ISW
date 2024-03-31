from django.shortcuts import render
from rest_framework import viewsets
from django.utils import timezone
from django.db.models import F, ExpressionWrapper, fields
from .models import OutFit, Event, OutFit_Event, Rent
from .serializers import OutFitSerializer, EventSerializer, OutFitEventSerializer, RentSerializer

class OutFitViewSet(viewsets.ModelViewSet):
    queryset = OutFit.objects.all()
    serializer_class = OutFitSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class OutFitEventViewSet(viewsets.ModelViewSet):
    queryset = OutFit_Event.objects.all()
    serializer_class = OutFitEventSerializer

class RentViewSet(viewsets.ModelViewSet):
    queryset = Rent.objects.all()
    serializer_class = RentSerializer
    def get_queryset(self):
        now = timezone.now()
        return Rent.objects.annotate(
            time_elapsed=ExpressionWrapper(now - F('create'), output_field=fields.DurationField()) 
        ).order_by('-fecha_cita')
