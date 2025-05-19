import { Building } from "lucide-react";
import React, { useState } from "react";

export default function PgRegistration() {
  const [formData, setFormData] = useState({
    ownerName: "",
    email: "",
    phone: "",
    pgName: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
    totalRooms: "",
    rentRange: "",
    amenities: [],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const AMENITIES_LIST = [
    "WiFi",
    "AC",
    "Food",
    "Parking",
    "Gym",
    "Washing Machine",
    "Hot Water",
    "Television",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle nested address field
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
    setFormData((prev) => ({
      ...prev,
      amenities: selectedAmenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual registration logic
    console.log("PG Registration Data:", formData);
  };

  // Render different registration steps
  const renderRegistrationStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Personal Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Owner Name</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">PG Property Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">PG Name</label>
                <input
                  type="text"
                  name="pgName"
                  value={formData.pgName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Total Rooms</label>
                <input
                  type="number"
                  name="totalRooms"
                  value={formData.totalRooms}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Rent Range (Monthly)</label>
                <input
                  type="text"
                  name="rentRange"
                  value={formData.rentRange}
                  onChange={handleInputChange}
                  placeholder="₹5000 - ₹10000"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Address Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Street Address</label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">City</label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">State</label>
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Pincode</label>
                <input
                  type="text"
                  name="address.pincode"
                  value={formData.address.pincode}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Amenities</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {AMENITIES_LIST.map((amenity) => (
                <label
                  key={amenity}
                  className={`flex items-center p-3 border rounded cursor-pointer ${
                    selectedAmenities.includes(amenity)
                      ? "bg-blue-100 border-blue-500"
                      : "bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="mr-2"
                  />
                  {amenity}
                </label>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                Submit Registration
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full p-8">
        <div className="flex items-center mb-8">
          <Building className="mr-4 text-blue-600" size={40} />
          <h1 className="text-3xl font-bold">PG Owner Registration</h1>
        </div>

        <form>{renderRegistrationStep()}</form>

        {/* Uncomment to show dashboard after registration */}
        {/* <PGOwnerDashboard /> */}
      </div>
    </div>
  );
}
