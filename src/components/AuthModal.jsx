import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AuthModal = ({ isOpen, onClose }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState("Farmer");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
    imgURL: "",
  });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("auth"); // 'auth', 'otp'
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setErrorMessage("Email and password are required");
      return false;
    }
    if (!validateEmail(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }
    if (isSignup && (!formData.name || !formData.phone || !formData.address)) {
      setErrorMessage("All fields are required for signup");
      return false;
    }
    return true;
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setErrorMessage("");
    setLoading(true);

    try {
      if (role !== "Farmer") {
        setErrorMessage("Currently, only Farmer authentication is supported");
        return;
      }

      const apiBase = "https://agrofarm-vd8i.onrender.com/api/farmers";
      const endpoint = isSignup ? `${apiBase}/new` : `${apiBase}/login`;

      const body = isSignup
        ? {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            address: formData.address,
            imgURL: formData.imgURL || undefined,
          }
        : {
            email: formData.email,
            password: formData.password,
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Authentication failed");

      if (isSignup) {
        alert("✅ Registered successfully! Please verify your email.");
        setStep("otp");
      } else {
        localStorage.setItem("token", data.token);
        alert("✅ Logged in successfully!");
        onClose();
      }
    } catch (err) {
      setErrorMessage(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch(
        "https://agrofarm-vd8i.onrender.com/api/farmers/verify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, otp }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "OTP verification failed");

      alert("✅ Email verified! Please log in.");
      setStep("auth");
      setIsSignup(false);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch(
        "https://agrofarm-vd8i.onrender.com/api/farmers/resendOTP",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to resend OTP");

      alert("📨 OTP resent to your email.");
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white/20 border border-white/30 backdrop-blur-md p-6 rounded-2xl shadow-xl w-full max-w-md"
      >
        {/* Auth or OTP Title */}
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          {step === "otp"
            ? "Verify OTP"
            : isSignup
            ? "Sign Up as Farmer"
            : "Login as Farmer"}
        </h2>

        {/* Role Tabs */}
        {step === "auth" && (
          <div className="flex justify-center space-x-3 mb-5">
            {["Farmer", "Buyer", "Supplier"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  role === r
                    ? "bg-green-600 text-white"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        )}

        {/* OTP Verification Step */}
        {step === "otp" ? (
          <div className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              onClick={handleResendOTP}
              disabled={loading}
              className="w-full py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              {loading ? "Resending..." : "Resend OTP"}
            </button>
          </div>
        ) : (
          // Signup/Login Form
          <AnimatePresence mode="wait">
            <motion.form
              key={isSignup ? "signup" : "login"}
              onSubmit={handleAuth}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {isSignup && (
                <>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <input
                    type="url"
                    name="imgURL"
                    placeholder="Profile Image URL (optional)"
                    value={formData.imgURL}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </>
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
              />

              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-center p-2 bg-red-900/20 rounded-lg"
                >
                  {errorMessage}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg flex items-center justify-center ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } text-white transition-colors`}
              >
                {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
              </button>
            </motion.form>
          </AnimatePresence>
        )}

        {step === "auth" && (
          <p className="text-center text-white/80 mt-4">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setErrorMessage("");
              }}
              className="ml-2 text-green-300 hover:text-green-200 underline focus:outline-none"
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 rounded-lg bg-red-500/90 hover:bg-red-600 text-white transition-colors"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default AuthModal;

