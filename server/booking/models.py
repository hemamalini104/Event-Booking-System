from django.db import models
from django.conf import settings
from events.models import Event  # Assuming you have an Event model in events app

class Seat(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="seats")
    seat_number = models.CharField(max_length=10)
    is_booked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.event.title} - {self.seat_number}"


class Booking(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="bookings")
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="bookings")
    seats = models.ManyToManyField(Seat, blank=True)  # Optional seat selection
    booking_date = models.DateTimeField(auto_now_add=True)
    ticket_type = models.CharField(max_length=50, choices=[("free", "Free"), ("paid", "Paid")], default="paid")
    quantity = models.PositiveIntegerField(default=1)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    payment_status = models.CharField(max_length=20, choices=[("pending", "Pending"), ("completed", "Completed")], default="Completed")
    ticket_file = models.FileField(upload_to="tickets/", null=True, blank=True)  

    def __str__(self):
        return f"Booking #{self.id} - {self.event.title} by {self.user.username}"


class BookingHistory(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name="history")
    status = models.CharField(max_length=50)
    updated_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"History for Booking #{self.booking.id}"
