import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const res = await axios.get("/api/departments");
        setDepartments(res.data.data);
      } catch (err) {
        toast.error("Failed to load departments");
      } finally {
        setLoading(false);
      }
    }
    fetchDepartments();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">All Departments</h1>

      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Head</th>
            <th className="p-3 border">Budget (NPR)</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept._id} className="border-b">
              <td className="p-3 border">{dept.name}</td>
              <td className="p-3 border">{dept.head?.name || "Not Assigned"}</td>
              <td className="p-3 border">{dept.budget?.toLocaleString()}</td>
              <td className="p-3 border">
                <span className={`px-2 py-1 rounded text-white ${dept.isActive ? 'bg-green-500' : 'bg-red-500'}`}>
                  {dept.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="p-3 border">
                <Link
                  to={`/departments/${dept._id}`}
                  className="text-blue-600 hover:underline mr-2"
                >
                  View
                </Link>
                <Link
                  to={`/departments/edit/${dept._id}`}
                  className="text-yellow-600 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
          {departments.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No departments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentList;
