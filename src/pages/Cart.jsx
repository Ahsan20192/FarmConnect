import React, { useState, useEffect } from "react";
import {
  Trash2,
  ArrowLeft,
  ShoppingBag,
  AlertCircle,
  Minus,
  Plus,
} from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // In a real app, fetch cart data from API
    setTimeout(() => {
      setCartItems([
        {
          id: 1,
          name: "Premium Organic Wheat",
          seller: "Punjab Organics",
          price: 45,
          unit: "kg",
          quantity: 20,
          available: 5000,
          minOrder: 10,
          image: "/api/placeholder/100/100",
          organic: true,
          deliveryFee: 150,
          estimatedDelivery: "Apr 26-27",
        },
        {
          id: 2,
          name: "NPK Fertilizer",
          seller: "Agri Solutions",
          price: 1200,
          unit: "bag",
          quantity: 2,
          available: 50,
          minOrder: 1,
          image: "/api/placeholder/100/100",
          organic: false,
          deliveryFee: 250,
          estimatedDelivery: "Apr 28-29",
        },
        {
          id: 3,
          name: "Cotton Seeds",
          seller: "Sindh Seed Corp",
          price: 750,
          unit: "package",
          quantity: 1,
          available: 200,
          minOrder: 1,
          image: "/api/placeholder/100/100",
          organic: false,
          deliveryFee: 150,
          estimatedDelivery: "Apr 27-28",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        // Ensure quantity is within limits
        newQuantity = Math.max(
          item.minOrder,
          Math.min(item.available, newQuantity)
        );
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "farm10") {
      setDiscount(calculateSubtotal() * 0.1);
      setPromoApplied(true);
    } else {
      alert("Invalid promo code");
      setPromoCode("");
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateDeliveryFee = () => {
    // Get the highest delivery fee among all items
    if (cartItems.length === 0) return 0;
    return Math.max(...cartItems.map((item) => item.deliveryFee));
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateDeliveryFee() - discount;
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto flex justify-center items-center h-64">
        <p>Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <ShoppingBag size={64} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
          <p className="mb-6 text-gray-600">
            Browse our marketplace to find quality agricultural products
          </p>
          <a
            href="/buyer/marketplace"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
          >
            Browse Products
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-medium">Cart Items ({cartItems.length})</h2>
              </div>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border-b flex flex-col sm:flex-row"
                >
                  <div className="flex mb-4 sm:mb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="ml-4">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Seller: {item.seller}
                      </p>
                      <p className="font-medium text-green-600">
                        Rs. {item.price}/{item.unit}
                      </p>
                      {item.organic && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded inline-block mt-1">
                          Organic
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center ml-auto sm:space-x-6">
                    <div className="flex items-center border rounded mb-3 sm:mb-0">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-2 py-1"
                        disabled={item.quantity <= item.minOrder}
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                        className="w-12 text-center py-1 border-l border-r"
                        min={item.minOrder}
                        max={item.available}
                      />
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 py-1"
                        disabled={item.quantity >= item.available}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        Rs. {item.price * item.quantity}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 flex items-center text-sm hover:underline"
                      >
                        <Trash2 size={14} className="mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-4 flex">
                <a
                  href="/buyer/marketplace"
                  className="flex items-center text-blue-600 hover:underline"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden sticky top-6">
              <div className="p-4 border-b">
                <h2 className="font-medium">Order Summary</h2>
              </div>

              <div className="p-4">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>Rs. {calculateSubtotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee:</span>
                    <span>Rs. {calculateDeliveryFee()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span>- Rs. {discount}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 font-bold flex justify-between">
                    <span>Total:</span>
                    <span>Rs. {calculateTotal()}</span>
                  </div>
                </div>

                {!promoApplied && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Promo Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 border rounded-l p-2"
                        placeholder="Enter code"
                      />
                      <button
                        onClick={applyPromoCode}
                        className="bg-gray-200 px-3 rounded-r hover:bg-gray-300"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}

                <div className="mb-4 text-sm">
                  <div className="flex items-start mb-2">
                    <AlertCircle
                      size={16}
                      className="mr-2 text-gray-600 mt-0.5"
                    />
                    <span>
                      Delivery time: {cartItems[0]?.estimatedDelivery}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <AlertCircle
                      size={16}
                      className="mr-2 text-gray-600 mt-0.5"
                    />
                    <span>Payment will be collected upon checkout</span>
                  </div>
                </div>

                <a
                  href="/buyer/payment"
                  className="block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700"
                >
                  Proceed to Checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
