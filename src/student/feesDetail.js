import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function FeesDetail() {
  const [feesData, setFeesData] = useState([]); // Store fees data
  const [error, setError] = useState(""); // Store error message
  const [month, setMonth] = useState(getCurrentMonth()); // Current month as default
  const [loading, setLoading] = useState(false); // Loading state
  const [updating, setUpdating] = useState(false); // Update status state
  // console.log(feesData, "feesData");
  // Helper function to get the current month in "MMMM YYYY" format
  function getCurrentMonth() {
    return new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  }

  const totalFees = feesData.reduce(
    (sum, fee) => sum + (fee?.studentId?.roomFees || 0),
    0
  );
  console.log(totalFees, "totalFees");

  const collectedFees = feesData.reduce(
    (sum, fee) =>
      fee?.status === "Paid" && fee?.studentId?.roomFees
        ? sum + fee?.studentId?.roomFees
        : sum,
    0
  );
  const paidStudentsCount = feesData.filter(
    (fee) => fee?.status === "Paid"
  ).length;
  const pendingStudentsCount = feesData.filter(
    (fee) => fee?.status === "Pending"
  ).length;
  const totalStudents = feesData?.length || 0;
  console.log(collectedFees, "collectedFees");
  // Fetch data based on the selected month
  const fetchFeesData = async (selectedMonth) => {
    try {
      setLoading(true); // Start loading
      setError(""); // Reset error before fetching
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/fees?month=${encodeURIComponent(
          selectedMonth
        )}`
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to fetch fees data.");
      }

      const data = await response.json();
      setFeesData(data.data || []); // Ensure data consistency
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
      setFeesData([]); // Reset fees data on error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle status update
  const handleStatusChange = async (feeId, newStatus) => {
    // console.log(feeId, newStatus);
    const confirmUpdate = window.confirm(
      `Are you sure you want to update the payment status to "${newStatus}"?`
    );

    if (!confirmUpdate) return;

    try {
      setUpdating(true); // Start updating state
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/fees/${feeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to update status.");
      }
      if (response.ok) {
        fetchFeesData(month);
      }

      const updatedFee = await response.json();

      // Update the local state with the updated fee
      setFeesData((prevFees) =>
        prevFees.map((fee) => (fee._id === feeId ? updatedFee.data : fee))
      );

      toast.success("Payment status updated successfully.");
    } catch (err) {
      alert(err.message || "An unexpected error occurred.");
    } finally {
      setUpdating(false); // Stop updating state
    }
  };

  // Fetch fees data whenever the selected month changes
  useEffect(() => {
    fetchFeesData(month);
  }, [month]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {month} Fees Collection
      </h1>

      {/* Month Selector */}
      <div>
        <div className=" flex justify-between">
          <div>
            <label htmlFor="month" className="block text-lg font-medium mb-2">
              Select Month:
            </label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full max-w-sm focus:ring focus:ring-blue-200"
            >
              {Array.from({ length: 12 }, (_, i) => {
                const date = new Date(new Date().getFullYear(), i); // Month and year
                const monthName = date.toLocaleString("default", {
                  month: "long",
                });
                const fullLabel = `${monthName} ${date.getFullYear()}`;
                return (
                  <option key={fullLabel} value={fullLabel}>
                    {fullLabel}
                  </option>
                );
              })}
            </select>
          </div>

          <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
            <div class="p-4">
              <h6 class=" text-slate-800 text-xl font-semibold">
                Total Student : {totalStudents}
              </h6>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
            <div class="p-4">
              <h6 class=" text-slate-800 text-xl font-semibold">
                Collectable Fees : {totalFees}
              </h6>
            </div>
          </div>
          <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
            <div class="p-4">
              <h6 class=" text-slate-800 text-xl font-semibold">
                Collected Fees : {collectedFees}
              </h6>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
            <div class="p-4">
              <h6 class="mb-2 text-slate-800 text-xl font-semibold">
                Number of student pending fees : {pendingStudentsCount}
              </h6>
            </div>
          </div>
          <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
            <div class="p-4">
              <h6 class="mb-2 text-slate-800 text-xl font-semibold">
                Number of student paid fees : {paidStudentsCount}
              </h6>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && <p className="text-blue-500 mb-4">Loading data...</p>}

      {/* Error Message */}
      {!loading && error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Fees Table */}
      {!loading && feesData.length > 0 ? (
        <table className="table-auto border-collapse w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Student Name</th>
              <th className="border px-4 py-2">Month</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Fees</th>
              <th className="border px-4 py-2">Paid Date</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {feesData.map((fee) => {
              // console.log(fee, "fee");
              return (
                <tr key={fee._id} className="even:bg-gray-50">
                  <td className="border px-4 py-2">
                    {fee.studentId.firstName}
                  </td>

                  <td className="border px-4 py-2">{fee.month}</td>
                  <td className="border px-4 py-2">{fee.status}</td>
                  {/* <td className="border px-4 py-2">{fee.amountPaid}</td> */}
                  <td className="border px-4 py-2">{fee.studentId.roomFees}</td>
                  <td className="border px-4 py-2">
                    {fee.paidDate
                      ? new Date(fee.paidDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      value={fee.status}
                      onChange={(e) =>
                        handleStatusChange(fee._id, e.target.value)
                      }
                      className="border border-gray-300 rounded-md p-1 focus:ring focus:ring-blue-200"
                      disabled={updating}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        !loading &&
        !error && (
          <p className="text-gray-500">
            No fees data available for the selected month.
          </p>
        )
      )}
    </div>
  );
}
