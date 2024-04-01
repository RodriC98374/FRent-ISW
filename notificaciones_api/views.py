from .models import *
from rest_framework import viewsets
from .forms import *
from django.shortcuts import render
from .serializer import NotificacionSerializer
# create yours views


def inicio(request):
    notificaciones = Notificacion.objects.all()
    context = {'notificaciones': notificaciones, }
    return render(request, "notificaciones_api/inicio.html", context)

class NotificacionesView(viewsets.ModelViewSet):
    serializer_class = NotificacionSerializer
    queryset = Notificacion.objects.all()
