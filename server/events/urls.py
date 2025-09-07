from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet, TicketTierViewSet

# Create a router and register our viewsets
router = DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'tickets', TicketTierViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
