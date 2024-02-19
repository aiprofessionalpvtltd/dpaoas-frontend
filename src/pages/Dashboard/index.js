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
  faSms,
  faBuilding,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../api/AuthContext";
import { getPermissionsData, getUserData, logout, setPermissionsData, setRolesData } from "../../api/Auth";
import { CheckPermission } from "../../utils/permissionsConfig";
import { useNavigate } from "react-router";
import { getRoles } from "../../api/APIs/Services/organizational.service";

function Dashboard() {
  const navigation = useNavigate();
  const [roles, setRoles] = useState([]);
  const { permissions } = useContext(AuthContext);
  const [permissionsLocal, setPermissionsLocal] = useState([]);
  const userRole = getUserData();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getRoles();
        setRoles(response.data?.roles);
      } catch (error) {
        // alert(error.response.data)
        if (error?.response?.data?.error === "Token has expired!") {
          logout();
          navigation("/login");
        }
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
      if (permissions && permissions.length > 0 && roles) {
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

  const tilesData = [
    {
      title: "Leave Management System",
      link: "/lms/dashboard",
      type: "",
      cardbg: "bluebg",
      icon: faMailBulk,
      // permission: null,
      permission: ["LeaveManagement"]
    },
    {
      title: "Organizational Dashboard",
      link: "/hrm/dashboard",
      type: "",
      cardbg: "greenbg",
      icon: faBuilding,
      // permission: null,
      permission: ["Roles"]
    },
    {
      title: "Visitors Management System",
      link: "/vms/dashboard",
      type: "",
      cardbg: "greybg",
      icon: faAddressCard,
      permission: ["Visitors Management"],
    },
    {
      title: "Notice Management System",
      link: "/notice/question/new",
      type: "",
      cardbg: "darkGreenbg",
      icon: faBullhorn,
      permission: ["Notice Office"],
    },
    {
      title: "Motion Management System",
      link: "/mms/motion/list",
      type: "",
      cardbg: "lightGreen",
      icon: faFileImport,
      permission: ["Motion"],
    },
    {
      title: "Question Management System",
      link: "/qms/search/question",
      type: "",
      cardbg: "orangebg",
      icon: faClipboardQuestion,
      permission: ["Question"],
    },
    {
      title: "SMS Constituent Outreach System",
      link: "/sms/dashboard",
      type: "",
      cardbg: "greybg",
      icon: faSms,
      permission: ["SMS"],
    },
    {
      title: "Human Resource Management System",
      link: "/qms/search/question",
      type: "",
      cardbg: "mehroonBg",
      icon: faUserCog,
      permission: ["Human Resource Management"],
    },
    {
      title: "Translation Management System",
      link: "/tms/dashboard",
      type: "",
      cardbg: "bluebg",
      icon: faMailBulk,
      permission: ["Translation"],
    },
    {
      title: "Complaint Management System",
      link: "/cms/dashboard",
      type: "",
      cardbg: "bluebg",
      icon: faMailBulk,
      permission: ["Complaint"],
    },
    {
      title: "E-Filing System",
      link: "/efiling/dashboard/files",
      type: "",
      cardbg: "greenbg",
      icon: faFileAlt,
      permission: ["E-Filing"],
    },
  ];

  // Filter tiles based on permissions
  const filteredTiles = tilesData.filter((tile) => {
    return tile?.permission === null || tile?.permission.some((perm) => permissionsLocal?.[perm]?.canView);
  });

  // Organize tiles into rows with a maximum of 3 tiles per row
  const rows = [];
  for (let i = 0; i < filteredTiles.length; i += 4) {
    rows.push(filteredTiles.slice(i, i + 4));
  }
  const filteredRows = rows.flatMap(row => row.filter(item => item.title !== "Organizational Dashboard"));

  console.log("filteredRows:", filteredRows);
  return (
    <Layout>
      <div class="dashboard-content" style={{ marginTop: "100px" }}>
        <div class="clearfix"></div>

        {filteredRows.map((row, rowIndex) => (
         <div key={rowIndex} className="col-3">
         <Tiles title={row.title} link={row.link} type={row.type} cardbg={row.cardbg} icon={row.icon} />
       </div>
        ))}
      </div>
    </Layout>
  );
}

export default Dashboard;
