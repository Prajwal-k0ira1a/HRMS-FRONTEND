import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PayrollDetails = () => {
  const { id } = useParams();
  const [payroll, setPayroll] = useState(null);

  useEffect(() => {
    axios.get(`/api/payroll/${id}`)
      .then(res => setPayroll(res.data.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!payroll) return <p>Loading...</p>;

  return (
    <div>
      <h2>Payroll Details</h2>
      <p><strong>Employee:</strong> {payroll.userId?.name}</p>
      <p><strong>Basic Salary:</strong> {payroll.basicSalary}</p>
      <p><strong>Total Allowances:</strong> {payroll.totalAllowances}</p>
      <p><strong>Total Deductions:</strong> {payroll.totalDeductions}</p>
      <p><strong>Net Salary:</strong> {payroll.netSalary}</p>
      <p><strong>Status:</strong> {payroll.status}</p>
    </div>
  );
};

export default PayrollDetails;
