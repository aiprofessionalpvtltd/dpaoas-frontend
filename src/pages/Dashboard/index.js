import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { Tiles } from "../../components/CustomComponents/Tiles";
import {
  faAddressCard,
  faUserCog,
  faMailBulk,
  faClipboardList,
  faBullhorn,
  faFileImport,
  faClipboardQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../api/AuthContext";
import {
  getPermissionsData,
  getUserData,
  setPermissionsData,
  setRolesData,
} from "../../api/Auth";
import { getRoles } from "../../api/APIs";
import { CheckPermission } from "../../utils/permissionsConfig";

function Dashboard() {
  const [roles, setRoles] = useState([]);
  const { permissions } = useContext(AuthContext);
  const [permissionsLocal, setPermissionsLocal] = useState([]);
  const userRole = getUserData();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getRoles();
        setRoles(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    if (roles) {
      setRolesData(roles);
      const localPermissionsData = getPermissionsData();
      setPermissionsLocal(localPermissionsData);

      // Check if permissions exist and has length
      if (permissions && permissions.length > 0) {
        const res = CheckPermission(userRole?.role?.name, roles, permissions);
        setPermissionsData(res?.permissions);
        setPermissionsLocal(res?.permissions);
      } else {
        // Handle the case when permissions are empty or undefined
        // For example, set default permissions
        setPermissionsData(localPermissionsData);
        setPermissionsLocal(localPermissionsData);
      }
    }
  }, [roles, permissions]);

  return (
    <Layout>
      <div class="dashboard-content" style={{ marginTop: "100px" }}>
        <div class="clearfix"></div>
        <div class="row main-dashboard-tiles">
          {/* {(permissionsLocal?.Leave?.canView || permissionsLocal?.LeaveHistory?.canView) && ( */}
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
          {/* {(permissionsLocal?.Roles?.canView || permissionsLocal?.Employees?.canView || permissionsLocal?.Departments?.canView || permissionsLocal?.Designation?.canView) && ( */}
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
            <Tiles
              title={"Notice Management System"}
              link={"/notice/question/new"}
              type={""}
              cardbg={"darkGreenbg"}
              icon={faBullhorn}
            />
          </div>
          <div class="col-4">
            <Tiles
              title={"Motion Management System"}
              link={"/mms/motion/list"}
              type={""}
              cardbg={"lightGreen"}
              icon={faFileImport}
            />
          </div>
          <div class="col-4">
            <Tiles
              title={"Question Management System"}
              link={"/qms/search/question"}
              type={""}
              cardbg={"orangebg"}
              icon={faClipboardQuestion}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
