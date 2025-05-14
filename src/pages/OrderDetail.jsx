// src/pages/buyer/OrderDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call with the id parameter
    const fetchOrderDetails = async () => {
      try {
        // Simulate API call with timeout
        setTimeout(() => {
          // Mock data for the order
          const mockOrder = {
            id: id,
            date: "2025-04-18",
            status: "shipped",
            paymentMethod: "Credit Card",
            paymentStatus: "Paid",
            shippingAddress: {
              name: "Ahmad Khan",
              street: "123 Farming Lane",
              city: "Lahore",
              province: "Punjab",
              postalCode: "54000",
              phone: "+92 300 1234567",
            },
            seller: {
              name: "Islamabad Seeds",
              rating: 4.8,
              contact: "+92 301 9876543",
            },
            items: [
              {
                id: "PROD-001",
                name: "Premium Wheat Seeds (5kg)",
                price: 1500,
                quantity: 2,
                image: "/images/wheat-seeds.jpg",
                subtotal: 3000,
              },
              {
                id: "PROD-045",
                name: "Organic Fertilizer (10kg)",
                price: 2200,
                quantity: 1,
                image: "/images/fertilizer.jpg",
                subtotal: 2200,
              },
              {
                id: "PROD-089",
                name: "Pesticide Spray (2L)",
                price: 1200,
                quantity: 3,
                image: "/images/pesticide.jpg",
                subtotal: 3600,
              },
            ],
            subtotal: 8800,
            shippingFee: 300,
            tax: 0,
            discount: 200,
            total: 8900,
            timeline: [
              {
                status: "Order Placed",
                date: "2025-04-15 10:23 AM",
                completed: true,
              },
              {
                status: "Payment Confirmed",
                date: "2025-04-15 10:25 AM",
                completed: true,
              },
              {
                status: "Order Processing",
                date: "2025-04-16 09:15 AM",
                completed: true,
              },
              {
                status: "Order Shipped",
                date: "2025-04-17 02:30 PM",
                completed: true,
              },
              {
                status: "Out for Delivery",
                date: "2025-04-19",
                completed: false,
              },
              {
                status: "Delivered",
                date: "Expected by April 20",
                completed: false,
              },
            ],
          };

          setOrder(mockOrder);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

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
              <span className="ml-1 text-gray-500 md:ml-2">{id}</span>
            </div>
          </li>
        </ol>
      </nav>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : order ? (
        <div className="space-y-6">
          {/* Order Header and Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Order #{order.id}
                </h1>
                <p className="text-gray-600">
                  Placed on {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                {order.status === "shipped" && (
                  <div className="mt-2">
                    <Link
                      to={`/buyer/delivery-tracking/${order.id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Track Package
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Order Progress
            </h2>
            <div className="space-y-4">
              {order.timeline.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    {step.completed ? (
                      <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
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
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3
                      className={`text-base font-medium ${
                        step.completed ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {step.status}
                    </h3>
                    <p
                      className={`text-sm ${
                        step.completed ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      {step.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Order Items */}
            <div className="md:col-span-2 bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  Order Items
                </h2>
              </div>
              <ul className="divide-y divide-gray-200">
                {order.items.map((item) => (
                  <li key={item.id} className="p-6 flex">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                      <img
                        src={item.image || "/api/placeholder/80/80"}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p className="ml-4">
                            Rs. {item.subtotal.toLocaleString()}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Unit Price: Rs. {item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {item.quantity}</p>
                        <Link
                          to={`/buyer/product/${item.id}`}
                          className="font-medium text-green-600 hover:text-green-500"
                        >
                          View Product
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Order Summary and Shipping Info */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Subtotal</p>
                    <p>Rs. {order.subtotal.toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Shipping Fee</p>
                    <p>Rs. {order.shippingFee.toLocaleString()}</p>
                  </div>
                  {order.tax > 0 && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <p>Tax</p>
                      <p>Rs. {order.tax.toLocaleString()}</p>
                    </div>
                  )}
                  {order.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <p>Discount</p>
                      <p>- Rs. {order.discount.toLocaleString()}</p>
                    </div>
                  )}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Total</p>
                      <p>Rs. {order.total.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Payment Information
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Method</p>
                    <p>{order.paymentMethod}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Status</p>
                    <p className="font-medium text-green-600">
                      {order.paymentStatus}
                    </p>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Shipping Information
                </h2>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="font-medium text-gray-900">
                    {order.shippingAddress.name}
                  </p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.province}{" "}
                    {order.shippingAddress.postalCode}
                  </p>
                  <p>{order.shippingAddress.phone}</p>
                </div>
              </div>

              {/* Seller Info */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Seller Information
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Name</p>
                    <p>{order.seller.name}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Rating</p>
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span>{order.seller.rating}/5</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Contact</p>
                    <p>{order.seller.contact}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 justify-end">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Contact Support
            </button>
            {order.status === "processing" && (
              <button className="px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Cancel Order
              </button>
            )}
            {order.status === "delivered" && (
              <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Write Review
              </button>
            )}
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
            Order not found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            We couldn't find the order you're looking for.
          </p>
          <div className="mt-6">
            <Link
              to="/buyer/orders"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Back to Orders
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
