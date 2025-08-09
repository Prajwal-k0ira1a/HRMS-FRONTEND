import { useState } from "react";
import Dashboard from "./Dashboard";
import SideBar from "../../component/Admin/SideBar";
import DepartmentManager from "./DepartmentManager";
import EmployeeManagement from "./EmployeManagement";
import AttendanceManager from "./AttendanceManagement";
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;

      case "employees":
        return <EmployeeManagement />;

      case "departments":
        return <DepartmentManager />;

      case "attendance":
        return <AttendanceManager />;

      case "leave-requests":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Leave Requests</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <p>Leave request management </p>
            </div>
          </div>
        );

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-8">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
