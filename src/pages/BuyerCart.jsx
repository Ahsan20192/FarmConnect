import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function BuyerCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    fullName: "",
    phoneNumber: "",
    street: "",
    city: "",
    zipCode: "",
    notes: "",
    paymentMethod: "cod",
  });
  const [cartId, setCartId] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await placeOrder();
  };

  const placeOrder = async () => {
    if (!cartId) {
      toast.error("No cart found. Please add items to your cart first.");
      return;
    }

    try {
      const response = await fetch(
        "https://agrofarm-vd8i.onrender.com/api/v1/order/place-order",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartId: cartId, // Use the actual cart ID here
            paymentMethod: checkoutForm.paymentMethod,
            street: checkoutForm.street,
            city: checkoutForm.city,
            zipCode: checkoutForm.zipCode,
            phoneNumber: checkoutForm.phoneNumber,
            notes: checkoutForm.notes,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to place order");
      }

      const data = await response.json();
      toast.success("Order placed successfully!");
      setShowCheckoutModal(false);
      fetchCartItems();
      navigate("/buyer/myorders");
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error(err.message || "Failed to place order. Please try again.");
    }
  };

 

  const fetchCartItems = async () => {
    try {
      const response = await fetch(
        "https://agrofarm-vd8i.onrender.com/api/cart/my-cart",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }
      const data = await response.json();
      setCartItems(data.cart?.products || []);
      setCartId(data.cart?._id); // Store the cart ID
    } catch (err) {
      setError(err.message || "Failed to fetch cart items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    if (!cartId) {
      toast.error("No cart found");
      return;
    }

    try {
      const response = await fetch(
        `https://agrofarm-vd8i.onrender.com/api/cart/update`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartId, // Include cart ID
            productId: id,
            quantity: newQuantity,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log("error:", errorData.message);
        toast.error(errorData.message || "Failed to update quantity");
      }

      setCartItems(
        cartItems.map((item) =>
          item._id === id ? { ...item, quantity: newQuantity } : item
        )
      );

      const refreshResponse = await fetch(
        "https://agrofarm-vd8i.onrender.com/api/cart/my-cart",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        setCartItems(data.cart?.products || []);
        setCartId(data.cart?._id);
      }
    } catch (err) {
      toast.error(err || "Failed to update quantity:", err);
    }
  };

  const HandleClearCart = async () => {
    if (!cartId) {
      toast.error("No cart found to clear");
      return;
    }

    try {
      const response = await fetch(
        `https://agrofarm-vd8i.onrender.com/api/cart/clear/${cartId}`, // Use cart ID in the URL
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const mess = await response.json();
        toast.success(mess.message || "Cart is cleared successfully.");
        setCartId(null); // Reset cart ID after clearing
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to clear cart");
      }

      fetchCartItems();
    } catch (err) {
      console.error("Failed to clear cart:", err);
      toast.error(err.message || "Failed to clear cart. Please try again.");
    }
  };

  const removeItem = async (id) => {
    if (!cartId) {
      toast.error("No cart found");
      return;
    }

    try {
      const response = await fetch(
        `https://agrofarm-vd8i.onrender.com/api/cart/item/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cartId }), // Include cart ID in the body
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to remove item");
      }

      const refreshResponse = await fetch(
        "https://agrofarm-vd8i.onrender.com/api/cart/my-cart",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        setCartItems(data.cart?.products || []);
        setCartId(data.cart?._id);
      }
    } catch (err) {
      console.error("Failed to remove item:", err);
      toast.error(err.message || "Failed to remove item. Please try again.");
    }
  };

  const formatCurrency = (amount) => {
    return `₨ ${amount.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-green-800">
            Your Shopping Cart
          </h1>
          {cartItems.length > 0 && (
            <span className="ml-3 bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </span>
          )}
        </div>

        {cartItems.length > 0 && (
          <button
            onClick={HandleClearCart}
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition duration-200"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-grow">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="py-6 flex flex-col sm:flex-row gap-4"
                    >
                      <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.images?.[0] ? (
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
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

                      <div className="flex-grow">
                        <div className="flex flex-col h-full">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {item.name}
                              </h3>
                              <p className="mt-1 text-sm text-gray-600">
                                Farmer: {item.supplier?.userID}
                              </p>
                            </div>
                            <p className="text-lg font-semibold text-green-700">
                              {formatCurrency(item.price)} / unit
                            </p>
                          </div>

                          <div className="mt-auto pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.quantity - 1
                                  )
                                }
                                className="px-3 py-1 bg-gray-50 text-gray-600 hover:bg-gray-300 transition-colors"
                              >
                                -
                              </button>
                              <span className="px-4 py-1 bg-white border-x border-gray-200 text-center w-12">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.quantity + 1
                                  )
                                }
                                className="px-3 py-1 bg-gray-50 text-gray-600 hover:bg-gray-300 transition-colors"
                              >
                                +
                              </button>
                            </div>

                            <div className="flex items-center gap-4">
                              <p className="font-semibold text-gray-900">
                                {formatCurrency(item.price * item.quantity)}
                              </p>
                              <button
                                onClick={() => removeItem(item._id)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                                aria-label="Remove item"
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <p>Total</p>
                    <p className="text-green-700">{formatCurrency(total)}</p>
                  </div>

                  <button
                    onClick={() => setShowCheckoutModal(true)}
                    className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-colors"
                  >
                    Proceed to Checkout
                  </button>

                  <button
                    onClick={() => {
                      navigate("/buyer/products");
                    }}
                    className="w-full py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <svg
              className="w-20 h-20 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything to your cart yet
          </p>
          <button
            onClick={() => {
              navigate("/farmer/farmerProducts");
            }}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-colors"
          >
            Browse Products
          </button>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
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

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shipping Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Shipping Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={checkoutForm.fullName}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-2 border-green-100 shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5"
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
                        name="phoneNumber"
                        value={checkoutForm.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-2 border-green-100 shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5"
                        placeholder="+92 XXX XXXXXXX"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="street"
                        value={checkoutForm.street}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-2 border-green-100 shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5"
                        placeholder="Street address"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={checkoutForm.city}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-2 border-green-100 shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5"
                        placeholder="City"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={checkoutForm.zipCode}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-2 border-green-100 shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5"
                        placeholder="ZIP code"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Notes (Optional)
                      </label>
                      <textarea
                        name="notes"
                        value={checkoutForm.notes}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-2 border-green-100 shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5"
                        rows="3"
                        placeholder="Any special instructions for delivery"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Payment Method
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                      <input
                        id="cash-on-delivery"
                        name="paymentMethod"
                        type="radio"
                        value="cash-on-delivery"
                        checked={checkoutForm.paymentMethod === "cash-on-delivery"}
                        onChange={handleInputChange}
                        className="h-5 w-5 text-green-600 focus:ring-green-500"
                      />
                      <label
                        htmlFor="cod"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        <span className="font-semibold">Cash on Delivery</span>
                        <p className="text-gray-500 mt-1">
                          Pay when you receive your order
                        </p>
                      </label>
                    </div>

                   
                    <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                      <input
                        id="easypaisa"
                        name="paymentMethod"
                        type="radio"
                        value="easypaisa"
                        checked={checkoutForm.paymentMethod === "easypaisa"}
                        onChange={handleInputChange}
                        className="h-5 w-5 text-green-600 focus:ring-green-500"
                      />
                      <label
                        htmlFor="jazzcash"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        <span className="font-semibold">
                          EasyPaisa
                        </span>
                        <p className="text-gray-500 mt-1">
                          Mobile wallet payment
                        </p>
                      </label>
                    </div>
                    <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                      <input
                        id="jazzcash"
                        name="paymentMethod"
                        type="radio"
                        value="jazzcash"
                        checked={checkoutForm.paymentMethod === "jazzcash"}
                        onChange={handleInputChange}
                        className="h-5 w-5 text-green-600 focus:ring-green-500"
                      />
                      <label
                        htmlFor="jazzcash"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        <span className="font-semibold">
                          JazzCash
                        </span>
                        <p className="text-gray-500 mt-1">
                          Mobile wallet payment
                        </p>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-lg font-semibold">
                    <p>Total Amount</p>
                    <p className="text-green-700">{formatCurrency(total)}</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowCheckoutModal(false)}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium shadow-md transition-colors"
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

export default BuyerCart;
