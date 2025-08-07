// src/components/Employee/EmployeeDetails.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../../api/employeeApi";
import { toast } from "react-toastify";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmployeeById(id)
      .then((res) => {
        setEmployee(res.data.data);
        toast.success("Employee data loaded");
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to load employee");
        console.error("Error fetching employee:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!employee) return <p>Employee not found</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Employee Details</h2>

      {employee.profileImage && (
        <img
          src={`http://localhost:5000/uploads/${employee.profileImage}`}
          alt={employee.name}
          className="w-32 h-32 rounded-full object-cover mb-4"
        />
      )}

      <div className="space-y-2">
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Role:</strong> {employee.role}</p>
        <p><strong>Department:</strong> {employee.department?.name || "N/A"}</p>
        <p><strong>Designation:</strong> {employee.designation || "N/A"}</p>
        <p><strong>Salary:</strong> Rs. {employee.salary || "N/A"}</p>
        <p><strong>Phone:</strong> {employee.phoneNumber || "N/A"}</p>
        <p><strong>Address:</strong> {employee.address || "N/A"}</p>
        <p><strong>Date Joined:</strong> {new Date(employee.dateOfJoining).toLocaleDateString()}</p>
        <p><strong>Status:</strong> {employee.isActive ? "Active" : "Inactive"}</p>
      </div>
    </div>
  );
};

export default EmployeeDetails;
