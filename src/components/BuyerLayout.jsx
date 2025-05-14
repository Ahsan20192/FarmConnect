import BuyerSidebar from "./BuyerSidebar";
import BuyerHeader from "./BuyerHeader";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function BuyerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <BuyerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <BuyerHeader setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
