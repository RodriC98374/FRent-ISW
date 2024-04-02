from rest_framework import serializers
from .models import OutFit, Event, Rent

class OutFitSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutFit
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id_event', 'type_event']


class RentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rent
        fields = ['client', 'friend', 'event', 'outfit', 'fecha_cita', 'time', 'duration', 'location', 'description']

        