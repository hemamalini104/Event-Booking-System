import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from "react";

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/events')
      .then(res => {
        console.log("✅ Events received:", res.data);
        setEvents(res.data);
      })
      .catch(err => console.log("❌ Error fetching events:", err));

    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Available Events</h2>
      <div className="row">
        {events.map((event) => (
          <div className="col-md-4 mb-4" key={event.id}>
            <div className="card">
              {event.banner_image && ( // ✅ use banner_image from DB
                <img src={event.banner_image} className="card-img-top" alt="banner" />
              )}
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p>{new Date(event.date).toLocaleDateString()} | {event.location}</p>
                <p>{event.description}</p>
                <p><strong>Category:</strong> {event.category}</p>
                <button className="btn btn-success" onClick={() => handleBook(event)}>Book Now</button>
                <Link to={`/organizer/edit/${event.id}`} className="btn btn-warning mt-2 ms-2">Edit</Link>
              </div>
            </div>
    <div style={{ padding: "20px" }}>
      <h2>Available Events</h2>
      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        events.map((event) => (
          <div
            key={event.id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "5px"
            }}
          >
            {event.banner && (
              <img
                src={event.banner}
                alt="Event Banner"
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
            )}
            <h3>{event.title}</h3>
            <p>
              {event.date} at {event.time}
            </p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Category:</strong> {event.category}</p>
            <p>{event.description}</p>
          </div>
          
        ))
      )}
