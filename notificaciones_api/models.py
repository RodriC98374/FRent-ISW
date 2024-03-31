from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

class Solicitud(models.Model):
    remitente = models.ForeignKey(User, on_delete=models.CASCADE, related_name='solicitudes_enviadas')
    destinatario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='solicitudes_recibidas')
    aceptada = models.BooleanField(default=False)
    aceptada_por = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.remitente.username} -> {self.destinatario.username}"

class Notificacion(models.Model):
    solicitud = models.ForeignKey(Solicitud, on_delete=models.CASCADE)
    leida = models.BooleanField(default=False)

    def __str__(self):
        return f"Notificación para {self.solicitud.destinatario.username}"