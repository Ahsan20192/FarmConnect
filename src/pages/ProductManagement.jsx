import { useState } from "react";

function ProductManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  // Sample product data with image URLs
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Basmati Rice",
      category: "Grains",
      quantity: "500",
      unit: "kg",
      price: 110,
      image:
        "https://media.istockphoto.com/id/519309790/photo/pile-of-raw-basmati-rice-with-a-spoon.webp?a=1&b=1&s=612x612&w=0&k=20&c=An_nlxA1YPxiehG4QUmfi-fQjED6p4jlcjfVM6P5Quw=",
      description: "Premium quality basmati rice",
      organic: true,
    },
    {
      id: 2,
      name: "Wheat",
      category: "Grains",
      quantity: "1200",
      unit: "kg",
      price: 45,
      image:
        "https://www.shutterstock.com/image-photo/barley-grain-on-wooden-background-260nw-2160377105.jpg",
      description: "Great quality of wheat",
      organic: false,
    },
    {
      id: 3,
      name: "Organic Tomatoes",
      category: "Vegetables",
      quantity: "150",
      unit: "kg",
      price: 70,
      image:
        "https://plus.unsplash.com/premium_photo-1726138647192-5275bef08970?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dG9tYXRvZXN8ZW58MHx8MHx8fDA%3D",
      description: "Fresh organic tomatoes from local farms",
      organic: true,
    },
  ]);

  // Handle image preview when file is selected
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // Add or Edit product handler
  const handleProductSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const imageFile = formData.get("image");

    // For demo purposes, we'll use local URLs
    // In a real app, you would upload to a server here
    let imageUrl = editProduct?.image || "";

    if (imageFile instanceof File && imageFile.size > 0) {
      imageUrl = URL.createObjectURL(imageFile);
    }

    const product = {
      name: formData.get("name"),
      category: formData.get("category"),
      quantity: formData.get("quantity"),
      unit: formData.get("unit"),
      price: formData.get("price"),
      description: formData.get("description"),
      organic: formData.get("organic") === "on",
      image: imageUrl,
    };

    if (editProduct) {
      // Edit existing product
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === editProduct.id ? { ...p, ...product } : p
        )
      );
    } else {
      // Add new product
      setProducts((prevProducts) => [
        ...prevProducts,
        {
          ...product,
          id:
            prevProducts.length > 0
              ? Math.max(...prevProducts.map((p) => p.id)) + 1
              : 1,
        },
      ]);
    }

    setShowAddForm(false);
    setEditProduct(null);
    setImagePreview(null);
  };

  // Delete product handler
  const handleDeleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
  };

  // Reset form when closing
  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditProduct(null);
    setImagePreview(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-green-700">My Products</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add New Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg"
          >
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              <div className="absolute top-2 right-2">
                {product.organic && (
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    Organic
                  </span>
                )}
              </div>
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
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

            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <div className="text-lg font-bold text-green-600">
                  ₨ {product.price}/{product.unit}
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-1">{product.category}</p>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {product.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500">Quantity:</span>
                  <span className="ml-1 text-sm font-medium">
                    {product.quantity} {product.unit}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => {
                    setEditProduct(product);
                    setShowAddForm(true);
                  }}
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 py-2 rounded transition-colors duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="w-10 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded flex items-center justify-center transition-colors duration-200"
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
        ))}
      </div>

      {/* Add/Edit Product Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={handleCloseForm}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
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

              <form onSubmit={handleProductSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={editProduct ? editProduct.name : ""}
                      className="w-full rounded-lg border-2 border-green-200 shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5"
                      placeholder="e.g. Basmati Rice"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      defaultValue={editProduct ? editProduct.category : ""}
                      className="w-full rounded-lg border-2 border-green-200 shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Grains">Grains</option>
                      <option value="Vegetables">Vegetables</option>
                      <option value="Fruits">Fruits</option>
                      <option value="Dairy">Dairy</option>
                      <option value="Spices">Spices</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      name="quantity"
                      type="number"
                      defaultValue={editProduct ? editProduct.quantity : ""}
                      className="w-full rounded-lg border-2 border-green-200 shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5"
                      min="1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit
                    </label>
                    <select
                      name="unit"
                      defaultValue={editProduct ? editProduct.unit : "kg"}
                      className="w-full rounded-lg border-2 border-green-200 shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5"
                      required
                    >
                      <option value="kg">Kilograms (kg)</option>
                      <option value="g">Grams (g)</option>
                      <option value="ton">Tons</option>
                      <option value="dozen">Dozen</option>
                      <option value="piece">Piece</option>
                      <option value="liter">Liter</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price per Unit (₨)
                    </label>
                    <input
                      name="price"
                      type="number"
                      step="0.01"
                      defaultValue={editProduct ? editProduct.price : ""}
                      className="w-full rounded-lg border-2 border-green-200 shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5"
                      min="1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Organic
                    </label>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="organic"
                          defaultChecked={editProduct?.organic}
                          className="rounded border-2 border-green-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500 h-5 w-5"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Organic Product
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Image
                    </label>
                    <div className="mt-1 flex items-center">
                      {imagePreview || editProduct?.image ? (
                        <img
                          src={imagePreview || editProduct.image}
                          alt="Preview"
                          className="h-20 w-20 object-cover rounded-lg mr-4 border-2 border-green-200"
                        />
                      ) : (
                        <span className="h-20 w-20 bg-gray-200 rounded-lg flex items-center justify-center mr-4 border-2 border-dashed border-gray-300">
                          <svg
                            className="w-8 h-8 text-gray-500"
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
                        </span>
                      )}
                      <div>
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-lg file:border-0
                            file:text-sm file:font-semibold
                            file:bg-green-50 file:text-green-700
                            hover:file:bg-green-100 transition-colors"
                          onChange={handleImageChange}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, JPEG up to 2MB
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      defaultValue={editProduct ? editProduct.description : ""}
                      className="w-full rounded-lg border-2 border-green-200 shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5"
                      rows="3"
                      placeholder="Describe your product, its quality, variety, etc."
                    ></textarea>
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    {editProduct ? "Update Product" : "Add Product"}
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

export default ProductManagement;
