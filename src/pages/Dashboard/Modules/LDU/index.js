import React from 'react'
import { Layout } from '../../../../components/Layout'
import Header from '../../../../components/Header'
import { LDUSideBarItems } from '../../../../utils/sideBarItems'

function LDUDashboard() {
  return (
    <Layout
    module={true}
    sidebarItems={LDUSideBarItems}
    centerlogohide={true}
  >
    <Header dashboardLink={"/"} title1={"LDU Stats"} />
    
  </Layout>
  )
}

export default LDUDashboard