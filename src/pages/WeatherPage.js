import React, { useState, useEffect } from "react";

export default function WeatherPage() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const apiKey = "1d4eef3a5185cde5388d033013e89843"; // Replace with your key
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
          const response = await fetch(url);
          const data = await response.json();

          if (response.ok) {
            setWeather(data);
          } else {
            setError(data.message || "Unable to fetch weather");
          }
        } catch (err) {
          setError("Failed to fetch weather data");
        }
      },
      () => {
        setError("Permission denied to access location");
      }
    );
  }, []);

  if (error)
    return (
      <div className="alert alert-danger mt-3" role="alert">
        Error: {error}
      </div>
    );
  if (!weather) return <div className="mt-3 text-center">Loading weather...</div>;

  // Build icon URL
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="container mt-5 pt-5" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4 text-center">Your Local Weather</h2>
      <div className="weather-widget p-4 mb-3 border rounded bg-light shadow-sm">
        <div className="d-flex align-items-center">
          <img src={iconUrl} alt={weather.weather[0].description} />
          <div className="ms-3">
            <h4 className="mb-1">{weather.name}</h4>
            <p className="text-capitalize mb-0">{weather.weather[0].description}</p>
          </div>
        </div>
        <hr />
        <div className="row text-center">
          <div className="col">
            <h5>{weather.main.temp} °C</h5>
            <p className="mb-0">Temperature</p>
          </div>
          <div className="col">
            <h5>{weather.main.humidity} %</h5>
            <p className="mb-0">Humidity</p>
          </div>
          <div className="col">
            <h5>{weather.wind.speed} m/s</h5>
            <p className="mb-0">Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
