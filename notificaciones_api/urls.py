from django.urls import path
from . import views

urlpatterns = [
    path('enviar-solicitud/', views.enviar_solicitud, name='enviar_solicitud'),
    path('aceptar-solicitud/<int:id_solicitud>/',
         views.aceptar_solicitud, name='aceptar_solicitud'),
    path('rechazar-solicitud/<int:id_solicitud>/',
         views.rechazar_solicitud, name='rechazar_solicitud'),
    path('obtener-notificaciones/', views.obtener_notificaciones,
         name='obtener_notificaciones'),
]
