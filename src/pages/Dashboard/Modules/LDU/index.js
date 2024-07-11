import React from 'react'
import { Layout } from '../../../../components/Layout'
import Header from '../../../../components/Header'
import { LDUSideBarItems } from '../../../../utils/sideBarItems'
import {
  faClipboardQuestion,
  faFileImport,
} from "@fortawesome/free-solid-svg-icons";
import NoticeStatsCard from '../../../../components/CustomComponents/NoticeStatsCard';
function LDUDashboard() {
  return (
    <Layout
    module={true}
    sidebarItems={LDUSideBarItems}
    centerlogohide={true}
  >
    <Header dashboardLink={"/"} title1={"LDU Stats"} />
    <div style={{ marginLeft: 15 }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#fb6340",
          }}
        >
          Daily Stats
        </h2>
        <div class="row">
          <div class="col-md-12">
            <div class="mt-2 mb-4">
              <div class="row">
                <NoticeStatsCard
                title={"Private Member Bills"}
                  icon={faClipboardQuestion}
                  iconBgColor={"#FFA500"}
                  total={`20`}
                  sent={10}
                  received={5}
                />
                <NoticeStatsCard
                  title={"Legislative Bills"}
                  icon={faFileImport}
                  iconBgColor={"#007bff"}
                  total={`5`}
                  sent={`5`}
                  received={"44"}
                />
                <NoticeStatsCard
                  title={"Laws & Acts"}
                  icon={faFileImport}
                  iconBgColor={"#007bff"}
                  total={`15`}
                  sent={`25`}
                  received={"44"}
                />
              </div>
            </div>
          </div>
        </div>

        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#f5365c",
          }}
        >
          Monthly Stats
        </h2>
        <div class="row">
          <div class="col-md-12">
            <div class="mt-2 mb-4">
              <div class="row">
                <NoticeStatsCard
                  title={"Private Member Bills"}
                  icon={faClipboardQuestion}
                  overall={true}
                  iconBgColor={"#FFA500"}
                  total={`50`}
                />
                <NoticeStatsCard
                  title={"Legislative Bills"}
                  icon={faFileImport}
                  overall={true}
                  iconBgColor={"#007bff"}
                  total={`40`}
                />
                <NoticeStatsCard
                  title={"Laws & Acts"}
                  icon={faFileImport}
                  overall={true}
                  iconBgColor={"#007bff"}
                  total={`10`}
                />
              </div>
            </div>
          </div>
        </div>

        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#0177b4",
          }}
        >
          Upcoming Session Stats
        </h2>
        <div class="row">
          <div class="col-md-12">
            <div class="mt-2 mb-4">
              <div class="row">
                <NoticeStatsCard
                  upcoming={true}
                  title={"Private Members Bills"}
                  icon={faClipboardQuestion}
                  iconBgColor={"#FFA500"}
                  total={`4`}
                />
                <NoticeStatsCard
                  upcoming={true}
                  title={"Legislative Bills"}
                  icon={faFileImport}
                  iconBgColor={"#007bff"}
                  total={`4`}
                />
                <NoticeStatsCard
                  upcoming={true}
                  title={"Law & Acts"}
                  icon={faFileImport}
                  iconBgColor={"#007bff"}
                  total={`4`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  </Layout>
  )
}

export default LDUDashboard