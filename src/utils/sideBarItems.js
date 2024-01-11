import {
  faHome,
  faFileAlt,
  faUserTag,
  faBuilding,
  faAddressCard,
  faUser,
  faClipboardList,
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
    itemName: "Question",
    link: "/notice/question",
    icon: faClipboardList,
    subItems: [
      {
        itemName: "New Question",
        link: "/notice/question/new",
        icon: faClipboardList,
      },
      {
        itemName: "Search Question",
        link: "/notice/question/search",
        icon: faClipboardList,
      },
      {
        itemName: "Sent Question",
        link: "/notice/question/sent",
        icon: faClipboardList,
      },
    ],
  },
  {
    itemName: "Motion",
    link: "/notice/motion",
    icon: faClipboardList,
    subItems: [
      {
        itemName: "New Motion",
        link: "/notice/motion/new",
        icon: faClipboardList,
      },
      {
        itemName: "Search Motion",
        link: "/notice/motion/search",
        icon: faClipboardList,
      },
      {
        itemName: "Sent Motion",
        link: "/notice/motion/sent",
        icon: faClipboardList,
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
        itemName: "Sent Resolution",
        link: "/notice/resolution/sent",
        icon: faClipboardList,
      },
    ],
  },
  {
    itemName: "Manage",
    link: "/notice/manage",
    icon: faClipboardList,
    subItems: [
      {
        itemName: "Members",
        link: "/notice/manage/members",
        icon: faClipboardList,
      },
      // {
      //     itemName: "Deleted Questions",
      //     link: "/notice/manage/deleted-questions",
      //     icon: faClipboardList
      // },
      // {
      //     itemName: "Divisions",
      //     link: "/notice/manage/divisions",
      //     icon: faClipboardList
      // },
      // {
      //     itemName: "Groups",
      //     link: "/notice/manage/groups",
      //     icon: faClipboardList
      // },
      // {
      //     itemName: "Members",
      //     link: "/notice/manage/members",
      //     icon: faClipboardList
      // },
      // {
      //     itemName: "Parliamentary Years",
      //     link: "/notice/manage/parliamentary-years",
      //     icon: faClipboardList
      // },
      // {
      //     itemName: "Question Categories",
      //     link: "/notice/manage/question-categories",
      //     icon: faClipboardList
      // },
      // {
      //     itemName: "Question Status",
      //     link: "/notice/manage/groups/question-status",
      //     icon: faClipboardList
      // },
      // {
      //     itemName: "Remove Questions from List",
      //     link: "/notice/manage/remove-questions",
      //     icon: faClipboardList
      // },
      // {
      //     itemName: "Rota",
      //     link: "/notice/manage/rota",
      //     icon: faClipboardList
      // },
      // {
      //     itemName: "Session Sittings",
      //     link: "/notice/manage/session-sittings",
      //     icon: faClipboardList
      // },
      {
        itemName: "Sessions",
        link: "/notice/manage/sessions",
        icon: faClipboardList,
      },
      // {
      //     itemName: "Sitting Types",
      //     link: "/notice/manage/sitting-types",
      //     icon: faClipboardList
      // },
      // {
      //     itemName: "Swap Question",
      //     link: "/notice/manage/swap-question",
      //     icon: faClipboardList
      // },
    ],
  },
  {
    itemName: "Seating Plan",
    link: "/notice/seatingplan",
    icon: faClipboardList,
    subItems: [
      {
        itemName: "Manage Session Days",
        link: "/notice/seatingplan/manage-session-days",
        icon: faClipboardList,
      },
      {
        itemName: "Manage Seating Plan",
        link: "/notice/seatingplan/manage-seating-plan",
        target: "blank",
        icon: faClipboardList,
      },
    ],
  },
  {
    itemName: "Reports",
    link: "/notice/reports",
    icon: faClipboardList,
    subItems: [
      {
        itemName: "Business Summary",
        link: "/notice/reports/business-summary",
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
];
