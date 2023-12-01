import Dashboard from "../pages/Dashboard";
import HRMDashboard from "../pages/Dashboard/Modules/HRM";
import HRMAddRole from "../pages/Dashboard/Modules/HRM/AddRole";
import HRMDepartment from "../pages/Dashboard/Modules/HRM/Department";
import HRMAddEditDepartment from "../pages/Dashboard/Modules/HRM/Department/AddEditDepartment";
import HRMDesignation from "../pages/Dashboard/Modules/HRM/Designation";
import HRMAddEditDesignation from "../pages/Dashboard/Modules/HRM/Designation/AddEditDesignation";
import HRMEditRole from "../pages/Dashboard/Modules/HRM/EditRole";
import HRMEmployeeDashboard from "../pages/Dashboard/Modules/HRM/Employee";
import HRMAddEditEmployee from "../pages/Dashboard/Modules/HRM/Employee/AddEditEmployee";
import LMSDashboard from "../pages/Dashboard/Modules/LMS";
import LMSAddEdit from "../pages/Dashboard/Modules/LMS/AddEditForm";
import LMSHistory from "../pages/Dashboard/Modules/LMS/History";
import NoticeDashboard from "../pages/Dashboard/Modules/Notice";
import Members from "../pages/Dashboard/Modules/Notice/Manage/Members";
import MembersAddEditForm from "../pages/Dashboard/Modules/Notice/Manage/Members/AddEditMembers";
import Sessions from "../pages/Dashboard/Modules/Notice/Manage/Sessions";
import SessionsAddEditForm from "../pages/Dashboard/Modules/Notice/Manage/Sessions/AddEditSessions";
import NewMotion from "../pages/Dashboard/Modules/Notice/Motion/New";
import SearchMotion from "../pages/Dashboard/Modules/Notice/Motion/Search";
import SentMotion from "../pages/Dashboard/Modules/Notice/Motion/Sent";
import NewQuestion from "../pages/Dashboard/Modules/Notice/Question/New";
import SearchQuestion from "../pages/Dashboard/Modules/Notice/Question/Search";
import SentQuestion from "../pages/Dashboard/Modules/Notice/Question/Sent";
import BusinessSummary from "../pages/Dashboard/Modules/Notice/Reports/BusinessSummary";
import NewResolution from "../pages/Dashboard/Modules/Notice/Resolution/New";
import SearchResolution from "../pages/Dashboard/Modules/Notice/Resolution/Search";
import SentResolution from "../pages/Dashboard/Modules/Notice/Resolution/Sent";
import ManageSeatingPlan from "../pages/Dashboard/Modules/Notice/SeatingPlan/ManageSeatingPlan";
import ManageSessionDays from "../pages/Dashboard/Modules/Notice/SeatingPlan/ManageSessionDays";
import VMSDashboard from "../pages/Dashboard/Modules/VMS";
import VMSAddEditPass from "../pages/Dashboard/Modules/VMS/Pass";
import VMSDuplicatePass from "../pages/Dashboard/Modules/VMS/Pass/DuplicatePass";
import VMSVisitors from "../pages/Dashboard/Modules/VMS/Visitors";
import VMSAddEditVisitors from "../pages/Dashboard/Modules/VMS/Visitors/AddEditVisitors";
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
    { path: "/hrm/employee", element: <HRMEmployeeDashboard /> },
    { path: "/hrm/addeditemployee", element: <HRMAddEditEmployee /> },
    { path: "/hrm/designation", element: <HRMDesignation /> },
    { path: "/hrm/addeditdesignation", element: <HRMAddEditDesignation /> },

    //LMS Module routes
    { path: "/lms/dashboard", element: <LMSDashboard /> },
    { path: "/lms/history", element: <LMSHistory /> },
    { path: "/lms/addedit", element: <LMSAddEdit /> },


    //VMS Module routes
    { path: "/vms/dashboard", element: <VMSDashboard /> },
    { path: "/vms/addeditpass", element: <VMSAddEditPass /> },
    { path: "/vms/visitor", element: <VMSVisitors /> },
    { path: "/vms/addeditvisitor", element: <VMSAddEditVisitors /> },
    { path: "/vms/duplicatepass", element: <VMSDuplicatePass /> },
    

    //Notice Module routes
    { path: "/notice/dashboard", element: <NoticeDashboard /> },

    { path: "/notice/question", element: <NoticeDashboard /> },
    { path: "/notice/question/new", element: <NewQuestion /> },
    { path: "/notice/question/search", element: <SearchQuestion /> },
    { path: "/notice/question/sent", element: <SentQuestion /> },

    { path: "/notice/motion", element: <NoticeDashboard /> },
    { path: "/notice/motion/new", element: <NewMotion /> },
    { path: "/notice/motion/search", element: <SearchMotion /> },
    { path: "/notice/motion/sent", element: <SentMotion /> },

    { path: "/notice/resolution", element: <NoticeDashboard /> },
    { path: "/notice/resolution/new", element: <NewResolution /> },
    { path: "/notice/resolution/search", element: <SearchResolution /> },
    { path: "/notice/resolution/sent", element: <SentResolution /> },

    { path: "/notice/manage", element: <NoticeDashboard /> },
    { path: "/notice/manage/members", element: <Members /> },
    { path: "/notice/manage/members/addedit", element: <MembersAddEditForm /> },

    { path: "/notice/manage/sessions", element: <Sessions /> },
    { path: "/notice/manage/sessions/addedit", element: <SessionsAddEditForm /> },

    { path: "/notice/seatingplan", element: <NoticeDashboard /> },
    { path: "/notice/seatingplan/manage-session-days", element: <ManageSessionDays /> },
    { path: "/notice/seatingplan/manage-seating-plan", element: <ManageSeatingPlan /> },

    { path: "/notice/reports", element: <NoticeDashboard /> },
    { path: "/notice/reports/business-summary", element: <BusinessSummary /> },

];