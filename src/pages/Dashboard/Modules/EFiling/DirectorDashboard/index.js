import React, { useEffect, useState } from 'react'
import { Layout } from '../../../../../components/Layout'
import Header from '../../../../../components/Header'
import { EfilingSideBarItem } from '../../../../../utils/sideBarItems'
import NoticeStatsCard from '../../../../../components/CustomComponents/NoticeStatsCard'
import { faClipboardQuestion, faFileImport, faScaleBalanced } from '@fortawesome/free-solid-svg-icons'
import { getApprovelStats, getsentAndRecievedFilesStats } from '../../../../../api/APIs/Services/efiling.service'
import { getUserData } from '../../../../../api/Auth'
import { Link } from 'react-router-dom'
import { EFilingNotifications } from '../../../../../components/NotificationsHeaders/EFilingNotifications'

function DirectorDashboard() {
  const userData = getUserData()
  const [fileStatsData, setFileStatsData] = useState(null)
  const [approvelStatsData, setApprovelStatsData] = useState(null)

  const getAllStats = async () => {
    try {
      const response = await getsentAndRecievedFilesStats(userData?.fkUserId)
      if (response?.success) {
        setFileStatsData(response?.data)
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  const getAllApprovelStatsApi = async () => {
    try {
      const response = await getApprovelStats(userData?.fkUserId)
      if (response?.success) {
        setApprovelStatsData(response?.data)
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllApprovelStatsApi()
    getAllStats()
  },[])
  return (
    <Layout module={true} centerlogohide={true} sidebarItems={EfilingSideBarItem}>
        <EFilingNotifications notificationType="Notifications" />
        <Header dashboardLink={"/"} addLink1={"/efiling/director-deshboard"} title1={"E-Filing"} width={"500px"}  marginTop = {"0px"}/>

        <h2 style={{ marginLeft: 15, marginBottom: 20 }}> Welcome Back {userData && `${userData?.firstName} (${userData?.department?.departmentName})`}</h2>
        <div style={{ marginLeft: 15 }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px', color: "#fb6340" }}>Daily Stats</h2>
        <div class="row">
          <div class="col-md-12">
            <div class="mt-2 mb-4">
              <div class="row">
                <NoticeStatsCard title={"Files"} icon={faClipboardQuestion} iconBgColor={"#FFA500"} total={fileStatsData && fileStatsData?.totalFiles} sent={fileStatsData && fileStatsData?.sentFiles} received={fileStatsData && fileStatsData?.receivedFiles} />
                <NoticeStatsCard ReceivedText={"DisApproved"} SentText={"Approved"} title={"Approvel"} icon={faFileImport} iconBgColor={"#007bff"} total={approvelStatsData && approvelStatsData?.totalFiles} sent={approvelStatsData && approvelStatsData?.approvedFiles} received={approvelStatsData && approvelStatsData?.disapprovedFiles} />
              </div>
            </div>
          </div>
        </div>
        </div>
        </Layout>
  )
}

export default DirectorDashboard