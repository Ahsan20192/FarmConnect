import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

const FarmerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [otherFarmersProducts, setOtherFarmersProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    imgURL: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: "",
    phone: "",
  });
  const [resetPasswordForm, setResetPasswordForm] = useState({
    email: "",
    phone: "",
    otp: "",
    newPassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API_BASE = "https://agrofarm-vd8i.onrender.com/api/farmers";

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/me`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfile(data);
        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          imgURL: data.imgURL || "",
        });

        // Fetch farmer's products
        const productsResponse = await fetch(`${API_BASE}/farmer/${data._id}`);
        const productsData = await productsResponse.json();
        setProducts(productsData.products || []);

        // Fetch other farmers' products
        const otherProductsResponse = await fetch(
          "https://agrofarm-vd8i.onrender.com/api/products/productForFarmer"
        );
        const otherProductsData = await otherProductsResponse.json();
        setOtherFarmersProducts(otherProductsData.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/logout`, {
        method: "GET",
        credentials: "include",
      });
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      setError("Logout failed");
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setEditMode(false);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteProfile = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your profile? This cannot be undone."
      )
    ) {
      try {
        const response = await fetch(`${API_BASE}/delete`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Delete failed");
        }

        dispatch(logout());
        navigate("/");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/changepassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Password change failed");
      }

      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setError("");
      alert("Password changed successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(forgotPasswordForm),
      });

      if (!response.ok) {
        throw new Error("Failed to initiate password reset");
      }

      setError("");
      alert("Password reset instructions sent");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resetPasswordForm),
      });

      if (!response.ok) {
        throw new Error("Password reset failed");
      }

      setResetPasswordForm({
        email: "",
        phone: "",
        otp: "",
        newPassword: "",
      });
      setError("");
      alert("Password reset successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">Failed to load profile: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Farmer Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image */}
            <div className="w-full md:w-1/4 flex justify-center">
              <div className="relative">
                <img
                  src={profile.imgURL || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
                />
                {editMode && (
                  <input
                    type="url"
                    value={formData.imgURL}
                    onChange={(e) =>
                      setFormData({ ...formData, imgURL: e.target.value })
                    }
                    placeholder="Image URL"
                    className="mt-2 w-full p-2 border rounded"
                  />
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="w-full md:w-3/4">
              {editMode ? (
                <form onSubmit={handleUpdateProfile}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-2">{profile.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-600">Email: {profile.email}</p>
                      <p className="text-gray-600">Phone: {profile.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">
                        Address: {profile.address}
                      </p>
                      <p className="text-gray-600">
                        Member since:{" "}
                        {new Date(profile.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditMode(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={handleDeleteProfile}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete Account
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "profile"
                ? "border-b-2 border-green-500 text-green-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            My Profile
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "products"
                ? "border-b-2 border-green-500 text-green-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("products")}
          >
            My Products ({products.length})
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "market"
                ? "border-b-2 border-green-500 text-green-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("market")}
          >
            Marketplace ({otherFarmersProducts.length})
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "security"
                ? "border-b-2 border-green-500 text-green-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("security")}
          >
            Security
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === "profile" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Profile Information
              </h3>
              {/* Profile info displayed above */}
            </div>
          )}

          {activeTab === "products" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">My Products</h3>
              {products.length === 0 ? (
                <p className="text-gray-500">
                  You haven't added any products yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
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
                        <h4 className="font-bold">{product.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-green-600 font-bold">
                            Rs. {product.price}/{product.unit}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              product.isAvailable
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.isAvailable ? "Available" : "Sold Out"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Quantity: {product.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "market" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Marketplace</h3>
              {otherFarmersProducts.length === 0 ? (
                <p className="text-gray-500">
                  No products available from other farmers.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherFarmersProducts.map((product) => (
                    <div
                      key={product._id}
                      className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
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
                        <h4 className="font-bold">{product.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-green-600 font-bold">
                            Rs. {product.price}/{product.unit}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              product.isAvailable
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.isAvailable ? "Available" : "Sold Out"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Seller:{" "}
                          {product.upLoadedBy?.uploaderName || "Unknown"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-3">Change Password</h3>
                <form onSubmit={handleChangePassword}>
                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={passwordForm.oldPassword}
                        onChange={(e) =>
                          setPasswordForm({
                            ...passwordForm,
                            oldPassword: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) =>
                          setPasswordForm({
                            ...passwordForm,
                            newPassword: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) =>
                          setPasswordForm({
                            ...passwordForm,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Change Password
                  </button>
                </form>
              </div>

              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-3">Forgot Password</h3>
                <form onSubmit={handleForgotPassword}>
                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={forgotPasswordForm.email}
                        onChange={(e) =>
                          setForgotPasswordForm({
                            ...forgotPasswordForm,
                            email: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={forgotPasswordForm.phone}
                        onChange={(e) =>
                          setForgotPasswordForm({
                            ...forgotPasswordForm,
                            phone: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Request Reset
                  </button>
                </form>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Reset Password</h3>
                <form onSubmit={handleResetPassword}>
                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={resetPasswordForm.email}
                        onChange={(e) =>
                          setResetPasswordForm({
                            ...resetPasswordForm,
                            email: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={resetPasswordForm.phone}
                        onChange={(e) =>
                          setResetPasswordForm({
                            ...resetPasswordForm,
                            phone: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        OTP
                      </label>
                      <input
                        type="text"
                        value={resetPasswordForm.otp}
                        onChange={(e) =>
                          setResetPasswordForm({
                            ...resetPasswordForm,
                            otp: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={resetPasswordForm.newPassword}
                        onChange={(e) =>
                          setResetPasswordForm({
                            ...resetPasswordForm,
                            newPassword: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Reset Password
                  </button>
                </form>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;
