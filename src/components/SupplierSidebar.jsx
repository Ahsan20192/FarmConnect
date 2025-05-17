// import React from "react";
import { Link, useLocation } from "react-router-dom";

function SupplierSidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 flex-shrink-0 transition-transform duration-200 ease-in-out shadow-lg 
        bg-gradient-to-b from-green-700 to-green-600 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between items-center h-20 px-6 bg-green-800 border-b border-green-600">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-400 p-2 rounded-full">
              <svg
                className="w-6 h-6 text-green-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
            <Link
              to="buyer"
              className="text-xl font-bold text-white tracking-wider"
            >
              FarmConnect
            </Link>
          </div>
          <button
            className="lg:hidden text-white hover:text-yellow-400 transition-colors duration-150"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Close sidebar"
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

        {/* User info */}
        <div className="flex items-center px-6 py-4 border-b border-green-600">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-white font-medium">Welcome back</p>
            <p className="text-green-200 text-sm">Buyer Account</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-3 py-4 space-y-1">
          <p className="text-xs font-semibold text-green-200 uppercase tracking-wider px-3 mb-2">
            Main Menu
          </p>
          <NavItem to="" icon="grid" active={location.pathname === "/buyer"}>
            Dashboard
          </NavItem>
          <NavItem
            to="marketplace"
            icon="shopping-bag"
            active={location.pathname === "/marketplace"}
          >
            Marketplace
          </NavItem>
          <NavItem
            to="auctions"
            icon="gavel"
            active={location.pathname === "/auctions"}
          >
            Auctions
          </NavItem>
          <NavItem
            to="orders"
            icon="shopping-cart"
            active={location.pathname === "/orders"}
          >
            My Orders
          </NavItem>

          <p className="text-xs font-semibold text-green-200 uppercase tracking-wider px-3 mt-6 mb-2">
            Discover
          </p>
          <NavItem
            to="weather"
            icon="cloud-rain"
            active={location.pathname === "/weather"}
          >
            Weather Alerts
          </NavItem>
          <NavItem
            to="market"
            icon="trending-up"
            active={location.pathname === "/market"}
          >
            Market Insights
          </NavItem>
          <NavItem
            to="saved"
            icon="heart"
            active={location.pathname === "/saved"}
          >
            Saved Products
          </NavItem>
          <NavItem
            to="farmers"
            icon="users"
            active={location.pathname === "/farmers"}
          >
            Find Farmers
          </NavItem>

          <p className="text-xs font-semibold text-green-200 uppercase tracking-wider px-3 mt-6 mb-2">
            Account
          </p>
          <NavItem
            to="settings"
            icon="settings"
            active={location.pathname === "/settings"}
          >
            Settings
          </NavItem>
        </div>

        {/* Weather widget at bottom */}
        <div className="mt-auto px-4 py-3 bg-green-800 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg
                className="w-8 h-8 text-yellow-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
              <div>
                <p className="text-xl font-bold">28°C</p>
                <p className="text-xs text-green-200">Sunny</p>
              </div>
            </div>
            <p className="text-sm text-green-200">Today</p>
          </div>
        </div>
      </div>
    </>
  );
}

// Navigation Item component
function NavItem({ to, icon, active, children }) {
  const icons = {
    grid: (
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
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    ),
    "shopping-bag": (
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
          d="M5 8h14l1 12H4L5 8z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 8a4 4 0 01-8 0"
        />
      </svg>
    ),
    gavel: (
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
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    ),
    "shopping-cart": (
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
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    "cloud-rain": (
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
          d="M19 13.5a7.5 7.5 0 00-7.5-7.5h-1A7 7 0 014 12H3m12 1.5v2m0 4.5v-2m3-2h-1.5m-6 0H9m12 0h-1.5"
        />
      </svg>
    ),
    "trending-up": (
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
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
    heart: (
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
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    users: (
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
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    settings: (
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
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  };

  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-3 rounded-lg transition duration-150 ${
        active
          ? "bg-green-500 text-white font-medium shadow-md"
          : "text-green-100 hover:bg-green-600 hover:text-white"
      }`}
    >
      <div className={`flex-shrink-0 mr-3 ${active ? "text-yellow-400" : ""}`}>
        {icons[icon]}
      </div>
      <div className="flex-grow">{children}</div>
      {active && (
        <div className="w-1.5 h-8 bg-yellow-400 rounded-l-full -mr-3"></div>
      )}
    </Link>
  );
}

export default SupplierSidebar;
