import React, { useState } from "react";
import {
  // Home,
  Building,
  Users,
  Search,
  // BookOpen,
  CreditCard,
} from "lucide-react";
import PGRegistrationForm from "./PgRegistrationForm";
import PgRegistration from "./Auth/PgRegistration";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold mb-4">
            Find Your Perfect Paying Guest Accommodation
          </h2>
          <p className="text-xl mb-8">
            Discover comfortable, affordable, and convenient living spaces
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto flex">
            <input
              type="text"
              placeholder="Search by city, area, or PG name"
              className="w-full p-3 rounded-l-lg text-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 rounded-r-lg flex items-center">
              <Search className="mr-2" />
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-4">
        <h3 className="text-3xl font-bold text-center mb-12">
          Why Choose Our PG Management System?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature Cards */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all">
            <Users className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Easy Booking</h4>
            <p className="text-gray-600">
              Simple, quick, and hassle-free room booking process
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all">
            <Building className="w-12 h-12 mx-auto text-green-600 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Verified PGs</h4>
            <p className="text-gray-600">
              Carefully verified and quality-checked accommodations
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all">
            <CreditCard className="w-12 h-12 mx-auto text-purple-600 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Transparent Pricing</h4>
            <p className="text-gray-600">
              No hidden charges, clear and upfront pricing
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <PGRegistrationForm/>
      <PgRegistration/>
    </div>
  );
};

export default HomePage;
