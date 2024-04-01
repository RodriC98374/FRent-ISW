from django import forms
from django.forms import ModelForm
from .models import *


class FormNotificacion(forms.ModelForm):

    class Meta:
        models = Notificacion
        fields = '__all__'
