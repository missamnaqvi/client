import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { generatePresignedURL } from "../aws/s3/putObject";
// import { getImage } from "../aws/s3/getObjectS3";

const StudentRegistrationForm = () => {
  // const [passportSizeImage, setPassportSizeImage] = useState();
  const [roomFees, setRoomFees] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const fileUploadToS3 = async (e) => {
  //   try {
  //     const file = e.target.files[0];
  //     if (!file) throw new Error("No file selected!");

  //     const content_type = file.type;
  //     const key = `profilePictures/${file.name}`;

  //     // Generate presigned URL for uploading the file
  //     const uploadUrl = await generatePresignedURL(key, content_type);

  //     // Upload the file to S3 using the presigned URL
  //     const uploadResponse = await fetch(uploadUrl, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": content_type,
  //       },
  //       body: file,
  //     });

  //     if (!uploadResponse.ok) {
  //       throw new Error("Failed to upload the file to S3");
  //     }

  //     // Generate presigned URL for retrieving the file
  //     const retrieveUrl = await getImage(file.name);
  //     setPassportSizeImage(retrieveUrl);
  //   } catch (error) {
  //     console.error("Error during file upload process:", error);
  //   }
  // };

  // Update the room fee based on the selected sharing option
  const handleRoomFeesChange = (option) => {
    const fees = {
      "2 sharing": 7000,
      "3 sharing": 6500,
      "4 sharing": 6000,
      "5 sharing": 5500,
      "6 sharing": 5000,
      Hall: 4500,
    };
    setRoomFees(fees[option] || 0);
  };

  const onSubmit = async (data) => {
    const imageName = data.passportSizeImage?.[0]?.name;
    const finalData = { ...data, roomFees, imageName };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/studentRegistration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();
      // console.log(result, "response");

      const presignedUrl = result.fileUrl;

      const imageFile = data.passportSizeImage?.[0];

      if (!imageFile) {
        throw new Error("Image file is missing!");
      }

      const uploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": imageFile.type, // Ensure the Content-Type matches the file
        },
        body: imageFile, // The file itself
      });

      if (!uploadResponse.ok) {
        throw new Error(`Error uploading image: ${uploadResponse.statusText}`);
      }

      console.log("Image uploaded successfully to S3!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Student Registration Form
        </h1>

        {/* First Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            First Name
          </label>
          <input
            type="text"
            {...register("firstName", { required: "First Name is required" })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.firstName ? "border-red-500" : ""
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Last Name
          </label>
          <input
            type="text"
            {...register("lastName", { required: "Last Name is required" })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.lastName ? "border-red-500" : ""
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Room No */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Room No
          </label>
          <input
            type="text"
            {...register("roomNo", { required: "Room No is required" })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.roomNo ? "border-red-500" : ""
            }`}
          />
          {errors.roomNo && (
            <p className="text-red-500 text-xs mt-1">{errors.roomNo.message}</p>
          )}
        </div>

        {/* Course Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Course Name
          </label>
          <input
            type="text"
            {...register("courseName", { required: "Course Name is required" })}
            className={`block w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none ${
              errors.courseName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.courseName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.courseName.message}
            </p>
          )}
        </div>

        {/* Semester */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Semester
          </label>
          <input
            type="text"
            {...register("semester", { required: "Semester is required" })}
            className={`block w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none ${
              errors.semester ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.semester && (
            <p className="text-red-500 text-sm mt-1">
              {errors.semester.message}
            </p>
          )}
        </div>

        {/* Student Mobile Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Student Mobile Number
          </label>
          <input
            type="tel"
            {...register("studentMobileNumber", {
              required: "Mobile Number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit number",
              },
            })}
            className={`block w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none ${
              errors.studentMobileNumber ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.studentMobileNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.studentMobileNumber.message}
            </p>
          )}
        </div>

        {/* City Your cityYourHometown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            City (Your cityYourHometown)
          </label>
          <input
            type="text"
            {...register("cityYourHometown", {
              required: "Your Hometown is required",
            })}
            className={`block w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none ${
              errors.cityYourHometown ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.cityYourHometown && (
            <p className="text-red-500 text-sm mt-1">
              {errors.cityYourHometown.message}
            </p>
          )}
        </div>
        {/* Passport Size Image */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Passport Size Image
          </label>
          <input
            type="file"
            {...register("passportSizeImage", {
              required: "Image is required",
            })}
            className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          {errors.passportSizeImage && (
            <p className="text-red-500 text-sm mt-1">
              {errors.passportSizeImage.message}
            </p>
          )}
        </div>
        {/* Room Sharing Options */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Room Sharing Option
          </label>
          <div className="flex flex-wrap gap-4 mt-2">
            {[
              "2 sharing",
              "3 sharing",
              "4 sharing",
              "5 sharing",
              "6 sharing",
              "Hall",
            ].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  value={option}
                  {...register("sharingOption", {
                    required: "Please select a sharing option",
                    onChange: (e) => handleRoomFeesChange(e.target.value),
                  })}
                  className="focus:ring-blue-500 text-blue-600"
                />
                {option}
              </label>
            ))}
          </div>
          {errors.sharingOption && (
            <p className="text-red-500 text-sm mt-1">
              {errors.sharingOption.message}
            </p>
          )}
        </div>

        {/* Display Room Fee */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Room Fee
          </label>
          <input
            type="text"
            value={`₹${roomFees}`}
            readOnly
            className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed focus:outline-none"
          />
        </div>
        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentRegistrationForm;
