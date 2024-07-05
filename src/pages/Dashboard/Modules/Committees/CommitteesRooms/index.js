import React, { useCallback, useEffect, useState } from "react";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../components/Layout";
import {
  CommitteesSideBarItems,
  LegislationSideBarItems,
} from "../../../../../utils/sideBarItems";
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
    committeeRoom: "Committee Room 1",

    status: "active",
  },
  {
    id: 2,
    committeeRoom: "Committee Room 2",

    status: "inactive",
  },
  {
    id: 3,
    committeeRoom: "Committee Room 3",

    status: "active",
  },
  {
    id: 4,
    committeeRoom: "Committee Room 4",

    status: "active",
  },
  {
    id: 5,
    committeeRoom: "Committee Room 5",

    status: "active",
  },
];

function CommitteesManagementSystemCommitteeRooms() {
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

  useEffect(() => {
    getAllLegislativeBillApi();
    setCommitteeData(committeesData);
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
        title1={"Committee Rooms"}
      />
      <div class="row mt-5">
        <div class="col-12">
          <CustomTable
            singleDataCard={true}
            block={false}
            data={committeeData}
            addBtnText={"Create Committee Room"}
            tableTitle="Committee Rooms Lists"
            handlePageChange={handlePageChange}
            hideBtn={true}
            hideDeleteIcon={true}
            currentPage={currentPage}
            pageSize={pageSize}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            totalCount={count}
            handleAdd={() =>
              navigate(
                "/committees/dashboard/committee-rooms/addedit-committee-room"
              )
            }
            // hideEditIcon={false}
            // showEditIcon={false}
            // showAssigned={true}
            handleEdit={(item) =>
              navigate(
                "/committees/dashboard/committee-rooms/addedit-committee-room",
                {
                  state: { id: item?.SR },
                }
              )
            }
          />
        </div>
      </div>
    </Layout>
  );
}
export default CommitteesManagementSystemCommitteeRooms;
