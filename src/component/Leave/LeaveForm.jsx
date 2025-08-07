import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const LeaveForm = ({ userId, onSuccess }) => {
  const [form, setForm] = useState({
    type: "sick",
    dateFrom: "",
    dateTo: "",
    totalDays: 1,
    reason: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If dates change, update totalDays automatically
    if (name === "dateFrom" || name === "dateTo") {
      const newForm = { ...form, [name]: value };

      if (newForm.dateFrom && newForm.dateTo) {
        const from = new Date(newForm.dateFrom);
        const to = new Date(newForm.dateTo);
        const diff = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
        newForm.totalDays = diff > 0 ? diff : 1;
      }

      setForm(newForm);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/leaves", { ...form, userId });
      toast.success("Leave applied successfully");
      setForm({
        type: "sick",
        dateFrom: "",
        dateTo: "",
        totalDays: 1,
        reason: ""
      });
      onSuccess?.();
    } catch (err) {
      toast.error("Failed to apply leave");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <select name="type" value={form.type} onChange={handleChange} required>
        <option value="sick">Sick</option>
        <option value="casual">Casual</option>
        <option value="earned">Earned</option>
        <option value="maternity">Maternity</option>
        <option value="paternity">Paternity</option>
      </select>

      <input
        type="date"
        name="dateFrom"
        value={form.dateFrom}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="dateTo"
        value={form.dateTo}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="totalDays"
        value={form.totalDays}
        readOnly
      />

      <textarea
        name="reason"
        value={form.reason}
        onChange={handleChange}
        placeholder="Reason"
        required
      />

      <button type="submit" className="btn-primary">Apply Leave</button>
    </form>
  );
};

export default LeaveForm;
