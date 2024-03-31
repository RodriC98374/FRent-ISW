from rest_framework import serializers
from .models import OutFit, Event, OutFit_Event, Rent
from users.models import Friend, Client

class OutFitSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutFit
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class OutFitEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutFit_Event
        fields = '__all__'

class RentSerializer(serializers.ModelSerializer):
    client_id = serializers.PrimaryKeyRelatedField(queryset=Client.objects.all())
    friend_id = serializers.PrimaryKeyRelatedField(queryset=Friend.objects.all())
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())

    class Meta:
        model = Rent
        fields = '__all__'
