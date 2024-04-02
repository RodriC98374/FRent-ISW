from django.contrib.auth.models import User
from django.db import models


class Notificacion(models.Model):
    amigo_nombre_apellido = models.CharField(max_length=200)
    tipo = models.CharField(max_length=20, choices=(
        ('aceptada', 'Aceptó solicitud'), ('rechazada', 'Rechazó solicitud')))
    foto_amigo = models.ImageField(
        upload_to='fotos_amigos', null=True, blank=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    hora_creacion = models.TimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.amigo_nombre_apellido} - Tipo: {self.tipo}, Foto: {self.foto_amigo}"
