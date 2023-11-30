import { faHome, faFileAlt, faUserTag, faBuilding, faAddressCard, faUser, faClipboardList } from '@fortawesome/free-solid-svg-icons'

// LMS Sidebar
export const LMSsidebarItems = [
    {
        itemName: "Dashboard",
        link: "/lms/dashboard",
        icon: faHome
    },
    {
        itemName: "History",
        link: "/lms/history",
        icon: faFileAlt
    }
]

// HRM (Organizational) Sidebar
export const HRMsidebarItems = [
    {
        itemName: "Roles",
        link: "/hrm/dashboard",
        icon: faUserTag
    },

    {
        itemName: "Department",
        link: "/hrm/department",
        icon: faBuilding
    },
    {
        itemName: "Designation",
        link: "/hrm/designation",
        icon: faAddressCard
    },
    {
        itemName: "Employee",
        link: "/hrm/employee",
        icon: faUser
    }
]

// VMS Sidebar
export const VMSsidebarItems = [
    {
        itemName: "Dashboard",
        link: "/vms/dashboard",
        icon: faHome
    },
]

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
                icon: faClipboardList
            },
            {
                itemName: "Search Question",
                link: "/notice/question/search",
                icon: faClipboardList
            },
            {
                itemName: "Search Question",
                link: "/notice/question/sent",
                icon: faClipboardList
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
                icon: faClipboardList
            },
            {
                itemName: "Search Motion",
                link: "/notice/motion/search",
                icon: faClipboardList
            },
            {
                itemName: "Search Motion",
                link: "/notice/motion/sent",
                icon: faClipboardList
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
                icon: faClipboardList
            },
            {
                itemName: "Search Resolution",
                link: "/notice/resolution/search",
                icon: faClipboardList
            },
            {
                itemName: "Search Resolution",
                link: "/notice/resolution/sent",
                icon: faClipboardList
            },
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
                icon: faClipboardList
            },
            {
                itemName: "Manage Seating Plan",
                link: "/notice/seatingplan/manage-seating-plan",
                icon: faClipboardList
            }
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
                icon: faClipboardList
            }
        ],
    },
]