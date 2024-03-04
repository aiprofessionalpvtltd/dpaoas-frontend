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
} from "@fortawesome/free-solid-svg-icons";

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
  // {
  //   itemName: "Resolution",
  //   link: "/notice/resolution",
  //   icon: faClipboardList,
  //   subItems: [
  //     {
  //       itemName: "New Resolution",
  //       link: "/notice/resolution/new",
  //       icon: faClipboardList,
  //     },
  //     {
  //       itemName: "Search Resolution",
  //       link: "/notice/resolution/search",
  //       icon: faClipboardList,
  //     },
  //     {
  //       itemName: "List Resolution",
  //       link: "/notice/resolution/sent",
  //       icon: faClipboardList,
  //     },
  //   ],
  // },
  {
    itemName: "Legislation Business",
    link: "/notice/legislation",
    icon: faScaleBalanced,
    subItems: [
      {
        itemName: "Private Bill",
        link: "/notice/legislation/private-bill",
        icon: faFileInvoice,
      },
    ],
  },

  // {
  //   itemName: "Manage",
  //   link: "/notice/manage",
  //   icon: faClipboardList,
  //   subItems: [
  //     {
  //       itemName: "Members",
  //       link: "/notice/manage/members",
  //       icon: faClipboardList,
  //     },
  //     // {
  //     //     itemName: "Deleted Questions",
  //     //     link: "/notice/manage/deleted-questions",
  //     //     icon: faClipboardList
  //     // },
  //     // {
  //     //     itemName: "Divisions",
  //     //     link: "/notice/manage/divisions",
  //     //     icon: faClipboardList
  //     // },
  //     // {
  //     //     itemName: "Groups",
  //     //     link: "/notice/manage/groups",
  //     //     icon: faClipboardList
  //     // },
  //     // {
  //     //     itemName: "Members",
  //     //     link: "/notice/manage/members",
  //     //     icon: faClipboardList
  //     // },
  //     // {
  //     //     itemName: "Parliamentary Years",
  //     //     link: "/notice/manage/parliamentary-years",
  //     //     icon: faClipboardList
  //     // },
  //     // {
  //     //     itemName: "Question Categories",
  //     //     link: "/notice/manage/question-categories",
  //     //     icon: faClipboardList
  //     // },
  //     // {
  //     //     itemName: "Question Status",
  //     //     link: "/notice/manage/groups/question-status",
  //     //     icon: faClipboardList
  //     // },
  //     // {
  //     //     itemName: "Remove Questions from List",
  //     //     link: "/notice/manage/remove-questions",
  //     //     icon: faClipboardList
  //     // },
  //     // {
  //     //     itemName: "Rota",
  //     //     link: "/notice/manage/rota",
  //     //     icon: faClipboardList
  //     // },
  //     // {
  //     //     itemName: "Session Sittings",
  //     //     link: "/notice/manage/session-sittings",
  //     //     icon: faClipboardList
  //     // },
  //     {
  //       itemName: "Sessions",
  //       link: "/notice/manage/sessions",
  //       icon: faClipboardList,
  //     },
  //     // {
  //     //     itemName: "Sitting Types",
  //     //     link: "/notice/manage/sitting-types",
  //     //     icon: faClipboardList
  //     // },
  //     // {
  //     //     itemName: "Swap Question",
  //     //     link: "/notice/manage/swap-question",
  //     //     icon: faClipboardList
  //     // },
  //   ],
  // },
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
    ],
  },
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
        itemName: "Attendence Reports",
        link: "/notice/reports/attendence-reports",
        icon: faClipboardList,
      },
    ],
  },
];

//Motion Management SideBar items

export const MMSSideBarItems = [
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
  {
    itemName: "Search Question",
    link: "/mms/question/search",
    icon: faClipboardList,
  },
  {
    itemName: "Search Resolution",
    link: "/mms/resolution/search",
    icon: faClipboardList,
  },

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
    ],
  },
];

//Question Management System
export const QMSSideBarItems = [
  {
    itemName: "Search Question",
    link: "/qms/search/question",
    icon: faClipboardList,
  },
  {
    itemName: "Search Resolution",
    link: "/qms/search/resolution",
    icon: faClipboardList,
  },
  {
    itemName: "Question",
    link: "/qms/question",
    icon: faClipboardList,
    subItems: [
      {
        itemName: "Question List",
        link: "/qms/question/list",
        icon: faClipboardList,
      },
      // {
      //     itemName: "Question Detail",
      //     link: "/qms/question/detail",
      //     icon: faClipboardList
      // },
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
    ],
  },
  {
    itemName: "Resolution",
    link: "/qms/resolution",
    icon: faClipboardList,
    subItems: [
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
        itemName: "Resolution Summary",
        link: "/qms/reports/resolution-summary",
        icon: faClipboardList,
      },
      {
        itemName: "Question Summary",
        link: "/qms/reports/question-summary",
        icon: faClipboardList,
      },

      {
        itemName: "Question List",
        link: "/qms/reports/question-list",
        icon: faClipboardList,
      },

      {
        itemName: "Resolution Annual Reports",
        link: "/qms/reports/resolution-annual-reports",
        icon: faClipboardList,
      },
      {
        itemName: "Question Annual Reports",
        link: "/qms/reports/question-annual-reports",
        icon: faClipboardList,
      },
      {
        itemName: "Defer Question Reports",
        link: "/qms/reports/defer-question-reports",
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
        itemName: "Terms",
        link: "/qms/manage/terms",
        icon: faClipboardList,
      },
      {
        itemName: "Tenures",
        link: "/qms/manage/tenures",
        icon: faClipboardList,
      },
      {
        itemName: "Members",
        link: "/qms/manage/members",
        icon: faClipboardList,
      },
      {
        itemName: "Sitting Days",
        link: "/qms/manage/sitting-days",
        icon: faClipboardList,
      },
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
    itemName: "Admin Complaint",
    link: "/cms/admin/dashboard",
    icon: faHome,
    subItems: [
      {
        itemName: "Admin Complaint",
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
    itemName: "FIle Registers",
    link: "/efiling/dashboard/file-register-list",
    icon: faFileAlt,
  },
  {
    itemName: "File Headings",
    link: "/efiling/dashboard/file-heading-list",
    icon: faFileAlt,
  },
  {
    itemName: "Main File",
    link: "",
    icon: faFileAlt,
  },
  {
    itemName: "Fresh Recipt",
    link: "",
    icon: faFileAlt,
  },
  {
    itemName: "Notification",
    link: "",
    icon: faFileAlt,
  },
  {
    itemName: "Team information",
    link: "",
    icon: faFileAlt,
  },
  
]