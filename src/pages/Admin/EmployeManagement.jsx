import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    designation: "",
    salary: "",
    phoneNumber: "",
    address: "",
    dateOfJoining: "",
    role: "employee",
    isActive: true,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in first", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
        });
        return false;
      }
      return true;
    };

    if (checkLogin()) {
      fetchEmployees();
      fetchDepartments();
    }
  }, []);
  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        toast.error("Not logged in. Please log in first.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
        });
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }, 
      
      };

      const res = await axios.get(
        "http://localhost:3152/api/employees/get",
        config,
        { withCredentials: true }
      );
      setEmployees(res.data.data);
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      toast.error("Failed to fetch employees. Please try again.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
      });
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:3152/api/department/get", {
        withCredentials: true,
      });
      setDepartments(res.data.data);
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
          `http://localhost:3152/api/employees/${editingId}`,
          formData
        );
      } else {
        await axios.post(
          "http://localhost:3152/api/employees/create",
          formData
        );
      }
      toast.success(
        `Employee ${editingId ? "updated" : "created"} successfully 🎉`,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
        }
      );
      fetchEmployees();
      setFormData({
        name: "",
        email: "",
        password: "",
        department: "",
        designation: "",
        salary: "",
        phoneNumber: "",
        address: "",
        dateOfJoining: "",
        role: "employee",
        isActive: true,
      });
      setEditingId(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
      });
    }
  };

  const handleEdit = (employee) => {
    setFormData({
      name: employee.name || "",
      email: employee.email || "",
      password: employee.password || "", // Password should not be pre-filled for security reasons
      department: employee.department || "",
      designation: employee.designation || "",
      salary: employee.salary || "",
      phoneNumber: employee.phoneNumber || "",
      address: employee.address || "",
      dateOfJoining: employee.dateOfJoining?.slice(0, 10) || "",
      role: employee.role || "employee",
      isActive: employee.isActive,
    });
    setEditingId(employee._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    try {
      await axios.delete(`http://localhost:3152/api/employees/${id}`, {
        withCredentials: true,
      });
      fetchEmployees();
      toast.success("Employee deleted successfully 🎉", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: "",
      email: "",
      department: "",
      designation: "",
      salary: "",
      phoneNumber: "",
      address: "",
      dateOfJoining: "",
      role: "employee",
      isActive: true,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Employees</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          {!editingId && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
          )}
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="date"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
          <div className="flex items-center">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: e.target.checked,
                  }))
                }
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>Active Status</span>
            </label>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {editingId ? "Update Employee" : "Add Employee"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Table */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Employee List</h3>
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Department</th>
              <th className="border px-4 py-2">Designation</th>
              <th className="border px-4 py-2">Salary</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td className="border px-4 py-2">{employee.name}</td>
                <td className="border px-4 py-2">{employee.email}</td>
                <td className="border px-4 py-2">
                  {departments.find((d) => d._id === employee.department)
                    ?.name || "N/A"}
                </td>
                <td className="border px-4 py-2">{employee.designation}</td>
                <td className="border px-4 py-2">{employee.salary}</td>
                <td className="border px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      employee.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {employee.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="border px-4 py-2 flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(employee)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(employee._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeManagement;
