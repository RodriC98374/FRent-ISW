from rest_framework import serializers
from .models import OutFit, Event, OutFit_Event, Rent, Client, Friend

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
        fields = '__all__'

class RentSerializer(serializers.ModelSerializer):
    client_id = serializers.PrimaryKeyRelatedField(queryset=Client.objects.all())
    friend_id = serializers.PrimaryKeyRelatedField(queryset=Friend.objects.all())
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())

class RentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rent
        fields = ['id', 'client', 'friend', 'event', 'outfit_id','fecha_cita', 'time', 'duration', 'location', 'description', 'create']