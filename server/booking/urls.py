from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookingViewSet
from django.contrib import admin
from rest_framework import routers
from booking.views import BookingViewSet

router = DefaultRouter()
router.register(r'', BookingViewSet, basename='booking')

urlpatterns = [
    path('', include(router.urls)),
]