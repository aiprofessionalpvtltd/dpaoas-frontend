import { faHome, faFileAlt, faUserTag, faBuilding, faAddressCard, faUser } from '@fortawesome/free-solid-svg-icons'

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

export const VMSsidebarItems = [
    {
        itemName: "Dashboard",
        link: "/vms/dashboard",
        icon: faHome
    },

]