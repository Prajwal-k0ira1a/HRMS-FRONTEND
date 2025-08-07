import { useState, useEffect } from "react";
import { createDepartment, updateDepartment } from "../../api/departmentApi";
import { getEmployees } from "../../api/employeeApi"; // assuming you have this
import { toast } from "react-toastify";

const DepartmentForm = ({ edit = false, initialData = {}, onSuccess }) => {
  const [form, setForm] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    head: initialData.head || "",
    budget: initialData.budget || 0,
    isActive: initialData.isActive ?? true,
  });

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees()
      .then((res) => setEmployees(res.data.data))
      .catch((err) => toast.error("Failed to fetch users"));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        await updateDepartment(initialData._id, form);
        toast.success("Department updated");
      } else {
        await createDepartment(form);
        toast.success("Department created");
      }
      onSuccess?.();
    } catch (err) {
      toast.error("Failed to save department");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Department Name"
        required
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
      />

      <select name="head" value={form.head} onChange={handleChange}>
        <option value="">Select Head</option>
        {employees.map((emp) => (
          <option key={emp._id} value={emp._id}>
            {emp.name} ({emp.role})
          </option>
        ))}
      </select>

      <input
        name="budget"
        type="number"
        min="0"
        value={form.budget}
        onChange={handleChange}
        placeholder="Budget"
      />

      <label>
        Active:
        <input
          name="isActive"
          type="checkbox"
          checked={form.isActive}
          onChange={handleChange}
        />
      </label>

      <button type="submit">{edit ? "Update" : "Create"}</button>
    </form>
  );
};

export default DepartmentForm;
