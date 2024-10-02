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
// import ManageSeatingPlan from "../pages/Dashboard/Modules/Notice/SeatingPlan/ManageSeatingPlan";
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
import CMSResearchServicesDashboard from "../pages/Dashboard/Modules/Notice/ResearchServices";
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
import PreviousCasesHistory from "../pages/Dashboard/Modules/EFiling/FIleRegister/Files/FileCases/PreviousCasesHistory";
import NoticeResolutionDetail from "../pages/Dashboard/Modules/Notice/Resolution/ResolutionDetail";
import PreviousFRsHistory from "../pages/Dashboard/Modules/EFiling/FreshReceipt/PreviousFRsHistory";
import FRDetail from "../pages/Dashboard/Modules/EFiling/FreshReceipt/FRDetail";
import ApprovedCasesHistory from "../pages/Dashboard/Modules/EFiling/FIleRegister/Files/FileCases/ApprovedCases";
import NoticeSummary from "../pages/Dashboard/Modules/QMS/Reports/NoticeSummary";
import RemoveQuestion from "../pages/Dashboard/Modules/QMS/Manage/RemoveQuestion";
import QuestionGroupDiary from "../pages/Dashboard/Modules/QMS/Reports/QuestionGroupDiary";
import QuestionPendingUnderProcess from "../pages/Dashboard/Modules/QMS/Reports/QuestionPendingUnderProcess";
import SupplementaryList from "../pages/Dashboard/Modules/QMS/Reports/QuestionList/SupplementaryList";
import QMSRotaList from "../pages/Dashboard/Modules/QMS/Reports/RotaList";
import RotaListFurtherDetails from "../pages/Dashboard/Modules/QMS/Reports/RotaList/RotaListFurtherDetails";
import EventCalendar from "../pages/Dashboard/Modules/Notice/EventCalendar";
import AddEditEventCalendar from "../pages/Dashboard/Modules/Notice/EventCalendar/AddEditEventCalendar";
// import ExternalBranchFR from "../pages/Dashboard/Modules/EFiling/FreshReceipt/ExternalBranchFR";
// import AddEditExternalBranchFR from "../pages/Dashboard/Modules/EFiling/FreshReceipt/ExternalBranchFR/AddEditExternalBranchFr";
// import UpdatedDashboard from "../pages/Dashboard/Modules/EFiling/updatedDashboard";
import MainDashboard from "../pages/Dashboard/Modules/EFiling/MainDashBoard";
import SMSMembers from "../pages/Dashboard/Modules/SMS/Members";
import SMSMembersAddEditForm from "../pages/Dashboard/Modules/SMS/Members/AddEditMembers";

// import AllLegislationBillList from "../pages/Dashboard/Modules/LGMS/Bills/LegislationBills";
import NewLegislationNABill from "../pages/Dashboard/Modules/LGMS/Bills/NABills/AddNABills";
import NewLegislationSenateBill from "../pages/Dashboard/Modules/LGMS/Bills/SenateBills/AddSenateBills";
import UpdateBills from "../pages/Dashboard/Modules/LGMS/Bills/NABills/EditNABills";
import EditSenateBill from "../pages/Dashboard/Modules/LGMS/Bills/SenateBills/EditSenateBills";

// LGMS ROUTES START
import LegislationManagementSystemDashboard from "../pages/Dashboard/Modules/LGMS";
import AllGovernmentSenateBills from "../pages/Dashboard/Modules/LGMS/Bills/GovernmentBill/IntroducedinSenate/index.js";
import AllGovernmentRecievedNABills from "../pages/Dashboard/Modules/LGMS/Bills/GovernmentBill/RecievefromNA/index.js";
import AllPrivateMemberSenateBills from "../pages/Dashboard/Modules/LGMS/Bills/PrivateMemberBill/IntroducedInSenate/index.js";
import AllPrivateMemberBillFromNA from "../pages/Dashboard/Modules/LGMS/Bills/PrivateMemberBill/RecievedFromNA/index.js";
import AllOrdinanceList from "../pages/Dashboard/Modules/LGMS/Ordinance/OrdinanceList";
import AddOrdinance from "../pages/Dashboard/Modules/LGMS/Ordinance/AddOrdinance";
import EditOrdinance from "../pages/Dashboard/Modules/LGMS/Ordinance/EditOrdinance";
import SearchOrdinance from "../pages/Dashboard/Modules/LGMS/Ordinance/SearchOrdinance";

//--->Manage Part
import AllBillStatuses from "../pages/Dashboard/Modules/LGMS/Manage/ManageBillStatuses";
import LGMSCommitteess from "../pages/Dashboard/Modules/LGMS/Manage/ManageCommittees/index.js";
import LGMSAddEditCommittees from "../pages/Dashboard/Modules/LGMS/Manage/ManageCommittees/AddEditCommittees/index.js";
import AllManageCommitteeRecoomendation from "../pages/Dashboard/Modules/LGMS/Manage/CommitteeRecomendation/index.js";
import LGMSAddEditCommitteesRecommendation from "../pages/Dashboard/Modules/LGMS/Manage/CommitteeRecomendation/AddEditCommitteeRecomendation/index.js";
import LGMSMinisters from "../pages/Dashboard/Modules/LGMS/Manage/Ministers/index.js";
import LGMSMinisterAddEditForm from "../pages/Dashboard/Modules/LGMS/Manage/Ministers/AddEditMinisters/index.js";
import LGMSMembers from "../pages/Dashboard/Modules/LGMS/Manage/Members";
import LGMSMembersAddEditForm from "../pages/Dashboard/Modules/LGMS/Manage/Members/AddEditMembers";
import LGMSParliamentaryYear from "../pages/Dashboard/Modules/LGMS/Manage/ParliamentaryYear";
import LGMSAddEditParliamentaryYearForm from "../pages/Dashboard/Modules/LGMS/Manage/ParliamentaryYear/AddEditParliamentaryYear";
import LGMSSessions from "../pages/Dashboard/Modules/LGMS/Manage/Sessions";
import LGMSAddEditSessionsForm from "../pages/Dashboard/Modules/LGMS/Manage/Sessions/AddEditSessions";
import LGMSTenures from "../pages/Dashboard/Modules/LGMS/Manage/Tenures";
import LGMSAddEditTenuresForm from "../pages/Dashboard/Modules/LGMS/Manage/Tenures/AddEditTenures";
import LGMSTerms from "../pages/Dashboard/Modules/LGMS/Manage/Terms";
import LGMSAddEditTermsForm from "../pages/Dashboard/Modules/LGMS/Manage/Terms/AddEditTerms";
import LGMSPrivateBill from "../pages/Dashboard/Modules/LGMS/LGMSPrivateBill";

import LGMSAddEditPrivateBill from "../pages/Dashboard/Modules/LGMS/LGMSPrivateBill/LGMSAddEditPrivateBill";
import LGMSAddEditLegislativeBill from "../pages/Dashboard/Modules/LGMS/LGMSLegislativeBill/LGMSAddEditLegislativeBill";
import TelecastingDashboard from "../pages/Dashboard/Modules/Telecasting";
import TelecastingSpeechOnDemand from "../pages/Dashboard/Modules/Telecasting/SpeechOnDemand";
import TelecastingAddEditSpeechOnDemand from "../pages/Dashboard/Modules/Telecasting/SpeechOnDemand/AddEditSpeechOnDemand";
import ResearchDashboard from "../pages/Dashboard/Modules/Research";
import ResearchBRServices from "../pages/Dashboard/Modules/Research/ResearchServices";
import ResearchAddEditResearchService from "../pages/Dashboard/Modules/Research/ResearchServices/AddEditResearchService";
import CMSBranches from "../pages/Dashboard/Modules/CMS/AdminCMS/BranchesCMS";
import CMSAddEditBranch from "../pages/Dashboard/Modules/CMS/AdminCMS/BranchesCMS/AddEditBranchCMS";
import AddEditCorrespondence from "../pages/Dashboard/Modules/EFiling/FIleRegister/Files/FileCases/AddEditFileCase/AddEditCorrespondence";
import CommitteesManagementSystemDashboard from "../pages/Dashboard/Modules/Committees";
import CommitteesManagementSystemCommittees from "../pages/Dashboard/Modules/Committees/Committees";
import AddEditCommittees from "../pages/Dashboard/Modules/Committees/Committees/AddEditCommittees";
import SearchCommittees from "../pages/Dashboard/Modules/Committees/Committees/SearchCommittees";
import CommitteesManagementSystemCommitteeRooms from "../pages/Dashboard/Modules/Committees/CommitteesRooms";
import CommitteesManagementSystemBookingCommitteeRooms from "../pages/Dashboard/Modules/Committees/CommitteesRooms/BookingCommitteeRooms";
import CommitteesManagementSystemAddEditBookinginCommitteeRooms from "../pages/Dashboard/Modules/Committees/CommitteesRooms/BookingCommitteeRooms/AddEditBookingCommitteeRooms";
import AddEditCommitteeRooms from "../pages/Dashboard/Modules/Committees/CommitteesRooms/AddEditCommitteeRooms";
import CommitteesManagementSystemCommitteeMembers from "../pages/Dashboard/Modules/Committees/Committees/CommitteeMembers";
import CommitteesManagementSystemMeetings from "../pages/Dashboard/Modules/Committees/Meetings";
import SearchMeetings from "../pages/Dashboard/Modules/Committees/Meetings/SearchMeeting";
import CommitteesManagementSystemPreviousQuestionHistory from "../pages/Dashboard/Modules/Committees/Committees/RecievedBusinessPreviousHistory/Questions";
import CommitteesManagementSystemPreviousMotionHistory from "../pages/Dashboard/Modules/Committees/Committees/RecievedBusinessPreviousHistory/Motions";
import CommitteesManagementSystemPreviousResolutionHistory from "../pages/Dashboard/Modules/Committees/Committees/RecievedBusinessPreviousHistory/Resolutions";
import CommitteesManagementSystemPreviousNoticesHistory from "../pages/Dashboard/Modules/Committees/Committees/RecievedBusinessPreviousHistory/Notices";
import CommitteesManagementSystemPreviousBillsHistory from "../pages/Dashboard/Modules/Committees/Committees/RecievedBusinessPreviousHistory/Bills";
import LDUDashboard from "../pages/Dashboard/Modules/LDU";
import QMSNewResolution from "../pages/Dashboard/Modules/QMS/Resolution/NewResolution";
import LDULegislativeBill from "../pages/Dashboard/Modules/LDU/LDULegislativeBill";
import LDUAddEditLegislativeBill from "../pages/Dashboard/Modules/LDU/LDULegislativeBill/LDUAddEditLegislativeBill";
import LDUPrivateBill from "../pages/Dashboard/Modules/LDU/LDUPrivateBill";
import LDUAddEditPrivateBill from "../pages/Dashboard/Modules/LDU/LDUPrivateBill/LDUAddEditPrivateBill";
import AllFilesListing from "../pages/Dashboard/Modules/LDU/LawActs/AllListing";
import EditLawActsBill from "../pages/Dashboard/Modules/LDU/LawActs/AllListing/EditLawActsBill";
import AddEditRotaList from "../pages/Dashboard/Modules/QMS/Reports/RotaList/AddEditRotaList.js";
import SeatingPlanTest from "../pages/Dashboard/Modules/Notice/SeatingPlan/ManageSeatingPlan/SeatPlanTest.js";
import QMSBallotResolutionList from "../pages/Dashboard/Modules/QMS/Resolution/ResolutionList/BallotResolutionList/index.js";
import PreviewBallotResolutionList from "../pages/Dashboard/Modules/QMS/Resolution/ResolutionList/PreviewBallotResolutionList/index.js";
import MMSMotionListReport from "../pages/Dashboard/Modules/MMS/Reports/MotionListReport/index.js";
import MMSBallotMotionList from "../pages/Dashboard/Modules/MMS/Reports/MotionListReport/BallotMotionList/index.js";
import PreviewBallotMotionList from "../pages/Dashboard/Modules/MMS/Reports/MotionListReport/PreviewBallotMotionList/index.js";
import AllBallotResolutionList from "../pages/Dashboard/Modules/QMS/Resolution/AllBallotResolutionList/index.js";
import PreviewResolutionList from "../pages/Dashboard/Modules/QMS/SearchResolution/PreviewResolution/index.js";
import PreviewQuestionList from "../pages/Dashboard/Modules/QMS/Reports/QuestionList/PreviewQuestionList/index.js";
import QMSResolutionSummaryDetail from "../pages/Dashboard/Modules/QMS/Resolution/ResolutionSummaryDetail/index.js";
import FlagsList from "../pages/Dashboard/Modules/EFiling/Flags/index.js";
import AddEditFlags from "../pages/Dashboard/Modules/EFiling/Flags/AddEditFIags/index.js";
import MotionPreviewPDF from "../components/MotionPDFPreview/index.js";
import PreviewSuplementryList from "../pages/Dashboard/Modules/QMS/Reports/QuestionList/PreviewSuplementryList/index.js";
import TransportDashboard from "../pages/Dashboard/Modules/Transport/index.js";
import SearchLegislationGovernmentBills from "../pages/Dashboard/Modules/LGMS/Bills/SearchBills/GovernmentBills/index.js";
import SearchLegislationPrivateMemberBill from "../pages/Dashboard/Modules/LGMS/Bills/SearchBills/PrivateMemberBills/index.js";
import LogBookList from "../pages/Dashboard/Modules/Transport/LogBook/index.js";
import AddEditLogBook from "../pages/Dashboard/Modules/Transport/LogBook/AddEditLogBook/index.js";
import VehicleMovementList from "../pages/Dashboard/Modules/Transport/VehicleMovement/index.js";
import AddEditVehicleMovement from "../pages/Dashboard/Modules/Transport/VehicleMovement/AddEditVehicleMovement/index.js";
import FleetManagementList from "../pages/Dashboard/Modules/Transport/FleetManagement/index.js";
import AddEditFleetManagement from "../pages/Dashboard/Modules/Transport/FleetManagement/AddEditFleetManagement/index.js";
import PurchasesMadeList from "../pages/Dashboard/Modules/Transport/LogBook/PurchasesMade/index.js";
import AddEditPurchasesMade from "../pages/Dashboard/Modules/Transport/LogBook/PurchasesMade/AddEditPurchasesMade/index.js";
import PetrolMileageList from "../pages/Dashboard/Modules/Transport/LogBook/PetrolMileage/index.js";
import AddEditPetrolMileage from "../pages/Dashboard/Modules/Transport/LogBook/PetrolMileage/AddEditPetrolMileage/index.js";
import AddVehicles from "../pages/Dashboard/Modules/Transport/DriversAndVehicles/Vehicles/AddVehicles/index.js";
import Vehicle from "../pages/Dashboard/Modules/Transport/DriversAndVehicles/Vehicles";

import { elementClosest } from "@fullcalendar/core/internal";
import AddEditDrivers from "../pages/Dashboard/Modules/Transport/DriversAndVehicles/Drivers/AddEditDrivers/index.js";
import Drivers from "../pages/Dashboard/Modules/Transport/DriversAndVehicles/Drivers/index.js";

import ResolutionDataPreview from "../pages/Dashboard/Modules/QMS/Resolution/ResolutionDataPrintPreview/index.js";
import QuestionDataPreviewPDF from "../pages/Dashboard/Modules/QMS/Question/PreviewQuestionDataPDF/index.js";
import MainDashBoardDemo from "../pages/Dashboard/Modules/EFiling/MainDashBoardDemo/index.js";
import SumDriverVehicle from "../pages/Dashboard/Modules/Transport/Summary/Driv-Vehicle/index.js";
import Poll from "../pages/Dashboard/Modules/Transport/Summary/Poll/index.js";
import MakeModelWise from "../pages/Dashboard/Modules/Transport/Summary/MakeModel/index.js";
import QuestionAnualReport from "../pages/Dashboard/Modules/QMS/QuestionAnnualReport/index.js";
import { AnnualPdf } from "../pages/Dashboard/Modules/QMS/QuestionAnnualReport/QuestionAnnualPdfPreview/index.js";
import AllBallotMotionList from "../pages/Dashboard/Modules/MMS/Reports/BallotList/index.js";
import PdfAllQuestion from "../pages/Dashboard/Modules/Notice/Question/Sent/pdfAllQuestion.js";
import LeaveRequests from "../pages/Dashboard/Modules/Notice/LeaveRequests/index.js";
import AddEditLeaveRequests from "../pages/Dashboard/Modules/Notice/LeaveRequests/AddEditLeaveRequests/index.js";
import MMSReviveMotion from "../pages/Dashboard/Modules/MMS/Motion/ReviveMotion/index.js";
import pdfPreviewMotion from "../pages/Dashboard/Modules/Notice/Motion/pdfPreview.js";
import PdfPreviewMotion from "../pages/Dashboard/Modules/Notice/Motion/pdfPreview.js";
import PdfPreviewResolution from "../pages/Dashboard/Modules/Notice/Resolution/PdfPreviewResolution.js";
import Miscellaneous from "../pages/Dashboard/Modules/MMS/Miscellaneous/index.js";
import MiscelleneousPDFPreview from "../pages/Dashboard/Modules/MMS/Miscellaneous/MiscelleneousPDFPreview.js";
import PDFAllBusinessSummary from "../pages/Dashboard/Modules/Notice/Reports/BusinessSummary/SummaryPDF/index.js";
import QMSGroupMemberQuestion from "../pages/Dashboard/Modules/QMS/Reports/GroupMemberQuestion/index.js";
import PreviewGroupMemberPDF from "../pages/Dashboard/Modules/QMS/Reports/GroupMemberQuestion/PreviewGroupMemberPDF.js";
import PreviewGroupMinistryPDF from "../pages/Dashboard/Modules/QMS/Reports/GroupMemberQuestion/PreviewGroupMinistryPDF.js";
import GroupMinistryQuestion from "../pages/Dashboard/Modules/QMS/Reports/GroupMinistryQuestion/index.js";
import VehiclesInformation from "../pages/Dashboard/Modules/Transport/Vehicles/index.js";
import VehiclesProfile from "../pages/Dashboard/Modules/Transport/Vehicles/VehiclesProfile/index.js";
import VehiclesLogBook from "../pages/Dashboard/Modules/Transport/Vehicles/VehiclesLogBook/index.js";
import VehiclesMovementRegister from "../pages/Dashboard/Modules/Transport/Vehicles/VehiclesMovementRegister/index.js";
import VehiclesOperationalStatus from "../pages/Dashboard/Modules/Transport/Vehicles/VehiclesOperationalStatus/index.js";
import VehiclePurchases from "../pages/Dashboard/Modules/Transport/Vehicles/VehiclesPurchases/index.js";
import DriverInformstion from "../pages/Dashboard/Modules/Transport/VehicleDrivers/index.js";
import DriversProfile from "../pages/Dashboard/Modules/Transport/VehicleDrivers/DriversProfile/index.js";
import DriverDeputedWithOfficer from "../pages/Dashboard/Modules/Transport/VehicleDrivers/DeputedWithOfficer/index.js";
import DriverDeputedOnVehicleNo from "../pages/Dashboard/Modules/Transport/VehicleDrivers/DeputedOnVehicleNO/index.js";
import DriversLicenseType from "../pages/Dashboard/Modules/Transport/VehicleDrivers/DriversLicenseType/index.js";
import DriversMedicalReport from "../pages/Dashboard/Modules/Transport/VehicleDrivers/MedicalReport/index.js";
import AddEditVehicleProfile from "../pages/Dashboard/Modules/Transport/Vehicles/VehiclesProfile/AddEditVehicleProfile/index.js";
import EditAddLogBook from "../pages/Dashboard/Modules/Transport/Vehicles/VehiclesLogBook/AddEditProfile/index.js";
import EditAddVehMov from "../pages/Dashboard/Modules/Transport/Vehicles/VehiclesMovementRegister/AddEditVehicleMov/index.js";
import AddEditVehOpertional from "../pages/Dashboard/Modules/Transport/Vehicles/VehiclesOperationalStatus/AddEditVehOperational/index.js";
import AddEditVehiclePurchase from "../pages/Dashboard/Modules/Transport/Vehicles/VehiclesPurchases/AddEditVehPurchase/index.js";
import AddEditDriversProfile from "../pages/Dashboard/Modules/Transport/VehicleDrivers/DriversProfile/AddEditDriverProfile/index.js";
import AddEditDeputedWithOff from "../pages/Dashboard/Modules/Transport/VehicleDrivers/DeputedWithOfficer/AddEditDeputedWithOff/index.js";
import AddEditDepOnVehNo from "../pages/Dashboard/Modules/Transport/VehicleDrivers/DeputedOnVehicleNO/AddEditDepOnVehNo/index.js";
import AddEditDriverLicense from "../pages/Dashboard/Modules/Transport/VehicleDrivers/DriversLicenseType/AddEditDriverLicense/index.js";
import AddEditMedicalRepo from "../pages/Dashboard/Modules/Transport/VehicleDrivers/MedicalReport/AddEditMedicalRep/index.js";
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
  { path: "/notice/question/pdf-allQuestion", element: <PdfAllQuestion /> },
  { path: "/notice/question/detail", element: <NoticeQuestionDetail /> },

  { path: "/notice/motion", element: <MotionListing /> },
  { path: "/notice/motion/pdf-preview", element: <PdfPreviewMotion /> },
  { path: "/notice/motion/new", element: <NewMotion /> },
  { path: "/notice/motion/edit", element: <EditMotion /> },

  { path: "/notice/motion/search", element: <SearchMotion /> },
  { path: "/notice/motion/sent", element: <SentMotion /> },

  { path: "/notice/resolution", element: <NoticeDashboard /> },
  {
    path: "/notice/resolution/pdf-preview-resolution",
    element: <PdfPreviewResolution />,
  },
  { path: "/notice/resolution/new", element: <NewResolution /> },
  { path: "/notice/resolution/edit", element: <NoticeResolutionDetail /> },
  { path: "/notice/resolution/search", element: <SearchResolution /> },
  { path: "/notice/resolution/sent", element: <SentResolution /> },

  { path: "/notice/legislation/government-bill", element: <GovernmentBill /> },
  // Not useable
  // { path: "/notice/legislation/private-bill", element: <PrivateBill /> },

  // {
  //   path: "/notice/legislation/private-bill/addedit",
  //   element: <AddEditPrivateBill />,
  // },

  {
    path: "/notice/legislation/private-bill",
    element: <LegislativeBillList />,
  },
  {
    path: "/notice/legislation/private-bill/addedit",
    element: <AddEditLegislativeBill />,
  },

  { path: "/notice/manage", element: <NoticeDashboard /> },
  { path: "/notice/manage/members", element: <Members /> },
  { path: "/notice/manage/members/addedit", element: <MembersAddEditForm /> },

  { path: "/notice/manage/sessions", element: <Sessions /> },
  { path: "/notice/manage/sessions/addedit", element: <SessionsAddEditForm /> },

  { path: "/notice/manage", element: <NoticeDashboard /> },
  { path: "/notice/leaveRequests", element: <LeaveRequests /> },
  { path: "/notice/leaveRequests/addedit", element: <AddEditLeaveRequests /> },
  {
    path: "/notice/manage/single-member-session-attendance",
    element: <NMSMemberSessionAttendance />,
  },
  {
    path: "/notice/manage/view-prorogued-sessions",
    element: <NMSProroguredSessions />,
  },
  {
    path: "/notice/manage/view-prorogued-sessions",
    element: <NMSProroguredSessions />,
  },

  // {
  //   path: "/notice/manage/manage-session-days",
  //   element: <ManageSessionDays />,
  // },
  {
    path: "/notice/research-services",
    element: <CMSResearchServicesDashboard />,
  },
  {
    path: "/notice/research-services/addedit",
    element: <CMSAddEditResearchService />,
  },
  {
    path: "/notice/event-calendar",
    element: <EventCalendar />,
  },
  {
    path: "/notice/event-calendar/addedit",
    element: <AddEditEventCalendar />,
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
    element: <SeatingPlanTest />,
    // element: <ManageSeatingPlan />,
  },

  { path: "/notice/reports", element: <NoticeDashboard /> },
  { path: "/notice/reports/business-summary", element: <BusinessSummary /> },
  {
    path: "/notice/reports/business-summary/preview-pdf",
    element: <PDFAllBusinessSummary />,
  },

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

  // { path: "/mms/motion", element: <MMSMotionDashboard /> },
  { path: "/mms/motion/new", element: <MMSNewMotion /> },
  { path: "/mms/motion/search", element: <MMSSearchMotion /> },
  { path: "/mms/motion/detail", element: <MMSMotionDetail /> },
  { path: "/mms/motion/list", element: <MMSMotionList /> },
  { path: "/mms/motion/preview-pdf", element: <MotionPreviewPDF /> },
  { path: "/mms/motion/revive", element: <MMSReviveMotion /> },

  { path: "/mms/question/search", element: <MMSSearchQuestion /> },
  { path: "/mms/resolution/search", element: <MMSSearchResolution /> },

  // { path: "/mms/reports", element: <MMSMotionDashboard /> },
  { path: "/mms/reports/motion-summary", element: <MMSMotionSummery /> },
  { path: "/mms/reports/motion-list", element: <MMSMotionListReport /> },
  { path: "/mms/motion-miscelleneuos", element: <Miscellaneous /> },
  {
    path: "/mms/motion-miscelleneuos/pdf-preview",
    element: <MiscelleneousPDFPreview />,
  },
  {
    path: "/mms/reports/motion-list/ballot/:id",
    element: <MMSBallotMotionList />,
  },
  {
    path: "/mms/reports/motion-list/ballot/preview-pdf",
    element: <PreviewBallotMotionList />,
  },
  {
    path: "/mms/reports/motion-list/ballot/list",
    element: <AllBallotMotionList />,
  },

  //QMS Module
  { path: "/qms/dashboard", element: <QMSQuestionDashboard /> },
  { path: "/qms/search/question", element: <QMSSearchQuestion /> },
  { path: "/qms/search/resolution", element: <QMSSerchResolution /> },
  {
    path: "/qms/reports/question-group-diary",
    element: <QuestionGroupDiary />,
  },
  {
    path: "/qms/reports/qroup-member-question",
    element: <QMSGroupMemberQuestion />,
  },
  {
    path: "/qms/reports/qroup-ministry-question",
    element: <GroupMinistryQuestion />,
  },
  {
    path: "/qms/reports/qroup-member-question/preview-pdf",
    element: <PreviewGroupMemberPDF />,
  },
  {
    path: "/qms/reports/qroup-ministry-question/preview-pdf",
    element: <PreviewGroupMinistryPDF />,
  },
  {
    path: "/qms/reports/resolution-summary",
    element: <QMSResolutionSummary />,
  },
  { path: "/qms/reports/question-summary", element: <QMSQuestionSummary /> },
  { path: "/qms/reports/notice-summary", element: <NoticeSummary /> },
  {
    path: "/qms/reports/question-pending-under-process",
    element: <QuestionPendingUnderProcess />,
  },
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
    path: "/qms/search/resolution/list/preview",
    element: <PreviewResolutionList />,
  },
  {
    path: "/qms/search/resolution/preview-pdf",
    element: <ResolutionDataPreview />,
  },
  {
    path: "/qms/search/question/preview-pdf",
    element: <QuestionDataPreviewPDF />,
  },
  {
    path: "/qms/reports/question-list",
    element: <QMSReportQuestionList />,
  },
  {
    path: "/qms/reports/question-list/supplementary",
    element: <SupplementaryList />,
  },

  {
    path: "/qms/reports/rota-list",
    element: <QMSRotaList />,
  },
  {
    path: "/qms/reports/rota-list/further-details",
    element: <RotaListFurtherDetails />,
  },
  {
    path: "/qms/reports/rota-list/addedit",
    element: <AddEditRotaList />,
  },

  { path: "/qms/resolution", element: <QMSQuestionDashboard /> },
  { path: "/qms/rsolution/list", element: <QMSResolutionList /> },
  {
    path: "/qms/rsolution/list/ballot/:id",
    element: <QMSBallotResolutionList />,
  },
  {
    path: "/qms/rsolution/list/ballot/preview-pdf",
    element: <PreviewBallotResolutionList />,
  },
  { path: "/qms/resolution/delete", element: <QMSDeleteResolution /> },
  { path: "/qms/resolution/ballot/list", element: <AllBallotResolutionList /> },
  {
    path: "/qms/resolution/summary-detail",
    element: <QMSResolutionSummaryDetail />,
  },

  { path: "/qms/question", element: <QMSQuestionDashboard /> },
  { path: "/qms/question/list", element: <QMSQuestionList /> },
  { path: "/qms/question/detail", element: <QMSQuestionDetail /> },
  { path: "/qms/question/new", element: <QMSNewQuestion /> },
  { path: "/qms/question/delete", element: <QMSDeleteQuestion /> },

  { path: "/qms/resolution", element: <QMSQuestionDashboard /> },
  { path: "/qms/resolution/list", element: <QMSResolutionList /> },
  { path: "/qms/resolution/delete", element: <QMSDeleteResolution /> },
  { path: "/qms/resolution/new", element: <QMSNewResolution /> },

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

  {
    path: "/qms/manage/remove-question",
    element: <RemoveQuestion />,
  },
  {
    path: "/qms/questionList/priveiw-question-list",
    element: <PreviewQuestionList />,
  },
  {
    path: "/qms/questionList/priveiw-suplementry-list",
    element: <PreviewSuplementryList />,
  },
  {
    path: "/qms/questionList/question-anual-report",
    element: <QuestionAnualReport />,
  },
  {
    path: "/qms/questionList/question-anual-report-pdf-preview",
    element: <AnnualPdf />,
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

  { path: "/sms/members", element: <SMSDashboard /> },
  { path: "/sms/members/list", element: <SMSMembers /> },
  { path: "/sms/members/addedit", element: <SMSMembersAddEditForm /> },

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
  { path: "/cms/admin/branch/list", element: <CMSBranches /> },
  { path: "/cms/admin/branch/addedit", element: <CMSAddEditBranch /> },

  // E-Filing
  // { path: "/efiling/dashboard", element: <DirectorDashboard /> },
  // { path: "/efiling/dashboard", element: <MainDashboard /> },
  { path: "/efiling/dashboard", element: <MainDashBoardDemo /> },
  // { path: "/efiling/dashboard", element: <UpdatedDashboard /> },
  { path: "/efiling/director-dashboard", element: <EFilingDashboard /> },

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
    path: "/efiling/dashboard/file-register-list/files-list/cases/approved",
    element: <ApprovedCasesHistory />,
  },
  {
    path: "/efiling/dashboard/fresh-receipt",
    element: <FreshReceipt />,
  },
  // {
  //   path: "/efiling/dashboard/external/fresh-receipt",
  //   element: <ExternalBranchFR />,
  // },
  {
    path: "/efiling/dashboard/fresh-receipt/history",
    element: <PreviousFRsHistory />,
  },
  {
    path: "/efiling/dashboard/fresh-receipt/addedit",
    element: <AddEditFR />,
  },
  // {
  //   path: "/efiling/dashboard/external/branch/fresh-receipt/addedit",
  //   element: <AddEditExternalBranchFR />,
  // },
  {
    path: "/efiling/dashboard/fresh-receipt/frdetail",
    element: <FRDetail />,
  },
  {
    path: "/efiling/dashboard/file-register-list/files-list/addedit-case",
    element: <AddEditFileCase />,
  },
  {
    path: "/efiling/dashboard/file-register-list/files-list/addedit-case/addedit-correspondence",
    element: <AddEditCorrespondence />,
  },
  {
    path: "/efiling/dashboard/file-heading-list",
    element: <FileHeadingList />,
  },
  {
    path: "/efiling/dashboard/addedit-file-heading",
    element: <AddEditFIleHeading />,
  },

  {
    path: "/efiling/dashboard/flags",
    element: <FlagsList />,
  },
  {
    path: "/efiling/dashboard/addedit-flags",
    element: <AddEditFlags />,
  },

  // Legislation Routes Start

  {
    path: "lgms/dashboard",
    element: <LegislationManagementSystemDashboard />,
  },

  {
    path: "/lgms/dashboard/bills/legislation-bills/government-bills/introduced-in-senate",
    element: <AllGovernmentSenateBills />,
  },
  {
    path: "/lgms/dashboard/bills/legislation-bills/government-bills/recieved-from-na",
    element: <AllGovernmentRecievedNABills />,
  },
  {
    path: "/lgms/dashboard/bills/legislation-bills/private-member-bills/introduced-in-senate",
    element: <AllPrivateMemberSenateBills />,
  },
  {
    path: "/lgms/dashboard/bills/legislation-bills/private-member-bills/recieved-from-na",
    element: <AllPrivateMemberBillFromNA />,
  },

  {
    path: "/lgms/dashboard/bills/search-government-bills",
    element: <SearchLegislationGovernmentBills />,
  },
  {
    path: "/lgms/dashboard/bills/search-private-bills",
    element: <SearchLegislationPrivateMemberBill />,
  },
  {
    path: "/lgms/dashboard/ordinances/ordinance-list",
    element: <AllOrdinanceList />,
  },
  {
    path: "/lgms/dashboard/ordinances/search-ordinance",
    element: <SearchOrdinance />,
  },
  {
    path: "/lgms/dashboard/ordinances/add/ordinance",
    element: <AddOrdinance />,
  },
  {
    path: "/lgms/dashboard/ordinances/edit/ordinance",
    element: <EditOrdinance />,
  },

  {
    path: "/lgms/dashboard/bill/manage-bill-statuses",
    element: <AllBillStatuses />,
  },
  {
    path: "/lgms/dashboard/manage/committees/list",
    element: <LGMSCommitteess />,
  },
  {
    path: "/lgms/dashboard/bill/manage-committeess/addedit",
    element: <LGMSAddEditCommittees />,
  },
  {
    path: "/lgms/dashboard/manage/committee-recomendation/list",
    element: <AllManageCommitteeRecoomendation />,
  },
  {
    path: "/lgms/dashboard/manage/committee-recomendation/addedit",
    element: <LGMSAddEditCommitteesRecommendation />,
  },

  {
    path: "/lgms/dashboard/manage/ministers/list",
    element: <LGMSMinisters />,
  },
  {
    path: "/lgms/dashboard/manage/ministers/addedit",
    element: <LGMSMinisterAddEditForm />,
  },
  {
    path: "/lgms/dashboard/manage/members/list",
    element: <LGMSMembers />,
  },
  {
    path: "/lgms/dashboard/manage/members/addedit",
    element: <LGMSMembersAddEditForm />,
  },
  {
    path: "/lgms/dashboard/manage/parliamentary-year/list",
    element: <LGMSParliamentaryYear />,
  },
  {
    path: "/lgms/dashboard/manage/parliamentary-year/addedit",
    element: <LGMSAddEditParliamentaryYearForm />,
  },
  {
    path: "/lgms/dashboard/manage/session/list",
    element: <LGMSSessions />,
  },

  {
    path: "/lgms/dashboard/manage/session/addedit",
    element: <LGMSAddEditSessionsForm />,
  },

  {
    path: "/lgms/dashboard/manage/tenures/list",
    element: <LGMSTenures />,
  },
  {
    path: "/lgms/dashboard/manage/tenures/addedit",
    element: <LGMSAddEditTenuresForm />,
  },

  {
    path: "/lgms/dashboard/manage/terms/list",
    element: <LGMSTerms />,
  },
  {
    path: "/lgms/dashboard/manage/terms/addedit",
    element: <LGMSAddEditTermsForm />,
  },

  {
    path: "/lgms/legislation/private-bill",
    element: <LGMSPrivateBill />,
  },

  {
    path: "/lgms/dashboard/bills/NA-bills",
    element: <NewLegislationNABill />,
  },
  {
    path: "/lgms/dashboard/bills/edit/NA-bills/",
    element: <UpdateBills />,
  },
  {
    path: "/lgms/dashboard/bills/senate-bills",
    element: <NewLegislationSenateBill />,
  },
  {
    path: "/lgms/dashboard/bills/edit/senate-bills",
    element: <EditSenateBill />,
  },

  {
    path: "/lgms/legislation/private-bill/addedit",
    element: <LGMSAddEditPrivateBill />,
  },
  // {
  //   path: "/lgms/legislation/legislative-bill",
  //   element: <LGMSLegislativeBill />,
  // },

  {
    path: "/lgms/legislation/legislative-bill/addedit",
    element: <LGMSAddEditLegislativeBill />,
  },

  // End of LGMS Routes

  // Telecasting branch
  { path: "/telecasting/dashboard", element: <TelecastingDashboard /> },
  {
    path: "/telecasting/speech-on-demand",
    element: <TelecastingSpeechOnDemand />,
  },
  {
    path: "/telecasting/speech-on-demand/addedit",
    element: <TelecastingAddEditSpeechOnDemand />,
  },

  // Research branch
  { path: "/research/dashboard", element: <ResearchDashboard /> },
  { path: "/research/research-services", element: <ResearchBRServices /> },
  {
    path: "/research/research-services/addedit",
    element: <ResearchAddEditResearchService />,
  },

  // Committees Routes Start

  {
    path: "/committees/dashboard",
    element: <CommitteesManagementSystemDashboard />,
  },
  {
    path: "/committees/dashboard/received-business-history/questions",
    element: <CommitteesManagementSystemPreviousQuestionHistory />,
  },
  {
    path: "/committees/dashboard/received-business-history/motions",
    element: <CommitteesManagementSystemPreviousMotionHistory />,
  },
  {
    path: "/committees/dashboard/received-business-history/resolutions",
    element: <CommitteesManagementSystemPreviousResolutionHistory />,
  },
  {
    path: "/committees/dashboard/received-business-history/notices",
    element: <CommitteesManagementSystemPreviousNoticesHistory />,
  },
  {
    path: "/committees/dashboard/received-business-history/bills",
    element: <CommitteesManagementSystemPreviousBillsHistory />,
  },
  {
    path: "/committees/dashboard/committees/committees-list",
    element: <CommitteesManagementSystemCommittees />,
  },
  {
    path: "/committees/dashboard/committees/addedit",
    element: <AddEditCommittees />,
  },
  {
    path: "/committees/dashboard/committees/committee-members",
    element: <CommitteesManagementSystemCommitteeMembers />,
  },
  {
    path: "/committees/dashboard/committees/search-committee",
    element: <SearchCommittees />,
  },
  {
    path: "/committees/dashboard/committee-rooms",
    element: <CommitteesManagementSystemCommitteeRooms />,
  },
  {
    path: "/committees/dashboard/committee-rooms/addedit-committee-room",
    element: <AddEditCommitteeRooms />,
  },
  {
    path: "/committees/dashboard/committee-rooms/booked",
    element: <CommitteesManagementSystemBookingCommitteeRooms />,
  },

  {
    path: "/committees/dashboard/committee-rooms/addeditbooking",
    element: <CommitteesManagementSystemAddEditBookinginCommitteeRooms />,
  },
  {
    path: "/committees/dashboard/scheduled-meetings",
    element: <CommitteesManagementSystemMeetings />,
  },
  {
    path: "/committees/dashboard/committees/search-meeting",
    element: <SearchMeetings />,
  },

  //LDU Module
  {
    path: "/ldu/dashboard",
    element: <LDUDashboard />,
  },
  {
    path: "/ldu/legislative/ldu-legislative-bill",
    element: <LDULegislativeBill />,
  },
  {
    path: "/ldu/legislative/ldu-legislative-bill/edit-bill",
    element: <LDUAddEditLegislativeBill />,
  },
  {
    path: "/ldu/legislative/ldu-private-bill",
    element: <LDUPrivateBill />,
  },
  {
    path: "/ldu/privateMemberBill/ldu-private-Bill/edit-private-bill",
    element: <LDUAddEditPrivateBill />,
  },
  {
    path: "/ldu/lawActs/all-lisitng",
    element: <AllFilesListing />,
  },
  {
    path: "/ldu/lawActs/all-lisitng/edit-law-acts-Bill",
    element: <EditLawActsBill />,
  },

  //Transport Module
  {
    path: "/transport/dashboard",
    element: <TransportDashboard />,
  },
  {
    path: "/transport/logbook",
    element: <LogBookList />,
  },
  {
    path: "/transport/logbook/addedit",
    element: <AddEditLogBook />,
  },
  {
    path: "/transport/purchases",
    element: <PurchasesMadeList />,
  },
  {
    path: "/transport/purchases/addedit",
    element: <AddEditPurchasesMade />,
  },
  {
    path: "/transport/petrol-mileage",
    element: <PetrolMileageList />,
  },
  {
    path: "/transport/petrol-mileage/addedit",
    element: <AddEditPetrolMileage />,
  },
  {
    path: "/transport/vehicle-movement",
    element: <VehicleMovementList />,
  },
  {
    path: "/transport/vehicle-movement/addedit",
    element: <AddEditVehicleMovement />,
  },
  {
    path: "/transport/fleet",
    element: <FleetManagementList />,
  },
  {
    path: "/transport/fleet/addedit",
    element: <AddEditFleetManagement />,
  },
  // {
  //   path: "/transport/vehicles",
  //   element: <Vehicle />,
  // },
  {
    path: "/transport/vehicles",
    element: <VehiclesInformation />,
  },
  {
    path: "/transport/vehicles/profiles",
    element: <VehiclesProfile />,
  },
  {
    path: "/transport/vehicles/profiles/addedit",
    element: <AddEditVehicleProfile/>,
  },
  {
    path: "/transport/vehicles/profiles/addeditlogbook",
    element: <EditAddLogBook/>,
  },
  
  {
    path: "/transport/vehicles/log-book",
    element: <VehiclesLogBook />,
  },
  {
    path: "/transport/vehicles/movement-register",
    element: <VehiclesMovementRegister />,
  },
  {
    path: "/transport/vehicles/editaddvehmov",
    element: <EditAddVehMov />,
  },
  {
    path: "/transport/vehicles/operational-status",
    element: <VehiclesOperationalStatus />,
  },
  {
    path: "/transport/vehicles/addeditvehop",
    element: <AddEditVehOpertional />,
  },
  {
    path: "/transport/vehicles/purchases",
    element: <VehiclePurchases />,
  },
  {
    path: "/transport/vehicles/addeditvehiclepurchase",
    element: <AddEditVehiclePurchase/>,
  },

  // {
  //   path: "/transport/driver",
  //   element: <Drivers />,
  // },
  {
    path: "/transport/drivers",
    element: <DriverInformstion />,
  },
  {
    path: "/transport/drivers/profiles",
    element: <DriversProfile />,
  },
  {
    path: "/transport/drivers/addeditdriverprof",
    element: <AddEditDriversProfile />,
  },
  {
    path: "/transport/drivers/deputed-with-officer",
    element: <DriverDeputedWithOfficer />,
  },
  {
    path: "/transport/drivers/addeditdeputedwithofficer",
    element: <AddEditDeputedWithOff/>,
  },
  {
    path: "/transport/drivers/deputed-on-vehicle-no",
    element: <DriverDeputedOnVehicleNo />,
  },
  {
    path: "/transport/drivers/addeditdeponvehNo",
    element: <AddEditDepOnVehNo/>,
  },
  {
    path: "/transport/drivers/deputed-on-vehicle-no",
    element: <DriverDeputedOnVehicleNo />,
  },
  {
    path: "/transport/drivers/license-type",
    element: <DriversLicenseType />,
  },
  {
    path: "/transport/drivers/addeditlicense",
    element: <AddEditDriverLicense />,
  },
  {
    path: "/transport/drivers/medical-report",
    element: <DriversMedicalReport />,
  },
  {
    path: "/transport/drivers/addeditmedicalrepo",
    element: <AddEditMedicalRepo/>,
  },

  {
    path: "/transport/vehicles/addeditVehicles", // this will be changed
    element: <AddVehicles />,
  },
  {
    path: "/transport/driver/addeditDrivers", // this will be changed
    element: <AddEditDrivers />,
  },
  {
    path: "/transport/sumDriverVehicle", // this will be changed
    element: <SumDriverVehicle />,
  },
  {
    path: "/transport/poll", // this will be changed
    element: <Poll />,
  },
  {
    path: "/transport/makeModelWise", // this will be changed
    element: <MakeModelWise />,
  },
];
