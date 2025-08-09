import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AttendanceManager = () => {
  const [records, setRecords] = useState([]);
  axios.defaults.withCredentials = true;
  const [formData, setFormData] = useState({
    userId: "",
    date: "",
    clockIn: "",
    clockOut: "",
    status: "absent",
    notes: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    fetchAttendance();
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:3152/api/employees/get");
      setEmployees(res.data.data); // assuming your API returns { data: [...] }
    } catch (err) {
      console.error("Failed to fetch employees", err);
    }
  };
  const fetchAttendance = async () => {
    try {
      const res = await axios.get("http://localhost:3152/api/attendance/get");

      // Map attendance records to include employee name
      const updatedRecords = res.data.data.map((rec) => {
        const emp = employees.find((e) => e._id === rec.userId);
        return {
          ...rec,
          employeeName: emp ? emp.name : "Unknown",
        };
      });

      setRecords(updatedRecords);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:3152/api/attendance/${editingId}`,
          formData
        );
      } else {
        await axios.post(
          "http://localhost:3152/api/attendance/create",
          formData
        );
      }
      toast.success("Attendance saved 🎉", {
        position: "top-right",
        autoClose: 2000,
      });
      fetchAttendance();
      setFormData({
        userId: "",
        date: "",
        clockIn: "",
        clockOut: "",
        status: "absent",
        notes: "",
      });
      setEditingId(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error occurred", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleEdit = (record) => {
    setFormData({
      userId: record.userId || "",
      date: record.date?.slice(0, 10) || "",
      clockIn: record.clockIn?.slice(0, 16) || "",
      clockOut: record.clockOut?.slice(0, 16) || "",
      status: record.status || "absent",
      notes: record.notes || "",
    });
    setEditingId(record._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this attendance record?")) return;
    try {
      await axios.delete(`http://localhost:3152/api/attendance/${id}`);
      toast.success("Deleted successfully 🎉", {
        position: "top-right",
        autoClose: 2000,
      });
      fetchAttendance();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      userId: "",
      date: "",
      clockIn: "",
      clockOut: "",
      status: "absent",
      notes: "",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Attendance Records</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="datetime-local"
            name="clockIn"
            value={formData.clockIn}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="datetime-local"
            name="clockOut"
            value={formData.clockOut}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="half-day">Half-day</option>
            <option value="leave">Leave</option>
          </select>
          <input
            type="text"
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          >
            {editingId ? "Update Record" : "Add Record"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Attendance List</h3>
        <table className="w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Employee</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Clock In</th>
              <th className="border px-4 py-2">Clock Out</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Notes</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec, index) => (
              <tr
                key={rec._id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border px-4 py-2">
                  {employees.find((e) => e._id === rec.userId)?.name ||
                    "Unknown"}
                </td>
                <td className="border px-4 py-2">{rec.date?.slice(0, 10)}</td>
                <td className="border px-4 py-2">
                  {rec.clockIn?.slice(11, 16)}
                </td>
                <td className="border px-4 py-2">
                  {rec.clockOut?.slice(11, 16)}
                </td>
                <td className="border px-4 py-2 capitalize">{rec.status}</td>
                <td className="border px-4 py-2">{rec.notes}</td>
                <td className="border px-4 py-2 flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(rec)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(rec._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {records.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceManager;
