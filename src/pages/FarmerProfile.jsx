import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiEdit,
  FiSettings,
  FiCalendar,
  FiDollarSign,
  FiTruck,
  FiAward,
  FiCamera,
  FiX,
  FiLogOut,
  FiLock,
  FiTrash2,
} from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FarmerProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    imgURL: "",
    farmName: "",
    bio: "",
    joinedDate: "",
    farmSize: "",
    crops: [],
    certifications: [],
    rating: 0,
    reviews: 0,
    coverImage: "",
  });

  const [tempData, setTempData] = useState({ ...profileData });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://agrofarm-vd8i.onrender.com/api/farmers/me",
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const data = await response.json();
      console.log(data);
      setProfileData(data.user);
      setTempData(data.user);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://agrofarm-vd8i.onrender.com/api/farmers/logout",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://agrofarm-vd8i.onrender.com/api/farmers/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: tempData.name,
            email: tempData.email,
            phone: tempData.phone,
            address: tempData.address,
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update failed");
      }

      const updatedData = await response.json();
      setProfileData(updatedData);
      setTempData(updatedData);
      setIsEditing(false);
      toast.success("Profile updated successfully");
      await fetchProfileData();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      toast.error("All Fields are required");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://agrofarm-vd8i.onrender.com/api/farmers/changepassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword: passwordData.oldPassword,
            newPassword: passwordData.newPassword,
          }),
          credentials: "include",
        }
      );
      console.log(response.ok);
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        toast.error(errorData.message || "Password change failed");
        return;
      }

      toast.success("Password changed successfully");
      setIsChangingPassword(false);
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const isPasswordValid = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*]/.test(password)
    );
  };
  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://agrofarm-vd8i.onrender.com/api/farmers/delete",
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Account deletion failed");
      }

      toast.success("Account deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTempData({ ...profileData });
    setIsEditing(false);
    setIsChangingPassword(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "profile") {
        setTempData((prev) => ({ ...prev, imgURL: file }));
      } else {
        setTempData((prev) => ({ ...prev, coverImage: file }));
      }
    }
  };

  const stats = [
    {
      value: isEditing ? (
        <input
          type="text"
          name="farmSize"
          value={tempData.farmSize}
          onChange={handleChange}
          className="w-12 border-b border-gray-300 focus:outline-none focus:border-green-500 text-center"
        />
      ) : (
        profileData.farmSize
      ),
      label: "Acres",
      icon: <FiAward className="text-green-500" />,
    },
    {
      value: profileData.crops?.length || 0,
      label: "Crops",
      icon: <FiCalendar className="text-yellow-500" />,
    },
    {
      value: "₹2.4M",
      label: "Annual",
      icon: <FiDollarSign className="text-blue-500" />,
    },
    {
      value: "12",
      label: "Vehicles",
      icon: <FiTruck className="text-purple-500" />,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Harvested wheat crop",
      date: "2 days ago",
      status: "completed",
    },
    {
      id: 2,
      action: "Planted new rice seedlings",
      date: "1 week ago",
      status: "in-progress",
    },
    {
      id: 3,
      action: "Sold produce to local market",
      date: "2 weeks ago",
      status: "completed",
    },
    {
      id: 4,
      action: "Renewed organic certification",
      date: "3 weeks ago",
      status: "completed",
    },
  ];

  if (loading && !profileData.name) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-3xl font-bold text-gray-800"
          >
            Farmer Profile
          </motion.h1>
          <div className="flex gap-3">
            {!isEditing && !isChangingPassword && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <FiEdit className="text-green-600" />
                  <span className="text-gray-700">Edit Profile</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-100 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <FiLogOut className="text-red-600" />
                  <span className="text-gray-700">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Profile Card */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
        >
          <div className="relative">
            {/* Cover Photo */}
            <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500 relative overflow-hidden">
              {tempData.coverImage ? (
                typeof tempData.coverImage === "string" ? (
                  <img
                    src={tempData.coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(tempData.coverImage)}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">
                    Farm Landscape
                  </span>
                </div>
              )}
              {isEditing && (
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    onClick={() => coverInputRef.current.click()}
                    className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    <FiCamera className="text-gray-700" />
                  </button>
                  {tempData.coverImage && (
                    <button
                      onClick={() =>
                        setTempData((prev) => ({ ...prev, coverImage: null }))
                      }
                      className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    >
                      <FiX className="text-gray-700" />
                    </button>
                  )}
                  <input
                    type="file"
                    ref={coverInputRef}
                    onChange={(e) => handleImageChange(e, "cover")}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              )}
            </div>

            {/* Profile Picture */}
            <div className="absolute -bottom-16 left-8">
              <div className="h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg relative">
                {tempData.imgURL ? (
                  typeof tempData.imgURL === "string" ? (
                    <img
                      src={tempData.imgURL}
                      alt="Farmer"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(tempData.imgURL)}
                      alt="Farmer"
                      className="h-full w-full object-cover"
                    />
                  )
                ) : (
                  <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                {isEditing && (
                  <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors mb-1"
                    >
                      <FiCamera className="text-gray-700" />
                    </button>
                    {tempData.imgURL && (
                      <button
                        onClick={() =>
                          setTempData((prev) => ({ ...prev, imgURL: null }))
                        }
                        className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                      >
                        <FiX className="text-gray-700" />
                      </button>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => handleImageChange(e, "profile")}
                      className="hidden"
                      accept="image/*"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 px-6 pb-6">
            {isChangingPassword ? (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Change Password
                </h3>
                <div className="space-y-3">
                  {/* Old Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Old Password
                    </label>
                    <input
                      type="password"
                      name="oldPassword"
                      value={passwordData.oldPassword}
                      onChange={handlePasswordChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        passwordData.newPassword &&
                        !isPasswordValid(passwordData.newPassword)
                          ? "border-red-500 focus:ring-red-400"
                          : passwordData.newPassword
                          ? "border-green-500 focus:ring-green-400"
                          : "border-gray-300 focus:ring-green-400"
                      }`}
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        passwordData.confirmPassword &&
                        passwordData.newPassword !==
                          passwordData.confirmPassword
                          ? "border-red-500 focus:ring-red-400"
                          : passwordData.confirmPassword &&
                            passwordData.newPassword ===
                              passwordData.confirmPassword
                          ? "border-green-500 focus:ring-green-400"
                          : "border-gray-300 focus:ring-green-400"
                      }`}
                    />
                    {passwordData.confirmPassword &&
                      passwordData.newPassword !==
                        passwordData.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">
                          Passwords do not match
                        </p>
                      )}
                  </div>

                  {/* Password Requirements */}
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Password Requirements:
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li
                        className={`flex items-center ${
                          passwordData.newPassword?.length >= 8
                            ? "text-green-600"
                            : ""
                        }`}
                      >
                        {passwordData.newPassword?.length >= 8 ? (
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        At least 8 characters long
                      </li>
                      <li
                        className={`flex items-center ${
                          /[A-Z]/.test(passwordData.newPassword)
                            ? "text-green-600"
                            : ""
                        }`}
                      >
                        {/[A-Z]/.test(passwordData.newPassword) ? (
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        At least one uppercase letter
                      </li>
                      <li
                        className={`flex items-center ${
                          /[a-z]/.test(passwordData.newPassword)
                            ? "text-green-600"
                            : ""
                        }`}
                      >
                        {/[a-z]/.test(passwordData.newPassword) ? (
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        At least one lowercase letter
                      </li>
                      <li
                        className={`flex items-center ${
                          /[0-9]/.test(passwordData.newPassword)
                            ? "text-green-600"
                            : ""
                        }`}
                      >
                        {/[0-9]/.test(passwordData.newPassword) ? (
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        At least one number
                      </li>
                      <li
                        className={`flex items-center ${
                          /[!@#$%^&*]/.test(passwordData.newPassword)
                            ? "text-green-600"
                            : ""
                        }`}
                      >
                        {/[!@#$%^&*]/.test(passwordData.newPassword) ? (
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        At least one special character (!@#$%^&*)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={tempData.name}
                        onChange={handleChange}
                        className="text-2xl font-bold text-gray-800 mb-1 border-b border-gray-300 focus:outline-none focus:border-green-500"
                      />
                    ) : (
                      <h2 className="text-2xl font-bold text-gray-800">
                        {profileData.name}
                      </h2>
                    )}

                    {isEditing ? (
                      <input
                        type="text"
                        name="farmName"
                        value={tempData.farmName}
                        onChange={handleChange}
                        className="text-lg text-gray-600 mb-2 border-b border-gray-300 focus:outline-none focus:border-green-500"
                      />
                    ) : (
                      <p className="text-lg text-gray-600">
                        {profileData.farmName}
                      </p>
                    )}

                    <div className="flex items-center gap-1 text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          value={tempData.address}
                          onChange={handleChange}
                          className="text-gray-500 border-b border-gray-300 focus:outline-none focus:border-green-500"
                        />
                      ) : (
                        <span>{profileData.address}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-800 font-medium">Active</span>
                  </div>
                </div>

                {isEditing ? (
                  <textarea
                    name="bio"
                    value={tempData.bio}
                    onChange={handleChange}
                    className="mt-4 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    rows="3"
                  />
                ) : (
                  <p className="mt-4 text-gray-600">{profileData.bio}</p>
                )}

                {/* Contact Info */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={tempData.email}
                        onChange={handleChange}
                        className="flex-1 border-b border-gray-300 focus:outline-none focus:border-green-500"
                      />
                    ) : (
                      <span>{profileData.email}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-3 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={tempData.phone}
                        onChange={handleChange}
                        className="flex-1 border-b border-gray-300 focus:outline-none focus:border-green-500"
                      />
                    ) : (
                      <span>{profileData.phone}</span>
                    )}
                  </div>

                  {isEditing && (
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 p-3 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-purple-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="address"
                        value={tempData.address}
                        onChange={handleChange}
                        className="flex-1 border-b border-gray-300 focus:outline-none focus:border-green-500"
                        placeholder="Address"
                      />
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="mt-6 flex justify-end gap-3">
              {isEditing || isChangingPassword ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border  border-gray-500 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={
                      isChangingPassword ? handleChangePassword : handleSave
                    }
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800 transition-colors flex items-center gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : isChangingPassword ? (
                      "Change Password"
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <FiLock />
                    Change Password
                  </button>
                  <button
                    onClick={() => setIsDeleting(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <FiTrash2 />
                    Delete Account
                  </button>
                </>
              )}
            </div>

            {isDeleting && (
              <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <h4 className="text-lg font-medium text-red-800 mb-2">
                  Delete Account
                </h4>
                <p className="text-red-600 mb-4">
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsDeleting(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Deleting...
                      </>
                    ) : (
                      "Delete Account"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats and Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="lg:col-span-1 grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-opacity-20 bg-green-100 rounded-full">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                {["overview", "crops", "equipment", "market"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? "border-green-500 text-green-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Farm Overview
                  </h3>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      CROPS GROWN
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {profileData.crops?.map((crop, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        >
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      CERTIFICATIONS
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {profileData.certifications?.map((cert, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1"
                        >
                          <FiAward className="text-blue-600" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      RECENT ACTIVITIES
                    </h4>
                    <div className="space-y-3">
                      {recentActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-3"
                        >
                          <div
                            className={`mt-1 h-2 w-2 rounded-full ${
                              activity.status === "completed"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                            }`}
                          ></div>
                          <div className="flex-1">
                            <p className="text-gray-800">{activity.action}</p>
                            <p className="text-sm text-gray-500">
                              {activity.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "crops" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Crop Management
                  </h3>
                  <p className="text-gray-600">
                    Details about current and planned crops, planting schedules,
                    and harvest information.
                  </p>
                  {/* Crop calendar, progress bars, etc. would go here */}
                </motion.div>
              )}

              {activeTab === "equipment" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Farm Equipment
                  </h3>
                  <p className="text-gray-600">
                    Inventory of farming tools, machinery, and maintenance
                    schedules.
                  </p>
                  {/* Equipment list, maintenance logs would go here */}
                </motion.div>
              )}

              {activeTab === "market" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Market Connections
                  </h3>
                  <p className="text-gray-600">
                    Buyers, recent transactions, and market prices for your
                    crops.
                  </p>
                  {/* Market data, buyer contacts would go here */}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-800">
              Customer Reviews
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(profileData.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">
                {profileData.rating} ({profileData.reviews} reviews)
              </span>
            </div>
          </div>

          {/* Sample Reviews */}
          <div className="space-y-4">
            {[1, 2].map((review) => (
              <div
                key={review}
                className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                    <img
                      src={`https://randomuser.me/api/portraits/${
                        review % 2 === 0 ? "women" : "men"
                      }/${review + 20}.jpg`}
                      alt="Reviewer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Customer {review}
                    </p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < 4 ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-xs text-gray-500">2 weeks ago</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  {review === 1
                    ? "Excellent quality wheat, delivered on time. Will definitely buy again from this farmer!"
                    : "Very professional and organic produce. Highly recommended for bulk buyers."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FarmerProfile;
