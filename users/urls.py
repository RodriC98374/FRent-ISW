from django.urls import path, include
from rest_framework import routers
from users import views

# API versioning
router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'users')
router.register(r'friends', views.FriendView, 'friends')
router.register(r'clients', views.ClientView, 'clients')

urlpatterns = [
    path("api/v1/", include(router.urls))
]