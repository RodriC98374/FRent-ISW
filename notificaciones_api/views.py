from .models import *
from rest_framework import viewsets
from .forms import *
from django.shortcuts import render
from .serializer import NotificacionSerializer
# create yours views
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail


def inicio(request):
    notificaciones = Notificacion.objects.all()
    context = {'notificaciones': notificaciones, }
    return render(request, "notificaciones_api/inicio.html", context)


class NotificacionesView(viewsets.ModelViewSet, APIView):
    serializer_class = NotificacionSerializer
    queryset = Notificacion.objects.all()


class EmailAPIView(APIView):
    def post(self, request):
        try:
            to_email = request.data.get('to_email')
            subject = "Solisitud de Alquiler"
            message = request.data.get('message')
            send_mail(subject, message, None, [to_email])
            return Response({'message': 'Correo enviado con éxito'}, status=status.HTTP_200_OK)
        except Exception as e:
            error_message = str(e)
            return Response({'message': error_message}, status=status.HTTP_400_BAD_REQUEST)
