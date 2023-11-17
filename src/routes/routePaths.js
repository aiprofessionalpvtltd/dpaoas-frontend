import Dashboard from "../pages/Dashboard";
import HRMDashboard from "../pages/Dashboard/Modules/HRM";
import LMSDashboard from "../pages/Dashboard/Modules/LMS";
import VMSDashboard from "../pages/Dashboard/Modules/VMS";
import EditRole from "../pages/EditRole";
import { ListRole } from "../pages/ListRole";
import { Login } from "../pages/Login";
// import { Register } from "../pages/Register";
import AddRole from "../pages/addRole";


export const NonProtectedRoutes = [
    { path: "/login", element: <Login /> },
    // { path: "/register", element: <Register /> },

];

export const ProtectedRoutes = [
    { path: "/", element: <Dashboard /> },
    { path: "/ListRole", element: <ListRole /> },
    { path: "/AddRole", element: <AddRole /> },
    { path: "/EditRole", element: <EditRole /> },

    // HRM Module routes
    { path: "/hrm/dashboard", element: <HRMDashboard /> },

    //LMS Module routes
    { path: "/lms/dashboard", element: <LMSDashboard /> },

    //VMS Module routes
    { path: "/vms/dashboard", element: <VMSDashboard /> },


];