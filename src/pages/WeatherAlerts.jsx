import { useState } from "react";
import React from "react";

function WeatherAlerts() {
  // Sample weather data
  const [weatherData, setWeatherData] = useState({
    location: "Islamabad Region",
    currentConditions: {
      temp: 28,
      feelsLike: 29,
      humidity: 45,
      windSpeed: 8,
      condition: "Clear",
      icon: "sun",
    },
    forecast: [
      {
        day: "Today",
        high: 28,
        low: 13,
        condition: "Sunny",
        icon: "sun",
        precipitation: 0,
      },
      {
        day: "Tomorrow",
        high: 25,
        low: 12,
        condition: "Partly Cloudy",
        icon: "cloud-sun",
        precipitation: 0,
      },
      {
        day: "Friday",
        high: 22,
        low: 14,
        condition: "Light Rain",
        icon: "cloud-rain",
        precipitation: 40,
      },
      {
        day: "Saturday",
        high: 23,
        low: 15,
        condition: "Partly Cloudy",
        icon: "cloud-sun",
        precipitation: 20,
      },
      {
        day: "Sunday",
        high: 26,
        low: 16,
        condition: "Sunny",
        icon: "sun",
        precipitation: 0,
      },
    ],
    alerts: [
      {
        type: "warning",
        title: "Light Rain Expected",
        description:
          "Light rainfall expected on Friday. Consider covering sensitive crops.",
        date: "April 25, 2025",
      },
      {
        type: "info",
        title: "Temperature Drop",
        description:
          "Temperature expected to drop by 6°C on Friday. Protect temperature-sensitive crops.",
        date: "April 25, 2025",
      },
    ],
    cropSpecificAdvice: [
      {
        crop: "Wheat",
        advice:
          "Current conditions are optimal for wheat growth. Consider irrigation next week if no rain occurs.",
      },
      {
        crop: "Rice",
        advice:
          "Monitor water levels with expected rainfall on Friday. Ensure proper drainage.",
      },
      {
        crop: "Vegetables",
        advice:
          "Consider protective covering for tomatoes and peppers during Friday's rain.",
      },
    ],
  });

  // Weather icon component
  const WeatherIcon = ({ type }) => {
    const icons = {
      sun: (
        <svg
          className="w-full h-full text-yellow-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      ),
      "cloud-sun": (
        <svg
          className="w-full h-full text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
        </svg>
      ),
      "cloud-rain": (
        <svg
          className="w-full h-full text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15zm7 1V9m3 8V9"
          />
        </svg>
      ),
    };

    return icons[type] || null;
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-green-700 mb-6">
        Weather Alerts
      </h1>

      {/* Current Weather */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-16 h-16 mr-4">
              <WeatherIcon type={weatherData.currentConditions.icon} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {weatherData.currentConditions.temp}°C
              </h2>
              <p className="text-gray-600">
                {weatherData.currentConditions.condition}
              </p>
              <p className="text-sm text-gray-500">{weatherData.location}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Feels Like</p>
              <p className="font-medium">
                {weatherData.currentConditions.feelsLike}°C
              </p>
            </div>
            <div>
              <p className="text-gray-500">Humidity</p>
              <p className="font-medium">
                {weatherData.currentConditions.humidity}%
              </p>
            </div>
            <div>
              <p className="text-gray-500">Wind</p>
              <p className="font-medium">
                {weatherData.currentConditions.windSpeed} km/h
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Alerts */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Alerts</h2>
        {weatherData.alerts.map((alert, index) => (
          <div
            key={index}
            className={`mb-3 p-4 rounded-lg shadow-sm ${
              alert.type === "warning"
                ? "bg-yellow-50 border-l-4 border-yellow-400"
                : "bg-blue-50 border-l-4 border-blue-400"
            }`}
          >
            <div className="flex items-center">
              {alert.type === "warning" ? (
                <svg
                  className="w-5 h-5 text-yellow-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-blue-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <h3 className="font-medium text-gray-800">{alert.title}</h3>
            </div>
            <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
            <p className="text-xs text-gray-500 mt-1">{alert.date}</p>
          </div>
        ))}
      </div>

      {/* 5-Day Forecast */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          5-Day Forecast
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {weatherData.forecast.map((day, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-4 text-center"
            >
              <p className="font-medium text-gray-700">{day.day}</p>
              <div className="w-12 h-12 mx-auto my-2">
                <WeatherIcon type={day.icon} />
              </div>
              <p className="font-bold text-gray-800">{day.high}°C</p>
              <p className="text-gray-500 text-sm">{day.low}°C</p>
              <p className="text-sm text-gray-600">{day.condition}</p>
              {day.precipitation > 0 && (
                <p className="text-xs text-blue-500 mt-1">
                  {day.precipitation}% precip
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Crop Specific Advice */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Crop Advice
        </h2>
        <div className="bg-white rounded-lg shadow-md p-4">
          {weatherData.cropSpecificAdvice.map((item, index) => (
            <div
              key={index}
              className={`${
                index !== 0 ? "border-t border-gray-100 pt-3 mt-3" : ""
              }`}
            >
              <h3 className="font-medium text-green-700">{item.crop}</h3>
              <p className="text-gray-600 text-sm">{item.advice}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow transition-colors">
          View Detailed Forecast
        </button>
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow transition-colors">
          Set Weather Alerts
        </button>
      </div>
    </div>
  );
}

export default WeatherAlerts;
