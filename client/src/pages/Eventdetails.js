import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TicketSelector from '../../components/events/TicketSelector';
import SeatingChart from '../../components/events/SeatingChart';
import '../../styles/pages/event-details.css';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTickets, setSelectedTickets] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [activeTab, setActiveTab] = useState('details');

  // Mock event data - replace with API call
  const event = {
    id: 1,
    title: "Music Festival 2023",
    date: "2023-12-15T19:00:00",
    location: "Central Park, New York",
    description: "Join us for the biggest music festival of the year featuring top artists and amazing performances.",
    image: "https://i.pinimg.com/736x/9b/5c/37/9b5c37c776415d4a9428296dd3c318e1.jpg",
    venue: {
      name: "Main Stage Arena",
      capacity: 5000,
      layout: 'theater'
    },
    tickets: [
      { id: 1, type: "General Admission", price: 49.99, available: 200 },
      { id: 2, type: "VIP", price: 99.99, available: 50 },
      { id: 3, type: "Premium VIP", price: 149.99, available: 25 }
    ]
  };

  const handleBooking = () => {
    if (selectedSeats.length > 0 || Object.keys(selectedTickets).length > 0) {
      navigate('/checkout', { 
        state: { 
          event, 
          selectedTickets, 
          selectedSeats,
          total: calculateTotal()
        }
      });
    }
  };

  const calculateTotal = () => {
    return Object.entries(selectedTickets).reduce((total, [ticketId, quantity]) => {
      const ticket = event.tickets.find(t => t.id === parseInt(ticketId));
      return total + (ticket.price * quantity);
    }, 0);
  };

  return (
    <div className="event-details-page">
      <div className="container">
        {/* Back Button */}
        <div className="row">
          <div className="col-12">
            <button 
              className="btn btn-outline-secondary mb-4" 
              onClick={() => navigate(-1)}
            >
              <i className="fas fa-arrow-left me-2"></i>Back to Events
            </button>
          </div>
        </div>

        <div className="row">
          {/* Event Image */}
          <div className="col-md-6">
            <img 
              src={event.image} 
              alt={event.title} 
              className="img-fluid rounded event-main-image" 
            />
          </div>

          {/* Event Info */}
          <div className="col-md-6">
            <h1 className="event-title">{event.title}</h1>
            <div className="event-meta mb-4">
              <div className="meta-item">
                <i className="fas fa-calendar-alt me-2"></i>
                {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString()}
              </div>
              <div className="meta-item">
                <i className="fas fa-map-marker-alt me-2"></i>
                {event.location}
              </div>
              <div className="meta-item">
                <i className="fas fa-building me-2"></i>
                {event.venue.name}
              </div>
            </div>

            <p className="event-description">{event.description}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="row mt-5">
          <div className="col-12">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'details' ? 'active' : ''}`}
                  onClick={() => setActiveTab('details')}
                >
                  Event Details
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'tickets' ? 'active' : ''}`}
                  onClick={() => setActiveTab('tickets')}
                >
                  Tickets
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'seating' ? 'active' : ''}`}
                  onClick={() => setActiveTab('seating')}
                >
                  Seating
                </button>
              </li>
            </ul>

            <div className="tab-content mt-3">
              {activeTab === 'details' && (
                <div className="tab-pane fade show active">
                  <h4>Event Information</h4>
                  <p>{event.description}</p>
                  <div className="venue-info">
                    <h5>Venue Details</h5>
                    <p>Capacity: {event.venue.capacity} seats</p>
                    <p>Layout: {event.venue.layout}</p>
                  </div>
                </div>
              )}

              {activeTab === 'tickets' && (
                <div className="tab-pane fade show active">
                  <TicketSelector 
                    tickets={event.tickets}
                    selectedTickets={selectedTickets}
                    onTicketChange={setSelectedTickets}
                  />
                </div>
              )}

              {activeTab === 'seating' && (
                <div className="tab-pane fade show active">
                  <SeatingChart 
                    venue={event.venue}
                    selectedSeats={selectedSeats}
                    onSeatSelect={setSelectedSeats}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="booking-summary card">
              <div className="card-body">
                <h5>Booking Summary</h5>
                {Object.entries(selectedTickets).map(([ticketId, quantity]) => {
                  const ticket = event.tickets.find(t => t.id === parseInt(ticketId));
                  return quantity > 0 && (
                    <div key={ticketId} className="ticket-summary">
                      {quantity} x {ticket.type}: ${(ticket.price * quantity).toFixed(2)}
                    </div>
                  );
                })}
                {selectedSeats.length > 0 && (
                  <div className="seats-summary">
                    Selected Seats: {selectedSeats.join(', ')}
                  </div>
                )}
                <div className="total-amount mt-2">
                  <strong>Total: ${calculateTotal().toFixed(2)}</strong>
                </div>
                <button 
                  className="btn btn-primary btn-lg w-100 mt-3"
                  onClick={handleBooking}
                  disabled={Object.keys(selectedTickets).length === 0 && selectedSeats.length === 0}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
