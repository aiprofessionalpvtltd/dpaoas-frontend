import React from 'react'
import { Layout } from '../../../../components/Layout';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const sidebarItems = [
    {
        itemName: "Dashboard",
        link: "/hrm/dashboard",
        icon: faHome
    },

]

function HRMDashboard() {

    return (
        <Layout module={true} sidebarItems={sidebarItems}>


        </Layout>
    )
}

export default HRMDashboard
