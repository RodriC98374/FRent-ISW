from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ClientViewSet, FriendViewSet, TasteViewSet, PhotoViewSet, UserLikeViewSet, AvailabilityViewSet
from .views import CustomLoginView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'clients', ClientViewSet)
router.register(r'friends', FriendViewSet)
router.register(r'likes', TasteViewSet)
router.register(r'photos', PhotoViewSet)
router.register(r'user_tastes', UserLikeViewSet)
router.register(r'availability', AvailabilityViewSet)


urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('login/', CustomLoginView().as_view(), name='login'),
]
