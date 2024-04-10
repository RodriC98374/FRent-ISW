from django.db import models
from users.models import Friend, Client
from django.core.validators import MinValueValidator,MaxValueValidator
from django.contrib import admin
from django import forms


class OutFit(models.Model):
    id_oufit=models.IntegerField(primary_key=True)
    type_outfit = models.CharField(max_length=30)
    def __str__(self):
        return self.type_outfit
    

class Event(models.Model):
    id_event = models.IntegerField(primary_key=True)
    type_event= models.CharField(max_length=30)
    def __str__(self):
        return self.type_event

class Rent(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    friend = models.ForeignKey(Friend, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, null = True)
    outfit= models.ForeignKey(OutFit, on_delete=models.CASCADE, null = True)
    fecha_cita = models.DateField()
    time = models.TimeField()
    duration = models.FloatField(validators=[MinValueValidator(0.0)])
    location = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    create = models.DateTimeField(auto_now_add=True)
    
