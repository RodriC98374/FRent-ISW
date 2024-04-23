from .models import *
from rest_framework import serializers


class NotificacionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notificacion
        fields = '__all__'