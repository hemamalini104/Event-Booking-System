import React from 'react';
import '../../../styles/components/ticket-selector.css';

const TicketSelector = ({ tickets, selectedTickets, onTicketChange }) => {
  const handleQuantityChange = (ticketId, quantity) => {
    onTicketChange(prev => ({
      ...prev,
      [ticketId]: Math.max(0, quantity)
    }));
  };

  return (
    <div className="ticket-selector">
      <h4>Select Tickets</h4>
      {tickets.map(ticket => (
        <div key={ticket.id} className="ticket-item card mb-3">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h5 className="ticket-type">{ticket.type}</h5>
                <p className="ticket-price">${ticket.price.toFixed(2)}</p>
                <small className="text-muted">{ticket.available} available</small>
              </div>
              <div className="col-md-6">
                <div className="quantity-selector">
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => handleQuantityChange(ticket.id, (selectedTickets[ticket.id] || 0) - 1)}
                    disabled={(selectedTickets[ticket.id] || 0) <= 0}
                  >
                    -
                  </button>
                  <span className="quantity-display mx-3">
                    {selectedTickets[ticket.id] || 0}
                  </span>
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => handleQuantityChange(ticket.id, (selectedTickets[ticket.id] || 0) + 1)}
                    disabled={(selectedTickets[ticket.id] || 0) >= ticket.available}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketSelector;