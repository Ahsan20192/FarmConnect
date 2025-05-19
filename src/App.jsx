import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./App/store"; // ✅ Use named import if store.js uses named export

// Layouts
import LandingPage from "./pages/LandingPage";
import AdminLayout from "./components/AdminLayout";
import BuyerLayout from "./components/BuyerLayout";
import SupplierLayout from "./components/SupplierLayout";

//import FarmerProfile from "./pages/FarmerProfile";

// Farmer Pages
import Dashboard from "./pages/Dashboard";
import WeatherAlerts from "./pages/WeatherAlerts";
import ProductManagement from "./pages/ProductManagement";
import OrderManagement from "./pages/OrderManagement";
import MarketInsight from "./pages/MarketInsights";
import ShoppingCart from "./pages/ShoppingCart";
import FarmerProfile from "./pages/FarmerProfile";

// Buyer Pages
import BuyerDashboard from "./pages/BuyerDashboard";
import MarketPlace from "./pages/MarketPlace";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import FarmerProducts from "./pages/FarmerProducts";
import OrderDetail from "./pages/OrderDetail";
import DeliveryTracking from "./pages/DeliveryTracking";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Whishlist from "./pages/Whishlist";
import MyOrders from "./pages/MyOrders";
import SupplierDashboard from "./pages/SupplierDashboard";
import SupplierProfile from "./pages/SupplierProfile";
import BuyerProducts from "./pages/BuyerProducts";
import BuyerCart from "./pages/BuyerCart";
import BuyerProfile from "./pages/BuyerProfile";

export default function App() {
  return (
    <Provider store={store}>
      {" "}
      {/* ✅ FIXED */}
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/farmer" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />

            <Route path="weather" element={<WeatherAlerts />} />
            <Route path="farmerProducts" element={<FarmerProducts />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="wishlist" element={<Whishlist />} />
            <Route path="cart" element={<ShoppingCart />} />
            <Route path="myorders" element={<MyOrders />} />
            <Route path="farmerprofile" element={<FarmerProfile />} />
          </Route>
          <Route path="/buyer" element={<BuyerLayout />}>
            <Route index element={<BuyerDashboard />} />
            <Route path="products" element={<BuyerProducts />} />
            <Route path="cart" element={<BuyerCart />} />
            <Route path="myorders" element={<MyOrders />} />
            <Route path="wishlist" element={<Whishlist />} />
            <Route path="buyerprofile" element={<BuyerProfile />} />
          </Route>
          <Route path="/supplier" element={<SupplierLayout />}>
            <Route index element={<SupplierDashboard />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="weather" element={<WeatherAlerts />} />
            <Route path="profile" element={<SupplierProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
