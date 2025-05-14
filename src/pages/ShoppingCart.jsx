import { useState } from "react";

function ShoppingCart() {
  // Sample cart items data with working image URLs
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Basmati Rice",
      farm: "Green Valley Farms",
      price: 110,
      unit: "kg",
      quantity: 2,
      image:
        "https://media.istockphoto.com/id/519309790/photo/pile-of-raw-basmati-rice-with-a-spoon.webp?a=1&b=1&s=612x612&w=0&k=20&c=An_nlxA1YPxiehG4QUmfi-fQjED6p4jlcjfVM6P5Quw=",
    },
    {
      id: 3,
      name: "Organic Tomatoes",
      farm: "Sunrise Organic",
      price: 70,
      unit: "kg",
      quantity: 3,
      image:
        "https://plus.unsplash.com/premium_photo-1726138647192-5275bef08970?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dG9tYXRvZXN8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 5,
      name: "Fresh Eggs",
      farm: "Happy Hens Farm",
      price: 15,
      unit: "dozen",
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=500&auto=format&fit=crop&q=80",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate total
  const total = subtotal - discount;

  // Update item quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "farmer10") {
      setDiscount(Math.round(subtotal * 0.1));
    } else {
      setDiscount(0);
      alert("Invalid promo code");
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `₨ ${amount.toLocaleString()}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-green-700 mb-6">Your Cart</h1>

      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Cart Items ({cartItems.length})
                </h2>

                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="py-6 flex flex-wrap md:flex-nowrap"
                    >
                      <div className="w-full md:w-24 h-24 bg-gray-200 rounded-md overflow-hidden flex-shrink-0 mb-4 md:mb-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            <svg
                              className="w-12 h-12"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      <div className="md:ml-6 flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Farm: {item.farm}
                            </p>
                          </div>
                          <p className="text-lg font-medium text-green-600">
                            {formatCurrency(item.price)} / {item.unit}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center border border-gray-300 rounded">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 border-l border-r border-gray-300">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>

                          <div className="flex items-center">
                            <p className="font-medium text-gray-900 mr-4">
                              {formatCurrency(item.price * item.quantity)}
                            </p>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-medium">{formatCurrency(subtotal)}</p>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <p>Discount</p>
                      <p>- {formatCurrency(discount)}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200 flex justify-between font-medium text-lg">
                    <p>Total</p>
                    <p className="text-green-600">{formatCurrency(total)}</p>
                  </div>

                  <div className="pt-4 space-y-2">
                    <label
                      htmlFor="promo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Promo Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="promo"
                        className="flex-grow rounded-l-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <button
                        onClick={applyPromoCode}
                        className="bg-gray-200 px-4 rounded-r-md border border-gray-300 text-gray-700 hover:bg-gray-300"
                      >
                        Apply
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Try "FARMER10" for 10% off
                    </p>
                  </div>

                  <button
                    onClick={() => setShowCheckoutModal(true)}
                    className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-sm"
                  >
                    Proceed to Checkout
                  </button>

                  <button className="w-full py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-md shadow-sm hover:bg-gray-50">
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="flex justify-center mb-4">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Browse our marketplace to find fresh farm products
          </p>
          <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-sm">
            Shop Now
          </button>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Checkout
                </h2>
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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

              <form className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Shipping Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-md border-2 border-green-200 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                        placeholder="Your full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full rounded-md border-2 border-green-200 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                        placeholder="+92 XXX XXXXXXX"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Address
                      </label>
                      <textarea
                        className="w-full rounded-md border-2 border-green-200 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                        rows="3"
                        placeholder="Complete delivery address"
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Payment Method
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        id="cod"
                        name="payment"
                        type="radio"
                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                        defaultChecked
                      />
                      <label
                        htmlFor="cod"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Cash on Delivery
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="bank"
                        name="payment"
                        type="radio"
                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <label
                        htmlFor="bank"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Bank Transfer
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="jazzcash"
                        name="payment"
                        type="radio"
                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <label
                        htmlFor="jazzcash"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        JazzCash / EasyPaisa
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-lg font-medium">
                    <p>Total Amount</p>
                    <p className="text-green-600">{formatCurrency(total)}</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCheckoutModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ShoppingCart;
