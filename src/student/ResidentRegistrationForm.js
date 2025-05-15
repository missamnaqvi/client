import React from "react";
import { useForm } from "react-hook-form";

const ResidentRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onlyStringRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/; // allowed only character with spaces
  // const stringDigitRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*[ ]?[0-9]*$/;
  const mobileNumberRegex = /^[7-9]{1}[0-9]{9}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const zipcodeRegex = /^[1-9]{1}[0-9]{5}$/;
  const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
  const validateFileSize = (file) => {
    if (file && file[0]?.size > maxSizeInBytes) {
      return "File size exceeds 2 MB";
    }
    return true;
  };
  const onSubmit = async (data) => {
    console.log(data, "student registration form data");
    try {
      const finalData = { ...data };

      // Check and include optional files if they exist
      if (
        data.policeVerificationCertificate &&
        data.policeVerificationCertificate.length > 0
      ) {
        finalData.policeVerificationCertificate = {
          name: data.policeVerificationCertificate[0].name,
          type: data.policeVerificationCertificate[0].type,
        };
      }

      if (
        data.lastCollegeFeesReceipt &&
        data.lastCollegeFeesReceipt.length > 0
      ) {
        finalData.lastCollegeFeesReceipt = {
          name: data.lastCollegeFeesReceipt[0].name,
          type: data.lastCollegeFeesReceipt[0].type,
        };
      }

      // Include required files like Aadhaar Card and Passport Image
      if (data.aadharCard && data.aadharCard.length > 0) {
        finalData.aadharCard = {
          name: data.aadharCard[0].name,
          type: data.aadharCard[0].type,
        };
      } else {
        console.log("please upload adharCard file");
      }
      if (data.passportSizeImage && data.passportSizeImage.length > 0) {
        finalData.passportSizeImage = {
          name: data.passportSizeImage[0].name,
          type: data.passportSizeImage[0].type,
        };
      } else {
        console.log("please upload passportSizeImage file");
      }

      // Send the form data to the server
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/residentregistration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("Form submitted successfully");
      } else {
        console.error("Failed to submit form");
      }
      console.log(result, "result");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Resident Registration
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            {...register("firstName", {
              required: "First Name is required",
              pattern: {
                value: onlyStringRegex,
                message: "Only alphabetic characters are allowed",
              },
            })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            {...register("lastName", {
              required: "Last Name is required",
              pattern: {
                value: onlyStringRegex,
                message: "Only alphabetic characters are allowed",
              },
            })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: emailRegex,
                message: "Invalid email address",
              },
            })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth (dd/mm/yyyy)
          </label>
          <input
            type="date"
            {...register("dob", { required: "Date of Birth is required" })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.dob && (
            <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
          )}
        </div>

        {/* Course Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Course Name
          </label>
          <input
            type="text"
            {...register("courseName", {
              required: "Course Name is required",
            })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.courseName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.courseName.message}
            </p>
          )}
        </div>

        {/* Semester */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Semester
          </label>
          <input
            type="text"
            {...register("semester", { required: "Semester is required" })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.semester && (
            <p className="text-red-500 text-sm mt-1">
              {errors.semester.message}
            </p>
          )}
        </div>

        {/* Student Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Student Mobile Number
          </label>
          <input
            type="text"
            {...register("residentMobileNumber", {
              required: "Mobile Number is required",
              pattern: {
                value: mobileNumberRegex,
                message: "Enter valid Mobile Number",
              },
            })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.residentMobileNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.residentMobileNumber.message}
            </p>
          )}
        </div>

        {/* Father's Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Father's Mobile Number
          </label>
          <input
            type="text"
            {...register("fatherMobileNumber", {
              required: "Father's Mobile Number is required",
              pattern: {
                value: mobileNumberRegex,
                message: "Enter valid Mobile Number",
              },
            })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.fatherMobileNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fatherMobileNumber.message}
            </p>
          )}
        </div>

        {/* Father Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Father Name
          </label>
          <input
            type="text"
            {...register("fatherName", {
              required: "Father Name is required",
              pattern: {
                value: onlyStringRegex,
                message: "Enter valid Father Name",
              },
            })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.fatherName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fatherName.message}
            </p>
          )}
        </div>

        {/* Mother Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mother Name
          </label>
          <input
            type="text"
            {...register("motherName", {
              required: "Mother Name is required",
              pattern: {
                value: onlyStringRegex,
                message: "Enter valid Mother name",
              },
            })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.motherName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.motherName.message}
            </p>
          )}
        </div>

        {/* Medical History */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Medical History
          </label>
          <textarea
            {...register("medicalHistory")}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows={4}
          />
          {errors.medicalHistory && (
            <p className="text-red-500 text-sm mt-1">
              {errors.medicalHistory.message}
            </p>
          )}
        </div>

        {/* Extra Curricular Activities */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Extra Curricular Activities
          </label>
          <textarea
            {...register("extraCurricularActivities")}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>

        {/* Vehicle Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Vehicle Number
          </label>
          <input
            type="text"
            {...register("vehicleNumber")}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Police Verification Certificate */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Police Verification Certificate
          </label>
          <input
            type="file"
            {...register("policeVerificationCertificate", {
              validate: validateFileSize,
            })}
            className="mt-1 block w-full text-gray-600"
          />
        </div>
        {/* Aadhar Card */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Aadhar Card
          </label>
          <input
            type="file"
            {...register("aadharCard", {
              required: "File is required",
              validate: validateFileSize,
            })}
            className="mt-1 block w-full text-gray-600"
          />
          {errors.aadharCard && (
            <p className="text-red-500 text-sm mt-1">
              {errors.aadharCard.message}
            </p>
          )}
        </div>

        {/* Last College Fees Receipt */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last College/Institution Fees Receipt
          </label>
          <input
            type="file"
            {...register("lastCollegeFeesReceipt", {
              validate: validateFileSize,
            })}
            className="mt-1 block w-full text-gray-600"
          />
        </div>

        {/* Passport Size Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Passport Size Image
          </label>
          <input
            type="file"
            {...register("passportSizeImage", {
              required: "File is required",
              validate: validateFileSize,
            })}
            className="mt-1 block w-full text-gray-600"
          />
          {errors.passportSizeImage && (
            <p className="text-red-500 text-sm mt-1">
              {errors.passportSizeImage.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            {...register("address", { required: "Address is required" })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            {...register("city", {
              required: "City is required",
              pattern: {
                value: onlyStringRegex,
                message: "Enter valid city name",
              },
            })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        {/* District */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            District
          </label>
          <input
            type="text"
            {...register("district", {
              required: "District is required",
              pattern: {
                value: onlyStringRegex,
                message: "Enter valid District name",
              },
            })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.district && (
            <p className="text-red-500 text-sm mt-1">
              {errors.district.message}
            </p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            {...register("state", {
              required: "State is required",
              pattern: {
                value: onlyStringRegex,
                message: "Enter valid District name",
              },
            })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
          )}
        </div>

        {/* Zipcode */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Zipcode
          </label>
          <input
            type="text"
            {...register("zipcode", {
              required: "Zipcode is required",
              pattern: {
                value: zipcodeRegex,
                message: "Enter valid District name",
              },
            })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.zipcode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.zipcode.message}
            </p>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResidentRegistrationForm;
