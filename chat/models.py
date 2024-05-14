from django.db import models

# Create your models here.


class Chat (models.Model):
    username = models.CharField(max_length=50)
    message = models.CharField(max_length=50)
    canal = models.CharField(max_length=50)
