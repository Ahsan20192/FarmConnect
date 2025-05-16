import React from "react";
function Dashboard() {
  function DashboardCard({ title, value, subtitle, icon, bgColor, textColor }) {
    return (
      <div
        className={`${bgColor} ${textColor} rounded-lg shadow-xl transform transition duration-300 ease-in-out hover:shadow-2xl hover:scale-105 p-6`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium opacity-80">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {subtitle && <p className="text-xs mt-1 opacity-70">{subtitle}</p>}
          </div>
          <div className="ml-4">{icon}</div>
        </div>
      </div>
    );
  }
  return (
    <div className=" m-0 p-0">
      <h1 className="text-2xl font-semibold text-green-700 mb-6">
        Farmer Dashboard
      </h1>

      {/* Dashboard Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6  mb-6">
        {/* Active Orders */}
        <DashboardCard
          title="Active Orders"
          value="12"
          icon={
            <svg
              className="w-8 h-8 text-green-600 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          }
          bgColor="bg-green-50"
          textColor="text-green-700"
        />

        {/* Products Listed */}
        <DashboardCard
          title="Products Listed"
          value="24"
          icon={
            <svg
              className="w-8 h-8 text-blue-600"
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
          }
          bgColor="bg-blue-50"
          textColor="text-blue-700"
        />

        {/* Revenue This Month */}
        <DashboardCard
          title="Revenue (Month)"
          value="₨ 45,320"
          icon={
            <svg
              className="w-8 h-8 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          bgColor="bg-yellow-50"
          textColor="text-yellow-700"
        />

        {/* Weather Status */}
        <DashboardCard
          title="Weather Status"
          value="Clear"
          subtitle="28°C - Islamabad"
          icon={
            <svg
              className="w-8 h-8 text-sky-600"
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
          }
          bgColor="bg-sky-50"
          textColor="text-sky-700"
        />
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Orders
            </h2>
            <a
              href="#"
              className="text-green-600 hover:text-green-800 text-sm font-semibold"
            >
              View All
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b-2 border-b-gray-300">
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Buyer</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="text-gray-700 border-b-2 border-b-gray-300">
                  <td className="px-4 py-3">#ORD-2458</td>
                  <td className="px-4 py-3">Basmati Rice (50kg)</td>
                  <td className="px-4 py-3">Malik Foods</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                      Confirmed
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold">₨ 4,500</td>
                </tr>
                <tr className="text-gray-700 border-b-2 border-b-gray-300">
                  <td className="px-4 py-3">#ORD-2459</td>
                  <td className="px-4 py-3">Wheat (100kg)</td>
                  <td className="px-4 py-3">Ali Flour Mills</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">
                      Pending
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold">₨ 6,200</td>
                </tr>
                <tr className="text-gray-700 border-b-2 border-b-gray-300">
                  <td className="px-4 py-3">#ORD-2460</td>
                  <td className="px-4 py-3">Organic Tomatoes (25kg)</td>
                  <td className="px-4 py-3">Fresh Market</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs font-semibold leading-tight text-blue-700 bg-blue-100 rounded-full">
                      Shipping
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold">₨ 1,750</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Weather Forecast */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Weather Forecast
            </h2>
            <span className="text-sm text-gray-500">Islamabad Region</span>
          </div>
          <div className="space-y-4">
            {/* Today */}
            <div className="flex items-center justify-between bg-sky-50 p-3 rounded-lg">
              <div className="flex items-center space-x-3">
                <svg
                  className="w-10 h-10 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <div className="font-medium">Today</div>
                  <div className="text-sm text-gray-500">Sunny</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold">28°C</div>
                <div className="text-sm text-gray-500">13°C</div>
              </div>
            </div>

            {/* Tomorrow */}
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center space-x-3">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                </svg>
                <div>
                  <div className="font-medium">Tomorrow</div>
                  <div className="text-sm text-gray-500">Partly Cloudy</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold">25°C</div>
                <div className="text-sm text-gray-500">12°C</div>
              </div>
            </div>

            {/* Weather Alert */}
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Light rain expected on Thursday. Consider covering sensitive
                    crops.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Future Section: Market Insights (you can add price trends or crop updates here if needed) */}
    </div>
  );
}
export default Dashboard;
