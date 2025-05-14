import { useState } from "react";
import React from "react";

function OrderManagement() {
  // Sample order data
  const [orders, setOrders] = useState([
    {
      id: "ORD-2025-001",
      customer: "Ahmed Malik",
      farm: "Green Valley Farms",
      date: "April 20, 2025",
      status: "Processing",
      items: [
        { product: "Organic Wheat", quantity: "50 kg", price: 2500 },
        { product: "Fresh Tomatoes", quantity: "10 kg", price: 800 },
      ],
      total: 3300,
      paymentStatus: "Paid",
      deliveryAddress: "House 123, Street 5, Islamabad",
      phone: "+92-300-1234567",
      notes: "Please deliver in the morning",
    },
    {
      id: "ORD-2025-002",
      customer: "Fatima Hassan",
      farm: "Sunrise Organic",
      date: "April 21, 2025",
      status: "Shipped",
      items: [
        { product: "Rice (Basmati)", quantity: "25 kg", price: 3000 },
        { product: "Fresh Eggs", quantity: "30 units", price: 450 },
      ],
      total: 3450,
      paymentStatus: "Paid",
      deliveryAddress: "Apartment 45, Block B, Blue Area, Islamabad",
      phone: "+92-333-9876543",
      notes: "",
    },
    {
      id: "ORD-2025-003",
      customer: "Mohammed Ali",
      farm: "Harvest Moon",
      date: "April 22, 2025",
      status: "Pending",
      items: [
        {
          product: "Organic Vegetables Assortment",
          quantity: "1 box",
          price: 1200,
        },
      ],
      total: 1200,
      paymentStatus: "Pending",
      deliveryAddress: "Shop 7, Market Road, Rawalpindi",
      phone: "+92-321-5557777",
      notes: "Call before delivery",
    },
    {
      id: "ORD-2025-004",
      customer: "Ayesha Khan",
      farm: "Green Valley Farms",
      date: "April 23, 2025",
      status: "Delivered",
      items: [
        { product: "Organic Wheat", quantity: "20 kg", price: 1000 },
        { product: "Fresh Apples", quantity: "5 kg", price: 750 },
        { product: "Honey", quantity: "1 kg", price: 900 },
      ],
      total: 2650,
      paymentStatus: "Paid",
      deliveryAddress: "House 78, Sector F-7, Islamabad",
      phone: "+92-345-1112222",
      notes: "",
    },
  ]);

  // Filter states
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Handle status change
  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  // Filter orders based on status and search term
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.farm.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // View order details
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `Rs. ${amount.toLocaleString()}`;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-green-700 mb-6">
        Order Management
      </h1>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">
            Search orders
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search by order ID, customer or farm..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <label htmlFor="status-filter" className="sr-only">
            Filter by status
          </label>
          <select
            id="status-filter"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        
      </div>

      {/* Orders List */}
      <div className="mb-6 bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Farm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
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
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.farm}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => viewOrderDetails(order)}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        View
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No orders found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-gray-800">
                  Order Details
                </h2>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Order Information
                  </h3>
                  <div className="mt-2 border-t border-gray-200 pt-2">
                    <dl className="divide-y divide-gray-100">
                      <div className="py-2 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          Order ID
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {selectedOrder.id}
                        </dd>
                      </div>
                      <div className="py-2 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          Date
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {selectedOrder.date}
                        </dd>
                      </div>
                      <div className="py-2 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          Status
                        </dt>
                        <dd className="text-sm">
                          <select
                            className="border border-gray-300 rounded px-2 py-1"
                            value={selectedOrder.status}
                            onChange={(e) =>
                              handleStatusChange(
                                selectedOrder.id,
                                e.target.value
                              )
                            }
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </dd>
                      </div>
                      <div className="py-2 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          Payment Status
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {selectedOrder.paymentStatus}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Customer Information
                  </h3>
                  <div className="mt-2 border-t border-gray-200 pt-2">
                    <dl className="divide-y divide-gray-100">
                      <div className="py-2 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          Name
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {selectedOrder.customer}
                        </dd>
                      </div>
                      <div className="py-2 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          Phone
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {selectedOrder.phone}
                        </dd>
                      </div>
                      <div className="py-2 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          Farm
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {selectedOrder.farm}
                        </dd>
                      </div>
                      <div className="py-2 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          Delivery Address
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {selectedOrder.deliveryAddress}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500">
                  Order Items
                </h3>
                <div className="mt-2 border-t border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="py-4 text-sm text-gray-900">
                            {item.product}
                          </td>
                          <td className="py-4 text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="py-4 text-sm text-gray-900 text-right">
                            {formatCurrency(item.price)}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50">
                        <td
                          colSpan="2"
                          className="py-4 text-sm font-medium text-gray-900 text-right"
                        >
                          Total:
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900 text-right">
                          {formatCurrency(selectedOrder.total)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                  <div className="mt-2 border-t border-gray-200 pt-2">
                    <p className="text-sm text-gray-600">
                      {selectedOrder.notes}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-green-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-green-700">
                  Print Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">{filteredOrders.length}</span> of{" "}
          <span className="font-medium">{orders.length}</span> orders
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-gray-50">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
export default OrderManagement;
