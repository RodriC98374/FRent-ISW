from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'outfits', views.OutFitViewSet)
router.register(r'events', views.EventViewSet)
router.register(r'outfit_events', views.OutFitEventViewSet)
router.register(r'rents', views.RentViewSet)

urlpatterns = [
    path('', include(router.urls))
]