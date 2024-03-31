from .models import *
from django.shortcuts import render
from django.http import HttpResponse
from .forms import *
# create yours views


def inicio(request):
    notificaciones = Notificacion.objects.all()


    context = {'notificaciones': notificaciones,}
    return render(request, "notificaciones_api/inicio.html", context)


def obtener_notificaciones(request):
    usuario = request.user
    notificaciones = Notificacion.objects.filter(
        solicitud__destinatario=usuario, leida=False)
    datos = []
    for notificacion in notificaciones:
        solicitud = notificacion.solicitud
        datos.append({
            'id_solicitud': solicitud.id,
            'remitente': str(solicitud.remitente),
            'aceptada': solicitud.aceptada
        })
    return JsonResponse(datos, safe=False)
