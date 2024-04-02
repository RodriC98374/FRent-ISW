from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.documentation import include_docs_urls
from . import views

router = DefaultRouter()
router.register(r'outfits', views.OutFitViewSet)
router.register(r'events', views.EventViewSet)
router.register(r'rents', views.RentViewSet)

urlpatterns = [
    path('', include(router.urls))
]