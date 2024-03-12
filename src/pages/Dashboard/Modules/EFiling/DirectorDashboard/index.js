import React from 'react'
import { Layout } from '../../../../../components/Layout'
import Header from '../../../../../components/Header'
import { EfilingSideBarItem } from '../../../../../utils/sideBarItems'
import NoticeStatsCard from '../../../../../components/CustomComponents/NoticeStatsCard'
import { faClipboardQuestion, faFileImport, faScaleBalanced } from '@fortawesome/free-solid-svg-icons'

function DirectorDashboard() {
  return (
    <Layout module={true} centerlogohide={true} sidebarItems={EfilingSideBarItem}>
        <Header dashboardLink={"/"} addLink1={"/efiling/director-deshboard"} title1={"E-Filing"} width={"500px"} />
        <div style={{ marginLeft: 15 }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px', color: "#fb6340" }}>Daily Stats</h2>
        <div class="row">
          <div class="col-md-12">
            <div class="mt-2 mb-4">
              <div class="row">
                <NoticeStatsCard title={"Files"} icon={faClipboardQuestion} iconBgColor={"#FFA500"} total={`10`} sent={5} received={5} />
                <NoticeStatsCard ReceivedText={"DisApproved"} SentText={"Approved"} title={"Approvel"} icon={faFileImport} iconBgColor={"#007bff"} total={`20`} sent={5} received={5} />
              </div>
            </div>
          </div>
        </div>
        </div>
        </Layout>
  )
}

export default DirectorDashboard