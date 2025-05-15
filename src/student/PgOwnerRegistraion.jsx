import React, { useState } from "react";
import {
  Building,
  MapPin,
  Phone,
  Mail,
  User,
  Plus,
  Home,
  DollarSign,
  Settings,
  LogOut,
} from "lucide-react";

// PG Owner Registration Component
const PGOwnerRegistration = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    ownerName: "",
    email: "",
    phone: "",

    // PG Property Details
    pgName: "",
    pgAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
    totalRooms: "",
    pgType: "",

    // Additional Details
    amenities: [],
    rules: [],
  });

  const [currentStep, setCurrentStep] = useState(1);

  // Amenities and Rules Options
  const amenitiesList = [
    "WiFi",
    "AC",
    "Cooking Allowed",
    "Parking",
    "Washing Machine",
    "Gym",
    "TV",
    "Refrigerator",
  ];

  const rulesList = [
    "No Smoking",
    "No Alcohol",
    "No Guests",
    "Strict Timing",
    "Vegetarian Food",
    "No Late Night Noise",
  ];

  // Form Input Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle nested address fields
    if (name.startsWith("pgAddress.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        pgAddress: {
          ...prev.pgAddress,
          [addressField]: value,
        },
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Amenities Selection Handler
  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  // Rules Selection Handler
  const handleRuleToggle = (rule) => {
    setFormData((prev) => ({
      ...prev,
      rules: prev.rules.includes(rule)
        ? prev.rules.filter((r) => r !== rule)
        : [...prev.rules, rule],
    }));
  };

  // Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement registration logic
    console.log("PG Registration Data:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-6">
        <div className="flex items-center mb-10">
          <Building className="mr-3" size={36} />
          <h2 className="text-2xl font-bold">PG Manager</h2>
        </div>
        <nav className="space-y-4">
          <a
            href="#"
            className="flex items-center p-3 rounded hover:bg-blue-700 transition"
          >
            <Home className="mr-3" /> Dashboard
          </a>
          <a
            href="#"
            className="flex items-center p-3 rounded hover:bg-blue-700 transition"
          >
            <Plus className="mr-3" /> Add New PG
          </a>
          <a
            href="#"
            className="flex items-center p-3 rounded hover:bg-blue-700 transition"
          >
            <DollarSign className="mr-3" /> Payments
          </a>
          <a
            href="#"
            className="flex items-center p-3 rounded hover:bg-blue-700 transition"
          >
            <Settings className="mr-3" /> Settings
          </a>
        </nav>
        <div className="absolute bottom-6 left-0 w-full px-6">
          <button className="flex items-center w-full p-3 rounded hover:bg-blue-700 transition">
            <LogOut className="mr-3" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-10">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Building className="mr-4 text-blue-600" />
            PG Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Step */}
            {currentStep === 1 && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">Owner Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="ownerName"
                      placeholder="Enter Full Name"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter Phone Number"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* PG Property Details Step */}
            {currentStep === 2 && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">PG Name</label>
                  <input
                    type="text"
                    name="pgName"
                    placeholder="Enter PG Name"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.pgName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2">Total Rooms</label>
                  <input
                    type="number"
                    name="totalRooms"
                    placeholder="Number of Rooms"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.totalRooms}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2">PG Address</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="pgAddress.street"
                      placeholder="Street Address"
                      className="w-full px-4 py-2 border rounded-lg"
                      value={formData.pgAddress.street}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="pgAddress.city"
                      placeholder="City"
                      className="w-full px-4 py-2 border rounded-lg"
                      value={formData.pgAddress.city}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="pgAddress.state"
                      placeholder="State"
                      className="w-full px-4 py-2 border rounded-lg"
                      value={formData.pgAddress.state}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="pgAddress.postalCode"
                      placeholder="Postal Code"
                      className="w-full px-4 py-2 border rounded-lg"
                      value={formData.pgAddress.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Amenities and Rules Step */}
            {currentStep === 3 && (
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Select Amenities
                  </h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    {amenitiesList.map((amenity) => (
                      <label
                        key={amenity}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                          formData.amenities.includes(amenity)
                            ? "bg-blue-50 border-blue-500"
                            : "bg-white"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="mr-3"
                          checked={formData.amenities.includes(amenity)}
                          onChange={() => handleAmenityToggle(amenity)}
                        />
                        {amenity}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">PG Rules</h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    {rulesList.map((rule) => (
                      <label
                        key={rule}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                          formData.rules.includes(rule)
                            ? "bg-blue-50 border-blue-500"
                            : "bg-white"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="mr-3"
                          checked={formData.rules.includes(rule)}
                          onChange={() => handleRuleToggle(rule)}
                        />
                        {rule}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Previous
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Register PG
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PGOwnerRegistration;
