import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
const ResidentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // console.log(student, "student  ");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/students/${id}`
        );
        const result = await response.json();
        // console.log(result, "result");
        if (response.ok) {
          setStudent(result.data);
          Object.keys(result.data).forEach((key) => {
            setValue(key, result.data[key]); // Set values in the form
          });
        } else {
          console.error("Error:", result.message);
        }
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchStudent();
  }, [id, setValue]);

  // Handle form submission
  const onSubmit = async (data) => {
    console.log(data, "data");
    // try {
    //   const response = await fetch(
    //     `${process.env.REACT_APP_API_URL}/students/${id}`,
    //     {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(data), // Send updated data
    //     }
    //   );
    //   const result = await response.json();
    //   if (response.ok) {
    //     alert("Student details updated successfully");
    //     setStudent(result.data); // Optionally update the local state with updated data
    //   } else {
    //     alert("Error updating student details");
    //   }
    // } catch (error) {
    //   console.error("Error updating student:", error);
    // }
  };

  if (!student) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Passport Image */}
          <div className="flex justify-center mx-5">
            {student.imageURL ? (
              <img
                src={student.imageURL}
                alt="Passport"
                className="w-48 h-48 object-cover rounded-lg border"
              />
            ) : (
              <p>No passport image available</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-gray-600 mb-3">
                Personal Information
              </h2>
              <label>
                <span className="font-medium text-gray-800">Name:</span>
                <input
                  type="text"
                  {...register("name")}
                  defaultValue={`${student.firstName} ${student.lastName}`}
                  className="input-field"
                  disabled
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </label>
              <label>
                <span className="font-medium text-gray-800">
                  Date of Birth:
                </span>
                <input
                  type="date"
                  {...register("dateOfBirth")}
                  className="input-field"
                  defaultValue={student.dateOfBirth || "N/A"}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-xs">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </label>
              <label>
                <span className="font-medium text-gray-800">Age:</span>
                <input
                  type="number"
                  {...register("age")}
                  className="input-field"
                  defaultValue={student.age || "N/A"}
                />
                {errors.age && (
                  <p className="text-red-500 text-xs">{errors.age.message}</p>
                )}
              </label>
              <label>
                <span className="font-medium text-gray-800">Email:</span>
                <input
                  type="email"
                  {...register("email")}
                  className="input-field"
                  defaultValue={student.emailAddress}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </label>
              <label>
                <span className="font-medium text-gray-800">Mobile:</span>
                <input
                  type="tel"
                  {...register("mobile")}
                  className="input-field"
                  defaultValue={student.studentMobileNumber}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-xs">
                    {errors.mobile.message}
                  </p>
                )}
              </label>
            </div>

            {/* Address Information */}
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-gray-600 mb-3">
                Address Information
              </h2>
              <label>
                <span className="font-medium text-gray-800">Address:</span>
                <input
                  type="text"
                  {...register("address")}
                  className="input-field"
                  defaultValue={student.address}
                />
              </label>
              <label>
                <span className="font-medium text-gray-800">City:</span>
                <input
                  type="text"
                  {...register("city")}
                  className="input-field"
                  defaultValue={student.cityYourHometown}
                />
              </label>
              <label>
                <span className="font-medium text-gray-800">District:</span>
                <input
                  type="text"
                  {...register("district")}
                  className="input-field"
                  defaultValue={student.district || "N/A"}
                />
              </label>
              <label>
                <span className="font-medium text-gray-800">State:</span>
                <input
                  type="text"
                  {...register("state")}
                  className="input-field"
                  defaultValue={student.state || student.State || "N/A"}
                />
              </label>
              <label>
                <span className="font-medium text-gray-800">Zipcode:</span>
                <input
                  type="text"
                  {...register("zipcode")}
                  className="input-field"
                  defaultValue={student.Zipcode || "N/A"}
                />
              </label>
            </div>

            {/* Academic Information */}
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-gray-600 mb-3">
                Academic Information
              </h2>
              <label>
                <span className="font-medium text-gray-800">Course:</span>
                <input
                  type="text"
                  {...register("courseName")}
                  className="input-field"
                  defaultValue={student.courseName}
                />
              </label>
              <label>
                <span className="font-medium text-gray-800">Semester:</span>
                <input
                  type="text"
                  {...register("Semester")}
                  className="input-field"
                  defaultValue={student.Semester}
                />
              </label>
              <label>
                <span className="font-medium text-gray-800">Room No:</span>
                <input
                  type="text"
                  {...register("roomNo")}
                  className="input-field"
                  defaultValue={student.roomNo}
                />
              </label>
              <label>
                <span className="font-medium text-gray-800">Fees:</span>
                <input
                  type="number"
                  {...register("roomFees")}
                  className="input-field"
                  defaultValue={student.fees || student.roomFees || "N/A"}
                />
              </label>
              <label>
                <span className="font-medium text-gray-800">
                  Last Fees Paid:
                </span>
                <input
                  type="date"
                  {...register("lastFeesPaid")}
                  className="input-field"
                  defaultValue={student.lastFeesPaidDate || "N/A"}
                />
              </label>
            </div>

            {/* Family Information */}
            <div className="flex flex-col">
              <label>
                <span className="font-medium text-gray-800">
                  Father's Name:
                </span>
                <input
                  type="text"
                  {...register("fatherName")}
                  className="input-field"
                  defaultValue={student.fatherName}
                />
              </label>
              <label>
                <span className="font-medium text-gray-800">
                  Father's Mobile:
                </span>
                <input
                  type="tel"
                  {...register("fatherMobile")}
                  className="input-field"
                  defaultValue={student.fatherMobileNumber}
                />
              </label>
              <label>
                <span className="font-medium text-gray-800">
                  Mother's Name:
                </span>
                <input
                  type="text"
                  {...register("motherName")}
                  className="input-field"
                  defaultValue={student.motherName}
                />
              </label>
            </div>

            {/* Medical and Extra Information */}
            <div className="flex flex-col">
              <label>
                <span className="font-medium text-gray-800">
                  Medical History:
                </span>
                <textarea
                  {...register("medicalHistory")}
                  className="input-field"
                  defaultValue={student.medicalHistory || "N/A"}
                />
              </label>
              <label>
                <span className="font-medium text-gray-800">
                  Extra Activities:
                </span>
                <textarea
                  {...register("extraActivities")}
                  className="input-field"
                  defaultValue={
                    student.extraCurricularActivities?.sports || "N/A"
                  }
                />
              </label>
            </div>

            {/* Profile Picture */}
            <div className="flex flex-col">
              <label>
                <span className="font-medium text-gray-800">
                  Profile Picture:
                </span>
                <input
                  type="file"
                  {...register("profilePicture")}
                  className="input-field"
                />
              </label>
            </div>
          </div>

          <button type="submit" className="bg-black text-white">
            Update Student Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResidentDetail;
