import { useState } from "react";
import axios from "axios";

const PayrollForm = () => {
  const [form, setForm] = useState({
    userId: "",
    basicSalary: 0,
    allowances: {},
    deductions: {},
    month: "",
    year: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/payroll", form);
      alert("Payroll created successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="userId" placeholder="Employee ID" onChange={handleChange} />
      <input name="basicSalary" type="number" onChange={handleChange} />
      <input name="month" placeholder="Month" onChange={handleChange} />
      <input name="year" placeholder="Year" onChange={handleChange} />
      {/* You can expand allowances and deductions here as needed */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default PayrollForm;
