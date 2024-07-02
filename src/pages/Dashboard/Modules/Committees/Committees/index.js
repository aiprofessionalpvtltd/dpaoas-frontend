import React, { useCallback, useEffect, useState } from "react";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../components/Layout";
import { CommitteesSideBarItems } from "../../../../../utils/sideBarItems";
import {
  DeleteLegislativeBill,
  getAllLegislativeBill,
} from "../../../../../api/APIs/Services/Notice.service";
import Header from "../../../../../components/Header";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../../components/CustomComponents/CustomTable";

const committeesData = [
  {
    id: 1,
    committeeName:
      "Committee to consider and make recommendations on the Money Bill, the Tax Laws (Amendment) Bill, 2024",
    committeeType: "Domestic Committees",
    chairPerson: "Syed Yousaf Raza Gilani",
    committeeSecretary: "Syed Hasnain Haider",
    members: "View Members",
    status: "active",
  },
  {
    id: 2,
    committeeName: "Senate House Committee",
    committeeType: "House Committee",
    chairPerson: "Syedaal Khan",
    committeeSecretary: "Muhammad Zubair Thaheem",
    members: "View Members",
    status: "inactive",
  },
  {
    id: 3,
    committeeName: "Senate Finance Committee",
    committeeType: "Domestic Committee",
    chairPerson: "Syed Yousaf Raza Gilani",
    committeeSecretary: "Syed Hasnain Haider",
    members: "View Members",
    status: "active",
  },
  {
    id: 4,
    committeeName: "Business Advisory Committee",
    committeeType: "Domestic Committee",
    chairPerson: "Syed Yousaf Raza Gilani",
    committeeSecretary: "Syed Hasnain Haider",
    members: "View Members",
    status: "active",
  },
];

function CommitteesManagementSystemCommittees() {
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [billData, setBillData] = useState([]);
  const [committeeData, setCommitteeData] = useState([]);
  const pageSize = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const transformLegislativeData = (apiData) => {
    return apiData.map((item, index) => ({
      SR: item?.id,
      committeeName: item?.title ? item?.title : "",
      committeeType: item?.session?.sessionName
        ? item?.session?.sessionName
        : "",
      chairpersonConvener: item?.date
        ? moment(item?.date).format("DD-MM-YYYY")
        : "",
      committeeSecretary: item?.description ? item?.description : "",
      members: item?.device ? item?.device : "",
      status: item?.isActive ? item?.isActive : "",
    }));
  };

  const getAllLegislativeBillApi = useCallback(async () => {
    try {
      const response = await getAllLegislativeBill(currentPage, pageSize);
      if (response?.success) {
        setCount(response?.data?.count);
        const trensferData = transformLegislativeData(
          response?.data?.legislativeBills
        );
        setBillData(trensferData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }, [currentPage, pageSize, setCount, setBillData]);

  const handleDelete = async (id) => {
    try {
      const response = await DeleteLegislativeBill(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        getAllLegislativeBillApi();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  const handleMemberClick = (id) => {
    navigate(`/committees/dashboard/committees/committee-members`, {
      state: { committeeId: id },
    });
  };

  useEffect(() => {
    getAllLegislativeBillApi();
    setCommitteeData(
      committeesData.map((item) => ({
        ...item,
        members: (
          <span
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => handleMemberClick(item.id)}
          >
            {item.members}
          </span>
        ),
      }))
    );
  }, [currentPage]);

  return (
    <Layout
      module={true}
      sidebarItems={CommitteesSideBarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/committees/dashboard"}
        addLink1={"/"}
        title1={"Committees"}
      />
      <div className="row mt-5">
        <div className="col-12">
          <CustomTable
            singleDataCard={true}
            block={false}
            data={committeeData}
            hidebtn1={false}
            addBtnText={"Create Committee"}
            tableTitle="Committees Lists"
            handlePageChange={handlePageChange}
            hideBtn={true}
            hideDeleteIcon={true}
            currentPage={currentPage}
            pageSize={pageSize}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            totalCount={count}
            handleAdd={() =>
              navigate("/committees/dashboard/committees/addedit")
            }
            handleEdit={(item) =>
              navigate("/committees/dashboard/committees/addedit", {
                state: { id: item?.SR },
              })
            }

            // handleDelete={(item) => handleDelete(item.SR)}
            // ActionHide={true}
          />
        </div>
      </div>
    </Layout>
  );
}

export default CommitteesManagementSystemCommittees;

// import React, { useCallback, useEffect, useState } from "react";
// import {
//   showErrorMessage,
//   showSuccessMessage,
// } from "../../../../../utils/ToastAlert";
// import { ToastContainer } from "react-toastify";
// import { Layout } from "../../../../../components/Layout";
// import {
//   CommitteesSideBarItems,
//   LegislationSideBarItems,
// } from "../../../../../utils/sideBarItems";
// import {
//   DeleteLegislativeBill,
//   getAllLegislativeBill,
// } from "../../../../../api/APIs/Services/Notice.service";
// import Header from "../../../../../components/Header";
// import moment from "moment";
// import { useNavigate } from "react-router-dom";
// import CustomTable from "../../../../../components/CustomComponents/CustomTable";

// const committeesData = [
//   {
//     id: 1,
//     committeeName:
//       "Committee to consider and make recommendations on the Money Bill, the Tax Laws (Amendment) Bill, 2024",
//     committeeType: "Domestic Committees",
//     chairPerson: "Syed Yousaf Raza Gilani",
//     committeeSecretary: "Syed Hasnain Haider",
//      members: "View Members",
//     status: "active",

//   },
//   {
//     id: 2,
//     committeeName: "Senate House Committee",
//     committeeType: "House Committee",
//     chairPerson: "Syedaal Khan",
//     committeeSecretary: "Muhammad Zubair Thaheem",
//     members: "View Members",
//     status: "inactive",
//   },
//   {
//     id: 3,
//     committeeName: "Senate Finance Committee",
//     committeeType: "Domestic Committees",
//     chairPerson: "Syed Yousaf Raza Gilani",
//     committeeSecretary: "Syed Hasnain Haider",
//     members: "View Members",
//     status: "active",
//   },
// ];

// function CommitteesManagementSystemCommittees() {
//   const navigate = useNavigate();
//   const [count, setCount] = useState(null);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [billData, setBillData] = useState([]);
//   const [committeeData, setCommitteeData] = useState([]);
//   const pageSize = 5;

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };
//   const transformLegislativeData = (apiData) => {
//     return apiData.map((item, index) => ({
//       SR: item?.id,
//       committeeName: item?.title ? item?.title : "",
//       committeeType: item?.session?.sessionName
//         ? item?.session?.sessionName
//         : "",
//       chairpersonConvener: item?.date
//         ? moment(item?.date).format("DD-MM-YYYY")
//         : "",
//       committeeSecretary: item?.description ? item?.description : "",
//       members: item?.device ? item?.device : "",
//       status: item?.isActive ? item?.isActive : "",
//     }));
//   };

//   const getAllLegislativeBillApi = useCallback(async () => {
//     try {
//       const response = await getAllLegislativeBill(currentPage, pageSize);
//       if (response?.success) {
//         setCount(response?.data?.count);
//         const trensferData = transformLegislativeData(
//           response?.data?.legislativeBills
//         );
//         setBillData(trensferData);
//       }
//     } catch (error) {
//       showErrorMessage(error?.response?.data?.message);
//     }
//   }, [currentPage, pageSize, setCount, setBillData]);

//   const handleDelete = async (id) => {
//     try {
//       const response = await DeleteLegislativeBill(id);
//       if (response?.success) {
//         showSuccessMessage(response.message);
//         getAllLegislativeBillApi();
//       }
//     } catch (error) {
//       showErrorMessage(error.response.data.message);
//     }
//   };

//   useEffect(() => {
//     getAllLegislativeBillApi();
//     setCommitteeData(committeesData);
//   }, [currentPage]);
//   return (
//     <Layout
//       module={true}
//       sidebarItems={CommitteesSideBarItems}
//       centerlogohide={true}
//     >
//       <ToastContainer />
//       <Header
//         dashboardLink={"/committees/dashboard"}
//         addLink1={"/"}
//         title1={"Committees"}
//       />
//       <div class="row mt-5">
//         <div class="col-12">
//           <CustomTable
//             singleDataCard={true}
//             block={false}
//             data={committeeData}
//             hidebtn1={false}
//             addBtnText={"Create Committee"}
//             tableTitle="Committees Lists"
//             handlePageChange={handlePageChange}
//             hideBtn={true}
//             hideDeleteIcon={true}
//             currentPage={currentPage}
//             pageSize={pageSize}
//             headertitlebgColor={"#666"}
//             headertitletextColor={"#FFF"}
//             totalCount={count}
//             handleAdd={() =>
//               navigate("/committees/dashboard/committees/addedit")
//             }
//             handleEdit={(item) =>
//               navigate("/committees/dashboard/committees/addedit", {
//                 state: { id: item?.SR },
//               })
//             }
//             // handleDelete={(item) => handleDelete(item.SR)}
//             // ActionHide={true}
//           />
//         </div>
//       </div>
//     </Layout>
//   );
// }
// export default CommitteesManagementSystemCommittees;
