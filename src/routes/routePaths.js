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
import FileDetail from "../pages/Dashboard/Modules/EFiling/FileDetail";
import TMSDashboard from "../pages/Dashboard/Modules/TMS";
import TMSMotion from "../pages/Dashboard/Modules/TMS/Motion";
import TMSQuestion from "../pages/Dashboard/Modules/TMS/Question";
import TMSResolution from "../pages/Dashboard/Modules/TMS/Resolution";
import TMSDashboardDetail from "../pages/Dashboard/Modules/TMS/TMSDashboardDetail";
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
import QMSSessions from "../pages/Dashboard/Modules/QMS/Manage/Sessions";
import QMSTerms from "../pages/Dashboard/Modules/QMS/Manage/Terms";
import QMSTenures from "../pages/Dashboard/Modules/QMS/Manage/Tenures";
import QMSMembers from "../pages/Dashboard/Modules/QMS/Manage/Members";
import QMSSittingsDays from "../pages/Dashboard/Modules/QMS/Manage/SittingDays";
import QMSMinistries from "../pages/Dashboard/Modules/QMS/Manage/Ministries";
import QMSDivisions from "../pages/Dashboard/Modules/QMS/Manage/Divisions";
import QMSPoliticalParty from "../pages/Dashboard/Modules/QMS/Manage/PoliticalParty";
import QMSParliamentaryYear from "../pages/Dashboard/Modules/QMS/Manage/ParliamentaryYear";
import QMSMembersAddEditForm from "../pages/Dashboard/Modules/QMS/Manage/Members/AddEditMembers";
import QMSAddEditSittingDaysForm from "../pages/Dashboard/Modules/QMS/Manage/SittingDays/AddEditSittingDays";
import QMSAddEditMinistriesForm from "../pages/Dashboard/Modules/QMS/Manage/Ministries/AddEditMinistries";
import QMSAddEditDivisionsForm from "../pages/Dashboard/Modules/QMS/Manage/Divisions/AddEditDivisions";
import QMSAddEditPoliticalPartyForm from "../pages/Dashboard/Modules/QMS/Manage/PoliticalParty/AddEditPoliticalParty";
import QMSAddEditParliamentaryYearForm from "../pages/Dashboard/Modules/QMS/Manage/ParliamentaryYear/AddEditParliamentaryYear";
import QMSAddEditSessionsForm from "../pages/Dashboard/Modules/QMS/Manage/Sessions/AddEditSessions";
import QMSAddEditTermsForm from "../pages/Dashboard/Modules/QMS/Manage/Terms/AddEditTerms";
import QMSAddEditTenuresForm from "../pages/Dashboard/Modules/QMS/Manage/Tenures/AddEditTenures";
import CMSUserDashboard from "../pages/Dashboard/Modules/CMS/UserCMS";
import CMSAddEditUserComplaint from "../pages/Dashboard/Modules/CMS/UserCMS/AddEditUserComplaint";
import CMSAdminDashboard from "../pages/Dashboard/Modules/CMS/AdminCMS";
import CMSAdminEditComplaint from "../pages/Dashboard/Modules/CMS/AdminCMS/AdminEdit";
import QMSGroups from "../pages/Dashboard/Modules/QMS/Manage/Groups";
import SMSInventoryDashboard from "../pages/Dashboard/Modules/CMS/InventoryDashboard";
import CMSAddInventory from "../pages/Dashboard/Modules/CMS/InventoryDashboard/AddInventory";
import CMSInventoryBill from "../pages/Dashboard/Modules/CMS/InventoryDashboard/InventoryBill";
import CMSAddInventoryBill from "../pages/Dashboard/Modules/CMS/InventoryDashboard/InventoryBill/AddInventoryBill";
import InventoryIssueDate from "../pages/Dashboard/Modules/CMS/InventoryDashboard/InventoryIssueDate";
import InventoryReturnDate from "../pages/Dashboard/Modules/CMS/InventoryDashboard/InventoryReturnDate";
import CMSVendorList from "../pages/Dashboard/Modules/CMS/InventoryDashboard/Vendor";
import CMSEditVendor from "../pages/Dashboard/Modules/CMS/InventoryDashboard/Vendor/EditVendor";
import CMSTonerInstallationReports from "../pages/Dashboard/Modules/CMS/AdminCMS/TonerInstallationReports";
import CMSAddEditTonerInstallation from "../pages/Dashboard/Modules/CMS/AdminCMS/TonerInstallationReports/AddEditTonerInstallation";
import EFilingDashboard from "../pages/Dashboard/Modules/EFiling";
import CMSTonerModels from "../pages/Dashboard/Modules/CMS/AdminCMS/TonerModel";
import AddEditTonerModel from "../pages/Dashboard/Modules/CMS/AdminCMS/TonerModel/AddEditTonerModels";
import HRMBranches from "../pages/Dashboard/Modules/HRM/Branches";
import HRMAddEditBranch from "../pages/Dashboard/Modules/HRM/Branches/AddEditBranch";
import QMSAttendence from "../pages/Dashboard/Modules/QMS/Manage/Attendence";
import ManageSittingDays from "../pages/Dashboard/Modules/Notice/SeatingPlan/ManageSittingDays";
import NMSAddEditSittingDaysForm from "../pages/Dashboard/Modules/Notice/SeatingPlan/ManageSittingDays/AddEditSittingDays";
import NMSSessionAttendence from "../pages/Dashboard/Modules/Notice/SeatingPlan/ManageSittingDays/SessionAttendence";
import NoticeQuestionDetail from "../pages/Dashboard/Modules/Notice/Question/NoticeQuestionDetail";
import { MotionListing } from "../pages/Dashboard/Modules/Notice/Motion";
import EditMotion from "../pages/Dashboard/Modules/Notice/Motion/EditMotion";
import GovernmentBill from "../pages/Dashboard/Modules/Notice/legislationBusiness/GovernmentBill";
import PrivateBill from "../pages/Dashboard/Modules/Notice/legislationBusiness/PrivateBill";

import PartywiseAttendenceReports from "../pages/Dashboard/Modules/Notice/Reports/PartywiseAnnualAttendanceReports";
import AttendanceReport from "../pages/Dashboard/Modules/Notice/Reports/AttendanceReport";

import AddEditFileRegister from "../pages/Dashboard/Modules/EFiling/FIleRegister/AddEditFileRegister";
import ListFileRegister from "../pages/Dashboard/Modules/EFiling/FIleRegister";
import ListFiles from "../pages/Dashboard/Modules/EFiling/FIleRegister/Files";
import AddEditFiles from "../pages/Dashboard/Modules/EFiling/FIleRegister/Files/AddEditFiles";
import AddEditPrivateBill from "../pages/Dashboard/Modules/Notice/legislationBusiness/PrivateBill/AddEditPrivateBill";
import FileHeadingList from "../pages/Dashboard/Modules/EFiling/FileHeading";
import AddEditFIleHeading from "../pages/Dashboard/Modules/EFiling/FileHeading/AddEditFIleHeading";
import CMSSpeechOnDemandDashboard from "../pages/Dashboard/Modules/Notice/SpeechOnDemand";
import CMSResearchServicesDashboard from "../pages/Dashboard/Modules/Notice/ResearchServices";
import CMSAddEditSpeechOnDemand from "../pages/Dashboard/Modules/Notice/SpeechOnDemand/AddEditSpeechOnDemand";
import CMSAddEditResearchService from "../pages/Dashboard/Modules/Notice/ResearchServices/AddEditResearchService";
import NMSMemberSessionAttendance from "../pages/Dashboard/Modules/Notice/SeatingPlan/MemberSessionAttendance";
import NMSProroguredSessions from "../pages/Dashboard/Modules/Notice/SeatingPlan/ProroguredSessions";
import FileCases from "../pages/Dashboard/Modules/EFiling/FIleRegister/Files/FileCases";
import AddEditFileCase from "../pages/Dashboard/Modules/EFiling/FIleRegister/Files/FileCases/AddEditFileCase";
import { Diary } from "../pages/Dashboard/Modules/EFiling/Diary";
import FreshReceipt from "../pages/Dashboard/Modules/EFiling/FreshReceipt";
import AddEditFR from "../pages/Dashboard/Modules/EFiling/FreshReceipt/AddEditFR";
import LegislativeBillList from "../pages/Dashboard/Modules/Notice/legislationBusiness/LegislativeBill";
import AddEditLegislativeBill from "../pages/Dashboard/Modules/Notice/legislationBusiness/LegislativeBill/AddEditLegislativeBill";
import DirectorDashboard from "../pages/Dashboard/Modules/EFiling/DirectorDashboard";
import PreviousCasesHistory from "../pages/Dashboard/Modules/EFiling/FIleRegister/Files/FileCases/PreviousCasesHistory";
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
  { path: "/hrm/branches", element: <HRMBranches /> },
  { path: "/hrm/department", element: <HRMDepartment /> },
  { path: "/hrm/addeditbranches", element: <HRMAddEditBranch /> },
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
  { path: "/notice/question/detail", element: <NoticeQuestionDetail /> },

  { path: "/notice/motion", element: <MotionListing /> },
  { path: "/notice/motion/new", element: <NewMotion /> },
  { path: "/notice/motion/edit", element: <EditMotion /> },

  { path: "/notice/motion/search", element: <SearchMotion /> },
  { path: "/notice/motion/sent", element: <SentMotion /> },

  { path: "/notice/resolution", element: <NoticeDashboard /> },
  { path: "/notice/resolution/new", element: <NewResolution /> },
  { path: "/notice/resolution/search", element: <SearchResolution /> },
  { path: "/notice/resolution/sent", element: <SentResolution /> },

  { path: "/notice/legislation/government-bill", element: <GovernmentBill /> },
  { path: "/notice/legislation/private-bill", element: <PrivateBill /> },
  {
    path: "/notice/legislation/private-bill/addedit",
    element: <AddEditPrivateBill />,
  },

  { path: "/notice/legislation/legislative-bill", element: <LegislativeBillList /> },
  { path: "/notice/legislation/legislative-bill/addedit", element: <AddEditLegislativeBill /> },



  { path: "/notice/manage", element: <NoticeDashboard /> },
  { path: "/notice/manage/members", element: <Members /> },
  { path: "/notice/manage/members/addedit", element: <MembersAddEditForm /> },

  { path: "/notice/manage/sessions", element: <Sessions /> },
  { path: "/notice/manage/sessions/addedit", element: <SessionsAddEditForm /> },

  { path: "/notice/manage", element: <NoticeDashboard /> },
  {
    path: "/notice/manage/single-member-session-attendance",
    element: <NMSMemberSessionAttendance />,
  },
  {
    path: "/notice/manage/view-prorogued-sessions",
    element: <NMSProroguredSessions />,
  },

  // {
  //   path: "/notice/manage/manage-session-days",
  //   element: <ManageSessionDays />,
  // },

  { path: "/notice/speech-on-demand", element: <CMSSpeechOnDemandDashboard /> },
  {
    path: "/notice/speech-on-demand/addedit",
    element: <CMSAddEditSpeechOnDemand />,
  },
  {
    path: "/notice/research-services",
    element: <CMSResearchServicesDashboard />,
  },
  {
    path: "/notice/research-services/addedit",
    element: <CMSAddEditResearchService />,
  },
  {
    path: "/notice/manage/manage-session-days",
    element: <ManageSittingDays />,
  },
  {
    path: "/notice/manage/manage-session-days/addedit",
    element: <NMSAddEditSittingDaysForm />,
  },
  {
    path: "/notice/manage/manage-session/member-attendence",
    element: <NMSSessionAttendence />,
  },
  {
    path: "/notice/manage/manage-seating-plan",
    element: <ManageSeatingPlan />,
  },

  { path: "/notice/reports", element: <NoticeDashboard /> },
  { path: "/notice/reports/business-summary", element: <BusinessSummary /> },

  {
    path: "/notice/reports/attendence-reports",
    element: <AttendanceReport />,
  },

  {
    path: "/notice/reports/party-province-annual-attendence-reports",
    element: <PartywiseAttendenceReports />,
  },

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

  { path: "/qms/manage", element: <QMSQuestionDashboard /> },

  { path: "/qms/manage/sessions", element: <QMSSessions /> },
  { path: "/qms/manage/groups", element: <QMSGroups /> },
  { path: "/qms/manage/sessions/addedit", element: <QMSAddEditSessionsForm /> },

  { path: "/qms/manage/terms", element: <QMSTerms /> },
  { path: "/qms/manage/terms/addedit", element: <QMSAddEditTermsForm /> },

  { path: "/qms/manage/tenures", element: <QMSTenures /> },
  { path: "/qms/manage/tenures/addedit", element: <QMSAddEditTenuresForm /> },

  { path: "/qms/manage/members", element: <QMSMembers /> },
  { path: "/qms/manage/members/addedit", element: <QMSMembersAddEditForm /> },

  { path: "/qms/manage/sitting-days", element: <QMSSittingsDays /> },
  {
    path: "/qms/manage/sitting-days/addedit",
    element: <QMSAddEditSittingDaysForm />,
  },

  { path: "/qms/manage/attendence", element: <QMSAttendence /> },

  { path: "/qms/manage/ministries", element: <QMSMinistries /> },
  {
    path: "/qms/manage/ministries/addedit",
    element: <QMSAddEditMinistriesForm />,
  },

  { path: "/qms/manage/divisions", element: <QMSDivisions /> },
  {
    path: "/qms/manage/divisions/addedit",
    element: <QMSAddEditDivisionsForm />,
  },

  { path: "/qms/manage/political-party", element: <QMSPoliticalParty /> },
  {
    path: "/qms/manage/political-party/addedit",
    element: <QMSAddEditPoliticalPartyForm />,
  },

  { path: "/qms/manage/parliamentary-year", element: <QMSParliamentaryYear /> },
  {
    path: "/qms/manage/parliamentary-year/addedit",
    element: <QMSAddEditParliamentaryYearForm />,
  },

  //SMS Module routes
  { path: "/sms/dashboard", element: <SMSDashboard /> },

  //TMS Module routes
  { path: "/tms/dashboard", element: <TMSDashboard /> },
  { path: "/tms/dashboard/detail", element: <TMSDashboardDetail /> },
  { path: "/tms/question", element: <TMSQuestion /> },
  { path: "/tms/motion", element: <TMSMotion /> },
  { path: "/tms/resolution", element: <TMSResolution /> },
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

  //CMS Module routes
  { path: "/cms/dashboard", element: <CMSUserDashboard /> },
  { path: "cms/dashboard/addedit", element: <CMSAddEditUserComplaint /> },

  { path: "/cms/admin/dashboard", element: <CMSAdminDashboard /> },
  { path: "/cms/admin/dashboard/addedit", element: <CMSAdminEditComplaint /> },
  {
    path: "/cms/admin/toner-installation-report",
    element: <CMSTonerInstallationReports />,
  },

  {
    path: "/cms/dashboard/toner/addedit",
    element: <CMSAddEditTonerInstallation />,
  },

  {
    path: "/cms/admin/toner-models",
    element: <CMSTonerModels />,
  },
  {
    path: "/cms/admin/toner-models/addedit",
    element: <AddEditTonerModel />,
  },

  {
    path: "/cms/admin/inventory/dashboard",
    element: <SMSInventoryDashboard />,
  },
  { path: "/cms/admin/inventory/dashboard/add", element: <CMSAddInventory /> },
  {
    path: "/cms/admin/inventory/inventory-bill",
    element: <CMSInventoryBill />,
  },
  {
    path: "/cms/admin/inventory/inventory-bill/add",
    element: <CMSAddInventoryBill />,
  },
  { path: "/cms/admin/inventory/issue-date", element: <InventoryIssueDate /> },
  {
    path: "/cms/admin/inventory/return-date",
    element: <InventoryReturnDate />,
  },
  { path: "/cms/admin/inventory/vendor-list", element: <CMSVendorList /> },
  { path: "/cms/admin/inventory/vendor-list/edit", element: <CMSEditVendor /> },
  { path: "/cms/admin/inventory/vendor-list/add", element: <CMSEditVendor /> },

  // E-Filing
  { path: "/efiling/dashboard", element: <EFilingDashboard /> },
  { path: "/efiling/director-deshboard", element: <DirectorDashboard /> },

  { path: "/efiling/dashboard/fileDetail", element: <FileDetail /> },
  // { path: "/efiling/dashboard/addedit", element: <AddEditFileForm /> },
  // { path: "/efiling/dashboard/addeditcase", element: <AddEditCaseForm /> },
  // { path: "/efiling/dashboard/files", element: <Files /> },

  {
    path: "/efiling/dashboard/diary",
    element: <Diary />,
  },
  {
    path: "/efiling/dashboard/file-register-list",
    element: <ListFileRegister />,
  },
  {
    path: "/efiling/dashboard/addedit-file-register",
    element: <AddEditFileRegister />,
  },
  {
    path: "/efiling/dashboard/file-register-list/files-list",
    element: <ListFiles />,
  },
  {
    path: "/efiling/dashboard/file-register-list/files-list/addedit-file",
    element: <AddEditFiles />,
  },
  {
    path: "/efiling/dashboard/file-register-list/files-list/cases",
    element: <FileCases />,
  },
  {
    path: "/efiling/dashboard/file-register-list/files-list/cases-history",
    element: <PreviousCasesHistory />,
  },
  {
    path: "/efiling/dashboard/fresh-receipt",
    element: <FreshReceipt />,
  },
  {
    path: "/efiling/dashboard/fresh-receipt/addedit",
    element: <AddEditFR />,
  },
  {
    path: "/efiling/dashboard/file-register-list/files-list/addedit-case",
    element: <AddEditFileCase />,
  },
  {
    path: "/efiling/dashboard/file-heading-list",
    element: <FileHeadingList />,
  },
  {
    path: "/efiling/dashboard/addedit-file-heading",
    element: <AddEditFIleHeading />,
  },
];
