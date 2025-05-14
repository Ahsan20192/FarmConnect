// src/pages/buyer/Orders.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchOrders = async () => {
      try {
        // Simulate API call with timeout
        setTimeout(() => {
          const mockOrders = [
            {
              id: "ORD-1234",
              date: "2025-04-22",
              total: 4500,
              items: 3,
              status: "delivered",
              seller: "Punjab Organic Farms",
            },
            {
              id: "ORD-2345",
              date: "2025-04-18",
              total: 2700,
              items: 2,
              status: "processing",
              seller: "Sindh Fertilizers Co.",
            },
            {
              id: "ORD-3456",
              date: "2025-04-15",
              total: 8900,
              items: 5,
              status: "shipped",
              seller: "Islamabad Seeds",
            },
            {
              id: "ORD-4567",
              date: "2025-04-10",
              total: 3200,
              items: 1,
              status: "delivered",
              seller: "Lahore Equipment Ltd",
            },
            {
              id: "ORD-5678",
              date: "2025-04-05",
              total: 5600,
              items: 4,
              status: "cancelled",
              seller: "KPK Organic Farms",
            },
          ];
          setOrders(mockOrders);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg ${
              filter === "all"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("processing")}
            className={`px-4 py-2 rounded-lg ${
              filter === "processing"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Processing
          </button>
          <button
            onClick={() => setFilter("shipped")}
            className={`px-4 py-2 rounded-lg ${
              filter === "shipped"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Shipped
          </button>
          <button
            onClick={() => setFilter("delivered")}
            className={`px-4 py-2 rounded-lg ${
              filter === "delivered"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Delivered
          </button>
          <button
            onClick={() => setFilter("cancelled")}
            className={`px-4 py-2 rounded-lg ${
              filter === "cancelled"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.seller}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    Rs. {order.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        to={`/buyer/orders/${order.id}`}
                        className="text-green-600 hover:text-green-900 font-medium"
                      >
                        View Details
                      </Link>
                      {order.status === "shipped" && (
                        <Link
                          to={`/buyer/delivery-tracking/${order.id}`}
                          className="text-blue-600 hover:text-blue-900 font-medium"
                        >
                          Track
                        </Link>
                      )}
                      {order.status === "delivered" && (
                        <button className="text-purple-600 hover:text-purple-900 font-medium">
                          Review
                        </button>
                      )}
                      {order.status === "processing" && (
                        <button className="text-red-600 hover:text-red-900 font-medium">
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            ></path>
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No orders found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter === "all"
              ? "You haven't placed any orders yet."
              : `You don't have any ${filter} orders.`}
          </p>
          <div className="mt-6">
            <Link
              to="/buyer/marketplace"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Browse Products
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
