import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const disasters = [
  { type: "flood", title: "Flood", image: "/flood.jpeg" },
  { type: "earthquake", title: "Earthquake", image: "/earthquake.jpeg" },
  { type: "fire", title: "Fire", image: "/fire.jpeg" },
  { type: "cyclone", title: "Cyclone", image: "/cyclone.jpeg" },
  { type: "tsunami", title: "Tsunami", image: "/tsunami.jpeg" }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter disasters based on search input
  const filteredDisasters = disasters.filter(disaster =>
    disaster.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      {/* Banner / Intro */}
      <div className="jumbotron bg-light p-4 rounded shadow-sm mb-5">
        <h1 className="display-5">Welcome to Disaster Guide Portal</h1>
        <p className="lead">
          Get information, alerts, emergency contacts, and safety resources for different natural disasters.
        </p>
        <hr />
        <Link to="/contacts" className="btn btn-danger">
          View Emergency Contacts
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search disaster categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Disaster Cards */}
      <h2 className="mb-4">Disaster Categories</h2>
      <div className="row">
        {filteredDisasters.length > 0 ? (
          filteredDisasters.map((disaster, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100 shadow">
                <img
                  src={disaster.image}
                  className="card-img-top"
                  alt={disaster.title}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{disaster.title}</h5>
                  <Link
                    to={`/disaster/${disaster.type}`}
                    className="btn btn-primary mt-auto"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No disaster categories match your search.</p>
        )}
      </div>

      {/* Emergency Tips Preview */}
      <section className="my-5 p-4 bg-light rounded shadow-sm">
        <h3>Emergency Tips</h3>
        <ul>
          <li>Keep an emergency kit ready with essentials.</li>
          <li>Know your evacuation routes and shelters.</li>
          <li>Stay updated with local weather and alerts.</li>
          <li>Have a communication plan with family members.</li>
        </ul>
        <Link to="/checklist" className="btn btn-outline-secondary mt-2">
          View Full Checklist
        </Link>
      </section>

      {/* Weather Alert Preview */}
      <section className="mb-5 p-4 bg-secondary text-white rounded shadow-sm">
        <h3>Weather Alerts</h3>
        <p>Stay informed about the latest weather warnings in your area.</p>
        <Link to="/weather" className="btn btn-light">
          Check Weather
        </Link>
      </section>


      {/* Footer */}
      <footer className="text-center py-3 border-top">
        <small>
          &copy; {new Date().getFullYear()} Disaster Guide Portal |{" "}
          <Link to="/contacts">Emergency Contacts</Link> |{" "}
          <Link to="/ai-assistant">AI Assistant</Link>
        </small>
      </footer>
    </div>
  );
}
