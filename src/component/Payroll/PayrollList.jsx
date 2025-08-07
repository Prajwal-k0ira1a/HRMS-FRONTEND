import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PayrollList = () => {
  const [payrolls, setPayrolls] = useState([]);

  useEffect(() => {
    axios.get("/api/payroll")
      .then(res => setPayrolls(res.data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Payroll Records</h2>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Month</th>
            <th>Net Salary</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map(p => (
            <tr key={p._id}>
              <td>{p.userId?.name}</td>
              <td>{p.month} {p.year}</td>
              <td>{p.netSalary}</td>
              <td>{p.status}</td>
              <td>
                <Link to={`/admin/payroll/${p._id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollList;
