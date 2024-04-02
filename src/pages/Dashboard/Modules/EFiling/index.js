import React, { useEffect, useState } from "react";
import { Layout } from "../../../../components/Layout";
import Header from "../../../../components/Header";
import CustomTable from "../../../../components/CustomComponents/CustomTable";
import { useNavigate } from "react-router-dom";
import { EfilingSideBarBranchItem, EfilingSideBarItem } from "../../../../utils/sideBarItems";
import NoticeStatsCard from "../../../../components/CustomComponents/NoticeStatsCard";
import { faClipboardQuestion, faFile, faFileImport, faMailBulk, faScaleBalanced } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showErrorMessage } from "../../../../utils/ToastAlert";
import { getFileStates } from "../../../../api/APIs/Services/efiling.service";
import { getUserData } from "../../../../api/Auth";

function EFilingDashboard() {
  const [countData, setCountData] = useState(0)
  const userData = getUserData()

  const getFilesStateApi = async () => {
    try {
      const response = await getFileStates()
      if (response.success) {
        // showSuccessMessage(response?.message)
        setCountData(response?.data)
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    getFilesStateApi()
  }, [])

  return (
    <Layout module={false} centerlogohide={true} sidebarItems={userData && userData?.userType === "Officer" ? EfilingSideBarItem : EfilingSideBarBranchItem}>
        <Header dashboardLink={"/"} addLink1={"/efiling/dashboard"} title1={"E-Filing"} width={"500px"} />
        <div class="row">
          <div class="col-8">
            <div class="dash-detail-container">
              <div class="row">
                <div class="col-6">
                  <div class="dash-card">
                    <div class="dash-card-header" style={{textAlign: "center", background: "#4f5966"}}>
                      <h2 style={{marginBottom: "0"}}>File In</h2>
                    </div>
                    <div class="count float-start" style={{borderLeft:"#ddd solid 1px"}}>
                      <span style={{display: "inline-flex"}}>Urgent <span style={{marginLeft: "5px"}}>({countData?.filesIn?.Urgent})</span></span>
                      <div class="clearfix"></div>
                      <i style={{fontSize: "25px"}} class="fas fa-file-alt mt-2">
                        <FontAwesomeIcon icon={faFile}/>
                      </i>
                      
                    </div>
                    <div class="count float-start">
                      <span style={{display: "inline-flex"}}>Immediate <span style={{marginLeft: "5px"}}>({countData?.filesIn?.Immediate})</span></span>
                      <div class="clearfix"></div>
                      <i style={{fontSize: "25px"}} class="fas fa-file-alt mt-2">
                        <FontAwesomeIcon icon={faFile}/>
                      </i>
                    </div>
                    <div class="clearfix"></div>
                    <div class="count float-start" style={{borderLeft:"#ddd solid 1px"}}>
                      <span style={{display: "inline-flex"}}>Piriority <span style={{marginLeft: "5px"}}>({countData?.filesIn?.Priority})</span></span>
                      <div class="clearfix"></div>
                      <i style={{fontSize: "25px"}} class="fas fa-file-alt mt-2">
                        <FontAwesomeIcon icon={faFile}/>
                      </i>
                    </div>
                    <div class="count float-start">
                      <span style={{display: "inline-flex"}}>Routine <span style={{marginLeft: "5px"}}>({countData?.filesIn?.Routine})</span></span>
                      <div class="clearfix"></div>
                      <i style={{fontSize: "25px"}} class="fas fa-file-alt mt-2">
                        <FontAwesomeIcon icon={faFile}/>
                      </i>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
               
                <div class="col-6">
                  <div class="dash-card">
                    <div class="dash-card-header" style={{textAlign: "center", background: "#4f5966"}}>
                      <h2 style={{marginBottom: "0"}}>File Out</h2>
                    </div>
                    <div class="count float-start" style={{borderLeft:"#ddd solid 1px"}}>
                      <span style={{display: "inline-flex"}}>Urgent <span style={{marginLeft: "5px"}}>({countData?.filesOut?.Urgent})</span></span>
                      <div class="clearfix"></div>
                       <i style={{fontSize: "25px"}} class="fas fa-file-alt mt-2">
                        <FontAwesomeIcon icon={faFile}/>
                      </i>
                    </div>
                    <div class="count float-start">
                      <span style={{display: "inline-flex"}}>Immediate <span style={{marginLeft: "5px"}}>({countData?.filesOut?.Urgent})</span></span>
                      <div class="clearfix"></div>
                       <i style={{fontSize: "25px"}} class="fas fa-file-alt mt-2">
                        <FontAwesomeIcon icon={faFile}/>
                      </i>
                    </div>
                    <div class="clearfix"></div>
                    <div class="count float-start" style={{borderLeft:"#ddd solid 1px"}}>
                      <span style={{display: "inline-flex"}}>Piriority <span style={{marginLeft: "5px"}}>({countData?.filesOut?.Urgent})</span></span>
                      <div class="clearfix"></div>
                      <i style={{fontSize: "25px"}} class="fas fa-file-alt mt-2">
                        <FontAwesomeIcon icon={faFile}/>
                      </i>
                    </div>
                    <div class="count float-start">
                      <span style={{display: "inline-flex"}}>Routine <span style={{marginLeft: "5px"}}>({countData?.filesOut?.Urgent})</span></span>
                      <div class="clearfix"></div>
                      <i style={{fontSize: "25px"}} class="fas fa-file-alt mt-2">
                        <FontAwesomeIcon icon={faFile}/>
                      </i>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>


              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="dash-detail-container">
              <div class="p-0" style={{height: "222px"}}>
                <h2 className="blueheadbg">Notification</h2>
                <div class="count float-start" style={{borderLeft:"#ddd solid 1px", background: "#FFF", height: "182px",paddingTop: "55px"}}>
                  <span style={{display: "inline-flex"}}>New Leave Requests <span style={{marginLeft: "5px"}}><b>(0)</b></span></span>
                  <div class="clearfix"></div>
                  <i style={{fontSize: "25px",paddingTop: "5px"}} >
                    <FontAwesomeIcon icon={faMailBulk}/>
                  </i>
                </div>
                <div class="count float-start" style={{borderLeft:"#ddd solid 1px", background: "#FFF", height: "182px",paddingTop: "55px"}}>
                  <span style={{display: "inline-flex"}}>Move Requests <span style={{marginLeft: "5px"}}><b>(0)</b></span></span>
                  <div class="clearfix"></div>
                  <i style={{fontSize: "25px",paddingTop: "5px"}} >
                    <FontAwesomeIcon icon={faMailBulk}/>
                  </i>
                </div>

              </div>
            </div>
          </div>
        </div>
    </Layout>
  );
}

export default EFilingDashboard;
