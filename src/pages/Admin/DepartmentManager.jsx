import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DepartmentManager = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
axios.defaults.withCredentials = true;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budget: "",
    head: "",

  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);
const fetchEmployees = async () => {
  try {
    const res = await axios.get("http://localhost:3152/api/employees/get");
    setEmployees(res.data.data); // Adjust based on your API response structure
  } catch (err) {
    console.error("Failed to fetch employees:", err);
  }
};
  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:3152/api/department/get");
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
          `http://localhost:3152/api/department/${editingId}`,
          formData
        );
      } else {
        await axios.post(
          "http://localhost:3152/api/department/create",
          formData
        );
      }
      toast.success("Successful 🎉", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
      });

      fetchDepartments();
      setFormData({ name: "", description: "", budget: "" });
      setEditingId(null);
    } catch (err) {
      toast.error(err, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
      });
    }
  };

  const handleEdit = (dept) => {
    setFormData({
      name: dept.name || "",
      description: dept.description || "",
      budget: dept.budget || "",
      head: dept.head || "",
    });
    setEditingId(dept._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?"))
      return;

    try {
      await axios.delete(`http://localhost:3152/api/department/delete/${id}`);
      fetchDepartments();
      toast.success("Delete successful 🎉", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", description: "", budget: "" });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Departments</h2>
      </div>
<form
  onSubmit={handleSubmit}
  className="bg-white p-6 rounded-lg shadow-md space-y-6"
>
  {/* Department Head Selection */}
  <div>
    <label htmlFor="head" className="block text-sm font-medium text-gray-700 mb-1">
      Department Head
    </label>
    <select
      id="head"
      name="head"
      value={formData.head}
      onChange={handleChange}
      className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    >
      <option value="">Select Department Head</option>
      {employees.map((emp) => (
        <option key={emp._id} value={emp._id}>
          {emp.name}
        </option>
      ))}
    </select>
  </div>

  {/* Department Details */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
        Department Name
      </label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Department Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:text-gray-400"
      />
    </div>

    <div>
      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
        Description
      </label>
      <input
        id="description"
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:text-gray-400"
      />
    </div>

    <div>
      <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
        Budget
      </label>
      <input
        id="budget"
        type="number"
        name="budget"
        placeholder="Budget"
        min={0}
        value={formData.budget}
        onChange={handleChange}
        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:text-gray-400"
      />
    </div>
  </div>

  {/* Action Buttons */}
  <div className="flex gap-4">
    <button
      type="submit"
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-transform hover:scale-105"
    >
      {editingId ? "Update Department" : "Add Department"}
    </button>
    {editingId && (
      <button
        type="button"
        onClick={handleCancelEdit}
        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition-transform hover:scale-105"
      >
        Cancel
      </button>
    )}
  </div>
</form>

      {/* Table */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Department List</h3>
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Budget</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept._id}>
                <td className="border px-4 py-2">{dept.name}</td>
                <td className="border px-4 py-2">{dept.description}</td>
                <td className="border px-4 py-2">{dept.budget}</td>
                <td className="border px-4 py-2 flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(dept)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(dept._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {departments.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No departments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentManager;
