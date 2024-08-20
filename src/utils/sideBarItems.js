import {
  faHome,
  faFileAlt,
  faUserTag,
  faBuilding,
  faAddressCard,
  faUser,
  faClipboardList,
  faCodeBranch,
  faClipboardQuestion,
  faFilePen,
  faSearch,
  faListAlt,
  faFileImport,
  faScaleBalanced,
  faFileInvoice,
  faBarsProgress,
  faCalendarDays,
  faChair,
  faFileLines,
  faSquarePollHorizontal,
  faBook,
  faHeading,
  faBookOpen,
  faReceipt,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { getUserData } from "../api/Auth";

// LMS Sidebar
export const LMSsidebarItems = [
  {
    itemName: "Dashboard",
    link: "/lms/dashboard",
    icon: faHome,
  },
  {
    itemName: "History",
    link: "/lms/history",
    icon: faFileAlt,
  },
];

// HRM (Organizational) Sidebar
export const HRMsidebarItems = [
  {
    itemName: "Roles",
    link: "/hrm/dashboard",
    icon: faUserTag,
  },
  {
    itemName: "Branches",
    link: "/hrm/branches",
    icon: faCodeBranch,
  },
  {
    itemName: "Department",
    link: "/hrm/department",
    icon: faBuilding,
  },
  {
    itemName: "Designation",
    link: "/hrm/designation",
    icon: faAddressCard,
  },
  {
    itemName: "Employee",
    link: "/hrm/employee",
    icon: faUser,
  },
];

// VMS Sidebar
export const VMSsidebarItems = [
  {
    itemName: "Dashboard",
    link: "/vms/dashboard",
    icon: faHome,
  },
];

// Notice Sidebar
export const NoticeSidebarItems = [
  {
    itemName: "Dashboard",
    link: "/notice/dashboard",
    icon: faHome,
  },
  {
    itemName: "Question",
    link: "/notice/question",
    icon: faClipboardQuestion,
    subItems: [
      {
        itemName: "New Question",
        link: "/notice/question/new",
        icon: faFilePen,
      },
      {
        itemName: "Search Question",
        link: "/notice/question/search",
        icon: faSearch,
      },
      {
        itemName: "List Question",
        link: "/notice/question/sent",
        icon: faListAlt,
      },
    ],
  },
  {
    itemName: "Motion",
    link: "/notice/motion",
    icon: faFileImport,
    subItems: [
      {
        itemName: "New Motion",
        link: "/notice/motion/new",
        icon: faFilePen,
      },
      {
        itemName: "Search Motion",
        link: "/notice/motion/search",
        icon: faSearch,
      },
      {
        itemName: "List Motion",
        link: "/notice/motion/sent",
        icon: faListAlt,
      },
    ],
  },
  {
    itemName: "Resolution",
    link: "/notice/resolution",
    icon: faClipboardList,
    subItems: [
      {
        itemName: "New Resolution",
        link: "/notice/resolution/new",
        icon: faClipboardList,
      },
      {
        itemName: "Search Resolution",
        link: "/notice/resolution/search",
        icon: faClipboardList,
      },
      {
        itemName: "List Resolution",
        link: "/notice/resolution/sent",
        icon: faClipboardList,
      },
    ],
  },
  {
    itemName: "Private Member Bill",
    link: "/notice/legislation",
    icon: faScaleBalanced,
    subItems: [
      // {
      //   itemName: "Search Private Member Bill",
      //   link: "",
      //   icon: faFileInvoice,
      // },
      {
        itemName: "List Private Member Bill",
        link: "/notice/legislation/legislative-bill",
        icon: faFileInvoice,
      },
    ],
  },
  {
    itemName: "Manage",
    link: "/notice/manage",
    icon: faBarsProgress,
    subItems: [
      // {
      //itemName: "Manage Session Days",
      //  link: "/notice/manage/manage-session-days",
      // icon: faClipboardList,
      //  },
      {
        itemName: "Session Days",
        link: "/notice/manage/manage-session-days",
        icon: faCalendarDays,
      },
      {
        itemName: "Seating Plan",
        link: "/notice/manage/manage-seating-plan",
        target: "blank",
        icon: faChair,
      },
      {
        itemName: "Member Attendance",
        link: "/notice/manage/single-member-session-attendance",
        icon: faChair,
      },
    ],
  },
  // {
  //   itemName: "Event Calendar",
  //   link: "/notice/event-calendar",
  //   icon: faCalendarAlt,
  // },

  // {
  //   itemName: "Research Services",
  //   link: "/notice/research-services",
  //   icon: faHome,
  // },
  {
    itemName: "Reports",
    link: "/notice/reports",
    icon: faFileLines,
    subItems: [
      {
        itemName: "Business Summary",
        link: "/notice/reports/business-summary",
        icon: faSquarePollHorizontal,
      },
      {
        itemName: "Date Wise Attendance Report",
        link: "/notice/reports/attendence-reports",
        icon: faClipboardList,
      },
      {
        itemName: "Party/Province Wise Attendance Reports",
        link: "/notice/reports/party-province-annual-attendence-reports",
        icon: faClipboardList,
      },
    ],
  },
];

//Motion Management SideBar items

export const MMSSideBarItems = [
  {
    itemName: "Dashboard",
    link: "/mms/dashboard",
    icon: faClipboardList,
  },
  {
    itemName: "Motion",
    link: "/mms/motion",
    icon: faClipboardList,
    subItems: [
      {
        itemName: "Motion List",
        link: "/mms/motion/list",
        icon: faClipboardList,
      },
      {
        itemName: "New Motion",
        link: "/mms/motion/new",
        icon: faClipboardList,
      },
      {
        itemName: "Search Motion",
        link: "/mms/motion/search",
        icon: faClipboardList,
      },
    ],
  },
  // {
  //   itemName: "Search Question",
  //   link: "/mms/question/search",
  //   icon: faClipboardList,
  // },
  // {
  //   itemName: "Search Resolution",
  //   link: "/mms/resolution/search",
  //   icon: faClipboardList,
  // },

  {
    itemName: "Reports",
    link: "/mms/reports",
    icon: faClipboardList,
    subItems: [
      {
        itemName: "Motion Summary",
        link: "/mms/reports/motion-summary",
        icon: faClipboardList,
      },
      {
        itemName: "Motion List Report",
        link: "/mms/reports/motion-list",
        icon: faClipboardList,
      },
    ],
  },
];

export const TelecastingSideBarItems = [
  {
    itemName: "Dashboard",
    link: "/telecasting/dashboard",
    icon: faHome,
  },
  {
    itemName: "Speech on demand",
    link: "/telecasting/speech-on-demand",
    icon: faHome,
  },
];

export const ResearchSideBarItems = [
  {
    itemName: "Dashboard",
    link: "/research/dashboard",
    icon: faHome,
  },
  {
    itemName: "Research Services",
    link: "/research/research-services",
    icon: faHome,
  },
];

//Question Management System
export const QMSSideBarItems = [
  {
    itemName: "Dashboard",
    link: "/qms/dashboard",
    icon: faClipboardList,
  },
  {
    itemName: "Question",
    link: "/qms/question",
    icon: faClipboardList,
    subItems: [
      {
        itemName: "New Question",
        link: "/qms/question/new",
        icon: faClipboardList,
      },
      {
        itemName: "Delete Question",
        link: "/qms/question/delete",
        icon: faClipboardList,
      },
      {
        itemName: "Search Question",
        link: "/qms/search/question",
        icon: faClipboardList,
      },
      {
        itemName: "Question List Report",
        link: "/qms/reports/question-list",
        icon: faClipboardList,
      },
    ],
  },
  {
    itemName: "Resolution",
    link: "/qms/resolution",
    icon: faClipboardList,
    subItems: [
      {
        itemName: "New Resolution",
        link: "/qms/resolution/new",
        icon: faClipboardList,
      },
      {
        itemName: "Resolution List",
        link: "/qms/resolution/list",
        icon: faClipboardList,
      },
      {
        itemName: "Resolution Delete",
        link: "/qms/resolution/delete",
        icon: faClipboardList,
      },
      {
        itemName: "Search Resolution",
        link: "/qms/search/resolution",
        icon: faClipboardList,
      },
      {
        itemName: "Ballot List",
        link: "/qms/resolution/ballot/list",
        icon: faClipboardList,
      },
      {
        itemName: "Resolution Summary Detail",
        link: "/qms/resolution/summary-detail",
        icon: faClipboardList,
      },
    ],
  },
  {
    itemName: "Notice",
    link: "/qms/notice",
    icon: faClipboardList,
    subItems: [
      {
        itemName: "Notice Question",
        link: "/qms/notice/notice-question",
        icon: faClipboardList,
      },
      // {
      //   itemName: "Notice Question Detail",
      //   link: "/qms/notice/notice-question-detail",
      //   icon: faClipboardList,
      // },
      {
        itemName: "Notice Resolution",
        link: "/qms/notice/notice-resolution",
        icon: faClipboardList,
      },
      // {
      //     itemName: "Notice Resolution Detail",
      //     link: "/qms/notice/notice-resolution-detail",
      //     icon: faClipboardList
      // },
    ],
  },
  {
    itemName: "Reports",
    link: "/qms/reports",
    icon: faClipboardList,
    subItems: [
      {
        itemName: "Group Diary",
        link: "/qms/reports/question-group-diary",
        icon: faClipboardList,
      },
      {
        itemName: "Pending Under Process",
        link: "/qms/reports/question-pending-under-process",
        icon: faClipboardList,
      },
      {
        itemName: "Resolution Summary",
        link: "/qms/reports/resolution-summary",
        icon: faClipboardList,
      },
      {
        itemName: "Notice Summary",
        link: "/qms/reports/notice-summary",
        icon: faClipboardList,
      },
      {
        itemName: "Question Summary",
        link: "/qms/reports/question-summary",
        icon: faClipboardList,
      },

      {
        itemName: "Resolution Annual Reports",
        link: "/qms/reports/resolution-annual-reports",
        icon: faClipboardList,
      },
      // {
      //   itemName: "Question Annual Reports",
      //   link: "/qms/reports/question-annual-reports",
      //   icon: faClipboardList,
      // },
      {
        itemName: "Defer Question Reports",
        link: "/qms/reports/defer-question-reports",
        icon: faClipboardList,
      },
      {
        itemName: "Rota List",
        link: "/qms/reports/rota-list",
        icon: faClipboardList,
      },
    ],
  },
  {
    itemName: "Manage",
    link: "/qms/manage",
    icon: faClipboardList,
    subItems: [
      {
        itemName: "Sessions",
        link: "/qms/manage/sessions",
        icon: faClipboardList,
      },
      {
        itemName: "Groups",
        link: "/qms/manage/groups",
        icon: faClipboardList,
      },
      {
        itemName: "Tenures",
        link: "/qms/manage/tenures",
        icon: faClipboardList,
      },
      {
        itemName: "Terms",
        link: "/qms/manage/terms",
        icon: faClipboardList,
      },

      {
        itemName: "Members",
        link: "/qms/manage/members",
        icon: faClipboardList,
      },
      // {
      //   itemName: "Sitting Days",
      //   link: "/qms/manage/sitting-days",
      //   icon: faClipboardList,
      // },
      // {
      //   itemName: "Ministries",
      //   link: "/qms/manage/ministries",
      //   icon: faClipboardList,
      // },
      {
        itemName: "Divisions",
        link: "/qms/manage/divisions",
        icon: faClipboardList,
      },
      {
        itemName: "Political Party",
        link: "/qms/manage/political-party",
        icon: faClipboardList,
      },
      {
        itemName: "Parliamentary Year",
        link: "/qms/manage/parliamentary-year",
        icon: faClipboardList,
      },
      {
        itemName: "Remove Question",
        link: "/qms/manage/remove-question",
        icon: faClipboardList,
      },
    ],
  },
];

// SMS Sidebar
export const SMSsidebarItems = [
  {
    itemName: "Home",
    link: "/sms/dashboard",
    icon: faHome,
  },
  {
    itemName: "Send SMS",
    link: "/sms/send-sms",
    icon: faClipboardList,
    subItems: [
      {
        itemName: "Instant SMS",
        link: "/sms/send-sms/instant",
        icon: faClipboardList,
      },
      {
        itemName: "Advanced SMS",
        link: "/sms/send-sms/advanced",
        icon: faClipboardList,
      },
    ],
  },
  {
    itemName: "Phone Book",
    link: "/sms/phone-book",
    icon: faClipboardList,
    subItems: [
      // {
      //   itemName: "Add List",
      //   link: "/sms/phone-book/add",
      //   icon: faClipboardList,
      // },
      {
        itemName: "Manage List",
        link: "/sms/phone-book/manage",
        icon: faClipboardList,
      },
      // {
      //   itemName: "Import Contacts",
      //   link: "/sms/phone-book/import",
      //   icon: faClipboardList,
      // },
    ],
  },
  {
    itemName: "Templates",
    link: "/sms/template",
    icon: faClipboardList,
    subItems: [
      // {
      //   itemName: "Add Template",
      //   link: "/sms/template/add",
      //   icon: faClipboardList,
      // },
      {
        itemName: "Manage Template",
        link: "/sms/template/manage",
        icon: faClipboardList,
      },
    ],
  },
  {
    itemName: "Message Log",
    link: "/sms/messagelog",
    icon: faClipboardList,
    subItems: [
      // {
      //   itemName: "Summary",
      //   link: "/sms/messagelog/summary",
      //   icon: faClipboardList,
      // },
      {
        itemName: "Detailed Message Log",
        link: "/sms/messagelog/detailed",
        icon: faClipboardList,
      },
    ],
  },
  {
    itemName: "Members",
    link: "/sms/members",
    icon: faClipboardList,
    subItems: [
      {
        itemName: "Members List",
        link: "/sms/members/list",
        icon: faClipboardList,
      },
    ],
  },
];

// TMS Sidebar
export const TMSsidebarItems = [
  {
    itemName: "Dashboard",
    link: "/tms/dashboard",
    icon: faHome,
  },
  {
    itemName: "Question",
    link: "/tms/question",
    icon: faHome,
  },
  {
    itemName: "Motion",
    link: "/tms/motion",
    icon: faHome,
  },
  {
    itemName: "Resolution",
    link: "/tms/resolution",
    icon: faHome,
  },
  {
    itemName: "Legislation",
    link: "/tms/legislation",
    icon: faHome,
  },
  {
    itemName: "Research Branch",
    link: "/tms/house-business",
    icon: faHome,
  },
  // {
  //   itemName: "Members",
  //   link: "/tms/members",
  //   icon: faHome,
  // },
];

//CMS SideBar
export const CMSsidebarItems = [
  {
    itemName: "User Complaint",
    link: "/cms/dashboard",
    icon: faHome,
  },

  {
    itemName: "Admin",
    link: "/cms/admin/dashboard",
    icon: faHome,
    subItems: [
      {
        itemName: "Admin Dashboard",
        link: "/cms/admin/dashboard",
        icon: faClipboardList,
      },
      {
        itemName: "Toner Installation Report",
        link: "/cms/admin/toner-installation-report",
        icon: faClipboardList,
      },
      {
        itemName: "Toner Models",
        link: "/cms/admin/toner-models",
        icon: faClipboardList,
      },
      {
        itemName: "Branch",
        link: "/cms/admin/branch/list",
        icon: faClipboardList,
      },
    ],
  },

  {
    itemName: "Inventory",
    link: "/cms/admin/inventory/dashboard",
    icon: faHome,
    subItems: [
      {
        itemName: "Invoice Bill",
        link: "/cms/admin/inventory/inventory-bill",
        icon: faClipboardList,
      },
      {
        itemName: "Inventory Item",
        link: "/cms/admin/inventory/dashboard",
        icon: faClipboardList,
      },
      {
        itemName: "Issue Equipment",
        link: "/cms/admin/inventory/issue-date",
        icon: faClipboardList,
      },
      {
        itemName: "Return Equipment",
        link: "/cms/admin/inventory/return-date",
        icon: faClipboardList,
      },
      {
        itemName: "Vendor List",
        link: "/cms/admin/inventory/vendor-list",
        icon: faClipboardList,
      },
    ],
  },
];

//Efiling
export const EfilingSideBarItem = [
  {
    itemName: "Dashboard",
    link: "/efiling/dashboard",
    icon: faHome,
  },
  {
    itemName: "Fresh Receipts",
    link: "/efiling/dashboard/fresh-receipt",
    icon: faReceipt,
    subItems: [
      {
        itemName: "Create Fresh Receipt",
        link: "/efiling/dashboard/fresh-receipt/addedit",
        icon: faReceipt,
      },
      {
        itemName: "Fresh Receipts List",
        link: "/efiling/dashboard/fresh-receipt",
        icon: faReceipt,
      },
    ],
  },
  {
    itemName: "Cases",
    link: "/efiling/dashboard/file-register-list/files-list/cases",
    icon: faClipboardList,
    subItems: [
      {
        itemName: "Cases List",
        link: "/efiling/dashboard/file-register-list/files-list/cases",
        icon: faClipboardList,
      },
      {
        itemName: "Approved Cases",
        link: "/efiling/dashboard/file-register-list/files-list/cases/approved",
        icon: faClipboardList,
      },
    ],
  },
];

export const EfilingSideBarBranchItem = [
  {
    itemName: "Dashboard",
    link: "/efiling/dashboard",
    icon: faHome,
  },

  // {
  //   itemName: "Diary Register",
  //   link: "/efiling/dashboard/diary",
  //   icon: faBook,
  // },
  {
    itemName: "Register",
    link: "/efiling/dashboard/file-register",
    icon: faBookOpen,
    subItems: [
      {
        itemName: "Create Register",
        link: "/efiling/dashboard/addedit-file-register",
        icon: faBookOpen,
      },
      {
        itemName: "Register List",
        link: "/efiling/dashboard/file-register-list",
        icon: faBookOpen,
      },
    ],
  },
  {
    itemName: "File Head",
    link: "/efiling/dashboard/file-heading-list",
    icon: faHeading,
    subItems: [
      {
        itemName: "Create File Head",
        link: "/efiling/dashboard/addedit-file-heading",
        icon: faHeading,
      },
      {
        itemName: "File Head List",
        link: "/efiling/dashboard/file-heading-list",
        icon: faHeading,
      },
    ],
  },
  // {
  //   itemName: "Flags",
  //   link: "/efiling/dashboard/flags",
  //   icon: faHeading,
  //   subItems: [
  //     {
  //       itemName: "Create Flag",
  //       link: "/efiling/dashboard/addedit-flags",
  //       icon: faHeading,
  //     },
  //     {
  //       itemName: "Flags List",
  //       link: "/efiling/dashboard/flags",
  //       icon: faHeading,
  //     },
  //   ],
  // },
  // {
  //   itemName: "Fresh Receipts",
  //   link: "/efiling/dashboard/fresh-receipt",
  //   icon: faReceipt,
  //   subItems: [
  //     {
  //       itemName: "Create Fresh Receipt",
  //       link: "/efiling/dashboard/fresh-receipt/addedit",
  //       icon: faReceipt,
  //     },
  //     {
  //       itemName: "Fresh Receipts List",
  //       link: "/efiling/dashboard/fresh-receipt",
  //       icon: faReceipt,
  //     },
  //   ],
  // },
  {
    itemName: "Files",
    link: "/efiling/dashboard/file-register-list/files",
    icon: faClipboardList,
    subItems: [
      {
        itemName: "Create File",
        link: "/efiling/dashboard/file-register-list/files-list/addedit-file",
        icon: faClipboardList,
      },
      {
        itemName: "Files List",
        link: "/efiling/dashboard/file-register-list/files-list",
        icon: faClipboardList,
      },
    ],
  },
  {
    itemName: "Fresh Recipt / Cases",
    link: "/efiling/dashboard/file-register-list/files-list/cases",
    icon: faClipboardList,
    subItems: [
      {
        itemName: "Create  FR",
        link: "/efiling/dashboard/fresh-receipt/addedit",
        icon: faReceipt,
      },

      {
        itemName: "Fresh Receipts List",
        link: "/efiling/dashboard/fresh-receipt",
        icon: faReceipt,
      },
      // {
      //   itemName: "Internal Branch FR",
      //   link: "/efiling/dashboard/fresh-receipt",
      //   icon: faReceipt,
      // },
      // {
      //   itemName: "External Branch FR",
      //   link: "/efiling/dashboard/external/fresh-receipt",
      //   icon: faReceipt,
      // },
      {
        itemName: "Create Case",
        link: "/efiling/dashboard/file-register-list/files-list/addedit-case",
        icon: faClipboardList,
      },
      {
        itemName: "Cases List",
        link: "/efiling/dashboard/file-register-list/files-list/cases",
        icon: faClipboardList,
      },
      {
        itemName: "Approved Cases",
        link: "/efiling/dashboard/file-register-list/files-list/cases/approved",
        icon: faClipboardList,
      },
    ],
  },
];

// Legislation Management System SideBar Items
export const LegislationSideBarItems = [
  {
    itemName: "Dashboard",
    link: "/lgms/dashboard",
    icon: faHome,
  },
  // {
  //   itemName: "Bills",
  //   link: "/lgms/dashboard/bills",
  //   icon: faBookOpen,
  //   subItems: [
  //     // {
  //     //   itemName: "All Bills",
  //     //   link: "/lgms/dashboard/bills/legislation-bills",
  //     //   icon: faBookOpen,
  //     // },
  //     {
  //       itemName: "Government Bills",
  //       link: "/lgms/dashboard/bills/legislation-bills/government-bills",
  //       icon: faBookOpen,
  //     },
  //     {
  //       itemName: "Private Member Bills",
  //       link: "/lgms/dashboard/bills/legislation-bills/private-member-bills",
  //       icon: faBookOpen,
  //     },
  //     {
  //       itemName: "Search Bills",
  //       link: "/lgms/dashboard/bills/search-bills",
  //       icon: faBookOpen,
  //     },
  //   ],
  // },
  {
    itemName: "Government Bills",
    link: "/lgms/dashboard/bills",
    icon: faBookOpen,
    subItems: [
      {
        itemName: "Bills Introduced In Senate",
        link: "/lgms/dashboard/bills/legislation-bills/government-bills/introduced-in-senate",
        icon: faBookOpen,
      },
      {
        itemName: "Bills Received From NA",
        link: "/lgms/dashboard/bills/legislation-bills/government-bills/recieved-from-na",
        icon: faBookOpen,
      },
      {
        itemName: "Search Bills",
        link: "/lgms/dashboard/bills/search-government-bills",
        icon: faBookOpen,
      },
    ],
  },

  {
    itemName: "Private Member Bills",
    link: "/lgms/dashboard/bills",
    icon: faBookOpen,
    subItems: [
      {
        itemName: "Bills Introduced In Senate",
        link: "/lgms/dashboard/bills/legislation-bills/private-member-bills/introduced-in-senate",
        icon: faBookOpen,
      },
      {
        itemName: "Bills Received From NA",
        link: "/lgms/dashboard/bills/legislation-bills/private-member-bills/recieved-from-na",
        icon: faBookOpen,
      },
      {
        itemName: "Search Bills",
        link: "/lgms/dashboard/bills/search-private-bills",
        icon: faBookOpen,
      },
    ],
  },
  {
    itemName: "Ordinances",
    link: "/lgms/dashboard/ordinances",
    icon: faBookOpen,
    subItems: [
      {
        itemName: "Ordinance List",
        link: "/lgms/dashboard/ordinances/ordinance-list",
        icon: faBookOpen,
      },
      {
        itemName: "Search Ordinance",
        link: "/lgms/dashboard/ordinances/search-ordinance",
        icon: faBookOpen,
      },
    ],
  },

  {
    itemName: "Manage",
    link: "/lgms/dashboard/ordinances",
    icon: faBookOpen,
    subItems: [
      {
        itemName: "Manage Bill Statuses",
        link: "/lgms/dashboard/bill/manage-bill-statuses",
        icon: faBookOpen,
      },
      {
        itemName: "Manage Committees",
        link: "/lgms/dashboard/manage/committees/list",
        icon: faBookOpen,
      },
      {
        itemName: "Manage Committees Recommendation",
        link: "/lgms/dashboard/manage/committee-recomendation/list",
        icon: faBookOpen,
      },
      {
        itemName: "Ministers",
        link: "/lgms/dashboard/manage/ministers/list",
        icon: faBookOpen,
      },
      {
        itemName: "Members",
        link: "/lgms/dashboard/manage/members/list",
        icon: faBookOpen,
      },

      {
        itemName: "Parliamentary Years",
        link: "/lgms/dashboard/manage/parliamentary-year/list",
        icon: faBookOpen,
      },
      {
        itemName: "Sessions",
        link: "/lgms/dashboard/manage/session/list",
        icon: faBookOpen,
      },
      {
        itemName: "Tenures",
        link: "/lgms/dashboard/manage/tenures/list",
        icon: faBookOpen,
      },
      {
        itemName: "Terms",
        link: "/lgms/dashboard/manage/terms/list",
        icon: faBookOpen,
      },
      // {
      //   itemName: "Committees",
      //   link: "/lgms/dashboard/manage/committees/list",
      //   icon: faBookOpen,
      // },
    ],
  },
  {
    itemName: "From Notice Office",
    link: "/lgms/notice-office",
    icon: faBookOpen,
    subItems: [
      // {
      //   itemName: "Private Member Bill",
      //   link: "/lgms/legislation/private-bill",
      //   icon: faFileInvoice,
      // },
      {
        itemName: "List Private Member Bill",
        link: "/lgms/legislation/private-bill",
        icon: faFileInvoice,
      },
    ],
  },
];

// Committees Management System Sidebar Items

export const CommitteesSideBarItems = [
  {
    itemName: "Dashboard",
    link: "/committees/dashboard",
    icon: faHome,
  },

  {
    itemName: "Committees",
    link: "/committees/dashboard/committees",
    icon: faBookOpen,
    subItems: [
      {
        itemName: "Committees List",
        link: "/committees/dashboard/committees/committees-list",
        icon: faBookOpen,
      },
      {
        itemName: "Search Committee",
        link: "/committees/dashboard/committees/search-committee",
        icon: faBookOpen,
      },
    ],
  },
  {
    itemName: "Committee Rooms",
    link: "/committees/dashboard/committees",
    icon: faBookOpen,
    subItems: [
      {
        itemName: "Committee Rooms List",
        link: "/committees/dashboard/committee-rooms",
        icon: faBookOpen,
      },
      {
        itemName: "Booked Committe Rooms Lists",
        link: "/committees/dashboard/committee-rooms/booked",
        icon: faBookOpen,
      },
    ],
  },

  {
    itemName: "Meetings",
    link: "/committees/dashboard/meetings",
    icon: faBookOpen,
    subItems: [
      {
        itemName: "Scheduled Meetings",
        link: "/committees/dashboard/scheduled-meetings",
        icon: faBookOpen,
      },
      {
        itemName: "Search Meeting",
        link: "/committees/dashboard/committees/search-meeting",
        icon: faBookOpen,
      },
    ],
  },
];

//LDU Sidebar Items
export const LDUSideBarItems = [
  {
    itemName: "Dashboard",
    link: "/ldu/dashboard",
    icon: faHome,
  },
  {
    itemName: "Drafting of Private Member Bill",
    link: "/ldu/notice-office",
    icon: faBookOpen,
    subItems: [
      {
        itemName: "List Drafting of Private Member Bill",
        link: "/ldu/legislative/ldu-private-bill",
        icon: faFileInvoice,
      },
      // {
      //   itemName: "Legislative Bill",
      //   link: "/ldu/legislative/ldu-legislative-bill",
      //   icon: faFileInvoice,
      // },
    ],
  },
  {
    itemName: "Laws / Acts ",
    link: "/ldu/notice-office",
    icon: faBookOpen,
    subItems: [
      {
        itemName: "All List",
        link: "/ldu/lawActs/all-lisitng",
        icon: faFileInvoice,
      },
      // {
      //   itemName: "Legislative Bill",
      //   link: "/lgms/legislation/legislative-bill",
      //   icon: faFileInvoice,
      // },
    ],
  },
];

// Transport Management

export const TransportSideBarItems = [
  {
    itemName: "Dashboard",
    link: "/transport/dashboard",
    icon: faClipboardList,
  },
  {
    itemName: "Log Book",
    link: "/mms/dashboard",
    icon: faClipboardList,
  },
  {
    itemName: "Vehicle Movement",
    link: "/mms/dashboard",
    icon: faClipboardList,
  },
  {
    itemName: "Fleet Management",
    link: "/mms/dashboard",
    icon: faClipboardList,
  },
];
