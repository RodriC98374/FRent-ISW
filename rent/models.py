from django.db import models
from users.models import Friend, Client


class OutFit(models.Model):
    type_outfit = models.CharField(max_length=30)
    

class Event(models.Model):
    id_event = models.IntegerField(primary_key=True)
    type_event= models.CharField(max_length=30)

class OutFit_Event(models.Model):
    id_event = models.ForeignKey(Event, on_delete=models.CASCADE)
    id_outFit = models.ForeignKey(OutFit, on_delete=models.CASCADE)
    

class Rent(models.Model):
    client_id = models.ForeignKey(Client, on_delete=models.CASCADE)
    friend_id = models.ForeignKey(Friend, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    fecha_cita = models.DateField()
    time = models.TimeField()
    duration = models.FloatField()
    location = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    

    
    
