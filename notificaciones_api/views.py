from django.contrib.auth.models import User
from django.http import JsonResponse
from .models import Solicitud, Notificacion

def enviar_solicitud(request):
    if request.method == 'POST':
        remitente_id = request.POST.get('remitente')
        destinatario_id = request.POST.get('destinatario')
        remitente = User.objects.get(id=remitente_id)
        destinatario = User.objects.get(id=destinatario_id)
        solicitud = Solicitud.objects.create(remitente=remitente, destinatario=destinatario)
        notificacion = Notificacion.objects.create(solicitud=solicitud)
        return JsonResponse({'mensaje': 'Solicitud enviada'})

def aceptar_solicitud(request, id_solicitud):
    if request.method == 'POST':
        solicitud = Solicitud.objects.get(id=id_solicitud)
        solicitud.aceptada = True
        solicitud.save()
        notificacion = Notificacion.objects.get(solicitud=solicitud)
        notificacion.leida = True
        notificacion.save()
        return JsonResponse({'mensaje': 'Solicitud aceptada'})

def rechazar_solicitud(request, id_solicitud):
    if request.method == 'POST':
        solicitud = Solicitud.objects.get(id=id_solicitud)
        solicitud.delete()
        notificacion = Notificacion.objects.get(solicitud=solicitud)
        notificacion.delete()
        return JsonResponse({'mensaje': 'Solicitud rechazada'})

def obtener_notificaciones(request):
    usuario = request.user
    notificaciones = Notificacion.objects.filter(solicitud__destinatario=usuario, leida=False)
    datos = []
    for notificacion in notificaciones:
        solicitud = notificacion.solicitud
        datos.append({
            'id_solicitud': solicitud.id,
            'remitente': str(solicitud.remitente),
            'aceptada': solicitud.aceptada
        })
    return JsonResponse(datos, safe=False)