import React, { useState, useEffect } from "react";
import { Search, Filter, MapPin, Star, ChevronDown } from "lucide-react";

const BuyerMarketplace = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [filters, setFilters] = useState({
    organic: false,
    certified: false,
    distance: 50,
    sortBy: "relevance",
  });

  useEffect(() => {
    // In a real app, these would be API calls
    setCategories([
      { id: "all", name: "All Products" },
      { id: "crops", name: "Crops" },
      { id: "seeds", name: "Seeds" },
      { id: "fertilizers", name: "Fertilizers" },
      { id: "pesticides", name: "Pesticides" },
      { id: "equipment", name: "Equipment" },
    ]);

    setProducts([
      {
        id: 1,
        name: "Organic Wheat",
        category: "crops",
        price: 45,
        unit: "kg",
        seller: "Punjab Organics",
        location: "Lahore",
        rating: 4.5,
        distance: 15,
        image: "/api/placeholder/200/150",
        organic: true,
        certified: true,
        available: 1000,
      },
      {
        id: 2,
        name: "NPK Fertilizer",
        category: "fertilizers",
        price: 1200,
        unit: "bag",
        seller: "Agri Solutions",
        location: "Faisalabad",
        rating: 4.0,
        distance: 30,
        image: "/api/placeholder/200/150",
        organic: false,
        certified: true,
        available: 500,
      },
      {
        id: 3,
        name: "Cotton Seeds",
        category: "seeds",
        price: 750,
        unit: "package",
        seller: "Sindh Seed Corp",
        location: "Karachi",
        rating: 4.7,
        distance: 120,
        image: "/api/placeholder/200/150",
        organic: false,
        certified: true,
        available: 200,
      },
      {
        id: 4,
        name: "Tractor - Small",
        category: "equipment",
        price: 450000,
        unit: "piece",
        seller: "Pak Agri Machinery",
        location: "Multan",
        rating: 4.2,
        distance: 60,
        image: "/api/placeholder/200/150",
        organic: false,
        certified: true,
        available: 5,
      },
      {
        id: 5,
        name: "Organic Rice",
        category: "crops",
        price: 120,
        unit: "kg",
        seller: "Kisan Organics",
        location: "Gujranwala",
        rating: 4.4,
        distance: 45,
        image: "/api/placeholder/200/150",
        organic: true,
        certified: true,
        available: 750,
      },
      {
        id: 6,
        name: "Natural Pesticide",
        category: "pesticides",
        price: 850,
        unit: "bottle",
        seller: "EcoAgri Solutions",
        location: "Islamabad",
        rating: 4.6,
        distance: 90,
        image: "/api/placeholder/200/150",
        organic: true,
        certified: true,
        available: 100,
      },
    ]);
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (selectedCategory !== "all" && product.category !== selectedCategory)
      return false;

    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1])
      return false;

    // Filter by organic
    if (filters.organic && !product.organic) return false;

    // Filter by certification
    if (filters.certified && !product.certified) return false;

    // Filter by distance
    if (product.distance > filters.distance) return false;

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "distance":
        return a.distance - b.distance;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Marketplace</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products by name, type, or seller..."
            className="w-full p-3 pl-10 border rounded-lg"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Filters</h2>
            <Filter size={18} />
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <input
                    type="radio"
                    id={category.id}
                    name="category"
                    checked={selectedCategory === category.id}
                    onChange={() => setSelectedCategory(category.id)}
                    className="mr-2"
                  />
                  <label htmlFor={category.id}>{category.name}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Price Range (Rs.)</h3>
            <div className="flex justify-between mb-2">
              <span>{priceRange[0]}</span>
              <span>{priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
              className="w-full"
            />
          </div>

          {/* Certification Filters */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Specifications</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="organic"
                  checked={filters.organic}
                  onChange={(e) =>
                    handleFilterChange("organic", e.target.checked)
                  }
                  className="mr-2"
                />
                <label htmlFor="organic">Organic Products</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="certified"
                  checked={filters.certified}
                  onChange={(e) =>
                    handleFilterChange("certified", e.target.checked)
                  }
                  className="mr-2"
                />
                <label htmlFor="certified">Certified Products</label>
              </div>
            </div>
          </div>

          {/* Distance Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">
              Maximum Distance: {filters.distance} km
            </h3>
            <input
              type="range"
              min="10"
              max="300"
              step="10"
              value={filters.distance}
              onChange={(e) =>
                handleFilterChange("distance", parseInt(e.target.value))
              }
              className="w-full"
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Apply Filters
          </button>
        </div>

        {/* Product Listing */}
        <div className="flex-1">
          {/* Sort Options */}
          <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow">
            <span className="text-gray-600">
              {sortedProducts.length} products found
            </span>
            <div className="flex items-center">
              <span className="mr-2">Sort by:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                className="border rounded p-1"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="distance">Distance</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedProducts.map((product) => (
              <a
                href={`/buyer/product/${product.id}`}
                key={product.id}
                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{product.name}</h3>
                    {product.organic && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Organic
                      </span>
                    )}
                  </div>
                  <p className="text-green-600 font-bold mt-1">
                    Rs. {product.price}/{product.unit}
                  </p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <MapPin size={14} className="mr-1" />
                    <span>
                      {product.location} ({product.distance} km)
                    </span>
                  </div>
                  <div className="flex items-center mt-1 text-sm">
                    <Star size={14} className="text-yellow-500 mr-1" />
                    <span>{product.rating}</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-500">{product.seller}</span>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    Available: {product.available} {product.unit}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Pagination */}
          {sortedProducts.length > 0 && (
            <div className="mt-8 flex justify-center">
              <div className="flex space-x-1">
                <button className="px-3 py-1 border rounded bg-gray-100">
                  Previous
                </button>
                <button className="px-3 py-1 border rounded bg-blue-600 text-white">
                  1
                </button>
                <button className="px-3 py-1 border rounded">2</button>
                <button className="px-3 py-1 border rounded">3</button>
                <button className="px-3 py-1 border rounded">...</button>
                <button className="px-3 py-1 border rounded">Next</button>
              </div>
            </div>
          )}

          {sortedProducts.length === 0 && (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <h3 className="font-medium text-lg mb-2">No products found</h3>
              <p className="text-gray-600">
                Try adjusting your filters or search for something else
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerMarketplace;
