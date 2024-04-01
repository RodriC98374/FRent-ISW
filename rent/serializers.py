from rest_framework import serializers
from .models import OutFit, Event, Rent

class OutFitSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutFit
        fields = ['id', 'type_outfit']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id_event', 'type_event']


class RentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rent
        fields = '__all__'

        