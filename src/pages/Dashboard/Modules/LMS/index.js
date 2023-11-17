import React from 'react'
import { Layout } from '../../../../components/Layout'
import { faHome, faFileAlt } from '@fortawesome/free-solid-svg-icons'

const sidebarItems = [
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
function LMSDashboard() {
    return (
        <Layout module={true} sidebarItems={sidebarItems}>


        </Layout>
    )
}

export default LMSDashboard
