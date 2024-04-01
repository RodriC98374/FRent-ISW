from rest_framework import serializers
from .models import OutFit, Event, Rent, Client, Friend

class OutFitSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutFit
        fields = ['id', 'type_outfit']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id_event', 'type_event']

#class RentSerializer(serializers.ModelSerializer):
#    client_id = serializers.PrimaryKeyRelatedField(queryset=Client.objects.all())
#    friend_id = serializers.PrimaryKeyRelatedField(queryset=Friend.objects.all())
#    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())
#    outfit = serializers.PrimaryKeyRelatedField(queryset=OutFit.objects.all())

class RentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rent
        fields = '__all__'
        #fields = ['id', 'client', 'friend', 'event', 'outfit','fecha_cita', 'time', 'duration', 'location', 'description', 'create']
        