from rest_framework import serializers
from .models import NotificacionInterno

class NotiInSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificacionInterno
        fields = '__all__'