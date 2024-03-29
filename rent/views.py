from django.shortcuts import render
from rest_framework import viewsets
from .models import OutFit, Event, OutFit_Event, Rent
from .serializers import OutFitSerializer, EventSerializer, OutFitEventSerializer, AlquilerSerializer

class OutFitViewSet(viewsets.ModelViewSet):
    queryset = OutFit.objects.all()
    serializer_class = OutFitSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class OutFitEventViewSet(viewsets.ModelViewSet):
    queryset = OutFit_Event.objects.all()
    serializer_class = OutFitEventSerializer

class AlquilerViewSet(viewsets.ModelViewSet):
    queryset = Rent.objects.all()
    serializer_class = AlquilerSerializer

