import React, { useState, useEffect } from "react";
import {
  Star,
  MapPin,
  Truck,
  ShoppingCart,
  Heart,
  Shield,
  ArrowLeft,
  Share2,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showReviews, setShowReviews] = useState(false);
  const [showDescription, setShowDescription] = useState(true);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    // In a real app, fetch data from API based on ID in URL
    setTimeout(() => {
      setProduct({
        id: 1,
        name: "Premium Organic Wheat",
        category: "crops",
        price: 45,
        unit: "kg",
        minOrder: 10,
        available: 5000,
        seller: {
          name: "Punjab Organics",
          id: "seller-123",
          joinDate: "2023",
          rating: 4.8,
          verified: true,
        },
        location: "Lahore, Punjab",
        distance: 15,
        images: [
          "/api/placeholder/600/400",
          "/api/placeholder/600/400",
          "/api/placeholder/600/400",
        ],
        description:
          "Premium quality organic wheat grown using natural farming practices. No pesticides or chemical fertilizers used. This wheat is harvested from our farms in Punjab and is known for its high nutritional value and excellent taste.",
        harvestDate: "March 15, 2025",
        certification: "Organic Certified by Pakistan Organic Association",
        properties: {
          type: "Hard Red Wheat",
          moisture: "12%",
          protein: "14%",
          gluten: "High",
          cultivation: "Organic",
          season: "Rabi",
        },
        reviews: [
          {
            id: 1,
            user: "Ahmed K.",
            rating: 5,
            date: "March 20, 2025",
            comment:
              "Excellent quality wheat. Made great chapatis with good texture and taste.",
          },
          {
            id: 2,
            user: "Fatima S.",
            rating: 4,
            date: "March 15, 2025",
            comment: "Good quality product, delivery was prompt.",
          },
          {
            id: 3,
            user: "Mohammad R.",
            rating: 5,
            date: "March 10, 2025",
            comment:
              "Been buying from this seller for 2 years now. Consistently good quality.",
          },
        ],
        organic: true,
        certified: true,
        deliveryTime: "2-3 days",
        paymentOptions: ["Cash on Delivery", "Online Payment", "Bank Transfer"],
      });

      setSimilarProducts([
        {
          id: 2,
          name: "Organic Rice",
          price: 120,
          unit: "kg",
          image: "/api/placeholder/100/100",
          seller: "Kisan Organics",
        },
        {
          id: 3,
          name: "Organic Maize",
          price: 38,
          unit: "kg",
          image: "/api/placeholder/100/100",
          seller: "Punjab Farms",
        },
        {
          id: 4,
          name: "Red Wheat",
          price: 42,
          unit: "kg",
          image: "/api/placeholder/100/100",
          seller: "Sindh Growers",
        },
      ]);

      setLoading(false);
    }, 500);
  }, []);

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(product.minOrder, value);
    setQuantity(newQuantity);
  };

  const addToCart = () => {
    alert(`Added ${quantity} kg of ${product.name} to cart`);
    // In a real app, this would call an API to add to cart
  };

  const addToWishlist = () => {
    alert(`Added ${product.name} to wishlist`);
    // In a real app, this would call an API to add to wishlist
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto flex justify-center items-center h-64">
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Product not found</h1>
        <a
          href="/buyer/marketplace"
          className="flex items-center text-blue-600"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Marketplace
        </a>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <a
        href="/buyer/marketplace"
        className="flex items-center text-blue-600 mb-4"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to Marketplace
      </a>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-20 object-cover rounded cursor-pointer border hover:border-blue-500"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <div className="flex space-x-2">
                <button
                  onClick={addToWishlist}
                  className="p-2 rounded-full border hover:bg-gray-100"
                >
                  <Heart size={20} />
                </button>
                <button className="p-2 rounded-full border hover:bg-gray-100">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div className="flex items-center mt-2">
              <div className="flex items-center mr-3">
                <Star
                  size={16}
                  className="text-yellow-500 mr-1"
                  fill="#FBBF24"
                />
                <span className="font-medium">{product.seller.rating}</span>
                <span className="text-gray-500 ml-1">
                  ({product.reviews.length} reviews)
                </span>
              </div>
              {product.organic && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-2">
                  Organic
                </span>
              )}
              {product.certified && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  Certified
                </span>
              )}
            </div>

            <p className="text-3xl font-bold text-green-600 mt-4">
              Rs. {product.price}/{product.unit}
            </p>

            <div className="flex items-center mt-3 text-gray-600">
              <MapPin size={16} className="mr-1" />
              <span>
                {product.location} ({product.distance} km away)
              </span>
            </div>

            <div className="flex items-center mt-2 text-gray-600">
              <Truck size={16} className="mr-1" />
              <span>Delivery in {product.deliveryTime}</span>
            </div>

            <div className="mt-6">
              <div className="flex items-center mb-2">
                <span className="mr-4">Quantity ({product.unit}):</span>
                <div className="flex items-center border rounded">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-3 py-1 border-r"
                    disabled={quantity <= product.minOrder}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(parseInt(e.target.value))
                    }
                    className="w-16 text-center py-1"
                    min={product.minOrder}
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-3 py-1 border-l"
                  >
                    +
                  </button>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">
                Available: {product.available} {product.unit} | Minimum Order:{" "}
                {product.minOrder} {product.unit}
              </p>

              <div className="flex space-x-3">
                <button
                  onClick={addToCart}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </button>
                <a
                  href="/buyer/payment"
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 flex items-center justify-center"
                >
                  Buy Now
                </a>
              </div>

              <div className="mt-6 flex items-center text-gray-600">
                <Shield size={16} className="mr-2" />
                <span>
                  Secure payment options: {product.paymentOptions.join(", ")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Seller info */}
        <div className="px-6 py-4 border-t border-b">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Seller: {product.seller.name}</h3>
              <p className="text-sm text-gray-600">
                Member since {product.seller.joinDate}
              </p>
            </div>
            <a
              href={`/buyer/seller/${product.seller.id}`}
              className="text-blue-600 hover:underline"
            >
              View Profile
            </a>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-6">
          {/* Description section */}
          <div className="border rounded-md mb-4">
            <button
              onClick={() => setShowDescription(!showDescription)}
              className="flex justify-between items-center w-full p-4 font-medium"
            >
              Product Details
              {showDescription ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            {showDescription && (
              <div className="p-4 pt-0 border-t">
                <p className="mb-4">{product.description}</p>

                <h4 className="font-medium mb-2">Specifications</h4>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {Object.entries(product.properties).map(([key, value]) => (
                    <div key={key} className="flex">
                      <span className="font-medium w-24 mr-2">{key}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Harvest Date:</span>
                    <span className="ml-2">{product.harvestDate}</span>
                  </div>
                  {product.certification && (
                    <div>
                      <span className="font-medium">Certification:</span>
                      <span className="ml-2">{product.certification}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Reviews section */}
          <div className="border rounded-md">
            <button
              onClick={() => setShowReviews(!showReviews)}
              className="flex justify-between items-center w-full p-4 font-medium"
            >
              Reviews ({product.reviews.length})
              {showReviews ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            {showReviews && (
              <div className="p-4 pt-0 border-t">
                {product.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="py-4 border-b last:border-b-0"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-medium">{review.user}</span>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={
                                i < review.rating
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }
                              fill={i < review.rating ? "#FBBF24" : "none"}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            {review.date}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex items-center text-gray-500 text-sm">
                          <ThumbsUp size={14} className="mr-1" />
                          Helpful
                        </button>
                        <button className="flex items-center text-gray-500 text-sm">
                          <ThumbsDown size={14} className="mr-1" />
                          Not helpful
                        </button>
                      </div>
                    </div>
                    <p className="mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Similar Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {similarProducts.map((item) => (
            <a
              href={`/buyer/product/${item.id}`}
              key={item.id}
              className="bg-white rounded-lg shadow p-3 hover:shadow-md"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-24 object-cover rounded mb-2"
              />
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.seller}</p>
              <p className="font-medium text-green-600">
                Rs. {item.price}/{item.unit}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
