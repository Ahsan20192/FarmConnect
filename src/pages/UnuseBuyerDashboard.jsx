// src/pages/BuyerDashboard.jsx
import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Bell, Package, Zap, BarChart2, Calendar, DollarSign, Star, Users, Clock, TrendingUp, Heart, Truck, AlertTriangle } from 'lucide-react';

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    productType: 'all',
    organic: false,
    certified: false,
    priceRange: [0, 5000],
    location: ''
  });
  const [sortBy, setSortBy] = useState('price');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    pendingOrders: 2,
    totalSpent: 12500,
    savedProducts: 8,
    upcomingDeliveries: 1,
    activeBids: 3,
    cartValue: 1450
  });

  // Mock data
  useEffect(() => {
    // Simulate fetching products from API
    const mockProducts = [
      { id: 1, name: 'Organic Wheat', type: 'grain', price: 850, quantity: '50kg', farmer: 'Ahmad Farms', organic: true, certified: true, location: 'Punjab', rating: 4.5, harvestDate: '2025-04-10' },
      { id: 2, name: 'Rice Basmati', type: 'grain', price: 1200, quantity: '25kg', farmer: 'Malik Farms', organic: false, certified: true, location: 'Sindh', rating: 4.2, harvestDate: '2025-04-05' },
      { id: 3, name: 'Tomatoes', type: 'vegetable', price: 300, quantity: '10kg', farmer: 'Hassan Farms', organic: true, certified: false, location: 'Punjab', rating: 3.8, harvestDate: '2025-04-15' },
      { id: 4, name: 'Cotton', type: 'fiber', price: 2500, quantity: '100kg', farmer: 'Ali Farms', organic: false, certified: true, location: 'Sindh', rating: 4.7, harvestDate: '2025-03-20' },
      { id: 5, name: 'Potatoes', type: 'vegetable', price: 450, quantity: '15kg', farmer: 'Fatima Farms', organic: false, certified: false, location: 'KPK', rating: 4.0, harvestDate: '2025-04-12' },
      { id: 6, name: 'Mangoes', type: 'fruit', price: 1800, quantity: '20kg', farmer: 'Sindh Orchards', organic: true, certified: true, location: 'Sindh', rating: 4.9, harvestDate: '2025-05-01' }
    ];

    const mockAuctions = [
      { id: 101, name: 'Premium Dates', currentBid: 3500, endTime: '2025-04-25 18:00', farmer: 'Balochistan Farms', bidCount: 8 },
      { id: 102, name: 'Organic Honey', currentBid: 2800, endTime: '2025-04-26 14:00', farmer: 'Mountain Apiaries', bidCount: 12 },
      { id: 103, name: 'Red Chilies', currentBid: 1200, endTime: '2025-04-24 20:00', farmer: 'Spice Gardens', bidCount: 5 }
    ];

    const mockOrders = [
      { id: 201, items: ['Organic Wheat', 'Tomatoes'], status: 'Processing', date: '2025-04-20', total: 1150 },
      { id: 202, items: ['Cotton'], status: 'Shipped', date: '2025-04-18', total: 2500, trackingId: 'TRK12345' },
      { id: 203, items: ['Rice Basmati', 'Potatoes'], status: 'Delivered', date: '2025-04-15', total: 1650 }
    ];

    const mockNotifications = [
      { id: 301, message: 'Your order #202 has been shipped!', time: '2 hours ago', read: false },
      { id: 302, message: 'Price drop alert: Tomatoes now at Rs.300/10kg', time: '5 hours ago', read: false },
      { id: 303, message: 'You ve been outbid on Premium Dates', time: '1 day ago', read: true },
      { id: 304, message: 'Order #203 has been delivered', time: '2 days ago', read: true }
    ];

    setProducts(mockProducts);
    setAuctions(mockAuctions);
    setOrders(mockOrders);
    setNotifications(mockNotifications);
  }, []);

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleSearch = (e) => {
    e.preventDefault();
    // Would connect to search API in a real implementation
    console.log("Searching for:", searchQuery, "with filters:", filterOptions);
  };

  const placeBid = (auctionId, bidAmount) => {
    // Would connect to auction API in a real implementation
    console.log("Placing bid of", bidAmount, "on auction", auctionId);
  };

  // Get recent weather alerts
  const weatherAlerts = [
    { id: 1, type: 'Heavy Rain', region: 'Punjab', impact: 'May affect vegetable prices', date: '2025-04-25' },
    { id: 2, type: 'Drought Warning', region: 'Sindh', impact: 'May affect grain supply', date: '2025-04-28' }
  ];

  // Market trends data
  const marketTrends = [
    { product: 'Wheat', trend: 'rising', change: '+5%' },
    { product: 'Rice', trend: 'stable', change: '0%' },
    { product: 'Cotton', trend: 'falling', change: '-3%' },
    { product: 'Vegetables', trend: 'rising', change: '+8%' }
  ];

  // Recommended products based on user behavior (FR14)
  const recommendedProducts = [
    { id: 7, name: 'Fresh Apples', farmer: 'Northern Orchards', price: 450, rating: 4.8 },
    { id: 8, name: 'Organic Milk', farmer: 'Green Valley Dairy', price: 180, rating: 4.6 },
    { id: 9, name: 'Brown Rice', farmer: 'Healthy Farms', price: 950, rating: 4.3 }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Zap size={24} />
            <h1 className="text-xl font-bold">FarmConnect</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell size={20} />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </div>
            <div className="relative">
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">B</span>
              </div>
              <span>Buyer</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto flex overflow-x-auto">
          <button 
            className={`px-4 py-3 font-medium ${activeTab === 'dashboard' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`px-4 py-3 font-medium ${activeTab === 'marketplace' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'}`}
            onClick={() => setActiveTab('marketplace')}
          >
            Marketplace
          </button>
          <button 
            className={`px-4 py-3 font-medium ${activeTab === 'auctions' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'}`}
            onClick={() => setActiveTab('auctions')}
          >
            Auctions
          </button>
          <button 
            className={`px-4 py-3 font-medium ${activeTab === 'orders' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'}`}
            onClick={() => setActiveTab('orders')}
          >
            My Orders
          </button>
          <button 
            className={`px-4 py-3 font-medium ${activeTab === 'notifications' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto flex-grow p-4">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Buyer Dashboard</h2>
              
              {/* Dashboard Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-800 mr-4">
                    <Package size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pending Orders</p>
                    <p className="font-semibold text-lg">{dashboardStats.pendingOrders}</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-800 mr-4">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Spent</p>
                    <p className="font-semibold text-lg">Rs. {dashboardStats.totalSpent}</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-800 mr-4">
                    <Heart size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Saved Products</p>
                    <p className="font-semibold text-lg">{dashboardStats.savedProducts}</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-800 mr-4">
                    <Truck size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Upcoming Deliveries</p>
                    <p className="font-semibold text-lg">{dashboardStats.upcomingDeliveries}</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                  <div className="p-3 rounded-full bg-red-100 text-red-800 mr-4">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Active Bids</p>
                    <p className="font-semibold text-lg">{dashboardStats.activeBids}</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                  <div className="p-3 rounded-full bg-indigo-100 text-indigo-800 mr-4">
                    <ShoppingCart size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Cart Value</p>
                    <p className="font-semibold text-lg">Rs. {dashboardStats.cartValue}</p>
                  </div>
                </div>
              </div>
              
              {/* Dashboard Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Access Panel */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="font-semibold text-lg mb-3">Quick Access</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      className="flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition"
                      onClick={() => setActiveTab('marketplace')}
                    >
                      <Search size={24} className="text-green-600 mb-2" />
                      <span className="text-sm">Browse Products</span>
                    </button>
                    
                    <button 
                      className="flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition"
                      onClick={() => setActiveTab('orders')}
                    >
                      <Package size={24} className="text-green-600 mb-2" />
                      <span className="text-sm">Track Orders</span>
                    </button>
                    
                    <button 
                      className="flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition"
                      onClick={() => setActiveTab('auctions')}
                    >
                      <TrendingUp size={24} className="text-green-600 mb-2" />
                      <span className="text-sm">Join Auctions</span>
                    </button>
                    
                    <button 
                      className="flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition"
                    >
                      <Users size={24} className="text-green-600 mb-2" />
                      <span className="text-sm">Find Farmers</span>
                    </button>
                  </div>
                </div>
                
                {/* Latest Notifications */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-lg">Latest Notifications</h3>
                    <button 
                      className="text-sm text-green-700"
                      onClick={() => setActiveTab('notifications')}
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-2">
                    {notifications.slice(0, 3).map(notification => (
                      <div 
                        key={notification.id} 
                        className={`p-3 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}`}
                      >
                        <p className={`${notification.read ? 'text-gray-700' : 'font-medium'} text-sm`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Weather Alerts */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="font-semibold text-lg mb-3">Weather Alerts</h3>
                  <div className="space-y-3">
                    {weatherAlerts.map(alert => (
                      <div key={alert.id} className="flex p-3 bg-yellow-50 rounded-lg">
                        <div className="mr-3">
                          <AlertTriangle size={20} className="text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-medium">{alert.type} in {alert.region}</p>
                          <p className="text-sm text-gray-600">{alert.impact}</p>
                          <p className="text-xs text-gray-500 mt-1">Expected: {alert.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Market Trends */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="font-semibold text-lg mb-3">Market Trends</h3>
                  <div className="space-y-2">
                    {marketTrends.map((item, index) => (
                      <div key={index} className="flex justify-between p-2 border-b">
                        <span className="font-medium">{item.product}</span>
                        <div className={`flex items-center ${
                          item.trend === 'rising' ? 'text-green-600' : 
                          item.trend === 'falling' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {item.trend === 'rising' && <TrendingUp size={16} className="mr-1" />}
                          {item.trend === 'falling' && <TrendingUp size={16} className="mr-1 transform rotate-180" />}
                          {item.trend === 'stable' && <span className="w-4 h-px bg-current mr-1" />}
                          {item.change}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Recommended Products */}
                <div className="bg-white rounded-lg shadow-md p-4 lg:col-span-2">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-lg">Recommended For You</h3>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      AI Powered
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recommendedProducts.map(product => (
                      <div key={product.id} className="border rounded-lg p-3 flex flex-col justify-between">
                        <div>
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-gray-600">{product.farmer}</p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center">
                            <Star size={14} className="text-yellow-500 fill-current" />
                            <span className="text-sm ml-1">{product.rating}</span>
                          </div>
                          <span className="font-medium">Rs. {product.price}</span>
                        </div>
                        <button 
                          className="mt-2 w-full bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 text-sm"
                        >
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Marketplace Tab */}
        {activeTab === 'marketplace' && (
          <div>
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h2 className="text-lg font-semibold mb-4">Find Agricultural Products</h2>
              <form onSubmit={handleSearch}>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-grow relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full p-2 border rounded-md pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search size={18} className="absolute left-2 top-2.5 text-gray-400" />
                  </div>
                  <select 
                    className="p-2 border rounded-md"
                    value={filterOptions.productType}
                    onChange={(e) => setFilterOptions({...filterOptions, productType: e.target.value})}
                  >
                    <option value="all">All Products</option>
                    <option value="grain">Grains</option>
                    <option value="vegetable">Vegetables</option>
                    <option value="fruit">Fruits</option>
                    <option value="fiber">Fibers</option>
                  </select>
                  <select 
                    className="p-2 border rounded-md"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="price">Sort by Price</option>
                    <option value="rating">Sort by Rating</option>
                    <option value="distance">Sort by Distance</option>
                  </select>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-2"
                      checked={filterOptions.organic}
                      onChange={(e) => setFilterOptions({...filterOptions, organic: e.target.checked})}
                    />
                    Organic Only
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-2"
                      checked={filterOptions.certified}
                      onChange={(e) => setFilterOptions({...filterOptions, certified: e.target.checked})}
                    />
                    Certified Only
                  </label>
                  <div className="flex items-center">
                    <input 
                      type="text" 
                      placeholder="Location"
                      className="p-1 border rounded-md w-24"
                      value={filterOptions.location}
                      onChange={(e) => setFilterOptions({...filterOptions, location: e.target.value})}
                    />
                  </div>
                </div>
                
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                  Search
                </button>
              </form>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-40 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">[Product Image]</span>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <div className="flex items-center">
                        <Star size={16} className="text-yellow-500 fill-current" />
                        <span className="ml-1">{product.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{product.farmer}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-medium">Rs. {product.price} / {product.quantity}</p>
                      <div className="text-xs px-2 py-1 rounded-full bg-gray-100">
                        {product.organic ? 'Organic' : 'Non-Organic'}
                      </div>
                    </div>
                    <div className="flex items-center text-sm mt-2">
                      <Calendar size={14} className="mr-1" />
                      <span>Harvest: {product.harvestDate}</span>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-gray-500">Location: {product.location}</span>
                      <button 
                        className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 text-sm"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Auctions Tab */}
        {activeTab === 'auctions' && (
          <div>
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h2 className="text-lg font-semibold mb-2">Live Auctions</h2>
              <p className="text-gray-600 mb-4">Place bids on premium agricultural products</p>
              
              <div className="space-y-4">
                {auctions.map(auction => (
                  <div key={auction.id} className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{auction.name}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                        {auction.bidCount} bids
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{auction.farmer}</p>
                    <div className="mt-3 flex justify-between items-center">
                      <div>
                        <p className="text-sm">Current Bid:</p>
                        <p className="font-semibold text-lg">Rs. {auction.currentBid}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Ends at:</p>
                        <p className="font-medium">{auction.endTime}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <input 
                        type="number" 
                        className="p-2 border rounded-md w-32" 
                        placeholder="Your bid" 
                        min={auction.currentBid + 100}
                        step={100}
                      />
                      <button 
                        className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700"
                        onClick={() => placeBid(auction.id, auction.currentBid + 100)}
                      >
                        Place Bid
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">My Orders</h2>
              
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Order #{order.id}</h3>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm 
                        ${order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                          order.status === 'Shipped' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'}`}>
                        {order.status}
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-sm">Items:</p>
                      <ul className="list-disc pl-5 text-sm">
                        {order.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-3 flex justify-between items-center">
                      <p className="font-semibold">Total: Rs. {order.total}</p>
                      
                      {order.status === 'Shipped' && (
                        <button className="flex items-center text-sm text-green-700">
                          <Package size={14} className="mr-1" />
                          Track Order
                        </button>
                      )}
                      
                      {order.status === 'Delivered' && (
                        <button className="flex items-center text-sm text-blue-600">
                          <Star size={14} className="mr-1" />
                          Leave Review
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">Notifications</h2>
              
              <div className="space-y-2">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}`}
                  >
                    <div className="flex justify-between">
                      <p className={`${notification.read ? 'text-gray-700' : 'font-medium'}`}>
                        {notification.message}
                      </p>
                      {!notification.read && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 rounded-full">New</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          <p>© 2025 FarmConnect. All rights reserved.</p>
          <div className="flex justify-center mt-2 space-x-4">
            <a href="#" className="hover:text-green-700">Terms of Service</a>
            <a href="#" className="hover:text-green-700">Privacy Policy</a>
            <a href="#" className="hover:text-green-700">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}