import React, { useState, useEffect } from "react";
import {
  Bell,
  ShoppingCart,
  Heart,
  Package,
  BarChart2,
  Calendar,
  AlertTriangle,
} from "lucide-react";

const BuyerDashboard = () => {
  const [recentProducts, setRecentProducts] = useState([]);
  const [weatherAlert, setWeatherAlert] = useState(null);
  const [marketTrends, setMarketTrends] = useState([]);
  const [upcomingDeliveries, setUpcomingDeliveries] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // In a real application, these would be API calls
    setRecentProducts([
      {
        id: 1,
        name: "Organic Potatoes",
        seller: "Farm Fresh Ltd",
        price: "Rs. 45/kg",
        image: "/api/placeholder/80/80",
      },
      {
        id: 2,
        name: "Fertilizer - NPK",
        seller: "Agri Supplies",
        price: "Rs. 1200",
        image: "/api/placeholder/80/80",
      },
      {
        id: 3,
        name: "Wheat Seeds",
        seller: "Punjab Seeds",
        price: "Rs. 850/bag",
        image: "/api/placeholder/80/80",
      },
    ]);

    setWeatherAlert({
      type: "Rain expected",
      message:
        "Heavy rainfall predicted in Punjab region in the next 48 hours.",
    });

    setMarketTrends([
      { product: "Tomatoes", trend: "up", change: "+12%" },
      { product: "Wheat", trend: "down", change: "-3%" },
      { product: "Cotton", trend: "up", change: "+7%" },
    ]);

    setUpcomingDeliveries([
      {
        id: "DEL-1234",
        product: "Rice Seeds",
        date: "April 26, 2025",
        status: "In Transit",
      },
      {
        id: "DEL-1235",
        product: "Organic Fertilizer",
        date: "April 28, 2025",
        status: "Processing",
      },
    ]);

    setNotifications([
      {
        id: 1,
        message: "Your order #ORD-789 has been confirmed",
        time: "2 hours ago",
      },
      {
        id: 2,
        message: "Price drop alert: Potato seeds now at Rs. 750/bag",
        time: "Yesterday",
      },
      {
        id: 3,
        message: "New organic products available in your area",
        time: "2 days ago",
      },
    ]);
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Buyer Dashboard</h1>

      {/* Weather Alert */}
      {weatherAlert && (
        <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <AlertTriangle className="text-blue-600 mr-2" size={20} />
            <h2 className="font-semibold text-blue-800">{weatherAlert.type}</h2>
          </div>
          <p className="mt-1 text-blue-600">{weatherAlert.message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Quick Actions */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="/buyer/marketplace"
              className="flex flex-col items-center bg-gray-50 p-3 rounded-md hover:bg-gray-100"
            >
              <ShoppingCart size={24} />
              <span className="mt-1 text-sm">Browse Products</span>
            </a>
            <a
              href="/buyer/saved"
              className="flex flex-col items-center bg-gray-50 p-3 rounded-md hover:bg-gray-100"
            >
              <Heart size={24} />
              <span className="mt-1 text-sm">Wishlist</span>
            </a>
            <a
              href="/buyer/orders"
              className="flex flex-col items-center bg-gray-50 p-3 rounded-md hover:bg-gray-100"
            >
              <Package size={24} />
              <span className="mt-1 text-sm">My Orders</span>
            </a>
            <a
              href="/buyer/market-insights"
              className="flex flex-col items-center bg-gray-50 p-3 rounded-md hover:bg-gray-100"
            >
              <BarChart2 size={24} />
              <span className="mt-1 text-sm">Market Insights</span>
            </a>
          </div>
        </div>

        {/* Upcoming Deliveries */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Upcoming Deliveries</h2>
          {upcomingDeliveries.length > 0 ? (
            <ul className="space-y-3">
              {upcomingDeliveries.map((delivery) => (
                <li key={delivery.id} className="border-b pb-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{delivery.product}</span>
                    <span className="text-gray-500 text-sm">
                      {delivery.status}
                    </span>
                  </div>
                  <div className="flex items-center text-sm mt-1">
                    <Calendar size={14} className="mr-1" />
                    <span>{delivery.date}</span>
                  </div>
                  <a
                    href={`/buyer/delivery-tracking/${delivery.id}`}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Track delivery
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No upcoming deliveries</p>
          )}
        </div>

        {/* Market Trends */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Market Trends</h2>
          <ul className="space-y-3">
            {marketTrends.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{item.product}</span>
                <span
                  className={`font-medium ${
                    item.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.change}
                </span>
              </li>
            ))}
          </ul>
          <a
            href="/buyer/market-insights"
            className="text-blue-600 text-sm block mt-4 hover:underline"
          >
            View detailed market insights
          </a>
        </div>
      </div>

      {/* Recently Added Products */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="font-semibold mb-4">Recently Added Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recentProducts.map((product) => (
            <a
              href={`/buyer/product/${product.id}`}
              key={product.id}
              className="flex border p-3 rounded-md hover:bg-gray-50"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded mr-3"
              />
              <div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-gray-500 text-sm">{product.seller}</p>
                <p className="font-medium text-green-600">{product.price}</p>
              </div>
            </a>
          ))}
        </div>
        <a
          href="/buyer/marketplace"
          className="text-blue-600 text-sm block mt-4 hover:underline"
        >
          Browse all products
        </a>
      </div>

      {/* Recent Notifications */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Recent Notifications</h2>
          <a
            href="/buyer/notifications"
            className="text-blue-600 text-sm hover:underline"
          >
            View all
          </a>
        </div>
        <ul className="space-y-3">
          {notifications.map((notification) => (
            <li key={notification.id} className="border-b pb-3">
              <p>{notification.message}</p>
              <span className="text-gray-500 text-sm">{notification.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BuyerDashboard;
