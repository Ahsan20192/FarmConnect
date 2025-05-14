// src/pages/buyer/DeliveryTracking.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
export default function DeliveryTracking() {
  const { id } = useParams();
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // In a real app, this would be an API call with the id parameter
    const fetchTrackingInfo = async () => {
      try {
        // Simulate API call with timeout
        setTimeout(() => {
          // Mock data for the tracking info
          const mockTracking = {
            orderId: id,
            deliveryId: "DEL-" + id.split("-")[1],
            estimatedDelivery: "2025-04-20",
            currentStatus: "In Transit",
            currentLocation: "Multan, Punjab",
            lastUpdated: "2025-04-19 08:23 AM",
            deliveryPartner: "AgriExpress Logistics",
            contact: "+92 321 5551234",
            packageDetails: {
              weight: "20kg",
              dimensions: "40cm x 30cm x 20cm",
              items: 3,
            },
            origin: {
              name: "Islamabad Seeds Warehouse",
              address: "Plot 123, Industrial Zone, Islamabad",
              phone: "+92 301 9876543",
            },
            destination: {
              name: "Ahmad Khan",
              address: "123 Farming Lane, Lahore, Punjab 54000",
              phone: "+92 300 1234567",
            },
            trackingHistory: [
              {
                status: "Order Placed",
                location: "Online",
                timestamp: "2025-04-15 10:23 AM",
                description: "Your order has been received and confirmed.",
              },
              {
                status: "Processing",
                location: "Islamabad",
                timestamp: "2025-04-16 09:15 AM",
                description: "Your order is being processed at our warehouse.",
              },
              {
                status: "Shipped",
                location: "Islamabad",
                timestamp: "2025-04-17 02:30 PM",
                description:
                  "Your package has been picked up by AgriExpress Logistics.",
              },
              {
                status: "In Transit",
                location: "Multan, Punjab",
                timestamp: "2025-04-19 08:23 AM",
                description: "Your package is on its way to the destination.",
              },
            ],
            // Simulated positions for a map (would connect to a real tracking API)
            routeCoordinates: [
              { lat: 33.6844, lng: 73.0479, label: "Start" }, // Islamabad
              { lat: 31.5204, lng: 74.3587, label: "Destination" }, // Lahore
            ],
            currentCoordinates: { lat: 30.1575, lng: 71.5249 }, // Multan
          };

          setTracking(mockTracking);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching tracking information:", error);
        setLoading(false);
      }
    };

    fetchTrackingInfo();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "In Transit":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Order Placed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateProgress = () => {
    if (!tracking) return 0;

    const statuses = [
      "Order Placed",
      "Processing",
      "Shipped",
      "In Transit",
      "Delivered",
    ];
    const currentIndex = statuses.indexOf(tracking.currentStatus);

    if (currentIndex === -1) return 0;
    return (currentIndex / (statuses.length - 1)) * 100;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link
              to="/buyer/dashboard"
              className="text-gray-700 hover:text-green-600"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <Link
                to="/buyer/orders"
                className="ml-1 text-gray-700 hover:text-green-600 md:ml-2"
              >
                Orders
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <Link
                to={`/buyer/orders/${id}`}
                className="ml-1 text-gray-700 hover:text-green-600 md:ml-2"
              >
                Order {id}
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="ml-1 text-gray-500 md:ml-2">Tracking</span>
            </div>
          </li>
        </ol>
      </nav>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : tracking ? (
        <div className="space-y-6">
          {/* Tracking Header */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Package Tracking
                </h1>
                <p className="text-gray-600">
                  Order #{tracking.orderId} · Tracking #{tracking.deliveryId}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <span
                  className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(
                    tracking.currentStatus
                  )}`}
                >
                  {tracking.currentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Tracking Progress */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-2 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                Delivery Progress
              </h2>
              <span className="text-sm text-gray-500">
                Estimated Delivery:{" "}
                {new Date(tracking.estimatedDelivery).toLocaleDateString()}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>

            {/* Status Steps */}
            <div className="flex justify-between items-center text-xs md:text-sm text-center">
              <div
                className={`${
                  tracking.currentStatus === "Order Placed" ||
                  tracking.trackingHistory.some(
                    (h) => h.status === "Order Placed"
                  )
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                Order Placed
              </div>
              <div
                className={`${
                  tracking.currentStatus === "Processing" ||
                  tracking.trackingHistory.some(
                    (h) => h.status === "Processing"
                  )
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                Processing
              </div>
              <div
                className={`${
                  tracking.currentStatus === "Shipped" ||
                  tracking.trackingHistory.some((h) => h.status === "Shipped")
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                Shipped
              </div>
              <div
                className={`${
                  tracking.currentStatus === "In Transit" ||
                  tracking.trackingHistory.some(
                    (h) => h.status === "In Transit"
                  )
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                In Transit
              </div>
              <div
                className={`${
                  tracking.currentStatus === "Delivered"
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                Delivered
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tracking Map */}
            <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Delivery Route
              </h2>
              <div className="bg-gray-100 rounded-lg h-72 flex items-center justify-center">
                {/* In a real app, this would be a map component */}
                <div className="text-center p-4">
                  <div className="text-gray-500 mb-2">
                    Current Location:{" "}
                    <span className="font-medium text-gray-700">
                      {tracking.currentLocation}
                    </span>
                  </div>
                  <div className="text-gray-500 text-sm">
                    Last updated: {tracking.lastUpdated}
                  </div>
                  <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-gray-500 text-sm">
                      Map view would display here showing:
                    </p>
                    <ul className="text-left text-xs text-gray-600 mt-2 space-y-1">
                      <li>• Origin: {tracking.origin.address}</li>
                      <li>• Current: {tracking.currentLocation}</li>
                      <li>• Destination: {tracking.destination.address}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="space-y-6">
              {/* Current Status */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Current Status
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">Status</p>
                    <p className="font-medium text-gray-900">
                      {tracking.currentStatus}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">Current Location</p>
                    <p className="font-medium text-gray-900">
                      {tracking.currentLocation}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">Last Updated</p>
                    <p className="font-medium text-gray-900">
                      {tracking.lastUpdated}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">Estimated Delivery</p>
                    <p className="font-medium text-gray-900">
                      {new Date(
                        tracking.estimatedDelivery
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Delivery Partner */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Delivery Partner
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">Carrier</p>
                    <p className="font-medium text-gray-900">
                      {tracking.deliveryPartner}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">Contact</p>
                    <p className="font-medium text-gray-900">
                      {tracking.contact}
                    </p>
                  </div>
                  <button className="mt-2 w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                    Contact Delivery Partner
                  </button>
                </div>
              </div>

              {/* Package Details */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Package Details
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">Weight</p>
                    <p className="font-medium text-gray-900">
                      {tracking.packageDetails.weight}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">Dimensions</p>
                    <p className="font-medium text-gray-900">
                      {tracking.packageDetails.dimensions}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">Items</p>
                    <p className="font-medium text-gray-900">
                      {tracking.packageDetails.items}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking History */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Tracking History
            </h2>
            <div className="flow-root">
              <ul className="-mb-8">
                {tracking.trackingHistory.map((event, index) => (
                  <li key={index}>
                    <div className="relative pb-8">
                      {index !== tracking.trackingHistory.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        ></span>
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span
                            className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              index === tracking.trackingHistory.length - 1
                                ? "bg-green-500"
                                : "bg-gray-400"
                            }`}
                          >
                            {index === tracking.trackingHistory.length - 1 ? (
                              <svg
                                className="h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-.293-7.707a1 1 0 00-1.414 1.414L9.586 11H6a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414l-3-3z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </span>
                        </div>
                        <div className="flex flex-1 justify-between min-w-0 pt-1.5">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {event.status}
                            </p>
                            <p className="text-sm text-gray-500">
                              {event.description}
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <time dateTime={event.timestamp}>
                              {event.timestamp}
                            </time>
                            <p className="text-xs">{event.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sender Address */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Sender</h2>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">
                  {tracking.origin.name}
                </p>
                <p className="text-sm text-gray-600">
                  {tracking.origin.address}
                </p>
                <p className="text-sm text-gray-600">{tracking.origin.phone}</p>
              </div>
            </div>

            {/* Recipient Address */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Recipient
              </h2>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">
                  {tracking.destination.name}
                </p>
                <p className="text-sm text-gray-600">
                  {tracking.destination.address}
                </p>
                <p className="text-sm text-gray-600">
                  {tracking.destination.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 justify-end">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Report Issue
            </button>
            <Link
              to={`/buyer/orders/${tracking.orderId}`}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              View Order Details
            </Link>
          </div>
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
            Tracking information not found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            We couldn't find tracking information for this order.
          </p>
          <div className="mt-6">
            <Link
              to={`/buyer/orders/${id}`}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Back to Order Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
