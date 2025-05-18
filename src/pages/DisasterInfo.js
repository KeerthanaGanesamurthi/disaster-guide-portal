import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const disasterDetails = {
  flood: {
    title: "Flood",
    description:
      "Floods are overflow of water that submerges land. They can cause severe damage to homes and infrastructure.",
    image: "/flood1.jpg",
    safetyTips: [
      "Move to higher ground immediately.",
      "Avoid walking or driving through flood waters.",
      "Listen to weather updates and alerts.",
      "Keep emergency supplies ready.",
    ],
  },
  earthquake: {
    title: "Earthquake",
    description:
      "An earthquake is the shaking of the surface of the Earth caused by seismic waves.",
    image: "/earthquake1.jpg",
    safetyTips: [
      "Drop, cover, and hold on during shaking.",
      "Stay away from glass, windows, and heavy furniture.",
      "If outdoors, move to an open area.",
      "Prepare an emergency kit with essentials.",
    ],
  },
  fire: {
    title: "Fire",
    description:
      "Fire disasters can cause injuries, damage properties and require quick evacuation.",
    image: "/fire1.jpg",
    safetyTips: [
      "Install smoke alarms and check regularly.",
      "Plan escape routes and practice fire drills.",
      "Keep fire extinguishers accessible.",
      "Do not use elevators during a fire.",
    ],
  },
  cyclone: {
    title: "Cyclone",
    description:
      "Cyclones are powerful storms with heavy rain and strong winds causing flooding and damage.",
    image: "/cyclone1.jpg",
    safetyTips: [
      "Secure loose outdoor items.",
      "Stay indoors away from windows.",
      "Follow evacuation orders from authorities.",
      "Have emergency supplies and documents ready.",
    ],
  },
  tsunami: {
    title: "Tsunami",
    description:
      "A tsunami is a series of ocean waves caused by underwater earthquakes or volcanic eruptions.",
    image: "/tsunami1.jpg",
    safetyTips: [
      "Move to higher ground immediately if near the coast.",
      "Do not go to the shore to watch the tsunami.",
      "Listen to official tsunami warnings.",
      "Prepare emergency supplies.",
    ],
  },
};

export default function DisasterInfo() {
  const { type } = useParams();
  const disaster = disasterDetails[type];
  const [news, setNews] = useState([]);

  useEffect(() => {
    if (disaster) {
      const fetchNews = async () => {
        try {
          const response = await axios.get(
            `https://newsapi.org/v2/everything?q=${disaster.title}&sortBy=publishedAt&language=en&pageSize=5&apiKey=9cc10639335141fea8368d0248ddd2ed`
          );
          setNews(response.data.articles);
        } catch (error) {
          console.error("Error fetching news:", error);
        }
      };

      fetchNews();
    }
  }, [disaster]);

  if (!disaster) {
    return (
      <div className="container mt-4">
        <h3>Disaster type not found.</h3>
        <Link to="/" className="btn btn-primary mt-3">Go Back Home</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-secondary mb-4">&larr; Back to Home</Link>

      <h1 className="mb-3">{disaster.title}</h1>

      <img
        src={disaster.image}
        alt={disaster.title}
        className="img-fluid rounded mb-4 shadow-sm"
        style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
      />

      <p style={{ fontSize: "1.2rem" }}>{disaster.description}</p>

      <h4 className="mt-4 mb-3">Safety Tips:</h4>
      <ul className="list-group list-group-flush mb-4">
        {disaster.safetyTips.map((tip, idx) => (
          <li key={idx} className="list-group-item">
            {tip}
          </li>
        ))}
      </ul>

      {/* ✅ Live News Section */}
      <h4 className="mt-4 mb-3">Latest News about {disaster.title}:</h4>
      {news.length === 0 ? (
        <p>No recent news found or loading...</p>
      ) : (
        <div className="row">
          {news.map((article, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    className="card-img-top"
                    alt="News"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">
                    {article.description?.slice(0, 100)}...
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
