from django.urls import path, include
from . import views
from rest_framework.documentation import include_docs_urls
from notificaciones_api import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'notificaciones',
                views.NotificacionesView, 'notificaciones')
urlpatterns = [
    path('', views.inicio, name="inicio"),
    path("api/v1/", include(router.urls)),
    path('docs/', include_docs_urls(title="Notificaciones API"))
    # para que funcione el api de usuario
]
