import React, { useContext } from "react";
import { Layout } from "../../components/Layout";
import { Tiles } from "../../components/CustomComponents/Tiles";
import {
  faAddressCard,
  faUserCog,
  faMailBulk,
  faClipboardList,
  faBullhorn,
  faFileImport,
  faClipboardQuestion
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../api/AuthContext";
import { getPermissionsData } from "../../api/Auth";

function Dashboard() {
  const permissions = getPermissionsData();
  // console.log(permissions);
  return (
    <Layout>
      <div class="dashboard-content" style={{ marginTop: "100px" }}>
        <div class="clearfix"></div>
        <div class="row main-dashboard-tiles">
          {/* {(permissions?.Leave?.canView || permissions?.LeaveHistory?.canView) && ( */}
          <div class="col-4">
            <Tiles
              title={"Leave Management System"}
              link={"/lms/dashboard"}
              type={""}
              cardbg={"bluebg"}
              icon={faMailBulk}
            />
          </div>
          {/* )} */}
          {/* {(permissions?.Roles?.canView || permissions?.Employees?.canView || permissions?.Departments?.canView || permissions?.Designation?.canView) && ( */}
          <div class="col-4">
            <Tiles
              title={"Organizational Dashboard"}
              link={"/hrm/dashboard"}
              type={""}
              cardbg={"greenbg"}
              icon={faUserCog}
            />
          </div>
          {/* )} */}
          <div class="col-4">
            <Tiles
              title={"Visitors Management System"}
              link={"/vms/dashboard"}
              type={""}
              cardbg={"greybg"}
              icon={faAddressCard}
            />
          </div>
        </div>

                <div class="row main-dashboard-tiles">
                    <div class="col-4">
                        <Tiles title={"Notice Management System"} link={"/notice/question/new"} type={""} cardbg={"darkGreenbg"} icon={faBullhorn} />
                    </div>
                    <div class="col-4">
                        <Tiles title={"Motion Management System"} link={"/mms/motion/list"} type={""} cardbg={"lightGreen"} icon={faFileImport} />
                    </div>
                    <div class="col-4">
                        <Tiles title={"Question Management System"} link={"/qms/search/question"} type={""} cardbg={"orangebg"} icon={faClipboardQuestion} />
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Dashboard;
