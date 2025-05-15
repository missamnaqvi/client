import React, { useState } from "react";
import {
  Building,
  Plus,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  Users,
  Home,
  Settings,
  LogOut,
  FileText,
  PlusCircle,
  Link,
} from "lucide-react";
import ResidentList from "../Resident/ResidentList";
// import AddPropertyForm from "../Property/AddPropertyForm"; // Replace with your actual form component

const PGOwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <header className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Welcome, PG Owner</h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setActiveTab("addProperty")}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
                >
                  <PlusCircle className="mr-2" /> Add New Property
                </button>
              </div>
            </header>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Total Properties</h3>
                <p className="text-3xl font-bold text-blue-600">3</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Active Residents</h3>
                <p className="text-3xl font-bold text-green-600">24</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
                <p className="text-3xl font-bold text-purple-600">₹120,000</p>
              </div>
            </div>
            <div className="mt-8 bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-6">Recent Activities</h2>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <p>New resident joined in Koramangala PG</p>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <div className="border-b pb-4">
                  <p>Maintenance request received for Room 301</p>
                  <span className="text-sm text-gray-500">Yesterday</span>
                </div>
              </div>
            </div>
          </>
        );
      case "residents":
        return <ResidentList />;

      case "request":
        return <Link to="/pg_owner/residents" />;

      case "addProperty":
        return <p>coming soon</p>; // Replace with your actual form component

      case "reports":
        return <p>Reports Section Coming Soon</p>;

      case "settings":
        return <p>Settings Panel</p>;

      default:
        return <p>Invalid Tab</p>;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-[16%] bg-gray-800 text-white min-h-screen p-6">
        <div className="flex items-center mb-10">
          <Building className="mr-2" />
          <h2 className="text-2xl font-bold">PG Dashboard</h2>
        </div>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab("dashboard")}
            className="flex items-center w-full text-left p-3 hover:bg-gray-700 rounded"
          >
            <Home className="mr-3" /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab("addProperty")}
            className="flex items-center w-full text-left p-3 hover:bg-gray-700 rounded"
          >
            <Plus className="mr-3" /> Add Property
          </button>
          <button
            onClick={() => setActiveTab("residents")}
            className="flex items-center w-full text-left p-3 hover:bg-gray-700 rounded"
          >
            <Users className="mr-3" /> Residents
          </button>
          <button
            onClick={() => setActiveTab("request")}
            className="flex items-center w-full text-left p-3 hover:bg-gray-700 rounded"
          >
            <Users className="mr-3" />
            New Request
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className="flex items-center w-full text-left p-3 hover:bg-gray-700 rounded"
          >
            <FileText className="mr-3" /> Reports
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className="flex items-center w-full text-left p-3 hover:bg-gray-700 rounded"
          >
            <Settings className="mr-3" /> Settings
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8 bg-gray-100 w-[80%]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default PGOwnerDashboard;
