import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../../api/employeeApi";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const load = async () => {
    const { data } = await getEmployees();
    setEmployees(data.data);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure?")) {
      await deleteEmployee(id);
      load();
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      {employees.map((emp) => (
        <div key={emp._id}>
          <p>{emp.name} - {emp.email}</p>
          <button onClick={() => handleDelete(emp._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
