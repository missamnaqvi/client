import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResidentDetail from "./ResidentProfile";

const ResidentList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [studentList, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [selectedResident, setselectedResident] = useState(0);
  console.log(selectedResident, "selectedResident");
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/residents/all",
          {
            withCredentials: true, // required for cookies/sessions
          }
        );
        setStudents(data);
      } catch (err) {
        setError("Failed to fetch students");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);
  // Calculate total fees
  const totalFees =
    studentList?.reduce((acc, student) => acc + student.roomFees, 0) || 0;
  const totalStudents = studentList?.length || 0;
  // console.log(totalStudents,"total student")

  // Filter students based on the search term
  const filteredStudents = (studentList || []).filter((student) => {
    const term = searchTerm.toLowerCase();
    return (
      student.firstName.toLowerCase().includes(term) ||
      student.lastName.toLowerCase().includes(term) ||
      student.courseName.toLowerCase().includes(term) ||
      student.studentMobileNumber.toString().includes(term)
    );
  });

  // If the student list is empty, return a message
  if (!studentList || studentList.length === 0) {
    return <p>No students found.</p>;
  }

  if (loading) return <p>Loading students...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return selectedResident === 0 ? (
    <div>
      <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            Fees Amount of Total : {totalFees}
          </h3>
          <h3 className="text-lg font-semibold text-slate-800">
            Total Student: {totalStudents}
          </h3>
          <p className="text-slate-500">Overview of the invoices.</p>
        </div>
        <div className="ml-3">
          <div className="w-full max-w-sm min-w-[200px] relative">
            <div className="relative">
              {/* Search Input */}
              <input
                className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                placeholder="Search by name, course, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              />
              <button
                className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="currentColor"
                  className="w-8 h-8 text-slate-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table className="w-full text-left table-auto table-fixed">
          <thead>
            <tr>
              <th className="p-4 border-b border-slate-300 bg-slate-50 w-1/5">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Student Name
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50 w-1/5">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Hometown
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50 w-1/5">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Course Name
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50 w-1/5">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Phone Number
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50 w-1/5">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Fees
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => {
              // console.log(student,"student")
              return (
                <tr
                  className="hover:bg-slate-50 cursor-pointer"
                  key={index}
                  onClick={() => setselectedResident(student._id)}
                >
                  <td className="p-4 border-b border-slate-200 py-5 w-1/5">
                    <p className="block font-semibold text-sm text-slate-800">
                      {student.firstName} {student.lastName}
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-200 py-5 w-1/5">
                    <p className="text-sm text-slate-500">
                      {student.cityYourHometown}
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-200 py-5 w-1/5">
                    <p className="text-sm text-slate-500">
                      {student.courseName}
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-200 py-5 w-1/5">
                    <p className="text-sm text-slate-500">
                      {student.studentMobileNumber}
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-200 py-5 w-1/5">
                    <p className="text-sm text-slate-500">{student.roomFees}</p>
                  </td>
                </tr>
              );
            })}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-slate-500">
                  No matching students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <ResidentDetail residentID={selectedResident} />
  );
};

export default ResidentList;
