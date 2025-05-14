import { useState } from "react";
import React from "react";
function MarketInsights() {
  // Sample market data
  const [marketData, setMarketData] = useState({
    trendingCrops: [
      { name: "Wheat", trend: "up", price: 45, change: 2.5 },
      { name: "Basmati Rice", trend: "up", price: 110, change: 5.2 },
      { name: "Cotton", trend: "down", price: 85, change: -1.8 },
      { name: "Sugarcane", trend: "up", price: 32, change: 1.4 },
      { name: "Tomatoes", trend: "down", price: 65, change: -12.5 },
    ],
    forecasts: [
      {
        crop: "Wheat",
        description: "Prices expected to rise due to lower yield forecasts",
        impact: "positive",
      },
      {
        crop: "Rice",
        description: "Stable prices expected throughout the season",
        impact: "neutral",
      },
      {
        crop: "Vegetables",
        description: "Potential oversupply may lead to price reduction",
        impact: "negative",
      },
    ],
    news: [
      {
        title: "New Agricultural Policy Announced",
        date: "April 20, 2025",
        summary: "Government announces subsidies for organic farming",
      },
      {
        title: "Export Ban Lifted on Rice",
        date: "April 18, 2025",
        summary: "International markets open for rice exports again",
      },
      {
        title: "Sustainable Farming Workshop",
        date: "April 25, 2025",
        summary: "Local agricultural university hosting workshops",
      },
    ],
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-green-700 mb-6">
        Market Insights
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Price Trends */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Current Price Trends
            </h2>
            <div className="text-sm text-gray-500">Updated: April 23, 2025</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b">
                  <th className="px-4 py-3">Crop</th>
                  <th className="px-4 py-3">Current Price (₨/kg)</th>
                  <th className="px-4 py-3">Change</th>
                  <th className="px-4 py-3">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {marketData.trendingCrops.map((crop, index) => (
                  <tr key={index} className="text-gray-700">
                    <td className="px-4 py-3 font-medium">{crop.name}</td>
                    <td className="px-4 py-3">₨ {crop.price}</td>
                    <td
                      className={`px-4 py-3 ${
                        crop.change > 0
                          ? "text-green-600"
                          : crop.change < 0
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {crop.change > 0 ? "+" : ""}
                      {crop.change}%
                    </td>
                    <td className="px-4 py-3">
                      {crop.trend === "up" ? (
                        <span className="text-green-600">
                          <svg
                            className="w-5 h-5 inline"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span className="text-red-600">
                          <svg
                            className="w-5 h-5 inline"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"
                            />
                          </svg>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Price Chart Placeholder */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <svg
                className="w-12 h-12 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
              <p>Price trends chart would display here</p>
            </div>
          </div>
        </div>

        {/* Market News */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Market News
          </h2>
          <div className="space-y-4">
            {marketData.news.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-100 pb-4 last:border-b-0"
              >
                <h3 className="font-medium text-green-700">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                <p className="text-sm mt-2">{item.summary}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <a
              href="#"
              className="text-green-600 hover:text-green-800 text-sm font-semibold inline-flex items-center"
            >
              View all news
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Future Price Forecasts */}
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Price Forecasts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {marketData.forecasts.map((forecast, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                forecast.impact === "positive"
                  ? "bg-green-50"
                  : forecast.impact === "negative"
                  ? "bg-red-50"
                  : "bg-gray-50"
              }`}
            >
              <div
                className={`text-lg font-semibold ${
                  forecast.impact === "positive"
                    ? "text-green-700"
                    : forecast.impact === "negative"
                    ? "text-red-700"
                    : "text-gray-700"
                }`}
              >
                {forecast.crop}
              </div>
              <p className="text-sm mt-2">{forecast.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-blue-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Recommendation
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                Based on current market trends, consider:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Stocking wheat and rice as prices are trending upward</li>
                  <li>
                    Delaying tomato harvest if possible as prices might recover
                  </li>
                  <li>Exploring organic farming options for better returns</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketInsights;
