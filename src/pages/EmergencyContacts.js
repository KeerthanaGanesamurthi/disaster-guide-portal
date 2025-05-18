import React from "react";
import { Link } from "react-router-dom";

const contacts = [
  {
    disaster: "Flood",
    contact: "108 (Emergency Medical Services), 1070 (State Emergency)"
  },
  {
    disaster: "Earthquake",
    contact: "1078 (Disaster Management), 112 (National Emergency)"
  },
  {
    disaster: "Fire",
    contact: "101 (Fire Department), 112"
  },
  {
    disaster: "Cyclone",
    contact: "1096 (Cyclone Helpline), 1070"
  },
  {
    disaster: "Tsunami",
    contact: "1091 (Coast Guard), 1070"
  }
];

export default function EmergencyContacts() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Emergency Contact Numbers</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Disaster</th>
            <th>Contact Numbers</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((item, idx) => (
            <tr key={idx}>
              <td>{item.disaster}</td>
              <td>{item.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/" className="btn btn-secondary mt-3">
        ← Back to Home
      </Link>
    </div>
  );
}
