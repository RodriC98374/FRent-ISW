from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ClientViewSet, FriendViewSet, TasteViewSet, PhotoViewSet, UserTasteViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'clients', ClientViewSet)
router.register(r'friends', FriendViewSet)
router.register(r'tastes', TasteViewSet)
router.register(r'photos', PhotoViewSet)
router.register(r'user_tastes', UserTasteViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]
