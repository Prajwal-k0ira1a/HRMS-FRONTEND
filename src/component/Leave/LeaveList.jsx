import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getAllLeaves, approveLeave, rejectLeave } from "../../api/LeaveApi";

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("/api/leaves");
      setLeaves(res.data.data);
    } catch (err) {
      toast.error("Failed to load leaves");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  if (loading) return <p>Loading leaves...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Leave Requests</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Type</th>
            <th>From</th>
            <th>To</th>
            <th>Days</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id} className="border-t">
              <td>{leave.userId?.name || "N/A"}</td>
              <td>{leave.type}</td>
              <td>{new Date(leave.dateFrom).toLocaleDateString()}</td>
              <td>{new Date(leave.dateTo).toLocaleDateString()}</td>
              <td>{leave.totalDays}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-white ${
                    leave.status === "approved"
                      ? "bg-green-600"
                      : leave.status === "rejected"
                      ? "bg-red-600"
                      : "bg-yellow-500"
                  }`}
                >
                  {leave.status}
                </span>
              </td>
            </tr>
          ))}
          {leaves.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No leave requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveList;
