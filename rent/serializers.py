from rest_framework import serializers
from .models import OutFit, Event, OutFit_Event, Rent

class OutFitSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutFit
        fields = ['id', 'type_outfit']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id_event', 'type_event']

class OutFitEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutFit_Event
        fields = ['id', 'id_event', 'id_outFit']

class RentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rent
        fields = ['id', 'client', 'friend', 'event', 'fecha_cita', 'time', 'duration', 'location', 'description', 'create']