from .models import *
from rest_framework import viewsets
from .forms import *
from django.shortcuts import render
# create yours views


def inicio(request):
    notificaciones = Notificacion.objects.all()

    context = {'notificaciones': notificaciones, }
    return render(request, "notificaciones_api/inicio.html", context)


class NotificacionesView(viewsets.ModelViewSet):
    serializer_class = FormNotificacion
    queryset = Notificacion.objects.all()
