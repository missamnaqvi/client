import React from "react";

const PgList = () => {
  const properties = [
    {
      id: 1,
      title: "2 BHK in Mumbai",
      price: "₹45,000/month",
      location: "Mumbai, Maharashtra",
      imageUrl: "https://via.placeholder.com/300x200?text=2+BHK+in+Mumbai",
    },
    {
      id: 2,
      title: "3 BHK in Delhi",
      price: "₹60,000/month",
      location: "Delhi, Delhi",
      imageUrl: "https://via.placeholder.com/300x200?text=3+BHK+in+Delhi",
    },
    {
      id: 3,
      title: "1 BHK in Bangalore",
      price: "₹30,000/month",
      location: "Bangalore, Karnataka",
      imageUrl: "https://via.placeholder.com/300x200?text=1+BHK+in+Bangalore",
    },
    {
      id: 4,
      title: "4 BHK in Pune",
      price: "₹70,000/month",
      location: "Pune, Maharashtra",
      imageUrl: "https://via.placeholder.com/300x200?text=4+BHK+in+Pune",
    },
    {
      id: 5,
      title: "2 BHK in Hyderabad",
      price: "₹40,000/month",
      location: "Hyderabad, Telangana",
      imageUrl: "https://via.placeholder.com/300x200?text=2+BHK+in+Hyderabad",
    },
    {
      id: 6,
      title: "3 BHK in Chennai",
      price: "₹55,000/month",
      location: "Chennai, Tamil Nadu",
      imageUrl: "https://via.placeholder.com/300x200?text=3+BHK+in+Chennai",
    },
  ];

  return (
    <div className="flex flex-wrap justify-around gap-6 p-6">
      {properties.map((property) => (
        <div
          key={property.id}
          className="w-80 p-4 bg-white border rounded-md shadow-lg hover:shadow-xl transition duration-300"
        >
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800">
            {property.title}
          </h3>
          <p className="text-gray-600">{property.price}</p>
          <p className="text-gray-500">{property.location}</p>
        </div>
      ))}
    </div>
  );
};

export default PgList;
