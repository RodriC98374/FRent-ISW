from django.urls import path, include
from . import views
from rest_framework.documentation import include_docs_urls
from notificaciones_api import views
from rest_framework import routers
from .views import NotificacionesView,EmailAPIView

router = routers.DefaultRouter()
router.register(r'notificaciones',
                views.NotificacionesView, 'notificaciones')
urlpatterns = [
    # ruta que funcione el api de usuario
    path("api/v1/", include(router.urls)),
    # documetacion
    path('docs/', include_docs_urls(title=" Documentacion API")),
    #email
    path('send-email/', EmailAPIView.as_view(), name='send-email')
    
]
