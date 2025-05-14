import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Layouts
import LandingPage from "./pages/LandingPage"; // no sidebar/header
import AdminLayout from "./components/AdminLayout"; // sidebar + header for farmer
import BuyerLayout from "./components/BuyerLayout"; // sidebar + header for buyer
// Farmer Pages
import Dashboard from "./pages/Dashboard";
import WeatherAlerts from "./pages/WeatherAlerts";
import ProductManagement from "./pages/ProductManagement";
import OrderManagement from "./pages/OrderManagement";
import MarketInsight from "./pages/MarketInsights";
import ShoppingCart from "./pages/ShoppingCart";
// Buyer Pages
import BuyerDashboard from "./pages/BuyerDashboard";
import MarketPlace from "./pages/MarketPlace";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import DeliveryTracking from "./pages/DeliveryTracking";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page Route */}

        <Route path="/" element={<LandingPage />} />
        {/* Farmer Admin Routes */}
        <Route path="/farmer" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />{" "}
          {/* when /farmer, show Dashboard */}
          <Route path="weather" element={<WeatherAlerts />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="market" element={<MarketInsight />} />
          <Route path="cart" element={<ShoppingCart />} />
        </Route>
        {/* Buyer Routes */}

        <Route path="/buyer" element={<BuyerLayout />}>
          <Route index element={<BuyerDashboard />} />
          <Route path="marketplace" element={<MarketPlace />} />
          <Route path="productdetail" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orderdetail" element={<OrderDetail />} />
          <Route path="tracking" element={<DeliveryTracking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
