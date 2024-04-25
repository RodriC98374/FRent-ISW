
from django.contrib import admin
from django.urls import include, path
from rest_framework.documentation import include_docs_urls
urlpatterns = [
    path('admin/', admin.site.urls),
    #ruta de api rent
    path('rents/', include('rent.urls')),
    #ruta de api users
    path('users/', include('users.urls')),
    #ruta de notificaciones y email
    path('notificaciones/', include('notificaciones_api.urls')),
    #ruta de la documentacion de la API
    path('notificacionesInterno/', include('notificacionesInterno.urls')),
    #ruta de la documentacion de la API
    path('documentation/', include_docs_urls(title=" Documentacion API FRENT")),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
]