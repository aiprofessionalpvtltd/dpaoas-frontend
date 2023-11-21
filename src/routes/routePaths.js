import Dashboard from "../pages/Dashboard";
import HRMDashboard from "../pages/Dashboard/Modules/HRM";
import HRMAddRole from "../pages/Dashboard/Modules/HRM/AddRole";
import HRMDepartment from "../pages/Dashboard/Modules/HRM/Department";
import HRMAddEditDepartment from "../pages/Dashboard/Modules/HRM/Department/AddEditDepartment";
import HRMDesignation from "../pages/Dashboard/Modules/HRM/Designation";
import HRMAddEditDesignation from "../pages/Dashboard/Modules/HRM/Designation/AddEditDesignation";
import HRMEditRole from "../pages/Dashboard/Modules/HRM/EditRole";
import HRMUserDashboard from "../pages/Dashboard/Modules/HRM/User";
import HRMAddEditUser from "../pages/Dashboard/Modules/HRM/User/AddEditUsers";
import LMSDashboard from "../pages/Dashboard/Modules/LMS";
import LMSAddEdit from "../pages/Dashboard/Modules/LMS/AddEditForm";
import LMSHistory from "../pages/Dashboard/Modules/LMS/History";
import VMSDashboard from "../pages/Dashboard/Modules/VMS";
import { Login } from "../pages/Login";
// import { Register } from "../pages/Register";


export const NonProtectedRoutes = [
    { path: "/login", element: <Login /> },
    // { path: "/register", element: <Register /> },

];

export const ProtectedRoutes = [
    { path: "/", element: <Dashboard /> },

    // HRM Module routes
    { path: "/hrm/dashboard", element: <HRMDashboard /> },
    { path: "/hrm/addrole", element: <HRMAddRole /> },
    { path: "/hrm/editrole", element: <HRMEditRole /> },
    { path: "/hrm/department", element: <HRMDepartment /> },
    { path: "/hrm/addeditdepartment", element: <HRMAddEditDepartment /> },
    { path: "/hrm/user", element: <HRMUserDashboard /> },
    { path: "/hrm/addedituser", element: <HRMAddEditUser /> },
    { path: "/hrm/designation", element: <HRMDesignation /> },
    { path: "/hrm/addeditdesignation", element: <HRMAddEditDesignation /> },





    //LMS Module routes
    { path: "/lms/dashboard", element: <LMSDashboard /> },
    { path: "/lms/history", element: <LMSHistory /> },
    { path: "/lms/addedit", element: <LMSAddEdit /> },


    //VMS Module routes
    { path: "/vms/dashboard", element: <VMSDashboard /> },


];