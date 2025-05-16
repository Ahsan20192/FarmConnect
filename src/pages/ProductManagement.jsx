import { useState, useEffect } from "react";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    unit: "kg",
    quantity: "",
    images: [],
  });
  const CLOUDINARY_UPLOAD_PRESET = "FarmConnect";
  const CLOUDINARY_CLOUD_NAME = "dn5edjpzg";

  const [imagePreview, setImagePreview] = useState(null);

  const API_BASE = "https://agrofarm-vd8i.onrender.com/api/products";

  // Fetch products using cookie-based auth
  const fetchMyProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_BASE}/my_product`, {
        method: "GET",
        credentials: "include", // important to include cookies
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message || "Error loading products");
    } finally {
      setLoading(false);
    }
  };

  // Add new product using cookie-based auth
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const productData = {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        images: imagePreview ? [imagePreview] : [],
      };

      const response = await fetch(`${API_BASE}/add`, {
        method: "POST",
        credentials: "include", // include cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product");
      }

      await fetchMyProducts();
      setShowAddForm(false);
      setFormData({
        name: "",
        description: "",
        price: "",
        unit: "kg",
        quantity: "",
        images: [],
      });
      setImagePreview(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      setLoading(true);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        setImagePreview(data.secure_url);
      } else {
        setError("Failed to upload image to Cloudinary");
      }
    } catch (err) {
      setError("Cloudinary upload error");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchMyProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Products</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          + Add Product
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button
            onClick={() => setError("")}
            className="float-right font-bold"
          >
            ×
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4">Loading products...</p>
        </div>
      ) : showAddForm ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          <form onSubmit={handleAddProduct}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  min="0"
                  step="0.01"
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Unit</label>
                <select
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="lb">lb</option>
                  <option value="piece">piece</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Quantity</label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  min="0"
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows="3"
                  required
                  className="w-full p-2 border rounded"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border rounded"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 h-32 w-32 object-cover rounded"
                  />
                )}
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {loading ? "Adding..." : "Add Product"}
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p className="text-gray-500 mb-4">
            You haven't added any products yet
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Your First Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 bg-gray-100 overflow-hidden">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {product.description}
                </p>
                <div className="mt-3">
                  <p className="text-green-700 font-bold">
                    Rs. {product.price.toLocaleString()}/{product.unit}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {product.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
