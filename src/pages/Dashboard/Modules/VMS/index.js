import React from 'react'
import { Layout } from '../../../../components/Layout'
import { faHome } from '@fortawesome/free-solid-svg-icons'


const sidebarItems = [
    {
        itemName: "Dashboard",
        link: "/vms/dashboard",
        icon: faHome
    },

]
function VMSDashboard() {
    return (
        <Layout module={true} sidebarItems={sidebarItems}>


        </Layout>
    )
}

export default VMSDashboard
