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
import MMSMotionDashboard from "../pages/Dashboard/Modules/MMS/Motion";
import MMSMotionDetail from "../pages/Dashboard/Modules/MMS/Motion/MotionDetail";
import MMSMotionList from "../pages/Dashboard/Modules/MMS/Motion/MotionList";
import MMSNewMotion from "../pages/Dashboard/Modules/MMS/Motion/NewMotion";
import MMSSearchMotion from "../pages/Dashboard/Modules/MMS/Motion/SearchMotion";
import MMSMotionSummery from "../pages/Dashboard/Modules/MMS/Reports";
import MMSSearchQuestion from "../pages/Dashboard/Modules/MMS/SearchQuestion";
import MMSSearchResolution from "../pages/Dashboard/Modules/MMS/SearchResolution";
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
import QMSQuestionDashboard from "../pages/Dashboard/Modules/QMS";
import QMSNoticeQuestion from "../pages/Dashboard/Modules/QMS/Notice/NoticeQuestion";
import QMSNoticeQuestionDetail from "../pages/Dashboard/Modules/QMS/Notice/NoticeQuestionDetail";
import QMSNoticeResolution from "../pages/Dashboard/Modules/QMS/Notice/NoticeResolution";
import QMSNoticeResolutionDetail from "../pages/Dashboard/Modules/QMS/Notice/NoticeResolutionDetail";
import QMSDeleteQuestion from "../pages/Dashboard/Modules/QMS/Question/DeleteQuestion";
import QMSNewQuestion from "../pages/Dashboard/Modules/QMS/Question/NewQuestion";
import QMSQuestionDetail from "../pages/Dashboard/Modules/QMS/Question/QuestionDetail";
import QMSQuestionList from "../pages/Dashboard/Modules/QMS/Question/QuestionList";
import QMSDeferQuestionReports from "../pages/Dashboard/Modules/QMS/Reports/DeferQuestionReports";
import QMSQuestionAnnualReports from "../pages/Dashboard/Modules/QMS/Reports/QuestionAnnualReports";
import QMSReportQuestionList from "../pages/Dashboard/Modules/QMS/Reports/QuestionList";
import QMSQuestionSummary from "../pages/Dashboard/Modules/QMS/Reports/QuestionSummary";
import QMSResolutionAnnualReports from "../pages/Dashboard/Modules/QMS/Reports/ResolutionAnnualReports";
import QMSResolutionSummary from "../pages/Dashboard/Modules/QMS/Reports/ResolutionSummary";
import QMSDeleteResolution from "../pages/Dashboard/Modules/QMS/Resolution/DeleteResolution";
import QMSResolutionList from "../pages/Dashboard/Modules/QMS/Resolution/ResolutionList";
import QMSSearchQuestion from "../pages/Dashboard/Modules/QMS/SearchQuestion";
import QMSSerchResolution from "../pages/Dashboard/Modules/QMS/SearchResolution";
import SMSDashboard from "../pages/Dashboard/Modules/SMS";
import SMSDetailedMessageLog from "../pages/Dashboard/Modules/SMS/MessageLog/Detailed";
import SMSMessageSummary from "../pages/Dashboard/Modules/SMS/MessageLog/Summary";
import SMSAddList from "../pages/Dashboard/Modules/SMS/PhoneBook/AddList";
import SMSImportContact from "../pages/Dashboard/Modules/SMS/PhoneBook/ImportContacts";
import SMSManageList from "../pages/Dashboard/Modules/SMS/PhoneBook/ManageList";
import SMSAdvancedSMS from "../pages/Dashboard/Modules/SMS/SendSMS/AdvancedSMS";
import SMSInstantSMS from "../pages/Dashboard/Modules/SMS/SendSMS/InstantSMS";
import SMSAddEditTemplate from "../pages/Dashboard/Modules/SMS/Templates/AddTemplates";
import SMSMAnageTemplate from "../pages/Dashboard/Modules/SMS/Templates/ManageTemplate";
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
  {
    path: "/notice/seatingplan/manage-session-days",
    element: <ManageSessionDays />,
  },
  {
    path: "/notice/seatingplan/manage-seating-plan",
    element: <ManageSeatingPlan />,
  },

  { path: "/notice/reports", element: <NoticeDashboard /> },
  { path: "/notice/reports/business-summary", element: <BusinessSummary /> },

  //MMS Module
  { path: "/mms/dashboard", element: <MMSMotionDashboard /> },

  { path: "/mms/motion", element: <MMSMotionDashboard /> },
  { path: "/mms/motion/new", element: <MMSNewMotion /> },
  { path: "/mms/motion/search", element: <MMSSearchMotion /> },
  { path: "/mms/motion/detail", element: <MMSMotionDetail /> },
  { path: "/mms/motion/list", element: <MMSMotionList /> },

  { path: "/mms/question/search", element: <MMSSearchQuestion /> },
  { path: "/mms/resolution/search", element: <MMSSearchResolution /> },

  { path: "/mms/reports", element: <MMSMotionDashboard /> },
  { path: "/mms/reports/motion-summary", element: <MMSMotionSummery /> },

  //QMS Module
  { path: "/qms/dashboard", element: <QMSQuestionDashboard /> },
  { path: "/qms/question/search", element: <QMSSearchQuestion /> },
  { path: "/qms/resolution/search", element: <QMSSerchResolution /> },

  { path: "/qms/reports", element: <QMSQuestionDashboard /> },
  {
    path: "/qms/reports/resolution-summary",
    element: <QMSResolutionSummary />,
  },
  { path: "/qms/reports/question-summary", element: <QMSQuestionSummary /> },
  {
    path: "/qms/reports/resolution-annual-reports",
    element: <QMSResolutionAnnualReports />,
  },
  {
    path: "/qms/reports/question-annual-reports",
    element: <QMSQuestionAnnualReports />,
  },
  {
    path: "/qms/reports/defer-question-reports",
    element: <QMSDeferQuestionReports />,
  },
  {
    path: "/qms/reports/question-list",
    element: <QMSReportQuestionList />,
  },

  //QMS Module
  { path: "/qms/dashboard", element: <QMSQuestionDashboard /> },
  { path: "/qms/search/question", element: <QMSSearchQuestion /> },
  { path: "/qms/search/resolution", element: <QMSSerchResolution /> },

  { path: "/qms/resolution", element: <QMSQuestionDashboard /> },
  { path: "/qms/rsolution/list", element: <QMSResolutionList /> },
  { path: "/qms/resolution/delete", element: <QMSDeleteResolution /> },

  { path: "/qms/question", element: <QMSQuestionDashboard /> },
  { path: "/qms/question/list", element: <QMSQuestionList /> },
  { path: "/qms/question/detail", element: <QMSQuestionDetail /> },
  { path: "/qms/question/new", element: <QMSNewQuestion /> },
  { path: "/qms/question/delete", element: <QMSDeleteQuestion /> },

  { path: "/qms/resolution", element: <QMSQuestionDashboard /> },
  { path: "/qms/resolution/list", element: <QMSResolutionList /> },
  { path: "/qms/resolution/delete", element: <QMSDeleteResolution /> },

  { path: "/qms/notice", element: <QMSQuestionDashboard /> },
  { path: "/qms/notice/notice-question", element: <QMSNoticeQuestion /> },
  {
    path: "/qms/notice/notice-question-detail",
    element: <QMSNoticeQuestionDetail />,
  },
  { path: "/qms/notice/notice-resolution", element: <QMSNoticeResolution /> },
  {
    path: "/qms/notice/notice-resolution-detail",
    element: <QMSNoticeResolutionDetail />,
  },

  //SMS Module routes
  { path: "/sms/dashboard", element: <SMSDashboard /> },

  { path: "/sms/send-sms", element: <SMSDashboard /> },
  { path: "/sms/send-sms/instant", element: <SMSInstantSMS /> },
  { path: "/sms/send-sms/advanced", element: <SMSAdvancedSMS /> },

  { path: "/sms/phone-book", element: <SMSDashboard /> },
  { path: "/sms/phone-book/add", element: <SMSAddList /> },
  { path: "/sms/phone-book/manage", element: <SMSManageList /> },
  { path: "/sms/phone-book/import", element: <SMSImportContact /> },

  { path: "/sms/template", element: <SMSDashboard /> },
  { path: "/sms/template/add", element: <SMSAddEditTemplate /> },
  { path: "/sms/template/manage", element: <SMSMAnageTemplate /> },

  { path: "/sms/messagelog", element: <SMSDashboard /> },
  { path: "/sms/messagelog/summary", element: <SMSMessageSummary /> },
  { path: "/sms/messagelog/detailed", element: <SMSDetailedMessageLog /> },


];