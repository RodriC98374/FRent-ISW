from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.documentation import include_docs_urls
from . import views
from .views import GetFriendRentsCalendar

router = DefaultRouter()
router.register(r'outfits', views.OutFitViewSet)
router.register(r'events', views.EventViewSet)
router.register(r'rents', views.RentViewSet)
router.register(r'price', views.RentPriceViewSet, basename='rent_price')
router.register(r'time_elapsed', views.RentTimeElapsedViewSet, basename='time_elapsed')
urlpatterns = [
    path('', include(router.urls)),
    path('friend-calendar/<int:id_amigo>/', GetFriendRentsCalendar.as_view(), name='friend_calendar'),
]