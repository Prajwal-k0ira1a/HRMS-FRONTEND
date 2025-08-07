import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const DepartmentDetails = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDepartment() {
      try {
        const res = await axios.get(`/api/departments/${id}`);
        setDepartment(res.data.data);
      } catch (error) {
        toast.error("Failed to fetch department details");
      } finally {
        setLoading(false);
      }
    }
    fetchDepartment();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!department) return <p>Department not found</p>;

  return (
    <div className="container mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Department Details</h1>
      <p><strong>Name:</strong> {department.name}</p>
      <p><strong>Description:</strong> {department.description || "N/A"}</p>
      <p><strong>Head:</strong> {department.head?.name || "Not Assigned"}</p>
      <p><strong>Budget:</strong> NPR {department.budget?.toLocaleString()}</p>
      <p><strong>Status:</strong> {department.isActive ? "Active" : "Inactive"}</p>
      <p><strong>Created At:</strong> {new Date(department.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default DepartmentDetails;
