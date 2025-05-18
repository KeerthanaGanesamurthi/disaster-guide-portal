import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import DisasterInfo from "./pages/DisasterInfo";
import WeatherPage from "./pages/WeatherPage";
import EmergencyContacts from "./pages/EmergencyContacts";
import AIAssistant from "./pages/AIAssistant";
import Checklist from "./pages/Checklist";

export default function App() {
  return (
    <Router>
      {/* Fixed Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Disaster Guide
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/contacts">
                  Emergency Contacts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/weather">
                  Weather
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ai-assistant">
                  AI Assistant
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/checklist">
                  Checklist
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main content area with padding to prevent overlap */}
      <div className="container mt-5 pt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/disaster/:type" element={<DisasterInfo />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/contacts" element={<EmergencyContacts />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/checklist" element={<Checklist />} />
        </Routes>
      </div>
    </Router>
  );
}
