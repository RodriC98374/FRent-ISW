from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OutFitViewSet, EventViewSet, OutFitEventViewSet, RentViewSet

router = DefaultRouter()

router.register(r'outfits', OutFitViewSet)
router.register(r'events', EventViewSet)
router.register(r'outfit-events', OutFitEventViewSet)
router.register(r'rent', RentViewSet)

urlpatterns = [
    path('api/v1/', include(router.urls)),
]
