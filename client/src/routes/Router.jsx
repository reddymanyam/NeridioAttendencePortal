import ProtectedRoute from "../components/ProtectedRoute";
import { createBrowserRouter } from "react-router-dom";
import Authentication from "../components/Authentication";
import AdminLayout from "../AdminLayout/AdminLayout";
import EmployeeLayout from "../EmployeeLayout/EmployeeLayout";
import AdminDashboard from "../components/AdminDashboard";
import EmployeesList from "../components/EmployeesList";
import EmployeDashboard from "../components/EmployeDashboard";
import MarkAttendance from "../components/MarkAttendence";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentication />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> }, // /admin
      { path: "employeeslist", element: <EmployeesList /> }, // /admin/employeeslist
    ],
  },
  {
    path: "/employee",
    element: (
      <ProtectedRoute role="employee">
        <EmployeeLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <MarkAttendance /> }, // /employee
      { path: "employeedashboard", element: <EmployeDashboard /> }, // /employee/employeedashboard
    ],
  },
]);

export default router;
