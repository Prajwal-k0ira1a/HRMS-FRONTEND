import { useState } from "react";
import { createEmployee, updateEmployee } from "../../api/employeeApi";

const EmployeeForm = ({ isEdit = false, employeeData = {}, onSuccess }) => {
  const [form, setForm] = useState({
    name: employeeData.name || "",
    email: employeeData.email || "",
    role: employeeData.role || "",
    password: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      if (form[key]) formData.append(key, form[key]);
    }

    try {
      if (isEdit) {
        await updateEmployee(employeeData._id, form);
      } else {
        await createEmployee(formData);
      }
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Full Name"
        required
      />

      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />

      {!isEdit && (
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          required
        />
      )}

      <select name="role" value={form.role} onChange={handleChange}>
        <option value="employee">Employee</option>
        <option value="manager">Manager</option>
        <option value="admin">Admin</option>
      </select>

      {/* For department, you'll need to fetch options */}
      <select name="department" value={form.department} onChange={handleChange}>
        <option value="">Select Department</option>
        {departments.map((dept) => (
          <option key={dept._id} value={dept._id}>
            {dept.name}
          </option>
        ))}
      </select>

      <input
        name="designation"
        value={form.designation}
        onChange={handleChange}
        placeholder="Designation"
      />

      <input
        name="salary"
        type="number"
        value={form.salary}
        onChange={handleChange}
        placeholder="Salary"
      />

      <input
        name="phoneNumber"
        value={form.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
      />

      <textarea
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
      ></textarea>

      <input
        name="dateOfJoining"
        type="date"
        value={form.dateOfJoining?.slice(0, 10)}
        onChange={handleChange}
      />

      <label>
        Active:{" "}
        <input
          name="isActive"
          type="checkbox"
          checked={form.isActive}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, isActive: e.target.checked }))
          }
        />
      </label>

      <input name="profileImage" type="file" onChange={handleChange} />

      <button type="submit">{isEdit ? "Update" : "Create"}</button>
    </form>
  );
};

export default EmployeeForm;
