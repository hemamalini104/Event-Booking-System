from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404

from .models import Booking, Seat   # ✅ Import Seat properly
from .serializers import BookingSerializer
from events.models import Event


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Get event and seat IDs from request
        event_id = self.request.data.get('event')
        seat_ids = self.request.data.getlist('seats', [])  # list of seat IDs

        # Validate event
        event = get_object_or_404(Event, id=event_id)

        # Check seats
        booked_seats = []
        for seat_id in seat_ids:
            seat = get_object_or_404(Seat, id=seat_id, event=event)
            if seat.is_booked:
                booked_seats.append(seat.seat_number)
            else:
                seat.is_booked = True
                seat.save()

        # If any seat already booked, throw error
        if booked_seats:
            raise ValidationError(f"Seats already booked: {', '.join(booked_seats)}")

        # Save booking with user and event
        booking = serializer.save(user=self.request.user, event=event)
        
        # Assign seats to booking
        if seat_ids:
            booking.seats.set(seat_ids)
