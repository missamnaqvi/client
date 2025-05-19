import React from "react";
import { useForm } from "react-hook-form";

const PGRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission, e.g., send data to the server
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-8 bg-white shadow-lg rounded-lg border border-[#ddd]">
      <h2 className="text-2xl font-bold mb-6 text-center">
        PG Registration Form
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* PG Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            PG Name:
          </label>
          <input
            {...register("pgName", { required: "PG Name is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {errors.pgName && (
            <span className="text-red-500 text-sm">
              {errors.pgName.message}
            </span>
          )}
        </div>

        {/* Owner's Full Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Owner's Full Name OR Trust Name
          </label>
          <input
            {...register("ownerName", {
              required: "Owner's Full Name is required",
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {errors.ownerName && (
            <span className="text-red-500 text-sm">
              {errors.ownerName.message}
            </span>
          )}
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Contact Number:
          </label>
          <input
            type="tel"
            {...register("contactNumber", {
              required: "Contact Number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Contact Number must be 10 digits",
              },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {errors.contactNumber && (
            <span className="text-red-500 text-sm">
              {errors.contactNumber.message}
            </span>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Email Address:
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email Address is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid Email Address",
              },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        {/* Full Address */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Full Address:
          </label>
          <textarea
            {...register("address", { required: "Address is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {errors.address && (
            <span className="text-red-500 text-sm">
              {errors.address.message}
            </span>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            City:
          </label>
          <input
            {...register("city", { required: "City is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {errors.city && (
            <span className="text-red-500 text-sm">{errors.city.message}</span>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            State:
          </label>
          <input
            {...register("state", { required: "State is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {errors.state && (
            <span className="text-red-500 text-sm">{errors.state.message}</span>
          )}
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Pincode:
          </label>
          <input
            type="text"
            {...register("pincode", {
              required: "Pincode is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Pincode must be 6 digits",
              },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {errors.pincode && (
            <span className="text-red-500 text-sm">
              {errors.pincode.message}
            </span>
          )}
        </div>

        {/* Type of PG */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Type of PG:
          </label>
          <select
            {...register("pgType", { required: "Type of PG is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <option value="">Select Type</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
            <option value="Co-ed">Co-ed</option>
          </select>
          {errors.pgType && (
            <span className="text-red-500 text-sm">
              {errors.pgType.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-600 transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default PGRegistrationForm;
