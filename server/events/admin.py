from django.contrib import admin
from .models import Organizer, Event, TicketTier

class TicketTierInline(admin.TabularInline):
    model = TicketTier
    extra = 1

class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'organizer', 'date', 'location', 'is_approved')
    inlines = [TicketTierInline]

admin.site.register(Organizer)
admin.site.register(Event, EventAdmin)
admin.site.register(TicketTier)

