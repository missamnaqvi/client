import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const RoomForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/rooms",
        data
      );
      alert("Room created successfully!");
      reset();
      console.log(response.data);
    } catch (error) {
      alert("Failed to create room.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Room</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-semibold">Room Number</label>
          <input
            type="text"
            {...register("room_number", {
              required: "Room number is required",
            })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.room_number && (
            <p className="text-red-500">{errors.room_number.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Capacity</label>
          <input
            type="number"
            {...register("capacity", { required: "Capacity is required" })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.capacity && (
            <p className="text-red-500">{errors.capacity.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Rent</label>
          <input
            type="number"
            {...register("rent", { required: "Rent is required" })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.rent && <p className="text-red-500">{errors.rent.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Room
        </button>
      </form>
    </div>
  );
};

export default RoomForm;
